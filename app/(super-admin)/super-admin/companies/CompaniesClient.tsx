'use client'

import * as React from 'react'
import { Plus, MoreHorizontal, CheckCircle, Ban, Search, Shield, Calendar, Phone, MapPin, Loader2 } from 'lucide-react'
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

interface Tenant {
  id: string
  name: string
  slug: string
  plan: 'trial' | 'starter' | 'professional' | 'enterprise'
  status: 'active' | 'inactive' | 'suspended'
  subscription_expiry_date?: string | null
  mobile_number?: string | null
  city?: string | null
  address?: string | null
  max_employees: number
  created_at: string
}

export function CompaniesClient({ initialTenants }: { initialTenants: Tenant[] }) {
  const [tenants, setTenants] = React.useState<Tenant[]>(initialTenants)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [activatingId, setActivatingId] = React.useState<string | null>(null)
  const { success, error } = useToast()

  const [formData, setFormData] = React.useState({
    name: '',
    slug: '',
    plan: 'professional' as 'trial' | 'starter' | 'professional' | 'enterprise',
    max_employees: 100,
    admin_email: '',
  })

  const filtered = tenants.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.city && t.city.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleNameChange = (name: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
    setFormData({ ...formData, name, slug })
  }

  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organization_name: formData.name,
          admin_name: 'Administrator',
          email: formData.admin_email,
          password: 'password123',
          mobile_number: '9876543210',
          city: 'Hyderabad',
          address: 'Corporate Park',
        }),
      })

      const data = await res.json()
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to provision company')
      }

      setTenants([data.tenant, ...tenants])
      success('Company Provisioned', `${formData.name} was registered on Neon DB (Default: Inactive).`)
      setIsDialogOpen(false)
    } catch (err: any) {
      error('Provisioning Failed', err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleActivateTenant = async (tenantId: string) => {
    setActivatingId(tenantId)
    try {
      const res = await fetch('/api/super-admin/activate-tenant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenant_id: tenantId,
          plan: 'professional',
          validity_days: 365,
        }),
      })

      const data = await res.json()
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to activate tenant')
      }

      setTenants(
        tenants.map((t) =>
          t.id === tenantId
            ? {
                ...t,
                status: 'active',
                subscription_expiry_date: data.tenant.subscription_expiry_date,
              }
            : t
        )
      )

      success('Tenant Activated!', data.message || 'Tenant subscription has been activated for 365 days.')
    } catch (err: any) {
      error('Activation Failed', err.message)
    } finally {
      setActivatingId(null)
    }
  }

  return (
    <div>
      {/* Search and Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9ca3af]" />
          <Input
            placeholder="Search company, slug, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>
        <Button size="sm" onClick={() => setIsDialogOpen(true)} className="w-full sm:w-auto bg-[#5e2b9d] hover:bg-[#4c2380] text-white">
          <Plus className="h-3.5 w-3.5 mr-1" />
          Onboard New Client Company
        </Button>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((tenant) => {
          const isInactive = tenant.status === 'inactive'
          const todayStr = new Date().toISOString().split('T')[0]
          const isExpired = tenant.subscription_expiry_date ? tenant.subscription_expiry_date < todayStr : false
          const isActivating = activatingId === tenant.id

          return (
            <Card key={tenant.id} className="relative overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
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
                      <DropdownMenuItem onClick={() => handleActivateTenant(tenant.id)}>
                        <CheckCircle className="h-3.5 w-3.5 text-[#16a34a] mr-1.5" />
                        <span className="text-[#16a34a]">Activate / Extend (1 Year)</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* City & Phone if available */}
                {(tenant.city || tenant.mobile_number) && (
                  <div className="mt-3 flex items-center gap-4 text-[11px] text-gray-500">
                    {tenant.city && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        {tenant.city}
                      </span>
                    )}
                    {tenant.mobile_number && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-gray-400" />
                        {tenant.mobile_number}
                      </span>
                    )}
                  </div>
                )}

                <div className="mt-4 pt-3 border-t border-[#f1f3f5] grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[#9ca3af] block">Subscription Tier</span>
                    <span className="font-bold text-xs uppercase text-[#5e2b9d]">{tenant.plan}</span>
                  </div>
                  <div>
                    <span className="text-[#9ca3af] block">Expiry Date</span>
                    <span className={`font-semibold text-xs ${isExpired ? 'text-rose-600 font-bold' : 'text-gray-900'}`}>
                      {tenant.subscription_expiry_date || 'Expired (Default)'}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-[#9ca3af]">
                  <span>Enrolled {formatDate(tenant.created_at)}</span>
                  <StatusBadge status={tenant.status} />
                </div>

                {/* One-Click Super Admin Gatekeeper Activation Action */}
                {(isInactive || isExpired) && (
                  <div className="mt-3 pt-3 border-t border-dashed border-gray-200">
                    <Button
                      onClick={() => handleActivateTenant(tenant.id)}
                      disabled={isActivating}
                      size="sm"
                      className="w-full h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-medium flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      {isActivating ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Activating on Neon DB...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Activate Tenant (Unlock Access)</span>
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
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
                      <SelectItem value="trial">Trial (14 Days)</SelectItem>
                      <SelectItem value="starter">Starter (50 seats)</SelectItem>
                      <SelectItem value="professional">Professional (250 seats)</SelectItem>
                      <SelectItem value="enterprise">Enterprise (Unlimited)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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

              <div className="p-3 bg-[#f3eefb] rounded-lg border border-[#cbb4ec] text-xs text-[#5e2b9d]">
                <strong>Multi-Tenant Isolation Notice:</strong> A dedicated <code>tenant_id</code> is provisioned on Neon PostgreSQL. By default, newly registered tenants start as <code>inactive</code> with an expired subscription date until activated.
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="secondary" size="sm" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" loading={loading} className="bg-[#5e2b9d] text-white hover:bg-[#4c2380]">
                Provision Company
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
