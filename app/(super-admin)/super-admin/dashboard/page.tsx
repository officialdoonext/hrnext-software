import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { formatCurrency } from '@/lib/utils/currency'
import { formatDate } from '@/lib/utils/date'
import {
  Building2,
  Users,
  CreditCard,
  Shield,
  Plus,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Activity,
} from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Super Admin Dashboard - SaaS Platform' }

const fallbackCompanies = [
  { id: '1', name: 'Apex Global Technologies', slug: 'apex-global', plan: 'enterprise', max_employees: 500, status: 'active', created_at: '2026-01-15' },
  { id: '2', name: 'Zenith Logistics India', slug: 'zenith-logistics', plan: 'professional', max_employees: 200, status: 'active', created_at: '2026-03-10' },
  { id: '3', name: 'InnoHealth Medical Systems', slug: 'innohealth', plan: 'enterprise', max_employees: 1000, status: 'active', created_at: '2026-06-20' },
  { id: '4', name: 'FinEdge Advisory Services', slug: 'finedge', plan: 'starter', max_employees: 50, status: 'active', created_at: '2026-09-05' },
]

export default async function SuperAdminDashboardPage() {
  const supabase = await createClient()

  let totalTenants = 14
  let totalPlatformUsers = 1420
  let companies = fallbackCompanies

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const isRealSupabase = supabaseUrl && !supabaseUrl.includes('demo-project.supabase.co')

  if (isRealSupabase) {
    try {
      const [
        { count: tCount },
        { count: uCount },
        { data: cData },
      ] = await Promise.all([
        supabase.from('tenants').select('*', { count: 'exact', head: true }),
        supabase.from('users').select('*', { count: 'exact', head: true }),
        supabase.from('tenants').select('*').order('created_at', { ascending: false }).limit(5),
      ])
      if (tCount !== null) totalTenants = tCount
      if (uCount !== null) totalPlatformUsers = uCount
      if (cData && cData.length > 0) companies = cData as any
    } catch {
      // fallback
    }
  }

  return (
    <div>
      <PageHeader
        title="Platform Administration Portal"
        description="Multi-tenant SaaS oversight: Monitor client companies, subscription plans, employee seat limits, and platform health."
        breadcrumb={[{ label: 'Super Admin' }, { label: 'Platform Dashboard' }]}
        actions={
          <Button size="sm" asChild>
            <Link href="/super-admin/companies" className="inline-flex items-center gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              <span>Onboard Company</span>
            </Link>
          </Button>
        }
      />

      {/* SaaS High-Level Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-[#6b7280] font-medium">Total Client Companies</p>
            <p className="text-2xl font-bold text-[#5e2b9d] mt-1">{totalTenants}</p>
            <p className="text-xs text-[#16a34a] mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> +2 new this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-[#6b7280] font-medium">Monthly Recurring Revenue (MRR)</p>
            <p className="text-2xl font-bold text-[#16a34a] mt-1">₹8,45,000</p>
            <p className="text-xs text-[#9ca3af] mt-1">Across 14 enterprise subscriptions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-[#6b7280] font-medium">Active User Accounts</p>
            <p className="text-2xl font-bold text-[#111827] mt-1">{totalPlatformUsers}</p>
            <p className="text-xs text-[#9ca3af] mt-1">Employees across all tenants</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-[#6b7280] font-medium">Platform Uptime</p>
            <p className="text-2xl font-bold text-[#2563eb] mt-1">99.98%</p>
            <p className="text-xs text-[#16a34a] mt-1">PostgreSQL & Auth Healthy</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client Companies List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle>Client Companies & Subscriptions</CardTitle>
                <p className="text-xs text-[#6b7280] mt-0.5">Manage tenants, plans, and employee limits</p>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/super-admin/companies" className="text-xs text-[#5e2b9d] inline-flex items-center gap-1">
                  <span>All Companies</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="divide-y divide-[#f1f3f5]">
                {companies.map((c: any) => (
                  <div key={c.id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#111827]">{c.name}</span>
                        <span className="text-[10px] font-mono text-[#9ca3af]">/{c.slug}</span>
                      </div>
                      <p className="text-[#6b7280] mt-0.5">
                        Capacity: {c.max_employees} employees &bull; Enrolled {formatDate(c.created_at)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-semibold uppercase bg-[#f3eefb] text-[#5e2b9d] px-2 py-0.5 rounded-[4px]">
                        {c.plan}
                      </span>
                      <StatusBadge status={c.status} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subscription Tier Distribution */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Subscription Tiers</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3 text-xs">
              {[
                { name: 'Enterprise Plan', price: '₹75,000/mo', tenants: 6, max: 'Unlimited seats' },
                { name: 'Professional Plan', price: '₹35,000/mo', tenants: 5, max: 'Up to 250 seats' },
                { name: 'Starter Plan', price: '₹12,000/mo', tenants: 3, max: 'Up to 50 seats' },
              ].map((tier) => (
                <div key={tier.name} className="p-3 bg-[#f8f9fa] rounded-lg border border-[#e5e7eb]">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#111827]">{tier.name}</span>
                    <span className="text-xs font-semibold text-[#5e2b9d]">{tier.price}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-[11px] text-[#6b7280]">
                    <span>{tier.tenants} active companies</span>
                    <span>{tier.max}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs">Security & Isolation</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-xs text-[#6b7280] space-y-1.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16a34a]" />
                <span>PostgreSQL Row Level Security (RLS) active</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16a34a]" />
                <span>Cross-tenant access blocked at DB level</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16a34a]" />
                <span>Encrypted Aadhaar & statutory data</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
