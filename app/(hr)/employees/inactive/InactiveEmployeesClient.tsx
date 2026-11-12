'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/common/Avatar'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Download, RefreshCw, CheckCircle2, UserX, Search } from 'lucide-react'

interface InactiveEmployee {
  id: string
  name: string
  empId: string
  department: string
  designation: string
  separationType: 'Resigned' | 'Retired' | 'Sabbatical' | 'Terminated'
  joiningDate: string
  lastWorkingDay: string
  fnfStatus: 'Settled' | 'Pending'
}

const mockInactive: InactiveEmployee[] = [
  {
    id: 'emp-in-1',
    name: 'Rohan Gupta',
    empId: 'PC-1007',
    department: 'Engineering',
    designation: 'Backend Developer',
    separationType: 'Resigned',
    joiningDate: '10 Jan 2024',
    lastWorkingDay: '15 Oct 2026',
    fnfStatus: 'Settled',
  },
  {
    id: 'emp-in-2',
    name: 'Ananya Roy',
    empId: 'PC-1011',
    department: 'Marketing',
    designation: 'Content Lead',
    separationType: 'Sabbatical',
    joiningDate: '01 Jun 2023',
    lastWorkingDay: '01 Aug 2026',
    fnfStatus: 'Pending',
  },
  {
    id: 'emp-in-3',
    name: 'Deepak Varma',
    empId: 'PC-0994',
    department: 'Operations',
    designation: 'Facilities Director',
    separationType: 'Retired',
    joiningDate: '15 Mar 2018',
    lastWorkingDay: '31 Aug 2026',
    fnfStatus: 'Settled',
  },
]

export function InactiveEmployeesClient() {
  const [employees, setEmployees] = React.useState<InactiveEmployee[]>(mockInactive)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null)

  const handleReactivate = (id: string, name: string) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id))
    setSuccessMsg(`Employee ${name} has been reinstated and activated!`)
    setTimeout(() => setSuccessMsg(null), 3000)
  }

  const filtered = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {successMsg && (
        <div className="bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534] px-4 py-2.5 rounded-[6px] text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-[#16a34a]" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 border border-[#e5e7eb] rounded-[8px]">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9ca3af]" />
          <input
            type="text"
            placeholder="Search alumni by name, ID, department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-[#e5e7eb] rounded-[6px] focus:outline-none focus:border-[#5e2b9d]"
          />
        </div>

        <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
          <Download className="h-3.5 w-3.5" /> Export Alumni Register
        </Button>
      </div>

      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-[#f9fafb] text-[#6b7280] text-left">
                <th className="py-2.5 px-4 font-semibold">Exited Employee</th>
                <th className="py-2.5 px-3 font-semibold">Department & Role</th>
                <th className="py-2.5 px-2 font-semibold text-center">Type</th>
                <th className="py-2.5 px-3 font-semibold">Tenure</th>
                <th className="py-2.5 px-3 font-semibold">Last Working Day</th>
                <th className="py-2.5 px-2 font-semibold text-center">F&F Settlement</th>
                <th className="py-2.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              {filtered.map((emp) => (
                <tr key={emp.id} className="hover:bg-[#f9fafb] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Avatar name={emp.name} size="sm" />
                      <div>
                        <p className="font-semibold text-xs text-[#111827]">{emp.name}</p>
                        <p className="text-[10px] font-mono text-[#9ca3af]">{emp.empId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <p className="font-medium text-[#111827]">{emp.designation}</p>
                    <p className="text-[11px] text-[#6b7280]">{emp.department}</p>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        emp.separationType === 'Resigned'
                          ? 'bg-amber-50 text-amber-700'
                          : emp.separationType === 'Retired'
                          ? 'bg-purple-50 text-[#5e2b9d]'
                          : emp.separationType === 'Sabbatical'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-red-50 text-[#dc2626]'
                      }`}
                    >
                      {emp.separationType}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[#6b7280]">
                    {emp.joiningDate} – {emp.lastWorkingDay}
                  </td>
                  <td className="py-3 px-3 font-medium text-[#111827]">{emp.lastWorkingDay}</td>
                  <td className="py-3 px-2 text-center">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        emp.fnfStatus === 'Settled'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-gray-100 text-[#6b7280]'
                      }`}
                    >
                      {emp.fnfStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReactivate(emp.id, emp.name)}
                      className="h-7 text-xs gap-1 text-[#5e2b9d] border-purple-200 hover:bg-purple-50"
                    >
                      <RefreshCw className="h-3 w-3" /> Reinstate
                    </Button>
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

