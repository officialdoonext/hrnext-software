import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Company Events, Town Halls & Cultural Calendar' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Company Events, Town Halls & Cultural Calendar"
        description="Schedule and broadcast executive all-hands meetings, technical webinars, festive celebrations, and team offsites."
        breadcrumb={[{"label":"Communication","href":"/communication/announcements"},{"label":"Events"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Upcoming Company Events</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">4 Events</p>
          <span className="text-[11px] text-[#6b7280]">Scheduled for Q4 2026</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Next All-Hands Meeting</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">Friday, 14 Nov</p>
          <span className="text-[11px] text-[#6b7280]">Quarterly Executive Update</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Average Town Hall Attendance</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">96% Staff</p>
          <span className="text-[11px] text-[#6b7280]">In-person + Zoom livestream</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Diwali Festive Celebration</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">13 Nov 2026</p>
          <span className="text-[11px] text-[#6b7280]">Office party & cultural games</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Company Events & Gatherings Calendar</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Event Title</th>
                <th className="py-2.5 px-3 font-semibold ">Event Category</th>
                <th className="py-2.5 px-3 font-semibold ">Scheduled Date & Time</th>
                <th className="py-2.5 px-3 font-semibold ">Venue / Virtual Link</th>
                <th className="py-2.5 px-3 font-semibold ">Event Organizer</th>
                <th className="py-2.5 px-3 font-semibold ">Expected Attendees</th>
                <th className="py-2.5 px-3 font-semibold ">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Q4 2026 Quarterly All-Hands & Product Roadmap</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Executive Leadership Town Hall</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Corporate Town Hall</td>
                <td className="py-3 px-3 text-[#4b5563]">Friday, 14 Nov 2026 • 04:00 PM IST</td>
                <td className="py-3 px-3 text-[#4b5563]">Main Auditorium & Zoom Livestream</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Executive Office (CEO & Founders)</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">All 50 Employees</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Details
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Diwali Festive Evening & Cultural Celebration</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Traditional Attire & Dinner</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Cultural Celebration</td>
                <td className="py-3 px-3 text-[#4b5563]">Thursday, 13 Nov 2026 • 05:30 PM IST</td>
                <td className="py-3 px-3 text-[#4b5563]">Bangalore HQ Terrace Lounge</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">People Operations & Culture Team</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">All Bangalore Staff</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Details
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Next.js 16 Full-Stack Architecture Masterclass</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Technical Brown-Bag Session</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Knowledge Sharing</td>
                <td className="py-3 px-3 text-[#4b5563]">Wednesday, 25 Nov 2026 • 03:00 PM IST</td>
                <td className="py-3 px-3 text-[#4b5563]">Engineering Room B + Google Meet</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Priya Sharma (Staff Lead)</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Engineering Team (24)</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Details
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
