'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/common/Avatar'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Plus, ArrowRight, MapPin, Building2, Calendar, CheckCircle2 } from 'lucide-react'

interface TransferRecord {
  id: string
  employee: string
  empId: string
  fromBranch: string
  toBranch: string
  fromDepartment: string
  toDepartment: string
  effectiveDate: string
  status: 'approved' | 'pending' | 'in_progress'
}

const mockTransfers: TransferRecord[] = [
  {
    id: 'tr-01',
    employee: 'Priya Sharma',
    empId: 'PC-1002',
    fromBranch: 'Bangalore Tech Cloud',
    toBranch: 'San Francisco HQ (Overseas Deputation)',
    fromDepartment: 'Engineering',
    toDepartment: 'Core Architecture',
    effectiveDate: '01 Dec 2026',
    status: 'approved',
  },
  {
    id: 'tr-02',
    employee: 'Vikram Joshi',
    empId: 'PC-1014',
    fromBranch: 'Mumbai FinCity',
    toBranch: 'Bangalore Tech Cloud',
    fromDepartment: 'Domestic Sales',
    toDepartment: 'Enterprise Accounts',
    effectiveDate: '15 Nov 2026',
    status: 'pending',
  },
]

export function TransfersClient() {
  const [transfers, setTransfers] = React.useState<TransferRecord[]>(mockTransfers)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#111827]">Transfer Requests & Relocations</h3>
          <p className="text-xs text-[#6b7280]">
            Review inter-city relocations, branch reassignments, and department transfers.
          </p>
        </div>
        <Button size="sm" className="h-8 gap-1 text-xs bg-[#5e2b9d] hover:bg-[#4d2382] text-white">
          <Plus className="h-3.5 w-3.5" /> Initiate Transfer
        </Button>
      </div>

      <div className="space-y-3">
        {transfers.map((tr) => (
          <Card key={tr.id} className="p-4 bg-white hover:border-[#d1d5db] transition-colors">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Avatar name={tr.employee} size="md" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-[#111827]">{tr.employee}</span>
                    <span className="text-xs font-mono text-[#6b7280]">({tr.empId})</span>
                    <StatusBadge status={tr.status} />
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#4b5563] mt-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-[#9ca3af]" />
                      <span>{tr.fromBranch}</span>
                      <ArrowRight className="h-3 w-3 text-[#5e2b9d]" />
                      <strong className="text-[#111827]">{tr.toBranch}</strong>
                    </div>
                    <span className="text-[#9ca3af]">•</span>
                    <div className="flex items-center gap-1">
                      <Building2 className="h-3.5 w-3.5 text-[#9ca3af]" />
                      <span>{tr.fromDepartment} &rarr; {tr.toDepartment}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#9ca3af] mt-1 flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> Effective Date: {tr.effectiveDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  View Dossier
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

