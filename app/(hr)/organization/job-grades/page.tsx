import { PageHeader } from '@/components/layout/PageHeader'
import { JobGradesClient } from './JobGradesClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Job Grades & Bands' }

export default async function JobGradesPage() {
  return (
    <div>
      <PageHeader
        title="Job Grades & Compensation Bands"
        description="Establish organizational career ladders, salary bands (min/mid/max CTC), and designation grade mappings."
        breadcrumb={[
          { label: 'Organization', href: '/organization/company' },
          { label: 'Job Grades' },
        ]}
      />
      <JobGradesClient />
    </div>
  )
}

