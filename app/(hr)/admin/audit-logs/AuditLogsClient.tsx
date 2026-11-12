'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Download, Search, ShieldCheck, Filter, Clock, Globe } from 'lucide-react'

interface AuditLog {
  id: string
  timestamp: string
  actor: string
  role: string
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'APPROVE' | 'EXPORT'
  entity: string
  ipAddress: string
  details: string
}

const mockLogs: AuditLog[] = [
  {
    id: 'log-101',
    timestamp: '2026-11-10 11:45:12',
    actor: 'Vinay Vakati',
    role: 'hr_admin',
    action: 'APPROVE',
    entity: 'Payroll Run (Oct 2026)',
    ipAddress: '192.168.0.2',
    details: 'Locked and approved October 2026 payroll run with 50 payslips generated.',
  },
  {
    id: 'log-102',
    timestamp: '2026-11-10 10:14:05',
    actor: 'Rajesh Kumar',
    role: 'manager',
    action: 'APPROVE',
    entity: 'Leave Request #REQ-101',
    ipAddress: '103.21.14.88',
    details: 'Approved 3 days Earned Leave for Priya Sharma (PC-1002).',
  },
  {
    id: 'log-103',
    timestamp: '2026-11-10 09:30:22',
    actor: 'Vinay Vakati',
    role: 'hr_admin',
    action: 'CREATE',
    entity: 'Employee Record',
    ipAddress: '192.168.0.2',
    details: 'Created new employee master profile for Arjun Mehta (Designation: Lead Designer).',
  },
  {
    id: 'log-104',
    timestamp: '2026-11-09 17:40:50',
    actor: 'Sneha Patil',
    role: 'employee',
    action: 'UPDATE',
    entity: 'Timesheet (W45)',
    ipAddress: '49.207.201.12',
    details: 'Submitted 41.0 hours for Project Cloud DevOps.',
  },
  {
    id: 'log-105',
    timestamp: '2026-11-09 14:15:33',
    actor: 'System Automation',
    role: 'system',
    action: 'LOGIN',
    entity: 'Biometric Integration Gateway',
    ipAddress: '127.0.0.1',
    details: 'Successfully synced 342 punch records from RFID Turnstile Controller 1.',
  },
  {
    id: 'log-106',
    timestamp: '2026-11-08 16:22:18',
    actor: 'Vinay Vakati',
    role: 'hr_admin',
    action: 'EXPORT',
    entity: 'Employee Reports',
    ipAddress: '192.168.0.2',
    details: 'Exported active workforce Excel report (50 records).',
  },
]

export function AuditLogsClient() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [filterAction, setFilterAction] = React.useState<string>('ALL')

  const filtered = mockLogs.filter((log) => {
    const matchesSearch =
      log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesAction = filterAction === 'ALL' || log.action === filterAction
    return matchesSearch && matchesAction
  })

  const getActionBadge = (action: AuditLog['action']) => {
    switch (action) {
      case 'CREATE':
        return <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded text-[10px]">CREATE</span>
      case 'UPDATE':
        return <span className="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded text-[10px]">UPDATE</span>
      case 'APPROVE':
        return <span className="bg-purple-50 text-[#5e2b9d] font-bold px-2 py-0.5 rounded text-[10px]">APPROVE</span>
      case 'DELETE':
        return <span className="bg-red-50 text-[#dc2626] font-bold px-2 py-0.5 rounded text-[10px]">DELETE</span>
      case 'EXPORT':
        return <span className="bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded text-[10px]">EXPORT</span>
      case 'LOGIN':
        return <span className="bg-gray-100 text-gray-700 font-bold px-2 py-0.5 rounded text-[10px]">AUTH</span>
    }
  }

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 border border-[#e5e7eb] rounded-[8px]">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9ca3af]" />
          <input
            type="text"
            placeholder="Search audit trail by actor, entity, description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-[#e5e7eb] rounded-[6px] focus:outline-none focus:border-[#5e2b9d]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="text-xs border border-[#e5e7eb] rounded-[6px] px-2.5 py-1.5 bg-white text-[#374151] focus:outline-none focus:border-[#5e2b9d]"
          >
            <option value="ALL">All Event Types</option>
            <option value="CREATE">CREATE</option>
            <option value="UPDATE">UPDATE</option>
            <option value="APPROVE">APPROVE</option>
            <option value="EXPORT">EXPORT</option>
            <option value="LOGIN">AUTH / LOGIN</option>
          </select>

          <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
            <Download className="h-3.5 w-3.5" /> Export Audit Log
          </Button>
        </div>
      </div>

      {/* Audit Log Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-[#f9fafb] text-[#6b7280] text-left">
                <th className="py-2.5 px-4 font-semibold w-40">Timestamp</th>
                <th className="py-2.5 px-3 font-semibold">User / Actor</th>
                <th className="py-2.5 px-2 font-semibold text-center w-20">Action</th>
                <th className="py-2.5 px-3 font-semibold">Target Entity</th>
                <th className="py-2.5 px-4 font-semibold">Activity Details</th>
                <th className="py-2.5 px-3 font-semibold text-right w-28">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-[#f9fafb] transition-colors">
                  <td className="py-3 px-4 font-mono text-[11px] text-[#6b7280] whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <Avatar name={log.actor} size="sm" />
                      <div>
                        <p className="font-semibold text-xs text-[#111827]">{log.actor}</p>
                        <p className="text-[10px] text-[#9ca3af] capitalize">{log.role.replace('_', ' ')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-center">{getActionBadge(log.action)}</td>
                  <td className="py-3 px-3 font-semibold text-[#111827]">{log.entity}</td>
                  <td className="py-3 px-4 text-[#4b5563]">{log.details}</td>
                  <td className="py-3 px-3 text-right font-mono text-[11px] text-[#9ca3af]">
                    {log.ipAddress}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

