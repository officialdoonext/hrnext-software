'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { EmptyState } from '@/components/common/EmptyState'
import { Check, X, Clock, Calendar, CheckCircle2, AlertCircle } from 'lucide-react'

interface RegularizationRequest {
  id: string
  date: string
  requested_check_in: string | null
  requested_check_out: string | null
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  rejection_reason?: string | null
  employees?: {
    id: string
    employee_id: string
    first_name: string
    last_name: string
    photo_url?: string | null
    departments?: { name: string } | null
  }
}

const mockRequests: RegularizationRequest[] = [
  {
    id: 'reg-001',
    date: '2026-11-08',
    requested_check_in: '09:05 AM',
    requested_check_out: '06:15 PM',
    reason: 'Biometric fingerprint reader failed on turnstile 2 at main lobby entrance.',
    status: 'pending',
    created_at: '2026-11-08T18:20:00Z',
    employees: {
      id: 'emp-001',
      employee_id: 'PC-1002',
      first_name: 'Priya',
      last_name: 'Sharma',
      photo_url: null,
      departments: { name: 'Engineering' },
    },
  },
  {
    id: 'reg-002',
    date: '2026-11-07',
    requested_check_in: '09:30 AM',
    requested_check_out: '07:00 PM',
    reason: 'Client on-site visit at Bangalore office during morning punch-in hours.',
    status: 'pending',
    created_at: '2026-11-07T19:05:00Z',
    employees: {
      id: 'emp-002',
      employee_id: 'PC-1005',
      first_name: 'Arjun',
      last_name: 'Mehta',
      photo_url: null,
      departments: { name: 'Product' },
    },
  },
  {
    id: 'reg-003',
    date: '2026-11-06',
    requested_check_in: '09:00 AM',
    requested_check_out: '06:00 PM',
    reason: 'Attended AWS Summit half-day seminar with manager approval.',
    status: 'approved',
    created_at: '2026-11-06T18:00:00Z',
    employees: {
      id: 'emp-003',
      employee_id: 'PC-1008',
      first_name: 'Sneha',
      last_name: 'Patil',
      photo_url: null,
      departments: { name: 'Cloud Operations' },
    },
  },
]

export function RegularizationClient({ initialRequests }: { initialRequests: any[] }) {
  const [requests, setRequests] = React.useState<RegularizationRequest[]>(() => {
    return initialRequests && initialRequests.length > 0 ? initialRequests : mockRequests
  })
  const [filter, setFilter] = React.useState<'all' | 'pending' | 'approved' | 'rejected'>('pending')
  const [actionSuccess, setActionSuccess] = React.useState<string | null>(null)

  const handleAction = (id: string, newStatus: 'approved' | 'rejected') => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    )
    setActionSuccess(`Request ${id} marked as ${newStatus}`)
    setTimeout(() => setActionSuccess(null), 3000)
  }

  const filtered = requests.filter((r) => {
    if (filter === 'all') return true
    return r.status === filter
  })

  return (
    <div className="space-y-6">
      {actionSuccess && (
        <div className="bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534] px-4 py-2.5 rounded-[6px] text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-[#16a34a]" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#e5e7eb] pb-3">
        {(['pending', 'approved', 'rejected', 'all'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 text-xs font-medium rounded-[6px] transition-colors ${
              filter === tab
                ? 'bg-[#5e2b9d] text-white shadow-xs'
                : 'text-[#6b7280] hover:text-[#111827] hover:bg-[#f3f4f6]'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} (
            {requests.filter((r) => (tab === 'all' ? true : r.status === tab)).length})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card className="p-8 text-center">
          <EmptyState
            title="No regularization requests"
            description="All employee punch regularization requests in this filter have been handled."
          />
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((req) => (
            <Card key={req.id} className="p-4 hover:border-[#d1d5db] transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Avatar
                    name={`${req.employees?.first_name || 'Emp'} ${req.employees?.last_name || ''}`}
                    size="md"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-[#111827]">
                        {req.employees?.first_name} {req.employees?.last_name}
                      </span>
                      <span className="text-xs font-mono text-[#6b7280]">
                        {req.employees?.employee_id}
                      </span>
                      <span className="text-xs text-[#9ca3af]">•</span>
                      <span className="text-xs text-[#6b7280]">
                        {req.employees?.departments?.name || 'General'}
                      </span>
                      <StatusBadge status={req.status} />
                    </div>

                    <div className="flex items-center gap-4 mt-2 text-xs text-[#4b5563]">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-[#9ca3af]" />
                        <strong>Date:</strong> {req.date}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-[#9ca3af]" />
                        <strong>Punches:</strong> {req.requested_check_in || '--'} –{' '}
                        {req.requested_check_out || '--'}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-[#374151] bg-[#f9fafb] p-2 rounded border border-[#f3f4f6]">
                      <span className="font-medium text-[#111827]">Reason:</span> {req.reason}
                    </p>
                  </div>
                </div>

                {req.status === 'pending' && (
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      size="sm"
                      onClick={() => handleAction(req.id, 'approved')}
                      className="h-8 gap-1 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs"
                    >
                      <Check className="h-3.5 w-3.5" /> Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAction(req.id, 'rejected')}
                      className="h-8 gap-1 text-[#dc2626] border-[#fecaca] hover:bg-[#fef2f2] text-xs"
                    >
                      <X className="h-3.5 w-3.5" /> Reject
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

