import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Plus, Download, Search, CheckCircle2, Calendar, Clock, DollarSign, Users, Shield, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Platform Infrastructure & Cloud Settings' }

export default async function DomainModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Platform Infrastructure & Cloud Settings"
        description="PostgreSQL connection pooling, Supabase Auth session TTL, multi-tenant backup snapshots, and security controls."
        breadcrumb={[{"label":"Super Admin","href":"/super-admin/dashboard"},{"label":"System Settings"}]}
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
          <span className="text-xs text-[#6b7280] font-medium">Database Pooling Mode</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">Transaction Pooler</p>
          <span className="text-[11px] text-[#6b7280]">PgBouncer on port 6543</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Session Inactivity TTL</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">7 Days</p>
          <span className="text-[11px] text-[#6b7280]">Auto-refreshing JWT token</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Database Backup Frequency</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">Every 6 Hours</p>
          <span className="text-[11px] text-[#6b7280]">Automated point-in-time recovery</span>
        </Card>
        <Card className="p-4 bg-white border border-[#e5e7eb]">
          <span className="text-xs text-[#6b7280] font-medium">Data Encryption Standard</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">AES-256 & TLS 1.3</p>
          <span className="text-[11px] text-[#6b7280]">Full encryption at rest & transit</span>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Core Infrastructure Services Status</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Real-time synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-3 font-semibold ">Service Component</th>
                <th className="py-2.5 px-3 font-semibold ">Cluster / Provider</th>
                <th className="py-2.5 px-3 font-semibold ">Host Endpoint</th>
                <th className="py-2.5 px-3 font-semibold ">Active Connections</th>
                <th className="py-2.5 px-3 font-semibold ">Health Status</th>
                <th className="py-2.5 px-3 font-semibold ">Last Latency Ping</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              
              <tr key="0" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">PostgreSQL Database Engine</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Primary Production DB</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Supabase Enterprise (AWS)</td>
                <td className="py-3 px-3 text-[#4b5563]">db.peoplecore-production.internal</td>
                <td className="py-3 px-3 text-[#4b5563]">48 / 200 connections</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Healthy (0.8ms)</td>
                <td className="py-3 px-3 text-[#111827] font-semibold"></td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    View Metrics
                  </Button>
                </td>
              </tr>
              <tr key="1" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Encrypted S3 Document Storage</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Personnel Document Vault</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">AWS S3 (Mumbai Region)</td>
                <td className="py-3 px-3 text-[#4b5563]">s3.ap-south-1.amazonaws.com/peoplecore-docs</td>
                <td className="py-3 px-3 text-[#4b5563]">2,400 documents</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Healthy (22ms)</td>
                <td className="py-3 px-3 text-[#111827] font-semibold"></td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Bucket Settings
                  </Button>
                </td>
              </tr>
              <tr key="2" className="hover:bg-[#f9fafb] transition-colors">
                <td className="py-3 px-4">
                  <p className="font-semibold text-xs text-[#111827]">Transactional Email Dispatcher</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">Resend / SMTP Gateway</p>
                </td>
                <td className="py-3 px-3 text-[#374151]">Dedicated Cloud SMTP</td>
                <td className="py-3 px-3 text-[#4b5563]">smtp.peoplecore.io (Port 587)</td>
                <td className="py-3 px-3 text-[#4b5563]">14,200 emails / mo</td>
                <td className="py-3 px-3 text-[#6b7280] font-mono text-[11px]">Healthy (99.9% delivery)</td>
                <td className="py-3 px-3 text-[#111827] font-semibold"></td>
                
                <td className="py-3 px-3 text-center">
                  <StatusBadge status="approved" />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs text-[#5e2b9d] border-purple-200 hover:bg-purple-50">
                    Test Dispatch
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
