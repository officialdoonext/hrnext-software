import { PageHeader } from '@/components/layout/PageHeader'
import { TrainingClient } from './TrainingClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Training & Development' }

export default async function TrainingPage() {
  return (
    <div>
      <PageHeader
        title="Training & Upskilling Programs"
        description="Corporate skill matrix, technical certifications, compliance training sessions, and employee enrollments."
        breadcrumb={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Training' },
        ]}
      />
      <TrainingClient />
    </div>
  )
}

