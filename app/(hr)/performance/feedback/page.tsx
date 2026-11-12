import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: '360-Degree Peer Feedback & Multi-Rater Surveys' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="360-Degree Peer Feedback & Multi-Rater Surveys"
        description="Confidential peer reviews, upward feedback for managers, and cross-functional project collaboration scoring."
        breadcrumb={[{"label":"Performance","href":"/performance"},{"label":"360 Feedback"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Feedback Surveys Sent</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">150 Requests</p>
          <span className="text-[11px] text-[#6b7280]">3 per employee</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Completed Submissions</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">138 Received</p>
          <span className="text-[11px] text-[#6b7280]">92% completion rate</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Average Core Rating</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">4.5 / 5.0</p>
          <span className="text-[11px] text-[#6b7280]">Across leadership & teamwork</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Peer Review Integrity</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">100% Anonymized</p>
          <span className="text-[11px] text-[#6b7280]">HR calibrated</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Multi-Rater Feedback Roster</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Reviewee Name</th>
                <th className="py-2.5 px-3 font-semibold ">Evaluator Role</th>
                <th className="py-2.5 px-3 font-semibold ">Relationship</th>
                <th className="py-2.5 px-3 font-semibold ">Competency Focus</th>
                <th className="py-2.5 px-3 font-semibold ">Submission Date</th>
                <th className="py-2.5 px-3 font-semibold ">Core Score</th>
                <th className="py-2.5 px-3 font-semibold ">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Priya Sharma</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1002</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Peer Senior Engineer</td>
                <td className="py-3 px-3 text-[#4b5563]">Cross-Functional Peer</td>
                <td className="py-3 px-3 text-[#4b5563]">Technical Execution & Architecture Mentorship</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">08 Nov 2026</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">4.9 / 5.0</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Feedback
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Arjun Mehta</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1005</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Frontend Engineer</td>
                <td className="py-3 px-3 text-[#4b5563]">Collaborating Developer</td>
                <td className="py-3 px-3 text-[#4b5563]">Design System Documentation & Speed</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">07 Nov 2026</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">4.6 / 5.0</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Feedback
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Rajesh Kumar</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">VP Engineering</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Engineering Team</td>
                <td className="py-3 px-3 text-[#4b5563]">Upward Feedback to Manager</td>
                <td className="py-3 px-3 text-[#4b5563]">Empowerment, Psychological Safety & Clarity</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">06 Nov 2026</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">4.8 / 5.0</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Feedback
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
