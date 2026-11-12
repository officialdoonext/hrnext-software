import { PageHeader } from '@/components/layout/PageHeader'
import { RolesClient } from './RolesClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Roles & Permissions' }

export default async function RolesPage() {
  return (
    <div>
      <PageHeader
        title="Role-Based Access Control (RBAC)"
        description="Configure granular module permissions (View, Create, Edit, Delete, Export) for Super Admin, HR Admin, Manager, and Employee roles."
        breadcrumb={[
          { label: 'Administration', href: '/admin/roles' },
          { label: 'Roles & Permissions' },
        ]}
      />
      <RolesClient />
    </div>
  )
}

