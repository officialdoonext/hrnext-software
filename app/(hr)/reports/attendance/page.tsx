import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Workforce Attendance & Punctuality Reports' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Workforce Attendance & Punctuality Reports"
        description="Analytical breakdown of daily physical attendance, late check-in frequency, absenteeism, and overtime hours by branch."
        breadcrumb={[{"label":"Reports","href":"/reports/employees"},{"label":"Attendance Reports"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Organization Attendance %</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">94.8%</p>
          <span className="text-[11px] text-[#6b7280]">+1.2% vs previous quarter</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Average Daily Hours</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">8.8 Hours</p>
          <span className="text-[11px] text-[#6b7280]">Standard target: 8.5 hrs</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Monthly Late Check-ins</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">18 Occurrences</p>
          <span className="text-[11px] text-[#6b7280]">Within 15-min grace window</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Total Overtime Logged</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">64.5 Hours</p>
          <span className="text-[11px] text-[#6b7280]">Disbursed in October payroll</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Departmental Attendance Performance Summary</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Department Name</th>
                <th className="py-2.5 px-3 font-semibold ">Total Headcount</th>
                <th className="py-2.5 px-3 font-semibold ">Working Days</th>
                <th className="py-2.5 px-3 font-semibold ">Avg Attendance %</th>
                <th className="py-2.5 px-3 font-semibold ">Late Check-ins</th>
                <th className="py-2.5 px-3 font-semibold ">Absenteeism %</th>
                <th className="py-2.5 px-3 font-semibold ">Total OT Logged</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Core Platform Engineering</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Bangalore & Remote</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">24 Staff</td>
                <td className="py-3 px-3 text-[#4b5563]">22 Days (Oct)</td>
                <td className="py-3 px-3 text-[#4b5563]">96.2%</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">6 instances</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">1.4%</td>
                <td className="py-3 px-3 font-bold text-emerald-700 font-mono">42.5 Hours</td>
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Export CSV
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Product & User Experience Design</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Bangalore HQ</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">8 Staff</td>
                <td className="py-3 px-3 text-[#4b5563]">22 Days (Oct)</td>
                <td className="py-3 px-3 text-[#4b5563]">95.0%</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">3 instances</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">2.0%</td>
                <td className="py-3 px-3 font-bold text-emerald-700 font-mono">8.0 Hours</td>
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Export CSV
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Enterprise Solutions & Sales</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Mumbai & Delhi</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">12 Staff</td>
                <td className="py-3 px-3 text-[#4b5563]">22 Days (Oct)</td>
                <td className="py-3 px-3 text-[#4b5563]">92.4%</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">8 instances</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">3.6%</td>
                <td className="py-3 px-3 font-bold text-emerald-700 font-mono">14.0 Hours</td>
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Export CSV
                  </Button>
                </td>
              </tr>
              <tr key="3" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">People Operations & Finance</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Bangalore HQ</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">6 Staff</td>
                <td className="py-3 px-3 text-[#4b5563]">22 Days (Oct)</td>
                <td className="py-3 px-3 text-[#4b5563]">98.0%</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">1 instance</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">0.8%</td>
                <td className="py-3 px-3 font-bold text-emerald-700 font-mono">0.0 Hours</td>
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Export CSV
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
