import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/layout/PageHeader'
import { DashboardCharts } from '@/components/charts/DashboardCharts'
import {
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  UserPlus,
  UserMinus,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { formatDate } from '@/lib/utils/date'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard' }

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'up' | 'down' | 'neutral'
  icon: React.ReactNode
  iconBg: string
}

function StatCard({ title, value, change, changeType, icon, iconBg }: StatCardProps) {
  return (
    <Card>
      <CardContent className="pt-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-[#6b7280] mb-1">{title}</p>
            <p className="text-2xl font-bold text-[#111827]">{value}</p>
            {change && (
              <p className={`text-xs mt-1 flex items-center gap-1 ${
                changeType === 'up' ? 'text-[#16a34a]' :
                changeType === 'down' ? 'text-[#dc2626]' :
                'text-[#6b7280]'
              }`}>
                {changeType === 'up' && <TrendingUp className="h-3 w-3" />}
                {changeType === 'down' && <TrendingDown className="h-3 w-3" />}
                {change}
              </p>
            )}
          </div>
          <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${iconBg}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default async function DashboardPage() {
  const supabase = await createClient()

  // Fetch real data
  const { count: totalEmployees } = await supabase
    .from('employees')
    .select('*', { count: 'exact', head: true })
    .eq('employment_status', 'active')

  const { count: pendingLeaves } = await supabase
    .from('leave_applications')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending')

  const today = new Date().toISOString().split('T')[0]
  const { count: presentToday } = await supabase
    .from('attendance_records')
    .select('*', { count: 'exact', head: true })
    .eq('date', today)
    .eq('status', 'present')

  // Recent employees
  const { data: recentEmployees } = await supabase
    .from('employees')
    .select('id, first_name, last_name, designation_id, joining_date, employment_status, photo_url')
    .order('created_at', { ascending: false })
    .limit(5)

  // Upcoming birthdays
  const { data: upcomingBirthdays } = await supabase
    .from('employees')
    .select('id, first_name, last_name, date_of_birth, photo_url')
    .not('date_of_birth', 'is', null)
    .limit(5)

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening in your organization."
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Employees"
          value={totalEmployees ?? 0}
          change="+3 this month"
          changeType="up"
          icon={<Users className="h-5 w-5 text-[#5e2b9d]" />}
          iconBg="bg-[#f3eefb]"
        />
        <StatCard
          title="Present Today"
          value={presentToday ?? 0}
          change={totalEmployees ? `${Math.round(((presentToday ?? 0) / totalEmployees) * 100)}% attendance` : '—'}
          changeType="neutral"
          icon={<Clock className="h-5 w-5 text-[#2563eb]" />}
          iconBg="bg-[#eff6ff]"
        />
        <StatCard
          title="Pending Leaves"
          value={pendingLeaves ?? 0}
          change="Needs approval"
          changeType={pendingLeaves ? 'down' : 'neutral'}
          icon={<AlertCircle className="h-5 w-5 text-[#d97706]" />}
          iconBg="bg-[#fffbeb]"
        />
        <StatCard
          title="Payroll Status"
          value="On Time"
          change="Processed Nov 2026"
          changeType="up"
          icon={<DollarSign className="h-5 w-5 text-[#16a34a]" />}
          iconBg="bg-[#f0fdf4]"
        />
      </div>

      {/* Analytics Charts */}
      <DashboardCharts />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Employees */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Recent Joiners</CardTitle>
                <a href="/employees" className="text-xs text-[#5e2b9d] hover:underline">
                  View all
                </a>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {recentEmployees && recentEmployees.length > 0 ? (
                <div className="divide-y divide-[#f1f3f5]">
                  {recentEmployees.map((emp) => (
                    <div key={emp.id} className="flex items-center gap-3 py-2.5">
                      <Avatar
                        name={`${emp.first_name} ${emp.last_name}`}
                        photoUrl={emp.photo_url}
                        size="sm"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#111827] truncate">
                          {emp.first_name} {emp.last_name}
                        </p>
                        <p className="text-xs text-[#6b7280]">
                          Joined {formatDate(emp.joining_date)}
                        </p>
                      </div>
                      <StatusBadge status={emp.employment_status} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <UserPlus className="h-8 w-8 text-[#d1d5db] mx-auto mb-2" />
                  <p className="text-sm text-[#9ca3af]">No employees yet</p>
                  <a href="/employees/new" className="text-xs text-[#5e2b9d] hover:underline mt-1 inline-block">
                    Add first employee
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions + Birthdays */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1">
                {[
                  { label: 'Add Employee', href: '/employees/new', icon: UserPlus, color: 'text-[#5e2b9d]' },
                  { label: 'Mark Attendance', href: '/attendance/manual', icon: Clock, color: 'text-[#2563eb]' },
                  { label: 'View Leave Requests', href: '/leave/approvals', icon: CheckCircle, color: 'text-[#d97706]' },
                  { label: 'Run Payroll', href: '/payroll/process', icon: DollarSign, color: 'text-[#16a34a]' },
                  { label: 'View Reports', href: '/reports/employees', icon: TrendingUp, color: 'text-[#9ca3af]' },
                ].map((action) => (
                  <a
                    key={action.href}
                    href={action.href}
                    className="flex items-center gap-2.5 px-2 py-1.5 rounded-[6px] hover:bg-[#f1f3f5] transition-colors group"
                  >
                    <action.icon className={`h-4 w-4 ${action.color}`} />
                    <span className="text-sm text-[#374151] group-hover:text-[#111827]">
                      {action.label}
                    </span>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Upcoming Birthdays</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {upcomingBirthdays && upcomingBirthdays.length > 0 ? (
                <div className="space-y-2.5">
                  {upcomingBirthdays.slice(0, 4).map((emp) => (
                    <div key={emp.id} className="flex items-center gap-2.5">
                      <Avatar
                        name={`${emp.first_name} ${emp.last_name}`}
                        photoUrl={emp.photo_url}
                        size="xs"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-[#111827] truncate">
                          {emp.first_name} {emp.last_name}
                        </p>
                        <p className="text-[10px] text-[#9ca3af]">
                          {emp.date_of_birth ? formatDate(emp.date_of_birth, 'dd MMM') : '—'}
                        </p>
                      </div>
                      <span className="text-lg">🎂</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#9ca3af] text-center py-4">
                  No upcoming birthdays
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

