import { PageHeader } from '@/components/layout/PageHeader'
import { TemplatesClient } from './TemplatesClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Document Templates' }

export default async function TemplatesPage() {
  return (
    <div>
      <PageHeader
        title="Document Templates & Dynamic Generation"
        description="Standardized legal contracts, offer letters, appointment agreements, and relieving certificates with dynamic employee merge fields."
        breadcrumb={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Documents' },
          { label: 'Templates' },
        ]}
      />
      <TemplatesClient />
    </div>
  )
}

