'use client'

import * as React from 'react'
import { Printer, Download, ArrowLeft, Building2, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils/currency'
import { formatDate } from '@/lib/utils/date'
import Link from 'next/link'

interface PayslipPrintViewProps {
  company: any
  employee: any
  statutory: any
  bank: any
  salary: any
}

// Convert number to Indian currency words
function numberToWords(num: number): string {
  const a = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
  ]
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']

  function inWords(n: number): string {
    if (n === 0) return ''
    if (n < 20) return a[n] + ' '
    if (n < 100) return b[Math.floor(n / 10)] + ' ' + (n % 10 !== 0 ? a[n % 10] + ' ' : '')
    if (n < 1000) return a[Math.floor(n / 100)] + ' Hundred ' + inWords(n % 100)
    if (n < 100000) return inWords(Math.floor(n / 1000)) + 'Thousand ' + inWords(n % 1000)
    if (n < 10000000) return inWords(Math.floor(n / 100000)) + 'Lakh ' + inWords(n % 100000)
    return inWords(Math.floor(n / 10000000)) + 'Crore ' + inWords(n % 10000000)
  }

  const result = inWords(Math.floor(num)).trim()
  return result ? `${result} Rupees Only` : 'Zero Rupees Only'
}

export function PayslipPrintView({
  company,
  employee,
  statutory,
  bank,
  salary,
}: PayslipPrintViewProps) {
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' })
  const fullName = [employee.first_name, employee.middle_name, employee.last_name].filter(Boolean).join(' ')

  const monthlyCtc = salary?.monthly_ctc ?? 65000
  const basic = Math.round(monthlyCtc * 0.50)
  const hra = Math.round(basic * 0.40)
  const specialAllowance = Math.max(0, monthlyCtc - basic - hra)
  const grossEarnings = basic + hra + specialAllowance

  const pf = Math.round(Math.min(basic, 15000) * 0.12)
  const esi = grossEarnings <= 21000 ? Math.round(grossEarnings * 0.0075) : 0
  const pt = 200
  const tds = grossEarnings * 12 > 750000 ? Math.round((grossEarnings * 12 * 0.05) / 12) : 0
  const totalDeductions = pf + esi + pt + tds
  const netPay = grossEarnings - totalDeductions

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-8 px-4 print:p-0 print:bg-white">
      {/* Top action toolbar (hidden during printing) */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between print:hidden">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/payroll/payslips">
            <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Payslips
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={handlePrint} className="bg-[#5e2b9d] hover:bg-[#4e2384]">
            <Printer className="h-4 w-4 mr-1.5" /> Print / Save as PDF
          </Button>
        </div>
      </div>

      {/* Official Payslip Document Sheet */}
      <div className="max-w-4xl mx-auto bg-white border border-[#d1d5db] rounded-lg shadow-sm print:border-none print:shadow-none p-8 md:p-12 text-[#111827]">
        {/* Company Header */}
        <div className="border-b-2 border-[#5e2b9d] pb-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[#111827]">
                {company?.legal_name || company?.name || 'PEOPLECORE TECHNOLOGIES PVT. LTD.'}
              </h1>
              <p className="text-xs text-[#6b7280] mt-1">
                CIN: {company?.registration_number ?? 'U72900MH2024PTC123456'} &bull; PAN: {company?.pan ?? 'AAACP1234F'} &bull; GSTIN: {company?.gstin ?? '27AAACP1234F1Z5'}
              </p>
              <p className="text-xs text-[#6b7280]">
                Corporate Office: Level 4, Tech Park, Andheri East, Mumbai, Maharashtra 400069
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs font-bold text-[#5e2b9d] uppercase tracking-wider block">
                PAYSLIP FOR {currentMonth.toUpperCase()}
              </span>
              <span className="text-[10px] text-[#9ca3af] block mt-0.5">Confidential Document</span>
            </div>
          </div>
        </div>

        {/* Employee & Payroll Summary Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg bg-[#f8f9fa] border border-[#e5e7eb] mb-6 text-xs">
          <div>
            <span className="text-[#9ca3af] block">Employee Name</span>
            <span className="font-bold text-[#111827]">{fullName}</span>
          </div>
          <div>
            <span className="text-[#9ca3af] block">Employee ID</span>
            <span className="font-bold font-mono text-[#5e2b9d]">{employee.employee_id}</span>
          </div>
          <div>
            <span className="text-[#9ca3af] block">Designation</span>
            <span className="font-medium text-[#111827]">{employee.designations?.name ?? 'Software Engineer'}</span>
          </div>
          <div>
            <span className="text-[#9ca3af] block">Department</span>
            <span className="font-medium text-[#111827]">{employee.departments?.name ?? 'Engineering'}</span>
          </div>

          <div>
            <span className="text-[#9ca3af] block">Date of Joining</span>
            <span className="font-medium text-[#111827]">{formatDate(employee.joining_date)}</span>
          </div>
          <div>
            <span className="text-[#9ca3af] block">Bank Account No.</span>
            <span className="font-mono text-[#111827]">{bank?.account_number ? `•••• ${bank.account_number.slice(-4)}` : '•••• 4521'}</span>
          </div>
          <div>
            <span className="text-[#9ca3af] block">Bank IFSC</span>
            <span className="font-mono text-[#111827]">{bank?.ifsc_code ?? 'HDFC0001234'}</span>
          </div>
          <div>
            <span className="text-[#9ca3af] block">PAN / UAN</span>
            <span className="font-mono text-[#111827]">{statutory?.pan ?? 'ABCDE1234F'} / {statutory?.uan ?? '100123456789'}</span>
          </div>

          <div>
            <span className="text-[#9ca3af] block">Total Days in Month</span>
            <span className="font-medium text-[#111827]">30</span>
          </div>
          <div>
            <span className="text-[#9ca3af] block">Paid Days</span>
            <span className="font-bold text-[#16a34a]">30</span>
          </div>
          <div>
            <span className="text-[#9ca3af] block">Loss of Pay (LOP)</span>
            <span className="font-medium text-[#111827]">0</span>
          </div>
          <div>
            <span className="text-[#9ca3af] block">Tax Regime</span>
            <span className="font-medium uppercase text-[#111827]">{statutory?.tax_regime ?? 'New'}</span>
          </div>
        </div>

        {/* Dual Table: Earnings & Deductions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Earnings Table */}
          <div className="border border-[#e5e7eb] rounded-lg overflow-hidden">
            <div className="bg-[#f8f9fa] border-b border-[#e5e7eb] px-4 py-2 flex justify-between font-semibold text-xs text-[#111827]">
              <span>Earnings</span>
              <span>Amount (₹)</span>
            </div>
            <div className="divide-y divide-[#f1f3f5] text-xs">
              <div className="px-4 py-2.5 flex justify-between">
                <span className="text-[#374151]">Basic Salary (50%)</span>
                <span className="font-medium">{formatCurrency(basic)}</span>
              </div>
              <div className="px-4 py-2.5 flex justify-between">
                <span className="text-[#374151]">House Rent Allowance (HRA)</span>
                <span className="font-medium">{formatCurrency(hra)}</span>
              </div>
              <div className="px-4 py-2.5 flex justify-between">
                <span className="text-[#374151]">Special Allowance</span>
                <span className="font-medium">{formatCurrency(specialAllowance)}</span>
              </div>
              <div className="px-4 py-2.5 flex justify-between bg-[#f8f9fa] font-bold border-t border-[#e5e7eb]">
                <span>Total Gross Earnings</span>
                <span className="text-[#111827]">{formatCurrency(grossEarnings)}</span>
              </div>
            </div>
          </div>

          {/* Deductions Table */}
          <div className="border border-[#e5e7eb] rounded-lg overflow-hidden">
            <div className="bg-[#f8f9fa] border-b border-[#e5e7eb] px-4 py-2 flex justify-between font-semibold text-xs text-[#111827]">
              <span>Deductions</span>
              <span>Amount (₹)</span>
            </div>
            <div className="divide-y divide-[#f1f3f5] text-xs">
              <div className="px-4 py-2.5 flex justify-between">
                <span className="text-[#374151]">Provident Fund (PF - 12%)</span>
                <span className="font-medium text-[#dc2626]">{formatCurrency(pf)}</span>
              </div>
              <div className="px-4 py-2.5 flex justify-between">
                <span className="text-[#374151]">Employee State Insurance (ESI)</span>
                <span className="font-medium text-[#dc2626]">{formatCurrency(esi)}</span>
              </div>
              <div className="px-4 py-2.5 flex justify-between">
                <span className="text-[#374151]">Professional Tax (PT)</span>
                <span className="font-medium text-[#dc2626]">{formatCurrency(pt)}</span>
              </div>
              <div className="px-4 py-2.5 flex justify-between">
                <span className="text-[#374151]">TDS / Income Tax</span>
                <span className="font-medium text-[#dc2626]">{formatCurrency(tds)}</span>
              </div>
              <div className="px-4 py-2.5 flex justify-between bg-[#f8f9fa] font-bold border-t border-[#e5e7eb]">
                <span>Total Deductions</span>
                <span className="text-[#dc2626]">{formatCurrency(totalDeductions)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Net Salary Highlight Box */}
        <div className="p-4 rounded-lg bg-[#f0fdf4] border border-[#bbf7d0] mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs text-[#166534] font-semibold uppercase tracking-wider block">
              Net Take-Home Salary
            </span>
            <p className="text-xs text-[#16a34a] italic mt-0.5">
              {numberToWords(netPay)}
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold font-mono text-[#16a34a]">
              {formatCurrency(netPay)}
            </span>
          </div>
        </div>

        {/* Footer & Digital Verification Sign */}
        <div className="pt-6 border-t border-[#e5e7eb] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs text-[#9ca3af]">
          <div>
            <p className="text-[11px] text-[#6b7280]">
              * This is a computer-generated document and does not require a physical signature.
            </p>
            <p className="text-[10px] text-[#9ca3af] mt-0.5">
              System Reference: {employee.id.slice(0, 8).toUpperCase()}-PAYROLL-{currentMonth.replace(' ', '-').toUpperCase()}
            </p>
          </div>
          <div className="text-right sm:text-right shrink-0">
            <div className="flex items-center gap-1.5 text-xs text-[#5e2b9d] font-semibold">
              <ShieldCheck className="h-4 w-4" />
              <span>Verified by PeopleCore HR Operations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

