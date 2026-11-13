import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { query } from '@/lib/neon/db'

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('hrms_session')?.value || cookieStore.get('demo_user_session')?.value

    if (!sessionCookie) {
      return NextResponse.json({ user: null }, { status: 401 })
    }

    let session: any
    try {
      session = JSON.parse(sessionCookie)
    } catch {
      return NextResponse.json({ user: null }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const shouldRefresh = searchParams.get('refresh') === 'true'

    // If tenant_id exists, fetch live tenant status and expiry from Neon DB
    if (session.tenant_id && (shouldRefresh || !session.tenant_status)) {
      const tenantRes = await query(
        `SELECT id, name, status, subscription_expiry_date FROM tenants WHERE id = $1 LIMIT 1`,
        [session.tenant_id]
      )

      if (tenantRes.rows.length > 0) {
        const liveTenant = tenantRes.rows[0]
        const todayStr = new Date().toISOString().split('T')[0]
        const expiryDateStr = liveTenant.subscription_expiry_date
          ? new Date(liveTenant.subscription_expiry_date).toISOString().split('T')[0]
          : '1970-01-01'
        const isExpired = expiryDateStr < todayStr

        session.tenant_status = liveTenant.status
        session.subscription_expiry_date = expiryDateStr
        session.is_expired = isExpired
        session.tenant_name = liveTenant.name

        // Update cookie with refreshed live data
        cookieStore.set('hrms_session', JSON.stringify(session), {
          path: '/',
          httpOnly: false,
          maxAge: 60 * 60 * 24 * 7,
          sameSite: 'lax',
        })
      }
    }

    return NextResponse.json({ user: session })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Session query failed' }, { status: 500 })
  }
}

