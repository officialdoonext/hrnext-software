import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { PayslipPrintView } from './PayslipPrintView'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  const { data: emp } = await supabase.from('employees').select('first_name, last_name').eq('id', id).maybeSingle()
  return {
    title: emp ? `Payslip - ${emp.first_name} ${emp.last_name}` : 'Payslip',
  }
}

export default async function PayslipPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch company details
  const { data: company } = await supabase.from('companies').select('*').maybeSingle()

  // Fetch employee with statutory and bank details
  const [
    { data: employee },
    { data: statutory },
    { data: bankAccounts },
    { data: salary },
  ] = await Promise.all([
    supabase
      .from('employees')
      .select(`
        *,
        departments (name),
        designations (name),
        branches (name)
      `)
      .eq('id', id)
      .maybeSingle(),
    supabase.from('employee_statutory_details').select('*').eq('employee_id', id).maybeSingle(),
    supabase.from('employee_bank_accounts').select('*').eq('employee_id', id),
    supabase.from('employee_salary_assignments').select('*').eq('employee_id', id).eq('is_current', true).maybeSingle(),
  ])

  if (!employee) notFound()

  return (
    <PayslipPrintView
      company={company}
      employee={employee}
      statutory={statutory}
      bank={bankAccounts?.[0] ?? null}
      salary={salary}
    />
  )
}

