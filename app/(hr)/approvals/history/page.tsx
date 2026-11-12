import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Central Approvals History & Decision Trail' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Central Approvals History & Decision Trail"
        description="Audit trail of historical decisions across leave applications, expense reimbursements, punch corrections, and resignations."
        breadcrumb={[{"label":"Approvals","href":"/approvals/pending"},{"label":"History"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Total Processed Decisions</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">348 Requests</p>
          <span className="text-[11px] text-[#6b7280]">Full fiscal year 2026</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Overall Approval Rate</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">94.2%</p>
          <span className="text-[11px] text-[#6b7280]">Only 5.8% rejected with notes</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Average Turnaround Time</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">4.2 Hours</p>
          <span className="text-[11px] text-[#6b7280]">Fast workflow SLA</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Audit Trail Integrity</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">100% Immutable</p>
          <span className="text-[11px] text-[#6b7280]">Timestamped and logged</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Processed Requests History</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Request ID & Type</th>
                <th className="py-2.5 px-3 font-semibold ">Requestor Employee</th>
                <th className="py-2.5 px-3 font-semibold ">Department</th>
                <th className="py-2.5 px-3 font-semibold ">Request Details</th>
                <th className="py-2.5 px-3 font-semibold ">Decision Timestamp</th>
                <th className="py-2.5 px-3 font-semibold ">Decided By</th>
                <th className="py-2.5 px-3 font-semibold ">Final Outcome</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">REQ-LEV-2026-082</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Leave Application</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Sneha Patil (PC-1008)</td>
                <td className="py-3 px-3 text-[#4b5563]">DevOps</td>
                <td className="py-3 px-3 text-[#4b5563]">1 Day Sick Leave (04 Nov 2026)</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">04 Nov 2026, 10:15 AM</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Rajesh Kumar (VP Eng)</td>
                <td className="py-3 px-3 font-bold text-emerald-700 font-mono">Approved in Full</td>
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Audit Log
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">REQ-EXP-2026-071</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Expense Reimbursement</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Sneha Patil (PC-1008)</td>
                <td className="py-3 px-3 text-[#4b5563]">DevOps</td>
                <td className="py-3 px-3 text-[#4b5563]">AWS Exam Fee (₹12,500)</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">25 Oct 2026, 04:30 PM</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Finance Accounts</td>
                <td className="py-3 px-3 font-bold text-emerald-700 font-mono">Approved & Disbursed</td>
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Audit Log
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">REQ-PCH-2026-039</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Punch Regularization</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Arjun Mehta (PC-1005)</td>
                <td className="py-3 px-3 text-[#4b5563]">Design</td>
                <td className="py-3 px-3 text-[#4b5563]">Missed in-punch at client site</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">08 Nov 2026, 06:45 PM</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Vinay Vakati (People Ops)</td>
                <td className="py-3 px-3 font-bold text-emerald-700 font-mono">Approved with Geo-Proof</td>
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Audit Log
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
