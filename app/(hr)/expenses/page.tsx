import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/layout/PageHeader'
import { ExpensesClient } from './ExpensesClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Expense Claims & Reimbursements' }

export default async function ExpensesPage() {
  const supabase = await createClient()

  // Fetch expense claims with employee and category info
  const { data: expenses } = await supabase
    .from('expenses')
    .select(`
      id, title, amount, expense_date, receipt_url, status, created_at, rejection_reason,
      employees (id, employee_id, first_name, last_name, photo_url, departments (name)),
      expense_categories (id, name)
    `)
    .order('created_at', { ascending: false })

  const { data: categories } = await supabase
    .from('expense_categories')
    .select('*')
    .eq('status', 'active')

  return (
    <div>
      <PageHeader
        title="Expense Claims & Reimbursements"
        description="Submit business expenses, track approval workflows, and disburse travel and meal reimbursements."
        breadcrumb={[
          { label: 'Finance', href: '/expenses' },
          { label: 'Expenses' },
        ]}
      />
      <ExpensesClient
        initialExpenses={(expenses as any) ?? []}
        categories={(categories as any) ?? []}
      />
    </div>
  )
}

