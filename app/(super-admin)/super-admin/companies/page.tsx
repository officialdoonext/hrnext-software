import { PageHeader } from '@/components/layout/PageHeader'
import { CompaniesClient } from './CompaniesClient'
import { query } from '@/lib/neon/db'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Company Management - Super Admin' }

export default async function SuperAdminCompaniesPage() {
  let tenants: any[] = []

  try {
    const res = await query('SELECT * FROM tenants ORDER BY created_at DESC')
    tenants = res.rows.map((row) => ({
      ...row,
      created_at: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
      subscription_expiry_date: row.subscription_expiry_date
        ? new Date(row.subscription_expiry_date).toISOString().split('T')[0]
        : null,
    }))
  } catch (err) {
    console.error('Failed to query tenants from Neon:', err)
  }

  return (
    <div>
      <PageHeader
        title="Tenant Company Management"
        description="Provision, configure, and monitor multi-tenant organizations on PeopleCore HRMS SaaS."
        breadcrumb={[
          { label: 'Super Admin', href: '/super-admin/dashboard' },
          { label: 'Companies' },
        ]}
      />
      <CompaniesClient initialTenants={tenants} />
    </div>
  )
}
