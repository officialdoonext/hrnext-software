import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { DesignationsList } from './DesignationsList'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Designations' }

export default async function DesignationsPage() {
  const supabase = await createClient()

  const { data: designations } = await supabase
    .from('designations')
    .select(`
      id, name, code, level, description, status,
      departments (name)
    `)
    .order('level', { ascending: true })

  const { data: empCounts } = await supabase
    .from('employees')
    .select('designation_id')
    .eq('employment_status', 'active')

  const countMap: Record<string, number> = {}
  empCounts?.forEach((e) => {
    if (e.designation_id) countMap[e.designation_id] = (countMap[e.designation_id] ?? 0) + 1
  })

  const enriched = designations?.map((d) => ({
    ...d,
    employee_count: countMap[d.id] ?? 0,
  })) ?? []

  return (
    <div>
      <PageHeader
        title="Designation Management"
        description="Manage job titles, hierarchies, and departments."
        breadcrumb={[{ label: 'Organization' }, { label: 'Designations' }]}
        actions={
          <Button size="sm">
            <Plus className="h-3.5 w-3.5" />
            Add Designation
          </Button>
        }
      />
      <DesignationsList data={enriched as any} />
    </div>
  )
}
