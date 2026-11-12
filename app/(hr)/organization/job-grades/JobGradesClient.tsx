'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Award, Users, TrendingUp, CheckCircle2 } from 'lucide-react'

interface JobGrade {
  id: string
  code: string
  title: string
  track: 'Individual Contributor (IC)' | 'Management (M)' | 'Executive (E)'
  minSalary: string
  midSalary: string
  maxSalary: string
  employeeCount: number
}

const mockGrades: JobGrade[] = [
  {
    id: 'g-1',
    code: 'L1',
    title: 'Associate Engineer / Junior Analyst',
    track: 'Individual Contributor (IC)',
    minSalary: '₹6,00,000',
    midSalary: '₹8,50,000',
    maxSalary: '₹11,00,000',
    employeeCount: 8,
  },
  {
    id: 'g-2',
    code: 'L2',
    title: 'Engineer / Designer / Specialist',
    track: 'Individual Contributor (IC)',
    minSalary: '₹12,00,000',
    midSalary: '₹15,00,000',
    maxSalary: '₹18,00,000',
    employeeCount: 14,
  },
  {
    id: 'g-3',
    code: 'L3',
    title: 'Senior Engineer / Senior Specialist',
    track: 'Individual Contributor (IC)',
    minSalary: '₹20,00,000',
    midSalary: '₹25,00,000',
    maxSalary: '₹30,00,000',
    employeeCount: 12,
  },
  {
    id: 'g-4',
    code: 'L4',
    title: 'Staff Engineer / Team Lead / Principal',
    track: 'Individual Contributor (IC)',
    minSalary: '₹32,00,000',
    midSalary: '₹38,00,000',
    maxSalary: '₹45,00,000',
    employeeCount: 6,
  },
  {
    id: 'g-5',
    code: 'M1',
    title: 'Engineering Manager / Product Manager',
    track: 'Management (M)',
    minSalary: '₹35,00,000',
    midSalary: '₹42,00,000',
    maxSalary: '₹50,00,000',
    employeeCount: 5,
  },
  {
    id: 'g-6',
    code: 'M2',
    title: 'Director / Head of Department',
    track: 'Management (M)',
    minSalary: '₹55,00,000',
    midSalary: '₹65,00,000',
    maxSalary: '₹75,00,000',
    employeeCount: 3,
  },
  {
    id: 'g-7',
    code: 'E1',
    title: 'Vice President / Chief Executive',
    track: 'Executive (E)',
    minSalary: '₹80,00,000',
    midSalary: '₹1,10,00,000',
    maxSalary: '₹1,50,00,000',
    employeeCount: 2,
  },
]

export function JobGradesClient() {
  const [grades, setGrades] = React.useState<JobGrade[]>(mockGrades)

  return (
    <div className="space-y-6">
      {/* Header and Add Action */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#111827]">Job Grading Structure ({grades.length} Grades)</h3>
          <p className="text-xs text-[#6b7280]">
            Standardized compensation bands mapped to designation titles across global branches.
          </p>
        </div>
        <Button size="sm" className="h-8 gap-1 text-xs bg-[#5e2b9d] hover:bg-[#4d2382] text-white">
          <Plus className="h-3.5 w-3.5" /> Add Job Grade
        </Button>
      </div>

      {/* Grades Table */}
      <Card className="overflow-hidden border border-[#e5e7eb]">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-[#f9fafb] text-[#6b7280] text-left">
                <th className="py-2.5 px-4 font-semibold w-24">Grade Code</th>
                <th className="py-2.5 px-3 font-semibold">Grade Title & Scope</th>
                <th className="py-2.5 px-3 font-semibold">Career Track</th>
                <th className="py-2.5 px-3 font-semibold font-mono">Min CTC</th>
                <th className="py-2.5 px-3 font-semibold font-mono">Midpoint CTC</th>
                <th className="py-2.5 px-3 font-semibold font-mono text-emerald-700">Max CTC</th>
                <th className="py-2.5 px-4 font-semibold text-right">Headcount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              {grades.map((grade) => (
                <tr key={grade.id} className="hover:bg-[#f9fafb] transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-xs text-[#5e2b9d]">
                    {grade.code}
                  </td>
                  <td className="py-3 px-3 font-semibold text-[#111827]">{grade.title}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                        grade.track.startsWith('Management')
                          ? 'bg-blue-50 text-blue-700'
                          : grade.track.startsWith('Executive')
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-gray-100 text-[#4b5563]'
                      }`}
                    >
                      {grade.track}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-[#4b5563]">{grade.minSalary}</td>
                  <td className="py-3 px-3 font-mono font-semibold text-[#111827]">{grade.midSalary}</td>
                  <td className="py-3 px-3 font-mono font-bold text-emerald-700">{grade.maxSalary}</td>
                  <td className="py-3 px-4 text-right font-medium text-[#111827]">
                    {grade.employeeCount} employees
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

