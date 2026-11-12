import { PageHeader } from '@/components/layout/PageHeader'
import { AuditLogsClient } from './AuditLogsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Audit Logs' }

export default async function AuditLogsPage() {
  return (
    <div>
      <PageHeader
        title="Enterprise Audit Trail & Security Logs"
        description="Immutable chronological activity log recording all user logins, record modifications, payroll disbursements, and permission adjustments."
        breadcrumb={[
          { label: 'Administration', href: '/admin/roles' },
          { label: 'Audit Logs' },
        ]}
      />
      <AuditLogsClient />
    </div>
  )
}

