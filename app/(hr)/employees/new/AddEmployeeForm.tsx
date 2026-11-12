'use client'

import * as React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import {
  User, Briefcase, FileText, Building2, AlertCircle, GraduationCap,
  History, DollarSign, Upload, Lock, Plus, Trash2, Save, ArrowRight
} from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/components/ui/toaster'
import { createClient } from '@/lib/supabase/client'

// ---- Zod Schema ----
const addressSchema = z.object({
  line1: z.string().optional(),
  line2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
  country: z.string().default('India'),
})

const employeeSchema = z.object({
  // Tab 1: Personal
  first_name: z.string().min(1, 'First name is required'),
  middle_name: z.string().optional(),
  last_name: z.string().min(1, 'Last name is required'),
  date_of_birth: z.string().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  marital_status: z.enum(['single', 'married', 'divorced', 'widowed']).optional(),
  blood_group: z.string().optional(),
  personal_email: z.string().email('Invalid email').optional().or(z.literal('')),
  mobile: z.string().min(10, 'Enter valid mobile number').optional().or(z.literal('')),
  alternate_mobile: z.string().optional(),
  nationality: z.string().default('Indian'),
  current_address: addressSchema.optional(),
  permanent_address: addressSchema.optional(),

  // Tab 2: Employment
  branch_id: z.string().optional(),
  joining_date: z.string().min(1, 'Joining date is required'),
  employment_type: z.enum(['full_time', 'part_time', 'contract', 'intern']),
  department_id: z.string().optional(),
  designation_id: z.string().optional(),
  job_grade_id: z.string().optional(),
  reporting_manager_id: z.string().optional(),
  work_location: z.string().optional(),
  employment_status: z.enum(['active', 'inactive', 'on_leave']).default('active'),
  probation_end_date: z.string().optional(),
  confirmation_date: z.string().optional(),
  notice_period_days: z.coerce.number().optional(),
  work_email: z.string().email('Invalid work email').optional().or(z.literal('')),
  work_phone: z.string().optional(),
  cost_centre_id: z.string().optional(),

  // Tab 3: Identity
  pan: z.string().optional(),
  aadhaar: z.string().optional(),
  uan: z.string().optional(),
  pf_member_id: z.string().optional(),
  esi_number: z.string().optional(),
  pt_state: z.string().optional(),
  tax_regime: z.enum(['old', 'new']).optional(),

  // Tab 4: Bank
  account_holder_name: z.string().optional(),
  bank_name: z.string().optional(),
  account_number: z.string().optional(),
  ifsc_code: z.string().optional(),
  bank_branch: z.string().optional(),

  // Tab 5: Emergency Contact
  emergency_contact_name: z.string().optional(),
  emergency_relationship: z.string().optional(),
  emergency_mobile: z.string().optional(),
  emergency_alternate: z.string().optional(),
  emergency_address: z.string().optional(),

  // Tab 6: Education (dynamic)
  education: z.array(z.object({
    qualification: z.string().min(1, 'Required'),
    institution: z.string().min(1, 'Required'),
    university: z.string().optional(),
    specialization: z.string().optional(),
    year_of_passing: z.coerce.number().optional(),
    percentage: z.coerce.number().optional(),
  })).optional(),

  // Tab 7: Experience (dynamic)
  experience: z.array(z.object({
    company_name: z.string().min(1, 'Required'),
    designation: z.string().optional(),
    start_date: z.string().min(1, 'Required'),
    end_date: z.string().optional(),
    last_drawn_salary: z.coerce.number().optional(),
    reason_for_leaving: z.string().optional(),
  })).optional(),

  // Tab 8: Salary
  annual_ctc: z.coerce.number().optional(),
  effective_date: z.string().optional(),

  // Tab 10: Access
  role: z.enum(['hr_admin', 'hr_manager', 'manager', 'employee']).default('employee'),
  login_enabled: z.boolean().default(false),
})

type EmployeeFormData = z.infer<typeof employeeSchema>

interface AddEmployeeFormProps {
  departments: { id: string; name: string }[]
  designations: { id: string; name: string }[]
  branches: { id: string; name: string }[]
  jobGrades: { id: string; name: string }[]
  costCentres: { id: string; name: string }[]
  managers: { id: string; first_name: string; last_name: string; employee_id: string }[]
}

const TABS = [
  { id: 'personal', label: 'Personal', icon: User, step: 1 },
  { id: 'employment', label: 'Employment', icon: Briefcase, step: 2 },
  { id: 'identity', label: 'Identity', icon: FileText, step: 3 },
  { id: 'bank', label: 'Bank', icon: Building2, step: 4 },
  { id: 'emergency', label: 'Emergency', icon: AlertCircle, step: 5 },
  { id: 'education', label: 'Education', icon: GraduationCap, step: 6 },
  { id: 'experience', label: 'Experience', icon: History, step: 7 },
  { id: 'salary', label: 'Salary', icon: DollarSign, step: 8 },
  { id: 'documents', label: 'Documents', icon: Upload, step: 9 },
  { id: 'access', label: 'Access', icon: Lock, step: 10 },
]

function FormField({ label, required, error, children }: {
  label: string
  required?: boolean
  error?: any
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1">
      <Label required={required}>{label}</Label>
      {children}
      {error && <p className="text-xs text-[#dc2626]">{typeof error === 'string' ? error : error?.message || String(error)}</p>}
    </div>
  )
}

function FormSection({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      {title && (
        <h3 className="text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-3 pb-2 border-b border-[#f1f3f5]">
          {title}
        </h3>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  )
}

export function AddEmployeeForm({
  departments, designations, branches, jobGrades, costCentres, managers
}: AddEmployeeFormProps) {
  const router = useRouter()
  const { success, error: showError } = useToast()
  const [activeTab, setActiveTab] = React.useState('personal')
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    control,
  } = useForm<any>({
    resolver: zodResolver(employeeSchema) as any,
    defaultValues: {
      employment_type: 'full_time',
      employment_status: 'active',
      nationality: 'Indian',
      tax_regime: 'new',
      role: 'employee',
      login_enabled: false,
      education: [],
      experience: [],
    },
  })

  const { fields: eduFields, append: addEdu, remove: removeEdu } = useFieldArray({ control, name: 'education' })
  const { fields: expFields, append: addExp, remove: removeExp } = useFieldArray({ control, name: 'experience' })

  const onSubmit = async (data: EmployeeFormData) => {
    setIsSubmitting(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // Get tenant/company info from user
      const { data: userProfile } = await supabase
        .from('users')
        .select('tenant_id')
        .eq('id', user.id)
        .single()

      // Generate employee ID
      const { count } = await supabase
        .from('employees')
        .select('*', { count: 'exact', head: true })
      const empId = `EMP${String((count ?? 0) + 1).padStart(4, '0')}`

      // Insert employee
      const { data: employee, error: empError } = await supabase
        .from('employees')
        .insert({
          tenant_id: userProfile?.tenant_id ?? user.id,
          company_id: userProfile?.tenant_id ?? user.id,
          employee_id: empId,
          first_name: data.first_name,
          middle_name: data.middle_name || null,
          last_name: data.last_name,
          date_of_birth: data.date_of_birth || null,
          gender: data.gender || null,
          marital_status: data.marital_status || null,
          blood_group: data.blood_group || null,
          personal_email: data.personal_email || null,
          mobile: data.mobile || null,
          alternate_mobile: data.alternate_mobile || null,
          nationality: data.nationality,
          joining_date: data.joining_date,
          employment_type: data.employment_type,
          employment_status: data.employment_status,
          branch_id: data.branch_id || null,
          department_id: data.department_id || null,
          designation_id: data.designation_id || null,
          job_grade_id: data.job_grade_id || null,
          reporting_manager_id: data.reporting_manager_id || null,
          cost_centre_id: data.cost_centre_id || null,
          work_email: data.work_email || null,
          work_phone: data.work_phone || null,
          work_location: data.work_location || null,
          probation_end_date: data.probation_end_date || null,
          confirmation_date: data.confirmation_date || null,
          notice_period_days: data.notice_period_days || null,
          created_by: user.id,
        })
        .select('id')
        .single()

      if (empError) throw empError

      const employeeId = employee.id
      const tenantId = userProfile?.tenant_id ?? user.id

      // Insert related records in parallel
      const promises: Promise<unknown>[] = []

      // Personal details (addresses)
      if (data.current_address || data.permanent_address) {
        promises.push(
          Promise.resolve(
            supabase.from('employee_personal_details').insert({
              employee_id: employeeId,
              tenant_id: tenantId,
              current_address: data.current_address as Record<string, unknown>,
              permanent_address: data.permanent_address as Record<string, unknown>,
              same_as_current: false,
            })
          )
        )
      }

      // Bank details
      if (data.account_number && data.bank_name) {
        promises.push(
          Promise.resolve(
            supabase.from('employee_bank_accounts').insert({
              employee_id: employeeId,
              tenant_id: tenantId,
              account_holder_name: data.account_holder_name ?? `${data.first_name} ${data.last_name}`,
              bank_name: data.bank_name,
              account_number: data.account_number,
              ifsc_code: data.ifsc_code ?? '',
              branch_name: data.bank_branch || null,
              is_primary: true,
            })
          )
        )
      }

      // Statutory details
      if (data.pan || data.uan) {
        promises.push(
          Promise.resolve(
            supabase.from('employee_statutory_details').insert({
              employee_id: employeeId,
              tenant_id: tenantId,
              pan: data.pan || null,
              aadhaar_last4: data.aadhaar ? data.aadhaar.slice(-4) : null,
              uan: data.uan || null,
              pf_member_id: data.pf_member_id || null,
              esi_number: data.esi_number || null,
              pt_state: data.pt_state || null,
              tax_regime: data.tax_regime || null,
            })
          )
        )
      }

      // Education
      if (data.education && data.education.length > 0) {
        promises.push(
          Promise.resolve(
            supabase.from('employee_education').insert(
              data.education.map((edu: any) => ({
                employee_id: employeeId,
                tenant_id: tenantId,
                ...edu,
              }))
            )
          )
        )
      }

      // Experience
      if (data.experience && data.experience.length > 0) {
        promises.push(
          Promise.resolve(
            supabase.from('employee_experience').insert(
              data.experience.map((exp: any) => ({
                employee_id: employeeId,
                tenant_id: tenantId,
                ...exp,
                end_date: exp.end_date || null,
              }))
            )
          )
        )
      }

      // Emergency contact
      if (data.emergency_contact_name) {
        promises.push(
          Promise.resolve(
            supabase.from('employee_emergency_contacts').insert({
              employee_id: employeeId,
              tenant_id: tenantId,
              contact_name: data.emergency_contact_name,
              relationship: data.emergency_relationship ?? '',
              mobile: data.emergency_mobile ?? '',
              alternate_mobile: data.emergency_alternate || null,
              address: data.emergency_address || null,
            })
          )
        )
      }

      await Promise.all(promises)

      success('Employee created successfully', `${data.first_name} ${data.last_name} has been added with ID ${empId}`)
      router.push(`/employees/${employeeId}`)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create employee'
      showError('Error', msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Tab List */}
          <div className="border-b border-[#e5e7eb] overflow-x-auto">
            <TabsList className="border-0 flex-nowrap min-w-max">
              {TABS.map((tab) => {
                const Icon = tab.icon
                return (
                  <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-1.5 text-xs px-3">
                    <Icon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.step}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </div>

          {/* Tab 1: Personal */}
          <TabsContent value="personal">
            <CardContent className="pt-5">
              <FormSection title="Basic Information">
                <FormField label="First Name" required error={errors.first_name?.message}>
                  <Input {...register('first_name')} placeholder="John" />
                </FormField>
                <FormField label="Middle Name">
                  <Input {...register('middle_name')} placeholder="Michael" />
                </FormField>
                <FormField label="Last Name" required error={errors.last_name?.message}>
                  <Input {...register('last_name')} placeholder="Doe" />
                </FormField>
                <FormField label="Date of Birth">
                  <Input type="date" {...register('date_of_birth')} />
                </FormField>
                <FormField label="Gender">
                  <Select onValueChange={(v) => setValue('gender', v as 'male' | 'female' | 'other')}>
                    <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Marital Status">
                  <Select onValueChange={(v) => setValue('marital_status', v as 'single' | 'married' | 'divorced' | 'widowed')}>
                    <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Blood Group">
                  <Select onValueChange={(v) => setValue('blood_group', v)}>
                    <SelectTrigger><SelectValue placeholder="Select blood group" /></SelectTrigger>
                    <SelectContent>
                      {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
                        <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Personal Email" error={errors.personal_email?.message}>
                  <Input type="email" {...register('personal_email')} placeholder="john@gmail.com" />
                </FormField>
                <FormField label="Mobile" error={errors.mobile?.message}>
                  <Input {...register('mobile')} placeholder="+91 98765 43210" />
                </FormField>
                <FormField label="Alternate Number">
                  <Input {...register('alternate_mobile')} placeholder="+91 98765 43211" />
                </FormField>
                <FormField label="Nationality">
                  <Input {...register('nationality')} placeholder="Indian" />
                </FormField>
              </FormSection>

              <FormSection title="Current Address">
                <div className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <FormField label="Address Line 1">
                    <Input {...register('current_address.line1')} placeholder="Street / Flat No." />
                  </FormField>
                  <FormField label="Address Line 2">
                    <Input {...register('current_address.line2')} placeholder="Area / Locality" />
                  </FormField>
                  <FormField label="City">
                    <Input {...register('current_address.city')} placeholder="Mumbai" />
                  </FormField>
                  <FormField label="State">
                    <Input {...register('current_address.state')} placeholder="Maharashtra" />
                  </FormField>
                  <FormField label="Pincode">
                    <Input {...register('current_address.pincode')} placeholder="400001" />
                  </FormField>
                </div>
              </FormSection>
            </CardContent>
          </TabsContent>

          {/* Tab 2: Employment */}
          <TabsContent value="employment">
            <CardContent className="pt-5">
              <FormSection title="Employment Details">
                <FormField label="Branch">
                  <Select onValueChange={(v) => setValue('branch_id', v)}>
                    <SelectTrigger><SelectValue placeholder="Select branch" /></SelectTrigger>
                    <SelectContent>
                      {branches.map((b) => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Joining Date" required error={errors.joining_date?.message}>
                  <Input type="date" {...register('joining_date')} />
                </FormField>
                <FormField label="Employment Type" required>
                  <Select defaultValue="full_time" onValueChange={(v) => setValue('employment_type', v as 'full_time' | 'part_time' | 'contract' | 'intern')}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full_time">Full Time</SelectItem>
                      <SelectItem value="part_time">Part Time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="intern">Intern</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Department">
                  <Select onValueChange={(v) => setValue('department_id', v)}>
                    <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                    <SelectContent>
                      {departments.map((d) => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Designation">
                  <Select onValueChange={(v) => setValue('designation_id', v)}>
                    <SelectTrigger><SelectValue placeholder="Select designation" /></SelectTrigger>
                    <SelectContent>
                      {designations.map((d) => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Job Grade">
                  <Select onValueChange={(v) => setValue('job_grade_id', v)}>
                    <SelectTrigger><SelectValue placeholder="Select grade" /></SelectTrigger>
                    <SelectContent>
                      {jobGrades.map((g) => <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Reporting Manager">
                  <Select onValueChange={(v) => setValue('reporting_manager_id', v)}>
                    <SelectTrigger><SelectValue placeholder="Select manager" /></SelectTrigger>
                    <SelectContent>
                      {managers.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.first_name} {m.last_name} ({m.employee_id})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Work Location">
                  <Input {...register('work_location')} placeholder="Mumbai HQ / Remote" />
                </FormField>
                <FormField label="Cost Centre">
                  <Select onValueChange={(v) => setValue('cost_centre_id', v)}>
                    <SelectTrigger><SelectValue placeholder="Select cost centre" /></SelectTrigger>
                    <SelectContent>
                      {costCentres.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Work Email">
                  <Input type="email" {...register('work_email')} placeholder="john@company.com" />
                </FormField>
                <FormField label="Work Phone">
                  <Input {...register('work_phone')} placeholder="+91 22 1234 5678" />
                </FormField>
                <FormField label="Notice Period (Days)">
                  <Input type="number" {...register('notice_period_days')} placeholder="30" />
                </FormField>
                <FormField label="Probation End Date">
                  <Input type="date" {...register('probation_end_date')} />
                </FormField>
                <FormField label="Confirmation Date">
                  <Input type="date" {...register('confirmation_date')} />
                </FormField>
              </FormSection>
            </CardContent>
          </TabsContent>

          {/* Tab 3: Identity */}
          <TabsContent value="identity">
            <CardContent className="pt-5">
              <FormSection title="Statutory & Identity Documents">
                <FormField label="PAN Number">
                  <Input {...register('pan')} placeholder="ABCDE1234F" className="uppercase" />
                </FormField>
                <FormField label="Aadhaar Number">
                  <Input {...register('aadhaar')} placeholder="**** **** **** 1234" maxLength={12} />
                </FormField>
                <FormField label="UAN (PF)">
                  <Input {...register('uan')} placeholder="100123456789" />
                </FormField>
                <FormField label="PF Member ID">
                  <Input {...register('pf_member_id')} placeholder="MH/BAN/0123456/000/0123456" />
                </FormField>
                <FormField label="ESI Number">
                  <Input {...register('esi_number')} placeholder="21-00-123456-000-0001" />
                </FormField>
                <FormField label="Professional Tax State">
                  <Select onValueChange={(v) => setValue('pt_state', v)}>
                    <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                    <SelectContent>
                      {[
                        'Maharashtra', 'Karnataka', 'Tamil Nadu', 'West Bengal',
                        'Andhra Pradesh', 'Gujarat', 'Kerala', 'Telangana',
                        'Madhya Pradesh', 'Assam',
                      ].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Tax Regime">
                  <Select defaultValue="new" onValueChange={(v) => setValue('tax_regime', v as 'old' | 'new')}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New Regime</SelectItem>
                      <SelectItem value="old">Old Regime</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
              </FormSection>
            </CardContent>
          </TabsContent>

          {/* Tab 4: Bank */}
          <TabsContent value="bank">
            <CardContent className="pt-5">
              <FormSection title="Bank Account Details">
                <FormField label="Account Holder Name">
                  <Input {...register('account_holder_name')} placeholder="As per bank records" />
                </FormField>
                <FormField label="Bank Name">
                  <Select onValueChange={(v) => setValue('bank_name', v)}>
                    <SelectTrigger><SelectValue placeholder="Select bank" /></SelectTrigger>
                    <SelectContent>
                      {[
                        'State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank',
                        'Kotak Mahindra Bank', 'Punjab National Bank', 'Bank of Baroda',
                        'Canara Bank', 'Union Bank of India', 'Indian Bank', 'Other',
                      ].map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Account Number">
                  <Input {...register('account_number')} placeholder="123456789012" />
                </FormField>
                <FormField label="IFSC Code">
                  <Input {...register('ifsc_code')} placeholder="SBIN0001234" className="uppercase" />
                </FormField>
                <FormField label="Branch Name">
                  <Input {...register('bank_branch')} placeholder="Andheri West, Mumbai" />
                </FormField>
              </FormSection>
            </CardContent>
          </TabsContent>

          {/* Tab 5: Emergency Contact */}
          <TabsContent value="emergency">
            <CardContent className="pt-5">
              <FormSection title="Emergency Contact">
                <FormField label="Contact Name">
                  <Input {...register('emergency_contact_name')} placeholder="Jane Doe" />
                </FormField>
                <FormField label="Relationship">
                  <Select onValueChange={(v) => setValue('emergency_relationship', v)}>
                    <SelectTrigger><SelectValue placeholder="Select relationship" /></SelectTrigger>
                    <SelectContent>
                      {['Spouse', 'Parent', 'Sibling', 'Child', 'Friend', 'Other'].map((r) => (
                        <SelectItem key={r} value={r.toLowerCase()}>{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Mobile">
                  <Input {...register('emergency_mobile')} placeholder="+91 98765 43210" />
                </FormField>
                <FormField label="Alternate Number">
                  <Input {...register('emergency_alternate')} placeholder="+91 98765 43211" />
                </FormField>
              </FormSection>
              <div className="col-span-full">
                <FormField label="Address">
                  <Textarea {...register('emergency_address')} placeholder="Emergency contact address" rows={3} />
                </FormField>
              </div>
            </CardContent>
          </TabsContent>

          {/* Tab 6: Education */}
          <TabsContent value="education">
            <CardContent className="pt-5">
              <div className="space-y-4">
                {eduFields.map((field, index) => (
                  <div key={field.id} className="border border-[#e5e7eb] rounded-lg p-4 relative">
                    <button
                      type="button"
                      onClick={() => removeEdu(index)}
                      className="absolute right-3 top-3 text-[#9ca3af] hover:text-[#dc2626]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <p className="text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-3">
                      Education #{index + 1}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <FormField label="Qualification" required error={(errors.education as any)?.[index]?.qualification?.message}>
                        <Input {...register(`education.${index}.qualification`)} placeholder="B.Tech / MBA / B.Com" />
                      </FormField>
                      <FormField label="Institution" required error={(errors.education as any)?.[index]?.institution?.message}>
                        <Input {...register(`education.${index}.institution`)} placeholder="College / School name" />
                      </FormField>
                      <FormField label="University / Board">
                        <Input {...register(`education.${index}.university`)} placeholder="University name" />
                      </FormField>
                      <FormField label="Specialization">
                        <Input {...register(`education.${index}.specialization`)} placeholder="Computer Science" />
                      </FormField>
                      <FormField label="Year of Passing">
                        <Input type="number" {...register(`education.${index}.year_of_passing`)} placeholder="2020" />
                      </FormField>
                      <FormField label="Percentage / CGPA">
                        <Input type="number" step="0.01" {...register(`education.${index}.percentage`)} placeholder="85.5" />
                      </FormField>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => addEdu({ qualification: '', institution: '' })}
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Education
                </Button>
              </div>
            </CardContent>
          </TabsContent>

          {/* Tab 7: Experience */}
          <TabsContent value="experience">
            <CardContent className="pt-5">
              <div className="space-y-4">
                {expFields.map((field, index) => (
                  <div key={field.id} className="border border-[#e5e7eb] rounded-lg p-4 relative">
                    <button
                      type="button"
                      onClick={() => removeExp(index)}
                      className="absolute right-3 top-3 text-[#9ca3af] hover:text-[#dc2626]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <p className="text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-3">
                      Employment #{index + 1}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <FormField label="Company Name" required error={(errors.experience as any)?.[index]?.company_name?.message}>
                        <Input {...register(`experience.${index}.company_name`)} placeholder="Previous Company Pvt Ltd" />
                      </FormField>
                      <FormField label="Designation">
                        <Input {...register(`experience.${index}.designation`)} placeholder="Software Engineer" />
                      </FormField>
                      <FormField label="Start Date" required error={(errors.experience as any)?.[index]?.start_date?.message}>
                        <Input type="date" {...register(`experience.${index}.start_date`)} />
                      </FormField>
                      <FormField label="End Date">
                        <Input type="date" {...register(`experience.${index}.end_date`)} />
                      </FormField>
                      <FormField label="Last Drawn Salary (₹)">
                        <Input type="number" {...register(`experience.${index}.last_drawn_salary`)} placeholder="50000" />
                      </FormField>
                      <FormField label="Reason for Leaving">
                        <Input {...register(`experience.${index}.reason_for_leaving`)} placeholder="Better opportunity" />
                      </FormField>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => addExp({ company_name: '', start_date: '' })}
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Employment
                </Button>
              </div>
            </CardContent>
          </TabsContent>

          {/* Tab 8: Salary */}
          <TabsContent value="salary">
            <CardContent className="pt-5">
              <FormSection title="Salary Information">
                <FormField label="Annual CTC (₹)">
                  <Input type="number" {...register('annual_ctc')} placeholder="600000" />
                </FormField>
                <FormField label="Effective Date">
                  <Input type="date" {...register('effective_date')} />
                </FormField>
              </FormSection>
              <div className="bg-[#f3eefb] border border-[#cbb4ec] rounded-lg p-4">
                <p className="text-xs text-[#5e2b9d] font-medium mb-1">💡 Salary Structure</p>
                <p className="text-xs text-[#7c4db8]">
                  Configure salary structures from Payroll → Salary Structures to auto-calculate
                  earnings, deductions, PF, ESI, and other components.
                </p>
              </div>
            </CardContent>
          </TabsContent>

          {/* Tab 9: Documents */}
          <TabsContent value="documents">
            <CardContent className="pt-5">
              <div className="bg-[#fffbeb] border border-[#fde68a] rounded-lg p-4 mb-5">
                <p className="text-xs text-[#d97706] font-medium">
                  Document uploads are available after creating the employee profile.
                </p>
              </div>
              <FormSection title="Required Documents">
                {[
                  'Resume / CV',
                  'PAN Card',
                  'Aadhaar Card',
                  'Educational Certificates',
                  'Experience Letters',
                  'Offer Letter',
                  'Appointment Letter',
                  'Bank Proof',
                ].map((doc) => (
                  <div key={doc} className="flex items-center gap-3 p-3 border border-dashed border-[#d1d5db] rounded-[6px] bg-[#f8f9fa]">
                    <Upload className="h-4 w-4 text-[#9ca3af]" />
                    <div>
                      <p className="text-sm text-[#374151]">{doc}</p>
                      <p className="text-xs text-[#9ca3af]">Upload after saving</p>
                    </div>
                  </div>
                ))}
              </FormSection>
            </CardContent>
          </TabsContent>

          {/* Tab 10: Access */}
          <TabsContent value="access">
            <CardContent className="pt-5">
              <FormSection title="Login & System Access">
                <FormField label="Role">
                  <Select defaultValue="employee" onValueChange={(v) => setValue('role', v as 'employee' | 'manager' | 'hr_manager' | 'hr_admin')}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employee">Employee</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="hr_manager">HR Manager</SelectItem>
                      <SelectItem value="hr_admin">HR Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
              </FormSection>
              <div className="bg-[#f3eefb] border border-[#cbb4ec] rounded-lg p-4">
                <p className="text-xs text-[#5e2b9d] font-medium mb-1">🔐 Account Creation</p>
                <p className="text-xs text-[#7c4db8]">
                  An invitation email will be sent to the work email address after the employee record
                  is saved. The employee can set up their password through the invitation link.
                </p>
              </div>
            </CardContent>
          </TabsContent>
        </Tabs>

        {/* Footer Actions */}
        <div className="border-t border-[#e5e7eb] px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-xs text-[#9ca3af]">
              Step {TABS.findIndex((t) => t.id === activeTab) + 1} of {TABS.length}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => {
                const idx = TABS.findIndex((t) => t.id === activeTab)
                if (idx > 0) setActiveTab(TABS[idx - 1].id)
              }}
              disabled={activeTab === TABS[0].id}
            >
              Previous
            </Button>
            {activeTab !== TABS[TABS.length - 1].id ? (
              <Button
                type="button"
                size="sm"
                onClick={() => {
                  const idx = TABS.findIndex((t) => t.id === activeTab)
                  if (idx < TABS.length - 1) setActiveTab(TABS[idx + 1].id)
                }}
              >
                Next <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            ) : (
              <Button type="submit" size="sm" loading={isSubmitting}>
                <Save className="h-3.5 w-3.5" />
                {isSubmitting ? 'Saving...' : 'Save Employee'}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </form>
  )
}

