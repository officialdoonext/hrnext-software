import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/common/Avatar'
import { StatusBadge } from '@/components/common/StatusBadge'
import { formatDate } from '@/lib/utils/date'
import {
  UserCheck, CheckSquare, FileText, Laptop, ShieldCheck,
  Plus, ArrowRight, Clock, Award
} from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Employee Onboarding' }

export default async function OnboardingDashboardPage() {
  const supabase = await createClient()

  // Fetch recent joiners (joining within last 30 days or upcoming)
  const { data: newHires } = await supabase
    .from('employees')
    .select(`
      id, employee_id, first_name, last_name, photo_url, joining_date, employment_status,
      departments (name),
      designations (name),
      branches (name)
    `)
    .order('joining_date', { ascending: false })
    .limit(6)

  return (
    <div>
      <PageHeader
        title="Employee Onboarding"
        description="Streamline pre-boarding, documentation collection, IT provisioning, and induction tasks for new team members."
        breadcrumb={[{ label: 'Onboarding' }, { label: 'Dashboard' }]}
        actions={
          <Button size="sm" asChild>
            <Link href="/employees/new">
              <Plus className="h-3.5 w-3.5 mr-1" />
              Onboard New Hire
            </Link>
          </Button>
        }
      />

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-[#6b7280] font-medium">In Onboarding Pipeline</p>
            <p className="text-2xl font-bold text-[#5e2b9d] mt-1">4</p>
            <p className="text-xs text-[#9ca3af] mt-1">Active onboarding workflows</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-[#6b7280] font-medium">Pending Document Verification</p>
            <p className="text-2xl font-bold text-[#d97706] mt-1">2</p>
            <p className="text-xs text-[#9ca3af] mt-1">Aadhaar, PAN & Education records</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-[#6b7280] font-medium">IT Asset Provisioning</p>
            <p className="text-2xl font-bold text-[#2563eb] mt-1">3</p>
            <p className="text-xs text-[#9ca3af] mt-1">Laptop & email access configured</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-[#6b7280] font-medium">Successfully Completed</p>
            <p className="text-2xl font-bold text-[#16a34a] mt-1">12</p>
            <p className="text-xs text-[#16a34a] mt-1">100% compliance rate</p>
          </CardContent>
        </Card>
      </div>

      {/* New Hires Onboarding Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle>Active Onboarding Candidates</CardTitle>
                <p className="text-xs text-[#6b7280] mt-0.5">Track stage, document verification, and orientation progress</p>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="divide-y divide-[#f1f3f5]">
                {[
                  { name: 'Amit Kumar', role: 'Frontend Engineer', dept: 'Engineering', joining: 'Joining in 3 days', progress: 85, status: 'Documentation Done' },
                  { name: 'Pooja Hegde', role: 'Talent Acquisition Lead', dept: 'HR', joining: 'Joined Yesterday', progress: 60, status: 'IT Assets Pending' },
                  { name: 'Karthik Raja', role: 'DevOps Engineer', dept: 'Infrastructure', joining: 'Joining 20 Nov', progress: 40, status: 'Background Check' },
                  { name: 'Ananya Deshmukh', role: 'Financial Analyst', dept: 'Finance', joining: 'Joined 01 Nov', progress: 100, status: 'Completed' },
                ].map((hire) => (
                  <div key={hire.name} className="py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <Avatar name={hire.name} size="md" />
                      <div>
                        <h4 className="font-semibold text-sm text-[#111827]">{hire.name}</h4>
                        <p className="text-[#6b7280]">
                          {hire.role} &bull; {hire.dept}
                        </p>
                        <span className="text-[11px] text-[#5e2b9d] font-medium">{hire.joining}</span>
                      </div>
                    </div>

                    <div className="w-full sm:w-48">
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="text-[#6b7280]">{hire.status}</span>
                        <span className="font-bold text-[#111827]">{hire.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#f1f3f5] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${hire.progress === 100 ? 'bg-[#16a34a]' : 'bg-[#5e2b9d]'}`}
                          style={{ width: `${hire.progress}%` }}
                        />
                      </div>
                    </div>

                    <Button variant="secondary" size="sm" asChild>
                      <Link href="/employees">Review Tasks</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Onboarding Checklist Template */}
        <div>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Standard Induction Checklist</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3 text-xs">
              {[
                { task: 'Collect PAN, Aadhaar & Bank Proof', category: 'Documentation', done: true },
                { task: 'Signed Offer & Appointment Letter', category: 'HR Legal', done: true },
                { task: 'Create Work Email & Slack Account', category: 'IT Provisioning', done: true },
                { task: 'Ship MacBook & Welcome Kit', category: 'Asset Management', done: false },
                { task: 'Assign Reporting Manager & Team Buddy', category: 'Orientation', done: false },
                { task: 'Schedule 30-Day HR Check-in Call', category: 'HR Touchpoint', done: false },
              ].map((item) => (
                <div key={item.task} className="flex items-start gap-2.5 p-2 rounded hover:bg-[#f8f9fa]">
                  <CheckSquare className={`h-4 w-4 mt-0.5 ${item.done ? 'text-[#16a34a]' : 'text-[#d1d5db]'}`} />
                  <div>
                    <span className={`font-medium ${item.done ? 'line-through text-[#9ca3af]' : 'text-[#111827]'}`}>
                      {item.task}
                    </span>
                    <span className="text-[10px] text-[#6b7280] block mt-0.5">{item.category}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

