import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Verified Training Certificates & Credentials' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Verified Training Certificates & Credentials"
        description="Official certificate archive with cryptographic SHA-256 verification and downloadable PDF badges."
        breadcrumb={[{"label":"Training","href":"/training"},{"label":"Certificates"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Total Issued Certificates</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">64 Badges</p>
          <span className="text-[11px] text-[#6b7280]">Cryptographically sealed</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Compliance Badges (POSH)</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">48 Certified</p>
          <span className="text-[11px] text-[#6b7280]">Mandatory annual certificate</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Technical Master Badges</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">16 Engineers</p>
          <span className="text-[11px] text-[#6b7280]">AWS Cloud & Architecture</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Verification Accuracy</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">100% Verified</p>
          <span className="text-[11px] text-[#6b7280]">Zero counterfeit credentials</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Digital Certificate Registry</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Certificate ID</th>
                <th className="py-2.5 px-3 font-semibold ">Recipient Employee</th>
                <th className="py-2.5 px-3 font-semibold ">Course Program</th>
                <th className="py-2.5 px-3 font-semibold ">Issue Date</th>
                <th className="py-2.5 px-3 font-semibold ">Validity Period</th>
                <th className="py-2.5 px-3 font-semibold ">Digital Signature Stamp</th>
                <th className="py-2.5 px-3 font-semibold ">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">CERT-2026-ENG-082</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Verified Credential</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Priya Sharma (PC-1002)</td>
                <td className="py-3 px-3 text-[#4b5563]">AWS Cloud Architecture & Kubernetes</td>
                <td className="py-3 px-3 text-[#4b5563]">05 Nov 2026</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Lifetime Validity</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">SHA-256: 7f8a9b2c...3d</td>
                
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
                  <p className="font-semibold text-xs text-[#111827]">CERT-2026-CMP-114</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Verified Credential</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Arjun Mehta (PC-1005)</td>
                <td className="py-3 px-3 text-[#4b5563]">ISO 27001 & Data Protection</td>
                <td className="py-3 px-3 text-[#4b5563]">02 Nov 2026</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Valid until Nov 2027</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">SHA-256: 3a2e1d9c...4f</td>
                
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
                  <p className="font-semibold text-xs text-[#111827]">CERT-2026-SLS-041</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Verified Credential</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Vikram Joshi (PC-1014)</td>
                <td className="py-3 px-3 text-[#4b5563]">Enterprise Sales Strategy</td>
                <td className="py-3 px-3 text-[#4b5563]">02 Nov 2026</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Lifetime Validity</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">SHA-256: 9b8c7d6e...1a</td>
                
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
