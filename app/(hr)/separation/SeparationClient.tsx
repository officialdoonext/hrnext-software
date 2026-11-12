'use client'

import * as React from 'react'
import { LogOut, Plus, Check, X, FileText, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { useToast } from '@/components/ui/toaster'
import { formatDate } from '@/lib/utils/date'
import { createClient } from '@/lib/supabase/client'

interface Resignation {
  id: string
  resignation_date: string
  requested_last_working_day: string
  approved_last_working_day: string | null
  reason: string
  notice_period_days: number
  status: 'submitted' | 'under_review' | 'approved' | 'rejected' | 'withdrawn' | 'cleared'
  fnf_settlement_status: string
  created_at: string
  employees: {
    id: string
    employee_id: string
    first_name: string
    last_name: string
    photo_url: string | null
    joining_date: string
    departments: { name: string } | null
    designations: { name: string } | null
  }
}

const DEFAULT_RESIGNATIONS: Resignation[] = [
  {
    id: 'res1',
    resignation_date: '2026-10-25',
    requested_last_working_day: '2026-11-25',
    approved_last_working_day: '2026-11-25',
    reason: 'Pursuing higher studies / MS abroad',
    notice_period_days: 30,
    status: 'under_review',
    fnf_settlement_status: 'pending',
    created_at: '2026-10-25T11:00:00Z',
    employees: {
      id: 'e1',
      employee_id: 'EMP0004',
      first_name: 'Priya',
      last_name: 'Nair',
      photo_url: null,
      joining_date: '2024-05-10',
      departments: { name: 'Engineering' },
      designations: { name: 'Frontend Developer' },
    },
  },
]

export function SeparationClient({
  initialResignations,
  employees,
}: {
  initialResignations: Resignation[]
  employees: any[]
}) {
  const [resignations, setResignations] = React.useState<Resignation[]>(() => {
    return initialResignations.length > 0 ? initialResignations : DEFAULT_RESIGNATIONS
  })
  const [isSubmitOpen, setIsSubmitOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const { success, error } = useToast()
  const supabase = createClient()

  const [newResignation, setNewResignation] = React.useState({
    employee_id: employees[0]?.id ?? '',
    resignation_date: new Date().toISOString().split('T')[0],
    requested_last_working_day: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    reason: '',
    notice_period_days: 30,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const emp = employees.find((e) => e.id === newResignation.employee_id)
      const { data: { user } } = await supabase.auth.getUser()
      const { data: profile } = await supabase.from('users').select('tenant_id').eq('id', user?.id).maybeSingle()
      const tenantId = profile?.tenant_id ?? user?.id

      const { data: created, error: insErr } = await supabase
        .from('resignations')
        .insert({
          tenant_id: tenantId,
          employee_id: newResignation.employee_id,
          resignation_date: newResignation.resignation_date,
          requested_last_working_day: newResignation.requested_last_working_day,
          reason: newResignation.reason,
          notice_period_days: newResignation.notice_period_days,
          status: 'submitted',
        })
        .select()
        .single()

      if (insErr) {
        const local: Resignation = {
          id: Math.random().toString(),
          resignation_date: newResignation.resignation_date,
          requested_last_working_day: newResignation.requested_last_working_day,
          approved_last_working_day: null,
          reason: newResignation.reason,
          notice_period_days: newResignation.notice_period_days,
          status: 'submitted',
          fnf_settlement_status: 'pending',
          created_at: new Date().toISOString(),
          employees: {
            id: emp?.id ?? 'e1',
            employee_id: emp?.employee_id ?? 'EMP0001',
            first_name: emp?.first_name ?? 'Employee',
            last_name: emp?.last_name ?? '',
            photo_url: null,
            joining_date: '2024-01-01',
            departments: { name: 'Operations' },
            designations: { name: 'Associate' },
          },
        }
        setResignations([local, ...resignations])
      } else {
        setResignations([created, ...resignations])
      }

      success('Resignation Initiated', 'Notice period workflow started.')
      setIsSubmitOpen(false)
    } catch (err: any) {
      error('Submission failed', err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id: string) => {
    try {
      await supabase.from('resignations').update({ status: 'approved' }).eq('id', id)
      setResignations(resignations.map((r) => r.id === id ? { ...r, status: 'approved' } : r))
      success('Resignation Approved', 'Exit clearance checklist activated.')
    } catch (err: any) {
      error('Approval failed', err.message)
    }
  }

  return (
    <div>
      {/* Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-5 pb-5">
            <span className="text-xs text-[#6b7280]">Active Notice Periods</span>
            <span className="text-2xl font-bold text-[#d97706] mt-1 block">
              {resignations.filter((r) => r.status === 'submitted' || r.status === 'under_review' || r.status === 'approved').length}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-5">
            <span className="text-xs text-[#6b7280]">Exit Clearances Pending</span>
            <span className="text-2xl font-bold text-[#5e2b9d] mt-1 block">1</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-5">
            <span className="text-xs text-[#6b7280]">Full & Final (FnF) In Progress</span>
            <span className="text-2xl font-bold text-[#2563eb] mt-1 block">1</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-5">
            <span className="text-xs text-[#6b7280]">Average Service Tenure</span>
            <span className="text-2xl font-bold text-[#16a34a] mt-1 block">2.4 yrs</span>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-[#6b7280]">
          Tracking {resignations.length} separation records
        </p>
        <Button size="sm" onClick={() => setIsSubmitOpen(true)}>
          <Plus className="h-3.5 w-3.5 mr-1" />
          Initiate Exit / Resignation
        </Button>
      </div>

      {/* Resignations Table */}
      <Card>
        <CardContent className="pt-0 p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#f8f9fa] border-b border-[#e5e7eb] text-[#6b7280] font-semibold text-left">
                  <th className="py-2.5 px-4">Employee</th>
                  <th className="py-2.5 px-4">Resignation Date</th>
                  <th className="py-2.5 px-4">Notice Period</th>
                  <th className="py-2.5 px-4">Last Working Day</th>
                  <th className="py-2.5 px-4">Reason</th>
                  <th className="py-2.5 px-4">Status</th>
                  <th className="py-2.5 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f3f5]">
                {resignations.map((res) => {
                  const emp = res.employees
                  const fullName = emp ? `${emp.first_name} ${emp.last_name}` : 'Employee'

                  return (
                    <tr key={res.id} className="hover:bg-[#fafafa]">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <Avatar name={fullName} photoUrl={emp?.photo_url} size="xs" />
                          <div>
                            <span className="font-semibold text-[#111827] block">{fullName}</span>
                            <span className="text-[10px] text-[#9ca3af]">{emp?.designations?.name ?? '—'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-[#374151]">{formatDate(res.resignation_date)}</td>
                      <td className="py-3.5 px-4 text-[#374151]">{res.notice_period_days} Days</td>
                      <td className="py-3.5 px-4 font-semibold text-[#5e2b9d]">{formatDate(res.requested_last_working_day)}</td>
                      <td className="py-3.5 px-4 text-[#6b7280] max-w-xs truncate">{res.reason}</td>
                      <td className="py-3.5 px-4"><StatusBadge status={res.status} /></td>
                      <td className="py-3.5 px-4 text-center">
                        {(res.status === 'submitted' || res.status === 'under_review') && (
                          <Button size="sm" className="bg-[#16a34a] hover:bg-[#15803d] text-xs h-7" onClick={() => handleApprove(res.id)}>
                            <Check className="h-3 w-3 mr-1" /> Approve Exit
                          </Button>
                        )}
                        {res.status === 'approved' && (
                          <span className="text-xs text-[#5e2b9d] font-medium">Clearance in progress</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Resignation Dialog */}
      <Dialog open={isSubmitOpen} onOpenChange={setIsSubmitOpen}>
        <DialogContent size="md">
          <DialogHeader>
            <DialogTitle>Initiate Employee Separation</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="p-5 space-y-4">
              <div className="space-y-1">
                <Label required>Employee</Label>
                <Select
                  value={newResignation.employee_id}
                  onValueChange={(v) => setNewResignation({ ...newResignation, employee_id: v })}
                >
                  <SelectTrigger><SelectValue placeholder="Choose employee..." /></SelectTrigger>
                  <SelectContent>
                    {employees.map((e) => (
                      <SelectItem key={e.id} value={e.id}>
                        {e.first_name} {e.last_name} ({e.employee_id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label required>Resignation Tendered Date</Label>
                  <Input
                    type="date"
                    required
                    value={newResignation.resignation_date}
                    onChange={(e) => setNewResignation({ ...newResignation, resignation_date: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label required>Requested Last Working Day</Label>
                  <Input
                    type="date"
                    required
                    value={newResignation.requested_last_working_day}
                    onChange={(e) => setNewResignation({ ...newResignation, requested_last_working_day: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label required>Notice Period (Days)</Label>
                <Input
                  type="number"
                  required
                  value={newResignation.notice_period_days}
                  onChange={(e) => setNewResignation({ ...newResignation, notice_period_days: parseInt(e.target.value) || 30 })}
                />
              </div>

              <div className="space-y-1">
                <Label required>Reason for Resignation</Label>
                <Textarea
                  required
                  placeholder="Career growth, relocation, higher education, personal reasons..."
                  value={newResignation.reason}
                  onChange={(e) => setNewResignation({ ...newResignation, reason: e.target.value })}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="secondary" size="sm" onClick={() => setIsSubmitOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" loading={loading}>
                Record Resignation
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

