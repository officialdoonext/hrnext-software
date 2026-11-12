import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Platform SaaS Health & Revenue Analytics' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Platform SaaS Health & Revenue Analytics"
        description="Platform financial metrics, multi-tenant database capacity, active sessions, and client retention."
        breadcrumb={[{"label":"Super Admin","href":"/super-admin/dashboard"},{"label":"Platform Reports"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Total Platform ARR</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">₹1.01 Crore</p>
          <span className="text-[11px] text-[#6b7280]">Annualized run rate</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Average Revenue Per Tenant</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">₹72,400 / mo</p>
          <span className="text-[11px] text-[#6b7280]">High ACV enterprise mix</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Database Storage Consumed</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">42.8 GB / 500 GB</p>
          <span className="text-[11px] text-[#6b7280]">PostgreSQL multi-tenant schema</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">System API SLA</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">99.98% Uptime</p>
          <span className="text-[11px] text-[#6b7280]">Zero major incidents in 90 days</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Tenant Usage & Storage Consumption</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Tenant Company Name</th>
                <th className="py-2.5 px-3 font-semibold ">Active Users</th>
                <th className="py-2.5 px-3 font-semibold ">Storage Used</th>
                <th className="py-2.5 px-3 font-semibold ">API Calls (30d)</th>
                <th className="py-2.5 px-3 font-semibold ">Avg Response Time</th>
                <th className="py-2.5 px-3 font-semibold ">Database Region</th>
                <th className="py-2.5 px-3 font-semibold ">Tenant Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Apex Global Technologies</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">apex-global</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">442 Active</td>
                <td className="py-3 px-3 text-[#4b5563]">14.2 GB</td>
                <td className="py-3 px-3 text-[#4b5563]">1,420,000 requests</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">42 ms</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">ap-south-1 (Mumbai)</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Tenant Diagnostics
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">InnoHealth Medical Systems</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">innohealth</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">840 Active</td>
                <td className="py-3 px-3 text-[#4b5563]">22.8 GB</td>
                <td className="py-3 px-3 text-[#4b5563]">2,890,000 requests</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">38 ms</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">ap-south-1 (Mumbai)</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Tenant Diagnostics
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Zenith Logistics India</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">zenith-logistics</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">198 Active</td>
                <td className="py-3 px-3 text-[#4b5563]">4.8 GB</td>
                <td className="py-3 px-3 text-[#4b5563]">680,000 requests</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">45 ms</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">ap-south-1 (Mumbai)</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Tenant Diagnostics
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
