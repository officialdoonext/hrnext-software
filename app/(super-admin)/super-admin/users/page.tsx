import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Global Platform Administrators' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Global Platform Administrators"
        description="Manage super administrator accounts with root database and tenant management access."
        breadcrumb={[{"label":"Super Admin","href":"/super-admin/dashboard"},{"label":"Users"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Super Admin Accounts</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">3 Administrators</p>
          <span className="text-[11px] text-[#6b7280]">Root SaaS access</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">MFA Enforcement</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">100% Enforced</p>
          <span className="text-[11px] text-[#6b7280]">TOTP Authenticator required</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Active Sessions Today</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">2 Sessions</p>
          <span className="text-[11px] text-[#6b7280]">Audit logged</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Security Role</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">RBAC Root Level</p>
          <span className="text-[11px] text-[#6b7280]">Full platform privileges</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Platform Administrator Directory</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Admin User Name</th>
                <th className="py-2.5 px-3 font-semibold ">Email Address</th>
                <th className="py-2.5 px-3 font-semibold ">Privilege Scope</th>
                <th className="py-2.5 px-3 font-semibold ">Two-Factor Auth</th>
                <th className="py-2.5 px-3 font-semibold ">Last Login Timestamp</th>
                <th className="py-2.5 px-3 font-semibold ">Session IP Address</th>
                <th className="py-2.5 px-3 font-semibold ">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Super Admin</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">ID: SA-001</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">superadmin@peoplecore.io</td>
                <td className="py-3 px-3 text-[#4b5563]">Global Platform Owner</td>
                <td className="py-3 px-3 text-[#4b5563]">MFA Enabled (TOTP)</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Today, 11:42 AM</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">192.168.0.2</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Manage Credentials
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Vinay Vakati (Root Admin)</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">ID: SA-002</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">vinayvakati16@gmail.com</td>
                <td className="py-3 px-3 text-[#4b5563]">Principal System Engineer</td>
                <td className="py-3 px-3 text-[#4b5563]">MFA Enabled (TOTP)</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Today, 11:45 AM</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">192.168.0.2</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Manage Credentials
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Security Ops Admin</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">ID: SA-003</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">secops@peoplecore.io</td>
                <td className="py-3 px-3 text-[#4b5563]">Security & Compliance Officer</td>
                <td className="py-3 px-3 text-[#4b5563]">MFA Enabled (Hardware Key)</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Yesterday, 04:30 PM</td>
                <td className="py-3 px-3 text-[#111827] font-semibold">103.21.14.88</td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Manage Credentials
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
