import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { query } from '@/lib/neon/db'

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('hrms_session')?.value || cookieStore.get('demo_user_session')?.value
    let user: any = null

    if (sessionCookie) {
      try {
        user = JSON.parse(sessionCookie)
      } catch {}
    }

    // Only Super Admin or authorized platform administrators can execute tenant activation
    if (!user || user.role !== 'super_admin') {
      return NextResponse.json(
        { error: 'Unauthorized: Only Super Administrators can activate tenant subscriptions.' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { tenant_id, plan = 'professional', validity_days = 365 } = body

    if (!tenant_id) {
      return NextResponse.json({ error: 'tenant_id is required' }, { status: 400 })
    }

    const days = Math.max(1, parseInt(validity_days, 10) || 365)

    // Update tenant to active and set new future expiry date
    const tenantUpdate = await query(
      `
      UPDATE tenants
      SET status = 'active',
          plan = $1,
          subscription_expiry_date = (CURRENT_DATE + ($2 || ' days')::INTERVAL)::DATE,
          activated_at = NOW(),
          activated_by = $3,
          updated_at = NOW()
      WHERE id = $4
      RETURNING id, name, slug, plan, status, subscription_expiry_date, activated_at;
      `,
      [plan, days, user.id, tenant_id]
    )

    if (tenantUpdate.rows.length === 0) {
      return NextResponse.json({ error: 'Tenant not found.' }, { status: 404 })
    }

    // Activate tenant users
    await query(
      `
      UPDATE users
      SET status = 'active',
          updated_at = NOW()
      WHERE tenant_id = $1;
      `,
      [tenant_id]
    )

    // Log administrative audit entry
    await query(
      `
      INSERT INTO audit_logs (tenant_id, user_id, action, entity_type, entity_id, new_values)
      VALUES ($1, $2, 'ACTIVATE_TENANT_SUBSCRIPTION', 'tenants', $1, $3);
      `,
      [tenant_id, user.id, JSON.stringify(tenantUpdate.rows[0])]
    ).catch(() => {})

    return NextResponse.json({
      success: true,
      message: `Tenant "${tenantUpdate.rows[0].name}" has been successfully activated for ${days} days!`,
      tenant: tenantUpdate.rows[0],
    })
  } catch (err: any) {
    console.error('Tenant activation error:', err)
    return NextResponse.json({ error: err.message || 'Tenant activation failed' }, { status: 500 })
  }
}

