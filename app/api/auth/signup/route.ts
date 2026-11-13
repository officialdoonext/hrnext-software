import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { query } from '@/lib/neon/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      organization_name,
      admin_name,
      email,
      password,
      mobile_number,
      city,
      address,
    } = body

    // 1. Validate required inputs
    if (!organization_name || !admin_name || !email || !password || !mobile_number || !city || !address) {
      return NextResponse.json(
        { error: 'All fields are required (Organization name, Full name, Email, Password, Mobile, City, Address)' },
        { status: 400 }
      )
    }

    const cleanEmail = String(email).trim().toLowerCase()
    const cleanOrgName = String(organization_name).trim()

    // 2. Check if user email already exists
    const existingUser = await query('SELECT id FROM users WHERE email = $1 LIMIT 1', [cleanEmail])
    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: 'An account with this email address already exists. Please sign in instead.' },
        { status: 409 }
      )
    }

    // 3. Generate unique tenant slug
    const baseSlug = cleanOrgName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'company'
    const randomSuffix = Math.floor(1000 + Math.random() * 9000)
    const slug = `${baseSlug}-${randomSuffix}`

    // 4. Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // 5. Create Tenant with inactive status and expiry date as YESTERDAY
    const tenantResult = await query(
      `
      INSERT INTO tenants (
        name,
        slug,
        plan,
        status,
        subscription_expiry_date,
        mobile_number,
        city,
        address
      )
      VALUES (
        $1,
        $2,
        'trial',
        'inactive',
        (CURRENT_DATE - INTERVAL '1 day')::DATE,
        $3,
        $4,
        $5
      )
      RETURNING id, name, slug, status, subscription_expiry_date;
      `,
      [cleanOrgName, slug, String(mobile_number).trim(), String(city).trim(), String(address).trim()]
    )

    const newTenant = tenantResult.rows[0]

    // 6. Create default Company record for the tenant
    await query(
      `
      INSERT INTO companies (
        tenant_id,
        name,
        legal_name,
        email,
        phone,
        city,
        address
      )
      VALUES ($1, $2, $2, $3, $4, $5, $6);
      `,
      [
        newTenant.id,
        cleanOrgName,
        cleanEmail,
        String(mobile_number).trim(),
        String(city).trim(),
        JSON.stringify({ address: String(address).trim(), city: String(city).trim() }),
      ]
    )

    // 7. Create User record with role 'company_admin' and status 'inactive'
    const userResult = await query(
      `
      INSERT INTO users (
        tenant_id,
        email,
        password_hash,
        full_name,
        phone,
        role,
        status
      )
      VALUES ($1, $2, $3, $4, $5, 'company_admin', 'inactive')
      RETURNING id, email, full_name, role, status;
      `,
      [newTenant.id, cleanEmail, passwordHash, String(admin_name).trim(), String(mobile_number).trim()]
    )

    const newUser = userResult.rows[0]

    // 8. Establish session cookie containing tenant status & expiry
    const sessionData = {
      id: newUser.id,
      email: newUser.email,
      full_name: newUser.full_name,
      role: newUser.role,
      tenant_id: newTenant.id,
      tenant_name: newTenant.name,
      tenant_status: newTenant.status,
      subscription_expiry_date: newTenant.subscription_expiry_date,
    }

    const cookieStore = await cookies()
    cookieStore.set('hrms_session', JSON.stringify(sessionData), {
      path: '/',
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax',
    })

    // Also maintain backwards compatibility with existing layout cookie
    cookieStore.set('demo_user_session', JSON.stringify(sessionData), {
      path: '/',
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax',
    })

    // 9. Return response with mandatory redirect to /onboarding/activation-pending
    return NextResponse.json({
      success: true,
      message: 'Organization registered successfully! Account is pending activation.',
      redirectUrl: '/onboarding/activation-pending',
      tenant: newTenant,
      user: newUser,
    })
  } catch (err: any) {
    console.error('Signup error:', err)
    return NextResponse.json({ error: err.message || 'Registration failed' }, { status: 500 })
  }
}

