'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import {
  GraduationCap,
  Calendar,
  Clock,
  Award,
  Users,
  CheckCircle2,
  BookOpen,
  Plus,
  Download,
  ShieldAlert,
} from 'lucide-react'

interface TrainingProgram {
  id: string
  title: string
  category: 'Technical' | 'Compliance' | 'Leadership' | 'Product'
  instructor: string
  durationHours: number
  mode: 'Online Live' | 'Self-Paced' | 'Classroom'
  startDate: string
  enrolledCount: number
  capacity: number
  mandatory: boolean
  status: 'upcoming' | 'in_progress' | 'completed'
}

const initialPrograms: TrainingProgram[] = [
  {
    id: 'tr-1',
    title: 'AWS Cloud Architecture & Kubernetes Deployments',
    category: 'Technical',
    instructor: 'Sneha Patil (Principal Cloud Architect)',
    durationHours: 24,
    mode: 'Online Live',
    startDate: '18 Nov 2026',
    enrolledCount: 18,
    capacity: 25,
    mandatory: false,
    status: 'upcoming',
  },
  {
    id: 'tr-2',
    title: 'POSH, ISO 27001 Security & GDPR / DPDP Compliance',
    category: 'Compliance',
    instructor: 'External Legal Counsel & CISO Office',
    durationHours: 6,
    mode: 'Self-Paced',
    startDate: '01 Nov 2026',
    enrolledCount: 48,
    capacity: 50,
    mandatory: true,
    status: 'in_progress',
  },
  {
    id: 'tr-3',
    title: 'High-Performance Engineering Management & Feedback',
    category: 'Leadership',
    instructor: 'Rajesh Kumar (VP Engineering)',
    durationHours: 12,
    mode: 'Classroom',
    startDate: '05 Dec 2026',
    enrolledCount: 8,
    capacity: 12,
    mandatory: false,
    status: 'upcoming',
  },
  {
    id: 'tr-4',
    title: 'Next.js 16 App Router & Full-Stack TypeScript Patterns',
    category: 'Technical',
    instructor: 'Priya Sharma (Staff Frontend Lead)',
    durationHours: 16,
    mode: 'Online Live',
    startDate: '12 Oct 2026',
    enrolledCount: 22,
    capacity: 22,
    mandatory: false,
    status: 'completed',
  },
]

export function TrainingClient() {
  const [programs, setPrograms] = React.useState<TrainingProgram[]>(initialPrograms)
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null)

  const handleEnroll = (id: string) => {
    setPrograms((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p
        if (p.enrolledCount >= p.capacity) return p
        return { ...p, enrolledCount: p.enrolledCount + 1 }
      })
    )
    setSuccessMsg('Successfully enrolled in training program!')
    setTimeout(() => setSuccessMsg(null), 3000)
  }

  return (
    <div className="space-y-6">
      {successMsg && (
        <div className="bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534] px-4 py-2.5 rounded-[6px] text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-[#16a34a]" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-4 bg-white">
          <span className="text-xs text-[#6b7280] font-medium">Active Programs</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">{programs.length}</p>
          <span className="text-[11px] text-[#6b7280]">Technical, compliance, leadership</span>
        </Card>
        <Card className="p-4 bg-white">
          <span className="text-xs text-[#6b7280] font-medium">Employees Enrolled</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">96 Learners</p>
          <span className="text-[11px] text-purple-700 font-medium">84% completion rate</span>
        </Card>
        <Card className="p-4 bg-white">
          <span className="text-xs text-[#6b7280] font-medium">Mandatory Compliance</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">96.0%</p>
          <span className="text-[11px] text-[#16a34a]">POSH & ISO 27001 on track</span>
        </Card>
        <Card className="p-4 bg-white">
          <span className="text-xs text-[#6b7280] font-medium">Certifications Issued</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">64 Badges</p>
          <span className="text-[11px] text-[#6b7280]">Verified digital certificates</span>
        </Card>
      </div>

      {/* Header with actions */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#111827]">Course Catalog & Calendar</h3>
          <p className="text-xs text-[#6b7280]">Browse, register, and track corporate skill enhancement workshops.</p>
        </div>
        <Button size="sm" className="h-8 gap-1 text-xs bg-[#5e2b9d] hover:bg-[#4d2382] text-white">
          <Plus className="h-3.5 w-3.5" /> Schedule Workshop
        </Button>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {programs.map((prog) => {
          const isFull = prog.enrolledCount >= prog.capacity
          return (
            <Card key={prog.id} className="p-4 space-y-3 hover:border-[#d1d5db] transition-colors">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                      prog.category === 'Technical'
                        ? 'bg-blue-50 text-blue-700'
                        : prog.category === 'Compliance'
                        ? 'bg-amber-50 text-amber-700'
                        : prog.category === 'Leadership'
                        ? 'bg-purple-50 text-[#5e2b9d]'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    {prog.category}
                  </span>
                  {prog.mandatory && (
                    <span className="text-[10px] bg-red-50 text-[#dc2626] font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                      <ShieldAlert className="h-3 w-3" /> Mandatory
                    </span>
                  )}
                </div>
                <StatusBadge status={prog.status} />
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#111827] leading-snug">{prog.title}</h4>
                <p className="text-xs text-[#6b7280] mt-1">Instructor: {prog.instructor}</p>
              </div>

              {/* Course Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#4b5563] pt-1">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-[#9ca3af]" />
                  {prog.startDate}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-[#9ca3af]" />
                  {prog.durationHours} Hours • {prog.mode}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 text-[#9ca3af]" />
                  {prog.enrolledCount} / {prog.capacity} seats
                </span>
              </div>

              {/* Progress and Action Footer */}
              <div className="pt-3 border-t border-[#f3f4f6] flex items-center justify-between">
                <div className="w-1/2">
                  <div className="w-full bg-[#f3f4f6] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#5e2b9d] h-full rounded-full"
                      style={{ width: `${(prog.enrolledCount / prog.capacity) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-[#9ca3af] mt-0.5 block">
                    {prog.capacity - prog.enrolledCount} seats left
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleEnroll(prog.id)}
                    disabled={isFull || prog.status === 'completed'}
                    className="h-7 text-xs bg-[#5e2b9d] hover:bg-[#4d2382] text-white disabled:opacity-50"
                  >
                    {isFull ? 'Sold Out' : '1-Click Enroll'}
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

