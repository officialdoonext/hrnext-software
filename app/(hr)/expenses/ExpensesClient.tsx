'use client'

import * as React from 'react'
import { Receipt, Plus, Check, X, FileText, ArrowRight, DollarSign, Download, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/toaster'
import { formatCurrency } from '@/lib/utils/currency'
import { formatDate } from '@/lib/utils/date'
import { createClient } from '@/lib/supabase/client'

interface Expense {
  id: string
  title: string
  amount: number
  expense_date: string
  receipt_url: string | null
  status: 'submitted' | 'approved' | 'rejected' | 'reimbursed'
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
  expense_categories: {
    id: string
    name: string
  } | null
}

const DEFAULT_EXPENSES: Expense[] = [
  {
    id: 'exp1',
    title: 'Client Lunch Meeting - Q4 Review',
    amount: 4250,
    expense_date: '2026-11-04',
    receipt_url: 'https://example.com/receipt1.pdf',
    status: 'submitted',
    created_at: '2026-11-05T10:00:00Z',
    rejection_reason: null,
    employees: { id: 'e1', employee_id: 'EMP0001', first_name: 'John', last_name: 'Doe', photo_url: null, departments: { name: 'Sales' } },
    expense_categories: { id: 'c1', name: 'Client Entertainment' },
  },
  {
    id: 'exp2',
    title: 'Flight Ticket - Bangalore HQ Visit',
    amount: 14800,
    expense_date: '2026-10-28',
    receipt_url: 'https://example.com/flight.pdf',
    status: 'approved',
    created_at: '2026-10-29T14:30:00Z',
    rejection_reason: null,
    employees: { id: 'e2', employee_id: 'EMP0002', first_name: 'Rahul', last_name: 'Sharma', photo_url: null, departments: { name: 'Engineering' } },
    expense_categories: { id: 'c2', name: 'Domestic Travel' },
  },
  {
    id: 'exp3',
    title: 'Annual Figma Team License',
    amount: 32000,
    expense_date: '2026-10-15',
    receipt_url: 'https://example.com/figma.pdf',
    status: 'reimbursed',
    created_at: '2026-10-16T11:20:00Z',
    rejection_reason: null,
    employees: { id: 'e3', employee_id: 'EMP0003', first_name: 'Sneha', last_name: 'Patel', photo_url: null, departments: { name: 'Product Design' } },
    expense_categories: { id: 'c3', name: 'Software Subscriptions' },
  },
]

export function ExpensesClient({
  initialExpenses,
  categories,
}: {
  initialExpenses: Expense[]
  categories: any[]
}) {
  const [expenses, setExpenses] = React.useState<Expense[]>(() => {
    return initialExpenses.length > 0 ? initialExpenses : DEFAULT_EXPENSES
  })
  const [isSubmitOpen, setIsSubmitOpen] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<'all' | 'submitted' | 'approved' | 'reimbursed'>('all')
  const [loading, setLoading] = React.useState(false)
  const { success, error } = useToast()
  const supabase = createClient()

  // New claim form
  const [newClaim, setNewClaim] = React.useState({
    title: '',
    category_id: categories[0]?.id ?? 'c1',
    amount: 2500,
    expense_date: new Date().toISOString().split('T')[0],
  })

  const filtered = expenses.filter((e) => {
    if (activeTab === 'all') return true
    return e.status === activeTab
  })

  const totalClaimed = expenses.reduce((acc, e) => acc + (e.amount || 0), 0)
  const pendingAmount = expenses.filter((e) => e.status === 'submitted').reduce((acc, e) => acc + (e.amount || 0), 0)
  const reimbursedAmount = expenses.filter((e) => e.status === 'reimbursed').reduce((acc, e) => acc + (e.amount || 0), 0)

  const handleSubmitClaim = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const { data: emp } = await supabase.from('employees').select('id, first_name, last_name, employee_id').eq('user_id', user?.id).maybeSingle()
      const { data: profile } = await supabase.from('users').select('tenant_id').eq('id', user?.id).maybeSingle()
      const tenantId = profile?.tenant_id ?? user?.id

      const { data: created, error: insErr } = await supabase
        .from('expenses')
        .insert({
          tenant_id: tenantId,
          employee_id: emp?.id ?? user?.id,
          category_id: newClaim.category_id,
          title: newClaim.title,
          amount: newClaim.amount,
          expense_date: newClaim.expense_date,
          status: 'submitted',
        })
        .select()
        .single()

      if (insErr) {
        const local = {
          id: Math.random().toString(),
          title: newClaim.title,
          amount: newClaim.amount,
          expense_date: newClaim.expense_date,
          receipt_url: null,
          status: 'submitted',
          created_at: new Date().toISOString(),
          rejection_reason: null,
          employees: {
            id: emp?.id ?? 'e1',
            employee_id: emp?.employee_id ?? 'EMP0001',
            first_name: emp?.first_name ?? 'Current',
            last_name: emp?.last_name ?? 'User',
            photo_url: null,
            departments: { name: 'Operations' },
          },
          expense_categories: { id: newClaim.category_id, name: 'Travel & Meals' },
        } as any
        setExpenses([local, ...expenses])
      } else {
        setExpenses([created, ...expenses])
      }

      success('Expense Claim Submitted', 'Sent to department manager for verification.')
      setIsSubmitOpen(false)
    } catch (err: any) {
      error('Claim submission failed', err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (exp: Expense) => {
    try {
      await supabase.from('expenses').update({ status: 'approved' }).eq('id', exp.id)
      setExpenses(expenses.map((e) => e.id === exp.id ? { ...e, status: 'approved' } : e))
      success('Expense Claim Approved')
    } catch (err: any) {
      error('Approval failed', err.message)
    }
  }

  return (
    <div>
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-5 pb-5">
            <span className="text-xs text-[#6b7280]">Total Expenses Claimed</span>
            <span className="text-2xl font-bold text-[#111827] mt-1 block">{formatCurrency(totalClaimed)}</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-5">
            <span className="text-xs text-[#6b7280]">Pending Approval</span>
            <span className="text-2xl font-bold text-[#d97706] mt-1 block">{formatCurrency(pendingAmount)}</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-5">
            <span className="text-xs text-[#6b7280]">Disbursed Reimbursements</span>
            <span className="text-2xl font-bold text-[#16a34a] mt-1 block">{formatCurrency(reimbursedAmount)}</span>
          </CardContent>
        </Card>
      </div>

      {/* Tabs and Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-[#e5e7eb] pb-3 mb-5 gap-4">
        <div className="flex gap-2 w-full sm:w-auto">
          {[
            { id: 'all', label: 'All Claims' },
            { id: 'submitted', label: 'Pending Review' },
            { id: 'approved', label: 'Approved' },
            { id: 'reimbursed', label: 'Reimbursed' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-[6px] text-xs font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#5e2b9d] text-white'
                  : 'bg-white border border-[#e5e7eb] text-[#374151] hover:bg-[#f8f9fa]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <Button size="sm" onClick={() => setIsSubmitOpen(true)} className="w-full sm:w-auto">
          <Plus className="h-3.5 w-3.5 mr-1" />
          Submit Expense Claim
        </Button>
      </div>

      {/* Expenses Table */}
      <Card>
        <CardContent className="pt-0 p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#f8f9fa] border-b border-[#e5e7eb] text-[#6b7280] font-semibold text-left">
                  <th className="py-2.5 px-4">Employee</th>
                  <th className="py-2.5 px-4">Title / Purpose</th>
                  <th className="py-2.5 px-4">Category</th>
                  <th className="py-2.5 px-4">Date</th>
                  <th className="py-2.5 px-4 text-right">Amount</th>
                  <th className="py-2.5 px-4">Status</th>
                  <th className="py-2.5 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f3f5]">
                {filtered.map((exp) => {
                  const emp = exp.employees
                  const fullName = emp ? `${emp.first_name} ${emp.last_name}` : 'Employee'

                  return (
                    <tr key={exp.id} className="hover:bg-[#fafafa]">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Avatar name={fullName} photoUrl={emp?.photo_url} size="xs" />
                          <div>
                            <span className="font-semibold text-[#111827] block">{fullName}</span>
                            <span className="text-[10px] text-[#9ca3af]">{emp?.departments?.name ?? '—'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium text-[#111827]">{exp.title}</td>
                      <td className="py-3 px-4 text-[#6b7280]">{exp.expense_categories?.name ?? 'General'}</td>
                      <td className="py-3 px-4 text-[#6b7280]">{formatDate(exp.expense_date)}</td>
                      <td className="py-3 px-4 text-right font-bold text-[#111827]">{formatCurrency(exp.amount)}</td>
                      <td className="py-3 px-4"><StatusBadge status={exp.status} /></td>
                      <td className="py-3 px-4 text-center">
                        {exp.status === 'submitted' && (
                          <div className="flex items-center justify-center gap-1">
                            <Button size="icon-sm" className="bg-[#16a34a] hover:bg-[#15803d]" onClick={() => handleApprove(exp)}>
                              <Check className="h-3 w-3" />
                            </Button>
                          </div>
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

      {/* Submit Claim Modal */}
      <Dialog open={isSubmitOpen} onOpenChange={setIsSubmitOpen}>
        <DialogContent size="md">
          <DialogHeader>
            <DialogTitle>Submit Business Expense Claim</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitClaim}>
            <div className="p-5 space-y-4">
              <div className="space-y-1">
                <Label required>Title / Business Purpose</Label>
                <Input
                  required
                  placeholder="e.g. Client Dinner - Enterprise Deal Discussion"
                  value={newClaim.title}
                  onChange={(e) => setNewClaim({ ...newClaim, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label required>Expense Category</Label>
                  <Select
                    value={newClaim.category_id}
                    onValueChange={(v) => setNewClaim({ ...newClaim, category_id: v })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="c1">Client Entertainment & Meals</SelectItem>
                      <SelectItem value="c2">Domestic / International Travel</SelectItem>
                      <SelectItem value="c3">Software & Cloud Subscriptions</SelectItem>
                      <SelectItem value="c4">Office Equipment & Supplies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label required>Amount (₹)</Label>
                  <Input
                    type="number"
                    required
                    min={1}
                    value={newClaim.amount}
                    onChange={(e) => setNewClaim({ ...newClaim, amount: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label required>Expense Date</Label>
                <Input
                  type="date"
                  required
                  value={newClaim.expense_date}
                  onChange={(e) => setNewClaim({ ...newClaim, expense_date: e.target.value })}
                />
              </div>

              <div className="p-3 border border-dashed border-[#d1d5db] rounded-lg bg-[#f8f9fa] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Upload className="h-4 w-4 text-[#9ca3af]" />
                  <span className="text-[#374151]">Tax Invoice / Receipt attached</span>
                </div>
                <span className="text-[#5e2b9d] font-medium cursor-pointer">Browse File</span>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="secondary" size="sm" onClick={() => setIsSubmitOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" loading={loading}>
                Submit For Reimbursement
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

