import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { formatTime, formatDate } from '@/lib/utils/date'
import {
  Clock, Users, AlertCircle, CheckCircle, Calendar, Plus,
  ArrowRight, Download, SlidersHorizontal
} from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Attendance Dashboard' }

export default async function AttendanceDashboardPage() {
  const supabase = await createClient()
  const today = new Date().toISOString().split('T')[0]

  // Attendance statistics for today
  const [
    { count: totalEmployees },
    { count: presentCount },
    { count: onLeaveCount },
    { count: lateCount },
  ] = await Promise.all([
    supabase.from('employees').select('*', { count: 'exact', head: true }).eq('employment_status', 'active'),
    supabase.from('attendance_records').select('*', { count: 'exact', head: true }).eq('date', today).eq('status', 'present'),
    supabase.from('attendance_records').select('*', { count: 'exact', head: true }).eq('date', today).eq('status', 'on_leave'),
    supabase.from('attendance_records').select('*', { count: 'exact', head: true }).eq('date', today).gt('check_in', `${today}T09:30:00`),
  ])

  const total = totalEmployees ?? 0
  const present = presentCount ?? 0
  const onLeave = onLeaveCount ?? 0
  const absent = Math.max(0, total - present - onLeave)
  const attendanceRate = total > 0 ? Math.round((present / total) * 100) : 0

  // Today's attendance records with employee details
  const { data: todayRecords } = await supabase
    .from('attendance_records')
    .select(`
      id, date, check_in, check_out, working_hours, status, source,
      employees (id, employee_id, first_name, last_name, photo_url, departments (name))
    `)
    .eq('date', today)
    .order('check_in', { ascending: false })
    .limit(10)

  // Upcoming holidays
  const { data: upcomingHolidays } = await supabase
    .from('holidays')
    .select('id, name, date, type')
    .gte('date', today)
    .order('date', { ascending: true })
    .limit(4)

  return (
    <div>
      <PageHeader
        title="Attendance Dashboard"
        description={`Today is ${formatDate(today, 'EEEE, dd MMMM yyyy')}. Track organization attendance in real time.`}
        breadcrumb={[{ label: 'Attendance' }, { label: 'Dashboard' }]}
        actions={
          <>
            <Button variant="secondary" size="sm" asChild>
              <Link href="/attendance/daily">
                <Calendar className="h-3.5 w-3.5" />
                Daily Register
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/attendance/manual">
                <Plus className="h-3.5 w-3.5" />
                Manual Entry
              </Link>
            </Button>
          </>
        }
      />

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-[#6b7280] font-medium">Total Employees</p>
            <p className="text-2xl font-bold text-[#111827] mt-1">{total}</p>
            <p className="text-xs text-[#9ca3af] mt-1">Active workforce</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-center justify-between">
              <p className="text-xs text-[#6b7280] font-medium">Present Today</p>
              <span className="text-xs font-semibold text-[#16a34a] bg-[#f0fdf4] px-1.5 py-0.5 rounded-[4px]">
                {attendanceRate}%
              </span>
            </div>
            <p className="text-2xl font-bold text-[#16a34a] mt-1">{present}</p>
            <p className="text-xs text-[#9ca3af] mt-1">Checked in</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-[#6b7280] font-medium">Absent</p>
            <p className="text-2xl font-bold text-[#dc2626] mt-1">{absent}</p>
            <p className="text-xs text-[#9ca3af] mt-1">Unmarked / Absent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-[#6b7280] font-medium">On Leave</p>
            <p className="text-2xl font-bold text-[#d97706] mt-1">{onLeave}</p>
            <p className="text-xs text-[#9ca3af] mt-1">Approved leaves</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-[#6b7280] font-medium">Late Arrivals</p>
            <p className="text-2xl font-bold text-[#5e2b9d] mt-1">{lateCount ?? 0}</p>
            <p className="text-xs text-[#9ca3af] mt-1">After 9:30 AM</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Activity Log */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle>Today's Activity Log</CardTitle>
                <p className="text-xs text-[#6b7280] mt-0.5">Recent employee check-ins and check-outs</p>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/attendance/daily" className="text-xs text-[#5e2b9d]">
                  View all <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="pt-0">
              {todayRecords && todayRecords.length > 0 ? (
                <div className="divide-y divide-[#f1f3f5]">
                  {todayRecords.map((record: any) => {
                    const emp = record.employees
                    const fullName = emp ? `${emp.first_name} ${emp.last_name}` : 'Unknown'
                    return (
                      <div key={record.id} className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                          <Avatar name={fullName} photoUrl={emp?.photo_url} size="sm" />
                          <div>
                            <p className="text-sm font-medium text-[#111827]">{fullName}</p>
                            <p className="text-xs text-[#9ca3af]">
                              {emp?.departments?.name ?? '—'} &bull; {emp?.employee_id}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs">
                          <div>
                            <span className="text-[#9ca3af]">In: </span>
                            <span className="font-medium text-[#111827]">
                              {record.check_in ? new Date(record.check_in).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}
                            </span>
                          </div>
                          <div>
                            <span className="text-[#9ca3af]">Out: </span>
                            <span className="font-medium text-[#111827]">
                              {record.check_out ? new Date(record.check_out).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}
                            </span>
                          </div>
                          <StatusBadge status={record.status} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Clock className="h-8 w-8 text-[#d1d5db] mx-auto mb-2" />
                  <p className="text-sm font-medium text-[#374151]">No check-ins recorded yet today</p>
                  <p className="text-xs text-[#9ca3af] mt-0.5">Employees can punch in via their self-service portal or web dashboard.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-4">
          {/* Quick Links */}
          <Card>
            <CardHeader><CardTitle>Attendance Management</CardTitle></CardHeader>
            <CardContent className="pt-0 space-y-1">
              {[
                { label: 'Attendance Register', href: '/attendance/register', icon: Calendar },
                { label: 'Shift Schedules', href: '/attendance/shifts', icon: Clock },
                { label: 'Regularization Requests', href: '/attendance/regularization', icon: AlertCircle },
                { label: 'Holiday Calendar', href: '/attendance/holidays', icon: CheckCircle },
                { label: 'Attendance Reports', href: '/reports/attendance', icon: Download },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between p-2 rounded-[6px] hover:bg-[#f1f3f5] transition-colors text-sm text-[#374151] group"
                >
                  <div className="flex items-center gap-2.5">
                    <item.icon className="h-4 w-4 text-[#9ca3af] group-hover:text-[#5e2b9d]" />
                    <span>{item.label}</span>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-[#d1d5db] group-hover:text-[#5e2b9d]" />
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Holidays */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle>Upcoming Holidays</CardTitle>
              <Link href="/attendance/holidays" className="text-xs text-[#5e2b9d] hover:underline">
                View all
              </Link>
            </CardHeader>
            <CardContent className="pt-0">
              {upcomingHolidays && upcomingHolidays.length > 0 ? (
                <div className="space-y-3">
                  {upcomingHolidays.map((h) => (
                    <div key={h.id} className="flex items-center justify-between py-1 border-b border-[#f1f3f5] last:border-0">
                      <div>
                        <p className="text-xs font-semibold text-[#111827]">{h.name}</p>
                        <p className="text-[11px] text-[#9ca3af]">{formatDate(h.date, 'EEEE, dd MMM')}</p>
                      </div>
                      <span className="text-[10px] bg-[#f1f3f5] text-[#6b7280] px-2 py-0.5 rounded-[4px] capitalize">
                        {h.type}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#9ca3af] py-4 text-center">No upcoming holidays scheduled</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

