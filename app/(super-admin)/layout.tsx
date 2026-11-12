import React from 'react'
import { AppShell } from '@/components/layout/AppShell'

export default async function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const userInfo = {
    full_name: 'Super Admin',
    email: 'superadmin@peoplecore.io',
    role: 'super_admin',
  }

  return (
    <AppShell user={userInfo} navigationType="super_admin">
      {children}
    </AppShell>
  )
}
