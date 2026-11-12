import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/layout/PageHeader'
import { SalaryComponentsClient } from './SalaryComponentsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Salary Components & Statutory Rules' }

export default async function SalaryComponentsPage() {
  const supabase = await createClient()

  const { data: components } = await supabase
    .from('salary_components')
    .select('*')
    .order('type', { ascending: true })
    .order('name', { ascending: true })

  return (
    <div>
      <PageHeader
        title="Salary Components & Statutory Rules"
        description="Configure earnings, deductions, PF, ESI, Professional Tax, and custom allowances."
        breadcrumb={[
          { label: 'Payroll', href: '/payroll' },
          { label: 'Salary Components' },
        ]}
      />
      <SalaryComponentsClient initialComponents={components ?? []} />
    </div>
  )
}

