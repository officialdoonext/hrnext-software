import { PageHeader } from '@/components/layout/PageHeader'
import { PerformanceClient } from './PerformanceClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Performance Management' }

export default async function PerformancePage() {
  return (
    <div>
      <PageHeader
        title="Performance & Appraisal Management"
        description="Quarterly review cycles, employee OKRs, 360-degree feedback, and merit-based promotion scoring."
        breadcrumb={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Performance' },
        ]}
      />
      <PerformanceClient />
    </div>
  )
}

