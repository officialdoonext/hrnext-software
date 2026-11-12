'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { EmptyState } from '@/components/common/EmptyState'
import {
  Check,
  X,
  PalmtreeIcon,
  Clock,
  Receipt,
  LogOut,
  CheckCircle2,
  Filter,
  Calendar,
  AlertCircle,
} from 'lucide-react'

interface ApprovalItem {
  id: string
  type: 'leave' | 'attendance' | 'expense' | 'resignation'
  employee: string
  empId: string
  department: string
  title: string
  details: string
  date: string
  amount?: string
  status: 'pending' | 'approved' | 'rejected'
  tier: string
}

const initialItems: ApprovalItem[] = [
  {
    id: 'req-101',
    type: 'leave',
    employee: 'Priya Sharma',
    empId: 'PC-1002',
    department: 'Engineering',
    title: 'Earned Leave (3 Days)',
    details: 'Family emergency and personal travel to home town.',
    date: '12 Nov 2026 – 14 Nov 2026',
    status: 'pending',
    tier: 'Level 1: Reporting Manager',
  },
  {
    id: 'req-102',
    type: 'expense',
    employee: 'Arjun Mehta',
    empId: 'PC-1005',
    department: 'Design',
    title: 'Figma Enterprise Organization Annual Seat',
    details: 'Invoice attached. Approved as part of design software budget.',
    date: '08 Nov 2026',
    amount: '₹37,500',
    status: 'pending',
    tier: 'Level 2: Finance Department',
  },
  {
    id: 'req-103',
    type: 'attendance',
    employee: 'Sneha Patil',
    empId: 'PC-1008',
    department: 'DevOps & Cloud',
    title: 'Missed Check-In Regularization',
    details: 'Biometric gate reader offline at North Tower entry turnstile.',
    date: '07 Nov 2026 (09:15 AM)',
    status: 'pending',
    tier: 'Level 1: HR Admin',
  },
  {
    id: 'req-104',
    type: 'expense',
    employee: 'Karan Verma',
    empId: 'PC-1012',
    department: 'Marketing',
    title: 'Client Dinner & Airport Taxi',
    details: 'Uber business receipts and GST tax invoice attached.',
    date: '06 Nov 2026',
    amount: '₹4,820',
    status: 'pending',
    tier: 'Level 1: Reporting Manager',
  },
  {
    id: 'req-105',
    type: 'resignation',
    employee: 'Aditi Rao',
    empId: 'PC-1020',
    department: 'Sales',
    title: 'Resignation & Notice Period (30 Days)',
    details: 'Pursuing higher studies (MBA). Target relieving date 15 Dec 2026.',
    date: 'Submitted 05 Nov 2026',
    status: 'pending',
    tier: 'Level 3: HR Head & Management',
  },
]

export function ApprovalsClient() {
  const [items, setItems] = React.useState<ApprovalItem[]>(initialItems)
  const [filterType, setFilterType] = React.useState<string>('all')
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null)

  const handleAction = (id: string, newStatus: 'approved' | 'rejected') => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
    )
    setSuccessMsg(`Request ${id} marked as ${newStatus}`)
    setTimeout(() => setSuccessMsg(null), 3000)
  }

  const handleBulkApprove = () => {
    setItems((prev) =>
      prev.map((i) => (i.status === 'pending' ? { ...i, status: 'approved' } : i))
    )
    setSuccessMsg('All pending requests approved successfully!')
    setTimeout(() => setSuccessMsg(null), 3000)
  }

  const filtered = items.filter((item) => {
    if (filterType === 'all') return item.status === 'pending'
    return item.type === filterType && item.status === 'pending'
  })

  const pendingCount = items.filter((i) => i.status === 'pending').length

  const getIcon = (type: ApprovalItem['type']) => {
    switch (type) {
      case 'leave':
        return <PalmtreeIcon className="h-4 w-4 text-[#5e2b9d]" />
      case 'attendance':
        return <Clock className="h-4 w-4 text-blue-600" />
      case 'expense':
        return <Receipt className="h-4 w-4 text-emerald-600" />
      case 'resignation':
        return <LogOut className="h-4 w-4 text-amber-600" />
    }
  }

  return (
    <div className="space-y-6">
      {successMsg && (
        <div className="bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534] px-4 py-2.5 rounded-[6px] text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-[#16a34a]" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Filter and Bulk Action bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#e5e7eb] pb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: `All Pending (${pendingCount})` },
            { id: 'leave', label: 'Leaves' },
            { id: 'attendance', label: 'Attendance' },
            { id: 'expense', label: 'Expenses' },
            { id: 'resignation', label: 'Separations' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-[6px] transition-colors ${
                filterType === tab.id
                  ? 'bg-[#5e2b9d] text-white shadow-xs'
                  : 'text-[#6b7280] hover:text-[#111827] hover:bg-[#f3f4f6]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {pendingCount > 0 && (
          <Button
            size="sm"
            onClick={handleBulkApprove}
            className="h-8 gap-1 text-xs bg-[#16a34a] hover:bg-[#15803d] text-white"
          >
            <Check className="h-3.5 w-3.5" /> Bulk Approve All ({pendingCount})
          </Button>
        )}
      </div>

      {filtered.length === 0 ? (
        <Card className="p-8 text-center">
          <EmptyState
            title="Inbox Zero! No pending approvals"
            description="All employee workflow requests in this category have been processed."
          />
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <Card key={item.id} className="p-4 hover:border-[#d1d5db] transition-colors">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#f9fafb] border border-[#e5e7eb] rounded-[8px] mt-0.5">
                    {getIcon(item.type)}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-[#111827]">{item.title}</span>
                      {item.amount && (
                        <span className="font-bold text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          {item.amount}
                        </span>
                      )}
                      <span className="text-[10px] text-[#6b7280] bg-[#f3f4f6] px-1.5 py-0.5 rounded font-mono">
                        {item.tier}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <Avatar name={item.employee} size="sm" />
                      <span className="font-medium text-xs text-[#111827]">{item.employee}</span>
                      <span className="text-[11px] font-mono text-[#9ca3af]">({item.empId})</span>
                      <span className="text-xs text-[#9ca3af]">•</span>
                      <span className="text-xs text-[#6b7280]">{item.department}</span>
                      <span className="text-xs text-[#9ca3af]">•</span>
                      <span className="text-xs text-[#6b7280] flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-[#9ca3af]" /> {item.date}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-[#4b5563] bg-[#f9fafb] p-2 rounded border border-[#f3f4f6]">
                      {item.details}
                    </p>
                  </div>
                </div>

                {/* Approve / Reject buttons */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <Button
                    size="sm"
                    onClick={() => handleAction(item.id, 'approved')}
                    className="h-8 gap-1 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs px-3"
                  >
                    <Check className="h-3.5 w-3.5" /> Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAction(item.id, 'rejected')}
                    className="h-8 gap-1 text-[#dc2626] border-[#fecaca] hover:bg-[#fef2f2] text-xs px-3"
                  >
                    <X className="h-3.5 w-3.5" /> Reject
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

