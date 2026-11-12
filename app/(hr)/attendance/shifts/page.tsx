import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/layout/PageHeader'
import { ShiftsClient } from './ShiftsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Shift Management' }

export default async function ShiftsPage() {
  const supabase = await createClient()

  const { data: shifts } = await supabase
    .from('shifts')
    .select('*')
    .order('start_time', { ascending: true })

  return (
    <div>
      <PageHeader
        title="Shift Management"
        description="Configure work shifts, timings, break durations, and night shift flags."
        breadcrumb={[
          { label: 'Attendance', href: '/attendance' },
          { label: 'Shifts' },
        ]}
      />
      <ShiftsClient initialShifts={shifts ?? []} />
    </div>
  )
}

