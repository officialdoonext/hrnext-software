'use client'

import * as React from 'react'
import { Plus, Clock, Moon, Sun, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useToast } from '@/components/ui/toaster'
import { createClient } from '@/lib/supabase/client'

interface Shift {
  id: string
  name: string
  code: string | null
  start_time: string
  end_time: string
  break_duration: number
  working_hours: number
  is_night_shift: boolean
  status: string
}

export function ShiftsClient({ initialShifts }: { initialShifts: Shift[] }) {
  const [shifts, setShifts] = React.useState<Shift[]>(initialShifts)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [editingShift, setEditingShift] = React.useState<Shift | null>(null)
  const [loading, setLoading] = React.useState(false)
  const { success, error } = useToast()
  const supabase = createClient()

  // Form State
  const [formData, setFormData] = React.useState({
    name: '',
    code: '',
    start_time: '09:00',
    end_time: '18:00',
    break_duration: 60,
    working_hours: 8,
    is_night_shift: false,
  })

  const openCreateDialog = () => {
    setEditingShift(null)
    setFormData({
      name: '',
      code: '',
      start_time: '09:00',
      end_time: '18:00',
      break_duration: 60,
      working_hours: 8,
      is_night_shift: false,
    })
    setIsDialogOpen(true)
  }

  const openEditDialog = (shift: Shift) => {
    setEditingShift(shift)
    setFormData({
      name: shift.name,
      code: shift.code ?? '',
      start_time: shift.start_time.slice(0, 5),
      end_time: shift.end_time.slice(0, 5),
      break_duration: shift.break_duration,
      working_hours: shift.working_hours,
      is_night_shift: shift.is_night_shift,
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

      if (editingShift) {
        const { error: updateErr } = await supabase
          .from('shifts')
          .update({
            name: formData.name,
            code: formData.code || null,
            start_time: formData.start_time,
            end_time: formData.end_time,
            break_duration: formData.break_duration,
            working_hours: formData.working_hours,
            is_night_shift: formData.is_night_shift,
          })
          .eq('id', editingShift.id)

        if (updateErr) throw updateErr
        setShifts(shifts.map((s) => s.id === editingShift.id ? { ...s, ...formData } : s))
        success('Shift updated successfully')
      } else {
        const { data: newShift, error: createErr } = await supabase
          .from('shifts')
          .insert({
            tenant_id: tenantId,
            company_id: tenantId,
            name: formData.name,
            code: formData.code || null,
            start_time: formData.start_time,
            end_time: formData.end_time,
            break_duration: formData.break_duration,
            working_hours: formData.working_hours,
            is_night_shift: formData.is_night_shift,
            status: 'active',
          })
          .select()
          .single()

        if (createErr) throw createErr
        setShifts([...shifts, newShift])
        success('Shift created successfully')
      }
      setIsDialogOpen(false)
    } catch (err: any) {
      error('Failed to save shift', err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this shift?')) return
    try {
      const { error: delErr } = await supabase.from('shifts').delete().eq('id', id)
      if (delErr) throw delErr
      setShifts(shifts.filter((s) => s.id !== id))
      success('Shift deleted')
    } catch (err: any) {
      error('Delete failed', err.message)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-[#6b7280]">
          Total {shifts.length} {shifts.length === 1 ? 'shift' : 'shifts'} configured
        </p>
        <Button size="sm" onClick={openCreateDialog}>
          <Plus className="h-3.5 w-3.5" />
          Add Shift
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shifts.map((shift) => (
          <Card key={shift.id} className="relative overflow-hidden">
            <CardContent className="pt-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-[#111827]">{shift.name}</h3>
                    {shift.code && (
                      <span className="text-[10px] font-mono bg-[#f1f3f5] text-[#6b7280] px-1.5 py-0.5 rounded-[4px]">
                        {shift.code}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-[#5e2b9d] font-medium">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{shift.start_time.slice(0, 5)} – {shift.end_time.slice(0, 5)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {shift.is_night_shift ? (
                    <span title="Night Shift" className="p-1 rounded bg-[#f3eefb] text-[#5e2b9d]">
                      <Moon className="h-3.5 w-3.5" />
                    </span>
                  ) : (
                    <span title="Day Shift" className="p-1 rounded bg-[#fffbeb] text-[#d97706]">
                      <Sun className="h-3.5 w-3.5" />
                    </span>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEditDialog(shift)}>
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem destructive onClick={() => handleDelete(shift.id)}>
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-[#f1f3f5] text-xs">
                <div>
                  <span className="text-[#9ca3af]">Working Hours:</span>
                  <p className="font-medium text-[#111827]">{shift.working_hours ?? 8} hrs</p>
                </div>
                <div>
                  <span className="text-[#9ca3af]">Break Duration:</span>
                  <p className="font-medium text-[#111827]">{shift.break_duration ?? 60} mins</p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <StatusBadge status={shift.status} />
                <span className="text-[11px] text-[#9ca3af]">
                  {shift.is_night_shift ? 'Overnight Shift' : 'Standard Shift'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent size="md">
          <DialogHeader>
            <DialogTitle>{editingShift ? 'Edit Shift' : 'Add New Shift'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave}>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label required>Shift Name</Label>
                  <Input
                    required
                    placeholder="General Shift / Night Shift"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label>Shift Code</Label>
                  <Input
                    placeholder="GEN / S1 / S2"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label required>Start Time</Label>
                  <Input
                    type="time"
                    required
                    value={formData.start_time}
                    onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label required>End Time</Label>
                  <Input
                    type="time"
                    required
                    value={formData.end_time}
                    onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Break Duration (Minutes)</Label>
                  <Input
                    type="number"
                    value={formData.break_duration}
                    onChange={(e) => setFormData({ ...formData, break_duration: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-1">
                  <Label>Net Working Hours</Label>
                  <Input
                    type="number"
                    step="0.5"
                    value={formData.working_hours}
                    onChange={(e) => setFormData({ ...formData, working_hours: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="night_shift"
                  checked={formData.is_night_shift}
                  onChange={(e) => setFormData({ ...formData, is_night_shift: e.target.checked })}
                  className="rounded border-[#d1d5db] text-[#5e2b9d] focus:ring-[#5e2b9d]"
                />
                <Label htmlFor="night_shift" className="cursor-pointer text-xs font-normal text-[#374151]">
                  This is an overnight / night shift (spans across midnight)
                </Label>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="secondary" size="sm" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" loading={loading}>
                {editingShift ? 'Save Changes' : 'Create Shift'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

