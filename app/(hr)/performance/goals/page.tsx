import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Strategic Goals & Objective Key Results (OKRs)' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Strategic Goals & Objective Key Results (OKRs)"
        description="Track company strategic pillars, department key deliverables, and individual engineer OKRs."
        breadcrumb={[{"label":"Performance","href":"/performance"},{"label":"Goals & KPIs"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Total Active Goals</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">28 OKRs</p>
          <span className="text-[11px] text-[#6b7280]">12 Company, 16 Departmental</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Goals On-Track</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">82.4%</p>
          <span className="text-[11px] text-[#6b7280]">Meeting milestone pace</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">At-Risk Key Results</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">3 Goals</p>
          <span className="text-[11px] text-[#6b7280]">Attention required</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Completed Objectives</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">8 Completed</p>
          <span className="text-[11px] text-[#6b7280]">Achieved in Q3/Q4</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Active Organizational Goals Ledger</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Goal Objective & Key Result</th>
                <th className="py-2.5 px-3 font-semibold ">Goal Level</th>
                <th className="py-2.5 px-3 font-semibold ">Assigned Owner</th>
                <th className="py-2.5 px-3 font-semibold ">Department</th>
                <th className="py-2.5 px-3 font-semibold ">Target Milestone Date</th>
                <th className="py-2.5 px-3 font-semibold ">Progress Bar</th>
                <th className="py-2.5 px-3 font-semibold ">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Migrate enterprise backend to Next.js 16 with Turbopack</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Achieve zero-downtime production deployment</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Department OKR</td>
                <td className="py-3 px-3 text-[#4b5563]">Priya Sharma</td>
                <td className="py-3 px-3 text-[#4b5563]">Engineering</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">30 Nov 2026</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">85% Progress</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Update Progress
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Maintain 99.98% API SLA across all APAC cloud clusters</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Zero P0 outages during business hours</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Company OKR</td>
                <td className="py-3 px-3 text-[#4b5563]">Sneha Patil</td>
                <td className="py-3 px-3 text-[#4b5563]">DevOps & SRE</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">31 Dec 2026</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">98% Progress</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Update Progress
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Rollout Swiss-Style design token library across all 21 HR modules</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">100% WCAG AA contrast compliance</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Individual OKR</td>
                <td className="py-3 px-3 text-[#4b5563]">Arjun Mehta</td>
                <td className="py-3 px-3 text-[#4b5563]">Product Design</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">25 Nov 2026</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">75% Progress</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Update Progress
                  </Button>
                </td>
              </tr>
              <tr key="3" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Expand enterprise enterprise SaaS client base by 20%</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Target 16 active client companies</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Company OKR</td>
                <td className="py-3 px-3 text-[#4b5563]">Vikram Joshi</td>
                <td className="py-3 px-3 text-[#4b5563]">Sales</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">31 Dec 2026</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">60% Progress</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="pending" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Update Progress
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
