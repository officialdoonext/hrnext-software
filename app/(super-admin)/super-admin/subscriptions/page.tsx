import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'SaaS Subscriptions & Tenant Billing' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="SaaS Subscriptions & Tenant Billing"
        description="Manage enterprise client contract billing, subscription tiers (Enterprise, Pro, Starter), and invoice cycles."
        breadcrumb={[{"label":"Super Admin","href":"/super-admin/dashboard"},{"label":"Subscriptions"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Total Annual ARR</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">₹1,01,40,000</p>
          <span className="text-[11px] text-[#6b7280]">14 enterprise accounts</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Monthly Recurring (MRR)</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">₹8,45,000 / mo</p>
          <span className="text-[11px] text-[#6b7280]">+12% QoQ growth</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Enterprise Tier Accounts</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">6 Companies</p>
          <span className="text-[11px] text-[#6b7280]">Unlimited employee seats</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Gross Churn Rate</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">0.8%</p>
          <span className="text-[11px] text-[#6b7280]">Far below 2% SaaS industry avg</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Active SaaS Client Subscriptions</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Client Company Name</th>
                <th className="py-2.5 px-3 font-semibold ">Subscription Tier</th>
                <th className="py-2.5 px-3 font-semibold ">Billing Frequency</th>
                <th className="py-2.5 px-3 font-semibold ">Contract MRR</th>
                <th className="py-2.5 px-3 font-semibold ">Employee Seat Quota</th>
                <th className="py-2.5 px-3 font-semibold ">Next Renewal Date</th>
                <th className="py-2.5 px-3 font-semibold ">Payment Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Apex Global Technologies</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">apex-global.peoplecore.io</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Enterprise Tier</td>
                <td className="py-3 px-3 text-[#4b5563]">Annual Prepaid</td>
                <td className="py-3 px-3 text-[#4b5563]">₹75,000 / mo</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">500 Seats (442 in use)</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">15 Jan 2027</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Invoices
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Zenith Logistics India</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">zenith-logistics.peoplecore.io</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Professional Tier</td>
                <td className="py-3 px-3 text-[#4b5563]">Quarterly Invoiced</td>
                <td className="py-3 px-3 text-[#4b5563]">₹35,000 / mo</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">250 Seats (198 in use)</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">10 Dec 2026</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Invoices
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">InnoHealth Medical Systems</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">innohealth.peoplecore.io</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Enterprise Tier</td>
                <td className="py-3 px-3 text-[#4b5563]">Annual Prepaid</td>
                <td className="py-3 px-3 text-[#4b5563]">₹1,10,000 / mo</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">1,000 Seats (840 in use)</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">20 Jun 2027</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Invoices
                  </Button>
                </td>
              </tr>
              <tr key="3" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">FinEdge Advisory Services</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">finedge.peoplecore.io</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Starter Tier</td>
                <td className="py-3 px-3 text-[#4b5563]">Monthly Card Billing</td>
                <td className="py-3 px-3 text-[#4b5563]">₹12,000 / mo</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">50 Seats (38 in use)</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">05 Dec 2026</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Invoices
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
