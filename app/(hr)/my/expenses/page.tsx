import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'My Expense Reimbursements' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Expense Reimbursements"
        description="Submit new expense claims with attached invoices and monitor finance payout status."
        breadcrumb={[{"label":"Employee Portal","href":"/my/dashboard"},{"label":"My Expenses"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Total Reimbursed (2026)</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">₹64,800</p>
          <span className="text-[11px] text-[#6b7280]">Direct bank credit</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Pending Processing</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">₹4,820</p>
          <span className="text-[11px] text-[#6b7280]">Awaiting manager sign-off</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Claims Approved</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">6 Claims</p>
          <span className="text-[11px] text-[#6b7280]">100% receipt verified</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Average Payment Time</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">3 Business Days</p>
          <span className="text-[11px] text-[#6b7280]">Fast reimbursement</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">My Submitted Expense Vouchers</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Claim ID & Title</th>
                <th className="py-2.5 px-3 font-semibold ">Expense Category</th>
                <th className="py-2.5 px-3 font-semibold ">Expense Date</th>
                <th className="py-2.5 px-3 font-semibold ">Claim Amount</th>
                <th className="py-2.5 px-3 font-semibold ">Receipt Attached</th>
                <th className="py-2.5 px-3 font-semibold ">Approver Status</th>
                <th className="py-2.5 px-3 font-semibold ">Disbursement Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">EXP-2026-089</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">FinTech Client Technical Lunch</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Client Meals & Food</td>
                <td className="py-3 px-3 text-[#4b5563]">06 Nov 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">₹4,820</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Tax_Invoice_Food.pdf</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Rajesh Kumar (Pending)</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="pending" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Receipt
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">EXP-2026-071</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">AWS Solutions Architect Exam Fee</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Certifications & Upskilling</td>
                <td className="py-3 px-3 text-[#4b5563]">25 Oct 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">₹12,500</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Pearson_VUE_Receipt.pdf</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Approved by Rajesh Kumar</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Receipt
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">EXP-2026-042</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Ergonomic Keyboard & Mouse Set</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Home Office Equipment</td>
                <td className="py-3 px-3 text-[#4b5563]">14 Sep 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">₹8,200</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Amazon_Invoice.pdf</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Approved by Vinay Vakati</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Receipt
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
