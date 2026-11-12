import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Inbound Job Applications' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Inbound Job Applications"
        description="Screen incoming job submissions, review candidate resumes, and shortlist applicants for technical screening."
        breadcrumb={[{"label":"Recruitment","href":"/recruitment"},{"label":"Applications"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">New Submissions Today</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">14 Resumes</p>
          <span className="text-[11px] text-[#6b7280]">Awaiting first review</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Shortlisted Rate</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">34%</p>
          <span className="text-[11px] text-[#6b7280]">Pass initial screening</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Auto-Parsed Resumes</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">100% Parsed</p>
          <span className="text-[11px] text-[#6b7280]">Skills & experience extracted</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Rejected Resumes</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">52 Profiles</p>
          <span className="text-[11px] text-[#6b7280]">Sent rejection notice</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Recent Applications Queue</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Applicant Name</th>
                <th className="py-2.5 px-3 font-semibold ">Applied Role</th>
                <th className="py-2.5 px-3 font-semibold ">Submission Date</th>
                <th className="py-2.5 px-3 font-semibold ">Resume Score</th>
                <th className="py-2.5 px-3 font-semibold ">Key Skills Highlight</th>
                <th className="py-2.5 px-3 font-semibold ">Current Stage</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Vikas Mehta</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">vikas.m@gmail.com</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Staff Frontend Lead</td>
                <td className="py-3 px-3 text-[#4b5563]">10 Nov 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">95% Match</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">React 19, Next.js, TypeScript, Tailwind</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Shortlisted for Phone Screen</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Review Resume
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Pooja Iyer</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">pooja.iyer@outlook.com</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Senior Product Designer</td>
                <td className="py-3 px-3 text-[#4b5563]">09 Nov 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">91% Match</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Figma Design Systems, Wireframing</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Screening Call Scheduled</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Review Resume
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Karthik Raman</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">karthik.r@yahoo.com</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">DevOps Architect</td>
                <td className="py-3 px-3 text-[#4b5563]">08 Nov 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">88% Match</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">AWS, Kubernetes, Terraform, Docker</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Hiring Manager Review</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="pending" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Review Resume
                  </Button>
                </td>
              </tr>
              <tr key="3" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Meera Chawla</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">meera.c@gmail.com</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Account Executive</td>
                <td className="py-3 px-3 text-[#4b5563]">07 Nov 2026</td>
                <td className="py-3 px-3 text-[#4b5563]">82% Match</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">B2B SaaS, Salesforce, Pipeline Gen</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Initial Screening</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="pending" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Review Resume
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
