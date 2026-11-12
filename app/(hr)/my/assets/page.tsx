import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'My Allocated Hardware Assets & Equipment' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Allocated Hardware Assets & Equipment"
        description="Inventory of laptops, monitors, accessories, and security hardware keys allocated to your account."
        breadcrumb={[{"label":"Employee Portal","href":"/my/dashboard"},{"label":"My Assets"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Allocated Devices</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">4 Items</p>
          <span className="text-[11px] text-[#6b7280]">Laptops, monitor, key, badge</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Hardware Replacement</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">Eligible in 2027</p>
          <span className="text-[11px] text-[#6b7280]">3-year enterprise upgrade cycle</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">AppleCare Warranty</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">Active Coverage</p>
          <span className="text-[11px] text-[#6b7280]">Valid through March 2027</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Handover Receipts</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">All Signed</p>
          <span className="text-[11px] text-[#6b7280]">Digitally verified on file</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Company Equipment Allocated to You</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Asset Tag & Device Model</th>
                <th className="py-2.5 px-3 font-semibold ">Category</th>
                <th className="py-2.5 px-3 font-semibold ">Serial Number</th>
                <th className="py-2.5 px-3 font-semibold ">Issued Date</th>
                <th className="py-2.5 px-3 font-semibold ">Warranty Expiry</th>
                <th className="py-2.5 px-3 font-semibold ">Condition on Issue</th>
                <th className="py-2.5 px-3 font-semibold ">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Apple MacBook Pro 16" (M3 Max, 36GB RAM, 1TB SSD)</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">AST-LPT-2024-001</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Laptop Computer</td>
                <td className="py-3 px-3 text-[#4b5563]">C02G9123MD6R</td>
                <td className="py-3 px-3 text-[#4b5563]">15 Mar 2023</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">15 Mar 2027 (AppleCare+)</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Brand New (Sealed)</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Agreement
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Dell UltraSharp 27" 4K USB-C Monitor (U2723QE)</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">AST-MON-2024-014</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">External Display</td>
                <td className="py-3 px-3 text-[#4b5563]">CN-0K759F-72872</td>
                <td className="py-3 px-3 text-[#4b5563]">20 Jan 2024</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">20 Jan 2027</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Brand New</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Agreement
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">YubiKey 5C NFC Two-Factor Hardware Security Key</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">AST-SEC-2024-082</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Security Key</td>
                <td className="py-3 px-3 text-[#4b5563]">YK5C-984129</td>
                <td className="py-3 px-3 text-[#4b5563]">15 Mar 2023</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Lifetime Warranty</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Active (Paired)</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Agreement
                  </Button>
                </td>
              </tr>
              <tr key="3" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">RFID Smart Access Badge (North Tower Turnstiles)</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">AST-BDG-2023-119</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Physical Access Badge</td>
                <td className="py-3 px-3 text-[#4b5563]">RFID-PC1002</td>
                <td className="py-3 px-3 text-[#4b5563]">15 Mar 2023</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Permanent Employee</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Active</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Agreement
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
