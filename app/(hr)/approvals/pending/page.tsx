import { PageHeader } from '@/components/layout/PageHeader'
import { ApprovalsClient } from './ApprovalsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Pending Approvals' }

export default async function PendingApprovalsPage() {
  return (
    <div>
      <PageHeader
        title="Central Approvals Hub"
        description="Unified approval center for all employee leave applications, expense vouchers, attendance regularizations, and resignation requests."
        breadcrumb={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Approvals', href: '/approvals/pending' },
          { label: 'Pending' },
        ]}
      />
      <ApprovalsClient />
    </div>
  )
}

