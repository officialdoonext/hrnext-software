import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, role } = body
    const cookieStore = await cookies()

    // 1. Try real Supabase auth first if configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const isRealSupabase = supabaseUrl && !supabaseUrl.includes('demo-project.supabase.co')

    if (isRealSupabase && email && password) {
      const supabase = createServerClient<any>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return cookieStore.getAll()
            },
            setAll(cookiesToSet) {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            },
          },
        }
      )

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (!error && data.user) {
        return NextResponse.json({ success: true, redirectUrl: '/dashboard' })
      }
    }

    // 2. Fallback / One-click Demo Mode:
    // Determine user role and profile based on role or email
    let userRole = role || 'hr_admin'
    let fullName = 'Vinay Vakati'
    let redirectUrl = '/dashboard'

    if (email?.includes('super') || role === 'super_admin') {
      userRole = 'super_admin'
      fullName = 'Super Admin'
      redirectUrl = '/super-admin/dashboard'
    } else if (email?.includes('manager') || role === 'manager') {
      userRole = 'manager'
      fullName = 'Rajesh Kumar (Engineering Manager)'
      redirectUrl = '/manager/dashboard'
    } else if (email?.includes('employee') || role === 'employee') {
      userRole = 'employee'
      fullName = 'Priya Sharma (Frontend Engineer)'
      redirectUrl = '/my/dashboard'
    } else {
      userRole = 'hr_admin'
      fullName = email ? email.split('@')[0].replace('.', ' ') : 'HR Administrator'
      redirectUrl = '/dashboard'
    }

    // Set demo session cookie
    const sessionData = {
      id: 'demo-user-' + userRole,
      email: email || `${userRole}@peoplecore.io`,
      full_name: fullName,
      role: userRole,
      tenant_id: '00000000-0000-0000-0000-000000000001',
    }

    cookieStore.set('demo_user_session', JSON.stringify(sessionData), {
      path: '/',
      httpOnly: false, // Accessible for client-side display
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'lax',
    })

    return NextResponse.json({ success: true, redirectUrl, user: sessionData })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Login failed' }, { status: 500 })
  }
}

