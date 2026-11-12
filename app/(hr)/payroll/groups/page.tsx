import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Payroll Groups & Payment Schedules' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Payroll Groups & Payment Schedules"
        description="Group staff by payment frequency (Monthly, Semi-Monthly), tax jurisdiction, and bank payment gateways."
        breadcrumb={[{"label":"Payroll","href":"/payroll"},{"label":"Groups"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Active Payroll Groups</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">3 Groups</p>
          <span className="text-[11px] text-[#6b7280]">Bangalore, Mumbai, US Remote</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Total Enrolled Staff</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">50 Employees</p>
          <span className="text-[11px] text-[#6b7280]">100% assigned to a payroll run</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Next Processing Cutoff</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">25 Nov 2026</p>
          <span className="text-[11px] text-[#6b7280]">Attendance lock date</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Salary Disbursement Date</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">30 Nov 2026</p>
          <span className="text-[11px] text-[#6b7280]">Via HDFC Direct Bank Transfer</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Configured Payroll Groups</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Payroll Group Name</th>
                <th className="py-2.5 px-3 font-semibold ">Statutory Region</th>
                <th className="py-2.5 px-3 font-semibold ">Disbursement Frequency</th>
                <th className="py-2.5 px-3 font-semibold ">Assigned Employees</th>
                <th className="py-2.5 px-3 font-semibold ">Monthly Gross Outflow</th>
                <th className="py-2.5 px-3 font-semibold ">Payment Gateway Mode</th>
                <th className="py-2.5 px-3 font-semibold ">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">India Domestic Regular (Monthly)</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PG-IND-01</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Karnataka & Maharashtra (India)</td>
                <td className="py-3 px-3 text-[#4b5563]">Monthly (Last working day)</td>
                <td className="py-3 px-3 text-[#4b5563]">44 Employees</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">₹68,50,000 / mo</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">HDFC Corporate NEFT / RTGS</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Configure Group
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">US Overseas Remote Staff</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PG-USA-02</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">California & Delaware (USA)</td>
                <td className="py-3 px-3 text-[#4b5563]">Semi-Monthly (15th & 30th)</td>
                <td className="py-3 px-3 text-[#4b5563]">4 Contractors / Employees</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">$36,000 / mo</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Wise / Stripe Automated Transfer</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Configure Group
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Executive Leadership Batch</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PG-EXEC-03</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">All Corporate Jurisdictions</td>
                <td className="py-3 px-3 text-[#4b5563]">Monthly (28th of month)</td>
                <td className="py-3 px-3 text-[#4b5563]">2 Executives</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">₹14,00,000 / mo</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Direct Wire Transfer</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Configure Group
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
