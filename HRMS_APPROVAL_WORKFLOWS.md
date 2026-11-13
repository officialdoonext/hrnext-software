# HRMS Universal Approval Workflows, State Transitions & Process Maps

**Document Reference:** HRMS-WF-ENGINE-2026  
**System Name:** PeopleCore Multi-Tenant HRMS SaaS  
**Architecture:** Shared Event-Driven Approval Engine (`approval_requests`, `approval_actions`, `approval_workflows`)

---

## 1. Unified Approval Engine Architecture

The platform operates on a single polymorphic approval engine shared across all modules.

```mermaid
stateDiagram-v2
    [*] --> Draft: User Prepares Request
    Draft --> Pending: User Submits Request
    
    state Pending {
        [*] --> Level1: Route to Step 1 Approver
        Level1 --> Level2: Step 1 Approved (Sequential)
        Level1 --> Rejected: Step 1 Rejected (Mandatory Reason)
        Level2 --> Approved: All Steps Approved
        Level2 --> Rejected: Step 2 Rejected
        Level1 --> Escalated: SLA Exceeded (> 48h)
        Level1 --> Delegated: Approver on Leave
    }
    
    Pending --> Cancelled: Requester Withdraws
    Rejected --> Draft: Allow Resubmission
    Approved --> [*]: Execute Entity Mutation & Notify
    Cancelled --> [*]: Release Reserved Balances
```

---

## 2. Global Workflow 1: Tenant Signup, Inactive Defaulting & Super Admin Activation Gate

```mermaid
sequenceDiagram
    autonumber
    actor Admin as New Tenant Admin
    participant Web as Next.js Signup (/signup)
    participant Neon as Neon PostgreSQL DB
    participant MW as Middleware Gatekeeper
    participant SA as Super Admin
    participant Email as Notification Gateway

    Admin->>Web: Submits Org Name, Admin Email, Password, Mobile, City, Address
    Web->>Neon: INSERT into tenants (status='inactive', expiry_date=CURRENT_DATE - 1)
    Web->>Neon: INSERT into users (role='company_admin', status='inactive')
    Web->>Neon: INSERT into companies (name, address, city, phone)
    Web-->>Admin: Show "Registration Complete. Pending Account Activation."
    
    rect rgb(255, 240, 240)
        Note over Admin,MW: Gatekeeper Blocking Attempted Logins
        Admin->>MW: Attempts direct URL access to /dashboard
        MW->>Neon: Check tenant status & expiry_date
        Neon-->>MW: Return status='inactive', expiry_date < CURRENT_DATE
        MW-->>Admin: 302 Redirect to /onboarding/activation-pending
    end

    rect rgb(240, 255, 240)
        Note over SA,Neon: Super Admin Activation Action
        SA->>Web: Opens /super-admin/companies
        SA->>Web: Clicks "Activate Tenant" & Sets 1-Year Subscription
        Web->>Neon: UPDATE tenants SET status='active', expiry_date=CURRENT_DATE + 365, activated_at=NOW()
        Web->>Neon: UPDATE users SET status='active' WHERE tenant_id=id
        Web->>Email: Send "PeopleCore Account Activated" with Login Link
    end

    Admin->>MW: Enters Credentials on /login
    MW->>Neon: Verify active status & future expiry
    MW-->>Admin: Redirect to /dashboard (Access Granted)
```

---

## 3. Global Workflow 2: Employee Creation & Role Assignment

```mermaid
graph TD
    A[HR Admin Fills 10-Step Add Employee Form] --> B{Validation Passed?}
    B -->|No| C[Highlight Incomplete Fields & Prevent Submission]
    B -->|Yes| D[Transaction Begins on Neon DB]
    D --> E[Insert Record into employees Table]
    D --> F[Insert Encrypted Aadhaar & PAN into employee_statutory_details]
    D --> G[Insert Bank Details into employee_bank_accounts]
    D --> H[Create Login Account in users Table with Designated Role]
    D --> I[Initialize Default Leave Balances in leave_balances Table]
    D --> J[Commit Database Transaction]
    J --> K[Dispatch Welcome Email with Temporary Password]
    J --> L[Trigger Onboarding Checklist Generator]
```

---

## 4. Global Workflow 3: Daily Attendance Regularization Flow

```mermaid
sequenceDiagram
    autonumber
    actor Emp as Employee
    participant ESS as ESS Portal (/my/attendance)
    participant Engine as Approval Engine
    participant Mgr as Reporting Manager
    participant DB as Neon Database

    Emp->>ESS: Identifies Missed Punch on Date D
    Emp->>ESS: Submits Requested Check-In, Check-Out & Reason
    ESS->>Engine: Create approval_request (module='attendance')
    Engine->>Mgr: In-App & Email Notification: "Attendance Regularization Request"
    
    alt Manager Approves
        Mgr->>Engine: Clicks "Approve"
        Engine->>DB: UPDATE attendance_records SET check_in=req_in, check_out=req_out, status='present', is_regularized=TRUE
        Engine->>DB: UPDATE approval_requests SET status='approved'
        Engine->>Emp: Notification: "Regularization Approved"
    else Manager Rejects
        Mgr->>Engine: Clicks "Reject" with Mandatory Rejection Reason
        Engine->>DB: UPDATE approval_requests SET status='rejected', comments=reason
        Engine->>Emp: Notification: "Regularization Rejected: " + reason
    end
```

---

## 5. Global Workflow 4: Leave Application & Approval Workflow

```mermaid
sequenceDiagram
    autonumber
    actor Emp as Employee
    participant ESS as ESS Portal (/my/leave)
    participant DB as Neon Database
    participant Engine as Approval Engine
    participant Mgr as Reporting Manager
    participant HR as HR Admin

    Emp->>ESS: Selects Leave Type, From Date, To Date, Reason
    ESS->>DB: Check available balance in leave_balances
    alt Insufficient Balance
        ESS-->>Emp: Error: "Insufficient leave balance (Available: X days)"
    else Balance Available
        ESS->>DB: Deduct applied days from balance and add to pending column
        ESS->>DB: INSERT into leave_applications (status='pending')
        ESS->>Engine: Register approval_request
        Engine->>Mgr: Notify Manager for Approval
        
        alt Manager Rejects
            Mgr->>Engine: Rejects with Comments
            Engine->>DB: Revert pending days back to available balance
            Engine->>DB: UPDATE leave_applications SET status='rejected'
            Engine->>Emp: Notify Rejection
        else Manager Approves
            alt Consecutive Days > 5 (Requires HR Step)
                Mgr->>Engine: Manager Approves -> Routes to HR
                Engine->>HR: Secondary Approval Request
                HR->>Engine: HR Approves
            else Standard Leave
                Mgr->>Engine: Manager Approves (Final Step)
            end
            Engine->>DB: Shift pending days to used column in leave_balances
            Engine->>DB: UPDATE leave_applications SET status='approved'
            Engine->>DB: UPDATE attendance_records SET status='on_leave' for applied dates
            Engine->>Emp: Notify Approval
        end
    end
```

---

## 6. Global Workflow 5: Monthly Payroll Execution & Finalization

```mermaid
graph TD
    Start[Payroll Admin Initiates Monthly Run for Month M, Year Y] --> Step1[Fetch Active Employees for Period]
    Step1 --> Step2[Aggregate Attendance: Sum Present Days, Holidays, Weekends, and LOP Days]
    Step2 --> Step3[Fetch Fixed Salary Structure Components Basic, HRA, Allowances]
    Step3 --> Step4[Calculate Prorated Gross = Fixed Gross * Paid Days / Month Days]
    Step4 --> Step5[Statutory Calculations: Compute EPF, ESIC, PT, and Section 192 TDS]
    Step5 --> Step6[Fetch Approved Reimbursements & Loan Deductions]
    Step6 --> Step7[Calculate Net Payable = Gross - Deductions]
    Step7 --> Step8[Generate Draft Payroll Entries in payroll_entries Table]
    Step8 --> Step9[HR & Finance Review: Check Variance Outliers vs Month M-1]
    Step9 --> Decision{Approved by Finance Head?}
    Decision -->|Modifications Needed| Step8
    Decision -->|Approved| Lock[Mark payroll_runs as finalized and LOCK records]
    Lock --> Out1[Generate Individual PDF Payslips for ESS]
    Lock --> Out2[Generate Bank Transfer NEFT Batch Excel File]
    Lock --> Out3[Generate EPFO ECR & ESIC Return Files]
```

---

## 7. Global Workflow 6: Expense Claim & Reimbursement Workflow

```mermaid
sequenceDiagram
    autonumber
    actor Emp as Employee
    participant ESS as ESS Expense Portal
    participant Engine as Approval Engine
    participant Mgr as Reporting Manager
    participant Fin as Finance / Accounts Admin
    participant DB as Neon Database

    Emp->>ESS: Uploads Receipt Image, Enters Amount, Category, Project
    ESS->>DB: Check Category Policy Limits
    alt Exceeds Limit without Justification
        ESS-->>Emp: Warning: "Amount exceeds standard limit of ₹X. Requires VP sign-off."
    end
    ESS->>DB: INSERT into expenses (status='submitted')
    ESS->>Engine: Route to Reporting Manager
    
    Mgr->>Engine: Verifies receipt validity & approves
    Engine->>Fin: Routes to Finance for Payment Audit
    Fin->>Engine: Approves for payment
    Engine->>DB: UPDATE expenses SET status='approved'
    Engine->>DB: Queue expense amount into next Payroll Reimbursement entry
    Engine->>Emp: Notify: "Expense Approved for Next Salary Credit"
```

---

## 8. Global Workflow 7: Recruitment Pipeline (Requisition to Offer)

```mermaid
graph LR
    Req[Job Requisition by Dept Head] --> ReqAppr{HR / Finance Approval}
    ReqAppr -->|Approved| Post[Publish Job Opening & External Link]
    Post --> Cand[Candidate Applies / Resume Sourced]
    Cand --> Screen[Recruiter Screening & Rating]
    Screen --> Round1[Technical Interview Panel Evaluation]
    Round1 --> Round2[System Design / Managerial Round]
    Round2 --> OfferDraft[HR Drafts Job Offer Letter with CTC Breakdown]
    OfferDraft --> OfferAppr{Management Approval}
    OfferAppr -->|Approved| SendOffer[Send Digital Offer with Acceptance Deadline]
    SendOffer --> CandDec{Candidate Acceptance?}
    CandDec -->|Accepted| Onboard[Automatically Trigger Onboarding Workflow]
    CandDec -->|Declined| Archive[Archive Candidate with Decline Reason]
```

---

## 9. Global Workflow 8: Performance Appraisal Cycle

```mermaid
sequenceDiagram
    autonumber
    actor HR as HR Admin
    actor Emp as Employee
    actor Mgr as Reporting Manager
    participant App as Performance Engine

    HR->>App: Launch Annual Performance Cycle (e.g., FY26 Annual Review)
    App->>Emp: Notify: "Self-Assessment Form Open"
    Emp->>App: Submits Self-Ratings (1-5) and Goal Achievements
    App->>Mgr: Notify: "Employee Self-Assessment Submitted"
    Mgr->>App: Submits Manager Evaluation & Promotion Recommendations
    App->>HR: Review Calibration Grid (Bell Curve Normalization)
    HR->>App: Finalize Ratings & Increment %
    App->>Emp: Release Final Performance Appraisal Report
```

---

## 10. Global Workflow 9: Asset Allocation, Return & Clearance

```mermaid
graph TD
    NewJoin[New Employee Joins] --> IT[IT Admin Assigns Laptop, Monitor & Serial No]
    IT --> Sign[Employee Signs Digital Handover Agreement]
    Sign --> Active[Asset Status = 'Assigned']
    Active --> Exit[Employee Submits Resignation]
    Exit --> Inspection[IT Admin Conducts Physical Asset Inspection]
    Inspection --> Condition{Asset Condition Check}
    Condition -->|Good Condition| Clear[IT Issue Clearance Sign-off]
    Condition -->|Damaged / Missing| Deduct[Compute Asset Recovery Cost & Forward to FnF]
    Clear --> Return[Asset Status = 'Available']
```

---

## 11. Global Workflow 10: Employee Resignation, Clearance & FnF Settlement

```mermaid
sequenceDiagram
    autonumber
    actor Emp as Resigning Employee
    actor Mgr as Reporting Manager
    actor HR as HR Admin
    actor IT as IT Lead
    actor Fin as Finance Lead
    participant DB as Neon Database

    Emp->>DB: Submits Resignation with Requested LWD & Reason
    DB->>Mgr: Notify Resignation
    Mgr->>DB: Approves Resignation & Confirms Notice Period
    DB->>HR: Confirms Final Relieving Date
    
    par Department Clearances
        HR->>Mgr: KT Completion Sign-off
        HR->>IT: Laptop & System Revocation Sign-off
        HR->>Fin: Loan & Travel Advance Settlement Sign-off
    end
    
    HR->>DB: Execute Full & Final (FnF) Settlement Calculation
    DB->>Fin: Finance Authorizes Final Net Pay Disbursal
    HR->>DB: Generate Relieving Letter & Experience Certificate
    DB->>Emp: Deliver Exit Kit & Mark Employee Status = 'Resigned'
```

