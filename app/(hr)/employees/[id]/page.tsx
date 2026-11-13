import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { PageHeader } from '@/components/layout/PageHeader'
import { Avatar } from '@/components/common/Avatar'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Mail, Phone, MapPin, Calendar, Building2, Briefcase,
  DollarSign, FileText, Download, Pencil, Shield, CheckCircle
} from 'lucide-react'
import { formatDate } from '@/lib/utils/date'
import { formatCurrency } from '@/lib/utils/currency'
import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  const { data: emp } = await supabase
    .from('employees')
    .select('first_name, last_name')
    .eq('id', id)
    .single()
  return {
    title: emp ? `${emp.first_name} ${emp.last_name}` : 'Employee Profile',
  }
}

export default async function EmployeeProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch employee and all related data in parallel
  const [
    { data: emp },
    { data: personal },
    { data: bank },
    { data: statutory },
    { data: education },
    { data: experience },
    { data: salary },
    { data: documents },
  ] = await Promise.all([
    supabase
      .from('employees')
      .select(`
        *,
        departments (name),
        designations (name),
        branches (name),
        job_grades (name),
        cost_centres (name),
        reporting_manager:employees!employees_reporting_manager_id_fkey (first_name, last_name, employee_id)
      `)
      .eq('id', id)
      .single(),
    supabase.from('employee_personal_details').select('*').eq('employee_id', id).maybeSingle(),
    supabase.from('employee_bank_accounts').select('*').eq('employee_id', id),
    supabase.from('employee_statutory_details').select('*').eq('employee_id', id).maybeSingle(),
    supabase.from('employee_education').select('*').eq('employee_id', id).order('year_of_passing', { ascending: false }),
    supabase.from('employee_experience').select('*').eq('employee_id', id).order('start_date', { ascending: false }),
    supabase.from('employee_salary_assignments').select('*').eq('employee_id', id).eq('is_current', true).maybeSingle(),
    supabase.from('employee_documents').select('*').eq('employee_id', id),
  ])

  if (!emp) notFound()

  const fullName = [emp.first_name, emp.middle_name, emp.last_name].filter(Boolean).join(' ')

  return (
    <div>
      <PageHeader
        title={fullName}
        description={`${emp.designations?.name ?? 'Employee'} · ${emp.departments?.name ?? 'Department'} · ${emp.employee_id}`}
        breadcrumb={[
          { label: 'Employees', href: '/employees' },
          { label: fullName },
        ]}
        actions={
          <>
            <Button variant="secondary" size="sm" asChild>
              <Link href={`/employees/${id}/edit`}>
                <Pencil className="h-3.5 w-3.5" />
                Edit Profile
              </Link>
            </Button>
            <Button size="sm">
              <Download className="h-3.5 w-3.5" />
              Download Profile
            </Button>
          </>
        }
      />

      {/* Profile Header Card */}
      <Card className="mb-5">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
            <Avatar name={fullName} photoUrl={emp.photo_url} size="xl" />
            <div className="flex-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl font-bold text-[#111827]">{fullName}</h2>
                <StatusBadge status={emp.employment_status} />
                <span className="text-xs bg-[#f1f3f5] text-[#6b7280] px-2 py-0.5 rounded-[4px] font-mono">
                  {emp.employee_id}
                </span>
              </div>
              <p className="text-sm text-[#6b7280] mt-0.5">
                {emp.designations?.name ?? 'Designation not set'} &bull; {emp.departments?.name ?? 'Department not set'}
              </p>
              <div className="flex items-center gap-4 mt-3 flex-wrap text-xs text-[#6b7280]">
                {emp.work_email && (
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-[#9ca3af]" />
                    {emp.work_email}
                  </span>
                )}
                {emp.mobile && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-[#9ca3af]" />
                    {emp.mobile}
                  </span>
                )}
                {emp.branches?.name && (
                  <span className="flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-[#9ca3af]" />
                    {emp.branches.name}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-[#9ca3af]" />
                  Joined {formatDate(emp.joining_date)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <Card className="mb-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="employment">Employment</TabsTrigger>
            <TabsTrigger value="statutory">Statutory & Bank</TabsTrigger>
            <TabsTrigger value="salary">Salary Details</TabsTrigger>
            <TabsTrigger value="education">Education & Exp</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
        </Card>

        {/* Tab: Overview */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader><CardTitle>Employment Summary</CardTitle></CardHeader>
              <CardContent className="space-y-2.5 text-xs">
                {[
                  { label: 'Employee ID', value: emp.employee_id },
                  { label: 'Type', value: emp.employment_type?.replace('_', ' ') },
                  { label: 'Status', value: emp.employment_status },
                  { label: 'Joining Date', value: formatDate(emp.joining_date) },
                  { label: 'Department', value: emp.departments?.name },
                  { label: 'Designation', value: emp.designations?.name },
                  { label: 'Branch', value: emp.branches?.name },
                  { label: 'Reporting Manager', value: emp.reporting_manager ? `${emp.reporting_manager.first_name} ${emp.reporting_manager.last_name}` : '—' },
                  { label: 'Work Location', value: emp.work_location },
                  { label: 'Notice Period', value: emp.notice_period_days ? `${emp.notice_period_days} days` : '—' },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between py-1 border-b border-[#f1f3f5] last:border-0">
                    <span className="text-[#9ca3af]">{item.label}</span>
                    <span className="font-medium text-[#111827] capitalize">{item.value ?? '—'}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Statutory Summary</CardTitle></CardHeader>
              <CardContent className="space-y-2.5 text-xs">
                {[
                  { label: 'PAN', value: statutory?.pan },
                  { label: 'Aadhaar (Last 4)', value: statutory?.aadhaar_last4 ? `•••• •••• ${statutory.aadhaar_last4}` : null },
                  { label: 'UAN', value: statutory?.uan },
                  { label: 'PF Member ID', value: statutory?.pf_member_id },
                  { label: 'ESI Number', value: statutory?.esi_number },
                  { label: 'PT State', value: statutory?.pt_state },
                  { label: 'Tax Regime', value: statutory?.tax_regime ? `${statutory.tax_regime} regime` : null },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between py-1 border-b border-[#f1f3f5] last:border-0">
                    <span className="text-[#9ca3af]">{item.label}</span>
                    <span className="font-medium text-[#111827] uppercase">{item.value ?? '—'}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Compensation Summary</CardTitle></CardHeader>
              <CardContent className="space-y-2.5 text-xs">
                {[
                  { label: 'Annual CTC', value: formatCurrency(salary?.annual_ctc) },
                  { label: 'Monthly CTC', value: formatCurrency(salary?.monthly_ctc) },
                  { label: 'Gross Salary', value: formatCurrency(salary?.gross_salary) },
                  { label: 'Effective Date', value: formatDate(salary?.effective_date) },
                  { label: 'Bank Name', value: bank?.[0]?.bank_name },
                  { label: 'Account No.', value: bank?.[0]?.account_number ? `•••• ${bank[0].account_number.slice(-4)}` : null },
                  { label: 'IFSC Code', value: bank?.[0]?.ifsc_code },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between py-1 border-b border-[#f1f3f5] last:border-0">
                    <span className="text-[#9ca3af]">{item.label}</span>
                    <span className="font-medium text-[#111827]">{item.value ?? '—'}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab: Personal */}
        <TabsContent value="personal">
          <Card>
            <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                {[
                  { label: 'Date of Birth', value: formatDate(emp.date_of_birth) },
                  { label: 'Gender', value: emp.gender },
                  { label: 'Marital Status', value: emp.marital_status },
                  { label: 'Blood Group', value: emp.blood_group },
                  { label: 'Nationality', value: emp.nationality },
                  { label: 'Personal Email', value: emp.personal_email },
                  { label: 'Mobile Number', value: emp.mobile },
                  { label: 'Alternate Mobile', value: emp.alternate_mobile },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-[#9ca3af] mb-0.5">{item.label}</p>
                    <p className="font-medium text-[#111827] text-sm capitalize">{item.value ?? '—'}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Education */}
        <TabsContent value="education">
          <div className="space-y-4">
            <Card>
              <CardHeader><CardTitle>Education</CardTitle></CardHeader>
              <CardContent>
                {education && education.length > 0 ? (
                  <div className="divide-y divide-[#f1f3f5]">
                    {education.map((edu: any) => (
                      <div key={edu.id} className="py-3 first:pt-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-semibold text-[#111827]">{edu.qualification}</p>
                            <p className="text-xs text-[#6b7280]">{edu.institution} {edu.university ? `· ${edu.university}` : ''}</p>
                            {edu.specialization && <p className="text-xs text-[#9ca3af] mt-0.5">Specialization: {edu.specialization}</p>}
                          </div>
                          <div className="text-right text-xs">
                            <span className="font-medium text-[#111827]">{edu.year_of_passing}</span>
                            {edu.percentage && <p className="text-[#6b7280]">{edu.percentage}%</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#9ca3af] text-center py-6">No education records added</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Previous Experience</CardTitle></CardHeader>
              <CardContent>
                {experience && experience.length > 0 ? (
                  <div className="divide-y divide-[#f1f3f5]">
                    {experience.map((exp: any) => (
                      <div key={exp.id} className="py-3 first:pt-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-semibold text-[#111827]">{exp.company_name}</p>
                            <p className="text-xs text-[#6b7280]">{exp.designation}</p>
                            {exp.reason_for_leaving && (
                              <p className="text-xs text-[#9ca3af] mt-0.5">Reason: {exp.reason_for_leaving}</p>
                            )}
                          </div>
                          <div className="text-right text-xs">
                            <span className="font-medium text-[#111827]">
                              {formatDate(exp.start_date, 'MMM yyyy')} – {exp.end_date ? formatDate(exp.end_date, 'MMM yyyy') : 'Present'}
                            </span>
                            {exp.last_drawn_salary && (
                              <p className="text-[#6b7280]">{formatCurrency(exp.last_drawn_salary)}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#9ca3af] text-center py-6">No previous experience records</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab: Documents */}
        <TabsContent value="documents">
          <Card>
            <CardHeader><CardTitle>Employee Documents</CardTitle></CardHeader>
            <CardContent>
              {documents && documents.length > 0 ? (
                <div className="divide-y divide-[#f1f3f5]">
                  {documents.map((doc: any) => (
                    <div key={doc.id} className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-[#5e2b9d]" />
                        <div>
                          <p className="text-sm font-medium text-[#111827]">{doc.document_name}</p>
                          <p className="text-xs text-[#9ca3af] capitalize">{doc.document_type.replace('_', ' ')}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {doc.verified && (
                          <span className="flex items-center gap-1 text-xs text-[#16a34a]">
                            <CheckCircle className="h-3.5 w-3.5" /> Verified
                          </span>
                        )}
                        <Button variant="ghost" size="sm" asChild>
                          <a href={doc.file_url} target="_blank" rel="noreferrer">
                            <Download className="h-3.5 w-3.5" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#9ca3af] text-center py-8">No documents uploaded yet</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

