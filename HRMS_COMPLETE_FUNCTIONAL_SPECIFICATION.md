# HRMS Complete Functional Specification & System Architecture

**Document Version:** 1.0.0  
**Project:** PeopleCore Enterprise HRMS SaaS Platform  
**Target Architecture:** Multi-Tenant SaaS with Next.js 16 (App Router), TypeScript, Tailwind CSS, Neon PostgreSQL (Serverless Pooled), and Granular RBAC  
**Database Credentials Provided:** Neon PostgreSQL (`ep-lucky-silence-b3vzkr8d.c-4.ap-southeast-1.aws.neon.tech`)  

---

## 1. Executive Summary & Existing Project Assessment

### 1.1 Project Objective
PeopleCore HRMS is an enterprise-grade, multi-tenant Human Resource Management System (HRMS) designed to power the complete hire-to-retire lifecycle for modern organizations, with native multi-company, multi-branch, and India-specific statutory compliance (EPF, ESIC, Professional Tax, TDS Section 192, Gratuity, Bonus, and Full & Final Settlement).

### 1.2 Existing Project Audit & Gap Analysis
A comprehensive architectural audit of the repository (`hrnext-software`) was conducted:

1. **Technology Stack:**
   - **Frontend/Framework:** Next.js 16.4.6 (App Router), React 19.3.0, TypeScript 5, Tailwind CSS 4.3.3.
   - **UI & State:** Radix UI primitives, Lucide React icons, TanStack React Table v8, React Hook Form + Zod, Recharts.
   - **Database & Auth:** Configured initially with `@supabase/ssr` utilizing a mock client fallback (`mockFetch.ts`, `mockData.ts`) and a demo session cookie (`demo_user_session`).
   - **SQL Migrations:** 4 SQL scripts exist under `supabase/migrations/` (`001_initial_schema.sql` to `004_extended_modules.sql`).
2. **Current Implementation Reality Check:**
   - **UI Completeness:** The user interface for over 80+ pages and tabs across HR Admin, Manager, ESS, and Super Admin has been scaffolded using domain generation scripts (`scripts/build-domain-pages.js`).
   - **Backend & Database Reality:** The UI relies almost entirely on mock data in `mockData.ts` or client-side component state. Mutations (e.g., creating an employee, approving a leave, processing payroll) trigger toast notifications and local state changes, but are **not yet persisting to a live PostgreSQL database**.
   - **Authentication & Tenant Onboarding Gap:** Currently, authentication uses hardcoded quick-login accounts (`admin@peoplecore.io`, `manager@peoplecore.io`, `employee@peoplecore.io`, `superadmin@peoplecore.io`) or Supabase SSR fallback. There is **no self-service signup flow** capturing organization details, mobile number, city, and address.
   - **Crucial Onboarding Gatekeeper Missing:** The critical business requirement where new user signup must default the organization's `status` to `inactive` and `expiry_date` to `yesterday` (blocking internal software pages at the URL/middleware level until activated) is **currently not implemented**.
   - **Database Migration to Neon:** The schema in the repository's migration files needs to be aligned with Neon PostgreSQL connection pooling (`DATABASE_URL_POOLED`), proper SSL handling, and unified multi-tenant foreign key relationships.

---

## 2. Multi-Tenant Architecture & Data Isolation Model

### 2.1 Multi-Tenant Isolation Strategy
The platform utilizes a **Shared Database, Shared Schema with Discriminator Column (`tenant_id`)** pattern, enforced via:
1. **Database-Level Row-Level Security (RLS)** in PostgreSQL:
   ```sql
   ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
   CREATE POLICY tenant_isolation_policy ON employees
     FOR ALL
     USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::UUID);
   ```
2. **Application-Level Middleware & Query Scoping:**
   Every database query executed through server actions, route handlers, or ORM clients automatically injects `tenant_id` derived from the verified user session token.
3. **Data Segregation Integrity:**
   No table storing tenant-owned information is ever permitted without a non-nullable `tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE`.

```mermaid
graph TD
    Client[Browser / Mobile Client] -->|HTTPS Request + Auth Cookie| MW[Next.js Middleware Gatekeeper]
    MW -->|Check Path & Session| Gate{Valid Session & Active Tenant?}
    Gate -->|Tenant Inactive or Expired| Block[Redirect to /onboarding/activation-pending]
    Gate -->|Active & Valid Expiry| App[Software Pages / API Handlers]
    App -->|Pooled Connection| NeonPool[Neon Connection Pooler - PgBouncer]
    NeonPool -->|Set app.current_tenant_id| NeonDB[(Neon PostgreSQL Serverless)]
    NeonDB -->|RLS Enforced Data| App
```

---

## 3. Mandatory Tenant Signup, Inactive Defaulting & URL-Level Gatekeeper Specification

### 3.1 Business Requirement
When a new organization registers:
1. Registration requires: **Company/Organization Name, Admin Full Name, Work Email, Password, Mobile Number, City, Address, and Industry**.
2. Upon successful submission:
   - A `tenants` record is created.
   - The tenant `status` MUST be set to `'inactive'`.
   - The tenant `subscription_expiry_date` MUST be explicitly set to **yesterday's date** (`CURRENT_DATE - INTERVAL '1 day'`).
   - The initial admin user is created in `users` with `role = 'company_admin'` and `status = 'inactive'`.
3. **Access Enforcement Gate:**
   - A user can only access internal application routes (`/dashboard`, `/employees`, `/payroll`, `/attendance`, `/leave`, etc.) IF AND ONLY IF:
     1. Login authentication is successful, **AND**
     2. Tenant `status === 'active'`, **AND**
     3. Tenant `subscription_expiry_date >= CURRENT_DATE`.
   - If any of these conditions fail:
     - The user is **strictly blocked at the URL / middleware level**.
     - Direct URL access to any protected route immediately redirects to `/onboarding/activation-pending`.
     - The user cannot bypass this through client-side routing.
   - Only a **Super Admin** (or an automated payment gateway webhook) can activate the tenant by updating `status = 'active'` and setting `subscription_expiry_date` to a future validity period.

### 3.2 Gatekeeper Flow Diagram

```mermaid
sequenceDiagram
    autonumber
    actor User as New Tenant / User
    participant MW as Middleware (proxy.ts)
    participant Auth as Auth / Session Service
    participant DB as Neon PostgreSQL (tenants & users)
    participant Pending as /onboarding/activation-pending Page
    participant App as HRMS Internal Pages (/dashboard)

    User->>MW: Request GET /dashboard
    MW->>Auth: Validate Session Cookie
    alt No Session
        MW-->>User: 302 Redirect /login
    else Session Exists
        MW->>DB: Query tenant status & subscription_expiry_date
        DB-->>MW: Return status, expiry_date
        alt status != 'active' OR expiry_date < CURRENT_DATE
            MW-->>User: 302 Redirect /onboarding/activation-pending
            User->>Pending: View "Account Pending Activation" Screen
        else status == 'active' AND expiry_date >= CURRENT_DATE
            MW->>App: Allow Access (Forward request)
            App-->>User: Render Dashboard Page
        end
    end
```

### 3.3 Database Schema for Tenant Gatekeeper
```sql
CREATE TABLE IF NOT EXISTS tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  plan TEXT NOT NULL DEFAULT 'trial' CHECK (plan IN ('trial', 'starter', 'professional', 'enterprise')),
  status TEXT NOT NULL DEFAULT 'inactive' CHECK (status IN ('active', 'inactive', 'suspended', 'cancelled')),
  subscription_expiry_date DATE NOT NULL DEFAULT (CURRENT_DATE - INTERVAL '1 day'),
  mobile_number TEXT NOT NULL,
  city TEXT NOT NULL,
  address TEXT NOT NULL,
  industry TEXT,
  employee_count_estimate INTEGER DEFAULT 10,
  activated_at TIMESTAMPTZ,
  activated_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_tenants_status_expiry ON tenants(status, subscription_expiry_date);
```

---

## 4. Neon PostgreSQL Infrastructure & Connection Architecture

### 4.1 Connection Configuration
- **Standard Direct Connection (`DATABASE_URL`):**
  `postgresql://neondb_owner:npg_Z0xMEcgFzj1l@ep-lucky-silence-b3vzkr8d.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
  *Usage:* Database migrations, schema DDL updates, long-running batch payroll calculations, and background queue workers.
- **Pooled Connection (`DATABASE_URL_POOLED`):**
  `postgresql://neondb_owner:npg_Z0xMEcgFzj1l@ep-lucky-silence-b3vzkr8d-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
  *Usage:* High-concurrency Next.js Server Components, API Route Handlers, Server Actions, and real-time punch capture.

### 4.2 Pooler Configuration Rules
- Connection mode: Transaction Pooling (PgBouncer).
- Pool size per serverless instance: `max: 20`, `idleTimeoutMillis: 30000`, `connectionTimeoutMillis: 5000`.
- SSL enforcement: `sslmode=require` with valid CA certificate validation.

---

## 5. Global Design System, UI/UX Guidelines & Component Standards

### 5.1 Color Palette & Typography
- **Primary Purple:** `#5e2b9d` (PeopleCore Brand Primary, Active Navigation, Primary Buttons, Progress Bars).
- **Primary Hover:** `#4c2380` (Button hover states).
- **Primary Background Tint:** `#f5f0fa` (Light badge backgrounds, active menu item backgrounds).
- **Secondary / Supporting Accents:**
  - Emerald Green (`#16a34a` / `#dcfce7`): Approved statuses, Present attendance, Paid payslips, Active tenants.
  - Amber Gold (`#d97706` / `#fef3c7`): Pending approvals, In-review stages, Expiring documents.
  - Rose Red (`#dc2626` / `#fee2e2`): Rejected requests, Absent marks, LOP deductions, Terminated status.
  - Slate Gray (`#475569` / `#f1f5f9`): Drafts, Inactive states, Table headers, Secondary borders.
- **Typography:** Geist Sans / Inter font family with strict tabular figures (`tabular-nums`) for currency amounts, hours, employee IDs, and dates.

### 5.2 Layout Grid & Breakpoints
- `Desktop (xl, >= 1280px)`: Collapsible dual-tier sidebar (260px wide), full top navigation with global search, notifications popover, user switcher, and 4-column KPI cards.
- `Laptop / Tablet Landscape (lg, 1024px - 1279px)`: Sidebar collapses to 72px icon rail, 3-column KPI cards, horizontally scrollable data tables.
- `Tablet Portrait (md, 768px - 1023px)`: Off-canvas drawer sidebar triggered by hamburger button, 2-column KPI cards.
- `Mobile (sm, < 768px)`: Bottom navigation rail for primary actions (Punch In/Out, Leave, Payslips, Approvals), stacked summary cards, responsive table cards.

### 5.3 Global UI Component Rules
1. **Page Headers:** Every page MUST feature a standardized `PageHeader` component with:
   - Dynamic Breadcrumbs linking parent modules.
   - H1 Title with subtitle describing the business purpose.
   - Primary Action Button (e.g., "+ Add Employee", "Apply Leave", "Run Payroll") anchored top-right.
   - Secondary Export/Filter Button group.
2. **KPI Summary Deck:** 4 metrics cards displaying current count/amount, trend indicator vs previous month, and micro-sparkline.
3. **Data Tables:**
   - Standard pagination controls (10, 25, 50, 100 rows per page).
   - Global search input filtering across primary text columns.
   - Multi-select checkbox column with floating bulk action bar (Delete, Export, Approve, Assign).
   - Empty state illustration with clear Call-to-Action button when no records match.
   - Loading skeleton rows matching the exact column count.

---

## 6. Global Module Inventory (Modules 1 to 23)

| Module ID | Module Name | Primary Menu Route | Core Functionality |
|---|---|---|---|
| **01** | Dashboard | `/dashboard` | Executive KPIs, attendance overview, pending approvals, quick actions |
| **02** | Organization Management | `/organization` | Company profile, branches, departments, designations, job grades, cost centres, org chart |
| **03** | Employee Management | `/employees` | 360° employee directory, 10-step onboarding form, statutory records, transfers, promotions |
| **04** | Recruitment Management | `/recruitment` | Job requisitions, candidate pipeline, interview scoring panels, offer generation |
| **05** | Onboarding Management | `/onboarding` | New hire checklists, IT asset allocation, document verification, policy sign-offs |
| **06** | Attendance Management | `/attendance` | Web/GPS/Biometric punch capture, shift rosters, overtime rules, regularization requests |
| **07** | Leave Management | `/leave` | Multi-type leave balances, accrual engine, sandwich rules, approvals, carry-forward |
| **08** | Payroll Management | `/payroll` | Salary structures, India compliance (PF, ESI, PT, TDS, Gratuity), monthly payroll runs, payslips |
| **09** | Timesheet & Project Mgmt | `/timesheets` | Project task tracking, weekly timesheet logging, billable hour approval workflows |
| **10** | Performance Management | `/performance` | Appraisal cycles, SMART goals & KPIs, 360° feedback, rating scales, normalization |
| **11** | Learning & Development | `/training` | Training programs, session scheduling, employee enrollments, certificates |
| **12** | Expense Management | `/expenses` | Expense claims, multi-currency receipts, policy limit validations, reimbursements |
| **13** | Asset Management | `/assets` | Asset inventory, barcode/serial tracking, employee assignments, return clearances |
| **14** | Separation & Exit Management | `/separation` | Resignation workflows, notice period waivers, clearance checklists, FnF calculations |
| **15** | Employee Self-Service (ESS) | `/my` | Self check-in/out, leave application, payslip download, tax declarations, helpdesk |
| **16** | Manager Portal | `/manager` | Team roster, pending leave/attendance/expense approvals, team performance reviews |
| **17** | Approval Management | `/approvals` | Universal multi-level approval engine, conditional routing, auto-escalations, delegation |
| **18** | Communication & Engagement | `/communication` | Company-wide announcements, events calendar, pulse surveys, birthday wall |
| **19** | Document Management | `/documents` | Company repository, employee dossier, dynamic letter templates, expiry tracking |
| **20** | Reports & Analytics | `/reports` | 40+ statutory and management reports, custom query builder, scheduled exports |
| **21** | Roles & Permissions | `/admin` | Granular RBAC matrix, user invitations, session logs, immutable audit trail |
| **22** | Settings & Configuration | `/settings` | System-wide policies, numbering sequences, statutory rates, custom fields, localization |
| **23** | SaaS Super Admin Portal | `/super-admin` | Multi-tenant provisioning, subscription billing, tenant activation gatekeeper, module toggles |

---

## 7. Cross-Cutting Capabilities & System Standards

### 7.1 Unified Approval Engine
A centralized engine powers leaves, attendance regularization, overtime, expenses, timesheets, resignations, and salary revisions. Every approval request transitions through states: `pending` -> `approved` | `rejected` | `escalated` | `cancelled`.

### 7.2 Immutable Audit Logging
Every `INSERT`, `UPDATE`, and `DELETE` on financial, payroll, and personal data triggers an audit record in `audit_logs` storing: `tenant_id`, `user_id`, `action`, `entity_type`, `entity_id`, `old_values (JSONB)`, `new_values (JSONB)`, `ip_address`, and `user_agent`.

### 7.3 Data Protection & Sensitive Field Encryption
- **Aadhaar Numbers:** Only the last 4 digits are displayed in plain text (`XXXX-XXXX-1234`). Full 12-digit Aadhaar values are encrypted using AES-256-GCM before database insertion.
- **Bank Account Details & Salaries:** Viewable only by authorized Payroll Admin, HR Admin, and the employee themselves.
- **Soft Deletion:** Business entities (`employees`, `departments`, `assets`, etc.) employ soft deletion (`deleted_at TIMESTAMPTZ`) to maintain historical payroll and audit integrity.

