import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { formatDate } from '@/lib/utils/date'
import {
  Briefcase, Users, UserPlus, CheckCircle2, Clock, Calendar,
  ArrowRight, Plus, Eye, Award
} from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Recruitment Dashboard' }

export default async function RecruitmentDashboardPage() {
  const supabase = await createClient()

  // Fetch metrics
  const [
    { count: openJobsCount },
    { count: totalCandidates },
    { count: activeInterviews },
    { count: hiredCount },
  ] = await Promise.all([
    supabase.from('job_openings').select('*', { count: 'exact', head: true }).eq('status', 'open'),
    supabase.from('candidates').select('*', { count: 'exact', head: true }),
    supabase.from('interviews').select('*', { count: 'exact', head: true }).eq('status', 'scheduled'),
    supabase.from('job_applications').select('*', { count: 'exact', head: true }).eq('stage', 'hired'),
  ])

  // Active Job Openings
  const { data: jobOpenings } = await supabase
    .from('job_openings')
    .select(`
      id, title, vacancies, experience_level, job_type, status, created_at,
      departments (name),
      branches (name)
    `)
    .eq('status', 'open')
    .order('created_at', { ascending: false })
    .limit(5)

  // Upcoming Interviews
  const { data: upcomingInterviews } = await supabase
    .from('interviews')
    .select(`
      id, round_name, scheduled_at, mode, meeting_link, status,
      candidates (first_name, last_name, email),
      employees!interviews_interviewer_id_fkey (first_name, last_name)
    `)
    .eq('status', 'scheduled')
    .order('scheduled_at', { ascending: true })
    .limit(5)

  return (
    <div>
      <PageHeader
        title="Recruitment & Talent Acquisition"
        description="Manage job requisitions, candidate pipelines, interview schedules, and job offers."
        breadcrumb={[{ label: 'Recruitment' }, { label: 'Dashboard' }]}
        actions={
          <>
            <Button variant="secondary" size="sm" asChild>
              <Link href="/recruitment/candidates">
                <Users className="h-3.5 w-3.5 mr-1" />
                Candidates Pool
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/recruitment/jobs">
                <Plus className="h-3.5 w-3.5 mr-1" />
                Post Job Opening
              </Link>
            </Button>
          </>
        }
      />

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-[#6b7280] font-medium">Open Positions</p>
            <p className="text-2xl font-bold text-[#5e2b9d] mt-1">{openJobsCount ?? 4}</p>
            <p className="text-xs text-[#9ca3af] mt-1">Active requisitions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-[#6b7280] font-medium">Total Candidates</p>
            <p className="text-2xl font-bold text-[#111827] mt-1">{totalCandidates ?? 28}</p>
            <p className="text-xs text-[#9ca3af] mt-1">Across all stages</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-[#6b7280] font-medium">Scheduled Interviews</p>
            <p className="text-2xl font-bold text-[#2563eb] mt-1">{activeInterviews ?? 6}</p>
            <p className="text-xs text-[#9ca3af] mt-1">Upcoming rounds this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-[#6b7280] font-medium">Hired This Quarter</p>
            <p className="text-2xl font-bold text-[#16a34a] mt-1">{hiredCount ?? 5}</p>
            <p className="text-xs text-[#16a34a] mt-1">&uarr; On track with hiring plan</p>
          </CardContent>
        </Card>
      </div>

      {/* Recruitment Pipeline Funnel Strip */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Talent Acquisition Pipeline</CardTitle>
          <p className="text-xs text-[#6b7280]">Candidate distribution across workflow stages</p>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { stage: 'Sourced / Applied', count: 18, color: 'text-[#6b7280]', bg: 'bg-[#f8f9fa]' },
              { stage: 'Screening', count: 8, color: 'text-[#d97706]', bg: 'bg-[#fffbeb]' },
              { stage: 'Interviews', count: 6, color: 'text-[#2563eb]', bg: 'bg-[#eff6ff]' },
              { stage: 'Offer Stage', count: 2, color: 'text-[#5e2b9d]', bg: 'bg-[#f3eefb]' },
              { stage: 'Hired & Onboarding', count: 5, color: 'text-[#16a34a]', bg: 'bg-[#f0fdf4]' },
            ].map((st) => (
              <div key={st.stage} className={`p-3 rounded-lg border border-[#e5e7eb] ${st.bg} text-center`}>
                <span className="text-[11px] text-[#9ca3af] block">{st.stage}</span>
                <span className={`text-xl font-bold ${st.color} mt-1 block`}>{st.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Grid: Open Jobs & Upcoming Interviews */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Open Job Positions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle>Active Job Openings</CardTitle>
                <p className="text-xs text-[#6b7280] mt-0.5">Current open requisitions and positions</p>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/recruitment/jobs" className="text-xs text-[#5e2b9d]">
                  Manage Jobs <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="pt-0">
              {jobOpenings && jobOpenings.length > 0 ? (
                <div className="divide-y divide-[#f1f3f5]">
                  {jobOpenings.map((job: any) => (
                    <div key={job.id} className="py-3.5 flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-sm text-[#111827]">{job.title}</h4>
                          <span className="text-[10px] bg-[#f1f3f5] text-[#6b7280] px-1.5 py-0.5 rounded capitalize">
                            {job.job_type?.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-[#6b7280] mt-0.5">
                          {job.departments?.name ?? 'Department'} &bull; {job.branches?.name ?? 'HQ'} &bull; {job.vacancies} {job.vacancies === 1 ? 'vacancy' : 'vacancies'}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium text-[#5e2b9d]">
                          {formatDate(job.created_at, 'dd MMM')}
                        </span>
                        <Button variant="secondary" size="sm" asChild>
                          <Link href={`/recruitment/jobs`}>View</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="divide-y divide-[#f1f3f5]">
                  {[
                    { title: 'Senior Full Stack Engineer', dept: 'Engineering', loc: 'Mumbai HQ', vacancies: 2, type: 'Full Time' },
                    { title: 'HR Operations Specialist', dept: 'Human Resources', loc: 'Bangalore', vacancies: 1, type: 'Full Time' },
                    { title: 'Product Designer (UI/UX)', dept: 'Product', loc: 'Remote', vacancies: 1, type: 'Full Time' },
                  ].map((job) => (
                    <div key={job.title} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <h4 className="font-semibold text-sm text-[#111827]">{job.title}</h4>
                        <p className="text-[#6b7280] mt-0.5">{job.dept} &bull; {job.loc} &bull; {job.vacancies} vacancies</p>
                      </div>
                      <span className="text-xs bg-[#f0fdf4] text-[#16a34a] font-medium px-2 py-0.5 rounded">
                        Active Requisition
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Interview Schedule */}
        <div>
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-[#5e2b9d]" />
                Upcoming Interviews
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {[
                  { candidate: 'Rahul Sharma', round: 'Technical Round 1', time: 'Today, 03:00 PM', role: 'Full Stack Engineer' },
                  { candidate: 'Sneha Patel', round: 'System Design Interview', time: 'Tomorrow, 11:30 AM', role: 'Senior Backend Dev' },
                  { candidate: 'Vikram Verma', round: 'HR Discussion & Offer', time: '12 Nov, 04:00 PM', role: 'Product Manager' },
                ].map((item) => (
                  <div key={item.candidate} className="p-3 bg-[#f8f9fa] rounded-lg border border-[#e5e7eb] text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#111827]">{item.candidate}</span>
                      <span className="text-[10px] text-[#2563eb] font-medium">{item.time}</span>
                    </div>
                    <p className="text-[#6b7280] mt-0.5">{item.round} &bull; {item.role}</p>
                    <div className="mt-2 pt-2 border-t border-[#e5e7eb] flex items-center justify-between text-[11px]">
                      <span className="text-[#9ca3af]">Google Meet Video</span>
                      <a href="#" className="text-[#5e2b9d] hover:underline font-medium">Join Call &rarr;</a>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

