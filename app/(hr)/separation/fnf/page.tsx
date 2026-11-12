import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Full & Final (F&F) Settlement Engine' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Full & Final (F&F) Settlement Engine"
        description="Automated settlement computation: unpaid days salary, earned leave encashment, statutory gratuity, and deductions."
        breadcrumb={[{"label":"Separation","href":"/separation"},{"label":"Full & Final"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Settlements Disbursed (Q4)</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">₹3,42,800</p>
          <span className="text-[11px] text-[#6b7280]">Disbursed within 15 days of exit</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Pending Calculation</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">1 F&F Due</p>
          <span className="text-[11px] text-[#6b7280]">Aditi Rao (Due 15 Dec 2026)</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Avg Leave Encashment</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">12.5 Days</p>
          <span className="text-[11px] text-[#6b7280]">Calculated at Basic Pay</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Statutory Gratuity</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">Calculated (Payment of Gratuity Act)</p>
          <span className="text-[11px] text-[#6b7280]">Tenure &gt; 5 years eligible</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Full & Final Settlements Ledger</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Employee Name & ID</th>
                <th className="py-2.5 px-3 font-semibold ">Last Working Day</th>
                <th className="py-2.5 px-3 font-semibold ">Earned Salary Due</th>
                <th className="py-2.5 px-3 font-semibold ">Leave Encashment (EL)</th>
                <th className="py-2.5 px-3 font-semibold ">Gratuity Amount</th>
                <th className="py-2.5 px-3 font-semibold ">Notice Recovery / Deductions</th>
                <th className="py-2.5 px-3 font-semibold ">Net Payable Amount</th>
                <th className="py-2.5 px-3 font-semibold text-right">Payment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Rohan Gupta</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1007</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">15 Oct 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">₹48,500 (15 days)</td>
                <td className="py-3 px-3 text-[#4b5563]">₹32,400 (10 days EL)</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Not eligible (&lt; 5 yrs)</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">₹0.00</td>
                <td className="py-3 px-3 font-bold text-emerald-700 font-mono">₹80,900 Paid</td>
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
                  <p className="font-semibold text-xs text-[#111827]">Deepak Varma</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-0994 (Retired)</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">31 Aug 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">₹1,20,000 (Full month)</td>
                <td className="py-3 px-3 text-[#4b5563]">₹75,000 (20 days EL)</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">₹4,50,000 (Gratuity 8 yrs)</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">₹0.00</td>
                <td className="py-3 px-3 font-bold text-emerald-700 font-mono">₹6,45,000 Paid</td>
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
