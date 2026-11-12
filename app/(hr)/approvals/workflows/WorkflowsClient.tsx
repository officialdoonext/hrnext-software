'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import {
  GitMerge,
  ArrowRight,
  ShieldCheck,
  Plus,
  CheckCircle2,
  Settings2,
  Clock,
  Layers,
} from 'lucide-react'

interface Workflow {
  id: string
  name: string
  module: string
  condition: string
  steps: { role: string; tatHours: number }[]
  status: 'active' | 'inactive'
}

const mockWorkflows: Workflow[] = [
  {
    id: 'wf-1',
    name: 'Standard Paid Leave (≤ 3 days)',
    module: 'Leave Management',
    condition: 'Days Requested ≤ 3',
    steps: [
      { role: 'Reporting Manager', tatHours: 24 },
    ],
    status: 'active',
  },
  {
    id: 'wf-2',
    name: 'Extended Leave (> 3 days)',
    module: 'Leave Management',
    condition: 'Days Requested > 3',
    steps: [
      { role: 'Reporting Manager', tatHours: 24 },
      { role: 'HR Business Partner (HRBP)', tatHours: 48 },
    ],
    status: 'active',
  },
  {
    id: 'wf-3',
    name: 'High Value Expense Reimbursement',
    module: 'Expense Claims',
    condition: 'Claim Amount > ₹15,000',
    steps: [
      { role: 'Direct Line Manager', tatHours: 24 },
      { role: 'Finance Controller', tatHours: 48 },
      { role: 'Head of Operations / CFO', tatHours: 72 },
    ],
    status: 'active',
  },
  {
    id: 'wf-4',
    name: 'Voluntary Resignation & Exit Clearance',
    module: 'Separation',
    condition: 'All Employee Resignations',
    steps: [
      { role: 'Department Head', tatHours: 48 },
      { role: 'IT Asset Admin (Hardware Recovery)', tatHours: 24 },
      { role: 'Finance (FnF Settlement)', tatHours: 48 },
      { role: 'HR Admin (Relieving Letter)', tatHours: 24 },
    ],
    status: 'active',
  },
]

export function WorkflowsClient() {
  const [workflows, setWorkflows] = React.useState<Workflow[]>(mockWorkflows)
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null)

  const toggleStatus = (id: string) => {
    setWorkflows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, status: w.status === 'active' ? 'inactive' : 'active' } : w
      )
    )
    setSuccessMsg('Workflow status updated!')
    setTimeout(() => setSuccessMsg(null), 3000)
  }

  return (
    <div className="space-y-6">
      {successMsg && (
        <div className="bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534] px-4 py-2.5 rounded-[6px] text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-[#16a34a]" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#111827]">Active Approval Pipelines</h3>
          <p className="text-xs text-[#6b7280]">
            Define approval routing rules based on department, amount thresholds, and duration criteria.
          </p>
        </div>
        <Button size="sm" className="h-8 gap-1 text-xs bg-[#5e2b9d] hover:bg-[#4d2382] text-white">
          <Plus className="h-3.5 w-3.5" /> Create Workflow
        </Button>
      </div>

      <div className="space-y-3">
        {workflows.map((wf) => (
          <Card key={wf.id} className="p-4 hover:border-[#d1d5db] transition-colors">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#f3f4f6] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-[#111827]">{wf.name}</span>
                  <span className="text-[11px] font-medium text-[#5e2b9d] bg-purple-50 px-2 py-0.5 rounded">
                    {wf.module}
                  </span>
                  <StatusBadge status={wf.status} />
                </div>
                <p className="text-xs text-[#6b7280] mt-1">
                  <strong>Trigger Rule:</strong> {wf.condition}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleStatus(wf.id)}
                  className="h-7 text-xs"
                >
                  {wf.status === 'active' ? 'Deactivate' : 'Activate'}
                </Button>
                <Button variant="ghost" size="sm" className="h-7 text-xs text-[#6b7280]">
                  <Settings2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            {/* Visual approval steps */}
            <div className="pt-3">
              <span className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider block mb-2">
                Approval Chain ({wf.steps.length} Levels)
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {wf.steps.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex items-center gap-2 p-2 rounded-[6px] bg-[#f9fafb] border border-[#e5e7eb] text-xs">
                      <div className="h-5 w-5 rounded-full bg-[#5e2b9d] text-white flex items-center justify-center text-[10px] font-bold">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-[#111827]">{step.role}</p>
                        <p className="text-[10px] text-[#9ca3af] flex items-center gap-1">
                          <Clock className="h-2.5 w-2.5" /> SLA: {step.tatHours} hrs
                        </p>
                      </div>
                    </div>
                    {idx < wf.steps.length - 1 && (
                      <ArrowRight className="h-4 w-4 text-[#9ca3af] shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

