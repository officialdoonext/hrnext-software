import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/layout/PageHeader'
import { CompaniesClient } from './CompaniesClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Company Management - Super Admin' }

export default async function SuperAdminCompaniesPage() {
  const supabase = await createClient()

  const { data: tenants } = await supabase
    .from('tenants')
    .select('*')
    .order('created_at', { ascending: false })

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
      <CompaniesClient initialTenants={tenants ?? []} />
    </div>
  )
}

