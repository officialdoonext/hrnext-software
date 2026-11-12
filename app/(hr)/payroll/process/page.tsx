import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/layout/PageHeader'
import { PayrollProcessingClient } from './PayrollProcessingClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Monthly Payroll Processing' }

export default async function PayrollProcessPage() {
  const supabase = await createClient()

  // Fetch all active employees with their salary assignments and department
  const { data: employees } = await supabase
    .from('employees')
    .select(`
      id, employee_id, first_name, last_name, photo_url,
      departments (name),
      designations (name),
      employee_salary_assignments (annual_ctc, monthly_ctc, gross_salary, is_current)
    `)
    .eq('employment_status', 'active')
    .order('first_name', { ascending: true })

  // Fetch leave types & components
  const { data: components } = await supabase
    .from('salary_components')
    .select('*')
    .eq('status', 'active')

  return (
    <div>
      <PageHeader
        title="Monthly Payroll Run"
        description="Run automated payroll computation: Attendance integration, LOP calculation, PF, ESI, TDS, and final approval."
        breadcrumb={[
          { label: 'Payroll', href: '/payroll' },
          { label: 'Process Payroll' },
        ]}
      />
      <PayrollProcessingClient
        employees={(employees as any) ?? []}
        components={(components as any) ?? []}
      />
    </div>
  )
}

