'use client'

import * as React from 'react'
import { Laptop, Monitor, Smartphone, Package, Plus, UserCheck, ArrowRight, ShieldCheck, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar } from '@/components/common/Avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useToast } from '@/components/ui/toaster'
import { formatCurrency } from '@/lib/utils/currency'
import { formatDate } from '@/lib/utils/date'
import { createClient } from '@/lib/supabase/client'

interface Asset {
  id: string
  name: string
  category: string
  serial_number: string | null
  brand: string | null
  model: string | null
  cost: number | null
  status: 'available' | 'assigned' | 'under_maintenance' | 'retired' | 'lost'
  created_at: string
  asset_assignments?: {
    id: string
    assigned_date: string
    returned_date: string | null
    employees: {
      id: string
      employee_id: string
      first_name: string
      last_name: string
      photo_url: string | null
    } | null
  }[]
}

const DEFAULT_ASSETS: Asset[] = [
  { id: 'a1', name: 'MacBook Pro 16" M3 Pro', category: 'laptop', serial_number: 'C02G1234MD6R', brand: 'Apple', model: 'A2991', cost: 249000, status: 'assigned', created_at: '2026-02-10T00:00:00Z', asset_assignments: [{ id: 'as1', assigned_date: '2026-02-15', returned_date: null, employees: { id: 'e1', employee_id: 'EMP0001', first_name: 'John', last_name: 'Doe', photo_url: null } }] },
  { id: 'a2', name: 'Dell UltraSharp 27" 4K Monitor', category: 'monitor', serial_number: 'CN-0ABC12-74261', brand: 'Dell', model: 'U2723QE', cost: 54000, status: 'assigned', created_at: '2026-02-10T00:00:00Z', asset_assignments: [{ id: 'as2', assigned_date: '2026-02-15', returned_date: null, employees: { id: 'e1', employee_id: 'EMP0001', first_name: 'John', last_name: 'Doe', photo_url: null } }] },
  { id: 'a3', name: 'MacBook Air 15" M2', category: 'laptop', serial_number: 'C02F9876MD2Q', brand: 'Apple', model: 'A2941', cost: 134000, status: 'available', created_at: '2026-04-12T00:00:00Z' },
  { id: 'a4', name: 'ThinkPad T14s Gen 4', category: 'laptop', serial_number: 'PF-3A9B8C', brand: 'Lenovo', model: '21F8004RIG', cost: 112000, status: 'available', created_at: '2026-05-18T00:00:00Z' },
  { id: 'a5', name: 'iPhone 15 Pro Test Device', category: 'mobile', serial_number: 'DX3F9A1B2C3D', brand: 'Apple', model: 'A3102', cost: 129000, status: 'assigned', created_at: '2026-07-01T00:00:00Z', asset_assignments: [{ id: 'as3', assigned_date: '2026-07-05', returned_date: null, employees: { id: 'e2', employee_id: 'EMP0002', first_name: 'Rahul', last_name: 'Sharma', photo_url: null } }] },
]

export function AssetsClient({
  initialAssets,
  employees,
}: {
  initialAssets: Asset[]
  employees: any[]
}) {
  const [assets, setAssets] = React.useState<Asset[]>(() => {
    return initialAssets.length > 0 ? initialAssets : DEFAULT_ASSETS
  })
  const [categoryFilter, setCategoryFilter] = React.useState<string>('all')
  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [isAssignOpen, setIsAssignOpen] = React.useState(false)
  const [selectedAsset, setSelectedAsset] = React.useState<Asset | null>(null)
  const [selectedEmployeeId, setSelectedEmployeeId] = React.useState<string>('')
  const [loading, setLoading] = React.useState(false)
  const { success, error } = useToast()
  const supabase = createClient()

  // New Asset Form
  const [newAsset, setNewAsset] = React.useState({
    name: '',
    category: 'laptop',
    brand: '',
    model: '',
    serial_number: '',
    cost: 85000,
  })

  const filtered = assets.filter((a) => {
    if (categoryFilter === 'all') return true
    return a.category === categoryFilter
  })

  const totalValue = assets.reduce((acc, a) => acc + (a.cost ?? 0), 0)
  const assignedCount = assets.filter((a) => a.status === 'assigned').length
  const availableCount = assets.filter((a) => a.status === 'available').length

  const handleCreateAsset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const { data: profile } = await supabase.from('users').select('tenant_id').eq('id', user?.id).maybeSingle()
      const tenantId = profile?.tenant_id ?? user?.id

      const { data: created, error: insErr } = await supabase
        .from('assets')
        .insert({
          tenant_id: tenantId,
          name: newAsset.name,
          category: newAsset.category,
          brand: newAsset.brand || null,
          model: newAsset.model || null,
          serial_number: newAsset.serial_number || null,
          cost: newAsset.cost,
          status: 'available',
        })
        .select()
        .single()

      if (insErr) {
        const local = { id: Math.random().toString(), ...newAsset, status: 'available', created_at: new Date().toISOString() } as any
        setAssets([local, ...assets])
      } else {
        setAssets([created, ...assets])
      }

      success('Asset Registered', `${newAsset.name} added to inventory.`)
      setIsAddOpen(false)
    } catch (err: any) {
      error('Failed to register asset', err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAssign = async () => {
    if (!selectedAsset || !selectedEmployeeId) return
    setLoading(true)
    try {
      const emp = employees.find((e) => e.id === selectedEmployeeId)

      await supabase.from('assets').update({ status: 'assigned' }).eq('id', selectedAsset.id)
      await supabase.from('asset_assignments').insert({
        asset_id: selectedAsset.id,
        employee_id: selectedEmployeeId,
        assigned_date: new Date().toISOString().split('T')[0],
      })

      setAssets(assets.map((a) => {
        if (a.id === selectedAsset.id) {
          return {
            ...a,
            status: 'assigned',
            asset_assignments: [{
              id: Math.random().toString(),
              assigned_date: new Date().toISOString().split('T')[0],
              returned_date: null,
              employees: emp ? { ...emp, photo_url: null } : null,
            }],
          }
        }
        return a
      }))

      success('Asset Assigned', `${selectedAsset.name} assigned to ${emp?.first_name} ${emp?.last_name}.`)
      setIsAssignOpen(false)
    } catch (err: any) {
      error('Assignment failed', err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleReturn = async (asset: Asset) => {
    if (!confirm(`Confirm return of ${asset.name} back to available inventory?`)) return
    try {
      await supabase.from('assets').update({ status: 'available' }).eq('id', asset.id)
      setAssets(assets.map((a) => a.id === asset.id ? { ...a, status: 'available', asset_assignments: [] } : a))
      success('Asset Returned', `${asset.name} is now available in inventory.`)
    } catch (err: any) {
      error('Return failed', err.message)
    }
  }

  return (
    <div>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-5 pb-5">
            <span className="text-xs text-[#6b7280]">Total Inventory Items</span>
            <span className="text-2xl font-bold text-[#111827] mt-1 block">{assets.length}</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-5">
            <span className="text-xs text-[#6b7280]">Assigned to Employees</span>
            <span className="text-2xl font-bold text-[#5e2b9d] mt-1 block">{assignedCount}</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-5">
            <span className="text-xs text-[#6b7280]">Available in Stock</span>
            <span className="text-2xl font-bold text-[#16a34a] mt-1 block">{availableCount}</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-5">
            <span className="text-xs text-[#6b7280]">Total Asset Capital Value</span>
            <span className="text-2xl font-bold text-[#111827] mt-1 block">{formatCurrency(totalValue)}</span>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-5">
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1">
          {['all', 'laptop', 'monitor', 'mobile', 'accessories'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-[6px] text-xs font-medium capitalize transition-colors ${
                categoryFilter === cat
                  ? 'bg-[#5e2b9d] text-white'
                  : 'bg-white border border-[#e5e7eb] text-[#374151] hover:bg-[#f8f9fa]'
              }`}
            >
              {cat === 'all' ? 'All Assets' : cat}
            </button>
          ))}
        </div>

        <Button size="sm" onClick={() => setIsAddOpen(true)}>
          <Plus className="h-3.5 w-3.5 mr-1" />
          Register New Asset
        </Button>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((asset) => {
          const currentAssignment = asset.asset_assignments?.[0]
          const assignedEmp = currentAssignment?.employees

          return (
            <Card key={asset.id} className="relative overflow-hidden">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-lg bg-[#f3eefb] flex items-center justify-center text-[#5e2b9d] shrink-0">
                      {asset.category === 'laptop' ? <Laptop className="h-4 w-4" /> :
                       asset.category === 'monitor' ? <Monitor className="h-4 w-4" /> :
                       asset.category === 'mobile' ? <Smartphone className="h-4 w-4" /> :
                       <Package className="h-4 w-4" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#111827] line-clamp-1">{asset.name}</h4>
                      <p className="text-xs text-[#9ca3af] font-mono">{asset.serial_number ?? 'No S/N'}</p>
                    </div>
                  </div>
                  <StatusBadge status={asset.status} />
                </div>

                <div className="mt-4 pt-3 border-t border-[#f1f3f5] grid grid-cols-2 gap-2 text-xs text-[#6b7280]">
                  <div>
                    <span className="text-[#9ca3af]">Make & Model:</span>
                    <p className="font-medium text-[#111827] truncate">{asset.brand} {asset.model}</p>
                  </div>
                  <div>
                    <span className="text-[#9ca3af]">Asset Value:</span>
                    <p className="font-medium text-[#111827]">{formatCurrency(asset.cost)}</p>
                  </div>
                </div>

                {/* Assigned User Box */}
                <div className="mt-3 pt-3 border-t border-[#f1f3f5]">
                  {assignedEmp ? (
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Avatar name={`${assignedEmp.first_name} ${assignedEmp.last_name}`} size="xs" />
                        <div>
                          <p className="font-medium text-[#111827]">{assignedEmp.first_name} {assignedEmp.last_name}</p>
                          <span className="text-[10px] text-[#9ca3af] font-mono">{assignedEmp.employee_id}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs text-[#dc2626]" onClick={() => handleReturn(asset)}>
                        Return
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#16a34a] font-medium">In IT Storage</span>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="text-xs text-[#5e2b9d]"
                        onClick={() => {
                          setSelectedAsset(asset)
                          setIsAssignOpen(true)
                        }}
                      >
                        <UserCheck className="h-3 w-3 mr-1" /> Assign
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Register Asset Modal Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent size="md">
          <DialogHeader>
            <DialogTitle>Register New Company Asset</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateAsset}>
            <div className="p-5 space-y-4">
              <div className="space-y-1">
                <Label required>Asset Name / Title</Label>
                <Input
                  required
                  placeholder="e.g. MacBook Pro 14 M3 Max"
                  value={newAsset.name}
                  onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label required>Category</Label>
                  <Select
                    value={newAsset.category}
                    onValueChange={(v) => setNewAsset({ ...newAsset, category: v })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="laptop">Laptop / Workstation</SelectItem>
                      <SelectItem value="monitor">External Monitor</SelectItem>
                      <SelectItem value="mobile">Mobile / Tablet</SelectItem>
                      <SelectItem value="accessories">Keyboards / Accessories</SelectItem>
                      <SelectItem value="license">Software License</SelectItem>
                      <SelectItem value="furniture">Ergonomic Furniture</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label required>Serial Number / Service Tag</Label>
                  <Input
                    required
                    placeholder="C02G1234MD6R"
                    value={newAsset.serial_number}
                    onChange={(e) => setNewAsset({ ...newAsset, serial_number: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label>Manufacturer / Brand</Label>
                  <Input
                    placeholder="Apple / Dell"
                    value={newAsset.brand}
                    onChange={(e) => setNewAsset({ ...newAsset, brand: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label>Model Number</Label>
                  <Input
                    placeholder="A2992"
                    value={newAsset.model}
                    onChange={(e) => setNewAsset({ ...newAsset, model: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label>Cost Value (₹)</Label>
                  <Input
                    type="number"
                    value={newAsset.cost}
                    onChange={(e) => setNewAsset({ ...newAsset, cost: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="secondary" size="sm" onClick={() => setIsAddOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" loading={loading}>
                Register Asset
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Assign Modal Dialog */}
      <Dialog open={isAssignOpen} onOpenChange={setIsAssignOpen}>
        <DialogContent size="sm">
          <DialogHeader>
            <DialogTitle>Assign Asset to Employee</DialogTitle>
          </DialogHeader>
          <div className="p-5 space-y-4 text-xs">
            <p className="text-[#6b7280]">
              Assigning <strong>{selectedAsset?.name}</strong> (S/N: {selectedAsset?.serial_number})
            </p>
            <div className="space-y-1">
              <Label required>Select Employee</Label>
              <Select value={selectedEmployeeId} onValueChange={setSelectedEmployeeId}>
                <SelectTrigger><SelectValue placeholder="Choose employee..." /></SelectTrigger>
                <SelectContent>
                  {employees.map((e) => (
                    <SelectItem key={e.id} value={e.id}>
                      {e.first_name} {e.last_name} ({e.employee_id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" size="sm" onClick={() => setIsAssignOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" loading={loading} onClick={handleAssign} disabled={!selectedEmployeeId}>
              Confirm Assignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

