import { PageHeader } from '@/components/layout/PageHeader'
import { MyPayslipsClient } from './MyPayslipsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'My Payslips & Tax' }

export default async function MyPayslipsPage() {
  return (
    <div>
      <PageHeader
        title="My Payslips & Tax Computations"
        description="Access and download your monthly salary slips, tax deductions, PF contributions, and annual compensation summaries."
        breadcrumb={[
          { label: 'Employee Portal', href: '/my/dashboard' },
          { label: 'My Payslips' },
        ]}
      />
      <MyPayslipsClient />
    </div>
  )
}

