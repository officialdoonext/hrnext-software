import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Company Policy Documents & Standard Guidelines' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Company Policy Documents & Standard Guidelines"
        description="Official company handbook, code of business conduct, POSH anti-harassment policy, and IT security protocols."
        breadcrumb={[{"label":"Documents","href":"/documents/templates"},{"label":"Company Docs"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Published Policies</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">12 Documents</p>
          <span className="text-[11px] text-[#6b7280]">Legally vetted and active</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Staff Acknowledgment</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">98% Signed</p>
          <span className="text-[11px] text-[#6b7280]">Digital signature on file</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Policy Revisions (2026)</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">2 Updated</p>
          <span className="text-[11px] text-[#6b7280]">Hybrid Work & DPDP Act</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Compliance Audit Status</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">SOC 2 Ready</p>
          <span className="text-[11px] text-[#6b7280]">Audited by external legal</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Company Policy Repository</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Document Title & Ref</th>
                <th className="py-2.5 px-3 font-semibold ">Document Category</th>
                <th className="py-2.5 px-3 font-semibold ">Version Number</th>
                <th className="py-2.5 px-3 font-semibold ">Effective Date</th>
                <th className="py-2.5 px-3 font-semibold ">Mandatory Acknowledgment</th>
                <th className="py-2.5 px-3 font-semibold ">File Format & Size</th>
                <th className="py-2.5 px-3 font-semibold ">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">PeopleCore Employee Code of Conduct 2026</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">POL-CORP-001</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Corporate Governance</td>
                <td className="py-3 px-3 text-[#4b5563]">Version 3.2</td>
                <td className="py-3 px-3 text-[#4b5563]">01 Jan 2026</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Mandatory All Staff</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">PDF (2.4 MB)</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Download PDF
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Prevention of Sexual Harassment (POSH) Policy</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">POL-HR-004</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">HR Compliance</td>
                <td className="py-3 px-3 text-[#4b5563]">Version 2.0</td>
                <td className="py-3 px-3 text-[#4b5563]">01 Jan 2026</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Mandatory All Staff</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">PDF (1.2 MB)</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Download PDF
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Information Security & Data Privacy Policy (ISO 27001)</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">POL-SEC-008</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">IT Security & Compliance</td>
                <td className="py-3 px-3 text-[#4b5563]">Version 4.1</td>
                <td className="py-3 px-3 text-[#4b5563]">15 Jun 2026</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Mandatory All Staff</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">PDF (3.1 MB)</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Download PDF
                  </Button>
                </td>
              </tr>
              <tr key="3" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Flexible Remote & Hybrid Work Policy Guidelines</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">POL-OPS-012</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Workplace Operations</td>
                <td className="py-3 px-3 text-[#4b5563]">Version 1.4</td>
                <td className="py-3 px-3 text-[#4b5563]">01 Sep 2026</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">General Guidelines</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">PDF (950 KB)</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Download PDF
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
