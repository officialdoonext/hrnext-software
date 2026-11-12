import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Zap, ArrowLeft, Home, Users, Clock, DollarSign, Briefcase } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center p-6 text-center">
      {/* Brand Icon */}
      <div className="h-14 w-14 bg-[#5e2b9d] rounded-[12px] flex items-center justify-center mb-4 shadow-sm">
        <Zap className="h-7 w-7 text-white" />
      </div>

      <span className="text-xs font-mono font-bold tracking-widest text-[#5e2b9d] uppercase bg-purple-50 px-3 py-1 rounded-full border border-purple-200 mb-2">
        Error 404 • Page Not Found
      </span>

      <h1 className="text-2xl font-bold text-[#111827] tracking-tight mt-1">
        We couldn&apos;t find that page
      </h1>
      <p className="text-sm text-[#6b7280] max-w-md mt-2">
        The link you clicked may be outdated or mistyped. Use the navigation buttons below to return to your workspace.
      </p>

      {/* Main Action */}
      <div className="flex items-center gap-3 mt-6">
        <Link href="/dashboard">
          <Button className="h-9 gap-2 text-xs bg-[#5e2b9d] hover:bg-[#4d2382] text-white">
            <Home className="h-3.5 w-3.5" /> Return to Dashboard
          </Button>
        </Link>
      </div>

      {/* Quick Links Card */}
      <div className="mt-10 p-5 bg-white border border-[#e5e7eb] rounded-[10px] shadow-sm max-w-lg w-full text-left">
        <p className="text-xs font-semibold text-[#111827] uppercase tracking-wider mb-3">
          Quick Access Portals & Modules:
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <Link
            href="/dashboard"
            className="p-2.5 rounded-[6px] border border-[#e5e7eb] hover:border-[#5e2b9d] hover:bg-purple-50/30 transition-all flex items-center gap-2"
          >
            <Home className="h-4 w-4 text-[#5e2b9d]" />
            <span className="font-medium text-[#111827]">HR Dashboard</span>
          </Link>
          <Link
            href="/employees"
            className="p-2.5 rounded-[6px] border border-[#e5e7eb] hover:border-[#5e2b9d] hover:bg-purple-50/30 transition-all flex items-center gap-2"
          >
            <Users className="h-4 w-4 text-[#5e2b9d]" />
            <span className="font-medium text-[#111827]">Employee Directory</span>
          </Link>
          <Link
            href="/attendance/register"
            className="p-2.5 rounded-[6px] border border-[#e5e7eb] hover:border-[#5e2b9d] hover:bg-purple-50/30 transition-all flex items-center gap-2"
          >
            <Clock className="h-4 w-4 text-[#5e2b9d]" />
            <span className="font-medium text-[#111827]">Attendance Register</span>
          </Link>
          <Link
            href="/payroll"
            className="p-2.5 rounded-[6px] border border-[#e5e7eb] hover:border-[#5e2b9d] hover:bg-purple-50/30 transition-all flex items-center gap-2"
          >
            <DollarSign className="h-4 w-4 text-[#5e2b9d]" />
            <span className="font-medium text-[#111827]">Payroll Center</span>
          </Link>
          <Link
            href="/manager/dashboard"
            className="p-2.5 rounded-[6px] border border-[#e5e7eb] hover:border-[#5e2b9d] hover:bg-purple-50/30 transition-all flex items-center gap-2"
          >
            <Briefcase className="h-4 w-4 text-[#5e2b9d]" />
            <span className="font-medium text-[#111827]">Manager Portal</span>
          </Link>
          <Link
            href="/my/dashboard"
            className="p-2.5 rounded-[6px] border border-[#e5e7eb] hover:border-[#5e2b9d] hover:bg-purple-50/30 transition-all flex items-center gap-2"
          >
            <Zap className="h-4 w-4 text-[#5e2b9d]" />
            <span className="font-medium text-[#111827]">Employee Self-Service</span>
          </Link>
        </div>
      </div>

      <p className="text-xs text-[#9ca3af] mt-8">
        &copy; 2026 PeopleCore HRMS. All rights reserved.
      </p>
    </div>
  )
}

