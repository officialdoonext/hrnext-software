import { PageHeader } from '@/components/layout/PageHeader'
import { CostCentresClient } from './CostCentresClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Cost Centres' }

export default async function CostCentresPage() {
  return (
    <div>
      <PageHeader
        title="Cost Centres & Budget Allocation"
        description="Allocate corporate departments to financial cost centres for granular payroll expense accounting and departmental P&L tracking."
        breadcrumb={[
          { label: 'Organization', href: '/organization/company' },
          { label: 'Cost Centres' },
        ]}
      />
      <CostCentresClient />
    </div>
  )
}

