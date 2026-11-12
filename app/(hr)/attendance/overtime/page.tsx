import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Overtime & Compensatory Off Records' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Overtime & Compensatory Off Records"
        description="Overtime hours logged beyond standard shifts, statutory compensation rates (1.5x / 2.0x), and payroll credits."
        breadcrumb={[{"label":"Attendance","href":"/attendance"},{"label":"Overtime"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Total OT Hours (Oct)</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">64.5 Hours</p>
          <span className="text-[11px] text-[#6b7280]">Across 12 engineers</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Overtime Payout Amount</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">₹78,400</p>
          <span className="text-[11px] text-[#6b7280]">Included in October payroll</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Comp-Off Leaves Granted</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">6 Days</p>
          <span className="text-[11px] text-[#6b7280]">Credited to leave balance</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Policy Multiplier</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">1.5x Regular</p>
          <span className="text-[11px] text-[#6b7280]">2.0x on public holidays</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Approved Overtime Ledger</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Employee Name & ID</th>
                <th className="py-2.5 px-3 font-semibold ">Department</th>
                <th className="py-2.5 px-3 font-semibold ">Date Overtime Worked</th>
                <th className="py-2.5 px-3 font-semibold ">Shift Standard Hours</th>
                <th className="py-2.5 px-3 font-semibold ">OT Hours Logged</th>
                <th className="py-2.5 px-3 font-semibold ">Overtime Rate</th>
                <th className="py-2.5 px-3 font-semibold ">Payout Amount</th>
                <th className="py-2.5 px-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Sneha Patil</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1008</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">DevOps & Cloud</td>
                <td className="py-3 px-3 text-[#4b5563]">31 Oct 2026 (Saturday)</td>
                <td className="py-3 px-3 text-[#4b5563]">Weekly Off</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">8.0 Hours (Cloud Release)</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">2.0x Holiday Rate</td>
                <td className="py-3 px-3 font-bold text-emerald-700 font-mono">₹14,500</td>
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Details
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Priya Sharma</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1002</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Engineering</td>
                <td className="py-3 px-3 text-[#4b5563]">28 Oct 2026 (Wednesday)</td>
                <td className="py-3 px-3 text-[#4b5563]">09:00 – 18:00</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">3.5 Hours (Payment Hotfix)</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">1.5x Overtime Rate</td>
                <td className="py-3 px-3 font-bold text-emerald-700 font-mono">₹4,800</td>
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Details
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Vikram Joshi</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1014</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Sales Support</td>
                <td className="py-3 px-3 text-[#4b5563]">25 Oct 2026 (Sunday)</td>
                <td className="py-3 px-3 text-[#4b5563]">Weekly Off</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">6.0 Hours (Quarter End)</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Compensatory Off Credit</td>
                <td className="py-3 px-3 font-bold text-emerald-700 font-mono">1.0 Day Comp-Off</td>
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Details
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
