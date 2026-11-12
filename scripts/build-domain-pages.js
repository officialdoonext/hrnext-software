const fs = require('fs');
const path = require('path');

const pageConfigs = [
  // 1. RECRUITMENT INTERVIEWS (from user's screenshot)
  {
    path: 'app/(hr)/recruitment/interviews/page.tsx',
    title: 'Interview Scheduling & Candidate Evaluations',
    desc: 'Coordinate interview panels, conduct technical evaluations, and submit candidate feedback scorecards.',
    crumbs: [{ label: 'Recruitment', href: '/recruitment' }, { label: 'Interviews' }],
    kpis: [
      { label: 'Interviews This Week', value: '18 Sessions', sub: 'Across 6 open requisitions', color: 'text-[#5e2b9d]' },
      { label: 'Scheduled Today', value: '4 Rounds', sub: 'Starting from 02:00 PM IST', color: 'text-amber-600' },
      { label: 'Average Evaluation Score', value: '4.4 / 5.0', sub: '+0.3 vs last month', color: 'text-[#16a34a]' },
      { label: 'Offer Conversion Rate', value: '68%', sub: 'Final round candidates', color: 'text-[#111827]' },
    ],
    tableTitle: 'Scheduled & Completed Candidate Interviews',
    headers: ['Candidate Name & ID', 'Target Position', 'Assigned Interviewer', 'Round & Evaluation Mode', 'Scheduled Time', 'Score', 'Status', 'Actions'],
    rows: [
      {
        col1: { title: 'Priya Sharma', sub: 'APP-2026-104' },
        col2: 'Staff Frontend Lead',
        col3: 'Rajesh Kumar (VP Eng)',
        col4: 'System Architecture (Google Meet)',
        col5: 'Today, 03:00 PM',
        col6: '4.8 / 5.0',
        status: 'approved',
        action: 'Join Meeting',
      },
      {
        col1: { title: 'Ankit Verma', sub: 'APP-2026-098' },
        col2: 'Backend Go Engineer',
        col3: 'Sneha Patil (DevOps Lead)',
        col4: 'Live Coding & Algorithms (Zoom)',
        col5: 'Today, 05:00 PM',
        col6: '4.2 / 5.0',
        status: 'pending',
        action: 'Submit Feedback',
      },
      {
        col1: { title: 'Divya Nair', sub: 'APP-2026-112' },
        col2: 'Lead UI/UX Designer',
        col3: 'Arjun Mehta (Design Head)',
        col4: 'Portfolio Critique (Bangalore Office)',
        col5: 'Tomorrow, 11:30 AM',
        col6: '4.6 / 5.0',
        status: 'approved',
        action: 'View Dossier',
      },
      {
        col1: { title: 'Rohan Kulkarni', sub: 'APP-2026-089' },
        col2: 'DevOps & SRE Engineer',
        col3: 'Sneha Patil (DevOps Lead)',
        col4: 'Kubernetes & Linux Deepdive',
        col5: 'Yesterday, 02:00 PM',
        col6: '3.4 / 5.0',
        status: 'rejected',
        action: 'View Notes',
      },
    ]
  },

  // 2. RECRUITMENT JOBS
  {
    path: 'app/(hr)/recruitment/jobs/page.tsx',
    title: 'Job Openings & Headcount Requisitions',
    desc: 'Manage open requisitions, salary bands, required qualifications, and candidate pipeline stages.',
    crumbs: [{ label: 'Recruitment', href: '/recruitment' }, { label: 'Job Openings' }],
    kpis: [
      { label: 'Active Openings', value: '12 Positions', sub: 'Across 5 departments', color: 'text-[#5e2b9d]' },
      { label: 'Total Applicants', value: '184 Resumes', sub: '+28 new this week', color: 'text-[#16a34a]' },
      { label: 'Avg Time to Hire', value: '22 Days', sub: 'Target: < 30 days', color: 'text-[#111827]' },
      { label: 'Offers Released', value: '4 Offers', sub: '3 accepted, 1 pending', color: 'text-amber-600' },
    ],
    tableTitle: 'Active Job Requisitions Directory',
    headers: ['Job Title & Code', 'Department', 'Location', 'Vacancies', 'Experience Required', 'Offered CTC Band', 'Status', 'Actions'],
    rows: [
      {
        col1: { title: 'Staff Frontend Lead (Next.js 16)', sub: 'REQ-ENG-041' },
        col2: 'Engineering',
        col3: 'Bangalore (Hybrid)',
        col4: '2 Openings',
        col5: '6 – 9 Years',
        col6: '₹32L – ₹42L',
        status: 'approved',
        action: 'View Applicants (42)',
      },
      {
        col1: { title: 'Senior Product Designer', sub: 'REQ-DES-018' },
        col2: 'Product Design',
        col3: 'Bangalore / Remote',
        col4: '1 Opening',
        col5: '4 – 7 Years',
        col6: '₹22L – ₹30L',
        status: 'approved',
        action: 'View Applicants (28)',
      },
      {
        col1: { title: 'DevOps & Cloud Architect', sub: 'REQ-INF-012' },
        col2: 'Infrastructure',
        col3: 'San Francisco / Remote',
        col4: '1 Opening',
        col5: '7+ Years',
        col6: '$140k – $180k',
        status: 'approved',
        action: 'View Applicants (19)',
      },
      {
        col1: { title: 'Enterprise Account Executive', sub: 'REQ-SLS-029' },
        col2: 'Enterprise Sales',
        col3: 'Mumbai HQ',
        col4: '3 Openings',
        col5: '5 – 8 Years',
        col6: '₹20L – ₹32L + Comm',
        status: 'pending',
        action: 'View Applicants (35)',
      },
    ]
  },

  // 3. RECRUITMENT CANDIDATES
  {
    path: 'app/(hr)/recruitment/candidates/page.tsx',
    title: 'Candidate Talent Pool & Sourcing Database',
    desc: 'Review candidate profiles, source attribution, evaluation scores, and recruitment stages.',
    crumbs: [{ label: 'Recruitment', href: '/recruitment' }, { label: 'Candidates' }],
    kpis: [
      { label: 'Total Candidate Pool', value: '348 Profiles', sub: 'Active & archived talent', color: 'text-[#5e2b9d]' },
      { label: 'In Active Screening', value: '26 In Process', sub: 'Interviewing stages', color: 'text-amber-600' },
      { label: 'Top Sourcing Channel', value: 'LinkedIn (48%)', sub: 'Referrals at 32%', color: 'text-[#16a34a]' },
      { label: 'Candidate Satisfaction', value: '4.8 / 5.0', sub: 'Candidate NPS survey', color: 'text-[#111827]' },
    ],
    tableTitle: 'Active Candidate Pipeline',
    headers: ['Candidate Name', 'Target Position', 'Sourcing Channel', 'Current Company', 'Experience', 'Recruitment Stage', 'Actions'],
    rows: [
      {
        col1: { title: 'Rahul Saxena', sub: 'rahul.s@example.com' },
        col2: 'Staff Frontend Lead',
        col3: 'LinkedIn InMail',
        col4: 'Razorpay Technologies',
        col5: '7.2 Years',
        col6: 'Technical Architecture Round',
        status: 'approved',
        action: 'View Scorecard',
      },
      {
        col1: { title: 'Snehal Deshmukh', sub: 'snehal.d@example.com' },
        col2: 'Senior Product Designer',
        col3: 'Employee Referral (Priya S.)',
        col4: 'Swiggy Design Labs',
        col5: '5.0 Years',
        col6: 'Portfolio Deepdive Round',
        status: 'approved',
        action: 'View Scorecard',
      },
      {
        col1: { title: 'Amitav Ghosh', sub: 'amitav.g@example.com' },
        col2: 'Cloud Architect',
        col3: 'Direct Career Page',
        col4: 'Infosys Cloud Practice',
        col5: '8.5 Years',
        col6: 'Offer Extended',
        status: 'approved',
        action: 'View Offer Letter',
      },
      {
        col1: { title: 'Neha Kapoor', sub: 'neha.k@example.com' },
        col2: 'Enterprise Account Executive',
        col3: 'Naukri Recruiter',
        col4: 'Freshworks Inc.',
        col5: '6.0 Years',
        col6: 'HR Fitment & Compensation',
        status: 'pending',
        action: 'Schedule Round',
      },
    ]
  },

  // 4. RECRUITMENT APPLICATIONS
  {
    path: 'app/(hr)/recruitment/applications/page.tsx',
    title: 'Inbound Job Applications',
    desc: 'Screen incoming job submissions, review candidate resumes, and shortlist applicants for technical screening.',
    crumbs: [{ label: 'Recruitment', href: '/recruitment' }, { label: 'Applications' }],
    kpis: [
      { label: 'New Submissions Today', value: '14 Resumes', sub: 'Awaiting first review', color: 'text-[#5e2b9d]' },
      { label: 'Shortlisted Rate', value: '34%', sub: 'Pass initial screening', color: 'text-[#16a34a]' },
      { label: 'Auto-Parsed Resumes', value: '100% Parsed', sub: 'Skills & experience extracted', color: 'text-[#111827]' },
      { label: 'Rejected Resumes', value: '52 Profiles', sub: 'Sent rejection notice', color: 'text-amber-600' },
    ],
    tableTitle: 'Recent Applications Queue',
    headers: ['Applicant Name', 'Applied Role', 'Submission Date', 'Resume Score', 'Key Skills Highlight', 'Current Stage', 'Actions'],
    rows: [
      {
        col1: { title: 'Vikas Mehta', sub: 'vikas.m@gmail.com' },
        col2: 'Staff Frontend Lead',
        col3: '10 Nov 2026',
        col4: '95% Match',
        col5: 'React 19, Next.js, TypeScript, Tailwind',
        col6: 'Shortlisted for Phone Screen',
        status: 'approved',
        action: 'Review Resume',
      },
      {
        col1: { title: 'Pooja Iyer', sub: 'pooja.iyer@outlook.com' },
        col2: 'Senior Product Designer',
        col3: '09 Nov 2026',
        col4: '91% Match',
        col5: 'Figma Design Systems, Wireframing',
        col6: 'Screening Call Scheduled',
        status: 'approved',
        action: 'Review Resume',
      },
      {
        col1: { title: 'Karthik Raman', sub: 'karthik.r@yahoo.com' },
        col2: 'DevOps Architect',
        col3: '08 Nov 2026',
        col4: '88% Match',
        col5: 'AWS, Kubernetes, Terraform, Docker',
        col6: 'Hiring Manager Review',
        status: 'pending',
        action: 'Review Resume',
      },
      {
        col1: { title: 'Meera Chawla', sub: 'meera.c@gmail.com' },
        col2: 'Account Executive',
        col3: '07 Nov 2026',
        col4: '82% Match',
        col5: 'B2B SaaS, Salesforce, Pipeline Gen',
        col6: 'Initial Screening',
        status: 'pending',
        action: 'Review Resume',
      },
    ]
  },

  // 5. RECRUITMENT OFFERS
  {
    path: 'app/(hr)/recruitment/offers/page.tsx',
    title: 'Job Offers & Employment Letters',
    desc: 'Generate, approve, and disburse official offer letters with automated candidate e-signatures.',
    crumbs: [{ label: 'Recruitment', href: '/recruitment' }, { label: 'Offers' }],
    kpis: [
      { label: 'Offers Released (Q4)', value: '8 Offers', sub: 'Total offered CTC: ₹2.4 Cr', color: 'text-[#5e2b9d]' },
      { label: 'Accepted Offers', value: '6 Signed', sub: '75% acceptance rate', color: 'text-[#16a34a]' },
      { label: 'Pending Acceptance', value: '2 Pending', sub: 'Expiring in 3 days', color: 'text-amber-600' },
      { label: 'Upcoming Joiners', value: '5 Engineers', sub: 'Joining in Nov & Dec 2026', color: 'text-[#111827]' },
    ],
    tableTitle: 'Employment Offers Registry',
    headers: ['Candidate Name', 'Designation', 'Offered Annual CTC', 'Offer Released On', 'Offer Expiry Date', 'Expected Join Date', 'Status', 'Actions'],
    rows: [
      {
        col1: { title: 'Amitav Ghosh', sub: 'amitav.g@example.com' },
        col2: 'Principal Cloud Architect',
        col3: '₹42,00,000',
        col4: '05 Nov 2026',
        col5: '12 Nov 2026',
        col6: '01 Dec 2026',
        status: 'approved',
        action: 'Download Signed Offer',
      },
      {
        col1: { title: 'Shalini Singh', sub: 'shalini.s@example.com' },
        col2: 'Senior Product Manager',
        col3: '₹32,00,000',
        col4: '08 Nov 2026',
        col5: '15 Nov 2026',
        col6: '15 Dec 2026',
        status: 'pending',
        action: 'Send Reminder',
      },
      {
        col1: { title: 'Karthik Reddy', sub: 'karthik.reddy@example.com' },
        col2: 'Staff Backend Lead',
        col3: '₹38,00,000',
        col4: '02 Nov 2026',
        col5: '09 Nov 2026',
        col6: '01 Dec 2026',
        status: 'approved',
        action: 'Initiate Onboarding',
      },
      {
        col1: { title: 'Deepa Krishnan', sub: 'deepa.k@example.com' },
        col2: 'Lead UI/UX Designer',
        col3: '₹28,00,000',
        col4: '01 Nov 2026',
        col5: '08 Nov 2026',
        col6: 'Declined (Counter Offer)',
        status: 'rejected',
        action: 'View Decline Reason',
      },
    ]
  },

  // 6. ATTENDANCE DAILY
  {
    path: 'app/(hr)/attendance/daily/page.tsx',
    title: 'Daily Attendance Master Log',
    desc: 'Real-time turnstile clock-ins, biometric RFID synchronizations, and daily working hours summary.',
    crumbs: [{ label: 'Attendance', href: '/attendance' }, { label: 'Daily Attendance' }],
    kpis: [
      { label: 'Headcount Present', value: '47 / 50', sub: '94% physical attendance', color: 'text-[#16a34a]' },
      { label: 'On Approved Leave', value: '3 Employees', sub: '2 EL, 1 Sick Leave', color: 'text-[#5e2b9d]' },
      { label: 'Late Check-Ins Today', value: '2 Employees', sub: 'Grace period applied', color: 'text-amber-600' },
      { label: 'Average In-Time', value: '09:08 AM', sub: 'Standard shift: 09:00 AM', color: 'text-[#111827]' },
    ],
    tableTitle: "Today's Punch Register",
    headers: ['Employee Name & ID', 'Department', 'Assigned Shift', 'First In-Punch', 'Last Out-Punch', 'Total Work Duration', 'Punctuality Status', 'Actions'],
    rows: [
      {
        col1: { title: 'Priya Sharma', sub: 'PC-1002' },
        col2: 'Engineering',
        col3: 'General Shift (09:00 - 18:00)',
        col4: '09:04 AM',
        col5: 'In Progress (Active)',
        col6: '6 hrs 12 mins',
        status: 'approved',
        action: 'View Biometrics',
      },
      {
        col1: { title: 'Arjun Mehta', sub: 'PC-1005' },
        col2: 'Product Design',
        col3: 'General Shift (09:00 - 18:00)',
        col4: '08:55 AM',
        col5: 'In Progress (Active)',
        col6: '6 hrs 21 mins',
        status: 'approved',
        action: 'View Biometrics',
      },
      {
        col1: { title: 'Sneha Patil', sub: 'PC-1008' },
        col2: 'DevOps & Cloud',
        col3: 'General Shift (09:00 - 18:00)',
        col4: '09:28 AM',
        col5: 'In Progress (Active)',
        col6: '5 hrs 48 mins (Late)',
        status: 'pending',
        action: 'Regularize Punch',
      },
      {
        col1: { title: 'Vikram Joshi', sub: 'PC-1014' },
        col2: 'Sales',
        col3: 'General Shift (09:00 - 18:00)',
        col4: '--',
        col5: '--',
        col6: 'On Casual Leave',
        status: 'approved',
        action: 'View Leave Details',
      },
    ]
  },

  // 7. ATTENDANCE MANUAL
  {
    path: 'app/(hr)/attendance/manual/page.tsx',
    title: 'Manual Attendance Override & Corrections',
    desc: 'Record manual punch adjustments for offsite meetings, client locations, and biometric device maintenance.',
    crumbs: [{ label: 'Attendance', href: '/attendance' }, { label: 'Manual Attendance' }],
    kpis: [
      { label: 'Manual Entries This Month', value: '14 Records', sub: 'Biometric offline fallback', color: 'text-[#5e2b9d]' },
      { label: 'Pending HR Sign-Off', value: '3 Requests', sub: 'Supervisor approved', color: 'text-amber-600' },
      { label: 'Client On-Site Work', value: '8 Days', sub: 'Pre-approved client visits', color: 'text-[#16a34a]' },
      { label: 'Audit Verification Rate', value: '100%', sub: 'Geo-stamped and logged', color: 'text-[#111827]' },
    ],
    tableTitle: 'Manual Punch Adjustments Queue',
    headers: ['Employee Name', 'Adjustment Date', 'Shift Requested', 'Check-In Time', 'Check-Out Time', 'Reason for Manual Entry', 'Status', 'Actions'],
    rows: [
      {
        col1: { title: 'Arjun Mehta', sub: 'PC-1005' },
        col2: '08 Nov 2026',
        col3: 'General Shift',
        col4: '09:30 AM',
        col5: '06:30 PM',
        col6: 'Client design sprint workshop at Bangalore Tech Park',
        status: 'approved',
        action: 'View Approval',
      },
      {
        col1: { title: 'Sneha Patil', sub: 'PC-1008' },
        col2: '07 Nov 2026',
        col3: 'General Shift',
        col4: '09:05 AM',
        col5: '06:15 PM',
        col6: 'Main lobby turnstile 2 fingerprint sensor failed',
        status: 'pending',
        action: 'Approve Punch',
      },
      {
        col1: { title: 'Karan Verma', sub: 'PC-1012' },
        col2: '05 Nov 2026',
        col3: 'General Shift',
        col4: '10:00 AM',
        col5: '07:00 PM',
        col6: 'Field visit to Mumbai logistics client warehouse',
        status: 'approved',
        action: 'View Approval',
      },
    ]
  },

  // 8. ATTENDANCE HOLIDAYS
  {
    path: 'app/(hr)/attendance/holidays/page.tsx',
    title: 'Statutory Holiday Calendar (2026 – 2027)',
    desc: 'Mandatory gazetted holidays, restricted cultural festivals, and branch-specific statutory closures.',
    crumbs: [{ label: 'Attendance', href: '/attendance' }, { label: 'Holidays' }],
    kpis: [
      { label: 'Mandatory Holidays', value: '12 Days', sub: 'Paid company closures', color: 'text-[#5e2b9d]' },
      { label: 'Restricted (Optional)', value: '3 Choices', sub: 'Employees pick 2 festivals', color: 'text-[#16a34a]' },
      { label: 'Next Upcoming Holiday', value: 'Diwali (14 Nov)', sub: 'In 4 days (Saturday)', color: 'text-amber-600' },
      { label: 'Long Weekends Left', value: '2 Weekends', sub: 'Christmas & Republic Day', color: 'text-[#111827]' },
    ],
    tableTitle: 'Statutory Public Holiday Schedule',
    headers: ['Holiday Name', 'Date of Observance', 'Day of Week', 'Holiday Type', 'Applicable Branches', 'Statutory Wage Rule', 'Status', 'Actions'],
    rows: [
      {
        col1: { title: 'Diwali (Deepavali Festival)', sub: 'Festival of Lights' },
        col2: '14 Nov 2026',
        col3: 'Saturday',
        col4: 'Mandatory Gazetted',
        col5: 'Bangalore, Mumbai, Hyderabad, Delhi',
        col6: 'Paid Public Holiday',
        status: 'approved',
        action: 'View Circular',
      },
      {
        col1: { title: 'Guru Nanak Jayanti', sub: 'Prakash Utsav' },
        col2: '24 Nov 2026',
        col3: 'Tuesday',
        col4: 'Restricted (Optional)',
        col5: 'All India Branches',
        col6: 'Optional Choice',
        status: 'approved',
        action: 'View Circular',
      },
      {
        col1: { title: 'Christmas Day', sub: 'Winter Festival' },
        col2: '25 Dec 2026',
        col3: 'Friday',
        col4: 'Mandatory Gazetted',
        col5: 'Global (All Locations)',
        col6: 'Paid Public Holiday',
        status: 'approved',
        action: 'View Circular',
      },
      {
        col1: { title: 'Republic Day 2027', sub: 'National Holiday' },
        col2: '26 Jan 2027',
        col3: 'Tuesday',
        col4: 'National Mandatory',
        col5: 'All India Branches',
        col6: '2.0x Overtime if worked',
        status: 'approved',
        action: 'View Circular',
      },
    ]
  },

  // 9. ATTENDANCE OVERTIME
  {
    path: 'app/(hr)/attendance/overtime/page.tsx',
    title: 'Overtime & Compensatory Off Records',
    desc: 'Overtime hours logged beyond standard shifts, statutory compensation rates (1.5x / 2.0x), and payroll credits.',
    crumbs: [{ label: 'Attendance', href: '/attendance' }, { label: 'Overtime' }],
    kpis: [
      { label: 'Total OT Hours (Oct)', value: '64.5 Hours', sub: 'Across 12 engineers', color: 'text-[#5e2b9d]' },
      { label: 'Overtime Payout Amount', value: '₹78,400', sub: 'Included in October payroll', color: 'text-[#16a34a]' },
      { label: 'Comp-Off Leaves Granted', value: '6 Days', sub: 'Credited to leave balance', color: 'text-amber-600' },
      { label: 'Policy Multiplier', value: '1.5x Regular', sub: '2.0x on public holidays', color: 'text-[#111827]' },
    ],
    tableTitle: 'Approved Overtime Ledger',
    headers: ['Employee Name & ID', 'Department', 'Date Overtime Worked', 'Shift Standard Hours', 'OT Hours Logged', 'Overtime Rate', 'Payout Amount', 'Status'],
    rows: [
      {
        col1: { title: 'Sneha Patil', sub: 'PC-1008' },
        col2: 'DevOps & Cloud',
        col3: '31 Oct 2026 (Saturday)',
        col4: 'Weekly Off',
        col5: '8.0 Hours (Cloud Release)',
        col6: '2.0x Holiday Rate',
        col7: '₹14,500',
        status: 'approved',
      },
      {
        col1: { title: 'Priya Sharma', sub: 'PC-1002' },
        col2: 'Engineering',
        col3: '28 Oct 2026 (Wednesday)',
        col4: '09:00 – 18:00',
        col5: '3.5 Hours (Payment Hotfix)',
        col6: '1.5x Overtime Rate',
        col7: '₹4,800',
        status: 'approved',
      },
      {
        col1: { title: 'Vikram Joshi', sub: 'PC-1014' },
        col2: 'Sales Support',
        col3: '25 Oct 2026 (Sunday)',
        col4: 'Weekly Off',
        col5: '6.0 Hours (Quarter End)',
        col6: 'Compensatory Off Credit',
        col7: '1.0 Day Comp-Off',
        status: 'approved',
      },
    ]
  },

  // 10. LEAVE REQUESTS
  {
    path: 'app/(hr)/leave/requests/page.tsx',
    title: 'All Employee Leave Applications',
    desc: 'Historical and active leave requests across Earned Leave, Casual Leave, Sick Leave, and Maternity/Paternity.',
    crumbs: [{ label: 'Leave', href: '/leave' }, { label: 'Requests' }],
    kpis: [
      { label: 'Total Applications (2026)', value: '142 Requests', sub: '92% approval rate', color: 'text-[#5e2b9d]' },
      { label: 'Approved Leave Days', value: '384 Days', sub: 'Avg 7.6 days / employee', color: 'text-[#16a34a]' },
      { label: 'Pending Manager Action', value: '4 Requests', sub: 'Awaiting line manager sign-off', color: 'text-amber-600' },
      { label: 'Cancelled / Rejected', value: '8 Requests', sub: 'Project deadline conflicts', color: 'text-[#111827]' },
    ],
    tableTitle: 'Leave Applications Master Archive',
    headers: ['Employee Name', 'Leave Category', 'Duration (Days)', 'From Date', 'To Date', 'Reason Given', 'Status', 'Actions'],
    rows: [
      {
        col1: { title: 'Priya Sharma', sub: 'PC-1002' },
        col2: 'Earned Leave (EL)',
        col3: '3 Days',
        col4: '12 Nov 2026',
        col5: '14 Nov 2026',
        col6: 'Family wedding ceremony in Jaipur',
        status: 'approved',
        action: 'View Slip',
      },
      {
        col1: { title: 'Arjun Mehta', sub: 'PC-1005' },
        col2: 'Casual Leave (CL)',
        col3: '2 Days',
        col4: '16 Nov 2026',
        col5: '17 Nov 2026',
        col6: 'Personal relocation and home shifting',
        status: 'pending',
        action: 'Review Request',
      },
      {
        col1: { title: 'Vikram Joshi', sub: 'PC-1014' },
        col2: 'Sick Leave (SL)',
        col3: '1 Day',
        col4: '10 Nov 2026',
        col5: '10 Nov 2026',
        col6: 'Fever and viral consultation',
        status: 'approved',
        action: 'View Slip',
      },
    ]
  },

  // 11. LEAVE POLICIES
  {
    path: 'app/(hr)/leave/policies/page.tsx',
    title: 'Leave Policies & Accrual Rules',
    desc: 'Organizational entitlement guidelines, monthly accrual rates, probationary restrictions, and sandwich rules.',
    crumbs: [{ label: 'Leave', href: '/leave' }, { label: 'Policies' }],
    kpis: [
      { label: 'Leave Policy Categories', value: '6 Entitlements', sub: 'Statutory & discretionary', color: 'text-[#5e2b9d]' },
      { label: 'Annual Paid Quota', value: '30 Days / Year', sub: '18 EL + 12 CL/SL', color: 'text-[#16a34a]' },
      { label: 'Max Carry Forward', value: '10 Days to 2027', sub: 'Balance encashable at separation', color: 'text-amber-600' },
      { label: 'Probation Leave Rule', value: 'CL Only Allowed', sub: 'EL accrues post-confirmation', color: 'text-[#111827]' },
    ],
    tableTitle: 'Statutory Leave Rules Directory',
    headers: ['Leave Policy Title', 'Annual Quota', 'Accrual Schedule', 'Max Carry-Forward', 'Encashment Eligibility', 'Sandwich Rule Policy', 'Status', 'Actions'],
    rows: [
      {
        col1: { title: 'Earned Leave (Privilege Leave)', sub: 'Statutory Annual Leave' },
        col2: '18 Days',
        col3: '1.5 days accrued monthly',
        col4: '10 Days maximum',
        col5: 'Encashable at exit or year-end',
        col6: 'Sandwich weekends counted if > 4 days',
        status: 'approved',
        action: 'Edit Policy',
      },
      {
        col1: { title: 'Casual Leave (CL)', sub: 'Discretionary Short Leave' },
        col2: '12 Days',
        col3: 'Credited in full on Jan 01',
        col4: 'Lapses at Dec 31 (Zero carry)',
        col5: 'Non-encashable',
        col6: 'Max 3 consecutive days',
        status: 'approved',
        action: 'Edit Policy',
      },
      {
        col1: { title: 'Sick Leave (Medical Leave)', sub: 'Health Emergency' },
        col2: '12 Days',
        col3: 'Credited on Jan 01',
        col4: 'Accumulates up to 30 days',
        col5: 'Non-encashable',
        col6: 'Medical cert needed if > 2 days',
        status: 'approved',
        action: 'Edit Policy',
      },
      {
        col1: { title: 'Maternity / Paternity Leave', sub: 'Parental Support Policy' },
        col2: '26 Weeks (Maternity) / 2 Weeks',
        col3: 'Full paid leave',
        col4: 'Continuous entitlement',
        col5: 'Statutory compliance (Maternity Act)',
        col6: 'Exempt from sandwich rule',
        status: 'approved',
        action: 'Edit Policy',
      },
    ]
  },

  // 12. LEAVE BALANCES
  {
    path: 'app/(hr)/leave/balances/page.tsx',
    title: 'Employee Leave Balances & Entitlements Ledger',
    desc: 'Monitor remaining quotas across Earned Leave, Casual Leave, and Medical balances for all staff.',
    crumbs: [{ label: 'Leave', href: '/leave' }, { label: 'Balances' }],
    kpis: [
      { label: 'Total Leaves Available', value: '742 Days', sub: 'Across 50 active employees', color: 'text-[#5e2b9d]' },
      { label: 'Average EL Balance', value: '11.4 Days', sub: 'Per confirmed employee', color: 'text-[#16a34a]' },
      { label: 'Unused CL at Risk', value: '64 Days', sub: 'Will lapse on 31 Dec 2026', color: 'text-amber-600' },
      { label: 'Encashment Liability', value: '₹14,80,000', sub: 'Accrued on company books', color: 'text-[#111827]' },
    ],
    tableTitle: 'Workforce Leave Ledger',
    headers: ['Employee Name & ID', 'Department', 'Earned Leave (EL)', 'Casual Leave (CL)', 'Sick Leave (SL)', 'Total Balance', 'Status', 'Actions'],
    rows: [
      {
        col1: { title: 'Priya Sharma', sub: 'PC-1002' },
        col2: 'Engineering',
        col3: '14.5 Days',
        col4: '5.0 Days',
        col5: '8.0 Days',
        col6: '27.5 Days Available',
        status: 'approved',
        action: 'Adjust Quota',
      },
      {
        col1: { title: 'Arjun Mehta', sub: 'PC-1005' },
        col2: 'Product Design',
        col3: '12.0 Days',
        col4: '4.0 Days',
        col5: '10.0 Days',
        col6: '26.0 Days Available',
        status: 'approved',
        action: 'Adjust Quota',
      },
      {
        col1: { title: 'Sneha Patil', sub: 'PC-1008' },
        col2: 'DevOps & Cloud',
        col3: '16.0 Days',
        col4: '6.0 Days',
        col5: '11.0 Days',
        col6: '33.0 Days Available',
        status: 'approved',
        action: 'Adjust Quota',
      },
      {
        col1: { title: 'Vikram Joshi', sub: 'PC-1014' },
        col2: 'Sales',
        col3: '9.0 Days',
        col4: '2.0 Days',
        col5: '6.0 Days',
        col6: '17.0 Days Available',
        status: 'approved',
        action: 'Adjust Quota',
      },
    ]
  },

  // 13. LEAVE CALENDAR
  {
    path: 'app/(hr)/leave/calendar/page.tsx',
    title: 'Organization Leave & Availability Calendar',
    desc: 'Visual schedule showing planned team leaves, public holidays, and department coverage.',
    crumbs: [{ label: 'Leave', href: '/leave' }, { label: 'Calendar' }],
    kpis: [
      { label: 'Out of Office This Week', value: '3 Employees', sub: '6% of workforce on leave', color: 'text-[#5e2b9d]' },
      { label: 'Peak Holiday Month', value: 'November', sub: 'Diwali & Guru Nanak Jayanti', color: 'text-amber-600' },
      { label: 'Department Coverage', value: '94% Operational', sub: 'All key support desks staffed', color: 'text-[#16a34a]' },
      { label: 'Restricted Days Remaining', value: '2 Optional Holidays', sub: 'In Q4 2026', color: 'text-[#111827]' },
    ],
    tableTitle: 'November 2026 Scheduled Absences',
    headers: ['Employee Name', 'Department', 'Absence Date Range', 'Leave Category', 'Total Workdays Out', 'Backup Colleague', 'Status', 'Actions'],
    rows: [
      {
        col1: { title: 'Priya Sharma', sub: 'PC-1002' },
        col2: 'Engineering',
        col3: '12 Nov 2026 – 14 Nov 2026',
        col4: 'Earned Leave (EL)',
        col5: '3 Days',
        col6: 'Vikram Joshi (Coverage Assigned)',
        status: 'approved',
        action: 'View Calendar',
      },
      {
        col1: { title: 'Arjun Mehta', sub: 'PC-1005' },
        col2: 'Product Design',
        col3: '16 Nov 2026 – 17 Nov 2026',
        col4: 'Casual Leave (CL)',
        col5: '2 Days',
        col6: 'Pooja Iyer (Design Handover)',
        status: 'pending',
        action: 'View Calendar',
      },
      {
        col1: { title: 'Kavita Nair', sub: 'PC-1022' },
        col2: 'Marketing',
        col3: '10 Nov 2026 – 11 Nov 2026',
        col4: 'Sick Leave (SL)',
        col5: '2 Days',
        col6: 'Vinay Vakati (Ad Campaign Lead)',
        status: 'approved',
        action: 'View Calendar',
      },
    ]
  },

  // 14. PAYROLL GROUPS
  {
    path: 'app/(hr)/payroll/groups/page.tsx',
    title: 'Payroll Groups & Payment Schedules',
    desc: 'Group staff by payment frequency (Monthly, Semi-Monthly), tax jurisdiction, and bank payment gateways.',
    crumbs: [{ label: 'Payroll', href: '/payroll' }, { label: 'Groups' }],
    kpis: [
      { label: 'Active Payroll Groups', value: '3 Groups', sub: 'Bangalore, Mumbai, US Remote', color: 'text-[#5e2b9d]' },
      { label: 'Total Enrolled Staff', value: '50 Employees', sub: '100% assigned to a payroll run', color: 'text-[#16a34a]' },
      { label: 'Next Processing Cutoff', value: '25 Nov 2026', sub: 'Attendance lock date', color: 'text-amber-600' },
      { label: 'Salary Disbursement Date', value: '30 Nov 2026', sub: 'Via HDFC Direct Bank Transfer', color: 'text-[#111827]' },
    ],
    tableTitle: 'Configured Payroll Groups',
    headers: ['Payroll Group Name', 'Statutory Region', 'Disbursement Frequency', 'Assigned Employees', 'Monthly Gross Outflow', 'Payment Gateway Mode', 'Status', 'Actions'],
    rows: [
      {
        col1: { title: 'India Domestic Regular (Monthly)', sub: 'PG-IND-01' },
        col2: 'Karnataka & Maharashtra (India)',
        col3: 'Monthly (Last working day)',
        col4: '44 Employees',
        col5: '₹68,50,000 / mo',
        col6: 'HDFC Corporate NEFT / RTGS',
        status: 'approved',
        action: 'Configure Group',
      },
      {
        col1: { title: 'US Overseas Remote Staff', sub: 'PG-USA-02' },
        col2: 'California & Delaware (USA)',
        col3: 'Semi-Monthly (15th & 30th)',
        col4: '4 Contractors / Employees',
        col5: '$36,000 / mo',
        col6: 'Wise / Stripe Automated Transfer',
        status: 'approved',
        action: 'Configure Group',
      },
      {
        col1: { title: 'Executive Leadership Batch', sub: 'PG-EXEC-03' },
        col2: 'All Corporate Jurisdictions',
        col3: 'Monthly (28th of month)',
        col4: '2 Executives',
        col5: '₹14,00,000 / mo',
        col6: 'Direct Wire Transfer',
        status: 'approved',
        action: 'Configure Group',
      },
    ]
  },

  // 15. PAYROLL STRUCTURES
  {
    path: 'app/(hr)/payroll/structures/page.tsx',
    title: 'Salary Structures & Compensation CTC Templates',
    desc: 'Standardized compensation templates with Basic (50%), HRA (40%), Special Allowance, and PF/ESI calculations.',
    crumbs: [{ label: 'Payroll', href: '/payroll' }, { label: 'Structures' }],
    kpis: [
      { label: 'Defined Salary Structures', value: '4 Templates', sub: 'From Intern to Executive', color: 'text-[#5e2b9d]' },
      { label: 'Statutory Basic Rule', value: '50% of CTC', sub: 'Optimized for EPF & Gratuity', color: 'text-[#16a34a]' },
      { label: 'HRA Allowance Rule', value: '40% of Basic', sub: '50% in metro cities', color: 'text-[#111827]' },
      { label: 'PF Statutory Contribution', value: '12% of Basic', sub: 'Matches employee deduction', color: 'text-amber-600' },
    ],
    tableTitle: 'CTC Component Breakup Templates',
    headers: ['Structure Template Name', 'Applicable Bands', 'Basic Pay Component', 'HRA Allowance', 'Special Allowance', 'Provident Fund (PF)', 'ESI Eligibility', 'Actions'],
    rows: [
      {
        col1: { title: 'Software Engineering Standard CTC', sub: 'STR-ENG-2026' },
        col2: 'L2 – L4 (Engineering & DevOps)',
        col3: '50% of Total CTC',
        col4: '40% of Basic Pay',
        col5: 'Balance amount',
        col6: '12% of Basic (Capped at ₹1,800 or Actual)',
        col7: 'Exempt (CTC > ₹21,000/mo)',
        status: 'approved',
        action: 'Edit Structure',
      },
      {
        col1: { title: 'Product & Design Leadership Structure', sub: 'STR-PRD-2026' },
        col2: 'L3 – M1 (Design & Product)',
        col3: '50% of Total CTC',
        col4: '40% of Basic Pay',
        col5: 'Balance amount + LTA',
        col6: '12% of Basic Pay',
        col7: 'Exempt',
        status: 'approved',
        action: 'Edit Structure',
      },
      {
        col1: { title: 'Executive Management Compensation', sub: 'STR-EXEC-2026' },
        col2: 'M2 – E1 (Directors & VPs)',
        col3: '45% of Total CTC',
        col4: '50% of Basic Pay (Metro HRA)',
        col5: 'Special Allowance + Car Allowance',
        col6: '12% of Basic Pay',
        col7: 'Exempt',
        status: 'approved',
        action: 'Edit Structure',
      },
      {
        col1: { title: 'Graduate Trainee / Intern Stipend', sub: 'STR-INT-2026' },
        col2: 'L1 (Interns & Trainees)',
        col3: '100% Fixed Stipend',
        col4: 'Nil',
        col5: 'Nil',
        col6: 'Nil (Stipend exempt)',
        col7: 'Covered under group medical',
        status: 'approved',
        action: 'Edit Structure',
      },
    ]
  },

  // 16. PAYROLL LOANS
  {
    path: 'app/(hr)/payroll/loans/page.tsx',
    title: 'Salary Advances & Employee Emergency Loans',
    desc: 'Manage interest-free staff emergency advances, EMI repayment schedules, and automated payroll deductions.',
    crumbs: [{ label: 'Payroll', href: '/payroll' }, { label: 'Loans' }],
    kpis: [
      { label: 'Active Advance Disbursals', value: '4 Loans', sub: 'Total principal: ₹2,40,000', color: 'text-[#5e2b9d]' },
      { label: 'Total Repaid Principal', value: '₹1,65,000', sub: 'Deducted via monthly payroll', color: 'text-[#16a34a]' },
      { label: 'Outstanding Balance', value: '₹75,000', sub: 'Due over next 3 months', color: 'text-amber-600' },
      { label: 'Default / Loss Rate', value: '0.0%', sub: 'Guaranteed payroll recovery', color: 'text-[#111827]' },
    ],
    tableTitle: 'Active Staff Loans & Advances Register',
    headers: ['Employee Name & ID', 'Loan Purpose / Type', 'Sanctioned Amount', 'Monthly EMI Deduction', 'Total Repaid', 'Outstanding Balance', 'Repayment Status', 'Actions'],
    rows: [
      {
        col1: { title: 'Vikram Joshi', sub: 'PC-1014' },
        col2: 'Medical Emergency Advance',
        col3: '₹60,000',
        col4: '₹10,000 / mo',
        col5: '₹40,000 (4 EMIs)',
        col6: '₹20,000 Remaining',
        status: 'approved',
        action: 'View EMI Schedule',
      },
      {
        col1: { title: 'Kavita Nair', sub: 'PC-1022' },
        col2: 'Rental Deposit Advance',
        col3: '₹1,00,000',
        col4: '₹15,000 / mo',
        col5: '₹60,000 (4 EMIs)',
        col6: '₹40,000 Remaining',
        status: 'approved',
        action: 'View EMI Schedule',
      },
      {
        col1: { title: 'Priya Sharma', sub: 'PC-1002' },
        col2: 'Higher Education Course Grant',
        col3: '₹80,000',
        col4: '₹16,000 / mo',
        col5: '₹65,000 (4 EMIs)',
        col6: '₹15,000 Remaining',
        status: 'approved',
        action: 'View EMI Schedule',
      },
    ]
  },

  // 17. PAYROLL TAX
  {
    path: 'app/(hr)/payroll/tax/page.tsx',
    title: 'Statutory Tax Declarations & Form 16 Center',
    desc: 'Employee tax regime elections (New vs Old), Chapter VI-A investment proofs, and monthly TDS tax projections.',
    crumbs: [{ label: 'Payroll', href: '/payroll' }, { label: 'Tax Management' }],
    kpis: [
      { label: 'New Tax Regime Adoptions', value: '78% of Staff', sub: 'Lower slab rates (Sec 115BAC)', color: 'text-[#5e2b9d]' },
      { label: 'Old Tax Regime Adoptions', value: '22% of Staff', sub: 'Claiming 80C, 80D & Home Loan', color: 'text-blue-700' },
      { label: 'Monthly TDS Remitted', value: '₹9,84,000', sub: 'Deposited via Challan 281', color: 'text-[#16a34a]' },
      { label: 'Form 16 Readiness', value: '100% Up-To-Date', sub: 'Q2 quarterly 24Q filed', color: 'text-[#111827]' },
    ],
    tableTitle: 'Employee Tax Declarations & TDS Projections',
    headers: ['Employee Name & ID', 'Selected Tax Regime', 'Section 80C Declarations', '80D Health Insurance', 'Annual Estimated Tax', 'Monthly TDS Deducted', 'Form 16 Status', 'Actions'],
    rows: [
      {
        col1: { title: 'Priya Sharma', sub: 'PC-1002 • PAN: ABCPS1234F' },
        col2: 'New Tax Regime',
        col3: 'Not applicable (New Regime)',
        col4: 'Standard Deduction (₹75k)',
        col5: '₹1,92,000',
        col6: '₹16,000 / mo',
        status: 'approved',
        action: 'Download Tax Computation',
      },
      {
        col1: { title: 'Arjun Mehta', sub: 'PC-1005 • PAN: BCDEK5678G' },
        col2: 'Old Tax Regime',
        col3: '₹1,50,000 (PPF + ELSS)',
        col4: '₹25,000 (Health Insurance)',
        col5: '₹1,44,000',
        col6: '₹12,000 / mo',
        status: 'approved',
        action: 'Verify Proofs',
      },
      {
        col1: { title: 'Sneha Patil', sub: 'PC-1008 • PAN: CDEFG9012H' },
        col2: 'New Tax Regime',
        col3: 'Standard Deduction applied',
        col4: 'Employer NPS (Sec 80CCD)',
        col5: '₹2,16,000',
        col6: '₹18,000 / mo',
        status: 'approved',
        action: 'Download Tax Computation',
      },
      {
        col1: { title: 'Vikram Joshi', sub: 'PC-1014 • PAN: DEFGH3456J' },
        col2: 'Old Tax Regime',
        col3: '₹1,50,000 declared',
        col4: '₹20,000 declared',
        col5: '₹1,08,000',
        col6: '₹9,000 / mo',
        status: 'pending',
        action: 'Pending Proof Submission',
      },
    ]
  },

  // 18. MANAGER ATTENDANCE
  {
    path: 'app/(hr)/manager/attendance/page.tsx',
    title: 'Team Attendance & Shift Real-Time Monitor',
    desc: 'Monitor live check-in and check-out logs, turnstile scans, and punctuality across your direct reports.',
    crumbs: [{ label: 'Manager', href: '/manager/dashboard' }, { label: 'Team Attendance' }],
    kpis: [
      { label: 'Team Present Today', value: '4 / 4 Members', sub: '100% active at work', color: 'text-[#16a34a]' },
      { label: 'On-Time Check-In', value: '3 On-Time', sub: 'Checked in before 09:15 AM', color: 'text-[#5e2b9d]' },
      { label: 'Late Mark Today', value: '1 Late (09:28 AM)', sub: 'Sneha Patil (DevOps)', color: 'text-amber-600' },
      { label: 'Average Weekly Hours', value: '41.2 Hours', sub: 'Standard target: 40 hrs', color: 'text-[#111827]' },
    ],
    tableTitle: 'Direct Reports Punch Status Today',
    headers: ['Team Member Name', 'Role & Designation', 'Assigned Shift', 'First In-Punch', 'Last Out-Punch', 'Hours Today', 'Punctuality Status', 'Actions'],
    rows: [
      {
        col1: { title: 'Priya Sharma', sub: 'PC-1002' },
        col2: 'Staff Frontend Lead',
        col3: 'General Shift (09:00 - 18:00)',
        col4: '09:04 AM',
        col5: 'In Progress (Active)',
        col6: '6h 18m',
        status: 'approved',
        action: 'View Log',
      },
      {
        col1: { title: 'Arjun Mehta', sub: 'PC-1005' },
        col2: 'Lead Product Designer',
        col3: 'General Shift (09:00 - 18:00)',
        col4: '08:55 AM',
        col5: 'In Progress (Active)',
        col6: '6h 27m',
        status: 'approved',
        action: 'View Log',
      },
      {
        col1: { title: 'Sneha Patil', sub: 'PC-1008' },
        col2: 'DevOps Architect',
        col3: 'General Shift (09:00 - 18:00)',
        col4: '09:28 AM',
        col5: 'In Progress (Active)',
        col6: '5h 54m (Late Arrival)',
        status: 'pending',
        action: 'Review Late Mark',
      },
      {
        col1: { title: 'Vikram Joshi', sub: 'PC-1014' },
        col2: 'Full-Stack Developer',
        col3: 'General Shift (09:00 - 18:00)',
        col4: '09:10 AM',
        col5: 'In Progress (Active)',
        col6: '6h 12m',
        status: 'approved',
        action: 'View Log',
      },
    ]
  },

  // 19. MANAGER LEAVE APPROVALS
  {
    path: 'app/(hr)/manager/leave-approvals/page.tsx',
    title: 'Team Leave Requests & Approvals Inbox',
    desc: 'Review leave applications submitted by direct reports, verify department coverage, and sign off.',
    crumbs: [{ label: 'Manager', href: '/manager/dashboard' }, { label: 'Leave Approvals' }],
    kpis: [
      { label: 'Pending Approvals', value: '2 Requests', sub: 'Awaiting your manager sign-off', color: 'text-amber-600' },
      { label: 'Approved This Quarter', value: '14 Leaves', sub: 'All coverage verified', color: 'text-[#16a34a]' },
      { label: 'Team Coverage Health', value: '100% Operational', sub: 'No overlapping critical roles', color: 'text-[#5e2b9d]' },
      { label: 'Avg Manager TAT', value: '3.4 Hours', sub: 'Quick approval turnaround', color: 'text-[#111827]' },
    ],
    tableTitle: 'Pending Team Time-Off Requests',
    headers: ['Employee Name', 'Leave Category', 'Duration Days', 'From Date', 'To Date', 'Reason for Leave', 'Status', 'Actions'],
    rows: [
      {
        col1: { title: 'Priya Sharma', sub: 'PC-1002' },
        col2: 'Earned Leave (EL)',
        col3: '3 Days',
        col4: '12 Nov 2026',
        col5: '14 Nov 2026',
        col6: 'Family wedding ceremony in Jaipur',
        status: 'pending',
        action: 'Approve Leave',
      },
      {
        col1: { title: 'Arjun Mehta', sub: 'PC-1005' },
        col2: 'Casual Leave (CL)',
        col3: '2 Days',
        col4: '16 Nov 2026',
        col5: '17 Nov 2026',
        col6: 'Apartment relocation and home shifting',
        status: 'pending',
        action: 'Approve Leave',
      },
      {
        col1: { title: 'Sneha Patil', sub: 'PC-1008' },
        col2: 'Sick Leave (SL)',
        col3: '1 Day',
        col4: '04 Nov 2026',
        col5: '04 Nov 2026',
        col6: 'Viral fever consultation',
        status: 'approved',
        action: 'View Record',
      },
    ]
  },

  // 20. MANAGER EXPENSE APPROVALS
  {
    path: 'app/(hr)/manager/expense-approvals/page.tsx',
    title: 'Team Expense Reimbursements & Sign-Offs',
    desc: 'Verify expense reimbursement claims and invoices submitted by your direct reports.',
    crumbs: [{ label: 'Manager', href: '/manager/dashboard' }, { label: 'Expense Approvals' }],
    kpis: [
      { label: 'Pending Claims', value: '2 Vouchers', sub: 'Total value: ₹42,320', color: 'text-amber-600' },
      { label: 'Approved This Quarter', value: '₹1,84,500', sub: 'Transferred by finance', color: 'text-[#16a34a]' },
      { label: 'Receipts Verified', value: '100% Tax Invoices', sub: 'GST compliance verified', color: 'text-[#5e2b9d]' },
      { label: 'Department Budget Used', value: '62% of Fiscal Q4', sub: 'Within sanctioned limits', color: 'text-[#111827]' },
    ],
    tableTitle: 'Pending Team Expense Vouchers',
    headers: ['Employee Name', 'Claim ID', 'Expense Category', 'Expense Title / Description', 'Claim Amount', 'Invoice Date', 'Status', 'Actions'],
    rows: [
      {
        col1: { title: 'Arjun Mehta', sub: 'PC-1005' },
        col2: 'EXP-2026-084',
        col3: 'Software Licenses & SaaS',
        col4: 'Figma Enterprise Annual Team Seat Renewal',
        col5: '₹37,500',
        col6: '08 Nov 2026',
        status: 'pending',
        action: 'Approve Voucher',
      },
      {
        col1: { title: 'Priya Sharma', sub: 'PC-1002' },
        col2: 'EXP-2026-089',
        col3: 'Client Meeting & Meals',
        col4: 'Lunch with FinTech partner engineering team',
        col5: '₹4,820',
        col6: '06 Nov 2026',
        status: 'pending',
        action: 'Approve Voucher',
      },
      {
        col1: { title: 'Sneha Patil', sub: 'PC-1008' },
        col2: 'EXP-2026-071',
        col3: 'Certification Exam',
        col4: 'AWS Certified Solutions Architect Exam Fee',
        col5: '₹12,500',
        col6: '25 Oct 2026',
        status: 'approved',
        action: 'View Invoice',
      },
    ]
  },

  // 21. EMPLOYEE MY DOCUMENTS
  {
    path: 'app/(hr)/my/documents/page.tsx',
    title: 'My Personnel Records & Verified Credentials',
    desc: 'Access and download your employment contract, signed offer letter, statutory tax Form 16, and submitted KYC proofs.',
    crumbs: [{ label: 'Employee Portal', href: '/my/dashboard' }, { label: 'My Documents' }],
    kpis: [
      { label: 'Total Verified Records', value: '8 Documents', sub: 'Encrypted & signed digitally', color: 'text-[#5e2b9d]' },
      { label: 'Statutory KYC Status', value: 'Fully Verified', sub: 'PAN & Aadhaar linked', color: 'text-[#16a34a]' },
      { label: 'Tax Certificates', value: 'Form 16 Ready', sub: 'Available for FY 2025-26', color: 'text-[#111827]' },
      { label: 'Document Expirations', value: '0 Expiring', sub: 'All credentials in order', color: 'text-amber-600' },
    ],
    tableTitle: 'Personnel Document Vault',
    headers: ['Document Name', 'Category', 'Issuing Authority', 'Issued / Uploaded Date', 'File Format & Size', 'Verification Status', 'Actions'],
    rows: [
      {
        col1: { title: 'Official Employment Contract & Appointment Letter', sub: 'REF: EMP-DOC-2023-019' },
        col2: 'Legal Agreement',
        col3: 'PeopleCore Technologies Inc.',
        col4: '15 Mar 2023',
        col5: 'PDF (1.4 MB)',
        status: 'approved',
        action: 'Download PDF',
      },
      {
        col1: { title: 'Form 16 (Part A & Part B) - FY 2025-26', sub: 'Income Tax TDS Certificate' },
        col2: 'Tax Certificate',
        col3: 'Finance & Accounts Department',
        col4: '15 Jun 2026',
        col5: 'Digitally Signed PDF (850 KB)',
        status: 'approved',
        action: 'Download PDF',
      },
      {
        col1: { title: 'Permanent Account Number (PAN Card)', sub: 'ABCPS1234F' },
        col2: 'Identity Proof',
        col3: 'Income Tax Department (India)',
        col4: 'Verified 15 Mar 2023',
        col5: 'Scanned Image (420 KB)',
        status: 'approved',
        action: 'View Copy',
      },
      {
        col1: { title: 'Aadhaar Card (Masked e-Aadhaar)', sub: 'XXXX-XXXX-8821' },
        col2: 'Identity Proof',
        col3: 'UIDAI',
        col4: 'Verified 15 Mar 2023',
        col5: 'Protected PDF (620 KB)',
        status: 'approved',
        action: 'View Copy',
      },
    ]
  },

  // 22. EMPLOYEE MY CHECK-IN
  {
    path: 'app/(hr)/my/checkin/page.tsx',
    title: 'Web Attendance Punch In / Punch Out',
    desc: 'Log real-time clock-in with geolocation verification, turnstile punch records, and working hours countdown.',
    crumbs: [{ label: 'Employee Portal', href: '/my/dashboard' }, { label: 'Check In / Out' }],
    kpis: [
      { label: 'Working Status Today', value: 'Clocked In', sub: 'Since 09:04 AM IST', color: 'text-[#16a34a]' },
      { label: 'Time Elapsed Today', value: '6h 24m', sub: 'Target: 8.5 hours', color: 'text-[#5e2b9d]' },
      { label: 'Punctuality Status', value: 'On-Time Arrival', sub: 'Grace limit: 09:15 AM', color: 'text-[#111827]' },
      { label: 'Office Geofence Status', value: 'Within Perimeter', sub: 'Bangalore Tech Cloud (North)', color: 'text-[#16a34a]' },
    ],
    tableTitle: "Today's Verified Punch Events",
    headers: ['Punch Event ID', 'Timestamp', 'Event Type', 'Terminal / Capture Mode', 'Geo-Location Stamp', 'System Status', 'Actions'],
    rows: [
      {
        col1: { title: 'PUNCH-20261110-01', sub: 'Turnstile Entry Scan' },
        col2: '10 Nov 2026, 09:04:12 AM',
        col3: 'Check-In (Clock In)',
        col4: 'Biometric Turnstile #2 (Main Lobby)',
        col5: '12.9716° N, 77.5946° E (Bangalore HQ)',
        status: 'approved',
        action: 'Verified',
      },
      {
        col1: { title: 'PUNCH-20261110-02', sub: 'Expected Out-Punch' },
        col2: 'Estimated 06:00:00 PM',
        col3: 'Check-Out (Pending)',
        col4: 'Web Browser / Turnstile Exit',
        col5: 'Will be recorded at exit',
        status: 'pending',
        action: 'Clock Out Now',
      },
    ]
  },

  // 23. SUPER ADMIN SUBSCRIPTIONS
  {
    path: 'app/(super-admin)/super-admin/subscriptions/page.tsx',
    title: 'SaaS Subscriptions & Tenant Billing',
    desc: 'Manage enterprise client contract billing, subscription tiers (Enterprise, Pro, Starter), and invoice cycles.',
    crumbs: [{ label: 'Super Admin', href: '/super-admin/dashboard' }, { label: 'Subscriptions' }],
    kpis: [
      { label: 'Total Annual ARR', value: '₹1,01,40,000', sub: '14 enterprise accounts', color: 'text-[#16a34a]' },
      { label: 'Monthly Recurring (MRR)', value: '₹8,45,000 / mo', sub: '+12% QoQ growth', color: 'text-[#5e2b9d]' },
      { label: 'Enterprise Tier Accounts', value: '6 Companies', sub: 'Unlimited employee seats', color: 'text-[#111827]' },
      { label: 'Gross Churn Rate', value: '0.8%', sub: 'Far below 2% SaaS industry avg', color: 'text-amber-600' },
    ],
    tableTitle: 'Active SaaS Client Subscriptions',
    headers: ['Client Company Name', 'Subscription Tier', 'Billing Frequency', 'Contract MRR', 'Employee Seat Quota', 'Next Renewal Date', 'Payment Status', 'Actions'],
    rows: [
      {
        col1: { title: 'Apex Global Technologies', sub: 'apex-global.peoplecore.io' },
        col2: 'Enterprise Tier',
        col3: 'Annual Prepaid',
        col4: '₹75,000 / mo',
        col5: '500 Seats (442 in use)',
        col6: '15 Jan 2027',
        status: 'approved',
        action: 'View Invoices',
      },
      {
        col1: { title: 'Zenith Logistics India', sub: 'zenith-logistics.peoplecore.io' },
        col2: 'Professional Tier',
        col3: 'Quarterly Invoiced',
        col4: '₹35,000 / mo',
        col5: '250 Seats (198 in use)',
        col6: '10 Dec 2026',
        status: 'approved',
        action: 'View Invoices',
      },
      {
        col1: { title: 'InnoHealth Medical Systems', sub: 'innohealth.peoplecore.io' },
        col2: 'Enterprise Tier',
        col3: 'Annual Prepaid',
        col4: '₹1,10,000 / mo',
        col5: '1,000 Seats (840 in use)',
        col6: '20 Jun 2027',
        status: 'approved',
        action: 'View Invoices',
      },
      {
        col1: { title: 'FinEdge Advisory Services', sub: 'finedge.peoplecore.io' },
        col2: 'Starter Tier',
        col3: 'Monthly Card Billing',
        col4: '₹12,000 / mo',
        col5: '50 Seats (38 in use)',
        col6: '05 Dec 2026',
        status: 'approved',
        action: 'View Invoices',
      },
    ]
  },

  // 24. SUPER ADMIN MODULES
  {
    path: 'app/(super-admin)/super-admin/modules/page.tsx',
    title: 'SaaS Feature Flags & Module Entitlements',
    desc: 'Toggle platform modules (Payroll, Recruitment, 360 Appraisals, Timesheets) per client company subscription.',
    crumbs: [{ label: 'Super Admin', href: '/super-admin/dashboard' }, { label: 'Module Management' }],
    kpis: [
      { label: 'Core HR & Employee Master', value: 'Enabled All (14/14)', sub: 'Default foundational tier', color: 'text-[#16a34a]' },
      { label: 'Automated Payroll Engine', value: '12 / 14 Tenants', sub: 'Premium module add-on', color: 'text-[#5e2b9d]' },
      { label: 'Talent Acquisition Pipeline', value: '10 / 14 Tenants', sub: 'Enterprise tier feature', color: 'text-[#111827]' },
      { label: 'Project Timesheets & Billing', value: '8 / 14 Tenants', sub: 'Professional services add-on', color: 'text-amber-600' },
    ],
    tableTitle: 'Tenant Feature Entitlement Matrix',
    headers: ['Client Company', 'Subscription Plan', 'Payroll Module', 'Recruitment ATS', 'Timesheets', 'Performance 360', 'Hardware Assets', 'Actions'],
    rows: [
      {
        col1: { title: 'Apex Global Technologies', sub: 'Tenant ID: 0001' },
        col2: 'Enterprise Tier',
        col3: 'Enabled',
        col4: 'Enabled',
        col5: 'Enabled',
        col6: 'Enabled',
        col7: 'Enabled',
        status: 'approved',
        action: 'Edit Feature Flags',
      },
      {
        col1: { title: 'Zenith Logistics India', sub: 'Tenant ID: 0002' },
        col2: 'Professional Tier',
        col3: 'Enabled',
        col4: 'Enabled',
        col5: 'Disabled',
        col6: 'Enabled',
        col7: 'Disabled',
        status: 'approved',
        action: 'Edit Feature Flags',
      },
      {
        col1: { title: 'FinEdge Advisory Services', sub: 'Tenant ID: 0004' },
        col2: 'Starter Tier',
        col3: 'Disabled',
        col4: 'Disabled',
        col5: 'Disabled',
        col6: 'Disabled',
        col7: 'Disabled',
        status: 'pending',
        action: 'Upgrade Plan',
      },
    ]
  },

  // 25. SUPER ADMIN PLATFORM REPORTS
  {
    path: 'app/(super-admin)/super-admin/reports/page.tsx',
    title: 'Platform SaaS Health & Revenue Analytics',
    desc: 'Platform financial metrics, multi-tenant database capacity, active sessions, and client retention.',
    crumbs: [{ label: 'Super Admin', href: '/super-admin/dashboard' }, { label: 'Platform Reports' }],
    kpis: [
      { label: 'Total Platform ARR', value: '₹1.01 Crore', sub: 'Annualized run rate', color: 'text-[#16a34a]' },
      { label: 'Average Revenue Per Tenant', value: '₹72,400 / mo', sub: 'High ACV enterprise mix', color: 'text-[#5e2b9d]' },
      { label: 'Database Storage Consumed', value: '42.8 GB / 500 GB', sub: 'PostgreSQL multi-tenant schema', color: 'text-[#111827]' },
      { label: 'System API SLA', value: '99.98% Uptime', sub: 'Zero major incidents in 90 days', color: 'text-[#16a34a]' },
    ],
    tableTitle: 'Tenant Usage & Storage Consumption',
    headers: ['Tenant Company Name', 'Active Users', 'Storage Used', 'API Calls (30d)', 'Avg Response Time', 'Database Region', 'Tenant Status', 'Actions'],
    rows: [
      {
        col1: { title: 'Apex Global Technologies', sub: 'apex-global' },
        col2: '442 Active',
        col3: '14.2 GB',
        col4: '1,420,000 requests',
        col5: '42 ms',
        col6: 'ap-south-1 (Mumbai)',
        status: 'approved',
        action: 'Tenant Diagnostics',
      },
      {
        col1: { title: 'InnoHealth Medical Systems', sub: 'innohealth' },
        col2: '840 Active',
        col3: '22.8 GB',
        col4: '2,890,000 requests',
        col5: '38 ms',
        col6: 'ap-south-1 (Mumbai)',
        status: 'approved',
        action: 'Tenant Diagnostics',
      },
      {
        col1: { title: 'Zenith Logistics India', sub: 'zenith-logistics' },
        col2: '198 Active',
        col3: '4.8 GB',
        col4: '680,000 requests',
        col5: '45 ms',
        col6: 'ap-south-1 (Mumbai)',
        status: 'approved',
        action: 'Tenant Diagnostics',
      },
    ]
  },

  // 26. SUPER ADMIN SYSTEM SETTINGS
  {
    path: 'app/(super-admin)/super-admin/settings/page.tsx',
    title: 'Platform Infrastructure & Cloud Settings',
    desc: 'PostgreSQL connection pooling, Supabase Auth session TTL, multi-tenant backup snapshots, and security controls.',
    crumbs: [{ label: 'Super Admin', href: '/super-admin/dashboard' }, { label: 'System Settings' }],
    kpis: [
      { label: 'Database Pooling Mode', value: 'Transaction Pooler', sub: 'PgBouncer on port 6543', color: 'text-[#5e2b9d]' },
      { label: 'Session Inactivity TTL', value: '7 Days', sub: 'Auto-refreshing JWT token', color: 'text-[#16a34a]' },
      { label: 'Database Backup Frequency', value: 'Every 6 Hours', sub: 'Automated point-in-time recovery', color: 'text-[#111827]' },
      { label: 'Data Encryption Standard', value: 'AES-256 & TLS 1.3', sub: 'Full encryption at rest & transit', color: 'text-[#16a34a]' },
    ],
    tableTitle: 'Core Infrastructure Services Status',
    headers: ['Service Component', 'Cluster / Provider', 'Host Endpoint', 'Active Connections', 'Health Status', 'Last Latency Ping', 'Actions'],
    rows: [
      {
        col1: { title: 'PostgreSQL Database Engine', sub: 'Primary Production DB' },
        col2: 'Supabase Enterprise (AWS)',
        col3: 'db.peoplecore-production.internal',
        col4: '48 / 200 connections',
        col5: 'Healthy (0.8ms)',
        status: 'approved',
        action: 'View Metrics',
      },
      {
        col1: { title: 'Encrypted S3 Document Storage', sub: 'Personnel Document Vault' },
        col2: 'AWS S3 (Mumbai Region)',
        col3: 's3.ap-south-1.amazonaws.com/peoplecore-docs',
        col4: '2,400 documents',
        col5: 'Healthy (22ms)',
        status: 'approved',
        action: 'Bucket Settings',
      },
      {
        col1: { title: 'Transactional Email Dispatcher', sub: 'Resend / SMTP Gateway' },
        col2: 'Dedicated Cloud SMTP',
        col3: 'smtp.peoplecore.io (Port 587)',
        col4: '14,200 emails / mo',
        col5: 'Healthy (99.9% delivery)',
        status: 'approved',
        action: 'Test Dispatch',
      },
    ]
  },

  // 27. SUPER ADMIN USERS
  {
    path: 'app/(super-admin)/super-admin/users/page.tsx',
    title: 'Global Platform Administrators',
    desc: 'Manage super administrator accounts with root database and tenant management access.',
    crumbs: [{ label: 'Super Admin', href: '/super-admin/dashboard' }, { label: 'Users' }],
    kpis: [
      { label: 'Super Admin Accounts', value: '3 Administrators', sub: 'Root SaaS access', color: 'text-[#5e2b9d]' },
      { label: 'MFA Enforcement', value: '100% Enforced', sub: 'TOTP Authenticator required', color: 'text-[#16a34a]' },
      { label: 'Active Sessions Today', value: '2 Sessions', sub: 'Audit logged', color: 'text-[#111827]' },
      { label: 'Security Role', value: 'RBAC Root Level', sub: 'Full platform privileges', color: 'text-amber-600' },
    ],
    tableTitle: 'Platform Administrator Directory',
    headers: ['Admin User Name', 'Email Address', 'Privilege Scope', 'Two-Factor Auth', 'Last Login Timestamp', 'Session IP Address', 'Status', 'Actions'],
    rows: [
      {
        col1: { title: 'Super Admin', sub: 'ID: SA-001' },
        col2: 'superadmin@peoplecore.io',
        col3: 'Global Platform Owner',
        col4: 'MFA Enabled (TOTP)',
        col5: 'Today, 11:42 AM',
        col6: '192.168.0.2',
        status: 'approved',
        action: 'Manage Credentials',
      },
      {
        col1: { title: 'Vinay Vakati (Root Admin)', sub: 'ID: SA-002' },
        col2: 'vinayvakati16@gmail.com',
        col3: 'Principal System Engineer',
        col4: 'MFA Enabled (TOTP)',
        col5: 'Today, 11:45 AM',
        col6: '192.168.0.2',
        status: 'approved',
        action: 'Manage Credentials',
      },
      {
        col1: { title: 'Security Ops Admin', sub: 'ID: SA-003' },
        col2: 'secops@peoplecore.io',
        col3: 'Security & Compliance Officer',
        col4: 'MFA Enabled (Hardware Key)',
        col5: 'Yesterday, 04:30 PM',
        col6: '103.21.14.88',
        status: 'approved',
        action: 'Manage Credentials',
      },
    ]
  },
];

console.log('Building ' + pageConfigs.length + ' tailored domain pages...');

for (const cfg of pageConfigs) {
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
  console.log('Updated with tailored domain data:', cfg.path);
}
console.log('All key pages successfully populated with rich domain data!');

