import { PageHeader } from '@/components/layout/PageHeader'
import { LeaveDashboardClient } from './LeaveDashboardClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Leave Management Dashboard' }

export default async function LeaveDashboardPage() {
  return (
    <div>
      <PageHeader
        title="Leave Management Dashboard"
        description="Monitor organization-wide leave balances, employees on leave today, upcoming holiday calendars, and pending leave requests."
        breadcrumb={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Leave' },
        ]}
      />
      <LeaveDashboardClient />
    </div>
  )
}

