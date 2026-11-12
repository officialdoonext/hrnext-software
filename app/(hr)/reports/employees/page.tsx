import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/layout/PageHeader'
import { EmployeeReportsClient } from './EmployeeReportsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Employee Reports' }

export default async function EmployeeReportsPage() {
  const supabase = await createClient()

  const { data: employees } = await supabase
    .from('employees')
    .select(`
      id, employee_id, first_name, middle_name, last_name, joining_date,
      employment_type, employment_status, work_email, mobile, date_of_birth, gender,
      departments (name),
      designations (name),
      branches (name)
    `)
    .order('joining_date', { ascending: false })

  return (
    <div>
      <PageHeader
        title="Employee Master & Workforce Reports"
        description="Generate and export comprehensive employee demographics, department distribution, and headcounts."
        breadcrumb={[
          { label: 'Reports', href: '/reports/employees' },
          { label: 'Employee Reports' },
        ]}
      />
      <EmployeeReportsClient employees={(employees as any) ?? []} />
    </div>
  )
}

