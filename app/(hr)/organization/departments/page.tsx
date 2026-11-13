import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { DepartmentsList } from './DepartmentsList'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Departments' }

export default async function DepartmentsPage() {
  const supabase = await createClient()

  const { data: departments } = await supabase
    .from('departments')
    .select(`
      id, name, code, description, status, created_at,
      head:employees!departments_head_id_fkey (first_name, last_name),
      parent:departments!departments_parent_id_fkey (name)
    `)
    .order('name')

  // Count employees per department
  const { data: empCounts } = await supabase
    .from('employees')
    .select('department_id')
    .eq('employment_status', 'active')

  const countMap: Record<string, number> = {}
  empCounts?.forEach((e: any) => {
    if (e.department_id) {
      countMap[e.department_id] = (countMap[e.department_id] ?? 0) + 1
    }
  })

  const enriched = departments?.map((d: any) => ({
    ...d,
    employee_count: countMap[d.id] ?? 0,
  })) ?? []

  return (
    <div>
      <PageHeader
        title="Departments"
        description="Manage departments and their organizational structure."
        breadcrumb={[{ label: 'Organization' }, { label: 'Departments' }]}
        actions={
          <Button size="sm">
            <Plus className="h-3.5 w-3.5" />
            Add Department
          </Button>
        }
      />
      <DepartmentsList data={enriched as any} />
    </div>
  )
}

