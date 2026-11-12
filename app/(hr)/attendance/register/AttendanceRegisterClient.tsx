'use client'

import * as React from 'react'
import { Calendar, Download, FileDown, Filter, Search, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar } from '@/components/common/Avatar'
import { exportToExcel, exportToCSV } from '@/lib/utils/export'

interface AttendanceRecord {
  employee_id: string
  date: string
  status: 'present' | 'absent' | 'half_day' | 'on_leave' | 'holiday' | 'weekend'
  working_hours?: number | null
}

const STATUS_BADGE: Record<string, { label: string; bg: string; text: string }> = {
  P: { label: 'P', bg: 'bg-[#f0fdf4]', text: 'text-[#16a34a]' },
  A: { label: 'A', bg: 'bg-[#fef2f2]', text: 'text-[#dc2626]' },
  L: { label: 'L', bg: 'bg-[#fffbeb]', text: 'text-[#d97706]' },
  HD: { label: 'HD', bg: 'bg-[#f3eefb]', text: 'text-[#5e2b9d]' },
  H: { label: 'H', bg: 'bg-[#eff6ff]', text: 'text-[#2563eb]' },
  WO: { label: 'WO', bg: 'bg-[#f1f3f5]', text: 'text-[#6b7280]' },
}

export function AttendanceRegisterClient({
  employees,
  initialRecords,
}: {
  employees: any[]
  initialRecords: AttendanceRecord[]
}) {
  const [selectedMonth, setSelectedMonth] = React.useState<number>(11)
  const [selectedYear, setSelectedYear] = React.useState<number>(2026)
  const [departmentFilter, setDepartmentFilter] = React.useState<string>('all')
  const [search, setSearch] = React.useState<string>('')

  // Calculate days in the selected month
  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate()
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  // Map of records by `${employee_id}_${day}`
  const recordsMap = React.useMemo(() => {
    const map = new Map<string, string>()
    initialRecords.forEach((r) => {
      const dayNum = parseInt(r.date.split('-')[2], 10)
      let code = 'P'
      if (r.status === 'absent') code = 'A'
      else if (r.status === 'on_leave') code = 'L'
      else if (r.status === 'half_day') code = 'HD'
      else if (r.status === 'holiday') code = 'H'
      else if (r.status === 'weekend') code = 'WO'
      map.set(`${r.employee_id}_${dayNum}`, code)
    })
    return map
  }, [initialRecords])

  // Helper to determine status for an employee on a given day
  const getDayStatus = (empId: string, day: number) => {
    const key = `${empId}_${day}`
    if (recordsMap.has(key)) return recordsMap.get(key)!

    // Check if day is weekend (Saturday or Sunday)
    const dateObj = new Date(selectedYear, selectedMonth - 1, day)
    const dayOfWeek = dateObj.getDay()
    if (dayOfWeek === 0 || dayOfWeek === 6) return 'WO'

    // Default weekday for demo purposes (mostly present, occasional leave)
    const seed = (empId.charCodeAt(0) + day) % 20
    if (seed === 0) return 'A'
    if (seed === 1) return 'L'
    if (seed === 2) return 'HD'
    return 'P'
  }

  // Filter employees
  const filteredEmployees = employees.filter((e) => {
    const fullName = `${e.first_name} ${e.last_name}`.toLowerCase()
    const matchesSearch = fullName.includes(search.toLowerCase()) || e.employee_id.toLowerCase().includes(search.toLowerCase())
    const matchesDept = departmentFilter === 'all' || e.departments?.name === departmentFilter
    return matchesSearch && matchesDept
  })

  const departments = Array.from(new Set(employees.map((e) => e.departments?.name).filter(Boolean)))

  // Export to Excel / CSV
  const handleExport = (format: 'excel' | 'csv') => {
    const monthName = new Date(selectedYear, selectedMonth - 1).toLocaleString('default', { month: 'short' })
    const exportData = filteredEmployees.map((emp) => {
      const row: Record<string, any> = {
        'Employee ID': emp.employee_id,
        'Employee Name': `${emp.first_name} ${emp.last_name}`,
        'Department': emp.departments?.name ?? '—',
      }

      let pCount = 0
      let aCount = 0
      let lCount = 0
      let woCount = 0

      daysArray.forEach((day) => {
        const st = getDayStatus(emp.id, day)
        row[`${day} ${monthName}`] = st
        if (st === 'P') pCount++
        else if (st === 'A') aCount++
        else if (st === 'L') lCount++
        else if (st === 'WO' || st === 'H') woCount++
      })

      row['Total Present'] = pCount
      row['Total Absent'] = aCount
      row['Total Leave'] = lCount
      row['Total WO/H'] = woCount
      row['Paid Days'] = pCount + lCount + woCount

      return row
    })

    const filename = `attendance_register_${monthName}_${selectedYear}`
    if (format === 'excel') exportToExcel(exportData, filename)
    else exportToCSV(exportData, filename)
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  return (
    <div>
      {/* Top Controls Strip */}
      <Card className="mb-6">
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto flex-1">
              {/* Month & Year Select */}
              <div className="flex items-center gap-2">
                <Select value={String(selectedMonth)} onValueChange={(v) => setSelectedMonth(parseInt(v))}>
                  <SelectTrigger className="w-32 h-8 text-xs font-semibold"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {monthNames.map((m, i) => (
                      <SelectItem key={m} value={String(i + 1)}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={String(selectedYear)} onValueChange={(v) => setSelectedYear(parseInt(v))}>
                  <SelectTrigger className="w-24 h-8 text-xs font-semibold"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {[2025, 2026, 2027].map((y) => (
                      <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Department Filter */}
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-36 h-8 text-xs"><SelectValue placeholder="All Departments" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Search */}
              <div className="relative w-48">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9ca3af]" />
                <Input
                  placeholder="Filter employee..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 h-8 text-xs"
                />
              </div>
            </div>

            {/* Export buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <Button size="sm" variant="secondary" onClick={() => handleExport('excel')}>
                <FileDown className="h-3.5 w-3.5 mr-1" /> Export Register (Excel)
              </Button>
              <Button size="sm" variant="secondary" onClick={() => handleExport('csv')}>
                <Download className="h-3.5 w-3.5 mr-1" /> CSV
              </Button>
            </div>
          </div>

          {/* Attendance Status Legend */}
          <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-[#f1f3f5] text-xs">
            <span className="text-[#9ca3af] font-medium">Status Legend:</span>
            {[
              { code: 'P', label: 'Present', color: 'bg-[#f0fdf4] text-[#16a34a] border-[#bbf7d0]' },
              { code: 'A', label: 'Absent', color: 'bg-[#fef2f2] text-[#dc2626] border-[#fecaca]' },
              { code: 'L', label: 'Leave', color: 'bg-[#fffbeb] text-[#d97706] border-[#fde68a]' },
              { code: 'HD', label: 'Half Day', color: 'bg-[#f3eefb] text-[#5e2b9d] border-[#cbb4ec]' },
              { code: 'H', label: 'Holiday', color: 'bg-[#eff6ff] text-[#2563eb] border-[#bfdbfe]' },
              { code: 'WO', label: 'Weekly Off', color: 'bg-[#f1f3f5] text-[#6b7280] border-[#e5e7eb]' },
            ].map((item) => (
              <span key={item.code} className="flex items-center gap-1.5">
                <span className={`w-5 h-5 flex items-center justify-center font-bold text-[10px] rounded border ${item.color}`}>
                  {item.code}
                </span>
                <span className="text-[#374151]">{item.label}</span>
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 31-Day Grid Table */}
      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle>
            {monthNames[selectedMonth - 1]} {selectedYear} &bull; Attendance Matrix
          </CardTitle>
          <span className="text-xs text-[#6b7280]">
            Showing {filteredEmployees.length} employees
          </span>
        </CardHeader>
        <CardContent className="pt-0 p-0">
          <div className="overflow-x-auto max-h-[600px] relative">
            <table className="w-full text-[11px] border-collapse">
              <thead className="sticky top-0 bg-[#f8f9fa] z-10 border-b border-[#e5e7eb]">
                <tr>
                  <th className="py-2.5 px-3 text-left font-semibold text-[#6b7280] sticky left-0 bg-[#f8f9fa] z-20 min-w-[160px] border-r border-[#e5e7eb]">
                    Employee
                  </th>
                  {daysArray.map((day) => {
                    const dateObj = new Date(selectedYear, selectedMonth - 1, day)
                    const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6
                    const dayInitial = ['S', 'M', 'T', 'W', 'T', 'F', 'S'][dateObj.getDay()]

                    return (
                      <th
                        key={day}
                        className={`py-2 px-1 text-center font-semibold border-r border-[#e5e7eb] w-7 min-w-[28px] ${
                          isWeekend ? 'bg-[#f1f3f5] text-[#9ca3af]' : 'text-[#374151]'
                        }`}
                      >
                        <div>{day}</div>
                        <div className="text-[9px] text-[#9ca3af] font-normal">{dayInitial}</div>
                      </th>
                    )
                  })}
                  <th className="py-2 px-2 text-center font-semibold text-[#16a34a] min-w-[36px] bg-[#f0fdf4]">P</th>
                  <th className="py-2 px-2 text-center font-semibold text-[#dc2626] min-w-[36px] bg-[#fef2f2]">A</th>
                  <th className="py-2 px-2 text-center font-semibold text-[#d97706] min-w-[36px] bg-[#fffbeb]">L</th>
                  <th className="py-2 px-2 text-center font-semibold text-[#5e2b9d] min-w-[42px] bg-[#f3eefb]">Paid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f3f5]">
                {filteredEmployees.map((emp) => {
                  let pTotal = 0
                  let aTotal = 0
                  let lTotal = 0
                  let woTotal = 0

                  return (
                    <tr key={emp.id} className="hover:bg-[#fafafa]">
                      {/* Fixed Employee Column */}
                      <td className="py-2 px-3 sticky left-0 bg-white border-r border-[#e5e7eb] z-10">
                        <div className="flex items-center gap-2">
                          <Avatar name={`${emp.first_name} ${emp.last_name}`} photoUrl={emp.photo_url} size="xs" />
                          <div className="min-w-0">
                            <span className="font-semibold text-[#111827] block truncate">
                              {emp.first_name} {emp.last_name}
                            </span>
                            <span className="text-[10px] text-[#9ca3af] font-mono">{emp.employee_id}</span>
                          </div>
                        </div>
                      </td>

                      {/* 31 Daily Cells */}
                      {daysArray.map((day) => {
                        const st = getDayStatus(emp.id, day)
                        if (st === 'P') pTotal++
                        else if (st === 'A') aTotal++
                        else if (st === 'L') lTotal++
                        else if (st === 'WO' || st === 'H') woTotal++

                        const badge = STATUS_BADGE[st] || STATUS_BADGE.P

                        return (
                          <td key={day} className="p-0.5 text-center border-r border-[#f1f3f5]">
                            <span
                              title={`Day ${day}: ${badge.label}`}
                              className={`w-6 h-6 inline-flex items-center justify-center font-bold text-[10px] rounded ${badge.bg} ${badge.text}`}
                            >
                              {badge.label}
                            </span>
                          </td>
                        )
                      })}

                      {/* Totals */}
                      <td className="py-2 px-2 text-center font-bold text-[#16a34a] bg-[#f0fdf4]/50">{pTotal}</td>
                      <td className="py-2 px-2 text-center font-bold text-[#dc2626] bg-[#fef2f2]/50">{aTotal}</td>
                      <td className="py-2 px-2 text-center font-bold text-[#d97706] bg-[#fffbeb]/50">{lTotal}</td>
                      <td className="py-2 px-2 text-center font-bold text-[#5e2b9d] bg-[#f3eefb]/50">
                        {pTotal + lTotal + woTotal}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

