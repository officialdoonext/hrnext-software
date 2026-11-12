import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/layout/PageHeader'
import { AttendanceRegisterClient } from './AttendanceRegisterClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Monthly Attendance Register (Muster Roll)' }

export default async function AttendanceRegisterPage() {
  const supabase = await createClient()

  // Fetch active employees with departments
  const { data: employees } = await supabase
    .from('employees')
    .select(`
      id, employee_id, first_name, last_name, photo_url,
      departments (name),
      designations (name),
      branches (name)
    `)
    .eq('employment_status', 'active')
    .order('first_name')

  // Fetch current month attendance records
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`
  const lastDay = new Date(year, month, 0).getDate()
  const endDate = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`

  const { data: attendanceRecords } = await supabase
    .from('attendance_records')
    .select('employee_id, date, status, check_in, check_out, working_hours')
    .gte('date', startDate)
    .lte('date', endDate)

  return (
    <div>
      <PageHeader
        title="Monthly Attendance Register (Muster Roll)"
        description="Full 31-day monthly attendance matrix: Present, Absent, Half-Day, Paid Leave, Holidays, and Weekend offs."
        breadcrumb={[
          { label: 'Attendance', href: '/attendance' },
          { label: 'Register' },
        ]}
      />
      <AttendanceRegisterClient
        employees={(employees as any) ?? []}
        initialRecords={(attendanceRecords as any) ?? []}
      />
    </div>
  )
}

