import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Employee Resignations & Notice Period Tracking' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Employee Resignations & Notice Period Tracking"
        description="Manage formal resignations, manager retention interviews, notice period calculations, and exit approvals."
        breadcrumb={[{"label":"Separation","href":"/separation"},{"label":"Resignations"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Active Notice Periods</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">2 Employees</p>
          <span className="text-[11px] text-[#6b7280]">Serving 30-day notice</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Annual Attrition Rate</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">4.2%</p>
          <span className="text-[11px] text-[#6b7280]">Industry benchmark: 12-18%</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Exit Interviews Done</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">100% Completed</p>
          <span className="text-[11px] text-[#6b7280]">Comprehensive feedback logged</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Knowledge Handover</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">On-Track (85%)</p>
          <span className="text-[11px] text-[#6b7280]">Replacement engineers shadowing</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Resignations in Notice Period</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Employee Name & ID</th>
                <th className="py-2.5 px-3 font-semibold ">Department</th>
                <th className="py-2.5 px-3 font-semibold ">Resignation Date</th>
                <th className="py-2.5 px-3 font-semibold ">Notice Period Duration</th>
                <th className="py-2.5 px-3 font-semibold ">Requested LWD</th>
                <th className="py-2.5 px-3 font-semibold ">Approved LWD</th>
                <th className="py-2.5 px-3 font-semibold ">Exit Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Rohan Gupta</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1007</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Engineering</td>
                <td className="py-3 px-3 text-[#4b5563]">15 Sep 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">30 Days Standard</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">15 Oct 2026</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">15 Oct 2026 (Completed)</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Exit Dossier
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Aditi Rao</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1020</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Sales & BD</td>
                <td className="py-3 px-3 text-[#4b5563]">05 Nov 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">30 Days Standard</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">05 Dec 2026</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">05 Dec 2026 (Serving Notice)</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="pending" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Manage Exit
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
