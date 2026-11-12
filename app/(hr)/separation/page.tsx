import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/layout/PageHeader'
import { SeparationClient } from './SeparationClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Employee Separation & Exit Management' }

export default async function SeparationPage() {
  const supabase = await createClient()

  // Fetch resignation records with employee details
  const { data: resignations } = await supabase
    .from('resignations')
    .select(`
      id, resignation_date, requested_last_working_day, approved_last_working_day,
      reason, notice_period_days, status, fnf_settlement_status, created_at,
      employees (id, employee_id, first_name, last_name, photo_url, joining_date, departments (name), designations (name))
    `)
    .order('created_at', { ascending: false })

  const { data: employees } = await supabase
    .from('employees')
    .select('id, employee_id, first_name, last_name')
    .eq('employment_status', 'active')
    .order('first_name')

  return (
    <div>
      <PageHeader
        title="Employee Separation & Exit Management"
        description="Oversee resignations, notice periods, departmental clearances, asset recoveries, and full & final settlements."
        breadcrumb={[
          { label: 'Employees', href: '/employees' },
          { label: 'Separation' },
        ]}
      />
      <SeparationClient
        initialResignations={(resignations as any) ?? []}
        employees={(employees as any) ?? []}
      />
    </div>
  )
}

