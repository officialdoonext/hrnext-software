# HRMS Quality Assurance, Security & Functional Testing Checklist

**Document Reference:** HRMS-QA-TEST-2026  
**System Name:** PeopleCore Multi-Tenant HRMS SaaS  
**Scope:** Functional Verification, Multi-Tenant Security, Calculation Validation, and End-to-End Workflows.

---

## 1. Tenant Signup & Activation Gatekeeper Test Cases

| Test ID | Test Scenario | Input Data | Execution Step | Expected Result | Pass/Fail |
|---|---|---|---|---|---|
| **TC-GATE-01** | Successful Tenant Registration Defaults to Inactive & Expired | Org: "Zenith Corp", Admin: "zenith@test.com", Mobile: "9876543210", City: "Pune" | Submit `/signup` form | Tenant record created in Neon DB with `status = 'inactive'`, `subscription_expiry_date = CURRENT_DATE - 1`, user created with `status = 'inactive'`. | [ ] |
| **TC-GATE-02** | Direct URL Access Blocked for Unactivated Tenant | Authenticated user from "Zenith Corp" | Direct URL navigation to `/dashboard` | Middleware intercepts request, detects `status = 'inactive'`, returns HTTP 302 redirect to `/onboarding/activation-pending`. User cannot view dashboard. | [ ] |
| **TC-GATE-03** | Direct URL Access Blocked for Expired Tenant | Tenant with `status = 'active'` but `subscription_expiry_date = 2026-11-10` (Past) | Direct URL navigation to `/employees` | Middleware intercepts request, detects expired subscription, redirects to `/onboarding/activation-pending`. | [ ] |
| **TC-GATE-04** | Super Admin Activation Grants Software Access | Super admin logs into `/super-admin/companies` | Clicks "Activate Tenant", assigns 365 days plan | Database sets `status = 'active'`, `subscription_expiry_date = CURRENT_DATE + 365`. Tenant admin reloads `/dashboard` -> Access successfully granted! | [ ] |

---

## 2. Multi-Tenant Isolation & Penetration Test Cases

| Test ID | Test Scenario | Execution Step | Expected Result | Pass/Fail |
|---|---|---|---|---|
| **TC-SEC-01** | Cross-Tenant Direct Object Reference (IDOR) on Employee Profile | Tenant A user attempts `GET /api/employees/emp-tenant-b-id` | Database RLS policy evaluates `tenant_id = current_tenant`, returns HTTP 404 / 403 Forbidden. Zero cross-tenant data leakage. | [ ] |
| **TC-SEC-02** | Cross-Tenant Attendance Punch Ingestion | Biometric device pushes punch for Employee belonging to Tenant B using Tenant A's device token | Gateway throws `401 Invalid Device Credentials` or `404 Employee Not Found in Tenant`. | [ ] |
| **TC-SEC-03** | Sensitive Salary Field Stripping for Non-Payroll Roles | User with role `hr_executive` calls `GET /api/employees/[id]` | Response JSON contains name, designation, department, but `annual_ctc`, `bank_account`, and `pan` fields are completely stripped or masked. | [ ] |

---

## 3. Statutory India Payroll Calculation Test Cases (With Concrete Numeric Values)

### Test Case 1: Standard Executive Salary (CTC ₹6,00,000 / Year; Monthly Gross ₹50,000)
- **Inputs:**
  - Basic Salary: ₹25,000 / month
  - HRA: ₹12,500 / month
  - Special Allowance: ₹12,500 / month
  - Total Gross: ₹50,000
  - Location: Bangalore, Karnataka
  - Regime: New Tax Regime (Section 115BAC)
  - Paid Days: 30 / 30 (Full Month)
- **Expected Calculation Outputs:**
  1. **EPF Calculation (Capped at ₹15,000 Statutory Wage Ceiling):**
     - Employee EPF (12% of ₹15,000) = **₹1,800.00**
     - Employer EPS (8.33% of ₹15,000) = **₹1,250.00**
     - Employer EPF (3.67% of ₹15,000) = **₹550.00**
  2. **ESIC Calculation:**
     - Gross (₹50,000) exceeds ₹21,000 ceiling $\implies$ **₹0.00 (Not Applicable)**
  3. **Professional Tax (Karnataka):**
     - Gross $\ge ₹15,000 \implies$ **₹200.00**
  4. **TDS Section 192:**
     - Taxable Income = $(₹50,000 \times 12) - ₹75,000 \text{ (Std Ded)} = ₹5,25,000$
     - Under Section 87A rebate, tax liability $\le ₹7,00,000$ is Nil $\implies$ **₹0.00**
  5. **Total Deductions:** ₹1,800 + ₹200 = **₹2,000.00**
  6. **Net Payable Salary:** ₹50,000 - ₹2,000 = **₹48,000.00**

---

### Test Case 2: Factory Worker with ESIC & Overtime (Monthly Fixed Gross ₹18,000)
- **Inputs:**
  - Basic: ₹10,000
  - HRA: ₹4,000
  - Other Allowances: ₹4,000
  - Total Fixed Gross: ₹18,000
  - Month Days: 30; Paid Days: 28 (2 Days LOP)
  - Approved Overtime: 8 Hours (Computed at 2x hourly rate)
  - Location: Pune, Maharashtra
- **Expected Calculation Outputs:**
  1. **Prorated Earned Basic:** ₹10,000 $\times (28/30) =$ **₹9,333.33**
  2. **Prorated Earned Gross:** ₹18,000 $\times (28/30) =$ **₹16,800.00**
  3. **Overtime Earnings:** $\left(\frac{₹16,800}{28 \times 8}\right) \times 2 \times 8 \text{ hours} =$ **₹1,200.00**
  4. **Total Gross Wages:** ₹16,800 + ₹1,200 = **₹18,000.00**
  5. **Employee EPF:** 12% of ₹9,333.33 = **₹1,120.00**
  6. **Employee ESIC:** Gross $\le ₹21,000 \implies 0.75\% \times ₹18,000 =$ **₹135.00**
  7. **Employer ESIC:** $3.25\% \times ₹18,000 =$ **₹585.00**
  8. **Professional Tax (Maharashtra):** Gross $> ₹10,000 \implies$ **₹200.00**
  9. **Total Deductions:** ₹1,120 + ₹135 + ₹200 = **₹1,455.00**
  10. **Net Payable Salary:** ₹18,000 - ₹1,455 = **₹16,545.00**

---

## 4. Attendance & Leave Calculation Test Cases

| Test ID | Test Scenario | Inputs | Expected Result | Pass/Fail |
|---|---|---|---|---|
| **TC-ATT-01** | Grace Period Punch-In | Shift start: 09:00 AM, Punch: 09:12 AM (Grace: 15m) | Marked `Present`, 0 penalty minutes. | [ ] |
| **TC-ATT-02** | Late Punch-In | Shift start: 09:00 AM, Punch: 09:28 AM | Marked `Present (Late Arrival)`, logs 28 late minutes. | [ ] |
| **TC-ATT-03** | Half-Day Punch-Out | Punch In: 09:00 AM, Punch Out: 02:00 PM (Working: 5.0h) | Evaluates between 4h and 8h $\implies$ Marked `Half-Day`. | [ ] |
| **TC-ATT-04** | Night Shift Cross-Midnight Boundary | Punch In: 22:04 (13 Nov), Punch Out: 06:15 (14 Nov) | Record pegged to 13 Nov attendance sheet with 8.18 hours worked. | [ ] |
| **TC-LV-01** | Sandwich Rule Deductions | Friday (14 Nov) CL, Monday (17 Nov) CL, Sat/Sun Weekly Off | Total 4.0 days deducted from CL balance. | [ ] |
| **TC-LV-02** | Insufficient Balance Block | Available CL: 1.0 day; Employee applies for 3.0 days | Form submission blocked with error message. | [ ] |

---

## 5. End-to-End Workflow & Concurrency Test Cases

| Test ID | Test Scenario | Execution Step | Expected Result | Pass/Fail |
|---|---|---|---|---|
| **TC-WF-01** | Simultaneous Leave Approval (Optimistic Lock) | Two managers click "Approve" at exact same second | First request commits and increments version. Second request catches version mismatch and rejects duplicate deduction. | [ ] |
| **TC-WF-02** | Full Employee Exit & FnF Calculation | Resignation approved -> Clearances signed -> FnF Run | Computes Gratuity, PL encashment, notice pay shortfall, generates Relieving Letter PDF, updates status to `Resigned`. | [ ] |
| **TC-WF-03** | Serverless Neon Connection Recovery | Neon cold start / connection drop during punch | PgBouncer reconnects within 3000ms; UI shows smooth loading skeleton without unhandled crash. | [ ] |

