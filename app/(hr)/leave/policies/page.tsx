import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Leave Policies & Accrual Rules' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Leave Policies & Accrual Rules"
        description="Organizational entitlement guidelines, monthly accrual rates, probationary restrictions, and sandwich rules."
        breadcrumb={[{"label":"Leave","href":"/leave"},{"label":"Policies"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Leave Policy Categories</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">6 Entitlements</p>
          <span className="text-[11px] text-[#6b7280]">Statutory & discretionary</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Annual Paid Quota</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">30 Days / Year</p>
          <span className="text-[11px] text-[#6b7280]">18 EL + 12 CL/SL</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Max Carry Forward</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">10 Days to 2027</p>
          <span className="text-[11px] text-[#6b7280]">Balance encashable at separation</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Probation Leave Rule</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">CL Only Allowed</p>
          <span className="text-[11px] text-[#6b7280]">EL accrues post-confirmation</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Statutory Leave Rules Directory</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Leave Policy Title</th>
                <th className="py-2.5 px-3 font-semibold ">Annual Quota</th>
                <th className="py-2.5 px-3 font-semibold ">Accrual Schedule</th>
                <th className="py-2.5 px-3 font-semibold ">Max Carry-Forward</th>
                <th className="py-2.5 px-3 font-semibold ">Encashment Eligibility</th>
                <th className="py-2.5 px-3 font-semibold ">Sandwich Rule Policy</th>
                <th className="py-2.5 px-3 font-semibold ">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Earned Leave (Privilege Leave)</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Statutory Annual Leave</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">18 Days</td>
                <td className="py-3 px-3 text-[#4b5563]">1.5 days accrued monthly</td>
                <td className="py-3 px-3 text-[#4b5563]">10 Days maximum</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Encashable at exit or year-end</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Sandwich weekends counted if &gt; 4 days</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Edit Policy
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Casual Leave (CL)</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Discretionary Short Leave</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">12 Days</td>
                <td className="py-3 px-3 text-[#4b5563]">Credited in full on Jan 01</td>
                <td className="py-3 px-3 text-[#4b5563]">Lapses at Dec 31 (Zero carry)</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Non-encashable</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Max 3 consecutive days</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Edit Policy
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Sick Leave (Medical Leave)</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Health Emergency</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">12 Days</td>
                <td className="py-3 px-3 text-[#4b5563]">Credited on Jan 01</td>
                <td className="py-3 px-3 text-[#4b5563]">Accumulates up to 30 days</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Non-encashable</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Medical cert needed if &gt; 2 days</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Edit Policy
                  </Button>
                </td>
              </tr>
              <tr key="3" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Maternity / Paternity Leave</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Parental Support Policy</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">26 Weeks (Maternity) / 2 Weeks</td>
                <td className="py-3 px-3 text-[#4b5563]">Full paid leave</td>
                <td className="py-3 px-3 text-[#4b5563]">Continuous entitlement</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Statutory compliance (Maternity Act)</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Exempt from sandwich rule</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Edit Policy
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
