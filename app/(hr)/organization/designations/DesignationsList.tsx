'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Pencil, Trash2, Users } from 'lucide-react'
import { DataTable } from '@/components/data-table/DataTable'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'

type DesignationRow = {
  id: string
  name: string
  code: string | null
  level: number | null
  status: string
  employee_count: number
  departments: { name: string } | null
}

const columns: ColumnDef<DesignationRow>[] = [
  {
    accessorKey: 'name',
    header: 'Designation Name',
    cell: ({ row }) => (
      <div>
        <p className="text-sm font-medium text-[#111827]">{row.original.name}</p>
        {row.original.code && <p className="text-xs text-[#9ca3af]">{row.original.code}</p>}
      </div>
    ),
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
    accessorKey: 'level',
    header: 'Level',
    cell: ({ getValue }) => {
      const level = getValue() as number | null
      return level ? (
        <Badge variant="secondary">L{level}</Badge>
      ) : (
        <span className="text-sm text-[#9ca3af]">—</span>
      )
    },
  },
  {
    accessorKey: 'employee_count',
    header: 'Employees',
    cell: ({ getValue }) => (
      <div className="flex items-center gap-1.5">
        <Users className="h-3.5 w-3.5 text-[#9ca3af]" />
        <span className="text-sm text-[#374151]">{getValue() as number}</span>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
  },
  {
    id: 'actions',
    header: '',
    size: 50,
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem destructive>
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

export function DesignationsList({ data }: { data: DesignationRow[] }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      searchPlaceholder="Search designations..."
    />
  )
}

