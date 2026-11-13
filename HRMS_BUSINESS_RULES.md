# HRMS Business Logic, Calculation Formulas & Statutory Compliance Rules

**Document Reference:** HRMS-BL-SPEC-2026  
**System Name:** PeopleCore Multi-Tenant HRMS SaaS  
**Target Legal Jurisdiction:** India (EPFO, ESIC, Professional Tax, Income Tax Act 1961, Payment of Gratuity Act 1972, Payment of Bonus Act 1965) with configurable multi-country expansion support.

---

## 1. Tenant Signup, Inactive Defaulting & URL-Level Access Gate

### 1.1 Tenant Registration Business Rule
- **Trigger:** A new user accesses `/signup` (or registers an organization).
- **Mandatory Registration Inputs:**
  1. Organization Name (`name`)
  2. Primary Administrator Full Name (`admin_name`)
  3. Work Email (`email`)
  4. Password (`password`)
  5. Mobile Number (`mobile_number`, 10-digit Indian standard)
  6. City (`city`)
  7. Physical Address (`address`)
  8. Estimated Employee Count (`employee_count_estimate`)
- **System Actions on Submission:**
  1. Creates a record in `tenants`.
  2. Sets `tenants.status = 'inactive'`.
  3. Sets `tenants.subscription_expiry_date = CURRENT_DATE - INTERVAL '1 day'` (Yesterday's date).
  4. Generates a unique tenant slug based on the organization name (e.g., `acme-corp-4091`).
  5. Hashes the password using `bcrypt` (work factor 12) or Argon2id.
  6. Creates the initial tenant user in `users` with `role = 'company_admin'` and `status = 'inactive'`.
  7. Creates the primary `companies` record linked to `tenant_id`.

### 1.2 Access Gatekeeper Specification
Access to ANY internal software page (e.g., `/dashboard`, `/employees`, `/attendance`, `/leave`, `/payroll`, `/settings`, etc.) requires passing **all three gate conditions**:

$$\text{Access Granted} \iff (\text{Auth} = \text{VALID}) \land (\text{Tenant Status} = \text{"active"}) \land (\text{Expiry Date} \ge \text{CURRENT\_DATE})$$

- **Gate Evaluation Matrix:**

| User Auth State | Tenant Status | Subscription Expiry Date | Gateway Action | Target Route |
|---|---|---|---|---|
| Unauthenticated | Any | Any | **Blocked** | Redirect to `/login` |
| Authenticated | `inactive` | Future Date | **Blocked** | Redirect to `/onboarding/activation-pending` |
| Authenticated | `inactive` | Expired (Past Date) | **Blocked** | Redirect to `/onboarding/activation-pending` |
| Authenticated | `active` | Expired (Past Date) | **Blocked** | Redirect to `/onboarding/activation-pending` |
| Authenticated | `active` | Current or Future Date | **ALLOWED** | Forward to requested route (`/dashboard`) |
| Super Admin | N/A (Platform) | N/A | **ALLOWED** | Access to `/super-admin/*` only |

- **URL-Level Enforcement:**
  Enforced directly inside Next.js Edge Middleware (`proxy.ts` / `middleware.ts`). Every incoming HTTP request to protected paths is intercepted before page components render. No client-side bypass is possible.

---

## 2. Attendance & Working Hours Rules

### 2.1 Shift Timings & Grace Period Rules
- **Standard Working Shift Definition:**
  - Shift Start Time: $T_{\text{start}}$ (e.g., 09:00:00)
  - Shift End Time: $T_{\text{end}}$ (e.g., 18:00:00)
  - Grace Period: $G = 15 \text{ minutes}$
  - Late Threshold: $L_{\text{threshold}} = 90 \text{ minutes}$ (09:00 to 10:30)
  - Half-Day Working Hours Cutoff: $H_{\text{min}} = 4.0 \text{ hours}$
  - Full-Day Working Hours Cutoff: $F_{\text{min}} = 8.0 \text{ hours}$

### 2.2 Status Evaluation Algorithm
Given an employee's First Punch-In $P_{\text{in}}$ and Last Punch-Out $P_{\text{out}}$ on calendar date $D$:

1. **Absent Evaluation:**
   If no punches exist and no approved leave or holiday is logged:
   $$\text{Status} = \text{"absent"}$$
2. **Late Arrival Determination:**
   $$\text{If } P_{\text{in}} > T_{\text{start}} + G \land P_{\text{in}} \le T_{\text{start}} + L_{\text{threshold}} \implies \text{Mark Late Arrival}$$
3. **Working Hours Duration:**
   $$\text{Working Hours } (W) = \frac{P_{\text{out}} - P_{\text{in}} - \text{Break Duration}}{3600 \text{ seconds}}$$
4. **Attendance Status Transition:**
   - If $W < 4.0 \text{ hours} \implies \text{Status} = \text{"absent"}$
   - If $4.0 \le W < 8.0 \text{ hours} \implies \text{Status} = \text{"half\_day"}$
   - If $W \ge 8.0 \text{ hours} \implies \text{Status} = \text{"present"}$
5. **Overtime Calculation:**
   $$\text{If } W > F_{\text{min}} + 1.0 \text{ hour} \implies \text{Overtime Hours} = W - F_{\text{min}}$$

### 2.3 Cross-Midnight Shift Boundary Rule
When a shift is configured with `is_night_shift = TRUE` (e.g., 22:00 PM to 06:30 AM next day):
- Any punch occurring between 21:00 PM on Date $D$ and 08:00 AM on Date $D+1$ is linked to the `attendance_records` row of Date $D$.
- Date $D+1$ regular shifts do not overlap or conflict with the night shift record.

---

## 3. Leave Management & Policy Rules

### 3.1 Leave Allocation & Accrual Rules
1. **Annual Allocation vs Monthly Accrual:**
   - If `accrual_frequency = 'monthly'`: An employee receives $\frac{\text{Annual Quota}}{12}$ days on the 1st day of each active calendar month.
   - New joinees joining on or before the 15th of a month receive the full month's accrual; joinees joining after the 15th receive 50% accrual for that month.
2. **Probation Period Restrictions:**
   - During probation (typically first 90 or 180 days), employees can only utilize Casual Leave (CL) up to accumulated accrual. Earned Leave (EL) cannot be taken until confirmation.

### 3.2 Sandwich Leave Rule (Configurable Policy)
- **Policy Definition:**
  When an employee applies for leave on the immediate working day preceding a weekend/holiday AND the immediate working day following that weekend/holiday, the intervening holidays/weekends are counted as leaves.
- **Formula:**
  If Friday is Approved Leave AND Monday is Approved Leave:
  $$\text{Deducted Days} = \text{Leave Days (Fri + Mon)} + \text{Intervening Days (Sat + Sun)} = 4 \text{ Days}$$

### 3.3 Negative Leave Balance & Loss of Pay (LOP)
- If an employee has 0 available days in a leave type and submits a leave request:
  - If "Allow Negative Balance" is `FALSE`: System blocks submission with error: *"Insufficient leave balance."*
  - If leave is approved under "Loss of Pay (LOP)": Deducts zero from balance ledgers; increments `lop_days` in the current month's attendance register.

---

## 4. India Statutory Payroll Engine & Calculation Formulas

### 4.1 Pay Days & LOP Impact Formula
$$\text{Total Calendar Days in Month} = M_{\text{days}} \quad (28, 29, 30, \text{ or } 31)$$
$$\text{Unpaid LOP Days} = \text{Absent Days} + \text{Approved LOP Days}$$
$$\text{Paid Days} = M_{\text{days}} - \text{Unpaid LOP Days}$$
$$\text{Prorated Gross Earnings} = \text{Monthly Fixed Gross} \times \left(\frac{\text{Paid Days}}{M_{\text{days}}}\right)$$

---

### 4.2 Employee Provident Fund (EPF & EPS) Calculation Rules

- **Applicability:** Mandatory for all establishments with 20 or more employees.
- **Statutory Wage Ceiling:** ₹15,000 per month (Basic + DA).
- **Statutory Contribution Rates:**

| Fund Component | Paid By | Contribution Rate | Wage Base | Monthly Cap |
|---|---|---|---|---|
| **Employee EPF** | Employee | 12.00% | $\min(\text{Basic}, ₹15,000)$ | ₹1,800.00 |
| **Employer EPS** (Pension) | Employer | 8.33% | $\min(\text{Basic}, ₹15,000)$ | ₹1,250.00 |
| **Employer EPF** (Diff) | Employer | 3.67% | $\min(\text{Basic}, ₹15,000)$ | ₹550.00 |
| **EDLI** (Insurance) | Employer | 0.50% | $\min(\text{Basic}, ₹15,000)$ | ₹75.00 |
| **EPF Admin Charges** | Employer | 0.50% | $\min(\text{Basic}, ₹15,000)$ | ₹75.00 (Min ₹500/est) |

- **Higher Voluntary Contribution Option:**
  If the company opts for PF on full Basic salary without ₹15,000 capping:
  - Employee EPF = $12\% \times \text{Basic}$
  - Employer EPS = $\min(8.33\% \times \text{Basic}, ₹1,250)$
  - Employer EPF = $(12\% \times \text{Basic}) - \text{Employer EPS}$

---

### 4.3 Employee State Insurance (ESIC) Rules

- **Applicability:** Mandatory for establishments in implemented areas where employee's **Gross Monthly Salary $\le ₹21,000$**.
- **Exception for Persons with Disabilities (PwD):** Wage ceiling is ₹25,000 per month.
- **Contribution Rates:**
  - Employee Share: $0.75\%$ of Gross Wages.
  - Employer Share: $3.25\%$ of Gross Wages.
  - Total ESIC Contribution: $4.00\%$ of Gross Wages.
- **Rule on Wage Increase Mid-Period:**
  If an employee's salary exceeds ₹21,000 during an ongoing contribution period (April–September or October–March), ESIC deductions must continue until the end of that contribution period.

---

### 4.4 Professional Tax (PT) State-Specific Slabs

Professional Tax is deducted based on the **State where the employee's assigned Branch is physically located**:

#### 1. Maharashtra:
- Gross Salary $\le ₹7,500$ (Men) / $\le ₹25,000$ (Women): ₹0
- Gross Salary $₹7,501 - ₹10,000$: ₹175 per month
- Gross Salary $> ₹10,000$: ₹200 per month (except February: ₹300)

#### 2. Karnataka:
- Gross Salary $< ₹15,000$: ₹0
- Gross Salary $\ge ₹15,000$: ₹200 per month

#### 3. Telangana & Andhra Pradesh:
- Gross Salary $\le ₹15,000$: ₹0
- Gross Salary $₹15,001 - ₹20,000$: ₹150 per month
- Gross Salary $> ₹20,000$: ₹200 per month

#### 4. Tamil Nadu:
- Semi-annual slab (deducted in September and March) or amortized monthly.

---

### 4.5 Income Tax / TDS (Section 192)

1. **New Tax Regime (Section 115BAC - Default):**
   - Standard Deduction: **₹75,000** per annum.
   - Slabs:
     - Up to ₹3,00,000: Nil
     - ₹3,00,001 to ₹7,00,000: 5%
     - ₹7,00,001 to ₹10,00,000: 10%
     - ₹10,00,001 to ₹12,00,000: 15%
     - ₹12,00,001 to ₹15,00,000: 20%
     - Above ₹15,00,000: 30%
   - Rebate under Section 87A: Full tax rebate if taxable income $\le ₹7,00,000$.
2. **Old Tax Regime:**
   - Standard Deduction: ₹50,000.
   - Deductions Allowed: Section 80C (up to ₹1,50,000), Section 80D (Health Insurance up to ₹25,000 / ₹50,000), HRA Exemption (Section 10(13A)), Home Loan Interest (Section 24 up to ₹2,00,000).

---

### 4.6 Payment of Gratuity Act 1972

- **Eligibility:** Continuous service of **5 or more years** in the establishment.
- **Formula:**
  $$\text{Gratuity} = \frac{15 \times \text{Last Drawn (Basic + DA)} \times \text{Tenure (Years)}}{26}$$
- **Rounding of Tenure:** If tenure has a fraction exceeding 6 months, round up to the next full year (e.g., 5 years 7 months = 6 years).
- **Statutory Tax-Exemption Limit:** ₹20,00,000.

---

### 4.7 Full & Final (FnF) Settlement Formulation

When an employee exits the organization, the final settlement is computed as:

$$\text{FnF Net Payable} = \text{Credits} - \text{Debits}$$

**Credits:**
1. Unpaid salary for working days in final month: $\text{Gross} \times \left(\frac{\text{Paid Days}}{M_{\text{days}}}\right)$
2. Earned Leave Encashment: $\left(\frac{\text{Basic Salary}}{30}\right) \times \text{Encashable PL Days}$
3. Statutory Gratuity (if tenure $\ge 5$ years)
4. Annual Statutory Bonus pro-rata due
5. Reimbursement claims approved but unpaid

**Debits:**
1. Notice Period Shortfall Recovery: $\left(\frac{\text{Gross Salary}}{30}\right) \times \text{Shortfall Days}$
2. Outstanding Company Loans / Salary Advances
3. Unreturned / Damaged Asset Recovery Costs
4. Applicable TDS / Income Tax on Encashment & Salary

