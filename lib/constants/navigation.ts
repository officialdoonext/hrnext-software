import {
  LayoutDashboard,
  Building2,
  Users,
  UserPlus,
  Calendar,
  Clock,
  PalmtreeIcon,
  DollarSign,
  Timer,
  Target,
  GraduationCap,
  Receipt,
  Package,
  LogOut,
  FileText,
  BarChart3,
  Settings,
  Bell,
  ShieldCheck,
  Briefcase,
  CheckSquare,
  MessageSquare,
  type LucideIcon,
} from 'lucide-react'

export type NavItem = {
  id: string
  label: string
  href?: string
  icon?: LucideIcon
  badge?: string
  children?: NavItem[]
  roles?: string[]
  separator?: boolean
}

export const hrNavigation: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'organization',
    label: 'Organization',
    icon: Building2,
    children: [
      { id: 'company-profile', label: 'Company Profile', href: '/organization/company' },
      { id: 'branches', label: 'Branches', href: '/organization/branches' },
      { id: 'departments', label: 'Departments', href: '/organization/departments' },
      { id: 'designations', label: 'Designations', href: '/organization/designations' },
      { id: 'job-grades', label: 'Job Grades', href: '/organization/job-grades' },
      { id: 'cost-centres', label: 'Cost Centres', href: '/organization/cost-centres' },
      { id: 'org-chart', label: 'Org Chart', href: '/organization/org-chart' },
    ],
  },
  {
    id: 'employees',
    label: 'Employees',
    icon: Users,
    children: [
      { id: 'employee-directory', label: 'Employee Directory', href: '/employees' },
      { id: 'add-employee', label: 'Add Employee', href: '/employees/new' },
      { id: 'employee-transfers', label: 'Transfers', href: '/employees/transfers' },
      { id: 'promotions', label: 'Promotions', href: '/employees/promotions' },
      { id: 'separation', label: 'Separation', href: '/employees/separation' },
      { id: 'inactive', label: 'Inactive Employees', href: '/employees/inactive' },
    ],
  },
  {
    id: 'recruitment',
    label: 'Recruitment',
    icon: Briefcase,
    children: [
      { id: 'recruitment-dashboard', label: 'Dashboard', href: '/recruitment' },
      { id: 'job-openings', label: 'Job Openings', href: '/recruitment/jobs' },
      { id: 'candidates', label: 'Candidates', href: '/recruitment/candidates' },
      { id: 'applications', label: 'Applications', href: '/recruitment/applications' },
      { id: 'interviews', label: 'Interviews', href: '/recruitment/interviews' },
      { id: 'offers', label: 'Job Offers', href: '/recruitment/offers' },
    ],
  },
  {
    id: 'attendance',
    label: 'Attendance',
    icon: Clock,
    children: [
      { id: 'attendance-dashboard', label: 'Dashboard', href: '/attendance' },
      { id: 'daily-attendance', label: 'Daily Attendance', href: '/attendance/daily' },
      { id: 'attendance-register', label: 'Attendance Register', href: '/attendance/register' },
      { id: 'manual-attendance', label: 'Manual Attendance', href: '/attendance/manual' },
      { id: 'regularization', label: 'Regularization', href: '/attendance/regularization' },
      { id: 'shifts', label: 'Shift Management', href: '/attendance/shifts' },
      { id: 'holidays', label: 'Holidays', href: '/attendance/holidays' },
      { id: 'overtime', label: 'Overtime', href: '/attendance/overtime' },
    ],
  },
  {
    id: 'leave',
    label: 'Leave',
    icon: PalmtreeIcon,
    children: [
      { id: 'leave-dashboard', label: 'Dashboard', href: '/leave' },
      { id: 'leave-requests', label: 'Leave Requests', href: '/leave/requests' },
      { id: 'leave-approvals', label: 'Approvals', href: '/leave/approvals' },
      { id: 'leave-types', label: 'Leave Types', href: '/leave/types' },
      { id: 'leave-policies', label: 'Leave Policies', href: '/leave/policies' },
      { id: 'leave-balances', label: 'Leave Balances', href: '/leave/balances' },
      { id: 'leave-calendar', label: 'Leave Calendar', href: '/leave/calendar' },
    ],
  },
  {
    id: 'payroll',
    label: 'Payroll',
    icon: DollarSign,
    children: [
      { id: 'payroll-dashboard', label: 'Dashboard', href: '/payroll' },
      { id: 'payroll-groups', label: 'Payroll Groups', href: '/payroll/groups' },
      { id: 'salary-components', label: 'Salary Components', href: '/payroll/components' },
      { id: 'salary-structures', label: 'Salary Structures', href: '/payroll/structures' },
      { id: 'payroll-processing', label: 'Monthly Payroll', href: '/payroll/process' },
      { id: 'payslips', label: 'Payslips', href: '/payroll/payslips' },
      { id: 'loans', label: 'Loans & Advances', href: '/payroll/loans' },
      { id: 'tax-management', label: 'Tax Management', href: '/payroll/tax' },
    ],
  },
  {
    id: 'timesheets',
    label: 'Timesheets',
    icon: Timer,
    children: [
      { id: 'timesheet-dashboard', label: 'Dashboard', href: '/timesheets' },
      { id: 'my-timesheets', label: 'My Timesheets', href: '/timesheets/my' },
      { id: 'team-timesheets', label: 'Team Timesheets', href: '/timesheets/team' },
      { id: 'timesheet-approvals', label: 'Approvals', href: '/timesheets/approvals' },
    ],
  },
  {
    id: 'performance',
    label: 'Performance',
    icon: Target,
    children: [
      { id: 'performance-dashboard', label: 'Dashboard', href: '/performance' },
      { id: 'performance-cycles', label: 'Cycles', href: '/performance/cycles' },
      { id: 'goals', label: 'Goals & KPIs', href: '/performance/goals' },
      { id: 'reviews', label: 'Reviews', href: '/performance/reviews' },
      { id: 'feedback', label: '360 Feedback', href: '/performance/feedback' },
    ],
  },
  {
    id: 'training',
    label: 'Training',
    icon: GraduationCap,
    children: [
      { id: 'training-dashboard', label: 'Dashboard', href: '/training' },
      { id: 'training-programs', label: 'Programs', href: '/training/programs' },
      { id: 'enrollments', label: 'Enrollments', href: '/training/enrollments' },
      { id: 'certificates', label: 'Certificates', href: '/training/certificates' },
    ],
  },
  {
    id: 'expenses',
    label: 'Expenses',
    icon: Receipt,
    children: [
      { id: 'expense-dashboard', label: 'Dashboard', href: '/expenses' },
      { id: 'my-expenses', label: 'My Expenses', href: '/expenses/my' },
      { id: 'expense-approvals', label: 'Approvals', href: '/expenses/approvals' },
      { id: 'expense-categories', label: 'Categories', href: '/expenses/categories' },
    ],
  },
  {
    id: 'assets',
    label: 'Assets',
    icon: Package,
    children: [
      { id: 'asset-dashboard', label: 'Dashboard', href: '/assets' },
      { id: 'asset-register', label: 'Asset Register', href: '/assets/register' },
      { id: 'asset-assignments', label: 'Assignments', href: '/assets/assignments' },
    ],
  },
  {
    id: 'separation',
    label: 'Separation',
    icon: LogOut,
    children: [
      { id: 'resignations', label: 'Resignations', href: '/separation/resignations' },
      { id: 'exit-clearance', label: 'Exit Clearance', href: '/separation/clearance' },
      { id: 'fnf', label: 'Full & Final', href: '/separation/fnf' },
    ],
  },
  {
    id: 'communication',
    label: 'Communication',
    icon: MessageSquare,
    children: [
      { id: 'announcements', label: 'Announcements', href: '/communication/announcements' },
      { id: 'events', label: 'Events', href: '/communication/events' },
      { id: 'helpdesk', label: 'HR Helpdesk', href: '/communication/helpdesk' },
    ],
  },
  {
    id: 'documents',
    label: 'Documents',
    icon: FileText,
    children: [
      { id: 'company-docs', label: 'Company Docs', href: '/documents/company' },
      { id: 'employee-docs', label: 'Employee Docs', href: '/documents/employee' },
      { id: 'templates', label: 'Templates', href: '/documents/templates' },
    ],
  },
  {
    id: 'approvals',
    label: 'Approvals',
    icon: CheckSquare,
    children: [
      { id: 'pending-approvals', label: 'Pending', href: '/approvals/pending' },
      { id: 'approval-history', label: 'History', href: '/approvals/history' },
      { id: 'workflows', label: 'Workflows', href: '/approvals/workflows' },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: BarChart3,
    children: [
      { id: 'employee-reports', label: 'Employee Reports', href: '/reports/employees' },
      { id: 'attendance-reports', label: 'Attendance', href: '/reports/attendance' },
      { id: 'leave-reports', label: 'Leave', href: '/reports/leave' },
      { id: 'payroll-reports', label: 'Payroll', href: '/reports/payroll' },
    ],
  },
  {
    id: 'admin',
    label: 'Administration',
    icon: ShieldCheck,
    roles: ['hr_admin', 'super_admin'],
    children: [
      { id: 'users', label: 'Users', href: '/admin/users' },
      { id: 'roles', label: 'Roles & Permissions', href: '/admin/roles' },
      { id: 'audit-logs', label: 'Audit Logs', href: '/admin/audit-logs' },
      { id: 'notifications', label: 'Notifications', href: '/admin/notifications' },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    href: '/settings',
  },
]

export const employeeNavigation: NavItem[] = [
  { id: 'my-dashboard', label: 'My Dashboard', href: '/my/dashboard', icon: LayoutDashboard },
  { id: 'my-profile', label: 'My Profile', href: '/my/profile', icon: Users },
  { id: 'check-in', label: 'Check In / Out', href: '/my/checkin', icon: Clock },
  { id: 'my-attendance', label: 'My Attendance', href: '/my/attendance', icon: Calendar },
  { id: 'my-leave', label: 'My Leave', href: '/my/leave', icon: PalmtreeIcon },
  { id: 'my-payslips', label: 'My Payslips', href: '/my/payslips', icon: DollarSign },
  { id: 'my-documents', label: 'My Documents', href: '/my/documents', icon: FileText },
  { id: 'my-expenses', label: 'My Expenses', href: '/my/expenses', icon: Receipt },
  { id: 'my-timesheets', label: 'My Timesheets', href: '/my/timesheets', icon: Timer },
  { id: 'my-goals', label: 'My Goals', href: '/my/goals', icon: Target },
  { id: 'my-training', label: 'My Training', href: '/my/training', icon: GraduationCap },
  { id: 'my-assets', label: 'My Assets', href: '/my/assets', icon: Package },
  { id: 'announcements', label: 'Announcements', href: '/my/announcements', icon: Bell },
  { id: 'help', label: 'Help & Support', href: '/my/help', icon: MessageSquare },
]

export const managerNavigation: NavItem[] = [
  { id: 'manager-dashboard', label: 'Dashboard', href: '/manager/dashboard', icon: LayoutDashboard },
  { id: 'my-team', label: 'My Team', href: '/manager/team', icon: Users },
  { id: 'team-attendance', label: 'Team Attendance', href: '/manager/attendance', icon: Clock },
  { id: 'leave-approvals', label: 'Leave Approvals', href: '/manager/leave-approvals', icon: PalmtreeIcon },
  { id: 'expense-approvals', label: 'Expense Approvals', href: '/manager/expense-approvals', icon: Receipt },
  { id: 'timesheet-approvals', label: 'Timesheet Approvals', href: '/manager/timesheet-approvals', icon: Timer },
  { id: 'team-performance', label: 'Team Performance', href: '/manager/performance', icon: Target },
  { id: 'team-reports', label: 'Team Reports', href: '/manager/reports', icon: BarChart3 },
]

export const superAdminNavigation: NavItem[] = [
  { id: 'sa-dashboard', label: 'Dashboard', href: '/super-admin/dashboard', icon: LayoutDashboard },
  { id: 'sa-companies', label: 'Companies', href: '/super-admin/companies', icon: Building2 },
  { id: 'sa-subscriptions', label: 'Subscriptions', href: '/super-admin/subscriptions', icon: Receipt },
  { id: 'sa-users', label: 'Users', href: '/super-admin/users', icon: Users },
  { id: 'sa-modules', label: 'Module Management', href: '/super-admin/modules', icon: Package },
  { id: 'sa-reports', label: 'Platform Reports', href: '/super-admin/reports', icon: BarChart3 },
  { id: 'sa-settings', label: 'System Settings', href: '/super-admin/settings', icon: Settings },
]

