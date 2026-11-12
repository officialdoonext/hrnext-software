import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Employee Personnel Records & Document Dossiers' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Employee Personnel Records & Document Dossiers"
        description="Centralized repository of employee educational certificates, previous relieving letters, PAN, and Aadhaar records."
        breadcrumb={[{"label":"Documents","href":"/documents/templates"},{"label":"Employee Docs"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Total Tracked Documents</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">420 Records</p>
          <span className="text-[11px] text-[#6b7280]">Encrypted document store</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Verified Document Rate</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">98.5%</p>
          <span className="text-[11px] text-[#6b7280]">Background check verified</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Pending HR Verification</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">4 Uploads</p>
          <span className="text-[11px] text-[#6b7280]">Recent new joiners</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Storage Security</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">AES-256 Encrypted</p>
          <span className="text-[11px] text-[#6b7280]">AWS S3 Private Buckets</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Employee Personnel Records Archive</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Employee Name & ID</th>
                <th className="py-2.5 px-3 font-semibold ">Department</th>
                <th className="py-2.5 px-3 font-semibold ">Document Type</th>
                <th className="py-2.5 px-3 font-semibold ">Document Title / Number</th>
                <th className="py-2.5 px-3 font-semibold ">Uploaded On</th>
                <th className="py-2.5 px-3 font-semibold ">Verification Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Priya Sharma</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1002</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Engineering</td>
                <td className="py-3 px-3 text-[#4b5563]">Identity Proof (PAN)</td>
                <td className="py-3 px-3 text-[#4b5563]">PAN Card Copy (ABCPS1234F)</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">15 Mar 2023</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">HR Verified</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Document
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Arjun Mehta</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1005</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Product Design</td>
                <td className="py-3 px-3 text-[#4b5563]">Educational Transcript</td>
                <td className="py-3 px-3 text-[#4b5563]">B.Des Degree Certificate (NID)</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">01 Jun 2023</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">HR Verified</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Document
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Sneha Patil</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1008</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">DevOps & SRE</td>
                <td className="py-3 px-3 text-[#4b5563]">Previous Relieving Letter</td>
                <td className="py-3 px-3 text-[#4b5563]">Infosys Service Certificate</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">10 Aug 2023</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">HR Verified</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Document
                  </Button>
                </td>
              </tr>
              <tr key="3" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Vikram Joshi</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">PC-1014</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Sales</td>
                <td className="py-3 px-3 text-[#4b5563]">Bank Account Proof</td>
                <td className="py-3 px-3 text-[#4b5563]">Cancelled Cheque (HDFC Bank)</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">01 Nov 2026</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Pending Verification</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="pending" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Verify Document
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
