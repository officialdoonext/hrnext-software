import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'My Weekly Timesheets & Time Allocations' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Weekly Timesheets & Time Allocations"
        description="Log weekly project time entries, record billable client hours, and monitor submission approval status."
        breadcrumb={[{"label":"Employee Portal","href":"/my/dashboard"},{"label":"My Timesheets"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Hours Logged This Week</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">38.5 Hours</p>
          <span className="text-[11px] text-[#6b7280]">Target: 40.0 hours</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Billable Client Ratio</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">88% Billable</p>
          <span className="text-[11px] text-[#6b7280]">34.0 hours client work</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Weekly Status</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">Draft</p>
          <span className="text-[11px] text-[#6b7280]">Due Sunday by midnight</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Avg Monthly Hours</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">168.0 Hours</p>
          <span className="text-[11px] text-[#6b7280]">Consistent high delivery</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Weekly Work Log (03 Nov – 09 Nov 2026)</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Project & Task Description</th>
                <th className="py-2.5 px-3 font-semibold ">Client Account</th>
                <th className="py-2.5 px-3 font-semibold ">Mon</th>
                <th className="py-2.5 px-3 font-semibold ">Tue</th>
                <th className="py-2.5 px-3 font-semibold ">Wed</th>
                <th className="py-2.5 px-3 font-semibold ">Thu</th>
                <th className="py-2.5 px-3 font-semibold ">Fri</th>
                <th className="py-2.5 px-3 font-semibold ">Weekly Total</th>
                <th className="py-2.5 px-3 font-semibold ">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Fintech Core Payment Gateway Integration</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">TSK-201 • Webhook Handlers</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Apex Global Financial</td>
                <td className="py-3 px-3 text-[#4b5563]">8.0h</td>
                <td className="py-3 px-3 text-[#4b5563]">8.0h</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">7.5h</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">8.0h</td>
                <td className="py-3 px-3 font-bold text-emerald-700 font-mono">31.5 Hours</td>
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Edit
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Design System & Component Library</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">TSK-104 • Swiss Tokens</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Internal Platform R&D</td>
                <td className="py-3 px-3 text-[#4b5563]">1.0h</td>
                <td className="py-3 px-3 text-[#4b5563]">0.0h</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">1.0h</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">1.0h</td>
                <td className="py-3 px-3 font-bold text-emerald-700 font-mono">3.0 Hours</td>
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Edit
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Architecture Code Reviews</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">TSK-088 • Team PR Reviews</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Engineering Team</td>
                <td className="py-3 px-3 text-[#4b5563]">0.5h</td>
                <td className="py-3 px-3 text-[#4b5563]">1.0h</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">1.0h</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">1.5h</td>
                <td className="py-3 px-3 font-bold text-emerald-700 font-mono">4.0 Hours</td>
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Edit
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
