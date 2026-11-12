'use client'

import * as React from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopNav } from '@/components/layout/TopNav'
import {
  hrNavigation,
  superAdminNavigation,
  managerNavigation,
  employeeNavigation,
  type NavItem,
} from '@/lib/constants/navigation'
import { ToasterProvider } from '@/components/ui/toaster'
import { usePathname } from 'next/navigation'

interface AppShellProps {
  children: React.ReactNode
  user?: {
    full_name?: string | null
    email: string
    role?: string
  }
  navigationType?: 'hr' | 'super_admin' | 'manager' | 'employee'
}

export function AppShell({ children, user, navigationType }: AppShellProps) {
  const [collapsed, setCollapsed] = React.useState(false)
  const pathname = usePathname()

  // Determine active navigation based on explicit navigationType, route pathname, or user role
  const navigation: NavItem[] = React.useMemo(() => {
    if (navigationType === 'super_admin' || pathname.startsWith('/super-admin')) {
      return superAdminNavigation
    }
    if (navigationType === 'manager' || pathname.startsWith('/manager')) {
      return managerNavigation
    }
    if (navigationType === 'employee' || pathname.startsWith('/my')) {
      return employeeNavigation
    }
    return hrNavigation
  }, [navigationType, pathname])

  return (
    <ToasterProvider>
      <div className="flex h-screen overflow-hidden bg-[#f8f9fa]">
        <Sidebar
          navigation={navigation}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
        />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <TopNav user={user} />
          <main className="flex-1 overflow-y-auto">
            <div className="p-6 max-w-[1400px]">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ToasterProvider>
  )
}
