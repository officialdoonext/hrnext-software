import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'System Notification Logs & Webhook Deliveries' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="System Notification Logs & Webhook Deliveries"
        description="Audit trail of outgoing transactional emails (payslips, offers), Slack webhook alerts, and SMS delivery receipts."
        breadcrumb={[{"label":"Administration","href":"/admin/roles"},{"label":"Notifications"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Notifications Dispatched</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">1,420 Alerts</p>
          <span className="text-[11px] text-[#6b7280]">Last 30 days</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Email Delivery Rate</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">99.8%</p>
          <span className="text-[11px] text-[#6b7280]">Zero bounce backs</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Slack Webhook Alerts</span>
          <p className="text-2xl font-bold text-blue-700 mt-1">348 Events</p>
          <span className="text-[11px] text-[#6b7280]">Leaves, check-ins, birthdays</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Failed Deliveries</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">2 Retried</p>
          <span className="text-[11px] text-[#6b7280]">Transient network glitch</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">System Notification Event Stream</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Notification ID & Event</th>
                <th className="py-2.5 px-3 font-semibold ">Recipient Target</th>
                <th className="py-2.5 px-3 font-semibold ">Delivery Channel</th>
                <th className="py-2.5 px-3 font-semibold ">Event Trigger Payload</th>
                <th className="py-2.5 px-3 font-semibold ">Dispatched Timestamp</th>
                <th className="py-2.5 px-3 font-semibold ">Delivery Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">NTF-2026-1402</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Monthly Payslip Dispatched</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">priya.sharma@peoplecore.io</td>
                <td className="py-3 px-3 text-[#4b5563]">Transactional Email (SMTP)</td>
                <td className="py-3 px-3 text-[#4b5563]">October 2026 Payslip PDF attached</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">31 Oct 2026, 06:00 PM</td>
                <td className="py-3 px-3 text-[#111827] font-semibold"></td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Dispatch
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">NTF-2026-1401</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Leave Approval Requested</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">rajesh.kumar@peoplecore.io</td>
                <td className="py-3 px-3 text-[#4b5563]">Slack Webhook + Email</td>
                <td className="py-3 px-3 text-[#4b5563]">Priya Sharma applied for 3 days EL</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">10 Nov 2026, 09:10 AM</td>
                <td className="py-3 px-3 text-[#111827] font-semibold"></td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Dispatch
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">NTF-2026-1399</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Security 2FA Verification</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">vinayvakati16@gmail.com</td>
                <td className="py-3 px-3 text-[#4b5563]">Email One-Time Code</td>
                <td className="py-3 px-3 text-[#4b5563]">New login session from 192.168.0.2</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">10 Nov 2026, 11:40 AM</td>
                <td className="py-3 px-3 text-[#111827] font-semibold"></td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Dispatch
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
