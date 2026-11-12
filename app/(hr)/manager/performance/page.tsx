import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Team Performance Scorecards & 360 Appraisals' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Team Performance Scorecards & 360 Appraisals"
        description="Conduct annual performance evaluations, score technical competencies, and submit promotion recommendations for direct reports."
        breadcrumb={[{"label":"Manager","href":"/manager/dashboard"},{"label":"Team Performance"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Direct Reports in Review</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">4 Team Members</p>
          <span className="text-[11px] text-[#6b7280]">100% self-reviews received</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Manager Reviews Completed</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">3 Completed</p>
          <span className="text-[11px] text-[#6b7280]">1 pending calibration</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Promotions Recommended</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">1 Staff Member</p>
          <span className="text-[11px] text-[#6b7280]">Priya Sharma &rarr; Staff Lead</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Team OKR Achievement</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">94% On-Track</p>
          <span className="text-[11px] text-[#6b7280]">High team delivery velocity</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Direct Reports Q4 2026 Scorecards</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Team Member Name</th>
                <th className="py-2.5 px-3 font-semibold ">Role & Designation</th>
                <th className="py-2.5 px-3 font-semibold ">Self Rating</th>
                <th className="py-2.5 px-3 font-semibold ">Manager Rating</th>
                <th className="py-2.5 px-3 font-semibold ">360 Peer Score</th>
                <th className="py-2.5 px-3 font-semibold ">Performance Band</th>
                <th className="py-2.5 px-3 font-semibold ">Appraisal Recommendation</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Priya Sharma</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1002</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Senior Frontend Engineer</td>
                <td className="py-3 px-3 text-[#4b5563]">4.8 / 5.0</td>
                <td className="py-3 px-3 text-[#4b5563]">4.9 / 5.0</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">4.7 / 5.0</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Exceptional (Top 5%)</td>
                <td className="py-3 px-3 font-bold text-emerald-700 font-mono">Promotion to Staff Lead</td>
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Calibrate Score
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Arjun Mehta</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1005</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Lead UI/UX Designer</td>
                <td className="py-3 px-3 text-[#4b5563]">4.5 / 5.0</td>
                <td className="py-3 px-3 text-[#4b5563]">4.6 / 5.0</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">4.4 / 5.0</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Exceeds Expectations</td>
                <td className="py-3 px-3 font-bold text-emerald-700 font-mono">Merit Salary Hike (+25%)</td>
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Calibrate Score
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Sneha Patil</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1008</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">DevOps Architect</td>
                <td className="py-3 px-3 text-[#4b5563]">4.7 / 5.0</td>
                <td className="py-3 px-3 text-[#4b5563]">4.8 / 5.0</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">4.6 / 5.0</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Exceeds Expectations</td>
                <td className="py-3 px-3 font-bold text-emerald-700 font-mono">Retention Bonus</td>
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Calibrate Score
                  </Button>
                </td>
              </tr>
              <tr key="3" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Vikram Joshi</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1014</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Full-Stack Developer</td>
                <td className="py-3 px-3 text-[#4b5563]">4.1 / 5.0</td>
                <td className="py-3 px-3 text-[#4b5563]">4.0 / 5.0</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">4.2 / 5.0</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Meets Expectations</td>
                <td className="py-3 px-3 font-bold text-emerald-700 font-mono">Standard Incentive</td>
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="pending" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Submit Review
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
