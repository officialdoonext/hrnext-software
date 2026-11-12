'use client'

import * as React from 'react'
import { Plus, Calendar, Clock, AlertCircle, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { useToast } from '@/components/ui/toaster'
import { formatDate, getDaysInRange } from '@/lib/utils/date'
import { createClient } from '@/lib/supabase/client'

interface LeaveType {
  id: string
  name: string
  code: string
  days_allowed: number
  paid: boolean
}

interface Application {
  id: string
  from_date: string
  to_date: string
  days: number
  half_day: boolean
  half_day_session: string | null
  reason: string | null
  status: string
  created_at: string
  rejection_reason: string | null
  leave_types: {
    id: string
    name: string
    code: string
    paid: boolean
  }
}

export function ApplyLeaveClient({
  leaveTypes,
  initialApplications,
  employeeId,
}: {
  leaveTypes: LeaveType[]
  initialApplications: Application[]
  employeeId: string
}) {
  const [applications, setApplications] = React.useState<Application[]>(initialApplications)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const { success, error } = useToast()
  const supabase = createClient()

  const todayStr = new Date().toISOString().split('T')[0]

  const [formData, setFormData] = React.useState({
    leave_type_id: leaveTypes[0]?.id ?? '',
    from_date: todayStr,
    to_date: todayStr,
    half_day: false,
    half_day_session: 'morning',
    reason: '',
  })

  // Calculate days dynamically
  const calculatedDays = React.useMemo(() => {
    if (formData.half_day) return 0.5
    if (!formData.from_date || !formData.to_date) return 1
    return Math.max(1, getDaysInRange(formData.from_date, formData.to_date))
  }, [formData.from_date, formData.to_date, formData.half_day])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const { data: profile } = await supabase.from('users').select('tenant_id').eq('id', user?.id).maybeSingle()
      const tenantId = profile?.tenant_id ?? user?.id

      const { data: newApp, error: appErr } = await supabase
        .from('leave_applications')
        .insert({
          tenant_id: tenantId,
          employee_id: employeeId,
          leave_type_id: formData.leave_type_id,
          from_date: formData.from_date,
          to_date: formData.half_day ? formData.from_date : formData.to_date,
          days: calculatedDays,
          half_day: formData.half_day,
          half_day_session: formData.half_day ? formData.half_day_session : null,
          reason: formData.reason,
          status: 'pending',
        })
        .select(`
          id, from_date, to_date, days, half_day, half_day_session, reason, status, created_at, rejection_reason,
          leave_types (id, name, code, paid)
        `)
        .single()

      if (appErr) throw appErr

      setApplications([newApp as any, ...applications])
      success('Leave Application Submitted', `Your request for ${calculatedDays} day(s) has been sent for approval.`)
      setIsDialogOpen(false)
    } catch (err: any) {
      error('Submission Failed', err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Balances Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-4 pb-4">
            <span className="text-xs text-[#9ca3af] block">Casual Leave (CL)</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold text-[#5e2b9d]">8.5</span>
              <span className="text-xs text-[#6b7280]">of 12 days</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <span className="text-xs text-[#9ca3af] block">Sick Leave (SL)</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold text-[#16a34a]">6.0</span>
              <span className="text-xs text-[#6b7280]">of 8 days</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <span className="text-xs text-[#9ca3af] block">Earned Leave (EL)</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold text-[#2563eb]">12.0</span>
              <span className="text-xs text-[#6b7280]">of 15 days</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#f3eefb] border-[#cbb4ec] flex items-center justify-center p-4">
          <Button className="w-full bg-[#5e2b9d] hover:bg-[#4e2384]" onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-1.5" />
            Apply For Leave
          </Button>
        </Card>
      </div>

      {/* Applications Ledger */}
      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle>My Leave History</CardTitle>
          <span className="text-xs text-[#6b7280]">
            Total {applications.length} applications submitted
          </span>
        </CardHeader>
        <CardContent className="pt-0">
          {applications.length > 0 ? (
            <div className="divide-y divide-[#f1f3f5]">
              {applications.map((app) => (
                <div key={app.id} className="py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-[#111827]">
                        {app.leave_types?.name ?? 'Leave'}
                      </span>
                      <span className="text-[10px] font-mono bg-[#f3eefb] text-[#5e2b9d] px-1.5 py-0.5 rounded-[4px]">
                        {app.leave_types?.code}
                      </span>
                      <StatusBadge status={app.status} />
                    </div>
                    <p className="text-[#6b7280] mt-1">
                      {formatDate(app.from_date, 'dd MMM yyyy')} &ndash; {formatDate(app.to_date, 'dd MMM yyyy')}
                      <span className="ml-2 font-semibold text-[#111827]">
                        ({app.days} {app.days === 1 ? 'day' : 'days'})
                      </span>
                      {app.half_day && <span className="ml-1 text-[#9ca3af]">• {app.half_day_session} half</span>}
                    </p>
                    {app.reason && (
                      <p className="text-[#9ca3af] italic mt-1">"{app.reason}"</p>
                    )}
                    {app.rejection_reason && (
                      <p className="text-[#dc2626] font-medium mt-1">Rejection reason: {app.rejection_reason}</p>
                    )}
                  </div>
                  <div className="text-right text-[11px] text-[#9ca3af]">
                    Applied {formatDate(app.created_at)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Calendar className="h-8 w-8 text-[#d1d5db] mx-auto mb-2" />
              <p className="text-sm font-medium text-[#374151]">No leave requests submitted yet</p>
              <p className="text-xs text-[#9ca3af] mt-0.5">Click "Apply For Leave" above to request time off.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Apply Leave Modal Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent size="md">
          <DialogHeader>
            <DialogTitle>Apply for Leave</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="p-5 space-y-4">
              <div className="space-y-1">
                <Label required>Leave Category</Label>
                <Select
                  value={formData.leave_type_id}
                  onValueChange={(val) => setFormData({ ...formData, leave_type_id: val })}
                >
                  <SelectTrigger><SelectValue placeholder="Select leave type" /></SelectTrigger>
                  <SelectContent>
                    {leaveTypes.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.name} ({t.code}) &bull; {t.days_allowed} days/yr
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Half-day toggle */}
              <div className="flex items-center gap-2 pt-1 pb-1">
                <input
                  type="checkbox"
                  id="half_day"
                  checked={formData.half_day}
                  onChange={(e) => setFormData({ ...formData, half_day: e.target.checked })}
                  className="rounded border-[#d1d5db] text-[#5e2b9d] focus:ring-[#5e2b9d]"
                />
                <Label htmlFor="half_day" className="cursor-pointer text-xs font-normal text-[#374151]">
                  Apply for half-day leave (0.5 day)
                </Label>
              </div>

              {/* Date selection */}
              {!formData.half_day ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label required>From Date</Label>
                    <Input
                      type="date"
                      required
                      value={formData.from_date}
                      onChange={(e) => setFormData({ ...formData, from_date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label required>To Date</Label>
                    <Input
                      type="date"
                      required
                      value={formData.to_date}
                      onChange={(e) => setFormData({ ...formData, to_date: e.target.value })}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label required>Date</Label>
                    <Input
                      type="date"
                      required
                      value={formData.from_date}
                      onChange={(e) => setFormData({ ...formData, from_date: e.target.value, to_date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label required>Session</Label>
                    <Select
                      value={formData.half_day_session}
                      onValueChange={(v) => setFormData({ ...formData, half_day_session: v })}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">First Half (Morning)</SelectItem>
                        <SelectItem value="afternoon">Second Half (Afternoon)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Calculated days badge */}
              <div className="p-3 bg-[#f8f9fa] rounded-lg border border-[#e5e7eb] flex items-center justify-between">
                <span className="text-xs text-[#6b7280]">Total Leave Duration:</span>
                <span className="text-xs font-bold text-[#5e2b9d]">
                  {calculatedDays} {calculatedDays === 1 ? 'Working Day' : 'Working Days'}
                </span>
              </div>

              <div className="space-y-1">
                <Label required>Reason for Leave</Label>
                <Textarea
                  required
                  placeholder="Please describe your reason for time off"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="secondary" size="sm" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" loading={loading}>
                Submit Request
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
