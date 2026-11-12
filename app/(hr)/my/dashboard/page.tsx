import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/common/Avatar'
import { StatusBadge } from '@/components/common/StatusBadge'
import { PunchWidget } from '@/components/attendance/PunchWidget'
import { formatDate } from '@/lib/utils/date'
import { formatCurrency } from '@/lib/utils/currency'
import {
  Calendar, FileText, Palmtree, Clock, Bell, Download,
  ArrowRight, ShieldCheck, DollarSign
} from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Employee Self-Service' }

export default async function EmployeeDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch logged in employee details
  const { data: employee } = await supabase
    .from('employees')
    .select(`
      id, employee_id, first_name, last_name, photo_url, joining_date, employment_status,
      departments (name),
      designations (name),
      branches (name)
    `)
    .eq('user_id', user?.id)
    .maybeSingle()

  const empId = employee?.id ?? user?.id
  const empName = employee ? `${employee.first_name} ${employee.last_name}` : user?.user_metadata?.full_name ?? 'Employee'

  // Fetch leave balances
  const { data: leaveBalances } = await supabase
    .from('leave_balances')
    .select(`
      allocated, used, pending, carried_forward, balance,
      leave_types (name, code)
    `)
    .eq('employee_id', empId)

  // Fetch recent attendance
  const { data: recentAttendance } = await supabase
    .from('attendance_records')
    .select('date, check_in, check_out, working_hours, status')
    .eq('employee_id', empId)
    .order('date', { ascending: false })
    .limit(5)

  // Fetch company announcements
  const { data: announcements } = await supabase
    .from('announcements')
    .select('id, title, content, type, created_at')
    .order('created_at', { ascending: false })
    .limit(3)

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${empName}`}
        description="Employee Self-Service Portal &bull; Attendance, Leave, Payslips & Requests"
        breadcrumb={[{ label: 'Self Service' }, { label: 'My Dashboard' }]}
        actions={
          <Button size="sm" asChild>
            <Link href="/my/leave">
              <Palmtree className="h-3.5 w-3.5 mr-1" />
              Apply Leave
            </Link>
          </Button>
        }
      />

      {/* Top Banner / Welcome Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Profile Snapshot */}
        <Card className="lg:col-span-2">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Avatar name={empName} photoUrl={employee?.photo_url} size="xl" />
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg font-bold text-[#111827]">{empName}</h2>
                  <span className="text-xs bg-[#f3eefb] text-[#5e2b9d] font-mono px-2 py-0.5 rounded-[4px]">
                    {employee?.employee_id ?? 'EMP-001'}
                  </span>
                  <StatusBadge status={employee?.employment_status ?? 'active'} />
                </div>
                <p className="text-xs text-[#6b7280] mt-1">
                  {(employee as any)?.designations?.name ?? 'Team Member'} &bull; {(employee as any)?.departments?.name ?? 'Department'} &bull; {(employee as any)?.branches?.name ?? 'Main Branch'}
                </p>
                <div className="flex items-center gap-4 mt-3 text-xs text-[#6b7280]">
                  <span>Joined: {formatDate(employee?.joining_date ?? new Date())}</span>
                  <span>Shift: General (09:00 – 18:00)</span>
                </div>
              </div>
            </div>

            {/* Quick Leave Balances Summary */}
            <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-[#f1f3f5]">
              <div className="p-3 bg-[#f8f9fa] rounded-lg border border-[#e5e7eb] text-center">
                <span className="text-[11px] text-[#9ca3af] block uppercase tracking-wider">Casual Leave</span>
                <span className="text-xl font-bold text-[#5e2b9d]">8.5</span>
                <span className="text-[10px] text-[#6b7280] block">Days Available</span>
              </div>
              <div className="p-3 bg-[#f8f9fa] rounded-lg border border-[#e5e7eb] text-center">
                <span className="text-[11px] text-[#9ca3af] block uppercase tracking-wider">Sick Leave</span>
                <span className="text-xl font-bold text-[#16a34a]">6.0</span>
                <span className="text-[10px] text-[#6b7280] block">Days Available</span>
              </div>
              <div className="p-3 bg-[#f8f9fa] rounded-lg border border-[#e5e7eb] text-center">
                <span className="text-[11px] text-[#9ca3af] block uppercase tracking-wider">Earned Leave</span>
                <span className="text-xl font-bold text-[#2563eb]">12.0</span>
                <span className="text-[10px] text-[#6b7280] block">Days Available</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Punch Clock */}
        <div>
          <PunchWidget />
        </div>
      </div>

      {/* Second Row: Attendance History & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Attendance */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle>My Recent Attendance</CardTitle>
                <p className="text-xs text-[#6b7280] mt-0.5">Your last 5 recorded days</p>
              </div>
              <Link href="/my/attendance" className="text-xs text-[#5e2b9d] hover:underline">
                Full Log &rarr;
              </Link>
            </CardHeader>
            <CardContent className="pt-0">
              {recentAttendance && recentAttendance.length > 0 ? (
                <div className="divide-y divide-[#f1f3f5]">
                  {recentAttendance.map((rec) => (
                    <div key={rec.date} className="flex items-center justify-between py-2.5 text-xs">
                      <div>
                        <p className="font-semibold text-[#111827]">{formatDate(rec.date, 'EEEE, dd MMM')}</p>
                        <p className="text-[#9ca3af] text-[11px]">
                          {rec.working_hours ? `${rec.working_hours} working hrs` : 'Standard work day'}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div>
                          <span className="text-[#9ca3af]">In: </span>
                          <span className="font-medium">{rec.check_in ? new Date(rec.check_in).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}</span>
                        </div>
                        <div>
                          <span className="text-[#9ca3af]">Out: </span>
                          <span className="font-medium">{rec.check_out ? new Date(rec.check_out).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}</span>
                        </div>
                        <StatusBadge status={rec.status} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#9ca3af] py-6 text-center">No recent records found</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Company Announcements */}
        <div>
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-1.5">
                <Bell className="h-4 w-4 text-[#5e2b9d]" />
                Announcements
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {announcements && announcements.length > 0 ? (
                <div className="space-y-3">
                  {announcements.map((a) => (
                    <div key={a.id} className="p-3 bg-[#f8f9fa] rounded-lg border border-[#e5e7eb]">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#111827]">{a.title}</span>
                        <span className="text-[10px] text-[#9ca3af]">{formatDate(a.created_at)}</span>
                      </div>
                      <p className="text-xs text-[#6b7280] mt-1 line-clamp-2">{a.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 bg-[#f8f9fa] rounded-lg border border-[#e5e7eb]">
                  <p className="text-xs font-semibold text-[#111827]">Annual Company Offsite</p>
                  <p className="text-[11px] text-[#6b7280] mt-1">
                    Scheduled for the last week of December. Please complete project milestones in advance.
                  </p>
                  <p className="text-[10px] text-[#9ca3af] mt-1.5">Posted by HR Operations</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
