import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Organization Leave & Availability Calendar' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Organization Leave & Availability Calendar"
        description="Visual schedule showing planned team leaves, public holidays, and department coverage."
        breadcrumb={[{"label":"Leave","href":"/leave"},{"label":"Calendar"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Out of Office This Week</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">3 Employees</p>
          <span className="text-[11px] text-[#6b7280]">6% of workforce on leave</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Peak Holiday Month</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">November</p>
          <span className="text-[11px] text-[#6b7280]">Diwali & Guru Nanak Jayanti</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Department Coverage</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">94% Operational</p>
          <span className="text-[11px] text-[#6b7280]">All key support desks staffed</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Restricted Days Remaining</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">2 Optional Holidays</p>
          <span className="text-[11px] text-[#6b7280]">In Q4 2026</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">November 2026 Scheduled Absences</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Employee Name</th>
                <th className="py-2.5 px-3 font-semibold ">Department</th>
                <th className="py-2.5 px-3 font-semibold ">Absence Date Range</th>
                <th className="py-2.5 px-3 font-semibold ">Leave Category</th>
                <th className="py-2.5 px-3 font-semibold ">Total Workdays Out</th>
                <th className="py-2.5 px-3 font-semibold ">Backup Colleague</th>
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
                <td className="py-3 px-3 text-[#374151]">Engineering</td>
                <td className="py-3 px-3 text-[#4b5563]">12 Nov 2026 – 14 Nov 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">Earned Leave (EL)</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">3 Days</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Vikram Joshi (Coverage Assigned)</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Calendar
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Arjun Mehta</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1005</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Product Design</td>
                <td className="py-3 px-3 text-[#4b5563]">16 Nov 2026 – 17 Nov 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">Casual Leave (CL)</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">2 Days</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Pooja Iyer (Design Handover)</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="pending" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Calendar
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Kavita Nair</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1022</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Marketing</td>
                <td className="py-3 px-3 text-[#4b5563]">10 Nov 2026 – 11 Nov 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">Sick Leave (SL)</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">2 Days</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Vinay Vakati (Ad Campaign Lead)</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Calendar
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
