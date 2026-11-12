import { PageHeader } from '@/components/layout/PageHeader'
import { TransfersClient } from './TransfersClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Employee Transfers' }

export default async function EmployeeTransfersPage() {
  return (
    <div>
      <PageHeader
        title="Employee Branch & Department Transfers"
        description="Process inter-branch relocations, department transfers, reporting manager reassignments, and handover clearances."
        breadcrumb={[
          { label: 'Employees', href: '/employees' },
          { label: 'Transfers' },
        ]}
      />
      <TransfersClient />
    </div>
  )
}

