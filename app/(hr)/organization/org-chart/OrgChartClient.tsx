'use client'

import * as React from 'react'
import { Users, ChevronDown, ChevronRight, Building2, User, Search, ZoomIn, ZoomOut } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar } from '@/components/common/Avatar'
import Link from 'next/link'

interface OrgEmployee {
  id: string
  employee_id: string
  first_name: string
  last_name: string
  photo_url: string | null
  reporting_manager_id: string | null
  departments: { name: string } | null
  designations: { name: string } | null
}

const DEFAULT_ORG: OrgEmployee[] = [
  { id: '1', employee_id: 'EMP0001', first_name: 'Vikram', last_name: 'Aditya', photo_url: null, reporting_manager_id: null, departments: { name: 'Executive' }, designations: { name: 'Chief Executive Officer (CEO)' } },
  { id: '2', employee_id: 'EMP0002', first_name: 'Neha', last_name: 'Kapoor', photo_url: null, reporting_manager_id: '1', departments: { name: 'Engineering' }, designations: { name: 'VP of Engineering' } },
  { id: '3', employee_id: 'EMP0003', first_name: 'Rohan', last_name: 'Mehta', photo_url: null, reporting_manager_id: '1', departments: { name: 'Human Resources' }, designations: { name: 'Head of People & Culture' } },
  { id: '4', employee_id: 'EMP0004', first_name: 'Aakash', last_name: 'Verma', photo_url: null, reporting_manager_id: '2', departments: { name: 'Engineering' }, designations: { name: 'Lead Architect' } },
  { id: '5', employee_id: 'EMP0005', first_name: 'Priya', last_name: 'Nair', photo_url: null, reporting_manager_id: '2', departments: { name: 'Engineering' }, designations: { name: 'Senior Frontend Dev' } },
  { id: '6', employee_id: 'EMP0006', first_name: 'Sameer', last_name: 'Joshi', photo_url: null, reporting_manager_id: '3', departments: { name: 'Human Resources' }, designations: { name: 'HR Operations Lead' } },
]

function OrgTreeNode({
  node,
  allNodes,
  level = 0,
}: {
  node: OrgEmployee
  allNodes: OrgEmployee[]
  level?: number
}) {
  const [expanded, setExpanded] = React.useState(true)
  const children = allNodes.filter((e) => e.reporting_manager_id === node.id)
  const fullName = `${node.first_name} ${node.last_name}`

  return (
    <div className="flex flex-col items-center">
      {/* Node Card */}
      <div className="relative group">
        <div className="w-56 p-3.5 bg-white border border-[#e5e7eb] rounded-lg shadow-xs hover:border-[#5e2b9d] transition-all">
          <div className="flex items-center gap-2.5">
            <Avatar name={fullName} photoUrl={node.photo_url} size="sm" />
            <div className="flex-1 min-w-0">
              <Link
                href={`/employees/${node.id}`}
                className="text-xs font-semibold text-[#111827] hover:text-[#5e2b9d] block truncate"
              >
                {fullName}
              </Link>
              <p className="text-[10px] text-[#5e2b9d] truncate font-medium">
                {node.designations?.name ?? 'Employee'}
              </p>
              <p className="text-[10px] text-[#9ca3af] truncate">
                {node.departments?.name ?? 'Department'}
              </p>
            </div>
          </div>

          {children.length > 0 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2.5 pt-2 border-t border-[#f1f3f5] w-full flex items-center justify-between text-[10px] text-[#6b7280] hover:text-[#5e2b9d]"
            >
              <span>{children.length} direct report{children.length > 1 ? 's' : ''}</span>
              {expanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
            </button>
          )}
        </div>
      </div>

      {/* Children Branches */}
      {expanded && children.length > 0 && (
        <div className="flex flex-col items-center mt-3">
          {/* Vertical connector line */}
          <div className="w-px h-4 bg-[#d1d5db]" />

          {/* Children container */}
          <div className="flex items-start gap-6 pt-3 relative before:content-[''] before:absolute before:top-0 before:left-8 before:right-8 before:h-px before:bg-[#d1d5db]">
            {children.map((child) => (
              <OrgTreeNode key={child.id} node={child} allNodes={allNodes} level={level + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function OrgChartClient({ employees }: { employees: OrgEmployee[] }) {
  const [search, setSearch] = React.useState('')
  const nodes = employees.length > 0 ? employees : DEFAULT_ORG

  // Find root nodes (employees without a reporting manager)
  const rootNodes = nodes.filter((e) => !e.reporting_manager_id)

  return (
    <div>
      {/* Controls Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-[#e5e7eb] mb-6">
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9ca3af]" />
            <Input
              placeholder="Search by name or title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8 text-xs"
            />
          </div>
          <span className="text-xs text-[#6b7280]">
            Total {nodes.length} people in hierarchy
          </span>
        </div>
      </div>

      {/* Visual Chart Canvas */}
      <Card className="overflow-x-auto p-8 bg-[#fafafa]">
        <div className="min-w-max flex justify-center py-6">
          <div className="flex gap-12">
            {rootNodes.map((root) => (
              <OrgTreeNode key={root.id} node={root} allNodes={nodes} />
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}

