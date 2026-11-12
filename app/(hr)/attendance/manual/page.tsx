import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Manual Attendance Override & Corrections' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Manual Attendance Override & Corrections"
        description="Record manual punch adjustments for offsite meetings, client locations, and biometric device maintenance."
        breadcrumb={[{"label":"Attendance","href":"/attendance"},{"label":"Manual Attendance"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Manual Entries This Month</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">14 Records</p>
          <span className="text-[11px] text-[#6b7280]">Biometric offline fallback</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Pending HR Sign-Off</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">3 Requests</p>
          <span className="text-[11px] text-[#6b7280]">Supervisor approved</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Client On-Site Work</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">8 Days</p>
          <span className="text-[11px] text-[#6b7280]">Pre-approved client visits</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Audit Verification Rate</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">100%</p>
          <span className="text-[11px] text-[#6b7280]">Geo-stamped and logged</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Manual Punch Adjustments Queue</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Employee Name</th>
                <th className="py-2.5 px-3 font-semibold ">Adjustment Date</th>
                <th className="py-2.5 px-3 font-semibold ">Shift Requested</th>
                <th className="py-2.5 px-3 font-semibold ">Check-In Time</th>
                <th className="py-2.5 px-3 font-semibold ">Check-Out Time</th>
                <th className="py-2.5 px-3 font-semibold ">Reason for Manual Entry</th>
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
                <td className="py-3 px-3 text-[#374151]">08 Nov 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">General Shift</td>
                <td className="py-3 px-3 text-[#4b5563]">09:30 AM</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">06:30 PM</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Client design sprint workshop at Bangalore Tech Park</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Approval
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Sneha Patil</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1008</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">07 Nov 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">General Shift</td>
                <td className="py-3 px-3 text-[#4b5563]">09:05 AM</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">06:15 PM</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Main lobby turnstile 2 fingerprint sensor failed</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="pending" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Approve Punch
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Karan Verma</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1012</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">05 Nov 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">General Shift</td>
                <td className="py-3 px-3 text-[#4b5563]">10:00 AM</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">07:00 PM</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Field visit to Mumbai logistics client warehouse</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Approval
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
