import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Performance Appraisal Cycles & Milestones' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Performance Appraisal Cycles & Milestones"
        description="Establish review periods, self-appraisal submission windows, manager calibration sessions, and appraisal lock dates."
        breadcrumb={[{"label":"Performance","href":"/performance"},{"label":"Cycles"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Active Review Cycle</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">Q4 2026 Annual</p>
          <span className="text-[11px] text-[#6b7280]">Closes 31 Dec 2026</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Self-Appraisals Submitted</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">78% Complete</p>
          <span className="text-[11px] text-[#6b7280]">39 / 50 employees</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Manager Scorecards Pending</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">11 Reviews</p>
          <span className="text-[11px] text-[#6b7280]">Target deadline: 20 Nov</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Calibrations Completed</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">2 Departments</p>
          <span className="text-[11px] text-[#6b7280]">Engineering & Marketing</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Annual & Quarterly Appraisal Cycles</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Cycle Name & Year</th>
                <th className="py-2.5 px-3 font-semibold ">Scope / Target Audience</th>
                <th className="py-2.5 px-3 font-semibold ">Self-Review Window</th>
                <th className="py-2.5 px-3 font-semibold ">Manager Review Window</th>
                <th className="py-2.5 px-3 font-semibold ">Committee Calibration</th>
                <th className="py-2.5 px-3 font-semibold ">Completion %</th>
                <th className="py-2.5 px-3 font-semibold ">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Q4 2026 Annual Performance Review</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">CYC-2026-Q4</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">All Confirmed Employees</td>
                <td className="py-3 px-3 text-[#4b5563]">01 Nov – 15 Nov 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">16 Nov – 30 Nov 2026</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">01 Dec – 10 Dec 2026</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">78% Completed</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Manage Cycle
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Q2 2026 Mid-Year Check-In</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">CYC-2026-Q2</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Engineering & Design Leads</td>
                <td className="py-3 px-3 text-[#4b5563]">01 Jun – 15 Jun 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">16 Jun – 30 Jun 2026</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Completed 05 Jul 2026</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">100% Completed</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Results
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Q1 2027 Strategic Goal Alignment</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">CYC-2027-Q1</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Company-wide OKRs</td>
                <td className="py-3 px-3 text-[#4b5563]">01 Jan – 15 Jan 2027</td>
                <td className="py-3 px-3 text-[#4b5563]">Upcoming</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Upcoming</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">0% (Drafting)</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="pending" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Configure Cycle
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
