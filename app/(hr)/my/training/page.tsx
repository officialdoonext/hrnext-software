import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'My Courses, Learning Modules & Certifications' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Courses, Learning Modules & Certifications"
        description="Access your assigned learning tracks, complete mandatory compliance modules, and download certificates."
        breadcrumb={[{"label":"Employee Portal","href":"/my/dashboard"},{"label":"My Training"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Enrolled Courses</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">3 Programs</p>
          <span className="text-[11px] text-[#6b7280]">2 technical, 1 compliance</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Completed Courses</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">2 Completed</p>
          <span className="text-[11px] text-[#6b7280]">100% quiz scores</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Mandatory Compliance</span>
          <p className="text-2xl font-bold text-emerald-700 mt-1">Fully Certified</p>
          <span className="text-[11px] text-[#6b7280]">POSH & ISO 27001 completed</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Learning Hours (2026)</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">42.0 Hours</p>
          <span className="text-[11px] text-[#6b7280]">Upskilling investment</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">My Enrolled Courses & Progress</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Course Title & Program ID</th>
                <th className="py-2.5 px-3 font-semibold ">Course Category</th>
                <th className="py-2.5 px-3 font-semibold ">Instructor</th>
                <th className="py-2.5 px-3 font-semibold ">Duration</th>
                <th className="py-2.5 px-3 font-semibold ">Progress Bar</th>
                <th className="py-2.5 px-3 font-semibold ">Assessment Score</th>
                <th className="py-2.5 px-3 font-semibold ">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">AWS Cloud Architecture & Kubernetes Deployments</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">TRN-ENG-01</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Technical Skills</td>
                <td className="py-3 px-3 text-[#4b5563]">Sneha Patil (DevOps Lead)</td>
                <td className="py-3 px-3 text-[#4b5563]">24 Hours</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">100% Completed</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">96% (Distinction)</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Download Certificate
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">POSH, ISO 27001 Security & GDPR / DPDP Compliance</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">TRN-CMP-02</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Mandatory Compliance</td>
                <td className="py-3 px-3 text-[#4b5563]">External Legal Counsel</td>
                <td className="py-3 px-3 text-[#4b5563]">6 Hours</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">100% Completed</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">100% Score</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Download Certificate
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">High-Performance Engineering Management & Coaching</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">TRN-LDR-03</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Leadership Skills</td>
                <td className="py-3 px-3 text-[#4b5563]">Rajesh Kumar (VP Eng)</td>
                <td className="py-3 px-3 text-[#4b5563]">12 Hours</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">40% In Progress</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Upcoming Quiz</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="pending" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Continue Course
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
