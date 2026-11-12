import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Salary Structures & Compensation CTC Templates' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Salary Structures & Compensation CTC Templates"
        description="Standardized compensation templates with Basic (50%), HRA (40%), Special Allowance, and PF/ESI calculations."
        breadcrumb={[{"label":"Payroll","href":"/payroll"},{"label":"Structures"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Defined Salary Structures</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">4 Templates</p>
          <span className="text-[11px] text-[#6b7280]">From Intern to Executive</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Statutory Basic Rule</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">50% of CTC</p>
          <span className="text-[11px] text-[#6b7280]">Optimized for EPF & Gratuity</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">HRA Allowance Rule</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">40% of Basic</p>
          <span className="text-[11px] text-[#6b7280]">50% in metro cities</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">PF Statutory Contribution</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">12% of Basic</p>
          <span className="text-[11px] text-[#6b7280]">Matches employee deduction</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">CTC Component Breakup Templates</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Structure Template Name</th>
                <th className="py-2.5 px-3 font-semibold ">Applicable Bands</th>
                <th className="py-2.5 px-3 font-semibold ">Basic Pay Component</th>
                <th className="py-2.5 px-3 font-semibold ">HRA Allowance</th>
                <th className="py-2.5 px-3 font-semibold ">Special Allowance</th>
                <th className="py-2.5 px-3 font-semibold ">Provident Fund (PF)</th>
                <th className="py-2.5 px-3 font-semibold ">ESI Eligibility</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Software Engineering Standard CTC</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">STR-ENG-2026</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">L2 – L4 (Engineering & DevOps)</td>
                <td className="py-3 px-3 text-[#4b5563]">50% of Total CTC</td>
                <td className="py-3 px-3 text-[#4b5563]">40% of Basic Pay</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Balance amount</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">12% of Basic (Capped at ₹1,800 or Actual)</td>
                <td className="py-3 px-3 font-bold text-emerald-700 font-mono">Exempt (CTC &gt; ₹21,000/mo)</td>
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Edit Structure
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Product & Design Leadership Structure</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">STR-PRD-2026</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">L3 – M1 (Design & Product)</td>
                <td className="py-3 px-3 text-[#4b5563]">50% of Total CTC</td>
                <td className="py-3 px-3 text-[#4b5563]">40% of Basic Pay</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Balance amount + LTA</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">12% of Basic Pay</td>
                <td className="py-3 px-3 font-bold text-emerald-700 font-mono">Exempt</td>
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Edit Structure
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Executive Management Compensation</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">STR-EXEC-2026</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">M2 – E1 (Directors & VPs)</td>
                <td className="py-3 px-3 text-[#4b5563]">45% of Total CTC</td>
                <td className="py-3 px-3 text-[#4b5563]">50% of Basic Pay (Metro HRA)</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Special Allowance + Car Allowance</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">12% of Basic Pay</td>
                <td className="py-3 px-3 font-bold text-emerald-700 font-mono">Exempt</td>
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Edit Structure
                  </Button>
                </td>
              </tr>
              <tr key="3" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Graduate Trainee / Intern Stipend</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">STR-INT-2026</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">L1 (Interns & Trainees)</td>
                <td className="py-3 px-3 text-[#4b5563]">100% Fixed Stipend</td>
                <td className="py-3 px-3 text-[#4b5563]">Nil</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Nil</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Nil (Stipend exempt)</td>
                <td className="py-3 px-3 font-bold text-emerald-700 font-mono">Covered under group medical</td>
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Edit Structure
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
