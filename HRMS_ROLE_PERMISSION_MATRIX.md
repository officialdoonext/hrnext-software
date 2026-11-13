# HRMS Granular Role-Based Access Control (RBAC) & Permission Matrix

**Document Reference:** HRMS-RBAC-2026  
**System Name:** PeopleCore Multi-Tenant HRMS SaaS  
**Security Standard:** Principle of Least Privilege (PoLP) with Separation of Duties (SoD) between Human Resources, Payroll Disbursal, and Audit.

---

## 1. System Role Definitions & Hierarchy

1. **Super Admin (`super_admin`):** SaaS Platform owner. Manages tenants, subscriptions, plan limits, billing, module provisioning, and system settings. Has NO direct access to tenant employee personal/financial data unless explicitly granted for support.
2. **Company Owner (`company_owner`):** Managing Director / CEO of the tenant enterprise. Full governance access across company metrics, executive approvals, and organizational structures.
3. **Company Admin (`company_admin`):** Primary tenant administrative account. Manages company profile, branches, department heads, system policies, and tenant-wide configurations.
4. **HR Admin (`hr_admin`):** Complete human resources operations lead. Controls employee lifecycle, onboarding, attendance policies, leave rules, and organizational records. Restricted from salary payment disbursal without dual authorization.
5. **HR Executive / Generalist (`hr_executive`):** Operational HR team member. Manages daily attendance, verifies onboarding documents, schedules interviews, and assists employees. Cannot view or edit executive salaries or bank account numbers.
6. **Payroll Admin (`payroll_admin`):** Finance and compensation specialist. Has exclusive permissions to configure salary components, execute monthly payroll runs, view full bank account numbers, generate bank transfer files, and process FnF settlements.
7. **Talent Recruiter (`recruiter`):** Sourcing and recruitment specialist. Access strictly restricted to job requisitions, candidate pipelines, interview panels, and offer drafting.
8. **Department Head (`dept_head`):** HOD overseeing an entire department. Approves departmental requisitions, high-value expense claims, and second-level leave escalations.
9. **Reporting Manager (`manager`):** Direct team supervisor. Views team roster, approves daily attendance regularizations, leave requests, weekly timesheets, and submits team performance appraisals.
10. **Team Lead (`team_lead`):** Shift lead / technical lead. Monitors real-time attendance and reviews project timesheets for direct squad members.
11. **Employee (`employee`):** Individual contributor. Access strictly limited to Employee Self-Service (ESS) portal (`/my/*`), viewing own profile, punching attendance, applying for leave, viewing own payslips, and submitting personal expense claims.
12. **External Auditor (`auditor`):** Read-only compliance reviewer. Access limited to attendance registers, PF/ESI challans, audit logs, and anonymized payroll summaries without edit or export capabilities.

---

## 2. Master Permission Matrix Across All 23 Modules

### Legend:
- **C:** Create / Add
- **R:** Read / View
- **U:** Update / Edit
- **D:** Delete / Soft Delete
- **A:** Approve / Reject
- **X:** Export (Excel / CSV / PDF)
- **I:** Bulk Import
- **S:** Access Sensitive Data (Full Unmasked Bank Account, PAN, Encrypted Aadhaar, Salary Breakdown)
- **-:** No Access
- **[Scope]:** `[T]` = Tenant-Wide, `[B]` = Assigned Branch Only, `[D]` = Assigned Department Only, `[M]` = Direct & Indirect Team Only, `[Self]` = Own Records Only.

| Module / Feature | Super Admin | Company Owner | Company Admin | HR Admin | HR Executive | Payroll Admin | Recruiter | Dept Head | Reporting Manager | Employee | Auditor |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **01. Dashboard** | R [All] | R [T] | R [T] | R [T] | R [T] | R [T] | R [T] | R [D] | R [M] | R [Self] | R [T] |
| **02. Org: Company Profile** | CRUDX | CRUDX | CRUDX | RU | R | R | - | R | R | - | R |
| **02. Org: Branches & Depts** | CRUD | CRUDX | CRUDX | CRUDX | R | R | - | R | R | - | R |
| **03. Employee Directory** | - | RX [T] | CRUDX [T] | CRUDXI [T] | CRUX [T] | RX [T] | R [T] | RX [D] | RX [M] | R [T] | RX [T] |
| **03. Employee Salary Info** | - | RS [T] | RS [T] | RS [T] | - | CRUDSX [T] | - | - | - | RS [Self] | RS [T] |
| **03. Employee Bank & Statutory** | - | RS [T] | RS [T] | RS [T] | R (Masked) | CRUDSX [T] | - | - | - | RS [Self] | R (Masked) |
| **04. Recruitment Requisitions** | - | CRUAX | CRUAX | CRUAX | CRU | R | CRUX | CRA | CR | - | R |
| **04. Candidate Pipeline** | - | RX | RX | CRUAX | CRUX | - | CRUAX | RA | RA | - | R |
| **05. Onboarding Verification** | - | R | RU | CRUA | CRU | R | R | R | R | U [Self] | R |
| **06. Attendance Daily & Register** | - | RX [T] | CRUDX [T] | CRUDXI [T] | CRUX [T] | RX [T] | - | RX [D] | RX [M] | R [Self] | RX [T] |
| **06. Attendance Regularization** | - | A | A | CRUA | RU | R | - | A [D] | A [M] | CR [Self] | R |
| **07. Leave Applications** | - | A | A | CRUA | CRU | R | - | A [D] | A [M] | CR [Self] | R |
| **07. Leave Policies & Allocation** | - | CRUD | CRUD | CRUD | R | R | - | - | - | - | R |
| **08. Payroll Components & Struct** | - | CRUD | CRUD | R | - | CRUD | - | - | - | - | R |
| **08. Monthly Payroll Processing** | - | A | A | R | - | CRUAX | - | - | - | - | RX |
| **08. Payslips Access** | - | RX [T] | RX [T] | RX [T] | - | CRUDX [T] | - | - | - | R [Self] | RX [T] |
| **09. Timesheet Approvals** | - | A | A | RA | - | R | - | A [D] | A [M] | CR [Self] | R |
| **10. Performance Appraisals** | - | A | CRUA | CRUA | R | - | - | CRUA [D] | CRUA [M] | CRU [Self] | R |
| **11. Training & Certifications** | - | R | CRUD | CRUD | CRUD | - | - | R | R | CR [Self] | R |
| **12. Expense Claims Approvals** | - | A | A | RA | - | RA | - | A [D] | A [M] | CR [Self] | R |
| **13. Asset Register & Assignment** | - | RX | CRUD | CRUD | CRU | R | - | R | R | R [Self] | R |
| **14. Resignations & FnF** | - | A | CRUA | CRUA | RU | CRUA (FnF) | - | A [D] | A [M] | CR [Self] | R |
| **15. ESS Self-Service Portal** | - | - | - | - | - | - | - | - | - | CRUD [Self] | - |
| **16. Manager Portal Hub** | - | - | - | - | - | - | - | A [D] | A [M] | - | - |
| **17. Approval Engine Workflows** | - | CRUD | CRUD | CRUD | - | - | - | - | - | - | R |
| **18. Communication / Notices** | CRUD [SaaS] | CRUD | CRUD | CRUD | CR | - | - | R | R | R | R |
| **19. Document Templates & Dossier** | - | CRUD | CRUD | CRUD | CRU | - | - | R | R | R [Self] | R |
| **20. Statutory & Management Reports** | R [SaaS] | RX [T] | RX [T] | RX [T] | RX (Non-Fin) | RX (Payroll) | RX (Recruit) | RX [D] | RX [M] | - | RX [T] |
| **21. User Management & Roles** | CRUD [SaaS] | CRUD | CRUD | CRUD | - | - | - | - | - | - | R |
| **22. System & Statutory Settings** | CRUD [SaaS] | CRUD | CRUD | RU | - | RU (Tax) | - | - | - | - | R |
| **23. Super Admin SaaS Platform** | CRUDX | - | - | - | - | - | - | - | - | - | - |

---

## 3. Sensitive Data Access Controls & Masking Policy

### 3.1 Financial & Statutory Privacy Rules
1. **Aadhaar Number Masking:**
   - Display format for standard users and HR Executives: `XXXX-XXXX-9842`.
   - Only Payroll Admin and Company Owner with two-factor re-authentication can click "View Unmasked Aadhaar" (which logs an immediate audit event).
2. **Bank Account Number Masking:**
   - Standard HR views show: `HDFC Bank - ********4921`.
   - Full account number viewable only on Payroll Processing screen and by the employee on their own profile.
3. **Salary & Compensation Masking:**
   - Total CTC, Basic, HRA, and Variable allowances are strictly filtered out of API payloads when requested by users without `payroll_admin`, `company_owner`, or `company_admin` roles.
   - Reporting Managers can view performance ratings, but cannot view direct compensation numbers unless explicitly enabled in company policy.

