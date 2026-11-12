import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/layout/PageHeader'
import { RegularizationClient } from './RegularizationClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Attendance Regularization' }

export default async function AttendanceRegularizationPage() {
  const supabase = await createClient()

  // Fetch regularization requests with employee details
  const { data: regularizations } = await supabase
    .from('attendance_regularizations')
    .select(`
      id, date, requested_check_in, requested_check_out, reason, status, created_at, rejection_reason,
      employees (id, employee_id, first_name, last_name, photo_url, departments (name))
    `)
    .order('created_at', { ascending: false })

  return (
    <div>
      <PageHeader
        title="Attendance Regularization & Missed Punches"
        description="Review and resolve missed punch requests, on-duty field approvals, and biometric dispute regularizations."
        breadcrumb={[
          { label: 'Attendance', href: '/attendance' },
          { label: 'Regularization' },
        ]}
      />
      <RegularizationClient initialRequests={(regularizations as any) ?? []} />
    </div>
  )
}

