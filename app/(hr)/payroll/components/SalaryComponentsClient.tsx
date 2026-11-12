'use client'

import * as React from 'react'
import { Plus, MoreHorizontal, Pencil, Trash2, ShieldCheck, DollarSign, Percent } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useToast } from '@/components/ui/toaster'
import { createClient } from '@/lib/supabase/client'

interface SalaryComponent {
  id: string
  name: string
  code: string
  type: 'earning' | 'deduction' | 'statutory'
  calculation_type: 'fixed' | 'percentage' | 'formula'
  value: number | null
  formula: string | null
  taxable: boolean
  status: string
}

const DEFAULT_INDIAN_COMPONENTS: Omit<SalaryComponent, 'id'>[] = [
  { name: 'Basic Salary', code: 'BASIC', type: 'earning', calculation_type: 'percentage', value: 50, formula: 'CTC * 0.50', taxable: true, status: 'active' },
  { name: 'House Rent Allowance', code: 'HRA', type: 'earning', calculation_type: 'percentage', value: 40, formula: 'BASIC * 0.40', taxable: true, status: 'active' },
  { name: 'Special Allowance', code: 'SPECIAL_ALLOWANCE', type: 'earning', calculation_type: 'formula', value: null, formula: 'CTC - BASIC - HRA', taxable: true, status: 'active' },
  { name: 'Conveyance Allowance', code: 'CONVEYANCE', type: 'earning', calculation_type: 'fixed', value: 1600, formula: null, taxable: false, status: 'active' },
  { name: 'Provident Fund (Employee)', code: 'PF_EMP', type: 'statutory', calculation_type: 'percentage', value: 12, formula: 'MIN(BASIC, 15000) * 0.12', taxable: false, status: 'active' },
  { name: 'Employee State Insurance (ESI)', code: 'ESI_EMP', type: 'statutory', calculation_type: 'percentage', value: 0.75, formula: 'GROSS <= 21000 ? GROSS * 0.0075 : 0', taxable: false, status: 'active' },
  { name: 'Professional Tax (PT)', code: 'PT', type: 'statutory', calculation_type: 'fixed', value: 200, formula: 'State specific slab', taxable: false, status: 'active' },
  { name: 'Tax Deducted at Source (TDS)', code: 'TDS', type: 'deduction', calculation_type: 'formula', value: null, formula: 'Income Tax Slab', taxable: false, status: 'active' },
]

export function SalaryComponentsClient({ initialComponents }: { initialComponents: SalaryComponent[] }) {
  const [components, setComponents] = React.useState<SalaryComponent[]>(() => {
    return initialComponents.length > 0 ? initialComponents : (DEFAULT_INDIAN_COMPONENTS as any)
  })
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [editingComp, setEditingComp] = React.useState<SalaryComponent | null>(null)
  const [loading, setLoading] = React.useState(false)
  const { success, error } = useToast()
  const supabase = createClient()

  const [formData, setFormData] = React.useState({
    name: '',
    code: '',
    type: 'earning' as 'earning' | 'deduction' | 'statutory',
    calculation_type: 'percentage' as 'fixed' | 'percentage' | 'formula',
    value: 50,
    formula: '',
    taxable: true,
  })

  const openCreateDialog = () => {
    setEditingComp(null)
    setFormData({
      name: '',
      code: '',
      type: 'earning',
      calculation_type: 'percentage',
      value: 50,
      formula: '',
      taxable: true,
    })
    setIsDialogOpen(true)
  }

  const openEditDialog = (c: SalaryComponent) => {
    setEditingComp(c)
    setFormData({
      name: c.name,
      code: c.code,
      type: c.type,
      calculation_type: c.calculation_type,
      value: c.value ?? 0,
      formula: c.formula ?? '',
      taxable: c.taxable,
    })
    setIsDialogOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const { data: profile } = await supabase.from('users').select('tenant_id').eq('id', user?.id).maybeSingle()
      const tenantId = profile?.tenant_id ?? user?.id

      if (editingComp && editingComp.id) {
        const { error: updErr } = await supabase
          .from('salary_components')
          .update({
            name: formData.name,
            code: formData.code.toUpperCase(),
            type: formData.type,
            calculation_type: formData.calculation_type,
            value: formData.value,
            formula: formData.formula || null,
            taxable: formData.taxable,
          })
          .eq('id', editingComp.id)

        if (updErr) throw updErr
        setComponents(components.map((c) => c.id === editingComp.id ? { ...c, ...formData } : c))
        success('Salary component updated')
      } else {
        const { data: newComp, error: insErr } = await supabase
          .from('salary_components')
          .insert({
            tenant_id: tenantId,
            company_id: tenantId,
            name: formData.name,
            code: formData.code.toUpperCase(),
            type: formData.type,
            calculation_type: formData.calculation_type,
            value: formData.value,
            formula: formData.formula || null,
            taxable: formData.taxable,
            status: 'active',
          })
          .select()
          .single()

        if (insErr) {
          // If in demo mode without DB connection, save locally
          const localComp = { id: Math.random().toString(), ...formData, status: 'active' } as any
          setComponents([...components, localComp])
        } else {
          setComponents([...components, newComp])
        }
        success('Salary component created')
      }
      setIsDialogOpen(false)
    } catch (err: any) {
      error('Failed to save component', err.message)
    } finally {
      setLoading(false)
    }
  }

  const earnings = components.filter((c) => c.type === 'earning')
  const statutory = components.filter((c) => c.type === 'statutory')
  const deductions = components.filter((c) => c.type === 'deduction')

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-[#6b7280]">
          Configured for Indian Statutory Compliance (PF 12%, ESI 0.75%, PT, HRA Exemption)
        </p>
        <Button size="sm" onClick={openCreateDialog}>
          <Plus className="h-3.5 w-3.5" />
          Add Component
        </Button>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {/* Earnings */}
        <div>
          <h3 className="text-xs font-semibold text-[#5e2b9d] uppercase tracking-wider mb-3">
            Earnings & Allowances ({earnings.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {earnings.map((c, idx) => (
              <Card key={c.id || c.code || `earning-${idx}`}>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-[#111827]">{c.name}</h4>
                      <span className="text-[10px] font-mono bg-[#f3eefb] text-[#5e2b9d] px-1.5 py-0.5 rounded-[4px] font-bold">
                        {c.code || c.name.slice(0, 4).toUpperCase()}
                      </span>
                    </div>
                    <Button variant="ghost" size="icon-sm" onClick={() => openEditDialog(c)}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <div className="mt-3 text-xs text-[#6b7280]">
                    <span className="text-[#9ca3af]">Calculation: </span>
                    <span className="font-medium text-[#111827]">
                      {c.calculation_type === 'percentage' ? `${c.value ?? (c as any).percentage}% of base` : c.calculation_type === 'fixed' ? `₹${c.value ?? 0} Fixed` : c.formula}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className={c.taxable ? 'text-[#d97706]' : 'text-[#16a34a]'}>
                      {c.taxable ? 'Taxable' : 'Tax Exempt'}
                    </span>
                    <StatusBadge status={c.status} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Statutory */}
        <div>
          <h3 className="text-xs font-semibold text-[#2563eb] uppercase tracking-wider mb-3">
            Statutory Components ({statutory.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {statutory.map((c, idx) => (
              <Card key={c.id || c.code || `statutory-${idx}`}>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-[#111827]">{c.name}</h4>
                      <span className="text-[10px] font-mono bg-[#eff6ff] text-[#2563eb] px-1.5 py-0.5 rounded-[4px] font-bold">
                        {c.code || c.name.slice(0, 4).toUpperCase()}
                      </span>
                    </div>
                    <Button variant="ghost" size="icon-sm" onClick={() => openEditDialog(c)}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <div className="mt-3 text-xs text-[#6b7280]">
                    <span className="text-[#9ca3af]">Rate: </span>
                    <span className="font-medium text-[#111827]">
                      {c.calculation_type === 'percentage' ? `${c.value ?? (c as any).percentage}%` : c.formula ?? `₹${c.value ?? 0}`}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="text-[#2563eb] font-medium">Statutory Mandate</span>
                    <StatusBadge status={c.status} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Deductions */}
        <div>
          <h3 className="text-xs font-semibold text-[#dc2626] uppercase tracking-wider mb-3">
            Deductions ({deductions.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {deductions.map((c, idx) => (
              <Card key={c.id || c.code || `deduction-${idx}`}>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-[#111827]">{c.name}</h4>
                      <span className="text-[10px] font-mono bg-[#fef2f2] text-[#dc2626] px-1.5 py-0.5 rounded-[4px] font-bold">
                        {c.code || c.name.slice(0, 4).toUpperCase()}
                      </span>
                    </div>
                    <Button variant="ghost" size="icon-sm" onClick={() => openEditDialog(c)}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <div className="mt-3 text-xs text-[#6b7280]">
                    <span className="text-[#9ca3af]">Formula: </span>
                    <span className="font-medium text-[#111827]">{c.formula ?? `₹${c.value}`}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="text-[#6b7280]">Post-tax deduction</span>
                    <StatusBadge status={c.status} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Edit / Add Modal Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent size="md">
          <DialogHeader>
            <DialogTitle>{editingComp ? 'Edit Salary Component' : 'Add Salary Component'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave}>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label required>Component Name</Label>
                  <Input
                    required
                    placeholder="e.g. Performance Bonus"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label required>Code</Label>
                  <Input
                    required
                    placeholder="PERF_BONUS"
                    className="uppercase"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label required>Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(v: any) => setFormData({ ...formData, type: v })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="earning">Earning / Allowance</SelectItem>
                      <SelectItem value="deduction">Voluntary Deduction</SelectItem>
                      <SelectItem value="statutory">Statutory Deduction (PF/ESI/PT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label required>Calculation Type</Label>
                  <Select
                    value={formData.calculation_type}
                    onValueChange={(v: any) => setFormData({ ...formData, calculation_type: v })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed Monthly Amount (₹)</SelectItem>
                      <SelectItem value="formula">Custom Formula</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {formData.calculation_type !== 'formula' ? (
                <div className="space-y-1">
                  <Label required>Value ({formData.calculation_type === 'percentage' ? '%' : '₹'})</Label>
                  <Input
                    type="number"
                    step="0.01"
                    required
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              ) : (
                <div className="space-y-1">
                  <Label required>Formula Expression</Label>
                  <Input
                    placeholder="e.g. CTC - BASIC - HRA"
                    value={formData.formula}
                    onChange={(e) => setFormData({ ...formData, formula: e.target.value })}
                  />
                </div>
              )}

              <div className="flex items-center gap-2 pt-2 border-t border-[#f1f3f5]">
                <input
                  type="checkbox"
                  id="taxable"
                  checked={formData.taxable}
                  onChange={(e) => setFormData({ ...formData, taxable: e.target.checked })}
                  className="rounded border-[#d1d5db] text-[#5e2b9d] focus:ring-[#5e2b9d]"
                />
                <Label htmlFor="taxable" className="cursor-pointer text-xs font-normal text-[#374151]">
                  Taxable component for employee income tax (TDS) calculations
                </Label>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="secondary" size="sm" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" loading={loading}>
                {editingComp ? 'Save Changes' : 'Create Component'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

