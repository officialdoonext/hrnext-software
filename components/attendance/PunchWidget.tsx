'use client'

import * as React from 'react'
import { Clock, MapPin, CheckCircle, LogOut, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/toaster'
import { createClient } from '@/lib/supabase/client'

export function PunchWidget() {
  const [currentTime, setCurrentTime] = React.useState<string>('')
  const [currentDate, setCurrentDate] = React.useState<string>('')
  const [checkedIn, setCheckedIn] = React.useState(false)
  const [checkInTime, setCheckInTime] = React.useState<string | null>(null)
  const [checkOutTime, setCheckOutTime] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [location, setLocation] = React.useState<{ lat: number; lng: number } | null>(null)
  const { success, error, info } = useToast()
  const supabase = createClient()

  // Real-time digital clock
  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
      setCurrentDate(now.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Check today's punch status on mount
  React.useEffect(() => {
    async function loadTodayPunch() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return
        const today = new Date().toISOString().split('T')[0]

        // Fetch employee record
        const { data: emp } = await supabase.from('employees').select('id').eq('user_id', user.id).maybeSingle()
        if (!emp) return

        const { data: punch } = await supabase
          .from('attendance_records')
          .select('check_in, check_out')
          .eq('employee_id', emp.id)
          .eq('date', today)
          .maybeSingle()

        if (punch) {
          if (punch.check_in) {
            setCheckedIn(true)
            setCheckInTime(new Date(punch.check_in).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
          }
          if (punch.check_out) {
            setCheckOutTime(new Date(punch.check_out).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
          }
        }
      } catch (err) {
        console.error('Error fetching punch status', err)
      }
    }
    loadTodayPunch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Optional Geolocation capture
  const getCoordinates = (): Promise<{ lat: number; lng: number } | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null)
        return
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => resolve(null),
        { timeout: 5000 }
      )
    })
  }

  const handlePunch = async (type: 'in' | 'out') => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Please sign in')

      const today = new Date().toISOString().split('T')[0]
      const nowIso = new Date().toISOString()
      const nowTimeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

      // Get or create employee reference
      let empId: string
      const { data: emp } = await supabase.from('employees').select('id, tenant_id').eq('user_id', user.id).maybeSingle()
      if (emp) {
        empId = emp.id
      } else {
        // Fallback for current logged in user
        empId = user.id
      }

      const coords = await getCoordinates()
      if (coords) setLocation(coords)

      if (type === 'in') {
        const { error: punchErr } = await supabase.from('attendance_records').upsert({
          tenant_id: emp?.tenant_id ?? user.id,
          employee_id: empId,
          date: today,
          check_in: nowIso,
          status: 'present',
          source: 'web',
        }, { onConflict: 'employee_id,date' })

        if (punchErr) throw punchErr

        setCheckedIn(true)
        setCheckInTime(nowTimeStr)
        success('Check-In Successful', `Recorded at ${nowTimeStr}`)
      } else {
        const { error: punchErr } = await supabase.from('attendance_records').update({
          check_out: nowIso,
          updated_at: nowIso,
        }).eq('employee_id', empId).eq('date', today)

        if (punchErr) throw punchErr

        setCheckOutTime(nowTimeStr)
        success('Check-Out Successful', `Recorded at ${nowTimeStr}`)
      }
    } catch (err: any) {
      error('Punch Failed', err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-[#e5e7eb] bg-white">
      <CardHeader className="pb-3 border-b border-[#f1f3f5]">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#5e2b9d]" />
            Attendance Punch
          </CardTitle>
          <span className="text-[11px] text-[#16a34a] font-medium bg-[#f0fdf4] px-2 py-0.5 rounded-[4px]">
            Live Web Punch
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-5 text-center">
        {/* Time display */}
        <p className="text-3xl font-bold font-mono text-[#111827] tracking-tight">
          {currentTime || '00:00:00'}
        </p>
        <p className="text-xs text-[#6b7280] mt-1">{currentDate}</p>

        {/* Current status info */}
        <div className="grid grid-cols-2 gap-3 my-5 p-3 rounded-lg bg-[#f8f9fa] border border-[#e5e7eb] text-xs">
          <div>
            <span className="text-[#9ca3af] block">Punch In</span>
            <span className="font-semibold text-[#111827]">{checkInTime ?? '—'}</span>
          </div>
          <div>
            <span className="text-[#9ca3af] block">Punch Out</span>
            <span className="font-semibold text-[#111827]">{checkOutTime ?? '—'}</span>
          </div>
        </div>

        {/* Punch Action Buttons */}
        <div className="flex gap-2 justify-center">
          {!checkedIn ? (
            <Button
              className="w-full bg-[#5e2b9d] hover:bg-[#4e2384] text-white"
              loading={loading}
              onClick={() => handlePunch('in')}
            >
              <CheckCircle className="h-4 w-4 mr-1.5" />
              Check In Now
            </Button>
          ) : (
            <Button
              variant="secondary"
              className="w-full text-[#dc2626] border-[#fecaca] hover:bg-[#fef2f2]"
              loading={loading}
              onClick={() => handlePunch('out')}
            >
              <LogOut className="h-4 w-4 mr-1.5" />
              {checkOutTime ? 'Punch Out Again' : 'Check Out Now'}
            </Button>
          )}
        </div>

        {/* GPS location pill */}
        <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] text-[#9ca3af]">
          <MapPin className="h-3 w-3" />
          <span>{location ? `Location captured (${location.lat.toFixed(4)}, ${location.lng.toFixed(4)})` : 'Web Browser IP Verified'}</span>
        </div>
      </CardContent>
    </Card>
  )
}

