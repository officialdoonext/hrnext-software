import { PageHeader } from '@/components/layout/PageHeader'
import { MyAttendanceClient } from './MyAttendanceClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'My Attendance & Punches' }

export default async function MyAttendancePage() {
  return (
    <div>
      <PageHeader
        title="My Attendance & Biometric Punches"
        description="View your real-time daily work hours, biometric turnstile logs, shift assignments, and submit missed punch regularizations."
        breadcrumb={[
          { label: 'Employee Portal', href: '/my/dashboard' },
          { label: 'My Attendance' },
        ]}
      />
      <MyAttendanceClient />
    </div>
  )
}

