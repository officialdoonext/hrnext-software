'use client'

import * as React from 'react'
import Link from 'next/link'
import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Eye, Pencil, UserX, Mail, Phone } from 'lucide-react'
import { DataTable } from '@/components/data-table/DataTable'
import { Avatar } from '@/components/common/Avatar'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { formatDate } from '@/lib/utils/date'
import { exportToExcel, exportToCSV } from '@/lib/utils/export'
import { Download, FileDown } from 'lucide-react'

type EmployeeRow = {
  id: string
  employee_id: string
  first_name: string
  middle_name?: string | null
  last_name: string
  photo_url?: string | null
  joining_date: string
  employment_type: string
  employment_status: string
  work_email?: string | null
  mobile?: string | null
  departments?: { name: string } | null
  designations?: { name: string } | null
  branches?: { name: string } | null
  reporting_manager?: { first_name: string; last_name: string } | null
}

function getFullName(emp: EmployeeRow) {
  return [emp.first_name, emp.middle_name, emp.last_name].filter(Boolean).join(' ')
}

const columns: ColumnDef<EmployeeRow>[] = [
  {
    id: 'employee',
    header: 'Employee',
    cell: ({ row }) => {
      const emp = row.original
      return (
        <div className="flex items-center gap-2.5">
          <Avatar
            name={getFullName(emp)}
            photoUrl={emp.photo_url}
            size="sm"
          />
          <div>
            <Link
              href={`/employees/${emp.id}`}
              className="text-sm font-medium text-[#111827] hover:text-[#5e2b9d] transition-colors"
            >
              {getFullName(emp)}
            </Link>
            <p className="text-xs text-[#9ca3af]">{emp.employee_id}</p>
          </div>
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorFn: (row) => row.departments?.name,
    id: 'department',
    header: 'Department',
    cell: ({ getValue }) => (
      <span className="text-sm text-[#374151]">{(getValue() as string) ?? '—'}</span>
    ),
  },
  {
    accessorFn: (row) => row.designations?.name,
    id: 'designation',
    header: 'Designation',
    cell: ({ getValue }) => (
      <span className="text-sm text-[#374151]">{(getValue() as string) ?? '—'}</span>
    ),
  },
  {
    accessorFn: (row) => row.branches?.name,
    id: 'branch',
    header: 'Branch',
    cell: ({ getValue }) => (
      <span className="text-sm text-[#374151]">{(getValue() as string) ?? '—'}</span>
    ),
  },
  {
    accessorKey: 'joining_date',
    header: 'Joining Date',
    cell: ({ getValue }) => (
      <span className="text-sm text-[#374151]">{formatDate(getValue() as string)}</span>
    ),
  },
  {
    accessorFn: (row) =>
      row.reporting_manager
        ? `${row.reporting_manager.first_name} ${row.reporting_manager.last_name}`
        : null,
    id: 'reporting_manager',
    header: 'Reporting Manager',
    cell: ({ getValue }) => (
      <span className="text-sm text-[#374151]">{(getValue() as string) ?? '—'}</span>
    ),
  },
  {
    accessorKey: 'employment_type',
    header: 'Type',
    cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
  },
  {
    accessorKey: 'employment_status',
    header: 'Status',
    cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
  },
  {
    id: 'actions',
    header: '',
    size: 50,
    cell: ({ row }) => {
      const emp = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/employees/${emp.id}`}>
                <Eye className="h-3.5 w-3.5" />
                View Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/employees/${emp.id}/edit`}>
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </Link>
            </DropdownMenuItem>
            {emp.work_email && (
              <DropdownMenuItem>
                <Mail className="h-3.5 w-3.5" />
                Send Email
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem destructive>
              <UserX className="h-3.5 w-3.5" />
              Deactivate
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    enableSorting: false,
  },
]

export function EmployeeTable({ data }: { data: EmployeeRow[] }) {
  const handleExport = (format: 'excel' | 'csv') => {
    const exportData = data.map((emp) => ({
      'Employee ID': emp.employee_id,
      'Full Name': getFullName(emp),
      'Department': emp.departments?.name ?? '',
      'Designation': emp.designations?.name ?? '',
      'Branch': emp.branches?.name ?? '',
      'Joining Date': formatDate(emp.joining_date),
      'Employment Type': emp.employment_type,
      'Status': emp.employment_status,
      'Email': emp.work_email ?? '',
      'Mobile': emp.mobile ?? '',
    }))
    if (format === 'excel') exportToExcel(exportData, 'employees')
    else exportToCSV(exportData, 'employees')
  }

  return (
    <DataTable
      columns={columns}
      data={data}
      searchPlaceholder="Search by name, ID, department..."
      toolbar={
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="sm">
              <Download className="h-3.5 w-3.5" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleExport('excel')}>
              <FileDown className="h-3.5 w-3.5" />
              Export as Excel
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('csv')}>
              <FileDown className="h-3.5 w-3.5" />
              Export as CSV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      }
    />
  )
}

