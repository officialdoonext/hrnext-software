import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Employee Leave Balances & Entitlements Ledger' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Employee Leave Balances & Entitlements Ledger"
        description="Monitor remaining quotas across Earned Leave, Casual Leave, and Medical balances for all staff."
        breadcrumb={[{"label":"Leave","href":"/leave"},{"label":"Balances"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Total Leaves Available</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">742 Days</p>
          <span className="text-[11px] text-[#6b7280]">Across 50 active employees</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Average EL Balance</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">11.4 Days</p>
          <span className="text-[11px] text-[#6b7280]">Per confirmed employee</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Unused CL at Risk</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">64 Days</p>
          <span className="text-[11px] text-[#6b7280]">Will lapse on 31 Dec 2026</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Encashment Liability</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">₹14,80,000</p>
          <span className="text-[11px] text-[#6b7280]">Accrued on company books</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Workforce Leave Ledger</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Employee Name & ID</th>
                <th className="py-2.5 px-3 font-semibold ">Department</th>
                <th className="py-2.5 px-3 font-semibold ">Earned Leave (EL)</th>
                <th className="py-2.5 px-3 font-semibold ">Casual Leave (CL)</th>
                <th className="py-2.5 px-3 font-semibold ">Sick Leave (SL)</th>
                <th className="py-2.5 px-3 font-semibold ">Total Balance</th>
                <th className="py-2.5 px-3 font-semibold ">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Priya Sharma</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1002</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Engineering</td>
                <td className="py-3 px-3 text-[#4b5563]">14.5 Days</td>
                <td className="py-3 px-3 text-[#4b5563]">5.0 Days</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">8.0 Days</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">27.5 Days Available</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Adjust Quota
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Arjun Mehta</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1005</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Product Design</td>
                <td className="py-3 px-3 text-[#4b5563]">12.0 Days</td>
                <td className="py-3 px-3 text-[#4b5563]">4.0 Days</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">10.0 Days</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">26.0 Days Available</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Adjust Quota
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Sneha Patil</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1008</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">DevOps & Cloud</td>
                <td className="py-3 px-3 text-[#4b5563]">16.0 Days</td>
                <td className="py-3 px-3 text-[#4b5563]">6.0 Days</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">11.0 Days</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">33.0 Days Available</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Adjust Quota
                  </Button>
                </td>
              </tr>
              <tr key="3" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Vikram Joshi</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1014</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Sales</td>
                <td className="py-3 px-3 text-[#4b5563]">9.0 Days</td>
                <td className="py-3 px-3 text-[#4b5563]">2.0 Days</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">6.0 Days</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">17.0 Days Available</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Adjust Quota
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
