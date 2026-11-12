'use client'

import * as React from 'react'
import { Plus, Palmtree, MoreHorizontal, Pencil, Trash2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useToast } from '@/components/ui/toaster'
import { createClient } from '@/lib/supabase/client'

interface LeaveType {
  id: string
  name: string
  code: string
  days_allowed: number
  carry_forward: boolean
  encashable: boolean
  paid: boolean
  requires_approval: boolean
  description: string | null
  status: string
}

export function LeaveTypesClient({ initialLeaveTypes }: { initialLeaveTypes: LeaveType[] }) {
  const [types, setTypes] = React.useState<LeaveType[]>(initialLeaveTypes)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [editingType, setEditingType] = React.useState<LeaveType | null>(null)
  const [loading, setLoading] = React.useState(false)
  const { success, error } = useToast()
  const supabase = createClient()

  const [formData, setFormData] = React.useState({
    name: '',
    code: '',
    days_allowed: 12,
    carry_forward: false,
    encashable: false,
    paid: true,
    requires_approval: true,
    description: '',
  })

  const openCreateDialog = () => {
    setEditingType(null)
    setFormData({
      name: '',
      code: '',
      days_allowed: 12,
      carry_forward: false,
      encashable: false,
      paid: true,
      requires_approval: true,
      description: '',
    })
    setIsDialogOpen(true)
  }

  const openEditDialog = (t: LeaveType) => {
    setEditingType(t)
    setFormData({
      name: t.name,
      code: t.code,
      days_allowed: t.days_allowed,
      carry_forward: t.carry_forward,
      encashable: t.encashable,
      paid: t.paid,
      requires_approval: t.requires_approval,
      description: t.description ?? '',
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

      if (editingType) {
        const { error: updateErr } = await supabase
          .from('leave_types')
          .update({
            name: formData.name,
            code: formData.code.toUpperCase(),
            days_allowed: formData.days_allowed,
            carry_forward: formData.carry_forward,
            encashable: formData.encashable,
            paid: formData.paid,
            requires_approval: formData.requires_approval,
            description: formData.description || null,
          })
          .eq('id', editingType.id)

        if (updateErr) throw updateErr
        setTypes(types.map((t) => t.id === editingType.id ? { ...t, ...formData, code: formData.code.toUpperCase() } : t))
        success('Leave type updated')
      } else {
        const { data: newType, error: createErr } = await supabase
          .from('leave_types')
          .insert({
            tenant_id: tenantId,
            company_id: tenantId,
            name: formData.name,
            code: formData.code.toUpperCase(),
            days_allowed: formData.days_allowed,
            carry_forward: formData.carry_forward,
            encashable: formData.encashable,
            paid: formData.paid,
            requires_approval: formData.requires_approval,
            description: formData.description || null,
            status: 'active',
          })
          .select()
          .single()

        if (createErr) throw createErr
        setTypes([...types, newType])
        success('Leave type created')
      }
      setIsDialogOpen(false)
    } catch (err: any) {
      error('Failed to save leave type', err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this leave type?')) return
    try {
      const { error: delErr } = await supabase.from('leave_types').delete().eq('id', id)
      if (delErr) throw delErr
      setTypes(types.filter((t) => t.id !== id))
      success('Leave type deleted')
    } catch (err: any) {
      error('Delete failed', err.message)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-[#6b7280]">
          Total {types.length} {types.length === 1 ? 'leave category' : 'leave categories'} configured
        </p>
        <Button size="sm" onClick={openCreateDialog}>
          <Plus className="h-3.5 w-3.5" />
          Add Leave Type
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {types.map((t) => (
          <Card key={t.id} className="relative overflow-hidden">
            <CardContent className="pt-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-[#111827]">{t.name}</h3>
                    <span className="text-[10px] font-mono bg-[#f3eefb] text-[#5e2b9d] font-bold px-1.5 py-0.5 rounded-[4px]">
                      {t.code}
                    </span>
                  </div>
                  {t.description && (
                    <p className="text-xs text-[#6b7280] mt-1 line-clamp-2">{t.description}</p>
                  )}
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openEditDialog(t)}>
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem destructive onClick={() => handleDelete(t.id)}>
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-[#f1f3f5] text-xs">
                <div>
                  <span className="text-[#9ca3af]">Days Allowed:</span>
                  <p className="font-semibold text-base text-[#111827]">{t.days_allowed} days/yr</p>
                </div>
                <div>
                  <span className="text-[#9ca3af]">Type:</span>
                  <p className="font-medium text-[#111827]">{t.paid ? 'Paid Leave' : 'Unpaid (LOP)'}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[#f1f3f5]">
                {t.carry_forward && (
                  <span className="text-[10px] bg-[#f0fdf4] text-[#16a34a] px-1.5 py-0.5 rounded-[4px]">
                    Carry Forward
                  </span>
                )}
                {t.encashable && (
                  <span className="text-[10px] bg-[#eff6ff] text-[#2563eb] px-1.5 py-0.5 rounded-[4px]">
                    Encashable
                  </span>
                )}
                {t.requires_approval && (
                  <span className="text-[10px] bg-[#fffbeb] text-[#d97706] px-1.5 py-0.5 rounded-[4px]">
                    Approval Required
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent size="md">
          <DialogHeader>
            <DialogTitle>{editingType ? 'Edit Leave Type' : 'Create Leave Type'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave}>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label required>Leave Name</Label>
                  <Input
                    required
                    placeholder="Casual Leave / Sick Leave"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label required>Leave Code</Label>
                  <Input
                    required
                    placeholder="CL / SL / EL"
                    className="uppercase"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label required>Annual Days Allowed</Label>
                <Input
                  type="number"
                  required
                  min={0}
                  value={formData.days_allowed}
                  onChange={(e) => setFormData({ ...formData, days_allowed: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div className="space-y-1">
                <Label>Description / Policy Details</Label>
                <Textarea
                  placeholder="Explain eligibility, application rules, notice period, etc."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-[#f1f3f5]">
                {[
                  { id: 'paid', label: 'Paid Leave (uncheck for LOP / unpaid leave)', key: 'paid' },
                  { id: 'carry_forward', label: 'Allow Carry Forward to next year', key: 'carry_forward' },
                  { id: 'encashable', label: 'Allow Encashment of balance', key: 'encashable' },
                  { id: 'requires_approval', label: 'Requires Manager / HR Approval', key: 'requires_approval' },
                ].map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={item.id}
                      checked={(formData as any)[item.key]}
                      onChange={(e) => setFormData({ ...formData, [item.key]: e.target.checked })}
                      className="rounded border-[#d1d5db] text-[#5e2b9d] focus:ring-[#5e2b9d]"
                    />
                    <Label htmlFor={item.id} className="cursor-pointer text-xs font-normal text-[#374151]">
                      {item.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="secondary" size="sm" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" loading={loading}>
                {editingType ? 'Save Changes' : 'Create Leave Type'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

