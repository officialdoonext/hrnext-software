import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Statutory Tax Declarations & Form 16 Center' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Statutory Tax Declarations & Form 16 Center"
        description="Employee tax regime elections (New vs Old), Chapter VI-A investment proofs, and monthly TDS tax projections."
        breadcrumb={[{"label":"Payroll","href":"/payroll"},{"label":"Tax Management"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">New Tax Regime Adoptions</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">78% of Staff</p>
          <span className="text-[11px] text-[#6b7280]">Lower slab rates (Sec 115BAC)</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Old Tax Regime Adoptions</span>
          <p className="text-2xl font-bold text-blue-700 mt-1">22% of Staff</p>
          <span className="text-[11px] text-[#6b7280]">Claiming 80C, 80D & Home Loan</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Monthly TDS Remitted</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">₹9,84,000</p>
          <span className="text-[11px] text-[#6b7280]">Deposited via Challan 281</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Form 16 Readiness</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">100% Up-To-Date</p>
          <span className="text-[11px] text-[#6b7280]">Q2 quarterly 24Q filed</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Employee Tax Declarations & TDS Projections</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Employee Name & ID</th>
                <th className="py-2.5 px-3 font-semibold ">Selected Tax Regime</th>
                <th className="py-2.5 px-3 font-semibold ">Section 80C Declarations</th>
                <th className="py-2.5 px-3 font-semibold ">80D Health Insurance</th>
                <th className="py-2.5 px-3 font-semibold ">Annual Estimated Tax</th>
                <th className="py-2.5 px-3 font-semibold ">Monthly TDS Deducted</th>
                <th className="py-2.5 px-3 font-semibold ">Form 16 Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Priya Sharma</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1002 • PAN: ABCPS1234F</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">New Tax Regime</td>
                <td className="py-3 px-3 text-[#4b5563]">Not applicable (New Regime)</td>
                <td className="py-3 px-3 text-[#4b5563]">Standard Deduction (₹75k)</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">₹1,92,000</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">₹16,000 / mo</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Download Tax Computation
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Arjun Mehta</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1005 • PAN: BCDEK5678G</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Old Tax Regime</td>
                <td className="py-3 px-3 text-[#4b5563]">₹1,50,000 (PPF + ELSS)</td>
                <td className="py-3 px-3 text-[#4b5563]">₹25,000 (Health Insurance)</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">₹1,44,000</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">₹12,000 / mo</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Verify Proofs
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Sneha Patil</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1008 • PAN: CDEFG9012H</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">New Tax Regime</td>
                <td className="py-3 px-3 text-[#4b5563]">Standard Deduction applied</td>
                <td className="py-3 px-3 text-[#4b5563]">Employer NPS (Sec 80CCD)</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">₹2,16,000</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">₹18,000 / mo</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Download Tax Computation
                  </Button>
                </td>
              </tr>
              <tr key="3" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Vikram Joshi</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1014 • PAN: DEFGH3456J</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Old Tax Regime</td>
                <td className="py-3 px-3 text-[#4b5563]">₹1,50,000 declared</td>
                <td className="py-3 px-3 text-[#4b5563]">₹20,000 declared</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">₹1,08,000</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">₹9,000 / mo</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="pending" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Pending Proof Submission
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
