const fs = require('fs');
const path = require('path');

const remainingConfigs = [
  // 1. TIMESHEETS MY
  {
    path: 'app/(hr)/timesheets/my/page.tsx',
    title: 'My Weekly Project Timesheets',
    desc: 'Log hours against assigned client projects, track billable ratios, and submit for manager sign-off.',
    crumbs: [{ label: 'Timesheets', href: '/timesheets' }, { label: 'My Timesheets' }],
    kpis: [
      { label: 'Logged This Week', value: '38.5 Hours', sub: 'Target: 40.0 hours', color: 'text-[#5e2b9d]' },
      { label: 'Billable Hours', value: '34.0 Hours', sub: '88% billable ratio', color: 'text-[#16a34a]' },
      { label: 'Non-Billable Internal', value: '4.5 Hours', sub: 'Sprint planning & 1:1s', color: 'text-[#111827]' },
      { label: 'Submission Status', value: 'Draft', sub: 'Due by Sunday 11:59 PM', color: 'text-amber-600' },
    ],
    tableTitle: 'Current Week Time Entries (03 Nov – 09 Nov 2026)',
    headers: ['Project & Task Description', 'Client Account', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Weekly Total', 'Status', 'Actions'],
    rows: [
      { col1: { title: 'Fintech Core Payment Gateway Integration', sub: 'TSK-201 • Webhook Error Handlers' }, col2: 'Apex Global Financial', col3: '8.0h', col4: '8.0h', col5: '7.5h', col6: '8.0h', col7: '31.5 Hours', status: 'approved', action: 'Edit Entry' },
      { col1: { title: 'Design System & Accessibility Audit', sub: 'TSK-104 • Color Contrast WCAG 2.1' }, col2: 'Internal Platform R&D', col3: '1.0h', col4: '0.0h', col5: '1.0h', col6: '1.0h', col7: '3.0 Hours', status: 'approved', action: 'Edit Entry' },
      { col1: { title: 'Architecture Code Reviews & Mentorship', sub: 'TSK-088 • Pull Request Reviews' }, col2: 'Engineering Team', col3: '0.5h', col4: '1.0h', col5: '1.0h', col6: '1.5h', col7: '4.0 Hours', status: 'approved', action: 'Edit Entry' },
    ]
  },

  // 2. TIMESHEETS TEAM
  {
    path: 'app/(hr)/timesheets/team/page.tsx',
    title: 'Team Weekly Timesheet Submissions',
    desc: 'Review, monitor, and audit project time entries logged by departmental team members.',
    crumbs: [{ label: 'Timesheets', href: '/timesheets' }, { label: 'Team Timesheets' }],
    kpis: [
      { label: 'Team Hours Logged', value: '164.5 Hours', sub: 'Across 4 direct reports', color: 'text-[#5e2b9d]' },
      { label: 'Team Billable Ratio', value: '89.2%', sub: 'Target benchmark: > 85%', color: 'text-[#16a34a]' },
      { label: 'Pending Manager Approval', value: '2 Timesheets', sub: 'Awaiting your review', color: 'text-amber-600' },
      { label: 'Unsubmitted Timesheets', value: '0 Missing', sub: 'All team members on time', color: 'text-[#111827]' },
    ],
    tableTitle: 'Direct Reports Timesheet Register',
    headers: ['Employee Name & ID', 'Primary Project Assignment', 'Total Hours', 'Billable %', 'Logged Period', 'Submitted On', 'Status', 'Actions'],
    rows: [
      { col1: { title: 'Priya Sharma', sub: 'PC-1002' }, col2: 'Fintech Payment Gateway', col3: '42.5 Hours', col4: '92% Billable', col5: '03 Nov – 09 Nov 2026', col6: '09 Nov, 06:15 PM', status: 'pending', action: 'Review Hours' },
      { col1: { title: 'Arjun Mehta', sub: 'PC-1005' }, col2: 'Product Mobile App Redesign', col3: '40.0 Hours', col4: '100% Billable', col5: '03 Nov – 09 Nov 2026', col6: '09 Nov, 05:45 PM', status: 'pending', action: 'Review Hours' },
      { col1: { title: 'Sneha Patil', sub: 'PC-1008' }, col2: 'Cloud Infrastructure & SRE', col3: '41.0 Hours', col4: '85% Billable', col5: '03 Nov – 09 Nov 2026', col6: '09 Nov, 07:00 PM', status: 'approved', action: 'View Log' },
      { col1: { title: 'Vikram Joshi', sub: 'PC-1014' }, col2: 'Full-Stack Integrations', col3: '41.0 Hours', col4: '80% Billable', col5: '03 Nov – 09 Nov 2026', col6: '09 Nov, 06:30 PM', status: 'approved', action: 'View Log' },
    ]
  },

  // 3. TIMESHEETS APPROVALS
  {
    path: 'app/(hr)/timesheets/approvals/page.tsx',
    title: 'Timesheet Approvals & Billing Verification',
    desc: 'Verify billable hours, overtime allowances, and authorize time data for client invoices and monthly payroll.',
    crumbs: [{ label: 'Timesheets', href: '/timesheets' }, { label: 'Approvals' }],
    kpis: [
      { label: 'Pending Approvals', value: '2 Submissions', sub: 'Total 82.5 hours', color: 'text-amber-600' },
      { label: 'Approved This Cycle', value: '82.0 Hours', sub: 'Transferred to billing', color: 'text-[#16a34a]' },
      { label: 'Billable Value', value: '₹3,48,000', sub: 'Client project billing', color: 'text-[#5e2b9d]' },
      { label: 'Overtime Claimed', value: '2.5 Hours', sub: 'Pre-approved OT', color: 'text-[#111827]' },
    ],
    tableTitle: 'Pending Timesheet Approvals Inbox',
    headers: ['Employee Name', 'Client & Project', 'Total Logged Hours', 'Billable Hours', 'Logged Week', 'Submission Timestamp', 'Status', 'Actions'],
    rows: [
      { col1: { title: 'Priya Sharma', sub: 'PC-1002' }, col2: 'Apex Global Financial Core', col3: '42.5 Hours', col4: '39.0 Hours Billable', col5: 'W45 (03 Nov – 09 Nov)', col6: '09 Nov 2026, 06:15 PM', status: 'pending', action: 'Approve Timesheet' },
      { col1: { title: 'Arjun Mehta', sub: 'PC-1005' }, col2: 'InnoHealth Medical UI', col3: '40.0 Hours', col4: '40.0 Hours Billable', col5: 'W45 (03 Nov – 09 Nov)', col6: '09 Nov 2026, 05:45 PM', status: 'pending', action: 'Approve Timesheet' },
    ]
  },

  // 4. PERFORMANCE CYCLES
  {
    path: 'app/(hr)/performance/cycles/page.tsx',
    title: 'Performance Appraisal Cycles & Milestones',
    desc: 'Establish review periods, self-appraisal submission windows, manager calibration sessions, and appraisal lock dates.',
    crumbs: [{ label: 'Performance', href: '/performance' }, { label: 'Cycles' }],
    kpis: [
      { label: 'Active Review Cycle', value: 'Q4 2026 Annual', sub: 'Closes 31 Dec 2026', color: 'text-[#5e2b9d]' },
      { label: 'Self-Appraisals Submitted', value: '78% Complete', sub: '39 / 50 employees', color: 'text-[#16a34a]' },
      { label: 'Manager Scorecards Pending', value: '11 Reviews', sub: 'Target deadline: 20 Nov', color: 'text-amber-600' },
      { label: 'Calibrations Completed', value: '2 Departments', sub: 'Engineering & Marketing', color: 'text-[#111827]' },
    ],
    tableTitle: 'Annual & Quarterly Appraisal Cycles',
    headers: ['Cycle Name & Year', 'Scope / Target Audience', 'Self-Review Window', 'Manager Review Window', 'Committee Calibration', 'Completion %', 'Status', 'Actions'],
    rows: [
      { col1: { title: 'Q4 2026 Annual Performance Review', sub: 'CYC-2026-Q4' }, col2: 'All Confirmed Employees', col3: '01 Nov – 15 Nov 2026', col4: '16 Nov – 30 Nov 2026', col5: '01 Dec – 10 Dec 2026', col6: '78% Completed', status: 'approved', action: 'Manage Cycle' },
      { col1: { title: 'Q2 2026 Mid-Year Check-In', sub: 'CYC-2026-Q2' }, col2: 'Engineering & Design Leads', col3: '01 Jun – 15 Jun 2026', col4: '16 Jun – 30 Jun 2026', col5: 'Completed 05 Jul 2026', col6: '100% Completed', status: 'approved', action: 'View Results' },
      { col1: { title: 'Q1 2027 Strategic Goal Alignment', sub: 'CYC-2027-Q1' }, col2: 'Company-wide OKRs', col3: '01 Jan – 15 Jan 2027', col4: 'Upcoming', col5: 'Upcoming', col6: '0% (Drafting)', status: 'pending', action: 'Configure Cycle' },
    ]
  },

  // 5. PERFORMANCE GOALS
  {
    path: 'app/(hr)/performance/goals/page.tsx',
    title: 'Strategic Goals & Objective Key Results (OKRs)',
    desc: 'Track company strategic pillars, department key deliverables, and individual engineer OKRs.',
    crumbs: [{ label: 'Performance', href: '/performance' }, { label: 'Goals & KPIs' }],
    kpis: [
      { label: 'Total Active Goals', value: '28 OKRs', sub: '12 Company, 16 Departmental', color: 'text-[#5e2b9d]' },
      { label: 'Goals On-Track', value: '82.4%', sub: 'Meeting milestone pace', color: 'text-[#16a34a]' },
      { label: 'At-Risk Key Results', value: '3 Goals', sub: 'Attention required', color: 'text-amber-600' },
      { label: 'Completed Objectives', value: '8 Completed', sub: 'Achieved in Q3/Q4', color: 'text-[#111827]' },
    ],
    tableTitle: 'Active Organizational Goals Ledger',
    headers: ['Goal Objective & Key Result', 'Goal Level', 'Assigned Owner', 'Department', 'Target Milestone Date', 'Progress Bar', 'Status', 'Actions'],
    rows: [
      { col1: { title: 'Migrate enterprise backend to Next.js 16 with Turbopack', sub: 'Achieve zero-downtime production deployment' }, col2: 'Department OKR', col3: 'Priya Sharma', col4: 'Engineering', col5: '30 Nov 2026', col6: '85% Progress', status: 'approved', action: 'Update Progress' },
      { col1: { title: 'Maintain 99.98% API SLA across all APAC cloud clusters', sub: 'Zero P0 outages during business hours' }, col2: 'Company OKR', col3: 'Sneha Patil', col4: 'DevOps & SRE', col5: '31 Dec 2026', col6: '98% Progress', status: 'approved', action: 'Update Progress' },
      { col1: { title: 'Rollout Swiss-Style design token library across all 21 HR modules', sub: '100% WCAG AA contrast compliance' }, col2: 'Individual OKR', col3: 'Arjun Mehta', col4: 'Product Design', col5: '25 Nov 2026', col6: '75% Progress', status: 'approved', action: 'Update Progress' },
      { col1: { title: 'Expand enterprise enterprise SaaS client base by 20%', sub: 'Target 16 active client companies' }, col2: 'Company OKR', col3: 'Vikram Joshi', col4: 'Sales', col5: '31 Dec 2026', col6: '60% Progress', status: 'pending', action: 'Update Progress' },
    ]
  },

  // 6. PERFORMANCE REVIEWS
  {
    path: 'app/(hr)/performance/reviews/page.tsx',
    title: 'Performance Reviews & Manager Scorecards',
    desc: 'Employee self-ratings, manager competency scorecards, leadership ratings, and promotion dossiers.',
    crumbs: [{ label: 'Performance', href: '/performance' }, { label: 'Reviews' }],
    kpis: [
      { label: 'Reviews Initiated', value: '50 Reviews', sub: 'All active workforce', color: 'text-[#5e2b9d]' },
      { label: 'Completed Evaluations', value: '39 Scorecards', sub: '78% complete', color: 'text-[#16a34a]' },
      { label: 'High Performers (4.5+)', value: '12 Employees', sub: 'Eligible for merit hike', color: 'text-amber-600' },
      { label: 'Performance Improvement', value: '1 Employee', sub: 'PIP roadmap created', color: 'text-[#111827]' },
    ],
    tableTitle: 'Q4 2026 Performance Scorecards Calibration',
    headers: ['Employee Name & ID', 'Department', 'Self Score', 'Manager Score', '360 Peer Score', 'Calibration Rating', 'Recommendation', 'Actions'],
    rows: [
      { col1: { title: 'Priya Sharma', sub: 'PC-1002' }, col2: 'Engineering', col3: '4.8 / 5.0', col4: '4.9 / 5.0', col5: '4.7 / 5.0', col6: 'Exceptional (Top 5%)', col7: 'Promotion to Staff Lead', status: 'approved', action: 'View Scorecard' },
      { col1: { title: 'Arjun Mehta', sub: 'PC-1005' }, col2: 'Product Design', col3: '4.5 / 5.0', col4: '4.6 / 5.0', col5: '4.4 / 5.0', col6: 'Exceeds Expectations', col7: 'Merit Salary Hike (+25%)', status: 'approved', action: 'View Scorecard' },
      { col1: { title: 'Sneha Patil', sub: 'PC-1008' }, col2: 'DevOps & Cloud', col3: '4.7 / 5.0', col4: '4.8 / 5.0', col5: '4.6 / 5.0', col6: 'Exceeds Expectations', col7: 'Retention Stock Grant', status: 'approved', action: 'View Scorecard' },
      { col1: { title: 'Vikram Joshi', sub: 'PC-1014' }, col2: 'Sales', col3: '4.1 / 5.0', col4: '4.0 / 5.0', col5: '4.2 / 5.0', col6: 'Meets Expectations', col7: 'Standard Incentive', status: 'approved', action: 'View Scorecard' },
    ]
  },

  // 7. PERFORMANCE FEEDBACK (360)
  {
    path: 'app/(hr)/performance/feedback/page.tsx',
    title: '360-Degree Peer Feedback & Multi-Rater Surveys',
    desc: 'Confidential peer reviews, upward feedback for managers, and cross-functional project collaboration scoring.',
    crumbs: [{ label: 'Performance', href: '/performance' }, { label: '360 Feedback' }],
    kpis: [
      { label: 'Feedback Surveys Sent', value: '150 Requests', sub: '3 per employee', color: 'text-[#5e2b9d]' },
      { label: 'Completed Submissions', value: '138 Received', sub: '92% completion rate', color: 'text-[#16a34a]' },
      { label: 'Average Core Rating', value: '4.5 / 5.0', sub: 'Across leadership & teamwork', color: 'text-[#111827]' },
      { label: 'Peer Review Integrity', value: '100% Anonymized', sub: 'HR calibrated', color: 'text-amber-600' },
    ],
    tableTitle: 'Multi-Rater Feedback Roster',
    headers: ['Reviewee Name', 'Evaluator Role', 'Relationship', 'Competency Focus', 'Submission Date', 'Core Score', 'Status', 'Actions'],
    rows: [
      { col1: { title: 'Priya Sharma', sub: 'PC-1002' }, col2: 'Peer Senior Engineer', col3: 'Cross-Functional Peer', col4: 'Technical Execution & Architecture Mentorship', col5: '08 Nov 2026', col6: '4.9 / 5.0', status: 'approved', action: 'View Feedback' },
      { col1: { title: 'Arjun Mehta', sub: 'PC-1005' }, col2: 'Frontend Engineer', col3: 'Collaborating Developer', col4: 'Design System Documentation & Speed', col5: '07 Nov 2026', col6: '4.6 / 5.0', status: 'approved', action: 'View Feedback' },
      { col1: { title: 'Rajesh Kumar', sub: 'VP Engineering' }, col2: 'Engineering Team', col3: 'Upward Feedback to Manager', col4: 'Empowerment, Psychological Safety & Clarity', col5: '06 Nov 2026', col6: '4.8 / 5.0', status: 'approved', action: 'View Feedback' },
    ]
  },

  // 8. TRAINING PROGRAMS
  {
    path: 'app/(hr)/training/programs/page.tsx',
    title: 'Corporate Training Programs & Workshops Catalog',
    desc: 'Browse technical certifications, mandatory compliance training, leadership masterclasses, and schedules.',
    crumbs: [{ label: 'Training', href: '/training' }, { label: 'Programs' }],
    kpis: [
      { label: 'Active Courses Catalog', value: '8 Programs', sub: 'Technical, compliance, leadership', color: 'text-[#5e2b9d]' },
      { label: 'Total Enrolled Learners', value: '96 Employees', sub: 'Avg 2 courses / employee', color: 'text-[#16a34a]' },
      { label: 'Mandatory Completion', value: '96% on track', sub: 'POSH & ISO 27001 Security', color: 'text-amber-600' },
      { label: 'Training Budget Spent', value: '₹4,85,000', sub: 'Of ₹8,00,000 annual budget', color: 'text-[#111827]' },
    ],
    tableTitle: 'Course Curriculum & Schedules',
    headers: ['Program Title & ID', 'Category', 'Lead Instructor', 'Course Duration', 'Delivery Mode', 'Enrolled / Capacity', 'Status', 'Actions'],
    rows: [
      { col1: { title: 'AWS Cloud Architecture & Kubernetes Deployments', sub: 'TRN-ENG-01' }, col2: 'Technical Skills', col3: 'Sneha Patil (DevOps Lead)', col4: '24 Hours (4 Weeks)', col5: 'Live Online Classroom', col6: '18 / 25 Seats', status: 'approved', action: 'Enroll Employee' },
      { col1: { title: 'POSH, ISO 27001 Security & GDPR / DPDP Compliance', sub: 'TRN-CMP-02' }, col2: 'Mandatory Compliance', col3: 'External Legal Counsel', col4: '6 Hours (Self-Paced)', col5: 'Interactive LMS Portal', col6: '48 / 50 Enrolled', status: 'approved', action: 'Track Compliance' },
      { col1: { title: 'High-Impact Engineering Management & Coaching', sub: 'TRN-LDR-03' }, col2: 'Leadership & Management', col3: 'Rajesh Kumar (VP Eng)', col4: '12 Hours (Weekend)', col5: 'Executive Boardroom', col6: '8 / 12 Seats', status: 'approved', action: 'Enroll Employee' },
    ]
  },

  // 9. TRAINING ENROLLMENTS
  {
    path: 'app/(hr)/training/enrollments/page.tsx',
    title: 'Employee Training Enrollments & Learner Progress',
    desc: 'Track individual course attendance, module milestones, quiz scores, and course completion certificates.',
    crumbs: [{ label: 'Training', href: '/training' }, { label: 'Enrollments' }],
    kpis: [
      { label: 'Active Enrolled Staff', value: '96 Learners', sub: 'Across all active tracks', color: 'text-[#5e2b9d]' },
      { label: 'Average Quiz Score', value: '88.4%', sub: 'High retention score', color: 'text-[#16a34a]' },
      { label: 'Certificates Ready', value: '64 Badges', sub: 'Verified credentials', color: 'text-[#111827]' },
      { label: 'Overdue Mandatory Modules', value: '2 Staff', sub: 'Reminder notices dispatched', color: 'text-amber-600' },
    ],
    tableTitle: 'Learner Enrollment Roster',
    headers: ['Employee Name & ID', 'Course Title', 'Enrollment Date', 'Module Progress', 'Quiz Score', 'Expected Completion', 'Status', 'Actions'],
    rows: [
      { col1: { title: 'Priya Sharma', sub: 'PC-1002' }, col2: 'AWS Cloud Architecture & Kubernetes', col3: '15 Oct 2026', col4: '100% Completed', col5: '96% Score (Distinction)', col6: '05 Nov 2026', status: 'approved', action: 'View Certificate' },
      { col1: { title: 'Arjun Mehta', sub: 'PC-1005' }, col2: 'POSH & ISO 27001 Security Training', col3: '01 Nov 2026', col4: '80% Completed', col5: 'In Progress', col6: '15 Nov 2026', status: 'pending', action: 'Send Reminder' },
      { col1: { title: 'Vikram Joshi', sub: 'PC-1014' }, col2: 'Enterprise Sales Strategy & CRM', col3: '20 Oct 2026', col4: '100% Completed', col5: '92% Score', col6: '02 Nov 2026', status: 'approved', action: 'View Certificate' },
    ]
  },

  // 10. TRAINING CERTIFICATES
  {
    path: 'app/(hr)/training/certificates/page.tsx',
    title: 'Verified Training Certificates & Credentials',
    desc: 'Official certificate archive with cryptographic SHA-256 verification and downloadable PDF badges.',
    crumbs: [{ label: 'Training', href: '/training' }, { label: 'Certificates' }],
    kpis: [
      { label: 'Total Issued Certificates', value: '64 Badges', sub: 'Cryptographically sealed', color: 'text-[#5e2b9d]' },
      { label: 'Compliance Badges (POSH)', value: '48 Certified', sub: 'Mandatory annual certificate', color: 'text-[#16a34a]' },
      { label: 'Technical Master Badges', value: '16 Engineers', sub: 'AWS Cloud & Architecture', color: 'text-[#111827]' },
      { label: 'Verification Accuracy', value: '100% Verified', sub: 'Zero counterfeit credentials', color: 'text-amber-600' },
    ],
    tableTitle: 'Digital Certificate Registry',
    headers: ['Certificate ID', 'Recipient Employee', 'Course Program', 'Issue Date', 'Validity Period', 'Digital Signature Stamp', 'Status', 'Actions'],
    rows: [
      { col1: { title: 'CERT-2026-ENG-082', sub: 'Verified Credential' }, col2: 'Priya Sharma (PC-1002)', col3: 'AWS Cloud Architecture & Kubernetes', col4: '05 Nov 2026', col5: 'Lifetime Validity', col6: 'SHA-256: 7f8a9b2c...3d', status: 'approved', action: 'Download PDF' },
      { col1: { title: 'CERT-2026-CMP-114', sub: 'Verified Credential' }, col2: 'Arjun Mehta (PC-1005)', col3: 'ISO 27001 & Data Protection', col4: '02 Nov 2026', col5: 'Valid until Nov 2027', col6: 'SHA-256: 3a2e1d9c...4f', status: 'approved', action: 'Download PDF' },
      { col1: { title: 'CERT-2026-SLS-041', sub: 'Verified Credential' }, col2: 'Vikram Joshi (PC-1014)', col3: 'Enterprise Sales Strategy', col4: '02 Nov 2026', col5: 'Lifetime Validity', col6: 'SHA-256: 9b8c7d6e...1a', status: 'approved', action: 'Download PDF' },
    ]
  },

  // 11. EXPENSES MY
  {
    path: 'app/(hr)/expenses/my/page.tsx',
    title: 'My Expense Reimbursements & Claims',
    desc: 'Submit corporate expense claims for travel, client lunches, SaaS tools, and track finance payment status.',
    crumbs: [{ label: 'Expenses', href: '/expenses' }, { label: 'My Expenses' }],
    kpis: [
      { label: 'Reimbursed This Year', value: '₹64,800', sub: 'Directly deposited to bank', color: 'text-[#16a34a]' },
      { label: 'Pending Processing', value: '₹4,820', sub: 'Submitted on 06 Nov', color: 'text-amber-600' },
      { label: 'Claims Approved (2026)', value: '6 Claims', sub: '100% receipt verified', color: 'text-[#5e2b9d]' },
      { label: 'Claim Rejection Rate', value: '0.0%', sub: 'All claims compliant with policy', color: 'text-[#111827]' },
    ],
    tableTitle: 'My Expense Claims Ledger',
    headers: ['Claim ID & Title', 'Expense Category', 'Expense Date', 'Claim Amount', 'Tax Receipt File', 'Manager Approval', 'Payout Status', 'Actions'],
    rows: [
      { col1: { title: 'EXP-2026-089', sub: 'FinTech Client Technical Lunch' }, col2: 'Client Entertainment & Food', col3: '06 Nov 2026', col4: '₹4,820', col5: 'Tax_Invoice_Food.pdf', col6: 'Approved by Rajesh Kumar', status: 'pending', action: 'View Receipt' },
      { col1: { title: 'EXP-2026-071', sub: 'AWS Solutions Architect Exam Fee' }, col2: 'Certification & Upskilling', col3: '25 Oct 2026', col4: '₹12,500', col5: 'Pearson_VUE_Receipt.pdf', col6: 'Approved by Rajesh Kumar', status: 'approved', action: 'View Receipt' },
      { col1: { title: 'EXP-2026-042', sub: 'Ergonomic Keyboard & Mouse Set' }, col2: 'Home Office Equipment', col3: '14 Sep 2026', col4: '₹8,200', col5: 'Amazon_Invoice.pdf', col6: 'Approved by Vinay Vakati', status: 'approved', action: 'View Receipt' },
    ]
  },

  // 12. EXPENSES APPROVALS
  {
    path: 'app/(hr)/expenses/approvals/page.tsx',
    title: 'Expense Claims & Reimbursement Approvals',
    desc: 'Audit employee reimbursement invoices, verify GST tax proofs, and release finance payouts.',
    crumbs: [{ label: 'Expenses', href: '/expenses' }, { label: 'Approvals' }],
    kpis: [
      { label: 'Pending Claims Total', value: '₹42,320', sub: '2 claims awaiting sign-off', color: 'text-amber-600' },
      { label: 'Approved This Month', value: '₹1,48,500', sub: 'Sent for bank transfer', color: 'text-[#16a34a]' },
      { label: 'Average Finance TAT', value: '2.2 Days', sub: 'Fast reimbursement turnaround', color: 'text-[#5e2b9d]' },
      { label: 'Policy Non-Compliance', value: '0 Claims', sub: 'All bills within caps', color: 'text-[#111827]' },
    ],
    tableTitle: 'Expense Invoices Approval Queue',
    headers: ['Claim ID', 'Employee Name', 'Expense Category', 'Description / Purpose', 'Amount (INR)', 'Invoice Date', 'Status', 'Actions'],
    rows: [
      { col1: { title: 'EXP-2026-084', sub: 'SaaS Software' }, col2: 'Arjun Mehta (PC-1005)', col3: 'Software Subscriptions', col4: 'Figma Enterprise Organization Annual Seat', col5: '₹37,500', col6: '08 Nov 2026', status: 'pending', action: 'Approve & Pay' },
      { col1: { title: 'EXP-2026-089', sub: 'Travel & Meals' }, col2: 'Priya Sharma (PC-1002)', col3: 'Client Entertainment', col4: 'Lunch with FinTech partner engineering team', col5: '₹4,820', col6: '06 Nov 2026', status: 'pending', action: 'Approve & Pay' },
      { col1: { title: 'EXP-2026-071', sub: 'Certifications' }, col2: 'Sneha Patil (PC-1008)', col3: 'Training Reimbursement', col4: 'AWS Certified Solutions Architect Exam Fee', col5: '₹12,500', col6: '25 Oct 2026', status: 'approved', action: 'View Receipt' },
    ]
  },

  // 13. EXPENSES CATEGORIES
  {
    path: 'app/(hr)/expenses/categories/page.tsx',
    title: 'Expense Categories & Spending Policy Limits',
    desc: 'Define corporate expenditure categories, daily allowance caps, receipt requirements, and tax rules.',
    crumbs: [{ label: 'Expenses', href: '/expenses' }, { label: 'Categories' }],
    kpis: [
      { label: 'Defined Categories', value: '6 Categories', sub: 'Travel, food, software, books', color: 'text-[#5e2b9d]' },
      { label: 'Daily Food Allowance', value: '₹1,500 / day', sub: 'Applicable during travel', color: 'text-[#16a34a]' },
      { label: 'Receipt Threshold', value: 'Mandatory > ₹250', sub: 'GST tax invoice required', color: 'text-[#111827]' },
      { label: 'Audit Compliance', value: '100% Tax Compliant', sub: 'Audited by corporate accounts', color: 'text-amber-600' },
    ],
    tableTitle: 'Corporate Expenditure Categories',
    headers: ['Category Name & Code', 'Expense Scope', 'Daily Per Diem Cap', 'Tax Invoice Mandatory', 'Billable to Client', 'Approval Hierarchy', 'Status', 'Actions'],
    rows: [
      { col1: { title: 'Client Travel & Lodging', sub: 'CAT-EXP-01' }, col2: 'Domestic flights, trains & hotels', col3: '₹6,500 / night (Tier 1)', col4: 'Yes (GST invoice required)', col5: 'Billable (Project Code)', col6: 'Manager + Finance VP', status: 'approved', action: 'Edit Rules' },
      { col1: { title: 'Software Licenses & SaaS', sub: 'CAT-EXP-02' }, col2: 'Figma, GitHub Copilot, JetBrains', col3: 'Pre-approved budget cap', col4: 'Yes (Vendor invoice)', col5: 'Non-billable (Overhead)', col6: 'Department Head + CFO', status: 'approved', action: 'Edit Rules' },
      { col1: { title: 'Client Entertainment & Food', sub: 'CAT-EXP-03' }, col2: 'Business lunches & client dinners', col3: '₹3,000 per attendee', col4: 'Yes (Detailed bill)', col5: 'Billable (Client Project)', col6: 'Line Manager', status: 'approved', action: 'Edit Rules' },
      { col1: { title: 'Books & Continuous Learning', sub: 'CAT-EXP-04' }, col2: 'Technical books & online courses', col3: '₹15,000 / year / employee', col4: 'Yes', col5: 'Non-billable (HR Benefit)', col6: 'Line Manager', status: 'approved', action: 'Edit Rules' },
    ]
  },

  // 14. ASSETS REGISTER
  {
    path: 'app/(hr)/assets/register/page.tsx',
    title: 'Hardware & IT Equipment Inventory Register',
    desc: 'Master directory of company laptops, external 4K monitors, network servers, and peripherals.',
    crumbs: [{ label: 'Assets', href: '/assets' }, { label: 'Register' }],
    kpis: [
      { label: 'Total IT Assets Tracked', value: '142 Devices', sub: 'Total valuation: ₹1.28 Crore', color: 'text-[#5e2b9d]' },
      { label: 'Allocated to Employees', value: '118 Devices', sub: '83% utilization', color: 'text-[#16a34a]' },
      { label: 'Available in Inventory', value: '24 Devices', sub: 'Ready for new hires', color: 'text-amber-600' },
      { label: 'Under Maintenance', value: '2 Devices', sub: 'Apple service center', color: 'text-[#111827]' },
    ],
    tableTitle: 'Master Asset Register',
    headers: ['Asset Tag & Model', 'Device Category', 'Serial Number', 'Purchase Date', 'Procurement Cost', 'Physical Condition', 'Allocation Status', 'Actions'],
    rows: [
      { col1: { title: 'Apple MacBook Pro 16" (M3 Max, 36GB)', sub: 'AST-LPT-2024-001' }, col2: 'Laptop Computer', col3: 'C02G9123MD6R', col4: '15 Jan 2024', col5: '₹2,49,900', col6: 'Excellent (Flawless)', status: 'approved', action: 'View Allocation' },
      { col1: { title: 'Dell UltraSharp 27" 4K Monitor (U2723QE)', sub: 'AST-MON-2024-014' }, col2: 'Display Peripherals', col3: 'CN-0K759F-72872', col4: '20 Jan 2024', col5: '₹58,500', col6: 'Excellent', status: 'approved', action: 'View Allocation' },
      { col1: { title: 'Apple MacBook Pro 14" (M3 Pro, 18GB)', sub: 'AST-LPT-2024-019' }, col2: 'Laptop Computer', col3: 'C02H4882MD6T', col4: '10 Mar 2024', col5: '₹1,99,900', col6: 'Like New (In Stock)', status: 'pending', action: 'Assign Device' },
      { col1: { title: 'YubiKey 5C NFC Security Hardware Key', sub: 'AST-SEC-2024-082' }, col2: 'Security Authentication', col3: 'YK5C-984129', col4: '01 Feb 2024', col5: '₹5,500', col6: 'Assigned (Active)', status: 'approved', action: 'View Allocation' },
    ]
  },

  // 15. ASSETS ASSIGNMENTS
  {
    path: 'app/(hr)/assets/assignments/page.tsx',
    title: 'Hardware Allocations & Handover History',
    desc: 'Track equipment issued to staff, signed asset agreements, and recovery checklists upon separation.',
    crumbs: [{ label: 'Assets', href: '/assets' }, { label: 'Assignments' }],
    kpis: [
      { label: 'Active Asset Allocations', value: '118 Assignments', sub: '100% agreement signed', color: 'text-[#16a34a]' },
      { label: 'Pending Employee Signature', value: '2 Devices', sub: 'Newly issued to recent joiners', color: 'text-amber-600' },
      { label: 'Returned Assets (Q4)', value: '6 Devices', sub: 'Inspected and wiped', color: 'text-[#5e2b9d]' },
      { label: 'Asset Loss Incident Rate', value: '0.0%', sub: 'Zero lost hardware in 2026', color: 'text-[#111827]' },
    ],
    tableTitle: 'Active Asset Allocations Ledger',
    headers: ['Asset Tag & Device', 'Assigned Employee', 'Department', 'Allocation Date', 'Condition on Issue', 'Handover Receipt', 'Status', 'Actions'],
    rows: [
      { col1: { title: 'MacBook Pro 16" (M3 Max)', sub: 'AST-LPT-2024-001' }, col2: 'Priya Sharma (PC-1002)', col3: 'Engineering', col4: '15 Mar 2023', col5: 'Brand New (Sealed)', col6: 'Digitally Signed PDF', status: 'approved', action: 'Handover Slip' },
      { col1: { title: 'Dell UltraSharp 27" 4K Monitor', sub: 'AST-MON-2024-014' }, col2: 'Arjun Mehta (PC-1005)', col3: 'Product Design', col4: '01 Jun 2023', col5: 'Brand New', col6: 'Digitally Signed PDF', status: 'approved', action: 'Handover Slip' },
      { col1: { title: 'MacBook Pro 16" (M3 Pro)', sub: 'AST-LPT-2024-008' }, col2: 'Sneha Patil (PC-1008)', col3: 'DevOps & SRE', col4: '10 Aug 2023', col5: 'Brand New', col6: 'Digitally Signed PDF', status: 'approved', action: 'Handover Slip' },
    ]
  },

  // 16. SEPARATION RESIGNATIONS
  {
    path: 'app/(hr)/separation/resignations/page.tsx',
    title: 'Employee Resignations & Notice Period Tracking',
    desc: 'Manage formal resignations, manager retention interviews, notice period calculations, and exit approvals.',
    crumbs: [{ label: 'Separation', href: '/separation' }, { label: 'Resignations' }],
    kpis: [
      { label: 'Active Notice Periods', value: '2 Employees', sub: 'Serving 30-day notice', color: 'text-amber-600' },
      { label: 'Annual Attrition Rate', value: '4.2%', sub: 'Industry benchmark: 12-18%', color: 'text-[#16a34a]' },
      { label: 'Exit Interviews Done', value: '100% Completed', sub: 'Comprehensive feedback logged', color: 'text-[#5e2b9d]' },
      { label: 'Knowledge Handover', value: 'On-Track (85%)', sub: 'Replacement engineers shadowing', color: 'text-[#111827]' },
    ],
    tableTitle: 'Resignations in Notice Period',
    headers: ['Employee Name & ID', 'Department', 'Resignation Date', 'Notice Period Duration', 'Requested LWD', 'Approved LWD', 'Exit Status', 'Actions'],
    rows: [
      { col1: { title: 'Rohan Gupta', sub: 'PC-1007' }, col2: 'Engineering', col3: '15 Sep 2026', col4: '30 Days Standard', col5: '15 Oct 2026', col6: '15 Oct 2026 (Completed)', status: 'approved', action: 'View Exit Dossier' },
      { col1: { title: 'Aditi Rao', sub: 'PC-1020' }, col2: 'Sales & BD', col3: '05 Nov 2026', col4: '30 Days Standard', col5: '05 Dec 2026', col6: '05 Dec 2026 (Serving Notice)', status: 'pending', action: 'Manage Exit' },
    ]
  },

  // 17. SEPARATION CLEARANCE
  {
    path: 'app/(hr)/separation/clearance/page.tsx',
    title: 'Multi-Departmental Exit Clearance Checklist',
    desc: 'Cross-functional sign-offs across IT hardware recovery, finance account settlements, and project handovers.',
    crumbs: [{ label: 'Separation', href: '/separation' }, { label: 'Clearance' }],
    kpis: [
      { label: 'Clearances in Progress', value: '1 Employee', sub: 'Aditi Rao (Serving notice)', color: 'text-amber-600' },
      { label: 'Hardware Recovered', value: '100% Recovered', sub: 'Laptops, monitors, access card', color: 'text-[#16a34a]' },
      { label: 'Finance Dues Cleared', value: 'Zero Travel Dues', sub: 'All pending expense bills resolved', color: 'text-[#5e2b9d]' },
      { label: 'Relieving Letter Issued', value: 'Instant upon exit', sub: 'Digitally verified release', color: 'text-[#111827]' },
    ],
    tableTitle: 'Exit Clearance Verification Status',
    headers: ['Exiting Employee', 'IT Hardware Recovery', 'Finance Accounts Dues', 'Project Handover Code', 'HR Documentation', 'Overall Clearance', 'Actions'],
    rows: [
      { col1: { title: 'Aditi Rao', sub: 'PC-1020 • Sales BD' }, col2: 'Pending Hardware Return (Dec 05)', col3: 'Clear (No Advance Dues)', col4: 'In Progress (Client Shadowing)', col5: 'Exit Interview Completed', status: 'pending', action: 'Update Checklist' },
      { col1: { title: 'Rohan Gupta', sub: 'PC-1007 • Engineering' }, col2: 'Laptop & Badge Received (Wiped)', col3: 'Clear (F&F Released)', col4: 'Repository Rights Revoked', col5: 'Relieving Letter Dispatched', status: 'approved', action: 'Download Clearance' },
    ]
  },

  // 18. SEPARATION FNF
  {
    path: 'app/(hr)/separation/fnf/page.tsx',
    title: 'Full & Final (F&F) Settlement Engine',
    desc: 'Automated settlement computation: unpaid days salary, earned leave encashment, statutory gratuity, and deductions.',
    crumbs: [{ label: 'Separation', href: '/separation' }, { label: 'Full & Final' }],
    kpis: [
      { label: 'Settlements Disbursed (Q4)', value: '₹3,42,800', sub: 'Disbursed within 15 days of exit', color: 'text-[#16a34a]' },
      { label: 'Pending Calculation', value: '1 F&F Due', sub: 'Aditi Rao (Due 15 Dec 2026)', color: 'text-amber-600' },
      { label: 'Avg Leave Encashment', value: '12.5 Days', sub: 'Calculated at Basic Pay', color: 'text-[#5e2b9d]' },
      { label: 'Statutory Gratuity', value: 'Calculated (Payment of Gratuity Act)', sub: 'Tenure > 5 years eligible', color: 'text-[#111827]' },
    ],
    tableTitle: 'Full & Final Settlements Ledger',
    headers: ['Employee Name & ID', 'Last Working Day', 'Earned Salary Due', 'Leave Encashment (EL)', 'Gratuity Amount', 'Notice Recovery / Deductions', 'Net Payable Amount', 'Payment Status'],
    rows: [
      { col1: { title: 'Rohan Gupta', sub: 'PC-1007' }, col2: '15 Oct 2026', col3: '₹48,500 (15 days)', col4: '₹32,400 (10 days EL)', col5: 'Not eligible (< 5 yrs)', col6: '₹0.00', col7: '₹80,900 Paid', status: 'approved' },
      { col1: { title: 'Deepak Varma', sub: 'PC-0994 (Retired)' }, col2: '31 Aug 2026', col3: '₹1,20,000 (Full month)', col4: '₹75,000 (20 days EL)', col5: '₹4,50,000 (Gratuity 8 yrs)', col6: '₹0.00', col7: '₹6,45,000 Paid', status: 'approved' },
    ]
  },

  // 19. EMPLOYEES SEPARATION (parent tab)
  {
    path: 'app/(hr)/employees/separation/page.tsx',
    title: 'Employee Separation & Exit Management',
    desc: 'Overview of resignations, notice period handovers, exit interviews, and final relieving letters.',
    crumbs: [{ label: 'Employees', href: '/employees' }, { label: 'Separation' }],
    kpis: [
      { label: 'Notice Periods Active', value: '1 Employee', sub: 'Aditi Rao (Exiting Dec 05)', color: 'text-amber-600' },
      { label: 'Separations This Fiscal', value: '3 Exits', sub: '1 Resigned, 1 Sabbatical, 1 Retired', color: 'text-[#5e2b9d]' },
      { label: 'Asset Recovery Rate', value: '100% Hardware Recovered', sub: 'Zero unreturned equipment', color: 'text-[#16a34a]' },
      { label: 'F&F Compliance', value: '100% Within 30 Days', sub: 'Complies with labor standards', color: 'text-[#111827]' },
    ],
    tableTitle: 'Active and Recent Separations',
    headers: ['Employee Name & ID', 'Department', 'Separation Reason', 'Resignation Date', 'Last Working Day', 'Exit Clearance', 'F&F Status', 'Actions'],
    rows: [
      { col1: { title: 'Aditi Rao', sub: 'PC-1020' }, col2: 'Sales BD', col3: 'Higher Education (MBA)', col4: '05 Nov 2026', col5: '05 Dec 2026', col6: 'In Progress (Checklist 60%)', col7: 'Pending LWD', status: 'pending', action: 'Process Clearance' },
      { col1: { title: 'Rohan Gupta', sub: 'PC-1007' }, col2: 'Engineering', col3: 'Better Career Opportunity', col4: '15 Sep 2026', col5: '15 Oct 2026', col6: 'Fully Cleared (100%)', col7: 'Settled (₹80,900)', status: 'approved', action: 'Download Dossier' },
    ]
  },

  // 20. COMMUNICATION EVENTS
  {
    path: 'app/(hr)/communication/events/page.tsx',
    title: 'Company Events, Town Halls & Cultural Calendar',
    desc: 'Schedule and broadcast executive all-hands meetings, technical webinars, festive celebrations, and team offsites.',
    crumbs: [{ label: 'Communication', href: '/communication/announcements' }, { label: 'Events' }],
    kpis: [
      { label: 'Upcoming Company Events', value: '4 Events', sub: 'Scheduled for Q4 2026', color: 'text-[#5e2b9d]' },
      { label: 'Next All-Hands Meeting', value: 'Friday, 14 Nov', sub: 'Quarterly Executive Update', color: 'text-[#16a34a]' },
      { label: 'Average Town Hall Attendance', value: '96% Staff', sub: 'In-person + Zoom livestream', color: 'text-[#111827]' },
      { label: 'Diwali Festive Celebration', value: '13 Nov 2026', sub: 'Office party & cultural games', color: 'text-amber-600' },
    ],
    tableTitle: 'Company Events & Gatherings Calendar',
    headers: ['Event Title', 'Event Category', 'Scheduled Date & Time', 'Venue / Virtual Link', 'Event Organizer', 'Expected Attendees', 'Status', 'Actions'],
    rows: [
      { col1: { title: 'Q4 2026 Quarterly All-Hands & Product Roadmap', sub: 'Executive Leadership Town Hall' }, col2: 'Corporate Town Hall', col3: 'Friday, 14 Nov 2026 • 04:00 PM IST', col4: 'Main Auditorium & Zoom Livestream', col5: 'Executive Office (CEO & Founders)', col6: 'All 50 Employees', status: 'approved', action: 'View Details' },
      { col1: { title: 'Diwali Festive Evening & Cultural Celebration', sub: 'Traditional Attire & Dinner' }, col2: 'Cultural Celebration', col3: 'Thursday, 13 Nov 2026 • 05:30 PM IST', col4: 'Bangalore HQ Terrace Lounge', col5: 'People Operations & Culture Team', col6: 'All Bangalore Staff', status: 'approved', action: 'View Details' },
      { col1: { title: 'Next.js 16 Full-Stack Architecture Masterclass', sub: 'Technical Brown-Bag Session' }, col2: 'Knowledge Sharing', col3: 'Wednesday, 25 Nov 2026 • 03:00 PM IST', col4: 'Engineering Room B + Google Meet', col5: 'Priya Sharma (Staff Lead)', col6: 'Engineering Team (24)', status: 'approved', action: 'View Details' },
    ]
  },

  // 21. COMMUNICATION HELPDESK
  {
    path: 'app/(hr)/communication/helpdesk/page.tsx',
    title: 'HR Helpdesk & Internal Employee Support Tickets',
    desc: 'Employee query resolution portal for payroll discrepancies, medical insurance cards, and workplace requests.',
    crumbs: [{ label: 'Communication', href: '/communication/announcements' }, { label: 'Helpdesk' }],
    kpis: [
      { label: 'Open Support Tickets', value: '3 Active Tickets', sub: 'Resolution SLA: < 24 hrs', color: 'text-amber-600' },
      { label: 'Resolved This Month', value: '28 Tickets', sub: 'Average resolution: 4.8 hrs', color: 'text-[#16a34a]' },
      { label: 'Employee Satisfaction Score', value: '4.9 / 5.0', sub: 'Post-resolution ratings', color: 'text-[#5e2b9d]' },
      { label: 'SLA Adherence Rate', value: '98.5%', sub: 'Target: > 95%', color: 'text-[#111827]' },
    ],
    tableTitle: 'Helpdesk Support Requests Queue',
    headers: ['Ticket ID & Subject', 'Raised By Employee', 'Ticket Category', 'Priority Level', 'Logged On', 'Assigned HR Specialist', 'Status', 'Actions'],
    rows: [
      { col1: { title: 'TKT-2026-104', sub: 'TDS deduction discrepancy in Oct payslip' }, col2: 'Arjun Mehta (PC-1005)', col3: 'Payroll & Taxation', col4: 'High Priority', col5: 'Yesterday, 11:20 AM', col6: 'Finance Payroll Lead', status: 'pending', action: 'Resolve Ticket' },
      { col1: { title: 'TKT-2026-102', sub: 'Medical insurance e-card for newborn child' }, col2: 'Priya Sharma (PC-1002)', col3: 'Health Insurance & Benefits', col4: 'Medium Priority', col5: '08 Nov 2026', col6: 'Vinay Vakati (People Ops)', status: 'approved', action: 'View Ticket' },
      { col1: { title: 'TKT-2026-098', sub: 'Dual monitor stand request for home office' }, col2: 'Sneha Patil (PC-1008)', col3: 'IT Assets & Facilities', col4: 'Low Priority', col5: '05 Nov 2026', col6: 'IT Facilities Admin', status: 'approved', action: 'View Ticket' },
    ]
  },

  // 22. DOCUMENTS COMPANY
  {
    path: 'app/(hr)/documents/company/page.tsx',
    title: 'Company Policy Documents & Standard Guidelines',
    desc: 'Official company handbook, code of business conduct, POSH anti-harassment policy, and IT security protocols.',
    crumbs: [{ label: 'Documents', href: '/documents/templates' }, { label: 'Company Docs' }],
    kpis: [
      { label: 'Published Policies', value: '12 Documents', sub: 'Legally vetted and active', color: 'text-[#5e2b9d]' },
      { label: 'Staff Acknowledgment', value: '98% Signed', sub: 'Digital signature on file', color: 'text-[#16a34a]' },
      { label: 'Policy Revisions (2026)', value: '2 Updated', sub: 'Hybrid Work & DPDP Act', color: 'text-amber-600' },
      { label: 'Compliance Audit Status', value: 'SOC 2 Ready', sub: 'Audited by external legal', color: 'text-[#111827]' },
    ],
    tableTitle: 'Company Policy Repository',
    headers: ['Document Title & Ref', 'Document Category', 'Version Number', 'Effective Date', 'Mandatory Acknowledgment', 'File Format & Size', 'Status', 'Actions'],
    rows: [
      { col1: { title: 'PeopleCore Employee Code of Conduct 2026', sub: 'POL-CORP-001' }, col2: 'Corporate Governance', col3: 'Version 3.2', col4: '01 Jan 2026', col5: 'Mandatory All Staff', col6: 'PDF (2.4 MB)', status: 'approved', action: 'Download PDF' },
      { col1: { title: 'Prevention of Sexual Harassment (POSH) Policy', sub: 'POL-HR-004' }, col2: 'HR Compliance', col3: 'Version 2.0', col4: '01 Jan 2026', col5: 'Mandatory All Staff', col6: 'PDF (1.2 MB)', status: 'approved', action: 'Download PDF' },
      { col1: { title: 'Information Security & Data Privacy Policy (ISO 27001)', sub: 'POL-SEC-008' }, col2: 'IT Security & Compliance', col3: 'Version 4.1', col4: '15 Jun 2026', col5: 'Mandatory All Staff', col6: 'PDF (3.1 MB)', status: 'approved', action: 'Download PDF' },
      { col1: { title: 'Flexible Remote & Hybrid Work Policy Guidelines', sub: 'POL-OPS-012' }, col2: 'Workplace Operations', col3: 'Version 1.4', col4: '01 Sep 2026', col5: 'General Guidelines', col6: 'PDF (950 KB)', status: 'approved', action: 'Download PDF' },
    ]
  },

  // 23. DOCUMENTS EMPLOYEE
  {
    path: 'app/(hr)/documents/employee/page.tsx',
    title: 'Employee Personnel Records & Document Dossiers',
    desc: 'Centralized repository of employee educational certificates, previous relieving letters, PAN, and Aadhaar records.',
    crumbs: [{ label: 'Documents', href: '/documents/templates' }, { label: 'Employee Docs' }],
    kpis: [
      { label: 'Total Tracked Documents', value: '420 Records', sub: 'Encrypted document store', color: 'text-[#5e2b9d]' },
      { label: 'Verified Document Rate', value: '98.5%', sub: 'Background check verified', color: 'text-[#16a34a]' },
      { label: 'Pending HR Verification', value: '4 Uploads', sub: 'Recent new joiners', color: 'text-amber-600' },
      { label: 'Storage Security', value: 'AES-256 Encrypted', sub: 'AWS S3 Private Buckets', color: 'text-[#111827]' },
    ],
    tableTitle: 'Employee Personnel Records Archive',
    headers: ['Employee Name & ID', 'Department', 'Document Type', 'Document Title / Number', 'Uploaded On', 'Verification Status', 'Actions'],
    rows: [
      { col1: { title: 'Priya Sharma', sub: 'PC-1002' }, col2: 'Engineering', col3: 'Identity Proof (PAN)', col4: 'PAN Card Copy (ABCPS1234F)', col5: '15 Mar 2023', col6: 'HR Verified', status: 'approved', action: 'View Document' },
      { col1: { title: 'Arjun Mehta', sub: 'PC-1005' }, col2: 'Product Design', col3: 'Educational Transcript', col4: 'B.Des Degree Certificate (NID)', col5: '01 Jun 2023', col6: 'HR Verified', status: 'approved', action: 'View Document' },
      { col1: { title: 'Sneha Patil', sub: 'PC-1008' }, col2: 'DevOps & SRE', col3: 'Previous Relieving Letter', col4: 'Infosys Service Certificate', col5: '10 Aug 2023', col6: 'HR Verified', status: 'approved', action: 'View Document' },
      { col1: { title: 'Vikram Joshi', sub: 'PC-1014' }, col2: 'Sales', col3: 'Bank Account Proof', col4: 'Cancelled Cheque (HDFC Bank)', col5: '01 Nov 2026', col6: 'Pending Verification', status: 'pending', action: 'Verify Document' },
    ]
  },

  // 24. APPROVALS HISTORY
  {
    path: 'app/(hr)/approvals/history/page.tsx',
    title: 'Central Approvals History & Decision Trail',
    desc: 'Audit trail of historical decisions across leave applications, expense reimbursements, punch corrections, and resignations.',
    crumbs: [{ label: 'Approvals', href: '/approvals/pending' }, { label: 'History' }],
    kpis: [
      { label: 'Total Processed Decisions', value: '348 Requests', sub: 'Full fiscal year 2026', color: 'text-[#5e2b9d]' },
      { label: 'Overall Approval Rate', value: '94.2%', sub: 'Only 5.8% rejected with notes', color: 'text-[#16a34a]' },
      { label: 'Average Turnaround Time', value: '4.2 Hours', sub: 'Fast workflow SLA', color: 'text-[#111827]' },
      { label: 'Audit Trail Integrity', value: '100% Immutable', sub: 'Timestamped and logged', color: 'text-[#16a34a]' },
    ],
    tableTitle: 'Processed Requests History',
    headers: ['Request ID & Type', 'Requestor Employee', 'Department', 'Request Details', 'Decision Timestamp', 'Decided By', 'Final Outcome', 'Actions'],
    rows: [
      { col1: { title: 'REQ-LEV-2026-082', sub: 'Leave Application' }, col2: 'Sneha Patil (PC-1008)', col3: 'DevOps', col4: '1 Day Sick Leave (04 Nov 2026)', col5: '04 Nov 2026, 10:15 AM', col6: 'Rajesh Kumar (VP Eng)', col7: 'Approved in Full', status: 'approved', action: 'Audit Log' },
      { col1: { title: 'REQ-EXP-2026-071', sub: 'Expense Reimbursement' }, col2: 'Sneha Patil (PC-1008)', col3: 'DevOps', col4: 'AWS Exam Fee (₹12,500)', col5: '25 Oct 2026, 04:30 PM', col6: 'Finance Accounts', col7: 'Approved & Disbursed', status: 'approved', action: 'Audit Log' },
      { col1: { title: 'REQ-PCH-2026-039', sub: 'Punch Regularization' }, col2: 'Arjun Mehta (PC-1005)', col3: 'Design', col4: 'Missed in-punch at client site', col5: '08 Nov 2026, 06:45 PM', col6: 'Vinay Vakati (People Ops)', col7: 'Approved with Geo-Proof', status: 'approved', action: 'Audit Log' },
    ]
  },

  // 25. REPORTS ATTENDANCE
  {
    path: 'app/(hr)/reports/attendance/page.tsx',
    title: 'Workforce Attendance & Punctuality Reports',
    desc: 'Analytical breakdown of daily physical attendance, late check-in frequency, absenteeism, and overtime hours by branch.',
    crumbs: [{ label: 'Reports', href: '/reports/employees' }, { label: 'Attendance Reports' }],
    kpis: [
      { label: 'Organization Attendance %', value: '94.8%', sub: '+1.2% vs previous quarter', color: 'text-[#16a34a]' },
      { label: 'Average Daily Hours', value: '8.8 Hours', sub: 'Standard target: 8.5 hrs', color: 'text-[#5e2b9d]' },
      { label: 'Monthly Late Check-ins', value: '18 Occurrences', sub: 'Within 15-min grace window', color: 'text-amber-600' },
      { label: 'Total Overtime Logged', value: '64.5 Hours', sub: 'Disbursed in October payroll', color: 'text-[#111827]' },
    ],
    tableTitle: 'Departmental Attendance Performance Summary',
    headers: ['Department Name', 'Total Headcount', 'Working Days', 'Avg Attendance %', 'Late Check-ins', 'Absenteeism %', 'Total OT Logged', 'Actions'],
    rows: [
      { col1: { title: 'Core Platform Engineering', sub: 'Bangalore & Remote' }, col2: '24 Staff', col3: '22 Days (Oct)', col4: '96.2%', col5: '6 instances', col6: '1.4%', col7: '42.5 Hours', status: 'approved', action: 'Export CSV' },
      { col1: { title: 'Product & User Experience Design', sub: 'Bangalore HQ' }, col2: '8 Staff', col3: '22 Days (Oct)', col4: '95.0%', col5: '3 instances', col6: '2.0%', col7: '8.0 Hours', status: 'approved', action: 'Export CSV' },
      { col1: { title: 'Enterprise Solutions & Sales', sub: 'Mumbai & Delhi' }, col2: '12 Staff', col3: '22 Days (Oct)', col4: '92.4%', col5: '8 instances', col6: '3.6%', col7: '14.0 Hours', status: 'approved', action: 'Export CSV' },
      { col1: { title: 'People Operations & Finance', sub: 'Bangalore HQ' }, col2: '6 Staff', col3: '22 Days (Oct)', col4: '98.0%', col5: '1 instance', col6: '0.8%', col7: '0.0 Hours', status: 'approved', action: 'Export CSV' },
    ]
  },

  // 26. REPORTS LEAVE
  {
    path: 'app/(hr)/reports/leave/page.tsx',
    title: 'Leave Utilization & Encashment Liability Reports',
    desc: 'Analysis of leave consumption patterns, department absenteeism trends, and fiscal financial encashment liabilities.',
    crumbs: [{ label: 'Reports', href: '/reports/employees' }, { label: 'Leave Reports' }],
    kpis: [
      { label: 'Annual Leave Consumption', value: '384 Days Used', sub: 'Avg 7.6 days / staff in 2026', color: 'text-[#5e2b9d]' },
      { label: 'Remaining Quota on Books', value: '742 Days', sub: 'Total unutilized balance', color: 'text-[#16a34a]' },
      { label: 'Total Encashment Liability', value: '₹14,80,000', sub: 'Accrued on company balance sheet', color: 'text-amber-600' },
      { label: 'Most Utilized Leave Type', value: 'Earned Leave (62%)', sub: 'Casual Leave at 24%', color: 'text-[#111827]' },
    ],
    tableTitle: 'Leave Liability & Consumption by Department',
    headers: ['Department Name', 'Eligible Employees', 'Total Entitlement (Days)', 'Leaves Availed (YTD)', 'Leaves Remaining', 'Average Utilization %', 'Encashment Liability', 'Actions'],
    rows: [
      { col1: { title: 'Engineering & Technology', sub: 'Bangalore' }, col2: '24 Employees', col3: '720 Days', col4: '194 Days', col5: '526 Days', col6: '26.9%', col7: '₹9,45,000', status: 'approved', action: 'Export Report' },
      { col1: { title: 'Product & User Design', sub: 'Bangalore' }, col2: '8 Employees', col3: '240 Days', col4: '68 Days', col5: '172 Days', col6: '28.3%', col7: '₹2,68,000', status: 'approved', action: 'Export Report' },
      { col1: { title: 'Enterprise Client Sales', sub: 'Mumbai' }, col2: '12 Employees', col3: '360 Days', col4: '88 Days', col5: '272 Days', col6: '24.4%', col7: '₹1,95,000', status: 'approved', action: 'Export Report' },
      { col1: { title: 'Human Resources & Finance', sub: 'Bangalore' }, col2: '6 Employees', col3: '180 Days', col4: '34 Days', col5: '146 Days', col6: '18.8%', col7: '₹72,000', status: 'approved', action: 'Export Report' },
    ]
  },

  // 27. REPORTS PAYROLL
  {
    path: 'app/(hr)/reports/payroll/page.tsx',
    title: 'Payroll Expenditure & Statutory Compliance Reports',
    desc: 'Monthly salary registers, EPF ECR reports, ESIC monthly statements, and Professional Tax compliance summaries.',
    crumbs: [{ label: 'Reports', href: '/reports/employees' }, { label: 'Payroll Reports' }],
    kpis: [
      { label: 'Monthly Gross Disbursed', value: '₹82,50,000', sub: 'October 2026 payroll run', color: 'text-[#5e2b9d]' },
      { label: 'Employee PF Remittance', value: '₹6,42,000', sub: 'EPF ECR filed electronically', color: 'text-[#16a34a]' },
      { label: 'Monthly TDS Tax Remitted', value: '₹9,84,000', sub: 'Deposited via Challan 281', color: 'text-amber-600' },
      { label: 'Statutory Compliance', value: '100% On-Time', sub: 'Zero penalties or late filings', color: 'text-[#111827]' },
    ],
    tableTitle: 'Monthly Payroll Runs Financial Summary',
    headers: ['Pay Period Month', 'Employees Paid', 'Gross Salaries', 'Total Deductions (PF/Tax)', 'Net Salary Disbursed', 'Employer PF Match', 'ECR Filing Status', 'Actions'],
    rows: [
      { col1: { title: 'October 2026 Payroll Run', sub: 'Locked & Disbursed' }, col2: '50 Employees', col3: '₹82,50,000', col4: '₹18,24,000', col5: '₹64,26,000', col6: '₹6,42,000', status: 'approved', action: 'Download Salary Register' },
      { col1: { title: 'September 2026 Payroll Run', sub: 'Locked & Disbursed' }, col2: '49 Employees', col3: '₹80,40,000', col4: '₹17,80,000', col5: '₹62,60,000', col6: '₹6,28,000', status: 'approved', action: 'Download Salary Register' },
      { col1: { title: 'August 2026 Payroll Run', sub: 'Locked & Disbursed' }, col2: '48 Employees', col3: '₹78,90,000', col4: '₹17,45,000', col5: '₹61,45,000', col6: '₹6,15,000', status: 'approved', action: 'Download Salary Register' },
    ]
  },

  // 28. ADMIN USERS
  {
    path: 'app/(hr)/admin/users/page.tsx',
    title: 'Platform User Accounts & Login Credentials',
    desc: 'Manage portal user identities, configure roles (HR Admin, Manager, Employee), reset passwords, and audit login sessions.',
    crumbs: [{ label: 'Administration', href: '/admin/roles' }, { label: 'Users' }],
    kpis: [
      { label: 'Active User Accounts', value: '50 Portal Users', sub: '100% of workforce enabled', color: 'text-[#16a34a]' },
      { label: 'HR Administrators', value: '3 Admins', sub: 'Full system privileges', color: 'text-[#5e2b9d]' },
      { label: 'Department Managers', value: '6 Managers', sub: 'Team approval portals', color: 'text-blue-700' },
      { label: 'Two-Factor Auth Enforced', value: '96% Enabled', sub: 'TOTP mobile authenticator', color: 'text-amber-600' },
    ],
    tableTitle: 'User Directory & Authentication Status',
    headers: ['User Full Name & ID', 'Work Email Address', 'Assigned Role', 'Account Status', 'Two-Factor (2FA)', 'Last Login Timestamp', 'Session IP', 'Actions'],
    rows: [
      { col1: { title: 'Vinay Vakati', sub: 'ID: USR-001' }, col2: 'vinayvakati16@gmail.com', col3: 'HR Administrator', col4: 'Active & Verified', col5: 'MFA Enabled (TOTP)', col6: 'Today, 11:45 AM', col7: '192.168.0.2', status: 'approved', action: 'Reset Password' },
      { col1: { title: 'Rajesh Kumar', sub: 'ID: USR-002' }, col2: 'manager@peoplecore.io', col3: 'Department Manager', col4: 'Active', col5: 'MFA Enabled', col6: 'Today, 10:14 AM', col7: '103.21.14.88', status: 'approved', action: 'Reset Password' },
      { col1: { title: 'Priya Sharma', sub: 'ID: USR-003' }, col2: 'employee@peoplecore.io', col3: 'Employee (ESS)', col4: 'Active', col5: 'MFA Enabled', col6: 'Today, 09:04 AM', col7: '192.168.0.2', status: 'approved', action: 'Reset Password' },
      { col1: { title: 'Super Admin', sub: 'ID: USR-000' }, col2: 'superadmin@peoplecore.io', col3: 'Super Admin', col4: 'Active', col5: 'Hardware Key', col6: 'Today, 11:42 AM', col7: '192.168.0.2', status: 'approved', action: 'Manage Keys' },
    ]
  },

  // 29. ADMIN NOTIFICATIONS
  {
    path: 'app/(hr)/admin/notifications/page.tsx',
    title: 'System Notification Logs & Webhook Deliveries',
    desc: 'Audit trail of outgoing transactional emails (payslips, offers), Slack webhook alerts, and SMS delivery receipts.',
    crumbs: [{ label: 'Administration', href: '/admin/roles' }, { label: 'Notifications' }],
    kpis: [
      { label: 'Notifications Dispatched', value: '1,420 Alerts', sub: 'Last 30 days', color: 'text-[#5e2b9d]' },
      { label: 'Email Delivery Rate', value: '99.8%', sub: 'Zero bounce backs', color: 'text-[#16a34a]' },
      { label: 'Slack Webhook Alerts', value: '348 Events', sub: 'Leaves, check-ins, birthdays', color: 'text-blue-700' },
      { label: 'Failed Deliveries', value: '2 Retried', sub: 'Transient network glitch', color: 'text-amber-600' },
    ],
    tableTitle: 'System Notification Event Stream',
    headers: ['Notification ID & Event', 'Recipient Target', 'Delivery Channel', 'Event Trigger Payload', 'Dispatched Timestamp', 'Delivery Status', 'Actions'],
    rows: [
      { col1: { title: 'NTF-2026-1402', sub: 'Monthly Payslip Dispatched' }, col2: 'priya.sharma@peoplecore.io', col3: 'Transactional Email (SMTP)', col4: 'October 2026 Payslip PDF attached', col5: '31 Oct 2026, 06:00 PM', status: 'approved', action: 'View Dispatch' },
      { col1: { title: 'NTF-2026-1401', sub: 'Leave Approval Requested' }, col2: 'rajesh.kumar@peoplecore.io', col3: 'Slack Webhook + Email', col4: 'Priya Sharma applied for 3 days EL', col5: '10 Nov 2026, 09:10 AM', status: 'approved', action: 'View Dispatch' },
      { col1: { title: 'NTF-2026-1399', sub: 'Security 2FA Verification' }, col2: 'vinayvakati16@gmail.com', col3: 'Email One-Time Code', col4: 'New login session from 192.168.0.2', col5: '10 Nov 2026, 11:40 AM', status: 'approved', action: 'View Dispatch' },
    ]
  },

  // 30. MY EXPENSES (ESS)
  {
    path: 'app/(hr)/my/expenses/page.tsx',
    title: 'My Expense Reimbursements',
    desc: 'Submit new expense claims with attached invoices and monitor finance payout status.',
    crumbs: [{ label: 'Employee Portal', href: '/my/dashboard' }, { label: 'My Expenses' }],
    kpis: [
      { label: 'Total Reimbursed (2026)', value: '₹64,800', sub: 'Direct bank credit', color: 'text-[#16a34a]' },
      { label: 'Pending Processing', value: '₹4,820', sub: 'Awaiting manager sign-off', color: 'text-amber-600' },
      { label: 'Claims Approved', value: '6 Claims', sub: '100% receipt verified', color: 'text-[#5e2b9d]' },
      { label: 'Average Payment Time', value: '3 Business Days', sub: 'Fast reimbursement', color: 'text-[#111827]' },
    ],
    tableTitle: 'My Submitted Expense Vouchers',
    headers: ['Claim ID & Title', 'Expense Category', 'Expense Date', 'Claim Amount', 'Receipt Attached', 'Approver Status', 'Disbursement Status', 'Actions'],
    rows: [
      { col1: { title: 'EXP-2026-089', sub: 'FinTech Client Technical Lunch' }, col2: 'Client Meals & Food', col3: '06 Nov 2026', col4: '₹4,820', col5: 'Tax_Invoice_Food.pdf', col6: 'Rajesh Kumar (Pending)', status: 'pending', action: 'View Receipt' },
      { col1: { title: 'EXP-2026-071', sub: 'AWS Solutions Architect Exam Fee' }, col2: 'Certifications & Upskilling', col3: '25 Oct 2026', col4: '₹12,500', col5: 'Pearson_VUE_Receipt.pdf', col6: 'Approved by Rajesh Kumar', status: 'approved', action: 'View Receipt' },
      { col1: { title: 'EXP-2026-042', sub: 'Ergonomic Keyboard & Mouse Set' }, col2: 'Home Office Equipment', col3: '14 Sep 2026', col4: '₹8,200', col5: 'Amazon_Invoice.pdf', col6: 'Approved by Vinay Vakati', status: 'approved', action: 'View Receipt' },
    ]
  },

  // 31. MY TIMESHEETS (ESS)
  {
    path: 'app/(hr)/my/timesheets/page.tsx',
    title: 'My Weekly Timesheets & Time Allocations',
    desc: 'Log weekly project time entries, record billable client hours, and monitor submission approval status.',
    crumbs: [{ label: 'Employee Portal', href: '/my/dashboard' }, { label: 'My Timesheets' }],
    kpis: [
      { label: 'Hours Logged This Week', value: '38.5 Hours', sub: 'Target: 40.0 hours', color: 'text-[#5e2b9d]' },
      { label: 'Billable Client Ratio', value: '88% Billable', sub: '34.0 hours client work', color: 'text-[#16a34a]' },
      { label: 'Weekly Status', value: 'Draft', sub: 'Due Sunday by midnight', color: 'text-amber-600' },
      { label: 'Avg Monthly Hours', value: '168.0 Hours', sub: 'Consistent high delivery', color: 'text-[#111827]' },
    ],
    tableTitle: 'Weekly Work Log (03 Nov – 09 Nov 2026)',
    headers: ['Project & Task Description', 'Client Account', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Weekly Total', 'Status', 'Actions'],
    rows: [
      { col1: { title: 'Fintech Core Payment Gateway Integration', sub: 'TSK-201 • Webhook Handlers' }, col2: 'Apex Global Financial', col3: '8.0h', col4: '8.0h', col5: '7.5h', col6: '8.0h', col7: '31.5 Hours', status: 'approved', action: 'Edit' },
      { col1: { title: 'Design System & Component Library', sub: 'TSK-104 • Swiss Tokens' }, col2: 'Internal Platform R&D', col3: '1.0h', col4: '0.0h', col5: '1.0h', col6: '1.0h', col7: '3.0 Hours', status: 'approved', action: 'Edit' },
      { col1: { title: 'Architecture Code Reviews', sub: 'TSK-088 • Team PR Reviews' }, col2: 'Engineering Team', col3: '0.5h', col4: '1.0h', col5: '1.0h', col6: '1.5h', col7: '4.0 Hours', status: 'approved', action: 'Edit' },
    ]
  },

  // 32. MY GOALS (ESS)
  {
    path: 'app/(hr)/my/goals/page.tsx',
    title: 'My Performance Goals & Strategic OKRs',
    desc: 'Track assigned individual objectives, update percentage progress on key results, and submit quarterly milestones.',
    crumbs: [{ label: 'Employee Portal', href: '/my/dashboard' }, { label: 'My Goals' }],
    kpis: [
      { label: 'Active Assigned OKRs', value: '4 Key Results', sub: 'Across Q4 2026', color: 'text-[#5e2b9d]' },
      { label: 'Overall Progress', value: '82.5%', sub: 'Ahead of milestone pace', color: 'text-[#16a34a]' },
      { label: 'Completed Objectives', value: '1 Goal Done', sub: 'Architectural documentation', color: 'text-emerald-700' },
      { label: 'Quarterly Due Date', value: '31 Dec 2026', sub: 'Annual calibration deadline', color: 'text-[#111827]' },
    ],
    tableTitle: 'My Active Objectives & Key Results',
    headers: ['Objective Title & Measurable Target', 'Goal Level', 'Target Date', 'Current Progress', 'Manager Feedback', 'Status', 'Actions'],
    rows: [
      { col1: { title: 'Migrate core payment gateway to Next.js 16 with zero downtime', sub: '100% test coverage and load tested' }, col2: 'Department Goal', col3: '30 Nov 2026', col4: '85% Progress', col5: 'Great velocity on API routing', status: 'approved', action: 'Update Progress' },
      { col1: { title: 'Implement Swiss-style design tokens across all 21 HR modules', sub: 'Clean borders and minimal shadows' }, col2: 'Individual Goal', col3: '25 Nov 2026', col4: '75% Progress', col5: 'Tokens look crisp and consistent', status: 'approved', action: 'Update Progress' },
      { col1: { title: 'Complete AWS Certified Solutions Architect Certification', sub: 'Score > 850 / 1000' }, col2: 'Learning Goal', col3: '25 Oct 2026', col4: '100% (Achieved)', col5: 'Completed with 892 score!', status: 'approved', action: 'View Certificate' },
    ]
  },

  // 33. MY TRAINING (ESS)
  {
    path: 'app/(hr)/my/training/page.tsx',
    title: 'My Courses, Learning Modules & Certifications',
    desc: 'Access your assigned learning tracks, complete mandatory compliance modules, and download certificates.',
    crumbs: [{ label: 'Employee Portal', href: '/my/dashboard' }, { label: 'My Training' }],
    kpis: [
      { label: 'Enrolled Courses', value: '3 Programs', sub: '2 technical, 1 compliance', color: 'text-[#5e2b9d]' },
      { label: 'Completed Courses', value: '2 Completed', sub: '100% quiz scores', color: 'text-[#16a34a]' },
      { label: 'Mandatory Compliance', value: 'Fully Certified', sub: 'POSH & ISO 27001 completed', color: 'text-emerald-700' },
      { label: 'Learning Hours (2026)', value: '42.0 Hours', sub: 'Upskilling investment', color: 'text-[#111827]' },
    ],
    tableTitle: 'My Enrolled Courses & Progress',
    headers: ['Course Title & Program ID', 'Course Category', 'Instructor', 'Duration', 'Progress Bar', 'Assessment Score', 'Status', 'Actions'],
    rows: [
      { col1: { title: 'AWS Cloud Architecture & Kubernetes Deployments', sub: 'TRN-ENG-01' }, col2: 'Technical Skills', col3: 'Sneha Patil (DevOps Lead)', col4: '24 Hours', col5: '100% Completed', col6: '96% (Distinction)', status: 'approved', action: 'Download Certificate' },
      { col1: { title: 'POSH, ISO 27001 Security & GDPR / DPDP Compliance', sub: 'TRN-CMP-02' }, col2: 'Mandatory Compliance', col3: 'External Legal Counsel', col4: '6 Hours', col5: '100% Completed', col6: '100% Score', status: 'approved', action: 'Download Certificate' },
      { col1: { title: 'High-Performance Engineering Management & Coaching', sub: 'TRN-LDR-03' }, col2: 'Leadership Skills', col3: 'Rajesh Kumar (VP Eng)', col4: '12 Hours', col5: '40% In Progress', col6: 'Upcoming Quiz', status: 'pending', action: 'Continue Course' },
    ]
  },

  // 34. MY ASSETS (ESS)
  {
    path: 'app/(hr)/my/assets/page.tsx',
    title: 'My Allocated Hardware Assets & Equipment',
    desc: 'Inventory of laptops, monitors, accessories, and security hardware keys allocated to your account.',
    crumbs: [{ label: 'Employee Portal', href: '/my/dashboard' }, { label: 'My Assets' }],
    kpis: [
      { label: 'Allocated Devices', value: '4 Items', sub: 'Laptops, monitor, key, badge', color: 'text-[#5e2b9d]' },
      { label: 'Hardware Replacement', value: 'Eligible in 2027', sub: '3-year enterprise upgrade cycle', color: 'text-[#16a34a]' },
      { label: 'AppleCare Warranty', value: 'Active Coverage', sub: 'Valid through March 2027', color: 'text-[#111827]' },
      { label: 'Handover Receipts', value: 'All Signed', sub: 'Digitally verified on file', color: 'text-amber-600' },
    ],
    tableTitle: 'Company Equipment Allocated to You',
    headers: ['Asset Tag & Device Model', 'Category', 'Serial Number', 'Issued Date', 'Warranty Expiry', 'Condition on Issue', 'Status', 'Actions'],
    rows: [
      { col1: { title: 'Apple MacBook Pro 16" (M3 Max, 36GB RAM, 1TB SSD)', sub: 'AST-LPT-2024-001' }, col2: 'Laptop Computer', col3: 'C02G9123MD6R', col4: '15 Mar 2023', col5: '15 Mar 2027 (AppleCare+)', col6: 'Brand New (Sealed)', status: 'approved', action: 'View Agreement' },
      { col1: { title: 'Dell UltraSharp 27" 4K USB-C Monitor (U2723QE)', sub: 'AST-MON-2024-014' }, col2: 'External Display', col3: 'CN-0K759F-72872', col4: '20 Jan 2024', col5: '20 Jan 2027', col6: 'Brand New', status: 'approved', action: 'View Agreement' },
      { col1: { title: 'YubiKey 5C NFC Two-Factor Hardware Security Key', sub: 'AST-SEC-2024-082' }, col2: 'Security Key', col3: 'YK5C-984129', col4: '15 Mar 2023', col5: 'Lifetime Warranty', col6: 'Active (Paired)', status: 'approved', action: 'View Agreement' },
      { col1: { title: 'RFID Smart Access Badge (North Tower Turnstiles)', sub: 'AST-BDG-2023-119' }, col2: 'Physical Access Badge', col3: 'RFID-PC1002', col4: '15 Mar 2023', col5: 'Permanent Employee', col6: 'Active', status: 'approved', action: 'View Agreement' },
    ]
  },

  // 35. MY ANNOUNCEMENTS (ESS)
  {
    path: 'app/(hr)/my/announcements/page.tsx',
    title: 'Company Announcements & Community Bulletin',
    desc: 'Real-time updates, town hall announcements, holiday circulars, and leadership messages.',
    crumbs: [{ label: 'Employee Portal', href: '/my/dashboard' }, { label: 'Announcements' }],
    kpis: [
      { label: 'Active Broadcasts', value: '3 Announcements', sub: 'Latest posted today', color: 'text-[#5e2b9d]' },
      { label: 'Next All-Hands Meeting', value: 'Friday, 14 Nov', sub: 'Quarterly Executive Update', color: 'text-[#16a34a]' },
      { label: 'Upcoming Public Holiday', value: 'Diwali (14 Nov)', sub: 'Paid company closure', color: 'text-amber-600' },
      { label: 'Policy Updates', value: '1 New Guideline', sub: 'Winter work-from-anywhere', color: 'text-[#111827]' },
    ],
    tableTitle: 'Company Broadcasts & Circulars',
    headers: ['Announcement Title & Scope', 'Category', 'Published Date', 'Author / Department', 'Target Audience', 'Status', 'Actions'],
    rows: [
      { col1: { title: 'PeopleCore HRMS 2.0 Official Rollout Across All Branches', sub: 'Enjoy instant check-ins, transparent leave quotas, and streamlined 360 appraisals.' }, col2: 'Company Update', col3: 'Today, 10 Nov 2026', col4: 'Vinay Vakati (People Ops)', col5: 'All 50 Employees', status: 'approved', action: 'Read Full Post' },
      { col1: { title: 'Annual All-Hands Town Hall & Product Roadmap Session', sub: 'Join executive leadership this Friday at 4:00 PM IST on Zoom for Q4 updates.' }, col2: 'Executive Event', col3: '08 Nov 2026', col4: 'Executive Office (CEO)', col5: 'All Global Branches', status: 'approved', action: 'Read Full Post' },
      { col1: { title: 'Diwali & Winter Holiday Schedule Published', sub: 'The unified 2026-2027 statutory holiday calendar has been uploaded to the portal.' }, col2: 'Policy & Holiday', col3: '04 Nov 2026', col4: 'HR Administration', col5: 'All India Offices', status: 'approved', action: 'Read Full Post' },
    ]
  },

  // 36. MY HELP (ESS)
  {
    path: 'app/(hr)/my/help/page.tsx',
    title: 'Employee HR Helpdesk & Support Tickets',
    desc: 'Submit and track queries for payroll, group medical insurance claims, tax assistance, or facilities requests.',
    crumbs: [{ label: 'Employee Portal', href: '/my/dashboard' }, { label: 'Help & Support' }],
    kpis: [
      { label: 'My Open Tickets', value: '1 Active Ticket', sub: 'Resolution SLA: < 24 hrs', color: 'text-amber-600' },
      { label: 'Tickets Resolved (2026)', value: '4 Resolved', sub: 'Average turnaround: 3.5 hrs', color: 'text-[#16a34a]' },
      { label: 'Assigned HR Contact', value: 'Vinay Vakati', sub: 'People Operations Lead', color: 'text-[#5e2b9d]' },
      { label: 'Support SLA Compliance', value: '100% on time', sub: 'Quick issue resolution', color: 'text-[#111827]' },
    ],
    tableTitle: 'My Support Tickets History',
    headers: ['Ticket ID & Subject', 'Category', 'Created Date', 'Priority', 'Assigned Specialist', 'Current Status', 'Actions'],
    rows: [
      { col1: { title: 'TKT-2026-102', sub: 'Medical insurance e-card for newborn child' }, col2: 'Health Insurance & Benefits', col3: '08 Nov 2026', col4: 'Medium Priority', col5: 'Vinay Vakati (People Ops)', status: 'approved', action: 'View Thread' },
      { col1: { title: 'TKT-2026-064', sub: 'Form 16 Part B signed copy download issue' }, col2: 'Payroll & Taxes', col3: '16 Jun 2026', col4: 'High Priority', col5: 'Finance Payroll Lead', status: 'approved', action: 'View Thread' },
      { col1: { title: 'TKT-2026-031', sub: 'Ergonomic office chair adjustment request' }, col2: 'IT & Facilities', col3: '12 Feb 2026', col4: 'Low Priority', col5: 'IT Facilities Admin', status: 'approved', action: 'View Thread' },
    ]
  },

  // 37. MANAGER TIMESHEET APPROVALS
  {
    path: 'app/(hr)/manager/timesheet-approvals/page.tsx',
    title: 'Team Timesheet Approvals & Project Time Logs',
    desc: 'Verify and authorize weekly project time submissions from your direct reports for client invoicing.',
    crumbs: [{ label: 'Manager', href: '/manager/dashboard' }, { label: 'Timesheet Approvals' }],
    kpis: [
      { label: 'Timesheets Pending Review', value: '2 Submissions', sub: 'Total 82.5 hours', color: 'text-amber-600' },
      { label: 'Team Billable Ratio', value: '89.2% Billable', sub: 'Exceeds 85% target', color: 'text-[#16a34a]' },
      { label: 'Total Hours This Week', value: '164.5 Hours', sub: 'Across 4 direct reports', color: 'text-[#5e2b9d]' },
      { label: 'Overtime Claimed', value: '2.5 Hours OT', sub: 'Pre-approved sprint work', color: 'text-[#111827]' },
    ],
    tableTitle: 'Pending Timesheet Sign-Offs',
    headers: ['Team Member Name', 'Assigned Project', 'Total Logged Hours', 'Billable Hours', 'Submission Period', 'Status', 'Actions'],
    rows: [
      { col1: { title: 'Priya Sharma', sub: 'PC-1002' }, col2: 'Fintech Payment Gateway Core', col3: '42.5 Hours', col4: '39.0 Hours Billable', col5: 'W45 (03 Nov – 09 Nov 2026)', status: 'pending', action: 'Approve Timesheet' },
      { col1: { title: 'Arjun Mehta', sub: 'PC-1005' }, col2: 'InnoHealth Medical Mobile App', col3: '40.0 Hours', col4: '40.0 Hours Billable', col5: 'W45 (03 Nov – 09 Nov 2026)', status: 'pending', action: 'Approve Timesheet' },
      { col1: { title: 'Sneha Patil', sub: 'PC-1008' }, col2: 'Cloud Infrastructure Automation', col3: '41.0 Hours', col4: '35.0 Hours Billable', col5: 'W45 (03 Nov – 09 Nov 2026)', status: 'approved', action: 'View Approved' },
      { col1: { title: 'Vikram Joshi', sub: 'PC-1014' }, col2: 'Full-Stack Integrations', col3: '41.0 Hours', col4: '33.0 Hours Billable', col5: 'W45 (03 Nov – 09 Nov 2026)', status: 'approved', action: 'View Approved' },
    ]
  },

  // 38. MANAGER PERFORMANCE
  {
    path: 'app/(hr)/manager/performance/page.tsx',
    title: 'Team Performance Scorecards & 360 Appraisals',
    desc: 'Conduct annual performance evaluations, score technical competencies, and submit promotion recommendations for direct reports.',
    crumbs: [{ label: 'Manager', href: '/manager/dashboard' }, { label: 'Team Performance' }],
    kpis: [
      { label: 'Direct Reports in Review', value: '4 Team Members', sub: '100% self-reviews received', color: 'text-[#5e2b9d]' },
      { label: 'Manager Reviews Completed', value: '3 Completed', sub: '1 pending calibration', color: 'text-[#16a34a]' },
      { label: 'Promotions Recommended', value: '1 Staff Member', sub: 'Priya Sharma &rarr; Staff Lead', color: 'text-amber-600' },
      { label: 'Team OKR Achievement', value: '94% On-Track', sub: 'High team delivery velocity', color: 'text-[#111827]' },
    ],
    tableTitle: 'Direct Reports Q4 2026 Scorecards',
    headers: ['Team Member Name', 'Role & Designation', 'Self Rating', 'Manager Rating', '360 Peer Score', 'Performance Band', 'Appraisal Recommendation', 'Actions'],
    rows: [
      { col1: { title: 'Priya Sharma', sub: 'PC-1002' }, col2: 'Senior Frontend Engineer', col3: '4.8 / 5.0', col4: '4.9 / 5.0', col5: '4.7 / 5.0', col6: 'Exceptional (Top 5%)', col7: 'Promotion to Staff Lead', status: 'approved', action: 'Calibrate Score' },
      { col1: { title: 'Arjun Mehta', sub: 'PC-1005' }, col2: 'Lead UI/UX Designer', col3: '4.5 / 5.0', col4: '4.6 / 5.0', col5: '4.4 / 5.0', col6: 'Exceeds Expectations', col7: 'Merit Salary Hike (+25%)', status: 'approved', action: 'Calibrate Score' },
      { col1: { title: 'Sneha Patil', sub: 'PC-1008' }, col2: 'DevOps Architect', col3: '4.7 / 5.0', col4: '4.8 / 5.0', col5: '4.6 / 5.0', col6: 'Exceeds Expectations', col7: 'Retention Bonus', status: 'approved', action: 'Calibrate Score' },
      { col1: { title: 'Vikram Joshi', sub: 'PC-1014' }, col2: 'Full-Stack Developer', col3: '4.1 / 5.0', col4: '4.0 / 5.0', col5: '4.2 / 5.0', col6: 'Meets Expectations', col7: 'Standard Incentive', status: 'pending', action: 'Submit Review' },
    ]
  },

  // 39. MANAGER REPORTS
  {
    path: 'app/(hr)/manager/reports/page.tsx',
    title: 'Team Analytics, Attendance & Utilization Reports',
    desc: 'Department productivity analytics, monthly billable hours utilization, and leave consumption trends.',
    crumbs: [{ label: 'Manager', href: '/manager/dashboard' }, { label: 'Team Reports' }],
    kpis: [
      { label: 'Team Headcount', value: '4 Engineers / Designers', sub: '100% active full-time', color: 'text-[#5e2b9d]' },
      { label: 'Average Team Attendance', value: '96.4%', sub: '+2.1% vs last month', color: 'text-[#16a34a]' },
      { label: 'Average Billable Ratio', value: '89.2%', sub: 'Target benchmark: > 85%', color: 'text-[#111827]' },
      { label: 'Leaves Availed This Month', value: '4 Days', sub: 'All coverage maintained', color: 'text-amber-600' },
    ],
    tableTitle: 'Direct Reports Monthly Productivity Metrics',
    headers: ['Team Member Name', 'Role & Designation', 'Attendance %', 'Average In-Time', 'Total Logged Hours', 'Billable %', 'Performance Rating', 'Actions'],
    rows: [
      { col1: { title: 'Priya Sharma', sub: 'PC-1002' }, col2: 'Staff Frontend Lead', col3: '96.2%', col4: '09:04 AM', col5: '168.5 Hours', col6: '92% Billable', col7: '4.9 / 5.0 (Top 5%)', status: 'approved', action: 'Export Report' },
      { col1: { title: 'Arjun Mehta', sub: 'PC-1005' }, col2: 'Lead UI/UX Designer', col3: '95.0%', col4: '08:55 AM', col5: '162.0 Hours', col6: '100% Billable', col7: '4.6 / 5.0', status: 'approved', action: 'Export Report' },
      { col1: { title: 'Sneha Patil', sub: 'PC-1008' }, col2: 'DevOps Architect', col3: '97.5%', col4: '09:22 AM', col5: '172.0 Hours', col6: '85% Billable', col7: '4.8 / 5.0', status: 'approved', action: 'Export Report' },
      { col1: { title: 'Vikram Joshi', sub: 'PC-1014' }, col2: 'Full-Stack Developer', col3: '94.0%', col4: '09:10 AM', col5: '164.0 Hours', col6: '80% Billable', col7: '4.0 / 5.0', status: 'approved', action: 'Export Report' },
    ]
  },
];

console.log('Generating remaining ' + remainingConfigs.length + ' tailored domain pages...');

for (const cfg of remainingConfigs) {
  const dir = path.dirname(cfg.path);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const kpisJSX = cfg.kpis.map(k => `
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">${k.label}</span>
          <p className="text-2xl font-bold ${k.color || 'text-[#111827]'} mt-1">${k.value}</p>
          <span className="text-[11px] text-[#6b7280]">${k.sub}</span>
        </Card>`).join('');

  const headersJSX = cfg.headers.map((h, i) => {
    const align = i === 0 ? '' : i === cfg.headers.length - 1 ? 'text-right' : '';
    return `<th className="py-2.5 px-3 font-semibold ${align}">${h}</th>`;
  }).join('\n                ');

  const rowsJSX = cfg.rows.map((row, idx) => {
    return `
              <tr key="${idx}" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">${row.col1.title}</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">${row.col1.sub}</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">${row.col2}</td>
                <td className="py-3 px-3 text-[#4b5563]">${row.col3}</td>
                <td className="py-3 px-3 text-[#4b5563]">${row.col4}</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">${row.col5}</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">${row.col6 || ''}</td>
                ${row.col7 ? `<td className="py-3 px-3 font-bold text-emerald-700 font-mono">${row.col7}</td>` : ''}
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="${row.status}" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    ${row.action || 'View Details'}
                  </Button>
                </td>
              </tr>`;
  }).join('');

  const content = `import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: '${cfg.title}' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="${cfg.title}"
        description="${cfg.desc}"
        breadcrumb={${JSON.stringify(cfg.crumbs)}}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
              <Download className="h-3.5 w-3.5" /> Export Report
            </Button>
            <Button size="sm" className="h-8 gap-1 text-xs bg-[#5e2b9d] hover:bg-[#4d2382] text-white">
              <Plus className="h-3.5 w-3.5" /> Action / Add
            </Button>
          </div>
        }
      />

      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        ${kpisJSX}
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">${cfg.tableTitle}</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                ${headersJSX}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              ${rowsJSX}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
`;

  fs.writeFileSync(cfg.path, content);
  console.log('Populated with domain-specific data:', cfg.path);
}
console.log('Successfully completed all 39 remaining domain pages!');

