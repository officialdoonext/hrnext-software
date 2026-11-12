import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Multi-Departmental Exit Clearance Checklist' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Multi-Departmental Exit Clearance Checklist"
        description="Cross-functional sign-offs across IT hardware recovery, finance account settlements, and project handovers."
        breadcrumb={[{"label":"Separation","href":"/separation"},{"label":"Clearance"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Clearances in Progress</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">1 Employee</p>
          <span className="text-[11px] text-[#6b7280]">Aditi Rao (Serving notice)</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Hardware Recovered</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">100% Recovered</p>
          <span className="text-[11px] text-[#6b7280]">Laptops, monitors, access card</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Finance Dues Cleared</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">Zero Travel Dues</p>
          <span className="text-[11px] text-[#6b7280]">All pending expense bills resolved</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Relieving Letter Issued</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">Instant upon exit</p>
          <span className="text-[11px] text-[#6b7280]">Digitally verified release</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Exit Clearance Verification Status</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Exiting Employee</th>
                <th className="py-2.5 px-3 font-semibold ">IT Hardware Recovery</th>
                <th className="py-2.5 px-3 font-semibold ">Finance Accounts Dues</th>
                <th className="py-2.5 px-3 font-semibold ">Project Handover Code</th>
                <th className="py-2.5 px-3 font-semibold ">HR Documentation</th>
                <th className="py-2.5 px-3 font-semibold ">Overall Clearance</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Aditi Rao</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1020 • Sales BD</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Pending Hardware Return (Dec 05)</td>
                <td className="py-3 px-3 text-[#4b5563]">Clear (No Advance Dues)</td>
                <td className="py-3 px-3 text-[#4b5563]">In Progress (Client Shadowing)</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Exit Interview Completed</td>
                <td className="py-3 px-3 text-[#111827] font-semibold"></td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="pending" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Update Checklist
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Rohan Gupta</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1007 • Engineering</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Laptop & Badge Received (Wiped)</td>
                <td className="py-3 px-3 text-[#4b5563]">Clear (F&F Released)</td>
                <td className="py-3 px-3 text-[#4b5563]">Repository Rights Revoked</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Relieving Letter Dispatched</td>
                <td className="py-3 px-3 text-[#111827] font-semibold"></td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Download Clearance
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
