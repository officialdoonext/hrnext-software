import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar } from '@/components/common/Avatar'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils/date'
import { Mail, Phone, Calendar, Clock, Eye, Briefcase, Users } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'My Team' }

export default async function ManagerTeamPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: managerEmp } = await supabase
    .from('employees')
    .select('id, first_name, last_name')
    .eq('user_id', user?.id)
    .maybeSingle()

  const managerId = managerEmp?.id ?? user?.id

  // Fetch team members with full details
  const { data: teamMembers } = await supabase
    .from('employees')
    .select(`
      id, employee_id, first_name, last_name, photo_url, work_email, mobile,
      joining_date, employment_status, employment_type,
      departments (name),
      designations (name),
      branches (name)
    `)
    .eq('reporting_manager_id', managerId)

  const team = teamMembers ?? []

  return (
    <div>
      <PageHeader
        title="My Team"
        description="View employee profiles, contact details, and attendance for your direct reports."
        breadcrumb={[
          { label: 'Manager', href: '/manager/dashboard' },
          { label: 'My Team' },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {team.length > 0 ? (
          team.map((emp: any) => {
            const fullName = `${emp.first_name} ${emp.last_name}`
            return (
              <Card key={emp.id} className="overflow-hidden">
                <CardContent className="pt-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar name={fullName} photoUrl={emp.photo_url} size="lg" />
                      <div>
                        <h3 className="text-sm font-semibold text-[#111827]">{fullName}</h3>
                        <p className="text-xs text-[#5e2b9d] font-medium">{emp.designations?.name ?? 'Employee'}</p>
                        <span className="text-[10px] font-mono text-[#9ca3af]">{emp.employee_id}</span>
                      </div>
                    </div>
                    <StatusBadge status={emp.employment_status} />
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#f1f3f5] space-y-2 text-xs text-[#6b7280]">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-3.5 w-3.5 text-[#9ca3af]" />
                      <span>{emp.departments?.name ?? 'Department not set'} &bull; {emp.branches?.name ?? 'Main Office'}</span>
                    </div>
                    {emp.work_email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-[#9ca3af]" />
                        <span className="truncate">{emp.work_email}</span>
                      </div>
                    )}
                    {emp.mobile && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 text-[#9ca3af]" />
                        <span>{emp.mobile}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-[#9ca3af]" />
                      <span>Joined {formatDate(emp.joining_date)}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#f1f3f5] flex items-center justify-between">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/employees/${emp.id}`} className="text-xs text-[#5e2b9d]">
                        <Eye className="h-3.5 w-3.5 mr-1" /> View Profile
                      </Link>
                    </Button>
                    <span className="text-[11px] bg-[#f8f9fa] text-[#6b7280] px-2 py-0.5 rounded capitalize">
                      {emp.employment_type?.replace('_', ' ')}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )
          })
        ) : (
          <div className="col-span-full py-16 text-center">
            <Users className="h-10 w-10 text-[#d1d5db] mx-auto mb-2" />
            <p className="text-sm font-medium text-[#374151]">No team members found</p>
            <p className="text-xs text-[#9ca3af] mt-0.5">
              Employees assigned to you as reporting manager will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
