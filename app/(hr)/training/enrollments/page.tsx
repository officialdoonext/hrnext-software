import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Employee Training Enrollments & Learner Progress' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Employee Training Enrollments & Learner Progress"
        description="Track individual course attendance, module milestones, quiz scores, and course completion certificates."
        breadcrumb={[{"label":"Training","href":"/training"},{"label":"Enrollments"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Active Enrolled Staff</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">96 Learners</p>
          <span className="text-[11px] text-[#6b7280]">Across all active tracks</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Average Quiz Score</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">88.4%</p>
          <span className="text-[11px] text-[#6b7280]">High retention score</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Certificates Ready</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">64 Badges</p>
          <span className="text-[11px] text-[#6b7280]">Verified credentials</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Overdue Mandatory Modules</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">2 Staff</p>
          <span className="text-[11px] text-[#6b7280]">Reminder notices dispatched</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Learner Enrollment Roster</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Employee Name & ID</th>
                <th className="py-2.5 px-3 font-semibold ">Course Title</th>
                <th className="py-2.5 px-3 font-semibold ">Enrollment Date</th>
                <th className="py-2.5 px-3 font-semibold ">Module Progress</th>
                <th className="py-2.5 px-3 font-semibold ">Quiz Score</th>
                <th className="py-2.5 px-3 font-semibold ">Expected Completion</th>
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
                <td className="py-3 px-3 text-[#374151]">AWS Cloud Architecture & Kubernetes</td>
                <td className="py-3 px-3 text-[#4b5563]">15 Oct 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">100% Completed</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">96% Score (Distinction)</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">05 Nov 2026</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Certificate
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Arjun Mehta</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1005</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">POSH & ISO 27001 Security Training</td>
                <td className="py-3 px-3 text-[#4b5563]">01 Nov 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">80% Completed</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">In Progress</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">15 Nov 2026</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="pending" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Send Reminder
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Vikram Joshi</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1014</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Enterprise Sales Strategy & CRM</td>
                <td className="py-3 px-3 text-[#4b5563]">20 Oct 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">100% Completed</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">92% Score</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">02 Nov 2026</td>
                
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
