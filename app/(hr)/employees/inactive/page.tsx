import { PageHeader } from '@/components/layout/PageHeader'
import { InactiveEmployeesClient } from './InactiveEmployeesClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Inactive & Separated Employees' }

export default async function InactiveEmployeesPage() {
  return (
    <div>
      <PageHeader
        title="Inactive & Exited Employees Archive"
        description="Records of separated, retired, and sabbatical staff members, including exit clearance archives and alumni reinstatement options."
        breadcrumb={[
          { label: 'Employees', href: '/employees' },
          { label: 'Inactive' },
        ]}
      />
      <InactiveEmployeesClient />
    </div>
  )
}

