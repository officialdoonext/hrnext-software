'use client'

import * as React from 'react'
import { Download, FileDown, Filter, Search, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { StatusBadge } from '@/components/common/StatusBadge'
import { exportToExcel, exportToCSV } from '@/lib/utils/export'
import { formatDate } from '@/lib/utils/date'

export function EmployeeReportsClient({ employees }: { employees: any[] }) {
  const [departmentFilter, setDepartmentFilter] = React.useState<string>('all')
  const [statusFilter, setStatusFilter] = React.useState<string>('all')
  const [search, setSearch] = React.useState<string>('')

  // Unique departments for filter dropdown
  const departments = Array.from(new Set(employees.map((e) => e.departments?.name).filter(Boolean)))

  const filtered = employees.filter((e) => {
    const fullName = `${e.first_name} ${e.last_name}`.toLowerCase()
    const matchesSearch = fullName.includes(search.toLowerCase()) || e.employee_id.toLowerCase().includes(search.toLowerCase())
    const matchesDept = departmentFilter === 'all' || e.departments?.name === departmentFilter
    const matchesStatus = statusFilter === 'all' || e.employment_status === statusFilter
    return matchesSearch && matchesDept && matchesStatus
  })

  const handleExport = (format: 'excel' | 'csv') => {
    const dataToExport = filtered.map((e) => ({
      'Employee ID': e.employee_id,
      'Full Name': [e.first_name, e.middle_name, e.last_name].filter(Boolean).join(' '),
      'Department': e.departments?.name ?? '—',
      'Designation': e.designations?.name ?? '—',
      'Branch': e.branches?.name ?? '—',
      'Joining Date': formatDate(e.joining_date),
      'Employment Type': e.employment_type,
      'Status': e.employment_status,
      'Work Email': e.work_email ?? '—',
      'Mobile': e.mobile ?? '—',
      'Gender': e.gender ?? '—',
    }))

    if (format === 'excel') {
      exportToExcel(dataToExport, `employee_master_${new Date().toISOString().split('T')[0]}`)
    } else {
      exportToCSV(dataToExport, `employee_master_${new Date().toISOString().split('T')[0]}`)
    }
  }

  return (
    <div>
      {/* Filters Strip */}
      <Card className="mb-6">
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full sm:w-auto flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9ca3af]" />
                <Input
                  placeholder="Search by name or ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 h-8 text-xs"
                />
              </div>

              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="All Departments" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="All Statuses" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="on_leave">On Leave</SelectItem>
                  <SelectItem value="terminated">Terminated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button size="sm" variant="secondary" onClick={() => handleExport('excel')}>
                <FileDown className="h-3.5 w-3.5 mr-1" /> Export Excel
              </Button>
              <Button size="sm" variant="secondary" onClick={() => handleExport('csv')}>
                <Download className="h-3.5 w-3.5 mr-1" /> Export CSV
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Table */}
      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle>Workforce Data Records ({filtered.length})</CardTitle>
          <span className="text-xs text-[#9ca3af]">
            Showing matching records from database
          </span>
        </CardHeader>
        <CardContent className="pt-0 p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#f8f9fa] border-b border-[#e5e7eb] text-[#6b7280] font-semibold text-left">
                  <th className="py-2.5 px-4">Employee ID</th>
                  <th className="py-2.5 px-4">Name</th>
                  <th className="py-2.5 px-4">Department</th>
                  <th className="py-2.5 px-4">Designation</th>
                  <th className="py-2.5 px-4">Branch</th>
                  <th className="py-2.5 px-4">Joining Date</th>
                  <th className="py-2.5 px-4">Type</th>
                  <th className="py-2.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f3f5]">
                {filtered.map((emp) => (
                  <tr key={emp.id} className="hover:bg-[#fafafa]">
                    <td className="py-3 px-4 font-mono font-medium text-[#5e2b9d]">{emp.employee_id}</td>
                    <td className="py-3 px-4 font-semibold text-[#111827]">
                      {[emp.first_name, emp.middle_name, emp.last_name].filter(Boolean).join(' ')}
                    </td>
                    <td className="py-3 px-4 text-[#374151]">{emp.departments?.name ?? '—'}</td>
                    <td className="py-3 px-4 text-[#374151]">{emp.designations?.name ?? '—'}</td>
                    <td className="py-3 px-4 text-[#374151]">{emp.branches?.name ?? '—'}</td>
                    <td className="py-3 px-4 text-[#6b7280]">{formatDate(emp.joining_date)}</td>
                    <td className="py-3 px-4 capitalize text-[#6b7280]">{emp.employment_type?.replace('_', ' ')}</td>
                    <td className="py-3 px-4"><StatusBadge status={emp.employment_status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

