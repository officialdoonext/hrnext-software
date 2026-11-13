# HRMS Reports, Metrics & Analytics Calculation Specifications

**Document Reference:** HRMS-REP-CALC-2026  
**System Name:** PeopleCore Multi-Tenant HRMS SaaS  
**Export Formats Supported:** Raw CSV, Formatted Microsoft Excel (.xlsx with styles), Executive Print-Ready PDF.

---

## 1. Executive Dashboard KPIs & Global Metric Specifications

### 1.1 Active Headcount Metric
- **Business Definition:** Total number of active regular employees legally on payroll as of the evaluation date.
- **Formula:**
  $$\text{Active Headcount} = \sum [\text{employees}] \quad \text{where } \text{tenant\_id} = T \land \text{employment\_status} = \text{'active'} \land \text{joining\_date} \le D_{\text{eval}} \land (\text{deleted\_at IS NULL})$$
- **Data Source:** `employees`
- **Calculation Frequency:** Real-time on page load.
- **Filters Available:** Branch, Department, Designation, Employment Type (Full-Time, Contract, Intern).
- **Excluded Records:** Terminated employees, candidates in offer stage, rejected pre-boarders.

### 1.2 Monthly Attrition Rate (%)
- **Business Definition:** Percentage of employees who exited the organization within the evaluation month.
- **Formula:**
  $$\text{Monthly Attrition Rate} = \left( \frac{\text{Total Exits in Month}}{\frac{\text{Headcount at Month Start} + \text{Headcount at Month End}}{2}} \right) \times 100$$
- **Rounding:** 2 decimal places (e.g., $1.85\%$).
- **Data Source:** `employees` joined with `resignations`.
- **Grouping:** By Department, Tenure Bracket (< 6 months, 6-12 months, 1-3 years, > 3 years), Exit Reason.

### 1.3 Daily Attendance Rate (%)
- **Business Definition:** Ratio of scheduled employees who were present (Full-Day or Half-Day) on date $D$.
- **Formula:**
  $$\text{Attendance Rate} = \left( \frac{N_{\text{Present}} + (0.5 \times N_{\text{Half-Day}})}{N_{\text{Total Active}} - N_{\text{Approved Leave}} - N_{\text{Holiday/Weekend}}} \right) \times 100$$
- **Data Source:** `attendance_records` cross-referenced with `leave_applications` and `holidays`.
- **Rounding:** 1 decimal place (e.g., $94.6\%$).

### 1.4 Leave Liability Valuation (Financial Metric)
- **Business Definition:** The financial liability owed by the company for accrued, unutilized Earned / Privilege Leaves (EL/PL).
- **Formula:**
  $$\text{Total Leave Liability} = \sum_{i=1}^{N} \left[ \text{Available EL Balance}_i \times \left( \frac{\text{Monthly Basic Salary}_i}{30} \right) \right]$$
- **Data Source:** `leave_balances` joined with `employee_salary_assignments` where `leave_types.encashable = TRUE`.
- **Calculation Frequency:** Monthly closing or fiscal year-end audit.

---

## 2. India Statutory Compliance Reports

### 2.1 EPFO Electronic Challan cum Return (ECR) File Generator
- **Report Purpose:** Automated generation of the official EPFO text format uploadable directly to the Unified Employer Portal.
- **Output Format:** Plain Text (.txt) with `#~#` delimiter.
- **Specification of Fields (ECR Format):**
  1. Member UAN (12 digits)
  2. Member Name (as registered with EPFO)
  3. Gross Wages (in ₹)
  4. EPF Wages (capped at ₹15,000 or actual)
  5. EPS Wages (capped at ₹15,000)
  6. EDLI Wages (capped at ₹15,000)
  7. EE Share Remitted (12% of EPF wages)
  8. EPS Share Remitted (8.33% of EPS wages)
  9. ER Share Remitted (Difference: EE Share - EPS Share)
  10. NCP Days (Non-Contributing Period / Unpaid LOP Days)
  11. Total Refund of Advances (0 if none)

### 2.2 ESIC Monthly Contribution Statement
- **Report Purpose:** Monthly statement of insured employees earning Gross Wages $\le ₹21,000$.
- **Output Format:** Microsoft Excel (.xlsx).
- **Columns:**
  - IP Number (17-digit Insurance Number)
  - IP Name
  - No. of Days for which wages paid
  - Total Monthly Wages (₹)
  - Employee's Contribution (0.75%)
  - Employer's Contribution (3.25%)
  - Total Contribution (4.00%)
  - Reason Code for Zero Working Days (e.g., Left Service, On Leave)

### 2.3 Professional Tax (PT) Form 5 Monthly Statement
- **Report Purpose:** State-level remittance return detailing employee distribution across PT slabs.
- **Grouping:** By State of Branch Registration (e.g., Maharashtra, Telangana, Karnataka).
- **Columns:** Slab Range (Gross Wage), Number of Employees, Rate of Tax (₹), Total Tax Remitted (₹).

### 2.4 Form 16 / TDS Section 192 Salary Annexure
- **Report Purpose:** Annual statement summarizing total gross earnings, Section 10 exemptions (HRA, Standard Deduction), Chapter VI-A deductions (80C, 80D), taxable income, and total TDS remitted across 12 months.

---

## 3. Executive Management & Operational Reports Catalog

| Report Name | Module Source | Default Frequency | Target Audience | Primary Grouping | Key Metrics |
|---|---|---|---|---|---|
| **Monthly Payroll Master Register** | Payroll | Monthly | Finance / HR Admin | Cost Centre & Dept | Basic, HRA, Allowances, Gross, PF, ESI, PT, TDS, Net Pay |
| **Bank Disbursal NEFT File** | Payroll | Monthly | Accounts Payable | Bank Name | Account No, Beneficiary Name, IFSC, Net Amount |
| **Attendance Muster Roll (Form 25)** | Attendance | Monthly | Factory / HR Admin | Shift & Branch | Daily punch status (P, A, HD, L, H, W), Total Hours, OT |
| **Tardy / Late Arrival Analysis** | Attendance | Weekly | Reporting Managers | Department | Late punch count > grace period, cumulative lost hours |
| **Leave Utilization Scorecard** | Leave | Quarterly | Executive Leadership | Leave Type | Allotted vs Consumed vs Lapsed days, LOP impact |
| **Recruitment Velocity & TAT** | Recruitment | Monthly | Talent Acquisition Lead | Job Opening | Time to Fill (TTF), Sourcing Channel ROI, Offer Conversion % |
| **Performance Bell Curve Distribution**| Performance | Annual | HR Admin / Leadership | Job Grade & Dept | % of employees in ratings 1, 2, 3, 4, 5 vs Target Curve |
| **Expense Spend Audit** | Expenses | Monthly | CFO / Finance | Expense Category | Spend by project, policy-violation claim count |
| **Asset Depreciation & Inventory** | Assets | Bi-Annual | IT & Facilities | Category & Brand | Total purchase cost, current book value, warranty status |
| **Exit & Attrition Insights** | Separation | Quarterly | CHRO | Department | Primary resignation reasons, notice period recovery dues |

---

## 4. Report Engine Security & Performance Standards

1. **Role-Based Report Filtering:** A manager exporting an attendance or salary report can ONLY view records for employees in their direct/indirect reporting line (`reporting_manager_id` hierarchy).
2. **Streaming Generation for Large Datasets:** When exporting reports exceeding 5,000 rows, the Next.js Route Handler utilizes Node.js stream transformers (`csv-stringify` / `exceljs`) to stream chunks directly to the HTTP response, preventing Vercel/Node memory overflows.
3. **Audit Tracking on Exports:** Every execution of an Excel, CSV, or PDF download logs an immutable entry in `audit_logs` capturing: `user_id`, `report_name`, `filter_parameters_json`, `total_rows_exported`, `ip_address`, and `timestamp`.

