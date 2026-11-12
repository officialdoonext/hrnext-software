import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'My Performance Goals & Strategic OKRs' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Performance Goals & Strategic OKRs"
        description="Track assigned individual objectives, update percentage progress on key results, and submit quarterly milestones."
        breadcrumb={[{"label":"Employee Portal","href":"/my/dashboard"},{"label":"My Goals"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Active Assigned OKRs</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">4 Key Results</p>
          <span className="text-[11px] text-[#6b7280]">Across Q4 2026</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Overall Progress</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">82.5%</p>
          <span className="text-[11px] text-[#6b7280]">Ahead of milestone pace</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Completed Objectives</span>
          <p className="text-2xl font-bold text-emerald-700 mt-1">1 Goal Done</p>
          <span className="text-[11px] text-[#6b7280]">Architectural documentation</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Quarterly Due Date</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">31 Dec 2026</p>
          <span className="text-[11px] text-[#6b7280]">Annual calibration deadline</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">My Active Objectives & Key Results</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Objective Title & Measurable Target</th>
                <th className="py-2.5 px-3 font-semibold ">Goal Level</th>
                <th className="py-2.5 px-3 font-semibold ">Target Date</th>
                <th className="py-2.5 px-3 font-semibold ">Current Progress</th>
                <th className="py-2.5 px-3 font-semibold ">Manager Feedback</th>
                <th className="py-2.5 px-3 font-semibold ">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Migrate core payment gateway to Next.js 16 with zero downtime</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">100% test coverage and load tested</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Department Goal</td>
                <td className="py-3 px-3 text-[#4b5563]">30 Nov 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">85% Progress</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Great velocity on API routing</td>
                <td className="py-3 px-3 text-[#111827] font-semibold"></td>
                
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
                  <p className="font-semibold text-xs text-[#111827]">Implement Swiss-style design tokens across all 21 HR modules</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Clean borders and minimal shadows</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Individual Goal</td>
                <td className="py-3 px-3 text-[#4b5563]">25 Nov 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">75% Progress</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Tokens look crisp and consistent</td>
                <td className="py-3 px-3 text-[#111827] font-semibold"></td>
                
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
                  <p className="font-semibold text-xs text-[#111827]">Complete AWS Certified Solutions Architect Certification</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Score &gt; 850 / 1000</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Learning Goal</td>
                <td className="py-3 px-3 text-[#4b5563]">25 Oct 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">100% (Achieved)</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Completed with 892 score!</td>
                <td className="py-3 px-3 text-[#111827] font-semibold"></td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Certificate
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
