import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/button'
import { UserPlus, Download } from 'lucide-react'
import Link from 'next/link'
import { EmployeeTable } from './EmployeeTable'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Employees' }

export default async function EmployeesPage() {
  const supabase = await createClient()

  const { data: employees, error } = await supabase
    .from('employees')
    .select(`
      id,
      employee_id,
      first_name,
      middle_name,
      last_name,
      photo_url,
      joining_date,
      employment_type,
      employment_status,
      work_email,
      mobile,
      departments (name),
      designations (name),
      branches (name),
      reporting_manager:employees!employees_reporting_manager_id_fkey (first_name, last_name)
    `)
    .order('created_at', { ascending: false })

  return (
    <div>
      <PageHeader
        title="Employee Directory"
        description="Manage all employees across your organization."
        breadcrumb={[{ label: 'Employees' }]}
        actions={
          <>
            <Button variant="secondary" size="sm">
              <Download className="h-3.5 w-3.5" />
              Export
            </Button>
            <Button size="sm" asChild>
              <Link href="/employees/new">
                <UserPlus className="h-3.5 w-3.5" />
                Add Employee
              </Link>
            </Button>
          </>
        }
      />

      <EmployeeTable data={(employees as any) ?? []} />
    </div>
  )
}

