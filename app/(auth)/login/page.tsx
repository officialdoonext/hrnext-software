'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Zap, Shield, Briefcase, UserCheck, Crown, Loader2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Please enter your password'),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [loadingRole, setLoadingRole] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'vinayvakati16@gmail.com',
      password: 'password123',
    },
  })

  const onSubmit = async (data: LoginForm) => {
    setError(null)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, password: data.password }),
      })

      const result = await res.json()

      if (!res.ok || result.error) {
        setError(result.error || 'Failed to sign in')
        return
      }

      router.push(result.redirectUrl || '/dashboard')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Network error occurred')
    }
  }

  const handleQuickLogin = async (role: string, email: string) => {
    setLoadingRole(role)
    setError(null)
    setValue('email', email)
    setValue('password', 'password123')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: 'password123', role }),
      })

      const result = await res.json()

      if (!res.ok || result.error) {
        setError(result.error || 'Failed to sign in')
        return
      }

      router.push(result.redirectUrl || '/dashboard')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoadingRole(null)
    }
  }

  const demoRoles = [
    {
      id: 'hr_admin',
      name: 'HR Admin',
      email: 'admin@peoplecore.io',
      portal: 'HR Admin Portal (/dashboard)',
      icon: Shield,
      color: 'bg-purple-50 text-[#5e2b9d] border-purple-200 hover:bg-purple-100',
    },
    {
      id: 'manager',
      name: 'Manager',
      email: 'manager@peoplecore.io',
      portal: 'Team Approvals (/manager)',
      icon: Briefcase,
      color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
    },
    {
      id: 'employee',
      name: 'Employee',
      email: 'employee@peoplecore.io',
      portal: 'Self-Service ESS (/my)',
      icon: UserCheck,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
    },
    {
      id: 'super_admin',
      name: 'Super Admin',
      email: 'superadmin@peoplecore.io',
      portal: 'Multi-Tenant SaaS (/super-admin)',
      icon: Crown,
      color: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
    },
  ]

  return (
    <div className="w-full max-w-md py-8">
      {/* Brand Header */}
      <div className="flex flex-col items-center mb-6">
        <div className="h-12 w-12 bg-[#5e2b9d] rounded-[10px] flex items-center justify-center mb-3 shadow-sm">
          <Zap className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-[#111827] tracking-tight">PeopleCore HRMS</h1>
        <p className="text-sm text-[#6b7280] mt-1">Enterprise Human Resource Management System</p>
      </div>

      {/* Main Login Card */}
      <div className="bg-white border border-[#e5e7eb] rounded-lg shadow-sm p-6 space-y-5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="bg-[#fef2f2] border border-[#fecaca] rounded-[6px] px-3.5 py-2.5 text-xs text-[#dc2626] flex items-center justify-between">
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-semibold text-[#374151]">
              Work Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              {...register('email')}
              className="h-10 text-sm"
            />
            {errors.email && (
              <p className="text-xs text-[#dc2626]">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-xs font-semibold text-[#374151]">
                Password
              </Label>
              <span className="text-[11px] text-[#6b7280]">
                Demo: <span className="font-mono text-[#5e2b9d]">password123</span>
              </span>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                autoComplete="current-password"
                className="h-10 text-sm pr-10"
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#374151]"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-[#dc2626]">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-10 font-medium bg-[#5e2b9d] hover:bg-[#4d2382] text-white transition-colors"
            loading={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#e5e7eb]" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-[#9ca3af] font-medium tracking-wider">
              1-Click Demo Portals
            </span>
          </div>
        </div>

        {/* 1-Click Role Login Cards */}
        <div className="grid grid-cols-2 gap-2">
          {demoRoles.map((role) => {
            const Icon = role.icon
            const isLoading = loadingRole === role.id
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => handleQuickLogin(role.id, role.email)}
                disabled={isSubmitting || loadingRole !== null}
                className={`flex flex-col items-start p-2.5 border rounded-[6px] text-left transition-all cursor-pointer ${role.color} disabled:opacity-50`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <div className="flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5" />
                    <span className="font-semibold text-xs">{role.name}</span>
                  </div>
                  {isLoading ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <ArrowRight className="h-3 w-3 opacity-60" />
                  )}
                </div>
                <span className="text-[10px] opacity-80 truncate w-full">{role.email}</span>
              </button>
            )
          })}
        </div>

        <div className="p-2.5 bg-[#f9fafb] border border-[#e5e7eb] rounded-[6px] text-[11px] text-[#4b5563] space-y-0.5">
          <p className="font-semibold text-[#111827]">💡 Quick Start Tip:</p>
          <p>
            Click any role above to instantly test that specific portal, or keep your email and click <strong>Sign In</strong>.
          </p>
        </div>
      </div>

      <p className="text-center text-xs text-[#9ca3af] mt-6">
        &copy; 2026 PeopleCore HRMS. All rights reserved.
      </p>
    </div>
  )
}
