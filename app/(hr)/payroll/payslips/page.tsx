import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/common/Avatar'
import { formatCurrency } from '@/lib/utils/currency'
import { formatDate } from '@/lib/utils/date'
import { FileText, Download, Printer, Search } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Payslips Registry' }

export default async function PayslipsRegistryPage() {
  const supabase = await createClient()

  // Fetch employees with their current salary assignments
  const { data: employees } = await supabase
    .from('employees')
    .select(`
      id, employee_id, first_name, last_name, photo_url,
      departments (name),
      designations (name),
      employee_salary_assignments (monthly_ctc, gross_salary, is_current)
    `)
    .eq('employment_status', 'active')
    .order('first_name')

  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' })

  return (
    <div>
      <PageHeader
        title="Payslips Registry"
        description={`View and generate official confidential payslips for ${currentMonth}.`}
        breadcrumb={[
          { label: 'Payroll', href: '/payroll' },
          { label: 'Payslips' },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees && employees.length > 0 ? (
          employees.map((emp: any) => {
            const currentSalary = emp.employee_salary_assignments?.find((s: any) => s.is_current)
            const monthlyCtc = currentSalary?.monthly_ctc ?? 65000
            const gross = Math.round(monthlyCtc * 0.95)
            const net = Math.round(gross - 1800 - 200)

            return (
              <Card key={emp.id} className="overflow-hidden hover:border-[#5e2b9d] transition-colors">
                <CardContent className="pt-5 pb-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar name={`${emp.first_name} ${emp.last_name}`} photoUrl={emp.photo_url} size="md" />
                      <div>
                        <h4 className="text-sm font-semibold text-[#111827]">
                          {emp.first_name} {emp.last_name}
                        </h4>
                        <span className="text-xs text-[#9ca3af] font-mono">{emp.employee_id}</span>
                        <p className="text-[11px] text-[#6b7280]">{emp.designations?.name ?? 'Employee'}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-medium bg-[#f0fdf4] text-[#16a34a] px-2 py-0.5 rounded-[4px]">
                      Published
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#f1f3f5] grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[#9ca3af]">Period:</span>
                      <p className="font-medium text-[#111827]">{currentMonth}</p>
                    </div>
                    <div>
                      <span className="text-[#9ca3af]">Net Payout:</span>
                      <p className="font-bold text-[#16a34a] text-sm">{formatCurrency(net)}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#f1f3f5] flex items-center justify-between">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/payroll/payslips/${emp.id}`} target="_blank" className="text-xs text-[#5e2b9d]">
                        <FileText className="h-3.5 w-3.5 mr-1" /> View Payslip
                      </Link>
                    </Button>
                    <Button size="sm" variant="secondary" asChild>
                      <Link href={`/payroll/payslips/${emp.id}`} target="_blank">
                        <Printer className="h-3.5 w-3.5" /> Print
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })
        ) : (
          <div className="col-span-full py-16 text-center">
            <FileText className="h-10 w-10 text-[#d1d5db] mx-auto mb-2" />
            <p className="text-sm font-medium text-[#374151]">No payslips generated yet</p>
            <p className="text-xs text-[#9ca3af] mt-0.5">Finalize a monthly payroll run to generate official payslips.</p>
          </div>
        )}
      </div>
    </div>
  )
}

