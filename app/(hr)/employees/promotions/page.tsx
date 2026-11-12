import { PageHeader } from '@/components/layout/PageHeader'
import { PromotionsClient } from './PromotionsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Employee Promotions & Designation Changes' }

export default async function EmployeePromotionsPage() {
  return (
    <div>
      <PageHeader
        title="Promotions & Designation Adjustments"
        description="Track career progressions, title promotions, grade tier elevations, and merit-based compensation revisions."
        breadcrumb={[
          { label: 'Employees', href: '/employees' },
          { label: 'Promotions' },
        ]}
      />
      <PromotionsClient />
    </div>
  )
}

