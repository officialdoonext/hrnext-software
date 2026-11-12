import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Expense Claims & Reimbursement Approvals' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Expense Claims & Reimbursement Approvals"
        description="Audit employee reimbursement invoices, verify GST tax proofs, and release finance payouts."
        breadcrumb={[{"label":"Expenses","href":"/expenses"},{"label":"Approvals"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Pending Claims Total</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">₹42,320</p>
          <span className="text-[11px] text-[#6b7280]">2 claims awaiting sign-off</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Approved This Month</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">₹1,48,500</p>
          <span className="text-[11px] text-[#6b7280]">Sent for bank transfer</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Average Finance TAT</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">2.2 Days</p>
          <span className="text-[11px] text-[#6b7280]">Fast reimbursement turnaround</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Policy Non-Compliance</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">0 Claims</p>
          <span className="text-[11px] text-[#6b7280]">All bills within caps</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Expense Invoices Approval Queue</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Claim ID</th>
                <th className="py-2.5 px-3 font-semibold ">Employee Name</th>
                <th className="py-2.5 px-3 font-semibold ">Expense Category</th>
                <th className="py-2.5 px-3 font-semibold ">Description / Purpose</th>
                <th className="py-2.5 px-3 font-semibold ">Amount (INR)</th>
                <th className="py-2.5 px-3 font-semibold ">Invoice Date</th>
                <th className="py-2.5 px-3 font-semibold ">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">EXP-2026-084</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">SaaS Software</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Arjun Mehta (PC-1005)</td>
                <td className="py-3 px-3 text-[#4b5563]">Software Subscriptions</td>
                <td className="py-3 px-3 text-[#4b5563]">Figma Enterprise Organization Annual Seat</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">₹37,500</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">08 Nov 2026</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="pending" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Approve & Pay
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">EXP-2026-089</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Travel & Meals</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Priya Sharma (PC-1002)</td>
                <td className="py-3 px-3 text-[#4b5563]">Client Entertainment</td>
                <td className="py-3 px-3 text-[#4b5563]">Lunch with FinTech partner engineering team</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">₹4,820</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">06 Nov 2026</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="pending" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Approve & Pay
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">EXP-2026-071</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Certifications</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Sneha Patil (PC-1008)</td>
                <td className="py-3 px-3 text-[#4b5563]">Training Reimbursement</td>
                <td className="py-3 px-3 text-[#4b5563]">AWS Certified Solutions Architect Exam Fee</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">₹12,500</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">25 Oct 2026</td>
                
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
