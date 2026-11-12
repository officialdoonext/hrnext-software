import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'SaaS Feature Flags & Module Entitlements' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="SaaS Feature Flags & Module Entitlements"
        description="Toggle platform modules (Payroll, Recruitment, 360 Appraisals, Timesheets) per client company subscription."
        breadcrumb={[{"label":"Super Admin","href":"/super-admin/dashboard"},{"label":"Module Management"}]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
              <Download className="h-3.5 w-3.5" /> Export Report
            </Button>
            <Button size="sm" className="h-8 gap-1 text-xs bg-[#5e2b9d] hover:bg-[#4d2382] text-white">
              <Plus className="h-3.5 w-3.5" /> Action / Add
            </Button>
          </div>
        }
      />

      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Core HR & Employee Master</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">Enabled All (14/14)</p>
          <span className="text-[11px] text-[#6b7280]">Default foundational tier</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Automated Payroll Engine</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">12 / 14 Tenants</p>
          <span className="text-[11px] text-[#6b7280]">Premium module add-on</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Talent Acquisition Pipeline</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">10 / 14 Tenants</p>
          <span className="text-[11px] text-[#6b7280]">Enterprise tier feature</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Project Timesheets & Billing</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">8 / 14 Tenants</p>
          <span className="text-[11px] text-[#6b7280]">Professional services add-on</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Tenant Feature Entitlement Matrix</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Client Company</th>
                <th className="py-2.5 px-3 font-semibold ">Subscription Plan</th>
                <th className="py-2.5 px-3 font-semibold ">Payroll Module</th>
                <th className="py-2.5 px-3 font-semibold ">Recruitment ATS</th>
                <th className="py-2.5 px-3 font-semibold ">Timesheets</th>
                <th className="py-2.5 px-3 font-semibold ">Performance 360</th>
                <th className="py-2.5 px-3 font-semibold ">Hardware Assets</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Apex Global Technologies</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Tenant ID: 0001</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Enterprise Tier</td>
                <td className="py-3 px-3 text-[#4b5563]">Enabled</td>
                <td className="py-3 px-3 text-[#4b5563]">Enabled</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Enabled</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Enabled</td>
                <td className="py-3 px-3 font-bold text-emerald-700 font-mono">Enabled</td>
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Edit Feature Flags
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Zenith Logistics India</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Tenant ID: 0002</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Professional Tier</td>
                <td className="py-3 px-3 text-[#4b5563]">Enabled</td>
                <td className="py-3 px-3 text-[#4b5563]">Enabled</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Disabled</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Enabled</td>
                <td className="py-3 px-3 font-bold text-emerald-700 font-mono">Disabled</td>
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Edit Feature Flags
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">FinEdge Advisory Services</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Tenant ID: 0004</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Starter Tier</td>
                <td className="py-3 px-3 text-[#4b5563]">Disabled</td>
                <td className="py-3 px-3 text-[#4b5563]">Disabled</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Disabled</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Disabled</td>
                <td className="py-3 px-3 font-bold text-emerald-700 font-mono">Disabled</td>
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="pending" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Upgrade Plan
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
