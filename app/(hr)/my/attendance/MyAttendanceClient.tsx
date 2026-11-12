'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PunchWidget } from '@/components/attendance/PunchWidget'
import { StatusBadge } from '@/components/common/StatusBadge'
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
  Filter,
  ArrowUpRight,
} from 'lucide-react'

interface DayAttendance {
  date: string
  day: string
  shift: string
  checkIn: string | null
  checkOut: string | null
  totalHours: string
  status: 'present' | 'absent' | 'half_day' | 'on_leave' | 'weekend'
  isLate: boolean
}

const mockNovemberAttendance: DayAttendance[] = [
  {
    date: '10 Nov 2026',
    day: 'Tuesday',
    shift: 'General (09:00 - 18:00)',
    checkIn: '09:04 AM',
    checkOut: null,
    totalHours: '2h 45m (In Progress)',
    status: 'present',
    isLate: false,
  },
  {
    date: '09 Nov 2026',
    day: 'Monday',
    shift: 'General (09:00 - 18:00)',
    checkIn: '08:58 AM',
    checkOut: '06:12 PM',
    totalHours: '9h 14m',
    status: 'present',
    isLate: false,
  },
  {
    date: '08 Nov 2026',
    day: 'Sunday',
    shift: 'Weekly Off',
    checkIn: null,
    checkOut: null,
    totalHours: '--',
    status: 'weekend',
    isLate: false,
  },
  {
    date: '07 Nov 2026',
    day: 'Saturday',
    shift: 'Weekly Off',
    checkIn: null,
    checkOut: null,
    totalHours: '--',
    status: 'weekend',
    isLate: false,
  },
  {
    date: '06 Nov 2026',
    day: 'Friday',
    shift: 'General (09:00 - 18:00)',
    checkIn: '09:22 AM',
    checkOut: '06:30 PM',
    totalHours: '9h 08m',
    status: 'present',
    isLate: true,
  },
  {
    date: '05 Nov 2026',
    day: 'Thursday',
    shift: 'General (09:00 - 18:00)',
    checkIn: '09:01 AM',
    checkOut: '06:05 PM',
    totalHours: '9h 04m',
    status: 'present',
    isLate: false,
  },
  {
    date: '04 Nov 2026',
    day: 'Wednesday',
    shift: 'General (09:00 - 18:00)',
    checkIn: null,
    checkOut: null,
    totalHours: '--',
    status: 'on_leave',
    isLate: false,
  },
]

export function MyAttendanceClient() {
  const [records, setRecords] = React.useState<DayAttendance[]>(mockNovemberAttendance)
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null)

  const handleRegularize = (date: string) => {
    setSuccessMsg(`Regularization request submitted for ${date}! Sent to manager for approval.`)
    setTimeout(() => setSuccessMsg(null), 3500)
  }

  return (
    <div className="space-y-6">
      {successMsg && (
        <div className="bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534] px-4 py-2.5 rounded-[6px] text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-[#16a34a]" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Top Grid: Live Punch Widget + Monthly Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Interactive Punch Widget */}
        <div className="lg:col-span-1">
          <PunchWidget />
        </div>

        {/* Right: Summary KPIs */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="p-4 bg-white flex flex-col justify-between">
            <span className="text-xs text-[#6b7280] font-medium">Days Present</span>
            <p className="text-2xl font-bold text-[#111827] mt-1">7 / 8</p>
            <span className="text-[11px] text-[#16a34a] font-medium">87.5% attendance</span>
          </Card>
          <Card className="p-4 bg-white flex flex-col justify-between">
            <span className="text-xs text-[#6b7280] font-medium">Avg Work Hours</span>
            <p className="text-2xl font-bold text-[#5e2b9d] mt-1">9.1 hrs</p>
            <span className="text-[11px] text-[#6b7280]">Target: 8.5 hrs</span>
          </Card>
          <Card className="p-4 bg-white flex flex-col justify-between">
            <span className="text-xs text-[#6b7280] font-medium">Late Marks</span>
            <p className="text-2xl font-bold text-amber-600 mt-1">1 Day</p>
            <span className="text-[11px] text-[#9ca3af]">Grace limit: 3 / mo</span>
          </Card>
          <Card className="p-4 bg-white flex flex-col justify-between">
            <span className="text-xs text-[#6b7280] font-medium">Overtime Earned</span>
            <p className="text-2xl font-bold text-emerald-600 mt-1">2.5 hrs</p>
            <span className="text-[11px] text-[#16a34a]">Credited to payroll</span>
          </Card>
        </div>
      </div>

      {/* Monthly Punch Log */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">November 2026 Attendance Log</h3>
          </div>
          <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
            <Download className="h-3.5 w-3.5" /> Download Report
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-4 font-semibold">Date & Day</th>
                <th className="py-2.5 px-3 font-semibold">Assigned Shift</th>
                <th className="py-2.5 px-3 font-semibold">Check-In</th>
                <th className="py-2.5 px-3 font-semibold">Check-Out</th>
                <th className="py-2.5 px-3 font-semibold text-center">Gross Hours</th>
                <th className="py-2.5 px-3 font-semibold text-center">Status</th>
                <th className="py-2.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              {records.map((rec) => (
                <tr key={rec.date} className="hover:bg-[#f9fafb] transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-semibold text-xs text-[#111827] block">{rec.date}</span>
                    <span className="text-[11px] text-[#9ca3af]">{rec.day}</span>
                  </td>
                  <td className="py-3 px-3 text-[#374151]">{rec.shift}</td>
                  <td className="py-3 px-3">
                    {rec.checkIn ? (
                      <span className="inline-flex items-center gap-1 font-mono font-medium text-[#111827]">
                        {rec.checkIn}
                        {rec.isLate && (
                          <span className="text-[10px] bg-amber-50 text-amber-700 px-1 rounded font-sans">
                            Late
                          </span>
                        )}
                      </span>
                    ) : (
                      <span className="text-[#9ca3af]">--</span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    {rec.checkOut ? (
                      <span className="font-mono font-medium text-[#111827]">{rec.checkOut}</span>
                    ) : rec.status === 'present' ? (
                      <span className="text-emerald-600 font-medium animate-pulse">In Progress</span>
                    ) : (
                      <span className="text-[#9ca3af]">--</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-center font-medium text-[#111827]">
                    {rec.totalHours}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <StatusBadge status={rec.status} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    {rec.status === 'absent' || rec.isLate || !rec.checkIn ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRegularize(rec.date)}
                        className="h-7 text-[11px] text-[#5e2b9d] border-purple-200 hover:bg-purple-50"
                      >
                        Regularize
                      </Button>
                    ) : (
                      <span className="text-[11px] text-[#9ca3af]">Verified</span>
                    )}
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

