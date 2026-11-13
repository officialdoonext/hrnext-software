'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import {
  Clock,
  ShieldAlert,
  Building2,
  Calendar,
  AlertTriangle,
  RefreshCw,
  LogOut,
  Mail,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ActivationPendingPage() {
  const router = useRouter()
  const [checking, setChecking] = React.useState(false)
  const [session, setSession] = React.useState<any>(null)
  const [message, setMessage] = React.useState<string | null>(null)

  React.useEffect(() => {
    // Read session from cookie or API
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setSession(data.user)
          // If tenant has already been activated, immediately redirect to dashboard
          if (data.user.tenant_status === 'active' && !data.user.is_expired) {
            router.push('/dashboard')
          }
        }
      })
      .catch(() => {})
  }, [router])

  const handleCheckStatus = async () => {
    setChecking(true)
    setMessage(null)
    try {
      const res = await fetch('/api/auth/me?refresh=true')
      const data = await res.json()

      if (data.user) {
        setSession(data.user)
        if (data.user.tenant_status === 'active' && !data.user.is_expired) {
          setMessage('Account is now active! Redirecting to your dashboard...')
          setTimeout(() => {
            router.push('/dashboard')
          }, 1500)
          return
        }
      }
      setMessage('Account is still pending activation. Please contact the Super Admin.')
    } catch {
      setMessage('Could not verify status at this moment. Please retry.')
    } finally {
      setChecking(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f5fc] via-white to-[#f0e8f7] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-purple-100 p-6 sm:p-10">
        {/* Status Icon Banner */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 shadow-md mb-4">
            <Clock className="w-8 h-8 animate-pulse" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Account Pending Activation
          </h1>
          <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
            Your organization has been provisioned on Neon PostgreSQL. Internal software access is restricted until activation.
          </p>
        </div>

        {/* Tenant Metadata Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-5 h-5 text-[#5e2b9d]" />
              <span className="text-sm font-semibold text-gray-900">
                {session?.tenant_name || 'Your Organization'}
              </span>
            </div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
              Status: Inactive
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-600 pt-1">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>Subscription Expiry: <strong className="text-rose-600 font-semibold">Expired (Yesterday)</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-gray-400" />
              <span>Administrator: <strong>{session?.email || 'admin'}</strong></span>
            </div>
          </div>
        </div>

        {/* Access Restriction Notice */}
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 mb-6 text-xs text-amber-900 space-y-2">
          <div className="flex items-center gap-2 font-semibold text-amber-800">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>URL Gatekeeper Policy Enforced</span>
          </div>
          <p className="leading-relaxed">
            By system rule, all new registrations default to an inactive status and an expired subscription date. Software pages (<strong>/dashboard</strong>, <strong>/employees</strong>, <strong>/payroll</strong>, <strong>/attendance</strong>) are strictly blocked at the middleware level.
          </p>
          <p className="leading-relaxed font-medium">
            To unlock the system, the Super Administrator must verify your organization and activate your subscription period from the SaaS Super Admin Portal.
          </p>
        </div>

        {message && (
          <div className="mb-6 p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#5e2b9d] shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Button
            onClick={handleCheckStatus}
            disabled={checking}
            className="w-full sm:flex-1 h-11 rounded-xl bg-[#5e2b9d] hover:bg-[#4c2380] text-white font-medium flex items-center justify-center gap-2 shadow-md shadow-purple-100"
          >
            <RefreshCw className={`w-4 h-4 ${checking ? 'animate-spin' : ''}`} />
            <span>{checking ? 'Checking Status...' : 'Check Activation Status'}</span>
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto h-11 rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2"
          >
            <a href="mailto:superadmin@peoplecore.io?subject=Requesting%20PeopleCore%20Tenant%20Activation">
              <Mail className="w-4 h-4 text-gray-500" />
              <span>Contact Support</span>
            </a>
          </Button>

          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full sm:w-auto h-11 rounded-xl text-gray-500 hover:text-rose-600 hover:bg-rose-50 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

