import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Hardware & IT Equipment Inventory Register' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Hardware & IT Equipment Inventory Register"
        description="Master directory of company laptops, external 4K monitors, network servers, and peripherals."
        breadcrumb={[{"label":"Assets","href":"/assets"},{"label":"Register"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Total IT Assets Tracked</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">142 Devices</p>
          <span className="text-[11px] text-[#6b7280]">Total valuation: ₹1.28 Crore</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Allocated to Employees</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">118 Devices</p>
          <span className="text-[11px] text-[#6b7280]">83% utilization</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Available in Inventory</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">24 Devices</p>
          <span className="text-[11px] text-[#6b7280]">Ready for new hires</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Under Maintenance</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">2 Devices</p>
          <span className="text-[11px] text-[#6b7280]">Apple service center</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Master Asset Register</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Asset Tag & Model</th>
                <th className="py-2.5 px-3 font-semibold ">Device Category</th>
                <th className="py-2.5 px-3 font-semibold ">Serial Number</th>
                <th className="py-2.5 px-3 font-semibold ">Purchase Date</th>
                <th className="py-2.5 px-3 font-semibold ">Procurement Cost</th>
                <th className="py-2.5 px-3 font-semibold ">Physical Condition</th>
                <th className="py-2.5 px-3 font-semibold ">Allocation Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Apple MacBook Pro 16" (M3 Max, 36GB)</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">AST-LPT-2024-001</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Laptop Computer</td>
                <td className="py-3 px-3 text-[#4b5563]">C02G9123MD6R</td>
                <td className="py-3 px-3 text-[#4b5563]">15 Jan 2024</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">₹2,49,900</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Excellent (Flawless)</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Allocation
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Dell UltraSharp 27" 4K Monitor (U2723QE)</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">AST-MON-2024-014</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Display Peripherals</td>
                <td className="py-3 px-3 text-[#4b5563]">CN-0K759F-72872</td>
                <td className="py-3 px-3 text-[#4b5563]">20 Jan 2024</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">₹58,500</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Excellent</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Allocation
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Apple MacBook Pro 14" (M3 Pro, 18GB)</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">AST-LPT-2024-019</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Laptop Computer</td>
                <td className="py-3 px-3 text-[#4b5563]">C02H4882MD6T</td>
                <td className="py-3 px-3 text-[#4b5563]">10 Mar 2024</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">₹1,99,900</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Like New (In Stock)</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="pending" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Assign Device
                  </Button>
                </td>
              </tr>
              <tr key="3" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">YubiKey 5C NFC Security Hardware Key</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">AST-SEC-2024-082</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Security Authentication</td>
                <td className="py-3 px-3 text-[#4b5563]">YK5C-984129</td>
                <td className="py-3 px-3 text-[#4b5563]">01 Feb 2024</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">₹5,500</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Assigned (Active)</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Allocation
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
