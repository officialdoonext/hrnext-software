import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { BranchesList } from './BranchesList'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Branches' }

export default async function BranchesPage() {
  const supabase = await createClient()

  const { data: branches } = await supabase
    .from('branches')
    .select(`
      id, name, code, type, email, phone, status, created_at,
      head:employees!branches_head_id_fkey (first_name, last_name)
    `)
    .order('name')

  const { data: empCounts } = await supabase
    .from('employees')
    .select('branch_id')
    .eq('employment_status', 'active')

  const countMap: Record<string, number> = {}
  empCounts?.forEach((e: any) => {
    if (e.branch_id) countMap[e.branch_id] = (countMap[e.branch_id] ?? 0) + 1
  })

  const enriched = branches?.map((b: any) => ({
    ...b,
    employee_count: countMap[b.id] ?? 0,
  })) ?? []

  return (
    <div>
      <PageHeader
        title="Branch Management"
        description="Manage company branches and office locations."
        breadcrumb={[{ label: 'Organization' }, { label: 'Branches' }]}
        actions={
          <Button size="sm">
            <Plus className="h-3.5 w-3.5" />
            Add Branch
          </Button>
        }
      />
      <BranchesList data={enriched as any} />
    </div>
  )
}

