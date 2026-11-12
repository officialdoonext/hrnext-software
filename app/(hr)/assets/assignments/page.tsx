import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Hardware Allocations & Handover History' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Hardware Allocations & Handover History"
        description="Track equipment issued to staff, signed asset agreements, and recovery checklists upon separation."
        breadcrumb={[{"label":"Assets","href":"/assets"},{"label":"Assignments"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Active Asset Allocations</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">118 Assignments</p>
          <span className="text-[11px] text-[#6b7280]">100% agreement signed</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Pending Employee Signature</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">2 Devices</p>
          <span className="text-[11px] text-[#6b7280]">Newly issued to recent joiners</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Returned Assets (Q4)</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">6 Devices</p>
          <span className="text-[11px] text-[#6b7280]">Inspected and wiped</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Asset Loss Incident Rate</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">0.0%</p>
          <span className="text-[11px] text-[#6b7280]">Zero lost hardware in 2026</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Active Asset Allocations Ledger</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Asset Tag & Device</th>
                <th className="py-2.5 px-3 font-semibold ">Assigned Employee</th>
                <th className="py-2.5 px-3 font-semibold ">Department</th>
                <th className="py-2.5 px-3 font-semibold ">Allocation Date</th>
                <th className="py-2.5 px-3 font-semibold ">Condition on Issue</th>
                <th className="py-2.5 px-3 font-semibold ">Handover Receipt</th>
                <th className="py-2.5 px-3 font-semibold ">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">MacBook Pro 16" (M3 Max)</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">AST-LPT-2024-001</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Priya Sharma (PC-1002)</td>
                <td className="py-3 px-3 text-[#4b5563]">Engineering</td>
                <td className="py-3 px-3 text-[#4b5563]">15 Mar 2023</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Brand New (Sealed)</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Digitally Signed PDF</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Handover Slip
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Dell UltraSharp 27" 4K Monitor</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">AST-MON-2024-014</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Arjun Mehta (PC-1005)</td>
                <td className="py-3 px-3 text-[#4b5563]">Product Design</td>
                <td className="py-3 px-3 text-[#4b5563]">01 Jun 2023</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Brand New</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Digitally Signed PDF</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Handover Slip
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">MacBook Pro 16" (M3 Pro)</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">AST-LPT-2024-008</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Sneha Patil (PC-1008)</td>
                <td className="py-3 px-3 text-[#4b5563]">DevOps & SRE</td>
                <td className="py-3 px-3 text-[#4b5563]">10 Aug 2023</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Brand New</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Digitally Signed PDF</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Handover Slip
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
