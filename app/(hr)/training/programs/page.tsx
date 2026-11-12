import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Corporate Training Programs & Workshops Catalog' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Corporate Training Programs & Workshops Catalog"
        description="Browse technical certifications, mandatory compliance training, leadership masterclasses, and schedules."
        breadcrumb={[{"label":"Training","href":"/training"},{"label":"Programs"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Active Courses Catalog</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">8 Programs</p>
          <span className="text-[11px] text-[#6b7280]">Technical, compliance, leadership</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Total Enrolled Learners</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">96 Employees</p>
          <span className="text-[11px] text-[#6b7280]">Avg 2 courses / employee</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Mandatory Completion</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">96% on track</p>
          <span className="text-[11px] text-[#6b7280]">POSH & ISO 27001 Security</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Training Budget Spent</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">₹4,85,000</p>
          <span className="text-[11px] text-[#6b7280]">Of ₹8,00,000 annual budget</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Course Curriculum & Schedules</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Program Title & ID</th>
                <th className="py-2.5 px-3 font-semibold ">Category</th>
                <th className="py-2.5 px-3 font-semibold ">Lead Instructor</th>
                <th className="py-2.5 px-3 font-semibold ">Course Duration</th>
                <th className="py-2.5 px-3 font-semibold ">Delivery Mode</th>
                <th className="py-2.5 px-3 font-semibold ">Enrolled / Capacity</th>
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
                <td className="py-3 px-3 text-[#4b5563]">24 Hours (4 Weeks)</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Live Online Classroom</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">18 / 25 Seats</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Enroll Employee
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
                <td className="py-3 px-3 text-[#4b5563]">6 Hours (Self-Paced)</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Interactive LMS Portal</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">48 / 50 Enrolled</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Track Compliance
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">High-Impact Engineering Management & Coaching</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">TRN-LDR-03</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Leadership & Management</td>
                <td className="py-3 px-3 text-[#4b5563]">Rajesh Kumar (VP Eng)</td>
                <td className="py-3 px-3 text-[#4b5563]">12 Hours (Weekend)</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Executive Boardroom</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">8 / 12 Seats</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Enroll Employee
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
