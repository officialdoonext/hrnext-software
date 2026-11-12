'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/common/Avatar'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Plus, TrendingUp, Award, ArrowRight, DollarSign, Calendar } from 'lucide-react'

interface PromotionRecord {
  id: string
  employee: string
  empId: string
  fromDesignation: string
  toDesignation: string
  fromGrade: string
  toGrade: string
  fromCTC: string
  toCTC: string
  hikePercent: string
  effectiveDate: string
  approvedBy: string
}

const mockPromotions: PromotionRecord[] = [
  {
    id: 'pr-01',
    employee: 'Priya Sharma',
    empId: 'PC-1002',
    fromDesignation: 'Senior Frontend Engineer',
    toDesignation: 'Staff Frontend Lead',
    fromGrade: 'L3',
    toGrade: 'L4',
    fromCTC: '₹24,00,000',
    toCTC: '₹32,00,000',
    hikePercent: '+33.3%',
    effectiveDate: '01 Nov 2026',
    approvedBy: 'Rajesh Kumar (VP Engineering)',
  },
  {
    id: 'pr-02',
    employee: 'Arjun Mehta',
    empId: 'PC-1005',
    fromDesignation: 'UI/UX Designer',
    toDesignation: 'Lead Product Designer',
    fromGrade: 'L2',
    toGrade: 'L3',
    fromCTC: '₹16,50,000',
    toCTC: '₹22,00,000',
    hikePercent: '+33.3%',
    effectiveDate: '01 Oct 2026',
    approvedBy: 'Vinay Vakati (People Ops)',
  },
  {
    id: 'pr-03',
    employee: 'Sneha Patil',
    empId: 'PC-1008',
    fromDesignation: 'DevOps Engineer',
    toDesignation: 'DevOps Architect',
    fromGrade: 'L2',
    toGrade: 'L3',
    fromCTC: '₹18,00,000',
    toCTC: '₹25,00,000',
    hikePercent: '+38.9%',
    effectiveDate: '01 Sep 2026',
    approvedBy: 'Rajesh Kumar (VP Engineering)',
  },
]

export function PromotionsClient() {
  const [promotions, setPromotions] = React.useState<PromotionRecord[]>(mockPromotions)

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 bg-white">
          <span className="text-xs text-[#6b7280] font-medium">Promotions This Fiscal</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">{promotions.length} Elevations</p>
          <span className="text-[11px] text-[#16a34a] font-medium">Across Engineering & Design</span>
        </Card>
        <Card className="p-4 bg-white">
          <span className="text-xs text-[#6b7280] font-medium">Average Promotion Hike</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">+35.1%</p>
          <span className="text-[11px] text-[#6b7280]">Benchmark: 25% – 35%</span>
        </Card>
        <Card className="p-4 bg-white">
          <span className="text-xs text-[#6b7280] font-medium">Key Talent Retention</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">98.2%</p>
          <span className="text-[11px] text-[#16a34a]">High-performance bracket</span>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#111827]">Promotions Ledger</h3>
          <p className="text-xs text-[#6b7280]">
            Official records of grade adjustments, title elevations, and compensation amendments.
          </p>
        </div>
        <Button size="sm" className="h-8 gap-1 text-xs bg-[#5e2b9d] hover:bg-[#4d2382] text-white">
          <Plus className="h-3.5 w-3.5" /> Record Promotion
        </Button>
      </div>

      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-[#f9fafb] text-[#6b7280] text-left">
                <th className="py-2.5 px-4 font-semibold">Employee</th>
                <th className="py-2.5 px-3 font-semibold">Designation Transition</th>
                <th className="py-2.5 px-2 font-semibold text-center">Grade</th>
                <th className="py-2.5 px-3 font-semibold font-mono">Previous CTC</th>
                <th className="py-2.5 px-3 font-semibold font-mono text-emerald-700">Revised CTC</th>
                <th className="py-2.5 px-2 font-semibold text-center">Hike</th>
                <th className="py-2.5 px-3 font-semibold">Effective Date</th>
                <th className="py-2.5 px-4 font-semibold text-right">Approved By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              {promotions.map((pr) => (
                <tr key={pr.id} className="hover:bg-[#f9fafb] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Avatar name={pr.employee} size="sm" />
                      <div>
                        <p className="font-semibold text-xs text-[#111827]">{pr.employee}</p>
                        <p className="text-[10px] font-mono text-[#9ca3af]">{pr.empId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5 text-xs text-[#4b5563]">
                      <span>{pr.fromDesignation}</span>
                      <ArrowRight className="h-3 w-3 text-[#5e2b9d] shrink-0" />
                      <strong className="text-[#111827]">{pr.toDesignation}</strong>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-center font-mono text-xs">
                    <span className="text-[#9ca3af]">{pr.fromGrade}</span> &rarr;{' '}
                    <strong className="text-[#5e2b9d]">{pr.toGrade}</strong>
                  </td>
                  <td className="py-3 px-3 font-mono text-[#6b7280]">{pr.fromCTC}</td>
                  <td className="py-3 px-3 font-mono font-bold text-emerald-700">{pr.toCTC}</td>
                  <td className="py-3 px-2 text-center">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      {pr.hikePercent}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[#6b7280]">{pr.effectiveDate}</td>
                  <td className="py-3 px-4 text-right text-[#4b5563] truncate max-w-[160px]">
                    {pr.approvedBy}
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

