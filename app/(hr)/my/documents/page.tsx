import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'My Personnel Records & Verified Credentials' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Personnel Records & Verified Credentials"
        description="Access and download your employment contract, signed offer letter, statutory tax Form 16, and submitted KYC proofs."
        breadcrumb={[{"label":"Employee Portal","href":"/my/dashboard"},{"label":"My Documents"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Total Verified Records</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">8 Documents</p>
          <span className="text-[11px] text-[#6b7280]">Encrypted & signed digitally</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Statutory KYC Status</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">Fully Verified</p>
          <span className="text-[11px] text-[#6b7280]">PAN & Aadhaar linked</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Tax Certificates</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">Form 16 Ready</p>
          <span className="text-[11px] text-[#6b7280]">Available for FY 2025-26</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Document Expirations</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">0 Expiring</p>
          <span className="text-[11px] text-[#6b7280]">All credentials in order</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Personnel Document Vault</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Document Name</th>
                <th className="py-2.5 px-3 font-semibold ">Category</th>
                <th className="py-2.5 px-3 font-semibold ">Issuing Authority</th>
                <th className="py-2.5 px-3 font-semibold ">Issued / Uploaded Date</th>
                <th className="py-2.5 px-3 font-semibold ">File Format & Size</th>
                <th className="py-2.5 px-3 font-semibold ">Verification Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Official Employment Contract & Appointment Letter</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">REF: EMP-DOC-2023-019</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Legal Agreement</td>
                <td className="py-3 px-3 text-[#4b5563]">PeopleCore Technologies Inc.</td>
                <td className="py-3 px-3 text-[#4b5563]">15 Mar 2023</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">PDF (1.4 MB)</td>
                <td className="py-3 px-3 text-[#111827] font-semibold"></td>
                
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
                  <p className="font-semibold text-xs text-[#111827]">Form 16 (Part A & Part B) - FY 2025-26</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Income Tax TDS Certificate</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Tax Certificate</td>
                <td className="py-3 px-3 text-[#4b5563]">Finance & Accounts Department</td>
                <td className="py-3 px-3 text-[#4b5563]">15 Jun 2026</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Digitally Signed PDF (850 KB)</td>
                <td className="py-3 px-3 text-[#111827] font-semibold"></td>
                
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
                  <p className="font-semibold text-xs text-[#111827]">Permanent Account Number (PAN Card)</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">ABCPS1234F</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Identity Proof</td>
                <td className="py-3 px-3 text-[#4b5563]">Income Tax Department (India)</td>
                <td className="py-3 px-3 text-[#4b5563]">Verified 15 Mar 2023</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Scanned Image (420 KB)</td>
                <td className="py-3 px-3 text-[#111827] font-semibold"></td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Copy
                  </Button>
                </td>
              </tr>
              <tr key="3" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Aadhaar Card (Masked e-Aadhaar)</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">XXXX-XXXX-8821</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Identity Proof</td>
                <td className="py-3 px-3 text-[#4b5563]">UIDAI</td>
                <td className="py-3 px-3 text-[#4b5563]">Verified 15 Mar 2023</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Protected PDF (620 KB)</td>
                <td className="py-3 px-3 text-[#111827] font-semibold"></td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Copy
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
