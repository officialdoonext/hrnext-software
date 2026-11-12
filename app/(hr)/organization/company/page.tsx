import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Building2, MapPin, Mail, Phone, Globe, Edit } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Company Profile' }

export default async function CompanyPage() {
  const supabase = await createClient()
  const { data: company } = await supabase
    .from('companies')
    .select('*')
    .single()

  return (
    <div>
      <PageHeader
        title="Company Profile"
        description="Manage your company information and settings."
        breadcrumb={[{ label: 'Organization' }, { label: 'Company Profile' }]}
        actions={
          <Button size="sm" asChild>
            <Link href="/organization/company/edit">
              <Edit className="h-3.5 w-3.5" />
              Edit Profile
            </Link>
          </Button>
        }
      />

      {company ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader><CardTitle>Company Information</CardTitle></CardHeader>
              <CardContent>
                <div className="flex items-start gap-4 mb-5">
                  {company.logo_url ? (
                    <img src={company.logo_url} alt="Logo" className="h-16 w-16 rounded-lg border border-[#e5e7eb] object-contain" />
                  ) : (
                    <div className="h-16 w-16 rounded-lg bg-[#f3eefb] border border-[#e5e7eb] flex items-center justify-center">
                      <Building2 className="h-7 w-7 text-[#5e2b9d]" />
                    </div>
                  )}
                  <div>
                    <h2 className="text-base font-semibold text-[#111827]">{company.name}</h2>
                    {company.legal_name && <p className="text-sm text-[#6b7280]">{company.legal_name}</p>}
                    <p className="text-xs text-[#9ca3af] mt-0.5">{company.industry ?? 'Industry not set'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {[
                    { label: 'Registration Number', value: company.registration_number },
                    { label: 'PAN', value: company.pan },
                    { label: 'GSTIN', value: company.gstin },
                    { label: 'Currency', value: company.currency },
                    { label: 'Timezone', value: company.timezone },
                    { label: 'Financial Year Start', value: `Month ${company.financial_year_start}` },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-xs text-[#9ca3af] mb-0.5">{item.label}</p>
                      <p className="text-sm font-medium text-[#111827]">{item.value ?? '—'}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Contact Information</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2.5">
                  {company.email && (
                    <div className="flex items-center gap-2 text-sm text-[#374151]">
                      <Mail className="h-4 w-4 text-[#9ca3af]" />
                      {company.email}
                    </div>
                  )}
                  {company.phone && (
                    <div className="flex items-center gap-2 text-sm text-[#374151]">
                      <Phone className="h-4 w-4 text-[#9ca3af]" />
                      {company.phone}
                    </div>
                  )}
                  {company.website && (
                    <div className="flex items-center gap-2 text-sm text-[#374151]">
                      <Globe className="h-4 w-4 text-[#9ca3af]" />
                      <a href={company.website} target="_blank" rel="noreferrer" className="text-[#5e2b9d] hover:underline">
                        {company.website}
                      </a>
                    </div>
                  )}
                  {company.address && (
                    <div className="flex items-start gap-2 text-sm text-[#374151]">
                      <MapPin className="h-4 w-4 text-[#9ca3af] mt-0.5" />
                      <span>
                        {typeof company.address === 'object' && company.address !== null
                          ? Object.values(company.address as Record<string, string>).filter(Boolean).join(', ')
                          : String(company.address)
                        }
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div>
            <Card>
              <CardHeader><CardTitle>Quick Overview</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { label: 'Status', value: company.status, badge: true },
                    { label: 'Created', value: new Date(company.created_at).toLocaleDateString('en-IN') },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-[#f1f3f5] last:border-0">
                      <p className="text-xs text-[#6b7280]">{item.label}</p>
                      <p className="text-xs font-medium text-[#111827]">{item.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-16">
            <Building2 className="h-10 w-10 text-[#d1d5db] mx-auto mb-3" />
            <p className="text-sm font-medium text-[#374151] mb-1">Company not set up yet</p>
            <p className="text-xs text-[#9ca3af] mb-4">Set up your company profile to get started</p>
            <Button size="sm" asChild>
              <Link href="/organization/company/edit">Set Up Company</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

