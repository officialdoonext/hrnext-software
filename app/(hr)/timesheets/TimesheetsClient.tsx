'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import {
  Timer,
  Plus,
  Trash2,
  Send,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  Clock,
  Briefcase,
  Users,
} from 'lucide-react'

interface TimeEntryRow {
  id: string
  project: string
  task: string
  billable: boolean
  hours: number[] // 7 days [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
}

const initialRows: TimeEntryRow[] = [
  {
    id: 'row-1',
    project: 'Fintech Core Engine',
    task: 'Payment Gateway Integration & Webhook Handler',
    billable: true,
    hours: [8, 8, 8, 7.5, 8, 0, 0],
  },
  {
    id: 'row-2',
    project: 'Internal HR Portal',
    task: 'Next.js 16 Upgrade & Auth Proxy Tuning',
    billable: false,
    hours: [0, 0, 0, 1, 0.5, 0, 0],
  },
  {
    id: 'row-3',
    project: 'Client Mobile App',
    task: 'Sprint Planning & Architecture Code Review',
    billable: true,
    hours: [0.5, 1, 0.5, 0, 0, 0, 0],
  },
]

const teamSubmissions = [
  {
    id: 'ts-01',
    employee: 'Priya Sharma',
    empId: 'PC-1002',
    department: 'Engineering',
    week: 'Nov 03 - Nov 09, 2026',
    totalHours: 42.5,
    billableHours: 39.5,
    status: 'pending',
  },
  {
    id: 'ts-02',
    employee: 'Arjun Mehta',
    empId: 'PC-1005',
    department: 'Product Design',
    week: 'Nov 03 - Nov 09, 2026',
    totalHours: 40.0,
    billableHours: 40.0,
    status: 'pending',
  },
  {
    id: 'ts-03',
    employee: 'Sneha Patil',
    empId: 'PC-1008',
    department: 'DevOps & Cloud',
    week: 'Nov 03 - Nov 09, 2026',
    totalHours: 41.0,
    billableHours: 35.0,
    status: 'approved',
  },
]

const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const dayDates = ['03 Nov', '04 Nov', '05 Nov', '06 Nov', '07 Nov', '08 Nov', '09 Nov']

export function TimesheetsClient() {
  const [activeTab, setActiveTab] = React.useState<'my' | 'team'>('my')
  const [rows, setRows] = React.useState<TimeEntryRow[]>(initialRows)
  const [status, setStatus] = React.useState<'draft' | 'pending' | 'approved'>('draft')
  const [submissions, setSubmissions] = React.useState(teamSubmissions)
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null)

  const handleHourChange = (rowId: string, dayIndex: number, value: string) => {
    const num = Math.max(0, Math.min(24, parseFloat(value) || 0))
    setRows((prev) =>
      prev.map((r) => {
        if (r.id !== rowId) return r
        const newHours = [...r.hours]
        newHours[dayIndex] = num
        return { ...r, hours: newHours }
      })
    )
  }

  const addRow = () => {
    const newRow: TimeEntryRow = {
      id: `row-${Date.now()}`,
      project: 'New Project Work',
      task: 'Feature Implementation',
      billable: true,
      hours: [0, 0, 0, 0, 0, 0, 0],
    }
    setRows((prev) => [...prev, newRow])
  }

  const removeRow = (id: string) => {
    if (rows.length <= 1) return
    setRows((prev) => prev.filter((r) => r.id !== id))
  }

  const handleSubmit = () => {
    setStatus('pending')
    setSuccessMsg('Timesheet submitted for managerial approval!')
    setTimeout(() => setSuccessMsg(null), 3000)
  }

  const handleTeamAction = (id: string, newStatus: 'approved' | 'rejected') => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    )
    setSuccessMsg(`Timesheet ${id} marked as ${newStatus}`)
    setTimeout(() => setSuccessMsg(null), 3000)
  }

  // Calculations
  const dayTotals = dayNames.map((_, i) =>
    rows.reduce((sum, r) => sum + (r.hours[i] || 0), 0)
  )
  const grandTotal = dayTotals.reduce((a, b) => a + b, 0)
  const billableTotal = rows
    .filter((r) => r.billable)
    .reduce((sum, r) => sum + r.hours.reduce((a, b) => a + b, 0), 0)
  const nonBillableTotal = grandTotal - billableTotal

  return (
    <div className="space-y-6">
      {successMsg && (
        <div className="bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534] px-4 py-2.5 rounded-[6px] text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-[#16a34a]" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* View Switcher & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#e5e7eb] pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('my')}
            className={`px-3 py-1.5 text-xs font-medium rounded-[6px] transition-colors flex items-center gap-1.5 ${
              activeTab === 'my'
                ? 'bg-[#5e2b9d] text-white shadow-xs'
                : 'text-[#6b7280] hover:text-[#111827] hover:bg-[#f3f4f6]'
            }`}
          >
            <Timer className="h-3.5 w-3.5" /> My Weekly Timesheet
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`px-3 py-1.5 text-xs font-medium rounded-[6px] transition-colors flex items-center gap-1.5 ${
              activeTab === 'team'
                ? 'bg-[#5e2b9d] text-white shadow-xs'
                : 'text-[#6b7280] hover:text-[#111827] hover:bg-[#f3f4f6]'
            }`}
          >
            <Users className="h-3.5 w-3.5" /> Team Approvals ({submissions.filter((s) => s.status === 'pending').length})
          </button>
        </div>

        {/* Week navigation */}
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center border border-[#e5e7eb] rounded-[6px] bg-white overflow-hidden shadow-xs">
            <button className="p-1.5 hover:bg-[#f3f4f6] text-[#6b7280]">
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <span className="px-3 font-semibold text-[#111827]">03 Nov – 09 Nov, 2026</span>
            <button className="p-1.5 hover:bg-[#f3f4f6] text-[#6b7280]">
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'my' ? (
        <>
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Card className="p-4 bg-white">
              <span className="text-xs text-[#6b7280] font-medium">Total Logged</span>
              <p className="text-2xl font-bold text-[#111827] mt-1">{grandTotal.toFixed(1)} hrs</p>
              <span className="text-[11px] text-[#9ca3af]">Standard target: 40 hrs</span>
            </Card>
            <Card className="p-4 bg-white">
              <span className="text-xs text-[#6b7280] font-medium">Billable Hours</span>
              <p className="text-2xl font-bold text-[#16a34a] mt-1">{billableTotal.toFixed(1)} hrs</p>
              <span className="text-[11px] text-[#16a34a] font-medium">
                {grandTotal > 0 ? Math.round((billableTotal / grandTotal) * 100) : 0}% utilization
              </span>
            </Card>
            <Card className="p-4 bg-white">
              <span className="text-xs text-[#6b7280] font-medium">Non-Billable</span>
              <p className="text-2xl font-bold text-[#6b7280] mt-1">{nonBillableTotal.toFixed(1)} hrs</p>
              <span className="text-[11px] text-[#9ca3af]">Internal / admin overhead</span>
            </Card>
            <Card className="p-4 bg-white flex flex-col justify-between">
              <div>
                <span className="text-xs text-[#6b7280] font-medium">Current Status</span>
                <div className="mt-1">
                  <StatusBadge status={status} />
                </div>
              </div>
              <div className="text-[11px] text-[#6b7280]">Due by Sunday midnight</div>
            </Card>
          </div>

          {/* Timesheet Matrix Table */}
          <Card className="overflow-hidden border border-[#e5e7eb] shadow-sm">
            <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#5e2b9d]" />
                <h3 className="text-sm font-semibold text-[#111827]">Weekly Time Allocation Matrix</h3>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={addRow}
                className="h-8 gap-1 text-xs"
              >
                <Plus className="h-3.5 w-3.5" /> Add Project Task
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                    <th className="py-2.5 px-3 font-semibold min-w-[200px]">Project & Client</th>
                    <th className="py-2.5 px-3 font-semibold min-w-[240px]">Task Description</th>
                    <th className="py-2.5 px-2 font-semibold text-center w-16">Billable</th>
                    {dayNames.map((day, idx) => (
                      <th key={day} className="py-2.5 px-1.5 font-semibold text-center w-14">
                        <div>{day}</div>
                        <div className="text-[10px] text-[#9ca3af] font-normal">{dayDates[idx]}</div>
                      </th>
                    ))}
                    <th className="py-2.5 px-3 font-semibold text-right w-16">Total</th>
                    <th className="py-2.5 px-2 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5e7eb]">
                  {rows.map((row) => {
                    const rowTotal = row.hours.reduce((a, b) => a + b, 0)
                    return (
                      <tr key={row.id} className="hover:bg-[#f9fafb] transition-colors">
                        <td className="p-2.5">
                          <input
                            type="text"
                            value={row.project}
                            onChange={(e) => {
                              const v = e.target.value
                              setRows((prev) =>
                                prev.map((r) => (r.id === row.id ? { ...r, project: v } : r))
                              )
                            }}
                            className="w-full text-xs font-semibold text-[#111827] bg-transparent border-0 border-b border-transparent focus:border-[#5e2b9d] focus:outline-none px-1 py-1"
                          />
                        </td>
                        <td className="p-2.5">
                          <input
                            type="text"
                            value={row.task}
                            onChange={(e) => {
                              const v = e.target.value
                              setRows((prev) =>
                                prev.map((r) => (r.id === row.id ? { ...r, task: v } : r))
                              )
                            }}
                            className="w-full text-xs text-[#4b5563] bg-transparent border-0 border-b border-transparent focus:border-[#5e2b9d] focus:outline-none px-1 py-1"
                          />
                        </td>
                        <td className="p-2.5 text-center">
                          <input
                            type="checkbox"
                            checked={row.billable}
                            onChange={(e) => {
                              const c = e.target.checked
                              setRows((prev) =>
                                prev.map((r) => (r.id === row.id ? { ...r, billable: c } : r))
                              )
                            }}
                            className="h-3.5 w-3.5 rounded text-[#5e2b9d] accent-[#5e2b9d]"
                          />
                        </td>
                        {row.hours.map((hr, idx) => (
                          <td key={idx} className="p-1 text-center">
                            <input
                              type="number"
                              min="0"
                              max="24"
                              step="0.5"
                              value={hr === 0 ? '' : hr}
                              placeholder="0"
                              onChange={(e) => handleHourChange(row.id, idx, e.target.value)}
                              className="w-12 h-8 text-center text-xs font-medium border border-[#e5e7eb] rounded-[4px] focus:outline-none focus:border-[#5e2b9d] focus:ring-1 focus:ring-[#5e2b9d]"
                            />
                          </td>
                        ))}
                        <td className="p-2.5 text-right font-bold text-[#111827]">
                          {rowTotal.toFixed(1)}
                        </td>
                        <td className="p-2 text-center">
                          <button
                            type="button"
                            onClick={() => removeRow(row.id)}
                            className="text-[#9ca3af] hover:text-[#dc2626] p-1 rounded transition-colors"
                            title="Delete row"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    )
                  })}

                  {/* Summary Footer */}
                  <tr className="bg-[#f9fafb] font-bold text-[#111827] border-t-2 border-[#e5e7eb]">
                    <td colSpan={3} className="py-3 px-3 text-right">
                      Daily Total:
                    </td>
                    {dayTotals.map((dt, idx) => (
                      <td key={idx} className="py-3 px-1 text-center text-xs">
                        <span
                          className={`inline-block px-1.5 py-0.5 rounded ${
                            dt >= 8
                              ? 'bg-emerald-50 text-emerald-700'
                              : dt > 0
                              ? 'bg-purple-50 text-[#5e2b9d]'
                              : 'text-[#9ca3af]'
                          }`}
                        >
                          {dt.toFixed(1)}
                        </span>
                      </td>
                    ))}
                    <td className="py-3 px-3 text-right text-sm text-[#5e2b9d]">
                      {grandTotal.toFixed(1)}
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-white border-t border-[#e5e7eb] flex items-center justify-between">
              <span className="text-xs text-[#6b7280]">
                All time entries auto-saved as draft.
              </span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-9 gap-1 text-xs">
                  Save Draft
                </Button>
                <Button
                  size="sm"
                  onClick={handleSubmit}
                  disabled={status === 'approved'}
                  className="h-9 gap-1.5 text-xs bg-[#5e2b9d] hover:bg-[#4d2382] text-white"
                >
                  <Send className="h-3.5 w-3.5" /> Submit for Approval
                </Button>
              </div>
            </div>
          </Card>
        </>
      ) : (
        /* Team Timesheets Review Tab */
        <div className="space-y-4">
          <Card className="overflow-hidden border border-[#e5e7eb]">
            <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb]">
              <h3 className="text-sm font-semibold text-[#111827]">Direct Reports Timesheet Inbox</h3>
              <p className="text-xs text-[#6b7280] mt-0.5">
                Review and approve team time allocations for payroll proration and client invoicing.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                    <th className="py-2.5 px-4 font-semibold">Employee</th>
                    <th className="py-2.5 px-3 font-semibold">Department</th>
                    <th className="py-2.5 px-3 font-semibold">Period</th>
                    <th className="py-2.5 px-3 font-semibold text-center">Total Hours</th>
                    <th className="py-2.5 px-3 font-semibold text-center">Billable %</th>
                    <th className="py-2.5 px-3 font-semibold text-center">Status</th>
                    <th className="py-2.5 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5e7eb]">
                  {submissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-[#f9fafb] transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <Avatar name={sub.employee} size="sm" />
                          <div>
                            <p className="font-semibold text-xs text-[#111827]">{sub.employee}</p>
                            <p className="text-[10px] font-mono text-[#6b7280]">{sub.empId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-[#374151]">{sub.department}</td>
                      <td className="py-3 px-3 text-[#6b7280]">{sub.week}</td>
                      <td className="py-3 px-3 text-center font-bold text-[#111827]">
                        {sub.totalHours} hrs
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                          {Math.round((sub.billableHours / sub.totalHours) * 100)}%
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <StatusBadge status={sub.status} />
                      </td>
                      <td className="py-3 px-4 text-right">
                        {sub.status === 'pending' ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              size="sm"
                              onClick={() => handleTeamAction(sub.id, 'approved')}
                              className="h-7 text-xs bg-[#16a34a] hover:bg-[#15803d] text-white px-2.5"
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleTeamAction(sub.id, 'rejected')}
                              className="h-7 text-xs text-[#dc2626] border-[#fecaca] hover:bg-[#fef2f2] px-2.5"
                            >
                              Reject
                            </Button>
                          </div>
                        ) : (
                          <span className="text-[11px] text-[#9ca3af]">Completed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

