import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/layout/PageHeader'
import { LeaveTypesClient } from './LeaveTypesClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Leave Types & Policies' }

export default async function LeaveTypesPage() {
  const supabase = await createClient()

  const { data: leaveTypes } = await supabase
    .from('leave_types')
    .select('*')
    .order('name')

  return (
    <div>
      <PageHeader
        title="Leave Types & Policies"
        description="Configure organization leave types, annual allocation quotas, carry forward, and encashment policies."
        breadcrumb={[
          { label: 'Leave', href: '/leave' },
          { label: 'Leave Types' },
        ]}
      />
      <LeaveTypesClient initialLeaveTypes={leaveTypes ?? []} />
    </div>
  )
}

