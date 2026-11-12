import { PageHeader } from '@/components/layout/PageHeader'
import { TimesheetsClient } from './TimesheetsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Time & Timesheets' }

export default async function TimesheetsPage() {
  return (
    <div>
      <PageHeader
        title="Time & Timesheets"
        description="Weekly project timesheet tracking, billable hour allocation, and managerial approvals."
        breadcrumb={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Timesheets' },
        ]}
      />
      <TimesheetsClient />
    </div>
  )
}

