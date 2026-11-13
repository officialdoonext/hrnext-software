'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Building2, User, Mail, Lock, Phone, MapPin, Eye, EyeOff, Loader2, ArrowRight, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signupSchema = z.object({
  organization_name: z.string().min(2, 'Organization name must be at least 2 characters'),
  admin_name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid work email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  mobile_number: z.string().regex(/^[6-9][0-9]{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  city: z.string().min(2, 'City is required'),
  address: z.string().min(5, 'Physical address must be at least 5 characters'),
})

type SignupForm = z.infer<typeof signupSchema>

export default function SignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      organization_name: '',
      admin_name: '',
      email: '',
      password: '',
      mobile_number: '',
      city: '',
      address: '',
    },
  })

  const onSubmit = async (data: SignupForm) => {
    setError(null)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!res.ok || result.error) {
        setError(result.error || 'Failed to register organization')
        return
      }

      // Mandatory redirect to onboarding activation pending page
      router.push(result.redirectUrl || '/onboarding/activation-pending')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Network error occurred during registration')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8f5fc] via-white to-[#f0e8f7] p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-purple-100 p-6 sm:p-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#5e2b9d] text-white shadow-lg shadow-purple-200 mb-4">
            <Building2 className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Register Your Organization
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Create your multi-tenant PeopleCore HRMS instance with full enterprise lifecycle tools.
          </p>
        </div>

        {/* Global Error Banner */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-3">
            <span className="font-semibold">Registration Error:</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
          {/* Organization Name */}
          <div className="space-y-1.5">
            <Label htmlFor="organization_name" className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Organization / Company Name <span className="text-rose-500">*</span>
            </Label>
            <div className="relative">
              <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="organization_name"
                placeholder="Acme Technologies Pvt Ltd"
                className="pl-10 h-11 rounded-xl border-gray-200 focus:border-[#5e2b9d] focus:ring-[#5e2b9d]"
                {...register('organization_name')}
              />
            </div>
            {errors.organization_name && (
              <p className="text-xs text-rose-500 mt-1">{errors.organization_name.message}</p>
            )}
          </div>

          {/* Admin Full Name & Work Email Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="admin_name" className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Admin Full Name <span className="text-rose-500">*</span>
              </Label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="admin_name"
                  placeholder="Vinay Vakati"
                  className="pl-10 h-11 rounded-xl border-gray-200 focus:border-[#5e2b9d] focus:ring-[#5e2b9d]"
                  {...register('admin_name')}
                />
              </div>
              {errors.admin_name && (
                <p className="text-xs text-rose-500 mt-1">{errors.admin_name.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Work Email <span className="text-rose-500">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@acme.com"
                  className="pl-10 h-11 rounded-xl border-gray-200 focus:border-[#5e2b9d] focus:ring-[#5e2b9d]"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-rose-500 mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Password & Mobile Number Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Create Password <span className="text-rose-500">*</span>
              </Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min 8 characters"
                  className="pl-10 pr-10 h-11 rounded-xl border-gray-200 focus:border-[#5e2b9d] focus:ring-[#5e2b9d]"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-rose-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="mobile_number" className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Mobile Number <span className="text-rose-500">*</span>
              </Label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="mobile_number"
                  placeholder="9876543210"
                  className="pl-10 h-11 rounded-xl border-gray-200 focus:border-[#5e2b9d] focus:ring-[#5e2b9d]"
                  {...register('mobile_number')}
                />
              </div>
              {errors.mobile_number && (
                <p className="text-xs text-rose-500 mt-1">{errors.mobile_number.message}</p>
              )}
            </div>
          </div>

          {/* City & Physical Address */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5 sm:col-span-1">
              <Label htmlFor="city" className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                City <span className="text-rose-500">*</span>
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="city"
                  placeholder="Hyderabad"
                  className="pl-10 h-11 rounded-xl border-gray-200 focus:border-[#5e2b9d] focus:ring-[#5e2b9d]"
                  {...register('city')}
                />
              </div>
              {errors.city && (
                <p className="text-xs text-rose-500 mt-1">{errors.city.message}</p>
              )}
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="address" className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Office Address <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="address"
                placeholder="Plot 42, HITEC City, Madhapur"
                className="h-11 rounded-xl border-gray-200 focus:border-[#5e2b9d] focus:ring-[#5e2b9d]"
                {...register('address')}
              />
              {errors.address && (
                <p className="text-xs text-rose-500 mt-1">{errors.address.message}</p>
              )}
            </div>
          </div>

          {/* Security & Multi-Tenant Notice */}
          <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-100 flex items-start gap-2.5 text-xs text-purple-900">
            <ShieldCheck className="w-4 h-4 text-[#5e2b9d] shrink-0 mt-0.5" />
            <span>
              All data is provisioned in an isolated tenant schema with automated daily backups on Neon PostgreSQL. Newly registered accounts start in inactive status pending admin activation.
            </span>
          </div>

          {/* Submit Action */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 rounded-xl bg-[#5e2b9d] hover:bg-[#4c2380] text-white font-semibold shadow-lg shadow-purple-200 transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Registering Organization on Neon...</span>
              </>
            ) : (
              <>
                <span>Complete Registration</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>

        {/* Existing Account Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Already registered?{' '}
          <Link href="/login" className="text-[#5e2b9d] font-semibold hover:underline">
            Sign in to your account
          </Link>
        </div>
      </div>
    </div>
  )
}

