import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/common/Avatar'
import { StatusBadge } from '@/components/common/StatusBadge'
import { formatDate } from '@/lib/utils/date'
import {
  Users,
  CheckCircle2,
  Clock,
  Palmtree,
  ArrowRight,
  TrendingUp,
  Calendar,
  AlertCircle,
} from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Manager Portal Dashboard' }

const fallbackTeam = [
  {
    id: 'emp-1002',
    employee_id: 'PC-1002',
    first_name: 'Priya',
    last_name: 'Sharma',
    photo_url: null,
    employment_status: 'active',
    designations: { name: 'Senior Frontend Engineer' },
    departments: { name: 'Engineering' },
  },
  {
    id: 'emp-1005',
    employee_id: 'PC-1005',
    first_name: 'Arjun',
    last_name: 'Mehta',
    photo_url: null,
    employment_status: 'active',
    designations: { name: 'Lead UI/UX Designer' },
    departments: { name: 'Product' },
  },
  {
    id: 'emp-1008',
    employee_id: 'PC-1008',
    first_name: 'Sneha',
    last_name: 'Patil',
    photo_url: null,
    employment_status: 'active',
    designations: { name: 'DevOps Architect' },
    departments: { name: 'Cloud Operations' },
  },
  {
    id: 'emp-1014',
    employee_id: 'PC-1014',
    first_name: 'Vikram',
    last_name: 'Joshi',
    photo_url: null,
    employment_status: 'active',
    designations: { name: 'Full-Stack Developer' },
    departments: { name: 'Engineering' },
  },
]

const fallbackPendingLeaves = [
  {
    id: 'leave-101',
    from_date: '2026-11-12',
    to_date: '2026-11-14',
    days: 3,
    reason: 'Family visit and personal commitment',
    employees: { first_name: 'Priya', last_name: 'Sharma', photo_url: null },
    leave_types: { name: 'Earned Leave' },
  },
  {
    id: 'leave-102',
    from_date: '2026-11-16',
    to_date: '2026-11-17',
    days: 2,
    reason: 'Medical checkup and rest',
    employees: { first_name: 'Arjun', last_name: 'Mehta', photo_url: null },
    leave_types: { name: 'Casual Leave' },
  },
]

export default async function ManagerDashboardPage() {
  const supabase = await createClient()

  let team = fallbackTeam
  let pendingLeaves = fallbackPendingLeaves
  let teamPresentCount = 3

  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      // Get manager's employee record
      const { data: managerEmp } = await supabase
        .from('employees')
        .select('id, first_name, last_name')
        .eq('user_id', user.id)
        .maybeSingle()

      const managerId = managerEmp?.id ?? user.id

      // Fetch direct reports
      const { data: teamMembers } = await supabase
        .from('employees')
        .select(`
          id, employee_id, first_name, last_name, photo_url, employment_status, joining_date,
          designations (name),
          departments (name)
        `)
        .eq('reporting_manager_id', managerId)

      if (teamMembers && teamMembers.length > 0) {
        team = teamMembers as any
        const teamIds = team.map((m) => m.id)
        const today = new Date().toISOString().split('T')[0]

        // Team attendance today
        const { count } = await supabase
          .from('attendance_records')
          .select('*', { count: 'exact', head: true })
          .in('employee_id', teamIds)
          .eq('date', today)
          .eq('status', 'present')

        if (count !== null) teamPresentCount = count

        // Pending team leave approvals
        const { data: leaves } = await supabase
          .from('leave_applications')
          .select(`
            id, from_date, to_date, days, reason, created_at,
            employees!leave_applications_employee_id_fkey (first_name, last_name, photo_url),
            leave_types (name)
          `)
          .in('employee_id', teamIds)
          .eq('status', 'pending')

        if (leaves && leaves.length > 0) pendingLeaves = leaves as any
      }
    }
  } catch {
    // Graceful fallback to demo team
  }

  return (
    <div>
      <PageHeader
        title="Team Manager Portal"
        description="Monitor your direct reports, approve leaves, review attendance, and oversee team performance."
        breadcrumb={[{ label: 'Manager' }, { label: 'Dashboard' }]}
        actions={
          <Button size="sm" asChild>
            <Link href="/manager/team" className="inline-flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              <span>View My Team</span>
            </Link>
          </Button>
        }
      />

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-[#6b7280] font-medium">Direct Reports</p>
            <p className="text-2xl font-bold text-[#111827] mt-1">{team.length}</p>
            <p className="text-xs text-[#9ca3af] mt-1">Assigned team members</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-[#6b7280] font-medium">Present Today</p>
            <p className="text-2xl font-bold text-[#16a34a] mt-1">{teamPresentCount}</p>
            <p className="text-xs text-[#9ca3af] mt-1">
              {team.length > 0 ? `${Math.round((teamPresentCount / team.length) * 100)}% attendance rate` : 'No team members'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-[#6b7280] font-medium">Pending Approvals</p>
            <p className="text-2xl font-bold text-[#d97706] mt-1">{pendingLeaves.length}</p>
            <p className="text-xs text-[#9ca3af] mt-1">Leave requests awaiting action</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-[#6b7280] font-medium">Team Performance</p>
            <p className="text-2xl font-bold text-[#5e2b9d] mt-1">94%</p>
            <p className="text-xs text-[#16a34a] mt-1">&uarr; Goals on track</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Team Requests */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle>Pending Leave Approvals</CardTitle>
                <p className="text-xs text-[#6b7280] mt-0.5">Requests submitted by your team</p>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/leave/approvals" className="text-xs text-[#5e2b9d] inline-flex items-center gap-1">
                  <span>Open Inbox</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="pt-0">
              {pendingLeaves && pendingLeaves.length > 0 ? (
                <div className="divide-y divide-[#f1f3f5]">
                  {pendingLeaves.map((req: any) => (
                    <div key={req.id} className="py-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <Avatar
                          name={`${req.employees?.first_name} ${req.employees?.last_name}`}
                          photoUrl={req.employees?.photo_url}
                          size="sm"
                        />
                        <div>
                          <p className="font-semibold text-[#111827]">
                            {req.employees?.first_name} {req.employees?.last_name}
                          </p>
                          <p className="text-[#6b7280]">
                            {req.leave_types?.name} &bull; {req.days} days ({formatDate(req.from_date, 'dd MMM')} – {formatDate(req.to_date, 'dd MMM')})
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="secondary" asChild>
                        <Link href="/leave/approvals">Review</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center">
                  <CheckCircle2 className="h-7 w-7 text-[#16a34a] mx-auto mb-2" />
                  <p className="text-sm font-medium text-[#374151]">All clear!</p>
                  <p className="text-xs text-[#9ca3af] mt-0.5">No pending leave or attendance approvals for your team.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* My Team Members Preview */}
        <div>
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle>My Direct Reports</CardTitle>
              <Link href="/manager/team" className="text-xs text-[#5e2b9d] hover:underline">
                View All
              </Link>
            </CardHeader>
            <CardContent className="pt-0">
              {team.length > 0 ? (
                <div className="divide-y divide-[#f1f3f5]">
                  {team.slice(0, 5).map((member: any) => (
                    <div key={member.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <Avatar
                          name={`${member.first_name} ${member.last_name}`}
                          photoUrl={member.photo_url}
                          size="sm"
                        />
                        <div>
                          <p className="font-medium text-[#111827]">{member.first_name} {member.last_name}</p>
                          <p className="text-[11px] text-[#9ca3af]">{member.designations?.name ?? 'Employee'}</p>
                        </div>
                      </div>
                      <StatusBadge status={member.employment_status} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#9ca3af] py-6 text-center">
                  No direct reports assigned yet.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
