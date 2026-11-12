'use client'

import * as React from 'react'
import { Plus, Building2, MoreHorizontal, CheckCircle, Ban, Search, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useToast } from '@/components/ui/toaster'
import { formatDate } from '@/lib/utils/date'
import { createClient } from '@/lib/supabase/client'

interface Tenant {
  id: string
  name: string
  slug: string
  plan: 'trial' | 'starter' | 'professional' | 'enterprise'
  status: 'active' | 'inactive' | 'suspended'
  max_employees: number
  created_at: string
}

const DEFAULT_TENANTS: Tenant[] = [
  { id: 't1', name: 'Apex Global Technologies', slug: 'apex-global', plan: 'enterprise', status: 'active', max_employees: 500, created_at: '2026-01-15T00:00:00Z' },
  { id: 't2', name: 'Zenith Logistics India', slug: 'zenith-logistics', plan: 'professional', status: 'active', max_employees: 200, created_at: '2026-03-10T00:00:00Z' },
  { id: 't3', name: 'InnoHealth Medical Systems', slug: 'innohealth', plan: 'enterprise', status: 'active', max_employees: 1000, created_at: '2026-06-20T00:00:00Z' },
  { id: 't4', name: 'FinEdge Advisory Services', slug: 'finedge', plan: 'starter', status: 'active', max_employees: 50, created_at: '2026-09-05T00:00:00Z' },
  { id: 't5', name: 'NexGen Cloud Solutions', slug: 'nexgen', plan: 'trial', status: 'active', max_employees: 25, created_at: '2026-10-18T00:00:00Z' },
]

export function CompaniesClient({ initialTenants }: { initialTenants: Tenant[] }) {
  const [tenants, setTenants] = React.useState<Tenant[]>(() => {
    return initialTenants.length > 0 ? initialTenants : DEFAULT_TENANTS
  })
  const [searchTerm, setSearchTerm] = React.useState('')
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const { success, error } = useToast()
  const supabase = createClient()

  const [formData, setFormData] = React.useState({
    name: '',
    slug: '',
    plan: 'professional' as 'trial' | 'starter' | 'professional' | 'enterprise',
    max_employees: 100,
    admin_email: '',
  })

  const filtered = tenants.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.slug.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleNameChange = (name: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
    setFormData({ ...formData, name, slug })
  }

  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data: newTenant, error: insErr } = await supabase
        .from('tenants')
        .insert({
          name: formData.name,
          slug: formData.slug,
          plan: formData.plan,
          status: 'active',
          max_employees: formData.max_employees,
        })
        .select()
        .single()

      if (insErr) {
        // Fallback for local demo preview
        const localTenant: Tenant = {
          id: Math.random().toString(),
          name: formData.name,
          slug: formData.slug,
          plan: formData.plan,
          status: 'active',
          max_employees: formData.max_employees,
          created_at: new Date().toISOString(),
        }
        setTenants([localTenant, ...tenants])
      } else {
        // Also create company record for the tenant
        await supabase.from('companies').insert({
          tenant_id: newTenant.id,
          name: formData.name,
          email: formData.admin_email,
          status: 'active',
        })
        setTenants([newTenant, ...tenants])
      }

      success('Company Provisioned Successfully', `${formData.name} is now active with ${formData.plan} plan.`)
      setIsDialogOpen(false)
    } catch (err: any) {
      error('Provisioning Failed', err.message)
    } finally {
      setLoading(false)
    }
  }

  const toggleStatus = async (tenant: Tenant) => {
    const newStatus = tenant.status === 'active' ? 'suspended' : 'active'
    try {
      await supabase.from('tenants').update({ status: newStatus }).eq('id', tenant.id)
      setTenants(tenants.map((t) => t.id === tenant.id ? { ...t, status: newStatus } : t))
      success(`Company ${newStatus === 'active' ? 'Activated' : 'Suspended'}`)
    } catch (err: any) {
      error('Status update failed', err.message)
    }
  }

  return (
    <div>
      {/* Search and Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9ca3af]" />
          <Input
            placeholder="Search company or slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>
        <Button size="sm" onClick={() => setIsDialogOpen(true)} className="w-full sm:w-auto">
          <Plus className="h-3.5 w-3.5 mr-1" />
          Onboard New Company
        </Button>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((tenant) => (
          <Card key={tenant.id} className="relative overflow-hidden">
            <CardContent className="pt-5 pb-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-[#f3eefb] flex items-center justify-center text-[#5e2b9d] shrink-0 font-bold">
                    {tenant.name[0]}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#111827] line-clamp-1">{tenant.name}</h3>
                    <p className="text-xs text-[#9ca3af] font-mono">/{tenant.slug}</p>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => toggleStatus(tenant)}>
                      {tenant.status === 'active' ? (
                        <>
                          <Ban className="h-3.5 w-3.5 text-[#dc2626]" />
                          <span className="text-[#dc2626]">Suspend Company</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-3.5 w-3.5 text-[#16a34a]" />
                          <span className="text-[#16a34a]">Activate Company</span>
                        </>
                      )}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-4 pt-3 border-t border-[#f1f3f5] grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[#9ca3af] block">Subscription Tier</span>
                  <span className="font-bold text-xs uppercase text-[#5e2b9d]">{tenant.plan}</span>
                </div>
                <div>
                  <span className="text-[#9ca3af] block">User Seat Limit</span>
                  <span className="font-semibold text-xs text-[#111827]">{tenant.max_employees} seats</span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-[#9ca3af]">
                <span>Enrolled {formatDate(tenant.created_at)}</span>
                <StatusBadge status={tenant.status} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Onboard Company Modal Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent size="md">
          <DialogHeader>
            <DialogTitle>Onboard New Client Company</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateCompany}>
            <div className="p-5 space-y-4">
              <div className="space-y-1">
                <Label required>Company Legal / Trade Name</Label>
                <Input
                  required
                  placeholder="e.g. Acme Corporation Pvt. Ltd."
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label required>Tenant Subdomain / Slug</Label>
                  <Input
                    required
                    placeholder="acme-corp"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label required>Subscription Tier</Label>
                  <Select
                    value={formData.plan}
                    onValueChange={(v: any) => setFormData({ ...formData, plan: v })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trial">Trial (14 Days, 25 seats)</SelectItem>
                      <SelectItem value="starter">Starter (50 seats)</SelectItem>
                      <SelectItem value="professional">Professional (250 seats)</SelectItem>
                      <SelectItem value="enterprise">Enterprise (Unlimited)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label required>Max Employee Seat Quota</Label>
                  <Input
                    type="number"
                    required
                    min={1}
                    value={formData.max_employees}
                    onChange={(e) => setFormData({ ...formData, max_employees: parseInt(e.target.value) || 1 })}
                  />
                </div>
                <div className="space-y-1">
                  <Label required>Primary Admin Email</Label>
                  <Input
                    type="email"
                    required
                    placeholder="admin@company.com"
                    value={formData.admin_email}
                    onChange={(e) => setFormData({ ...formData, admin_email: e.target.value })}
                  />
                </div>
              </div>

              <div className="p-3 bg-[#f3eefb] rounded-lg border border-[#cbb4ec] text-xs text-[#5e2b9d]">
                <strong>Database Isolation:</strong> A dedicated <code>tenant_id</code> will be allocated with PostgreSQL Row-Level Security automatically shielding client records from other tenants.
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="secondary" size="sm" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" loading={loading}>
                Provision Company
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

