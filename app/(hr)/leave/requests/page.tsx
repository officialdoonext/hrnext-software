import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'All Employee Leave Applications' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="All Employee Leave Applications"
        description="Historical and active leave requests across Earned Leave, Casual Leave, Sick Leave, and Maternity/Paternity."
        breadcrumb={[{"label":"Leave","href":"/leave"},{"label":"Requests"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Total Applications (2026)</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">142 Requests</p>
          <span className="text-[11px] text-[#6b7280]">92% approval rate</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Approved Leave Days</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">384 Days</p>
          <span className="text-[11px] text-[#6b7280]">Avg 7.6 days / employee</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Pending Manager Action</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">4 Requests</p>
          <span className="text-[11px] text-[#6b7280]">Awaiting line manager sign-off</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Cancelled / Rejected</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">8 Requests</p>
          <span className="text-[11px] text-[#6b7280]">Project deadline conflicts</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Leave Applications Master Archive</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Employee Name</th>
                <th className="py-2.5 px-3 font-semibold ">Leave Category</th>
                <th className="py-2.5 px-3 font-semibold ">Duration (Days)</th>
                <th className="py-2.5 px-3 font-semibold ">From Date</th>
                <th className="py-2.5 px-3 font-semibold ">To Date</th>
                <th className="py-2.5 px-3 font-semibold ">Reason Given</th>
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
                <td className="py-3 px-3 text-[#374151]">Earned Leave (EL)</td>
                <td className="py-3 px-3 text-[#4b5563]">3 Days</td>
                <td className="py-3 px-3 text-[#4b5563]">12 Nov 2026</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">14 Nov 2026</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Family wedding ceremony in Jaipur</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Slip
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Arjun Mehta</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1005</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Casual Leave (CL)</td>
                <td className="py-3 px-3 text-[#4b5563]">2 Days</td>
                <td className="py-3 px-3 text-[#4b5563]">16 Nov 2026</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">17 Nov 2026</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Personal relocation and home shifting</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="pending" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Review Request
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Vikram Joshi</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1014</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Sick Leave (SL)</td>
                <td className="py-3 px-3 text-[#4b5563]">1 Day</td>
                <td className="py-3 px-3 text-[#4b5563]">10 Nov 2026</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">10 Nov 2026</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Fever and viral consultation</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Slip
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
