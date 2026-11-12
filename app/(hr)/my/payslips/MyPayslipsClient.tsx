'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import {
  DollarSign,
  Download,
  Eye,
  FileText,
  Calendar,
  CreditCard,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react'

interface PayslipSummary {
  id: string
  month: string
  year: number
  grossSalary: string
  netSalary: string
  deductions: string
  status: 'paid' | 'processed'
  paidOn: string
}

const mockPayslips: PayslipSummary[] = [
  {
    id: 'ps-2026-10',
    month: 'October',
    year: 2026,
    grossSalary: '₹2,00,000',
    deductions: '₹28,600',
    netSalary: '₹1,71,400',
    status: 'paid',
    paidOn: '31 Oct 2026',
  },
  {
    id: 'ps-2026-09',
    month: 'September',
    year: 2026,
    grossSalary: '₹2,00,000',
    deductions: '₹28,600',
    netSalary: '₹1,71,400',
    status: 'paid',
    paidOn: '30 Sep 2026',
  },
  {
    id: 'ps-2026-08',
    month: 'August',
    year: 2026,
    grossSalary: '₹2,00,000',
    deductions: '₹28,600',
    netSalary: '₹1,71,400',
    status: 'paid',
    paidOn: '31 Aug 2026',
  },
  {
    id: 'ps-2026-07',
    month: 'July',
    year: 2026,
    grossSalary: '₹2,00,000',
    deductions: '₹28,600',
    netSalary: '₹1,71,400',
    status: 'paid',
    paidOn: '31 Jul 2026',
  },
]

export function MyPayslipsClient() {
  return (
    <div className="space-y-6">
      {/* Top Annual CTC & Tax Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-4 bg-white">
          <span className="text-xs text-[#6b7280] font-medium">Annual Fixed CTC</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">₹24,00,000</p>
          <span className="text-[11px] text-[#6b7280]">₹2,00,000 gross monthly</span>
        </Card>
        <Card className="p-4 bg-white">
          <span className="text-xs text-[#6b7280] font-medium">YTD Net Disbursed</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">₹11,99,800</p>
          <span className="text-[11px] text-[#16a34a]">Credited on-time to HDFC</span>
        </Card>
        <Card className="p-4 bg-white">
          <span className="text-xs text-[#6b7280] font-medium">Provident Fund (PF)</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">₹12,600 / mo</p>
          <span className="text-[11px] text-[#9ca3af]">Employee + Employer Match</span>
        </Card>
        <Card className="p-4 bg-white">
          <span className="text-xs text-[#6b7280] font-medium">Income Tax (TDS)</span>
          <p className="text-2xl font-bold text-[#d97706] mt-1">₹16,000 / mo</p>
          <span className="text-[11px] text-[#6b7280]">New Tax Regime (FY 26-27)</span>
        </Card>
      </div>

      {/* Payslips Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-[#5e2b9d]" />
            <h3 className="text-sm font-semibold text-[#111827]">Salary Statements Archive</h3>
          </div>
          <span className="text-xs text-[#6b7280]">Financial Year 2026-2027</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                <th className="py-2.5 px-4 font-semibold">Pay Period</th>
                <th className="py-2.5 px-3 font-semibold">Gross Earnings</th>
                <th className="py-2.5 px-3 font-semibold">Total Deductions</th>
                <th className="py-2.5 px-3 font-semibold text-emerald-700">Net Take-Home</th>
                <th className="py-2.5 px-3 font-semibold">Disbursed Date</th>
                <th className="py-2.5 px-3 font-semibold text-center">Status</th>
                <th className="py-2.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              {mockPayslips.map((ps) => (
                <tr key={ps.id} className="hover:bg-[#f9fafb] transition-colors">
                  <td className="py-3 px-4 font-semibold text-xs text-[#111827]">
                    {ps.month} {ps.year}
                  </td>
                  <td className="py-3 px-3 text-[#374151] font-mono">{ps.grossSalary}</td>
                  <td className="py-3 px-3 text-[#dc2626] font-mono">{ps.deductions}</td>
                  <td className="py-3 px-3 font-bold text-emerald-700 font-mono text-sm">
                    {ps.netSalary}
                  </td>
                  <td className="py-3 px-3 text-[#6b7280]">{ps.paidOn}</td>
                  <td className="py-3 px-3 text-center">
                    <span className="bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded text-[10px]">
                      DISBURSED
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/payroll/payslips/${ps.id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs gap-1 text-[#5e2b9d] border-purple-200 hover:bg-purple-50"
                        >
                          <Eye className="h-3 w-3" /> View & Print
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

