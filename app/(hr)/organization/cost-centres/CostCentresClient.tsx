'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Building2, DollarSign, PieChart, Users } from 'lucide-react'

interface CostCentre {
  id: string
  code: string
  name: string
  department: string
  head: string
  annualBudget: string
  spentYTD: string
  headcount: number
}

const mockCostCentres: CostCentre[] = [
  {
    id: 'cc-1',
    code: 'CC-ENG-101',
    name: 'Core Platform Engineering & Cloud R&D',
    department: 'Engineering',
    head: 'Rajesh Kumar',
    annualBudget: '₹4,50,00,000',
    spentYTD: '₹2,68,50,000',
    headcount: 24,
  },
  {
    id: 'cc-2',
    code: 'CC-PRD-102',
    name: 'Product Design & User Research',
    department: 'Design',
    head: 'Arjun Mehta',
    annualBudget: '₹1,20,00,000',
    spentYTD: '₹72,40,000',
    headcount: 8,
  },
  {
    id: 'cc-3',
    code: 'CC-SLS-201',
    name: 'Enterprise Client Solutions & Sales',
    department: 'Sales',
    head: 'Vikram Joshi',
    annualBudget: '₹2,80,00,000',
    spentYTD: '₹1,95,00,000',
    headcount: 12,
  },
  {
    id: 'cc-4',
    code: 'CC-MKT-301',
    name: 'Growth & Brand Marketing',
    department: 'Marketing',
    head: 'Kavita Nair',
    annualBudget: '₹1,50,00,000',
    spentYTD: '₹88,20,000',
    headcount: 6,
  },
]

export function CostCentresClient() {
  const [costCentres, setCostCentres] = React.useState<CostCentre[]>(mockCostCentres)

  return (
    <div className="space-y-6">
      {/* Header and Add Action */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#111827]">Financial Cost Centres ({costCentres.length})</h3>
          <p className="text-xs text-[#6b7280]">
            Track payroll, asset depreciations, and travel expenses against sanctioned fiscal budgets.
          </p>
        </div>
        <Button size="sm" className="h-8 gap-1 text-xs bg-[#5e2b9d] hover:bg-[#4d2382] text-white">
          <Plus className="h-3.5 w-3.5" /> Add Cost Centre
        </Button>
      </div>

      {/* Cost Centres Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {costCentres.map((cc) => (
          <Card key={cc.id} className="p-4 space-y-3 hover:border-[#d1d5db] transition-colors bg-white">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-xs text-[#5e2b9d] bg-purple-50 px-2 py-0.5 rounded">
                {cc.code}
              </span>
              <span className="text-xs text-[#6b7280]">{cc.department}</span>
            </div>

            <h4 className="text-sm font-semibold text-[#111827]">{cc.name}</h4>
            <p className="text-xs text-[#6b7280]">Budget Owner: <strong className="text-[#111827]">{cc.head}</strong></p>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#f3f4f6] text-xs">
              <div>
                <span className="text-[10px] text-[#9ca3af] block">Annual Budget</span>
                <span className="font-mono font-semibold text-[#111827]">{cc.annualBudget}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#9ca3af] block">Spent YTD</span>
                <span className="font-mono font-semibold text-emerald-700">{cc.spentYTD}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#9ca3af] block">Headcount</span>
                <span className="font-semibold text-[#111827]">{cc.headcount} members</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

