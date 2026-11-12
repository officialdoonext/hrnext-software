import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Interview Scheduling & Candidate Evaluations' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Interview Scheduling & Candidate Evaluations"
        description="Coordinate interview panels, conduct technical evaluations, and submit candidate feedback scorecards."
        breadcrumb={[{"label":"Recruitment","href":"/recruitment"},{"label":"Interviews"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Interviews This Week</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">18 Sessions</p>
          <span className="text-[11px] text-[#6b7280]">Across 6 open requisitions</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Scheduled Today</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">4 Rounds</p>
          <span className="text-[11px] text-[#6b7280]">Starting from 02:00 PM IST</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Average Evaluation Score</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">4.4 / 5.0</p>
          <span className="text-[11px] text-[#6b7280]">+0.3 vs last month</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Offer Conversion Rate</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">68%</p>
          <span className="text-[11px] text-[#6b7280]">Final round candidates</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Scheduled & Completed Candidate Interviews</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Candidate Name & ID</th>
                <th className="py-2.5 px-3 font-semibold ">Target Position</th>
                <th className="py-2.5 px-3 font-semibold ">Assigned Interviewer</th>
                <th className="py-2.5 px-3 font-semibold ">Round & Evaluation Mode</th>
                <th className="py-2.5 px-3 font-semibold ">Scheduled Time</th>
                <th className="py-2.5 px-3 font-semibold ">Score</th>
                <th className="py-2.5 px-3 font-semibold ">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Priya Sharma</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">APP-2026-104</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Staff Frontend Lead</td>
                <td className="py-3 px-3 text-[#4b5563]">Rajesh Kumar (VP Eng)</td>
                <td className="py-3 px-3 text-[#4b5563]">System Architecture (Google Meet)</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Today, 03:00 PM</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">4.8 / 5.0</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Join Meeting
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Ankit Verma</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">APP-2026-098</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Backend Go Engineer</td>
                <td className="py-3 px-3 text-[#4b5563]">Sneha Patil (DevOps Lead)</td>
                <td className="py-3 px-3 text-[#4b5563]">Live Coding & Algorithms (Zoom)</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Today, 05:00 PM</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">4.2 / 5.0</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="pending" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Submit Feedback
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Divya Nair</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">APP-2026-112</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Lead UI/UX Designer</td>
                <td className="py-3 px-3 text-[#4b5563]">Arjun Mehta (Design Head)</td>
                <td className="py-3 px-3 text-[#4b5563]">Portfolio Critique (Bangalore Office)</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Tomorrow, 11:30 AM</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">4.6 / 5.0</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Dossier
                  </Button>
                </td>
              </tr>
              <tr key="3" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Rohan Kulkarni</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">APP-2026-089</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">DevOps & SRE Engineer</td>
                <td className="py-3 px-3 text-[#4b5563]">Sneha Patil (DevOps Lead)</td>
                <td className="py-3 px-3 text-[#4b5563]">Kubernetes & Linux Deepdive</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Yesterday, 02:00 PM</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">3.4 / 5.0</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="rejected" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Notes
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
