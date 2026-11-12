import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Leave Utilization & Encashment Liability Reports' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Leave Utilization & Encashment Liability Reports"
        description="Analysis of leave consumption patterns, department absenteeism trends, and fiscal financial encashment liabilities."
        breadcrumb={[{"label":"Reports","href":"/reports/employees"},{"label":"Leave Reports"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Annual Leave Consumption</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">384 Days Used</p>
          <span className="text-[11px] text-[#6b7280]">Avg 7.6 days / staff in 2026</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Remaining Quota on Books</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">742 Days</p>
          <span className="text-[11px] text-[#6b7280]">Total unutilized balance</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Total Encashment Liability</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">₹14,80,000</p>
          <span className="text-[11px] text-[#6b7280]">Accrued on company balance sheet</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Most Utilized Leave Type</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">Earned Leave (62%)</p>
          <span className="text-[11px] text-[#6b7280]">Casual Leave at 24%</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Leave Liability & Consumption by Department</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Department Name</th>
                <th className="py-2.5 px-3 font-semibold ">Eligible Employees</th>
                <th className="py-2.5 px-3 font-semibold ">Total Entitlement (Days)</th>
                <th className="py-2.5 px-3 font-semibold ">Leaves Availed (YTD)</th>
                <th className="py-2.5 px-3 font-semibold ">Leaves Remaining</th>
                <th className="py-2.5 px-3 font-semibold ">Average Utilization %</th>
                <th className="py-2.5 px-3 font-semibold ">Encashment Liability</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Engineering & Technology</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Bangalore</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">24 Employees</td>
                <td className="py-3 px-3 text-[#4b5563]">720 Days</td>
                <td className="py-3 px-3 text-[#4b5563]">194 Days</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">526 Days</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">26.9%</td>
                <td className="py-3 px-3 font-bold text-emerald-700 font-mono">₹9,45,000</td>
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Export Report
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Product & User Design</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Bangalore</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">8 Employees</td>
                <td className="py-3 px-3 text-[#4b5563]">240 Days</td>
                <td className="py-3 px-3 text-[#4b5563]">68 Days</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">172 Days</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">28.3%</td>
                <td className="py-3 px-3 font-bold text-emerald-700 font-mono">₹2,68,000</td>
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Export Report
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Enterprise Client Sales</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Mumbai</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">12 Employees</td>
                <td className="py-3 px-3 text-[#4b5563]">360 Days</td>
                <td className="py-3 px-3 text-[#4b5563]">88 Days</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">272 Days</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">24.4%</td>
                <td className="py-3 px-3 font-bold text-emerald-700 font-mono">₹1,95,000</td>
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Export Report
                  </Button>
                </td>
              </tr>
              <tr key="3" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Human Resources & Finance</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Bangalore</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">6 Employees</td>
                <td className="py-3 px-3 text-[#4b5563]">180 Days</td>
                <td className="py-3 px-3 text-[#4b5563]">34 Days</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">146 Days</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">18.8%</td>
                <td className="py-3 px-3 font-bold text-emerald-700 font-mono">₹72,000</td>
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Export Report
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
