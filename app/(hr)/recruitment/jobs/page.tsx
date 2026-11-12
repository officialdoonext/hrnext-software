import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Job Openings & Headcount Requisitions' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Job Openings & Headcount Requisitions"
        description="Manage open requisitions, salary bands, required qualifications, and candidate pipeline stages."
        breadcrumb={[{"label":"Recruitment","href":"/recruitment"},{"label":"Job Openings"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Active Openings</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">12 Positions</p>
          <span className="text-[11px] text-[#6b7280]">Across 5 departments</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Total Applicants</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">184 Resumes</p>
          <span className="text-[11px] text-[#6b7280]">+28 new this week</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Avg Time to Hire</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">22 Days</p>
          <span className="text-[11px] text-[#6b7280]">Target: &lt; 30 days</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Offers Released</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">4 Offers</p>
          <span className="text-[11px] text-[#6b7280]">3 accepted, 1 pending</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Active Job Requisitions Directory</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Job Title & Code</th>
                <th className="py-2.5 px-3 font-semibold ">Department</th>
                <th className="py-2.5 px-3 font-semibold ">Location</th>
                <th className="py-2.5 px-3 font-semibold ">Vacancies</th>
                <th className="py-2.5 px-3 font-semibold ">Experience Required</th>
                <th className="py-2.5 px-3 font-semibold ">Offered CTC Band</th>
                <th className="py-2.5 px-3 font-semibold ">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Staff Frontend Lead (Next.js 16)</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">REQ-ENG-041</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Engineering</td>
                <td className="py-3 px-3 text-[#4b5563]">Bangalore (Hybrid)</td>
                <td className="py-3 px-3 text-[#4b5563]">2 Openings</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">6 – 9 Years</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">₹32L – ₹42L</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Applicants (42)
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Senior Product Designer</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">REQ-DES-018</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Product Design</td>
                <td className="py-3 px-3 text-[#4b5563]">Bangalore / Remote</td>
                <td className="py-3 px-3 text-[#4b5563]">1 Opening</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">4 – 7 Years</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">₹22L – ₹30L</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Applicants (28)
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">DevOps & Cloud Architect</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">REQ-INF-012</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Infrastructure</td>
                <td className="py-3 px-3 text-[#4b5563]">San Francisco / Remote</td>
                <td className="py-3 px-3 text-[#4b5563]">1 Opening</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">7+ Years</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">$140k – $180k</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Applicants (19)
                  </Button>
                </td>
              </tr>
              <tr key="3" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Enterprise Account Executive</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">REQ-SLS-029</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Enterprise Sales</td>
                <td className="py-3 px-3 text-[#4b5563]">Mumbai HQ</td>
                <td className="py-3 px-3 text-[#4b5563]">3 Openings</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">5 – 8 Years</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">₹20L – ₹32L + Comm</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="pending" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Applicants (35)
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
