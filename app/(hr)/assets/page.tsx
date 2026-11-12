import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/layout/PageHeader'
import { AssetsClient } from './AssetsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Asset Management' }

export default async function AssetsPage() {
  const supabase = await createClient()

  // Fetch registered company assets with assignment details
  const { data: assets } = await supabase
    .from('assets')
    .select(`
      id, name, category, serial_number, brand, model, cost, status, created_at,
      asset_assignments (
        id, assigned_date, returned_date,
        employees (id, employee_id, first_name, last_name, photo_url)
      )
    `)
    .order('created_at', { ascending: false })

  // Fetch active employees for assignment dropdown
  const { data: employees } = await supabase
    .from('employees')
    .select('id, employee_id, first_name, last_name')
    .eq('employment_status', 'active')
    .order('first_name')

  return (
    <div>
      <PageHeader
        title="Asset Inventory & Equipment Management"
        description="Track company hardware, laptops, monitors, accessories, assignment history, and returns."
        breadcrumb={[
          { label: 'Equipment', href: '/assets' },
          { label: 'Asset Register' },
        ]}
      />
      <AssetsClient
        initialAssets={(assets as any) ?? []}
        employees={(employees as any) ?? []}
      />
    </div>
  )
}

