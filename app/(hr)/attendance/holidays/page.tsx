import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Statutory Holiday Calendar (2026 – 2027)' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Statutory Holiday Calendar (2026 – 2027)"
        description="Mandatory gazetted holidays, restricted cultural festivals, and branch-specific statutory closures."
        breadcrumb={[{"label":"Attendance","href":"/attendance"},{"label":"Holidays"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Mandatory Holidays</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">12 Days</p>
          <span className="text-[11px] text-[#6b7280]">Paid company closures</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Restricted (Optional)</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">3 Choices</p>
          <span className="text-[11px] text-[#6b7280]">Employees pick 2 festivals</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Next Upcoming Holiday</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">Diwali (14 Nov)</p>
          <span className="text-[11px] text-[#6b7280]">In 4 days (Saturday)</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Long Weekends Left</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">2 Weekends</p>
          <span className="text-[11px] text-[#6b7280]">Christmas & Republic Day</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Statutory Public Holiday Schedule</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Holiday Name</th>
                <th className="py-2.5 px-3 font-semibold ">Date of Observance</th>
                <th className="py-2.5 px-3 font-semibold ">Day of Week</th>
                <th className="py-2.5 px-3 font-semibold ">Holiday Type</th>
                <th className="py-2.5 px-3 font-semibold ">Applicable Branches</th>
                <th className="py-2.5 px-3 font-semibold ">Statutory Wage Rule</th>
                <th className="py-2.5 px-3 font-semibold ">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Diwali (Deepavali Festival)</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Festival of Lights</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">14 Nov 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">Saturday</td>
                <td className="py-3 px-3 text-[#4b5563]">Mandatory Gazetted</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Bangalore, Mumbai, Hyderabad, Delhi</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Paid Public Holiday</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Circular
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Guru Nanak Jayanti</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Prakash Utsav</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">24 Nov 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">Tuesday</td>
                <td className="py-3 px-3 text-[#4b5563]">Restricted (Optional)</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">All India Branches</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Optional Choice</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Circular
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Christmas Day</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Winter Festival</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">25 Dec 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">Friday</td>
                <td className="py-3 px-3 text-[#4b5563]">Mandatory Gazetted</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Global (All Locations)</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Paid Public Holiday</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Circular
                  </Button>
                </td>
              </tr>
              <tr key="3" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Republic Day 2027</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">National Holiday</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">26 Jan 2027</td>
                <td className="py-3 px-3 text-[#4b5563]">Tuesday</td>
                <td className="py-3 px-3 text-[#4b5563]">National Mandatory</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">All India Branches</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">2.0x Overtime if worked</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Circular
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
