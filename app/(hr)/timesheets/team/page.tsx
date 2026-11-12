import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Team Weekly Timesheet Submissions' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Team Weekly Timesheet Submissions"
        description="Review, monitor, and audit project time entries logged by departmental team members."
        breadcrumb={[{"label":"Timesheets","href":"/timesheets"},{"label":"Team Timesheets"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Team Hours Logged</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">164.5 Hours</p>
          <span className="text-[11px] text-[#6b7280]">Across 4 direct reports</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Team Billable Ratio</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">89.2%</p>
          <span className="text-[11px] text-[#6b7280]">Target benchmark: &gt; 85%</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Pending Manager Approval</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">2 Timesheets</p>
          <span className="text-[11px] text-[#6b7280]">Awaiting your review</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Unsubmitted Timesheets</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">0 Missing</p>
          <span className="text-[11px] text-[#6b7280]">All team members on time</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Direct Reports Timesheet Register</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Employee Name & ID</th>
                <th className="py-2.5 px-3 font-semibold ">Primary Project Assignment</th>
                <th className="py-2.5 px-3 font-semibold ">Total Hours</th>
                <th className="py-2.5 px-3 font-semibold ">Billable %</th>
                <th className="py-2.5 px-3 font-semibold ">Logged Period</th>
                <th className="py-2.5 px-3 font-semibold ">Submitted On</th>
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
                <td className="py-3 px-3 text-[#374151]">Fintech Payment Gateway</td>
                <td className="py-3 px-3 text-[#4b5563]">42.5 Hours</td>
                <td className="py-3 px-3 text-[#4b5563]">92% Billable</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">03 Nov – 09 Nov 2026</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">09 Nov, 06:15 PM</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="pending" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Review Hours
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Arjun Mehta</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1005</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Product Mobile App Redesign</td>
                <td className="py-3 px-3 text-[#4b5563]">40.0 Hours</td>
                <td className="py-3 px-3 text-[#4b5563]">100% Billable</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">03 Nov – 09 Nov 2026</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">09 Nov, 05:45 PM</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="pending" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Review Hours
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Sneha Patil</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1008</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Cloud Infrastructure & SRE</td>
                <td className="py-3 px-3 text-[#4b5563]">41.0 Hours</td>
                <td className="py-3 px-3 text-[#4b5563]">85% Billable</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">03 Nov – 09 Nov 2026</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">09 Nov, 07:00 PM</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Log
                  </Button>
                </td>
              </tr>
              <tr key="3" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Vikram Joshi</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1014</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Full-Stack Integrations</td>
                <td className="py-3 px-3 text-[#4b5563]">41.0 Hours</td>
                <td className="py-3 px-3 text-[#4b5563]">80% Billable</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">03 Nov – 09 Nov 2026</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">09 Nov, 06:30 PM</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Log
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
