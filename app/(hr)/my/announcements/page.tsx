import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Company Announcements & Community Bulletin' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Company Announcements & Community Bulletin"
        description="Real-time updates, town hall announcements, holiday circulars, and leadership messages."
        breadcrumb={[{"label":"Employee Portal","href":"/my/dashboard"},{"label":"Announcements"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Active Broadcasts</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">3 Announcements</p>
          <span className="text-[11px] text-[#6b7280]">Latest posted today</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Next All-Hands Meeting</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">Friday, 14 Nov</p>
          <span className="text-[11px] text-[#6b7280]">Quarterly Executive Update</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Upcoming Public Holiday</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">Diwali (14 Nov)</p>
          <span className="text-[11px] text-[#6b7280]">Paid company closure</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Policy Updates</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">1 New Guideline</p>
          <span className="text-[11px] text-[#6b7280]">Winter work-from-anywhere</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Company Broadcasts & Circulars</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Announcement Title & Scope</th>
                <th className="py-2.5 px-3 font-semibold ">Category</th>
                <th className="py-2.5 px-3 font-semibold ">Published Date</th>
                <th className="py-2.5 px-3 font-semibold ">Author / Department</th>
                <th className="py-2.5 px-3 font-semibold ">Target Audience</th>
                <th className="py-2.5 px-3 font-semibold ">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">PeopleCore HRMS 2.0 Official Rollout Across All Branches</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Enjoy instant check-ins, transparent leave quotas, and streamlined 360 appraisals.</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Company Update</td>
                <td className="py-3 px-3 text-[#4b5563]">Today, 10 Nov 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">Vinay Vakati (People Ops)</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">All 50 Employees</td>
                <td className="py-3 px-3 text-[#111827] font-semibold"></td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Read Full Post
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Annual All-Hands Town Hall & Product Roadmap Session</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Join executive leadership this Friday at 4:00 PM IST on Zoom for Q4 updates.</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Executive Event</td>
                <td className="py-3 px-3 text-[#4b5563]">08 Nov 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">Executive Office (CEO)</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">All Global Branches</td>
                <td className="py-3 px-3 text-[#111827] font-semibold"></td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Read Full Post
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Diwali & Winter Holiday Schedule Published</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">The unified 2026-2027 statutory holiday calendar has been uploaded to the portal.</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Policy & Holiday</td>
                <td className="py-3 px-3 text-[#4b5563]">04 Nov 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">HR Administration</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">All India Offices</td>
                <td className="py-3 px-3 text-[#111827] font-semibold"></td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Read Full Post
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
