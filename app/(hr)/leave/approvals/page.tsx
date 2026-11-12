import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/layout/PageHeader'
import { LeaveApprovalsClient } from './LeaveApprovalsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Leave Approvals' }

export default async function LeaveApprovalsPage() {
  const supabase = await createClient()

  // Fetch pending and recent leave applications
  const { data: applications } = await supabase
    .from('leave_applications')
    .select(`
      id, from_date, to_date, days, half_day, half_day_session, reason, status, created_at,
      rejection_reason,
      employees!leave_applications_employee_id_fkey (id, employee_id, first_name, last_name, photo_url, departments (name)),
      leave_types (id, name, code, paid)
    `)
    .order('created_at', { ascending: false })

  return (
    <div>
      <PageHeader
        title="Leave Approvals"
        description="Review and act on employee leave applications. Approvals automatically update attendance and payroll records."
        breadcrumb={[
          { label: 'Leave', href: '/leave' },
          { label: 'Approvals' },
        ]}
      />
      <LeaveApprovalsClient initialApplications={(applications as any) ?? []} />
    </div>
  )
}

