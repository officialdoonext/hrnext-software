import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Unrestricted Public Routes
  const isPublicRoute =
    pathname.startsWith('/login') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/onboarding/activation-pending') ||
    pathname.startsWith('/api/auth') ||
    pathname === '/'

  // Read session cookie
  const sessionCookie =
    request.cookies.get('hrms_session')?.value ||
    request.cookies.get('demo_user_session')?.value

  // 2. Unauthenticated user handling
  if (!sessionCookie) {
    if (isPublicRoute) {
      return NextResponse.next()
    }
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // 3. Parse user session
  let user: any = null
  try {
    user = JSON.parse(sessionCookie)
  } catch {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Super Admin bypass: Super Admin has platform-level access
  if (user.role === 'super_admin') {
    if (pathname === '/login' || pathname === '/signup') {
      return NextResponse.redirect(new URL('/super-admin/dashboard', request.url))
    }
    return NextResponse.next()
  }

  // 4. TENANT ACTIVATION & EXPIRY GATEKEEPER
  // All internal software pages require:
  // a) tenant_status == 'active'
  // b) subscription_expiry_date >= TODAY
  const todayStr = new Date().toISOString().split('T')[0]
  const expiryDate = user.subscription_expiry_date
    ? new Date(user.subscription_expiry_date).toISOString().split('T')[0]
    : '1970-01-01'

  const isTenantActive = user.tenant_status === 'active'
  const isExpired = user.is_expired ?? (expiryDate < todayStr)

  const isGateBlocked = !isTenantActive || isExpired

  // If tenant is blocked (inactive or expired):
  if (isGateBlocked) {
    // Only allow access to the activation-pending screen or auth endpoints
    if (pathname.startsWith('/onboarding/activation-pending') || pathname.startsWith('/api/auth')) {
      return NextResponse.next()
    }
    // Block all other routes (/dashboard, /employees, /payroll, etc.) and redirect
    const pendingUrl = new URL('/onboarding/activation-pending', request.url)
    return NextResponse.redirect(pendingUrl)
  }

  // If tenant is ACTIVE & NOT EXPIRED, but visits activation-pending screen or login:
  if (!isGateBlocked && (pathname === '/onboarding/activation-pending' || pathname === '/login' || pathname === '/signup')) {
    const dashboardUrl = new URL('/dashboard', request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

export default proxy
