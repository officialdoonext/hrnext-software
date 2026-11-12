import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AppShell } from '@/components/layout/AppShell'
import React from 'react'

export default async function HRLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const demoCookie = cookieStore.get('demo_user_session')?.value

  let userInfo = {
    full_name: 'Vinay Vakati (HR Admin)',
    email: 'vinayvakati16@gmail.com',
    role: 'hr_admin',
  }

  // 1. If demo session cookie exists, use it
  if (demoCookie) {
    try {
      const parsed = JSON.parse(demoCookie)
      userInfo = {
        full_name: parsed.full_name || 'Vinay Vakati (HR Admin)',
        email: parsed.email || 'vinayvakati16@gmail.com',
        role: parsed.role || 'hr_admin',
      }
      return <AppShell user={userInfo}>{children}</AppShell>
    } catch {
      // ignore JSON parse error and proceed
    }
  }

  // 2. Check real Supabase authentication if configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const isRealSupabase = supabaseUrl && !supabaseUrl.includes('demo-project.supabase.co')

  if (isRealSupabase) {
    try {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        redirect('/login')
      }

      const { data: profile } = await supabase
        .from('users')
        .select('full_name, role, status')
        .eq('id', user.id)
        .single()

      userInfo = {
        full_name: profile?.full_name ?? user.user_metadata?.full_name ?? 'User',
        email: user.email ?? '',
        role: profile?.role ?? 'employee',
      }
      return <AppShell user={userInfo}>{children}</AppShell>
    } catch {
      redirect('/login')
    }
  }

  // 3. In local demo mode without cookie, render with default HR Admin session
  return <AppShell user={userInfo}>{children}</AppShell>
}
