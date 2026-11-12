import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Employee HR Helpdesk & Support Tickets' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Employee HR Helpdesk & Support Tickets"
        description="Submit and track queries for payroll, group medical insurance claims, tax assistance, or facilities requests."
        breadcrumb={[{"label":"Employee Portal","href":"/my/dashboard"},{"label":"Help & Support"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">My Open Tickets</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">1 Active Ticket</p>
          <span className="text-[11px] text-[#6b7280]">Resolution SLA: &lt; 24 hrs</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Tickets Resolved (2026)</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">4 Resolved</p>
          <span className="text-[11px] text-[#6b7280]">Average turnaround: 3.5 hrs</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Assigned HR Contact</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">Vinay Vakati</p>
          <span className="text-[11px] text-[#6b7280]">People Operations Lead</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Support SLA Compliance</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">100% on time</p>
          <span className="text-[11px] text-[#6b7280]">Quick issue resolution</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">My Support Tickets History</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Ticket ID & Subject</th>
                <th className="py-2.5 px-3 font-semibold ">Category</th>
                <th className="py-2.5 px-3 font-semibold ">Created Date</th>
                <th className="py-2.5 px-3 font-semibold ">Priority</th>
                <th className="py-2.5 px-3 font-semibold ">Assigned Specialist</th>
                <th className="py-2.5 px-3 font-semibold ">Current Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">TKT-2026-102</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Medical insurance e-card for newborn child</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Health Insurance & Benefits</td>
                <td className="py-3 px-3 text-[#4b5563]">08 Nov 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">Medium Priority</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Vinay Vakati (People Ops)</td>
                <td className="py-3 px-3 text-[#111827] font-semibold"></td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Thread
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">TKT-2026-064</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Form 16 Part B signed copy download issue</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Payroll & Taxes</td>
                <td className="py-3 px-3 text-[#4b5563]">16 Jun 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">High Priority</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Finance Payroll Lead</td>
                <td className="py-3 px-3 text-[#111827] font-semibold"></td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Thread
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">TKT-2026-031</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Ergonomic office chair adjustment request</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">IT & Facilities</td>
                <td className="py-3 px-3 text-[#4b5563]">12 Feb 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">Low Priority</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">IT Facilities Admin</td>
                <td className="py-3 px-3 text-[#111827] font-semibold"></td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Thread
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
