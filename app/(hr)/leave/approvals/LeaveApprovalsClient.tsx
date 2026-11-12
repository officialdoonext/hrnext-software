'use client'

import * as React from 'react'
import { Check, X, Calendar, AlertCircle, Clock, User, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar } from '@/components/common/Avatar'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/toaster'
import { formatDate } from '@/lib/utils/date'
import { createClient } from '@/lib/supabase/client'

interface Application {
  id: string
  from_date: string
  to_date: string
  days: number
  half_day: boolean
  half_day_session: string | null
  reason: string | null
  status: 'pending' | 'approved' | 'rejected' | 'cancelled'
  created_at: string
  rejection_reason: string | null
  employees: {
    id: string
    employee_id: string
    first_name: string
    last_name: string
    photo_url: string | null
    departments: { name: string } | null
  }
  leave_types: {
    id: string
    name: string
    code: string
    paid: boolean
  }
}

export function LeaveApprovalsClient({ initialApplications }: { initialApplications: Application[] }) {
  const [applications, setApplications] = React.useState<Application[]>(initialApplications)
  const [activeFilter, setActiveFilter] = React.useState<'pending' | 'approved' | 'rejected' | 'all'>('pending')
  const [actionDialog, setActionDialog] = React.useState<{
    app: Application
    type: 'approve' | 'reject'
  } | null>(null)
  const [remarks, setRemarks] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const { success, error } = useToast()
  const supabase = createClient()

  const filtered = applications.filter((app) => {
    if (activeFilter === 'all') return true
    return app.status === activeFilter
  })

  const pendingCount = applications.filter((a) => a.status === 'pending').length

  const handleDecision = async () => {
    if (!actionDialog) return
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const newStatus = actionDialog.type === 'approve' ? 'approved' : 'rejected'

      const { error: updateErr } = await supabase
        .from('leave_applications')
        .update({
          status: newStatus,
          approved_by: user?.id,
          approved_at: new Date().toISOString(),
          rejection_reason: actionDialog.type === 'reject' ? remarks : null,
        })
        .eq('id', actionDialog.app.id)

      if (updateErr) throw updateErr

      // Update state
      setApplications(
        applications.map((a) =>
          a.id === actionDialog.app.id
            ? { ...a, status: newStatus, rejection_reason: actionDialog.type === 'reject' ? remarks : null }
            : a
        )
      )

      success(`Leave application ${newStatus}`)
      setActionDialog(null)
      setRemarks('')
    } catch (err: any) {
      error('Action failed', err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-[#e5e7eb] mb-5">
        <div className="flex gap-2">
          {[
            { id: 'pending', label: 'Pending', count: pendingCount },
            { id: 'approved', label: 'Approved', count: applications.filter((a) => a.status === 'approved').length },
            { id: 'rejected', label: 'Rejected', count: applications.filter((a) => a.status === 'rejected').length },
            { id: 'all', label: 'All Requests', count: applications.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 transition-colors ${
                activeFilter === tab.id
                  ? 'border-[#5e2b9d] text-[#5e2b9d]'
                  : 'border-transparent text-[#6b7280] hover:text-[#111827]'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeFilter === tab.id ? 'bg-[#f3eefb] text-[#5e2b9d]' : 'bg-[#f1f3f5] text-[#6b7280]'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((app) => {
            const empName = app.employees ? `${app.employees.first_name} ${app.employees.last_name}` : 'Unknown'
            return (
              <Card key={app.id}>
                <CardContent className="pt-4 pb-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    {/* Employee & Type */}
                    <div className="flex items-start gap-3">
                      <Avatar name={empName} photoUrl={app.employees?.photo_url} size="md" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-[#111827]">{empName}</h4>
                          <span className="text-xs text-[#9ca3af] font-mono">
                            {app.employees?.employee_id}
                          </span>
                          <StatusBadge status={app.status} />
                        </div>
                        <p className="text-xs text-[#6b7280]">
                          {app.employees?.departments?.name ?? '—'} &bull; Applied {formatDate(app.created_at)}
                        </p>
                      </div>
                    </div>

                    {/* Dates & Duration */}
                    <div className="flex items-center gap-6 text-xs text-[#374151]">
                      <div>
                        <span className="text-[#9ca3af] block">Leave Category</span>
                        <span className="font-semibold text-[#5e2b9d]">{app.leave_types?.name}</span>
                      </div>
                      <div>
                        <span className="text-[#9ca3af] block">Duration</span>
                        <span className="font-medium">
                          {formatDate(app.from_date, 'dd MMM')} – {formatDate(app.to_date, 'dd MMM yyyy')}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#9ca3af] block">Total Days</span>
                        <span className="font-semibold text-[#111827]">{app.days} {app.days === 1 ? 'day' : 'days'}</span>
                        {app.half_day && (
                          <span className="text-[10px] text-[#9ca3af] block">({app.half_day_session} half)</span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    {app.status === 'pending' && (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="text-[#dc2626] hover:bg-[#fef2f2] border-[#fecaca]"
                          onClick={() => setActionDialog({ app, type: 'reject' })}
                        >
                          <X className="h-3.5 w-3.5 mr-1" /> Reject
                        </Button>
                        <Button
                          size="sm"
                          className="bg-[#16a34a] hover:bg-[#15803d]"
                          onClick={() => setActionDialog({ app, type: 'approve' })}
                        >
                          <Check className="h-3.5 w-3.5 mr-1" /> Approve
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Reason / Notes */}
                  {app.reason && (
                    <div className="mt-3 pt-3 border-t border-[#f1f3f5] text-xs">
                      <span className="text-[#9ca3af]">Reason: </span>
                      <span className="text-[#374151] italic">"{app.reason}"</span>
                    </div>
                  )}

                  {/* Rejection comment */}
                  {app.rejection_reason && (
                    <div className="mt-2 text-xs text-[#dc2626] bg-[#fef2f2] p-2 rounded-[4px]">
                      <strong>Rejection remarks: </strong>{app.rejection_reason}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Calendar className="h-8 w-8 text-[#d1d5db] mx-auto mb-2" />
            <p className="text-sm font-medium text-[#374151]">No applications found</p>
            <p className="text-xs text-[#9ca3af] mt-0.5">There are no leave requests under this filter.</p>
          </CardContent>
        </Card>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={!!actionDialog} onOpenChange={(open) => !open && setActionDialog(null)}>
        <DialogContent size="sm">
          <DialogHeader>
            <DialogTitle>
              {actionDialog?.type === 'approve' ? 'Approve Leave Request' : 'Reject Leave Request'}
            </DialogTitle>
          </DialogHeader>
          <div className="p-5 space-y-3">
            <p className="text-xs text-[#6b7280]">
              {actionDialog?.type === 'approve'
                ? `Are you sure you want to approve ${actionDialog?.app.days} days of leave for ${actionDialog?.app.employees?.first_name}?`
                : `Please provide a reason for rejecting this leave request.`}
            </p>
            {actionDialog?.type === 'reject' && (
              <div className="space-y-1">
                <Label required>Rejection Reason</Label>
                <Textarea
                  required
                  placeholder="e.g. Critical project milestone scheduled on these dates"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="secondary" size="sm" onClick={() => setActionDialog(null)}>
              Cancel
            </Button>
            <Button
              size="sm"
              loading={loading}
              className={actionDialog?.type === 'approve' ? 'bg-[#16a34a] hover:bg-[#15803d]' : 'bg-[#dc2626] hover:bg-[#b91c1c]'}
              onClick={handleDecision}
            >
              {actionDialog?.type === 'approve' ? 'Confirm Approval' : 'Confirm Rejection'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

