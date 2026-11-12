import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/layout/PageHeader'
import { ApplyLeaveClient } from './ApplyLeaveClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'My Leaves & Applications' }

export default async function MyLeavePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: employee } = await supabase
    .from('employees')
    .select('id, first_name, last_name')
    .eq('user_id', user?.id)
    .maybeSingle()

  const empId = employee?.id ?? user?.id

  // Fetch available leave types
  const { data: leaveTypes } = await supabase
    .from('leave_types')
    .select('*')
    .eq('status', 'active')
    .order('name')

  // Fetch employee's personal leave requests
  const { data: myApplications } = await supabase
    .from('leave_applications')
    .select(`
      id, from_date, to_date, days, half_day, half_day_session, reason, status, created_at,
      rejection_reason,
      leave_types (id, name, code, paid)
    `)
    .eq('employee_id', empId)
    .order('created_at', { ascending: false })

  return (
    <div>
      <PageHeader
        title="My Leave & Time Off"
        description="View your leave ledger, balances, and submit new leave requests."
        breadcrumb={[
          { label: 'Self Service', href: '/my/dashboard' },
          { label: 'My Leave' },
        ]}
      />
      <ApplyLeaveClient
        leaveTypes={leaveTypes ?? []}
        initialApplications={(myApplications as any) ?? []}
        employeeId={empId}
      />
    </div>
  )
}

