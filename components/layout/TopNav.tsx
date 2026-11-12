'use client'

import * as React from 'react'
import { Bell, Search, ChevronDown, LogOut, User, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Avatar } from '@/components/common/Avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'

interface TopNavProps {
  user?: {
    full_name?: string | null
    email: string
    role?: string
  }
}

export function TopNav({ user }: TopNavProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      await supabase.auth.signOut()
    } catch {
      // ignore
    }
    router.push('/login')
    router.refresh()
  }

  return (
    <header className="h-14 bg-white border-b border-[#e5e7eb] flex items-center px-4 gap-4 sticky top-0 z-20">
      {/* Search */}
      <div className="flex-1 max-w-sm relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9ca3af]" />
        <Input
          placeholder="Search employees, modules..."
          className="pl-8 h-8 text-xs bg-[#f8f9fa] border-[#e5e7eb] focus:bg-white"
        />
      </div>

      <div className="flex items-center gap-1 ml-auto">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative h-8 w-8">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-[#5e2b9d]" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-2 py-1 rounded-[6px] hover:bg-[#f1f3f5] transition-colors outline-none">
              <Avatar name={user?.full_name ?? user?.email} size="sm" />
              {user?.full_name && (
                <div className="hidden md:block text-left">
                  <p className="text-xs font-medium text-[#111827] leading-tight truncate max-w-[120px]">
                    {user.full_name}
                  </p>
                  <p className="text-[10px] text-[#9ca3af] capitalize">{user?.role?.replace('_', ' ')}</p>
                </div>
              )}
              <ChevronDown className="h-3.5 w-3.5 text-[#9ca3af]" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="pb-1">
              <p className="text-xs font-semibold text-[#111827] truncate">{user?.full_name ?? 'User'}</p>
              <p className="text-[10px] text-[#9ca3af] font-normal truncate">{user?.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="h-3.5 w-3.5" />
              My Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-3.5 w-3.5" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem destructive onClick={handleSignOut}>
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

