import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Expense Categories & Spending Policy Limits' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Expense Categories & Spending Policy Limits"
        description="Define corporate expenditure categories, daily allowance caps, receipt requirements, and tax rules."
        breadcrumb={[{"label":"Expenses","href":"/expenses"},{"label":"Categories"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Defined Categories</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">6 Categories</p>
          <span className="text-[11px] text-[#6b7280]">Travel, food, software, books</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Daily Food Allowance</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">₹1,500 / day</p>
          <span className="text-[11px] text-[#6b7280]">Applicable during travel</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Receipt Threshold</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">Mandatory &gt; ₹250</p>
          <span className="text-[11px] text-[#6b7280]">GST tax invoice required</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Audit Compliance</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">100% Tax Compliant</p>
          <span className="text-[11px] text-[#6b7280]">Audited by corporate accounts</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Corporate Expenditure Categories</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Category Name & Code</th>
                <th className="py-2.5 px-3 font-semibold ">Expense Scope</th>
                <th className="py-2.5 px-3 font-semibold ">Daily Per Diem Cap</th>
                <th className="py-2.5 px-3 font-semibold ">Tax Invoice Mandatory</th>
                <th className="py-2.5 px-3 font-semibold ">Billable to Client</th>
                <th className="py-2.5 px-3 font-semibold ">Approval Hierarchy</th>
                <th className="py-2.5 px-3 font-semibold ">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Client Travel & Lodging</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">CAT-EXP-01</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Domestic flights, trains & hotels</td>
                <td className="py-3 px-3 text-[#4b5563]">₹6,500 / night (Tier 1)</td>
                <td className="py-3 px-3 text-[#4b5563]">Yes (GST invoice required)</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Billable (Project Code)</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Manager + Finance VP</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Edit Rules
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Software Licenses & SaaS</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">CAT-EXP-02</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Figma, GitHub Copilot, JetBrains</td>
                <td className="py-3 px-3 text-[#4b5563]">Pre-approved budget cap</td>
                <td className="py-3 px-3 text-[#4b5563]">Yes (Vendor invoice)</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Non-billable (Overhead)</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Department Head + CFO</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Edit Rules
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Client Entertainment & Food</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">CAT-EXP-03</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Business lunches & client dinners</td>
                <td className="py-3 px-3 text-[#4b5563]">₹3,000 per attendee</td>
                <td className="py-3 px-3 text-[#4b5563]">Yes (Detailed bill)</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Billable (Client Project)</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Line Manager</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Edit Rules
                  </Button>
                </td>
              </tr>
              <tr key="3" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Books & Continuous Learning</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">CAT-EXP-04</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Technical books & online courses</td>
                <td className="py-3 px-3 text-[#4b5563]">₹15,000 / year / employee</td>
                <td className="py-3 px-3 text-[#4b5563]">Yes</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Non-billable (HR Benefit)</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Line Manager</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Edit Rules
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
