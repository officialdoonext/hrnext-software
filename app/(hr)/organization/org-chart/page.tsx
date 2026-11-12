import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/layout/PageHeader'
import { OrgChartClient } from './OrgChartClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Organization Chart' }

export default async function OrgChartPage() {
  const supabase = await createClient()

  // Fetch employees with manager hierarchy
  const { data: employees } = await supabase
    .from('employees')
    .select(`
      id, employee_id, first_name, last_name, photo_url, reporting_manager_id,
      departments (name),
      designations (name)
    `)
    .eq('employment_status', 'active')
    .order('first_name')

  return (
    <div>
      <PageHeader
        title="Organization Chart & Reporting Hierarchy"
        description="Visual enterprise structure: CEO, department heads, reporting managers, and team hierarchies."
        breadcrumb={[
          { label: 'Organization', href: '/organization/company' },
          { label: 'Org Chart' },
        ]}
      />
      <OrgChartClient employees={(employees as any) ?? []} />
    </div>
  )
}

