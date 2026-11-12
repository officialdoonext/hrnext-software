import { PageHeader } from '@/components/layout/PageHeader'
import { AnnouncementsClient } from './AnnouncementsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Company Announcements' }

export default async function AnnouncementsPage() {
  return (
    <div>
      <PageHeader
        title="Company Announcements & Internal Feed"
        description="Broadcast company-wide notices, policy updates, town hall schedules, and celebrate work anniversaries."
        breadcrumb={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Communication' },
          { label: 'Announcements' },
        ]}
      />
      <AnnouncementsClient />
    </div>
  )
}

