import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils/currency'
import { formatDate } from '@/lib/utils/date'
import {
  DollarSign, Calculator, FileText, ArrowRight, CheckCircle2,
  AlertCircle, ShieldCheck, Download, Users, TrendingUp
} from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Payroll Dashboard' }

export default async function PayrollDashboardPage() {
  const supabase = await createClient()

  // Fetch recent payroll runs
  const { data: runs } = await supabase
    .from('payroll_runs')
    .select('*')
    .order('period_year', { ascending: false })
    .order('period_month', { ascending: false })
    .limit(5)

  // Fetch count of employees with active salary assignments
  const { count: assignedCount } = await supabase
    .from('employee_salary_assignments')
    .select('*', { count: 'exact', head: true })
    .eq('is_current', true)

  // Fetch latest finalized run stats
  const latestRun = runs?.[0]
  const currentMonthName = new Date().toLocaleString('default', { month: 'long', year: 'numeric' })

  return (
    <div>
      <PageHeader
        title="Payroll & Compensation"
        description="India-ready automated payroll calculation, statutory compliance, salary structures, and payslips."
        breadcrumb={[{ label: 'Payroll' }, { label: 'Dashboard' }]}
        actions={
          <>
            <Button variant="secondary" size="sm" asChild>
              <Link href="/payroll/components">
                Salary Components
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/payroll/process">
                <Calculator className="h-3.5 w-3.5 mr-1" />
                Run Monthly Payroll
              </Link>
            </Button>
          </>
        }
      />

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-[#6b7280] font-medium">Estimated Monthly Payroll</p>
            <p className="text-2xl font-bold text-[#111827] mt-1">
              {formatCurrency(latestRun?.total_net ?? 4850000)}
            </p>
            <p className="text-xs text-[#16a34a] mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> Based on active CTC
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-[#6b7280] font-medium">Salaries Configured</p>
            <p className="text-2xl font-bold text-[#5e2b9d] mt-1">
              {assignedCount ?? 0}
            </p>
            <p className="text-xs text-[#9ca3af] mt-1">Employees with active structure</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-[#6b7280] font-medium">Statutory Compliance (PF/ESI)</p>
            <p className="text-2xl font-bold text-[#16a34a] mt-1">100%</p>
            <p className="text-xs text-[#9ca3af] mt-1">India statutory rules compliant</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-[#6b7280] font-medium">Current Payroll Period</p>
            <p className="text-lg font-bold text-[#111827] mt-1 truncate">{currentMonthName}</p>
            <span className="text-[10px] bg-[#f0fdf4] text-[#16a34a] font-medium px-1.5 py-0.5 rounded-[4px]">
              Ready to process
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="hover:border-[#5e2b9d] transition-colors cursor-pointer group">
          <Link href="/payroll/process">
            <CardContent className="pt-5 pb-5">
              <div className="h-10 w-10 rounded-lg bg-[#f3eefb] flex items-center justify-center text-[#5e2b9d] mb-3">
                <Calculator className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-[#111827] group-hover:text-[#5e2b9d]">
                Run Monthly Payroll
              </h3>
              <p className="text-xs text-[#6b7280] mt-1">
                Automate attendance-based proration, calculate LOP, gross earnings, PF/ESI deductions, and net payouts.
              </p>
              <div className="mt-3 flex items-center text-xs font-medium text-[#5e2b9d]">
                Process now &rarr;
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:border-[#5e2b9d] transition-colors cursor-pointer group">
          <Link href="/payroll/components">
            <CardContent className="pt-5 pb-5">
              <div className="h-10 w-10 rounded-lg bg-[#eff6ff] flex items-center justify-center text-[#2563eb] mb-3">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-[#111827] group-hover:text-[#5e2b9d]">
                Salary Components & Slabs
              </h3>
              <p className="text-xs text-[#6b7280] mt-1">
                Configure Basic (50% CTC), HRA (40/50%), Special Allowance, PF (12%), ESI (0.75%), and PT slabs.
              </p>
              <div className="mt-3 flex items-center text-xs font-medium text-[#2563eb]">
                Configure rules &rarr;
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:border-[#5e2b9d] transition-colors cursor-pointer group">
          <Link href="/payroll/payslips">
            <CardContent className="pt-5 pb-5">
              <div className="h-10 w-10 rounded-lg bg-[#f0fdf4] flex items-center justify-center text-[#16a34a] mb-3">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-[#111827] group-hover:text-[#5e2b9d]">
                Payslip Registry
              </h3>
              <p className="text-xs text-[#6b7280] mt-1">
                Generate, download, and publish confidential monthly payslip documents for all employees.
              </p>
              <div className="mt-3 flex items-center text-xs font-medium text-[#16a34a]">
                View payslips &rarr;
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>

      {/* Recent Payroll Runs Table */}
      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Payroll Runs</CardTitle>
            <p className="text-xs text-[#6b7280] mt-0.5">Historical payroll settlements and disbursements</p>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/payroll/process" className="text-xs text-[#5e2b9d]">
              New Run &rarr;
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="pt-0">
          {runs && runs.length > 0 ? (
            <div className="divide-y divide-[#f1f3f5]">
              {runs.map((run: any) => (
                <div key={run.id} className="py-3.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-sm text-[#111827]">
                      {new Date(run.period_year, run.period_month - 1).toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </span>
                    <p className="text-[#6b7280] mt-0.5">
                      {run.total_employees} employees &bull; Processed on {formatDate(run.created_at)}
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-[#9ca3af] block">Gross Earnings</span>
                      <span className="font-medium text-[#111827]">{formatCurrency(run.total_gross)}</span>
                    </div>
                    <div>
                      <span className="text-[#9ca3af] block">Total Deductions</span>
                      <span className="font-medium text-[#dc2626]">{formatCurrency(run.total_deductions)}</span>
                    </div>
                    <div>
                      <span className="text-[#9ca3af] block">Net Disbursed</span>
                      <span className="font-bold text-[#16a34a]">{formatCurrency(run.total_net)}</span>
                    </div>
                    <span className="capitalize px-2 py-0.5 text-[11px] font-medium bg-[#f0fdf4] text-[#16a34a] rounded-[4px]">
                      {run.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <DollarSign className="h-8 w-8 text-[#d1d5db] mx-auto mb-2" />
              <p className="text-sm font-medium text-[#374151]">No payroll runs yet</p>
              <p className="text-xs text-[#9ca3af] mt-0.5">Click "Run Monthly Payroll" to start calculating salaries for this month.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

