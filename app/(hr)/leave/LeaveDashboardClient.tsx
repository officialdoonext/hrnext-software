'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import {
  PalmtreeIcon,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowRight,
  Users,
  Sun,
  ShieldCheck,
} from 'lucide-react'

interface OnLeaveToday {
  id: string
  name: string
  empId: string
  department: string
  leaveType: string
  duration: string
  status: 'approved' | 'pending'
}

const onLeaveTodayList: OnLeaveToday[] = [
  {
    id: 'l-1',
    name: 'Priya Sharma',
    empId: 'PC-1002',
    department: 'Engineering',
    leaveType: 'Earned Leave (EL)',
    duration: '10 Nov – 12 Nov (3 days)',
    status: 'approved',
  },
  {
    id: 'l-2',
    name: 'Vikram Joshi',
    empId: 'PC-1014',
    department: 'Sales',
    leaveType: 'Casual Leave (CL)',
    duration: '10 Nov (1 day)',
    status: 'approved',
  },
  {
    id: 'l-3',
    name: 'Kavita Nair',
    empId: 'PC-1022',
    department: 'Marketing',
    leaveType: 'Sick Leave (SL)',
    duration: '09 Nov – 11 Nov (3 days)',
    status: 'approved',
  },
]

const upcomingHolidays = [
  { name: 'Diwali (Deepavali)', date: '14 Nov 2026', day: 'Saturday', type: 'Mandatory' },
  { name: 'Guru Nanak Jayanti', date: '24 Nov 2026', day: 'Tuesday', type: 'Restricted' },
  { name: 'Christmas Day', date: '25 Dec 2026', day: 'Friday', type: 'Mandatory' },
]

export function LeaveDashboardClient() {
  return (
    <div className="space-y-6">
      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-4 bg-white">
          <span className="text-xs text-[#6b7280] font-medium">On Leave Today</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">{onLeaveTodayList.length} Employees</p>
          <span className="text-[11px] text-[#6b7280]">6% of total workforce</span>
        </Card>
        <Card className="p-4 bg-white">
          <span className="text-xs text-[#6b7280] font-medium">Pending Approvals</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">4 Requests</p>
          <Link href="/leave/approvals" className="text-[11px] text-[#5e2b9d] hover:underline flex items-center gap-1 mt-0.5">
            Review inbox <ArrowRight className="h-2.5 w-2.5" />
          </Link>
        </Card>
        <Card className="p-4 bg-white">
          <span className="text-xs text-[#6b7280] font-medium">Avg Annual Balance</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">14.8 Days</p>
          <span className="text-[11px] text-[#6b7280]">Per active employee</span>
        </Card>
        <Card className="p-4 bg-white">
          <span className="text-xs text-[#6b7280] font-medium">Next Public Holiday</span>
          <p className="text-base font-bold text-[#111827] mt-1 truncate">Diwali (14 Nov)</p>
          <span className="text-[11px] text-[#9ca3af]">In 4 days</span>
        </Card>
      </div>

      {/* Main Grid: Out Today + Upcoming Holidays */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Who is out today */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="overflow-hidden border border-[#e5e7eb]">
            <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-amber-500" />
                <h3 className="text-sm font-semibold text-[#111827]">Employees on Leave Today</h3>
              </div>
              <span className="text-xs text-[#6b7280]">
                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            <div className="divide-y divide-[#e5e7eb]">
              {onLeaveTodayList.map((emp) => (
                <div key={emp.id} className="p-4 flex items-center justify-between hover:bg-[#f9fafb] transition-colors">
                  <div className="flex items-center gap-3">
                    <Avatar name={emp.name} size="sm" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-[#111827]">{emp.name}</span>
                        <span className="text-[10px] font-mono text-[#6b7280]">({emp.empId})</span>
                        <span className="text-xs text-[#9ca3af]">•</span>
                        <span className="text-xs text-[#6b7280]">{emp.department}</span>
                      </div>
                      <p className="text-xs text-[#5e2b9d] font-medium mt-0.5">
                        {emp.leaveType} • <span className="text-[#6b7280] font-normal">{emp.duration}</span>
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={emp.status} />
                </div>
              ))}
            </div>

            <div className="p-3 bg-[#fdfdfd] border-t border-[#e5e7eb] flex items-center justify-between text-xs">
              <span className="text-[#6b7280]">Need time off?</span>
              <Link href="/my/leave">
                <Button size="sm" variant="outline" className="h-7 text-xs gap-1 text-[#5e2b9d]">
                  <Plus className="h-3 w-3" /> Apply for Leave
                </Button>
              </Link>
            </div>
          </Card>

          {/* Leave Policies Overview */}
          <Card className="p-4 border border-[#e5e7eb]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-[#111827]">Standard Leave Quotas</h3>
              <Link href="/leave/types" className="text-xs text-[#5e2b9d] hover:underline">
                Configure Quotas
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-[#f9fafb] rounded-[6px] border border-[#f3f4f6]">
                <p className="text-xs font-semibold text-[#111827]">Earned Leave (EL)</p>
                <p className="text-xl font-bold text-[#5e2b9d] mt-1">18 Days</p>
                <p className="text-[10px] text-[#9ca3af]">1.5 accrued / month • Max carry 10</p>
              </div>
              <div className="p-3 bg-[#f9fafb] rounded-[6px] border border-[#f3f4f6]">
                <p className="text-xs font-semibold text-[#111827]">Casual Leave (CL)</p>
                <p className="text-xl font-bold text-blue-600 mt-1">12 Days</p>
                <p className="text-[10px] text-[#9ca3af]">Lapses at financial year end</p>
              </div>
              <div className="p-3 bg-[#f9fafb] rounded-[6px] border border-[#f3f4f6]">
                <p className="text-xs font-semibold text-[#111827]">Sick Leave (SL)</p>
                <p className="text-xl font-bold text-emerald-600 mt-1">12 Days</p>
                <p className="text-[10px] text-[#9ca3af]">Medical certificate required &gt; 2 days</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Col: Public Holidays Calendar */}
        <div className="space-y-4">
          <Card className="p-4 border border-[#e5e7eb]">
            <div className="flex items-center justify-between border-b border-[#e5e7eb] pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#5e2b9d]" />
                <h3 className="text-sm font-semibold text-[#111827]">Upcoming Holidays</h3>
              </div>
              <span className="text-xs text-[#9ca3af]">Q4 2026</span>
            </div>

            <div className="space-y-3">
              {upcomingHolidays.map((hol) => (
                <div
                  key={hol.name}
                  className="p-3 rounded-[6px] bg-[#f9fafb] border border-[#e5e7eb] flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-semibold text-[#111827]">{hol.name}</p>
                    <p className="text-[11px] text-[#6b7280]">
                      {hol.date} ({hol.day})
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                      hol.type === 'Mandatory'
                        ? 'bg-purple-50 text-[#5e2b9d]'
                        : 'bg-gray-100 text-[#4b5563]'
                    }`}
                  >
                    {hol.type}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

