import { PageHeader } from '@/components/layout/PageHeader'
import { AddEmployeeForm } from './AddEmployeeForm'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = { title: 'Add Employee' }

export default async function AddEmployeePage() {
  const supabase = await createClient()

  // Fetch reference data for dropdowns
  const [
    { data: departments },
    { data: designations },
    { data: branches },
    { data: jobGrades },
    { data: costCentres },
    { data: managers },
  ] = await Promise.all([
    supabase.from('departments').select('id, name').eq('status', 'active').order('name'),
    supabase.from('designations').select('id, name').eq('status', 'active').order('name'),
    supabase.from('branches').select('id, name').eq('status', 'active').order('name'),
    supabase.from('job_grades').select('id, name').eq('status', 'active').order('name'),
    supabase.from('cost_centres').select('id, name').eq('status', 'active').order('name'),
    supabase
      .from('employees')
      .select('id, first_name, last_name, employee_id')
      .eq('employment_status', 'active')
      .order('first_name'),
  ])

  return (
    <div>
      <PageHeader
        title="Add Employee"
        description="Complete the form below to add a new employee to the system."
        breadcrumb={[
          { label: 'Employees', href: '/employees' },
          { label: 'Add Employee' },
        ]}
      />
      <AddEmployeeForm
        departments={departments ?? []}
        designations={designations ?? []}
        branches={branches ?? []}
        jobGrades={jobGrades ?? []}
        costCentres={costCentres ?? []}
        managers={managers ?? []}
      />
    </div>
  )
}

