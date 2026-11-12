'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Pencil, Trash2, Users, MapPin } from 'lucide-react'
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

type BranchRow = {
  id: string
  name: string
  code: string | null
  type: string | null
  email: string | null
  phone: string | null
  status: string
  employee_count: number
  head: { first_name: string; last_name: string } | null
}

const columns: ColumnDef<BranchRow>[] = [
  {
    accessorKey: 'name',
    header: 'Branch Name',
    cell: ({ row }) => (
      <div className="flex items-start gap-2">
        <MapPin className="h-4 w-4 text-[#9ca3af] mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-medium text-[#111827]">{row.original.name}</p>
          {row.original.code && <p className="text-xs text-[#9ca3af]">{row.original.code}</p>}
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ getValue }) => (
      <span className="text-sm text-[#374151] capitalize">{(getValue() as string) ?? '—'}</span>
    ),
  },
  {
    id: 'head',
    header: 'Branch Head',
    cell: ({ row }) => {
      const head = row.original.head
      return head ? (
        <span className="text-sm text-[#374151]">{head.first_name} {head.last_name}</span>
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
    accessorKey: 'email',
    header: 'Email',
    cell: ({ getValue }) => (
      <span className="text-sm text-[#374151]">{(getValue() as string) ?? '—'}</span>
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

export function BranchesList({ data }: { data: BranchRow[] }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      searchPlaceholder="Search branches..."
    />
  )
}

