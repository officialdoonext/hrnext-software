import { PageHeader } from '@/components/layout/PageHeader'
import { WorkflowsClient } from './WorkflowsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Approval Workflows' }

export default async function WorkflowsPage() {
  return (
    <div>
      <PageHeader
        title="Multi-Tier Approval Workflows"
        description="Configure sequential and parallel approval hierarchies, threshold rules, and automated escalation chains."
        breadcrumb={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Approvals', href: '/approvals/pending' },
          { label: 'Workflows' },
        ]}
      />
      <WorkflowsClient />
    </div>
  )
}

