'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import {
  Target,
  Award,
  Star,
  CheckCircle2,
  TrendingUp,
  Users,
  Plus,
  Clock,
  Sparkles,
  ChevronRight,
} from 'lucide-react'

interface Goal {
  id: string
  title: string
  category: 'Company' | 'Department' | 'Individual'
  assignee: string
  empId: string
  department: string
  progress: number
  targetDate: string
  status: 'on_track' | 'at_risk' | 'completed'
}

const mockGoals: Goal[] = [
  {
    id: 'g-1',
    title: 'Migrate microservices architecture to Next.js 16 and Supabase with zero downtime',
    category: 'Department',
    assignee: 'Priya Sharma',
    empId: 'PC-1002',
    department: 'Engineering',
    progress: 85,
    targetDate: '30 Nov 2026',
    status: 'on_track',
  },
  {
    id: 'g-2',
    title: 'Achieve 99.95% API SLA uptime across all production European and APAC regions',
    category: 'Company',
    assignee: 'Sneha Patil',
    empId: 'PC-1008',
    department: 'DevOps & Cloud',
    progress: 95,
    targetDate: '15 Dec 2026',
    status: 'completed',
  },
  {
    id: 'g-3',
    title: 'Design and rollout Swiss-style design system across all 21 SaaS HRMS modules',
    category: 'Individual',
    assignee: 'Arjun Mehta',
    empId: 'PC-1005',
    department: 'Product Design',
    progress: 70,
    targetDate: '25 Nov 2026',
    status: 'on_track',
  },
  {
    id: 'g-4',
    title: 'Reduce new engineer onboarding ramp-up cycle from 21 days to 10 days',
    category: 'Department',
    assignee: 'Vinay Vakati',
    empId: 'PC-1001',
    department: 'People Operations',
    progress: 60,
    targetDate: '31 Dec 2026',
    status: 'at_risk',
  },
]

const reviewees = [
  {
    id: 'rev-1',
    name: 'Priya Sharma',
    role: 'Senior Frontend Engineer',
    department: 'Engineering',
    selfScore: 4.5,
    managerScore: 4.8,
    status: 'Completed',
    recommendation: 'Promotion to Staff Engineer',
  },
  {
    id: 'rev-2',
    name: 'Arjun Mehta',
    role: 'Lead UI/UX Designer',
    department: 'Design',
    selfScore: 4.2,
    managerScore: 4.4,
    status: 'Completed',
    recommendation: 'Merit Salary Hike (15%)',
  },
  {
    id: 'rev-3',
    name: 'Sneha Patil',
    role: 'DevOps Architect',
    department: 'Infrastructure',
    selfScore: 4.6,
    managerScore: 4.7,
    status: 'In Review',
    recommendation: 'Retention Bonus',
  },
]

export function PerformanceClient() {
  const [activeTab, setActiveTab] = React.useState<'goals' | 'reviews'>('goals')
  const [goals, setGoals] = React.useState<Goal[]>(mockGoals)
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null)

  const handleUpdateProgress = (id: string, newProgress: number) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== id) return g
        const status: Goal['status'] =
          newProgress >= 100 ? 'completed' : newProgress < 50 ? 'at_risk' : 'on_track'
        return { ...g, progress: newProgress, status }
      })
    )
    setSuccessMsg('Goal progress updated successfully')
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
          <span className="text-xs text-[#6b7280] font-medium">Active Cycle</span>
          <p className="text-base font-bold text-[#111827] mt-1 truncate">Q4 2026 Annual Appraisal</p>
          <span className="text-[11px] text-[#5e2b9d] font-semibold">Ends 31 Dec 2026</span>
        </Card>
        <Card className="p-4 bg-white">
          <span className="text-xs text-[#6b7280] font-medium">Review Completion</span>
          <p className="text-2xl font-bold text-[#16a34a] mt-1">78%</p>
          <span className="text-[11px] text-[#6b7280]">39 of 50 reviews completed</span>
        </Card>
        <Card className="p-4 bg-white">
          <span className="text-xs text-[#6b7280] font-medium">Department OKR Health</span>
          <p className="text-2xl font-bold text-[#111827] mt-1">82.4%</p>
          <span className="text-[11px] text-emerald-600 font-medium">+6.2% vs last quarter</span>
        </Card>
        <Card className="p-4 bg-white">
          <span className="text-xs text-[#6b7280] font-medium">Top Performers</span>
          <p className="text-2xl font-bold text-[#5e2b9d] mt-1">12 Employees</p>
          <span className="text-[11px] text-[#6b7280]">Rated 4.5+ out of 5</span>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#e5e7eb] pb-3">
        <button
          onClick={() => setActiveTab('goals')}
          className={`px-3 py-1.5 text-xs font-medium rounded-[6px] transition-colors flex items-center gap-1.5 ${
            activeTab === 'goals'
              ? 'bg-[#5e2b9d] text-white shadow-xs'
              : 'text-[#6b7280] hover:text-[#111827] hover:bg-[#f3f4f6]'
          }`}
        >
          <Target className="h-3.5 w-3.5" /> Goals & OKRs ({goals.length})
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-3 py-1.5 text-xs font-medium rounded-[6px] transition-colors flex items-center gap-1.5 ${
            activeTab === 'reviews'
              ? 'bg-[#5e2b9d] text-white shadow-xs'
              : 'text-[#6b7280] hover:text-[#111827] hover:bg-[#f3f4f6]'
          }`}
        >
          <Award className="h-3.5 w-3.5" /> 360 Reviews & Appraisals
        </button>
      </div>

      {activeTab === 'goals' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-[#111827]">Active Strategic Objectives</h3>
              <p className="text-xs text-[#6b7280]">Track key results, measurable targets, and completion milestones.</p>
            </div>
            <Button size="sm" className="h-8 gap-1 text-xs bg-[#5e2b9d] hover:bg-[#4d2382] text-white">
              <Plus className="h-3.5 w-3.5" /> Create Goal
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goals.map((goal) => (
              <Card key={goal.id} className="p-4 space-y-3 hover:border-[#d1d5db] transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                      goal.category === 'Company'
                        ? 'bg-purple-50 text-[#5e2b9d]'
                        : goal.category === 'Department'
                        ? 'bg-blue-50 text-blue-700'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    {goal.category} OKR
                  </span>
                  <StatusBadge status={goal.status} />
                </div>

                <h4 className="text-xs font-semibold text-[#111827] leading-snug">{goal.title}</h4>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#6b7280]">Key Result Progress</span>
                    <span className="font-bold text-[#111827]">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-[#f3f4f6] h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 rounded-full ${
                        goal.progress >= 100
                          ? 'bg-[#16a34a]'
                          : goal.progress < 50
                          ? 'bg-[#ea580c]'
                          : 'bg-[#5e2b9d]'
                      }`}
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#f3f4f6] text-xs">
                  <div className="flex items-center gap-2">
                    <Avatar name={goal.assignee} size="sm" />
                    <div>
                      <p className="font-medium text-[#111827] text-xs">{goal.assignee}</p>
                      <p className="text-[10px] text-[#6b7280]">{goal.department}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateProgress(goal.id, Math.min(100, goal.progress + 10))}
                      className="h-7 text-[11px] px-2"
                    >
                      +10%
                    </Button>
                    <span className="text-[11px] text-[#9ca3af]">Due {goal.targetDate}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <Card className="overflow-hidden border border-[#e5e7eb]">
          <div className="p-4 border-b border-[#e5e7eb] bg-[#f9fafb]">
            <h3 className="text-sm font-semibold text-[#111827]">Q4 2026 Appraisal Calibration Matrix</h3>
            <p className="text-xs text-[#6b7280] mt-0.5">
              Multi-rater evaluations, manager scorecards, and committee promotion recommendations.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#e5e7eb] bg-white text-[#6b7280] text-left">
                  <th className="py-2.5 px-4 font-semibold">Employee</th>
                  <th className="py-2.5 px-3 font-semibold">Department</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Self Score</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Manager Score</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Status</th>
                  <th className="py-2.5 px-4 font-semibold">Outcome / Recommendation</th>
                  <th className="py-2.5 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e7eb]">
                {reviewees.map((rev) => (
                  <tr key={rev.id} className="hover:bg-[#f9fafb] transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={rev.name} size="sm" />
                        <div>
                          <p className="font-semibold text-xs text-[#111827]">{rev.name}</p>
                          <p className="text-[10px] text-[#6b7280]">{rev.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-[#374151]">{rev.department}</td>
                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex items-center gap-1 font-semibold text-[#374151]">
                        <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                        {rev.selfScore}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex items-center gap-1 font-bold text-[#5e2b9d]">
                        <Star className="h-3 w-3 text-[#5e2b9d] fill-[#5e2b9d]" />
                        {rev.managerScore}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <StatusBadge status={rev.status === 'Completed' ? 'approved' : 'pending'} />
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-purple-700 bg-purple-50 px-2 py-0.5 rounded text-[11px]">
                        {rev.recommendation}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        View Dossier
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}

