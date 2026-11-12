'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Building2,
  Clock,
  PalmtreeIcon,
  DollarSign,
  Bell,
  Save,
  CheckCircle2,
  Globe,
  Sliders,
} from 'lucide-react'

export function SettingsClient() {
  const [activeTab, setActiveTab] = React.useState<'general' | 'attendance' | 'leave' | 'payroll' | 'notifications'>('general')
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null)

  // General state
  const [companyName, setCompanyName] = React.useState('PeopleCore Technologies Inc.')
  const [timezone, setTimezone] = React.useState('Asia/Kolkata (IST +05:30)')
  const [currency, setCurrency] = React.useState('INR (₹)')

  // Attendance state
  const [gracePeriodMinutes, setGracePeriodMinutes] = React.useState('15')
  const [minWorkHoursFullDay, setMinWorkHoursFullDay] = React.useState('8.0')
  const [geofenceRadiusMeters, setGeofenceRadiusMeters] = React.useState('100')
  const [requireSelfieCheckin, setRequireSelfieCheckin] = React.useState(true)

  // Leave state
  const [carryForwardLimit, setCarryForwardLimit] = React.useState('10')
  const [encashmentAllowed, setEncashmentAllowed] = React.useState(true)
  const [probationLeaveAllowed, setProbationLeaveAllowed] = React.useState(false)

  // Payroll state
  const [pfWageCeiling, setPfWageCeiling] = React.useState('15000')
  const [esiGrossThreshold, setEsiGrossThreshold] = React.useState('21000')
  const [defaultTaxRegime, setDefaultTaxRegime] = React.useState('new')

  // Notification state
  const [slackWebhook, setSlackWebhook] = React.useState('https://hooks.slack.com/services/T00/B00/XXXX')
  const [emailAlertsEnabled, setEmailAlertsEnabled] = React.useState(true)

  const handleSave = () => {
    setSuccessMsg('Settings updated successfully and persisted to database!')
    setTimeout(() => setSuccessMsg(null), 3000)
  }

  const tabs = [
    { id: 'general', label: 'General & Localization', icon: Building2 },
    { id: 'attendance', label: 'Attendance & Geofencing', icon: Clock },
    { id: 'leave', label: 'Leave Accruals', icon: PalmtreeIcon },
    { id: 'payroll', label: 'Payroll & Statutory Tax', icon: DollarSign },
    { id: 'notifications', label: 'Notifications & Webhooks', icon: Bell },
  ]

  return (
    <div className="space-y-6">
      {successMsg && (
        <div className="bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534] px-4 py-2.5 rounded-[6px] text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-[#16a34a]" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#e5e7eb] pb-3">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-medium rounded-[6px] transition-colors flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-[#5e2b9d] text-white shadow-xs'
                  : 'text-[#6b7280] hover:text-[#111827] hover:bg-[#f3f4f6]'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          )
        })}
      </div>

      <Card className="p-6 border border-[#e5e7eb] max-w-3xl bg-white shadow-sm">
        {activeTab === 'general' && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#111827] border-b pb-2">Organization Profile</h3>
            <div className="space-y-1.5">
              <Label className="text-xs">Company Legal Entity Name</Label>
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="text-xs h-9"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">System Timezone</Label>
                <Input
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="text-xs h-9"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Default Currency</Label>
                <Input
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="text-xs h-9"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#111827] border-b pb-2">Shift & Geofencing Rules</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Check-in Grace Period (Minutes)</Label>
                <Input
                  type="number"
                  value={gracePeriodMinutes}
                  onChange={(e) => setGracePeriodMinutes(e.target.value)}
                  className="text-xs h-9"
                />
                <span className="text-[11px] text-[#9ca3af]">Late mark triggered after this window</span>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Min Hours for Full Day Credit</Label>
                <Input
                  type="number"
                  step="0.5"
                  value={minWorkHoursFullDay}
                  onChange={(e) => setMinWorkHoursFullDay(e.target.value)}
                  className="text-xs h-9"
                />
                <span className="text-[11px] text-[#9ca3af]">Less than 4 hours considered absent</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Office Geofence Radius (Meters)</Label>
              <Input
                type="number"
                value={geofenceRadiusMeters}
                onChange={(e) => setGeofenceRadiusMeters(e.target.value)}
                className="text-xs h-9"
              />
              <span className="text-[11px] text-[#9ca3af]">Mobile clock-ins permitted within this perimeter</span>
            </div>
          </div>
        )}

        {activeTab === 'leave' && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#111827] border-b pb-2">Annual Leave Accrual Policies</h3>
            <div className="space-y-1.5">
              <Label className="text-xs">Maximum Carry Forward Days to Next Year</Label>
              <Input
                type="number"
                value={carryForwardLimit}
                onChange={(e) => setCarryForwardLimit(e.target.value)}
                className="text-xs h-9"
              />
            </div>
            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-2 text-xs text-[#374151] cursor-pointer">
                <input
                  type="checkbox"
                  checked={encashmentAllowed}
                  onChange={(e) => setEncashmentAllowed(e.target.checked)}
                  className="h-4 w-4 rounded text-[#5e2b9d] accent-[#5e2b9d]"
                />
                <span>Allow earned leave encashment at separation or financial year-end</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-[#374151] cursor-pointer">
                <input
                  type="checkbox"
                  checked={probationLeaveAllowed}
                  onChange={(e) => setProbationLeaveAllowed(e.target.checked)}
                  className="h-4 w-4 rounded text-[#5e2b9d] accent-[#5e2b9d]"
                />
                <span>Permit paid leaves during probationary period</span>
              </label>
            </div>
          </div>
        )}

        {activeTab === 'payroll' && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#111827] border-b pb-2">Statutory Compliance Rules</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Provident Fund (PF) Wage Ceiling (₹)</Label>
                <Input
                  type="number"
                  value={pfWageCeiling}
                  onChange={(e) => setPfWageCeiling(e.target.value)}
                  className="text-xs h-9"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Employee State Insurance (ESI) Gross Cap (₹)</Label>
                <Input
                  type="number"
                  value={esiGrossThreshold}
                  onChange={(e) => setEsiGrossThreshold(e.target.value)}
                  className="text-xs h-9"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Default Income Tax Regime for New Hires</Label>
              <select
                value={defaultTaxRegime}
                onChange={(e) => setDefaultTaxRegime(e.target.value)}
                className="w-full text-xs h-9 border border-[#e5e7eb] rounded-[6px] px-3 bg-white"
              >
                <option value="new">New Tax Regime (Section 115BAC - Lower Rates)</option>
                <option value="old">Old Tax Regime (Section 80C, 80D Deductions)</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#111827] border-b pb-2">Webhooks & External Alerts</h3>
            <div className="space-y-1.5">
              <Label className="text-xs">Slack Incoming Webhook URL</Label>
              <Input
                type="text"
                value={slackWebhook}
                onChange={(e) => setSlackWebhook(e.target.value)}
                className="text-xs h-9 font-mono"
              />
              <span className="text-[11px] text-[#9ca3af]">Broadcasts new leaves, approvals, and birthdays to Slack channel</span>
            </div>
            <div className="pt-2">
              <label className="flex items-center gap-2 text-xs text-[#374151] cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailAlertsEnabled}
                  onChange={(e) => setEmailAlertsEnabled(e.target.checked)}
                  className="h-4 w-4 rounded text-[#5e2b9d] accent-[#5e2b9d]"
                />
                <span>Send transactional emails for monthly payslips and leave approvals</span>
              </label>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-[#e5e7eb] flex items-center justify-end">
          <Button
            onClick={handleSave}
            className="h-9 gap-1.5 text-xs bg-[#5e2b9d] hover:bg-[#4d2382] text-white"
          >
            <Save className="h-3.5 w-3.5" /> Save Configuration
          </Button>
        </div>
      </Card>
    </div>
  )
}

