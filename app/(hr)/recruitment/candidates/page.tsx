import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Candidate Talent Pool & Sourcing Database' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Candidate Talent Pool & Sourcing Database"
        description="Review candidate profiles, source attribution, evaluation scores, and recruitment stages."
        breadcrumb={[{"label":"Recruitment","href":"/recruitment"},{"label":"Candidates"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Total Candidate Pool</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">348 Profiles</p>
          <span className="text-[11px] text-[#6b7280]">Active & archived talent</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">In Active Screening</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">26 In Process</p>
          <span className="text-[11px] text-[#6b7280]">Interviewing stages</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Top Sourcing Channel</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">LinkedIn (48%)</p>
          <span className="text-[11px] text-[#6b7280]">Referrals at 32%</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Candidate Satisfaction</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">4.8 / 5.0</p>
          <span className="text-[11px] text-[#6b7280]">Candidate NPS survey</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Active Candidate Pipeline</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Candidate Name</th>
                <th className="py-2.5 px-3 font-semibold ">Target Position</th>
                <th className="py-2.5 px-3 font-semibold ">Sourcing Channel</th>
                <th className="py-2.5 px-3 font-semibold ">Current Company</th>
                <th className="py-2.5 px-3 font-semibold ">Experience</th>
                <th className="py-2.5 px-3 font-semibold ">Recruitment Stage</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Rahul Saxena</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">rahul.s@example.com</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Staff Frontend Lead</td>
                <td className="py-3 px-3 text-[#4b5563]">LinkedIn InMail</td>
                <td className="py-3 px-3 text-[#4b5563]">Razorpay Technologies</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">7.2 Years</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Technical Architecture Round</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Scorecard
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Snehal Deshmukh</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">snehal.d@example.com</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Senior Product Designer</td>
                <td className="py-3 px-3 text-[#4b5563]">Employee Referral (Priya S.)</td>
                <td className="py-3 px-3 text-[#4b5563]">Swiggy Design Labs</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">5.0 Years</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Portfolio Deepdive Round</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Scorecard
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Amitav Ghosh</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">amitav.g@example.com</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Cloud Architect</td>
                <td className="py-3 px-3 text-[#4b5563]">Direct Career Page</td>
                <td className="py-3 px-3 text-[#4b5563]">Infosys Cloud Practice</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">8.5 Years</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Offer Extended</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Offer Letter
                  </Button>
                </td>
              </tr>
              <tr key="3" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Neha Kapoor</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">neha.k@example.com</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Enterprise Account Executive</td>
                <td className="py-3 px-3 text-[#4b5563]">Naukri Recruiter</td>
                <td className="py-3 px-3 text-[#4b5563]">Freshworks Inc.</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">6.0 Years</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">HR Fitment & Compensation</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="pending" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Schedule Round
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
