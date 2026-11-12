import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Team Expense Reimbursements & Sign-Offs' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Team Expense Reimbursements & Sign-Offs"
        description="Verify expense reimbursement claims and invoices submitted by your direct reports."
        breadcrumb={[{"label":"Manager","href":"/manager/dashboard"},{"label":"Expense Approvals"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Pending Claims</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">2 Vouchers</p>
          <span className="text-[11px] text-[#6b7280]">Total value: ₹42,320</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Approved This Quarter</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">₹1,84,500</p>
          <span className="text-[11px] text-[#6b7280]">Transferred by finance</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Receipts Verified</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">100% Tax Invoices</p>
          <span className="text-[11px] text-[#6b7280]">GST compliance verified</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Department Budget Used</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">62% of Fiscal Q4</p>
          <span className="text-[11px] text-[#6b7280]">Within sanctioned limits</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Pending Team Expense Vouchers</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Employee Name</th>
                <th className="py-2.5 px-3 font-semibold ">Claim ID</th>
                <th className="py-2.5 px-3 font-semibold ">Expense Category</th>
                <th className="py-2.5 px-3 font-semibold ">Expense Title / Description</th>
                <th className="py-2.5 px-3 font-semibold ">Claim Amount</th>
                <th className="py-2.5 px-3 font-semibold ">Invoice Date</th>
                <th className="py-2.5 px-3 font-semibold ">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Arjun Mehta</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1005</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">EXP-2026-084</td>
                <td className="py-3 px-3 text-[#4b5563]">Software Licenses & SaaS</td>
                <td className="py-3 px-3 text-[#4b5563]">Figma Enterprise Annual Team Seat Renewal</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">₹37,500</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">08 Nov 2026</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="pending" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Approve Voucher
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Priya Sharma</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1002</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">EXP-2026-089</td>
                <td className="py-3 px-3 text-[#4b5563]">Client Meeting & Meals</td>
                <td className="py-3 px-3 text-[#4b5563]">Lunch with FinTech partner engineering team</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">₹4,820</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">06 Nov 2026</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="pending" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Approve Voucher
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Sneha Patil</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1008</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">EXP-2026-071</td>
                <td className="py-3 px-3 text-[#4b5563]">Certification Exam</td>
                <td className="py-3 px-3 text-[#4b5563]">AWS Certified Solutions Architect Exam Fee</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">₹12,500</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">25 Oct 2026</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Invoice
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
