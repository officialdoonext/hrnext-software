import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AppShell } from '@/components/layout/AppShell'
import React from 'react'

export default async function HRLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('hrms_session')?.value || cookieStore.get('demo_user_session')?.value

  if (!sessionCookie) {
    redirect('/login')
  }

  let userInfo = {
    full_name: 'Vinay Vakati (HR Admin)',
    email: 'admin@peoplecore.io',
    role: 'hr_admin',
    tenant_name: 'PeopleCore Platform',
  }

  try {
    const parsed = JSON.parse(sessionCookie)

    // Check tenant gatekeeper in layout as well
    const todayStr = new Date().toISOString().split('T')[0]
    const expiryDate = parsed.subscription_expiry_date
      ? new Date(parsed.subscription_expiry_date).toISOString().split('T')[0]
      : '1970-01-01'

    const isTenantActive = parsed.tenant_status === 'active'
    const isExpired = parsed.is_expired ?? (expiryDate < todayStr)

    // If tenant is inactive or expired, redirect to activation pending
    if (parsed.role !== 'super_admin' && (!isTenantActive || isExpired)) {
      redirect('/onboarding/activation-pending')
    }

    userInfo = {
      full_name: parsed.full_name || 'User',
      email: parsed.email || '',
      role: parsed.role || 'employee',
      tenant_name: parsed.tenant_name || 'Organization',
    }
  } catch {
    redirect('/login')
  }

  return <AppShell user={userInfo}>{children}</AppShell>
}
