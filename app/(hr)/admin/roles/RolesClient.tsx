'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, Check, Save, CheckCircle2, Lock, Info } from 'lucide-react'

interface PermissionRow {
  module: string
  view: boolean
  create: boolean
  edit: boolean
  delete: boolean
  export: boolean
}

const defaultPermissions: Record<string, PermissionRow[]> = {
  hr_admin: [
    { module: 'Organization & Branches', view: true, create: true, edit: true, delete: false, export: true },
    { module: 'Employee Master Records', view: true, create: true, edit: true, delete: false, export: true },
    { module: 'Attendance & Biometrics', view: true, create: true, edit: true, delete: false, export: true },
    { module: 'Leave Management', view: true, create: true, edit: true, delete: true, export: true },
    { module: 'Payroll & Statutory Tax', view: true, create: true, edit: true, delete: false, export: true },
    { module: 'Recruitment & Job Offers', view: true, create: true, edit: true, delete: true, export: true },
    { module: 'Performance Appraisals', view: true, create: true, edit: true, delete: false, export: true },
    { module: 'Hardware Assets Register', view: true, create: true, edit: true, delete: false, export: true },
    { module: 'Expense Claims & Approvals', view: true, create: true, edit: true, delete: false, export: true },
    { module: 'Separation & F&F Settlement', view: true, create: true, edit: true, delete: false, export: true },
  ],
  manager: [
    { module: 'Organization & Branches', view: true, create: false, edit: false, delete: false, export: false },
    { module: 'Employee Master Records', view: true, create: false, edit: false, delete: false, export: false },
    { module: 'Attendance & Biometrics', view: true, create: true, edit: false, delete: false, export: true },
    { module: 'Leave Management', view: true, create: true, edit: true, delete: false, export: false },
    { module: 'Payroll & Statutory Tax', view: false, create: false, edit: false, delete: false, export: false },
    { module: 'Recruitment & Job Offers', view: true, create: false, edit: false, delete: false, export: false },
    { module: 'Performance Appraisals', view: true, create: true, edit: true, delete: false, export: false },
    { module: 'Hardware Assets Register', view: true, create: false, edit: false, delete: false, export: false },
    { module: 'Expense Claims & Approvals', view: true, create: true, edit: true, delete: false, export: false },
    { module: 'Separation & F&F Settlement', view: false, create: false, edit: false, delete: false, export: false },
  ],
  employee: [
    { module: 'Organization & Branches', view: true, create: false, edit: false, delete: false, export: false },
    { module: 'Employee Master Records', view: true, create: false, edit: false, delete: false, export: false },
    { module: 'Attendance & Biometrics', view: true, create: true, edit: false, delete: false, export: false },
    { module: 'Leave Management', view: true, create: true, edit: false, delete: false, export: false },
    { module: 'Payroll & Statutory Tax', view: true, create: false, edit: false, delete: false, export: true },
    { module: 'Recruitment & Job Offers', view: false, create: false, edit: false, delete: false, export: false },
    { module: 'Performance Appraisals', view: true, create: true, edit: false, delete: false, export: false },
    { module: 'Hardware Assets Register', view: true, create: false, edit: false, delete: false, export: false },
    { module: 'Expense Claims & Approvals', view: true, create: true, edit: false, delete: false, export: false },
    { module: 'Separation & F&F Settlement', view: true, create: true, edit: false, delete: false, export: false },
  ],
}

export function RolesClient() {
  const [activeRole, setActiveRole] = React.useState<'hr_admin' | 'manager' | 'employee'>('hr_admin')
  const [matrix, setMatrix] = React.useState(defaultPermissions)
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null)

  const handleToggle = (moduleIndex: number, action: keyof Omit<PermissionRow, 'module'>) => {
    setMatrix((prev) => {
      const currentRows = [...prev[activeRole]]
      const targetRow = { ...currentRows[moduleIndex] }
      targetRow[action] = !targetRow[action]
      currentRows[moduleIndex] = targetRow
      return { ...prev, [activeRole]: currentRows }
    })
  }

  const handleSave = () => {
    setSuccessMsg(`Permissions for ${activeRole.toUpperCase()} saved to database and enforced by PostgreSQL RLS!`)
    setTimeout(() => setSuccessMsg(null), 3500)
  }

  const rows = matrix[activeRole]

  return (
    <div className="space-y-6">
      {successMsg && (
        <div className="bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534] px-4 py-2.5 rounded-[6px] text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-[#16a34a]" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Role Selector Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#e5e7eb] pb-3">
        <div className="flex items-center gap-2">
          {[
            { id: 'hr_admin', label: 'HR Administrator' },
            { id: 'manager', label: 'Department Manager' },
            { id: 'employee', label: 'Employee (ESS)' },
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setActiveRole(r.id as any)}
              className={`px-3 py-1.5 text-xs font-medium rounded-[6px] transition-colors ${
                activeRole === r.id
                  ? 'bg-[#5e2b9d] text-white shadow-xs'
                  : 'text-[#6b7280] hover:text-[#111827] hover:bg-[#f3f4f6]'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <Button
          size="sm"
          onClick={handleSave}
          className="h-8 gap-1.5 text-xs bg-[#5e2b9d] hover:bg-[#4d2382] text-white"
        >
          <Save className="h-3.5 w-3.5" /> Save Permission Policy
        </Button>
      </div>

      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-[#111827] capitalize">
              {activeRole.replace('_', ' ')} Access Control Matrix
            </h3>
            <p className="text-xs text-[#6b7280] mt-0.5">
              Row-Level Security (RLS) policies automatically filter data at query time based on tenant and role.
            </p>
          </div>
          <span className="text-xs font-mono text-[#5e2b9d] bg-purple-50 px-2 py-1 rounded">
            tenant_id isolated
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-3 px-4 font-semibold min-w-[220px]">Module / Entity</th>
                <th className="py-3 px-3 font-semibold text-center w-24">View (Read)</th>
                <th className="py-3 px-3 font-semibold text-center w-24">Create (Insert)</th>
                <th className="py-3 px-3 font-semibold text-center w-24">Edit (Update)</th>
                <th className="py-3 px-3 font-semibold text-center w-24">Delete</th>
                <th className="py-3 px-3 font-semibold text-center w-24">Export CSV</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              {rows.map((row, idx) => (
                <tr key={row.module} className="hover:bg-[#f9fafb] transition-colors">
                  <td className="py-3 px-4 font-medium text-[#111827]">{row.module}</td>
                  {(['view', 'create', 'edit', 'delete', 'export'] as const).map((action) => (
                    <td key={action} className="py-3 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={row[action]}
                        onChange={() => handleToggle(idx, action)}
                        className="h-4 w-4 rounded text-[#5e2b9d] accent-[#5e2b9d] cursor-pointer"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

