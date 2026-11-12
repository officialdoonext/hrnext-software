'use client'

import * as React from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils/currency'

interface AnalyticsProps {
  attendanceData?: { day: string; present: number; absent: number; leave: number }[]
  departmentData?: { name: string; count: number }[]
  payrollTrend?: { month: string; gross: number; net: number }[]
}

const DEFAULT_ATTENDANCE = [
  { day: 'Mon', present: 42, absent: 2, leave: 4 },
  { day: 'Tue', present: 45, absent: 1, leave: 2 },
  { day: 'Wed', present: 44, absent: 2, leave: 2 },
  { day: 'Thu', present: 46, absent: 1, leave: 1 },
  { day: 'Fri', present: 41, absent: 3, leave: 4 },
  { day: 'Sat', present: 18, absent: 1, leave: 2 },
]

const DEFAULT_DEPARTMENTS = [
  { name: 'Engineering', count: 24, fill: '#5e2b9d' },
  { name: 'Product & Design', count: 8, fill: '#7c4db8' },
  { name: 'Sales & Mktg', count: 12, fill: '#2563eb' },
  { name: 'HR & Ops', count: 6, fill: '#16a34a' },
  { name: 'Finance', count: 4, fill: '#d97706' },
]

const DEFAULT_PAYROLL = [
  { month: 'Jun', gross: 2850000, net: 2620000 },
  { month: 'Jul', gross: 2980000, net: 2740000 },
  { month: 'Aug', gross: 3120000, net: 2870000 },
  { month: 'Sep', gross: 3250000, net: 2990000 },
  { month: 'Oct', gross: 3400000, net: 3120000 },
  { month: 'Nov', gross: 3550000, net: 3260000 },
]

export function DashboardCharts({
  attendanceData = DEFAULT_ATTENDANCE,
  departmentData = DEFAULT_DEPARTMENTS,
  payrollTrend = DEFAULT_PAYROLL,
}: AnalyticsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Attendance Trends Bar Chart */}
      <Card className="lg:col-span-2">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Attendance Trends (Weekly)</CardTitle>
              <p className="text-xs text-[#6b7280]">Daily headcount breakdown across active shifts</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#6b7280]">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#5e2b9d]" /> Present
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#d97706]" /> On Leave
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#dc2626]" /> Absent
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f3f5" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={{ stroke: '#e5e7eb' }} />
                <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={{ stroke: '#e5e7eb' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    fontSize: '12px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  }}
                />
                <Bar dataKey="present" fill="#5e2b9d" radius={[4, 4, 0, 0]} barSize={22} />
                <Bar dataKey="leave" fill="#d97706" radius={[4, 4, 0, 0]} barSize={22} />
                <Bar dataKey="absent" fill="#dc2626" radius={[4, 4, 0, 0]} barSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Department Distribution Donut Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Department Headcount</CardTitle>
          <p className="text-xs text-[#6b7280]">Workforce distribution</p>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={3}
                  dataKey="count"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={(entry as any).fill || '#5e2b9d'} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    fontSize: '11px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 mt-2 pt-2 border-t border-[#f1f3f5] text-xs">
            {departmentData.map((d: any) => (
              <div key={d.name} className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#374151]">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.fill }} />
                  {d.name}
                </span>
                <span className="font-semibold text-[#111827]">{d.count} ({Math.round((d.count / 54) * 100)}%)</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

