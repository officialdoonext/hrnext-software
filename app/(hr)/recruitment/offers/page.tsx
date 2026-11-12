import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Job Offers & Employment Letters' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Job Offers & Employment Letters"
        description="Generate, approve, and disburse official offer letters with automated candidate e-signatures."
        breadcrumb={[{"label":"Recruitment","href":"/recruitment"},{"label":"Offers"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Offers Released (Q4)</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">8 Offers</p>
          <span className="text-[11px] text-[#6b7280]">Total offered CTC: ₹2.4 Cr</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Accepted Offers</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">6 Signed</p>
          <span className="text-[11px] text-[#6b7280]">75% acceptance rate</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Pending Acceptance</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">2 Pending</p>
          <span className="text-[11px] text-[#6b7280]">Expiring in 3 days</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Upcoming Joiners</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">5 Engineers</p>
          <span className="text-[11px] text-[#6b7280]">Joining in Nov & Dec 2026</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Employment Offers Registry</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Candidate Name</th>
                <th className="py-2.5 px-3 font-semibold ">Designation</th>
                <th className="py-2.5 px-3 font-semibold ">Offered Annual CTC</th>
                <th className="py-2.5 px-3 font-semibold ">Offer Released On</th>
                <th className="py-2.5 px-3 font-semibold ">Offer Expiry Date</th>
                <th className="py-2.5 px-3 font-semibold ">Expected Join Date</th>
                <th className="py-2.5 px-3 font-semibold ">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Amitav Ghosh</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">amitav.g@example.com</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Principal Cloud Architect</td>
                <td className="py-3 px-3 text-[#4b5563]">₹42,00,000</td>
                <td className="py-3 px-3 text-[#4b5563]">05 Nov 2026</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">12 Nov 2026</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">01 Dec 2026</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Download Signed Offer
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Shalini Singh</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">shalini.s@example.com</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Senior Product Manager</td>
                <td className="py-3 px-3 text-[#4b5563]">₹32,00,000</td>
                <td className="py-3 px-3 text-[#4b5563]">08 Nov 2026</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">15 Nov 2026</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">15 Dec 2026</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="pending" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Send Reminder
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Karthik Reddy</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">karthik.reddy@example.com</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Staff Backend Lead</td>
                <td className="py-3 px-3 text-[#4b5563]">₹38,00,000</td>
                <td className="py-3 px-3 text-[#4b5563]">02 Nov 2026</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">09 Nov 2026</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">01 Dec 2026</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Initiate Onboarding
                  </Button>
                </td>
              </tr>
              <tr key="3" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Deepa Krishnan</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">deepa.k@example.com</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Lead UI/UX Designer</td>
                <td className="py-3 px-3 text-[#4b5563]">₹28,00,000</td>
                <td className="py-3 px-3 text-[#4b5563]">01 Nov 2026</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">08 Nov 2026</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">Declined (Counter Offer)</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="rejected" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Decline Reason
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
