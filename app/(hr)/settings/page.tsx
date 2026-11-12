import { PageHeader } from '@/components/layout/PageHeader'
import { SettingsClient } from './SettingsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Settings' }

export default async function SettingsPage() {
  return (
    <div>
      <PageHeader
        title="Organization Settings & Policies"
        description="Configure attendance policies, leave accrual rules, payroll statutory parameters, and notification webhooks."
        breadcrumb={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Settings' },
        ]}
      />
      <SettingsClient />
    </div>
  )
}

