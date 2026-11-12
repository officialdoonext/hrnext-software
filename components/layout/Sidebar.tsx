'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, ChevronLeft, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NavItem } from '@/lib/constants/navigation'

interface SidebarProps {
  navigation: NavItem[]
  collapsed?: boolean
  onToggleCollapse?: () => void
}

function NavItemComponent({
  item,
  collapsed,
  depth = 0,
}: {
  item: NavItem
  collapsed: boolean
  depth?: number
}) {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(() => {
    // Auto-open if any child is active
    if (item.children) {
      return item.children.some((child) => pathname.startsWith(child.href ?? ''))
    }
    return false
  })

  const isActive = item.href ? pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href)) : false
  const hasChildren = item.children && item.children.length > 0
  const Icon = item.icon

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            'w-full flex items-center gap-2.5 px-3 py-2 rounded-[6px] text-sm transition-colors group',
            open
              ? 'text-[#5e2b9d] bg-[#f3eefb]'
              : 'text-[#374151] hover:bg-[#f1f3f5] hover:text-[#111827]',
            depth > 0 && 'pl-7'
          )}
        >
          {Icon && (
            <Icon
              className={cn(
                'h-4 w-4 shrink-0',
                open ? 'text-[#5e2b9d]' : 'text-[#9ca3af] group-hover:text-[#374151]'
              )}
            />
          )}
          {!collapsed && (
            <>
              <span className="flex-1 text-left font-medium truncate">{item.label}</span>
              <ChevronRight
                className={cn(
                  'h-3.5 w-3.5 text-[#9ca3af] transition-transform duration-150',
                  open && 'rotate-90'
                )}
              />
            </>
          )}
        </button>
        {!collapsed && open && (
          <div className="mt-0.5 ml-3 pl-3 border-l border-[#e5e7eb]">
            {item.children!.map((child) => (
              <NavItemComponent key={child.id} item={child} collapsed={collapsed} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Link
      href={item.href ?? '#'}
      className={cn(
        'flex items-center gap-2.5 px-3 py-2 rounded-[6px] text-sm transition-colors group',
        isActive
          ? 'text-[#5e2b9d] bg-[#f3eefb] font-medium'
          : 'text-[#374151] hover:bg-[#f1f3f5] hover:text-[#111827]',
        depth > 0 && 'py-1.5'
      )}
      title={collapsed ? item.label : undefined}
    >
      {Icon && (
        <Icon
          className={cn(
            'h-4 w-4 shrink-0',
            isActive ? 'text-[#5e2b9d]' : 'text-[#9ca3af] group-hover:text-[#374151]'
          )}
        />
      )}
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{item.label}</span>
          {item.badge && (
            <span className="ml-auto text-xs bg-[#5e2b9d] text-white rounded-full px-1.5 py-0.5 leading-none">
              {item.badge}
            </span>
          )}
        </>
      )}
    </Link>
  )
}

export function Sidebar({ navigation, collapsed = false, onToggleCollapse }: SidebarProps) {
  return (
    <aside
      className={cn(
        'flex flex-col bg-white border-r border-[#e5e7eb] h-screen sticky top-0 transition-[width] duration-200 ease-in-out z-30',
        collapsed ? 'w-14' : 'w-60'
      )}
    >
      {/* Logo */}
      <div className={cn('flex items-center h-14 border-b border-[#e5e7eb] shrink-0', collapsed ? 'justify-center px-2' : 'px-4 gap-2.5')}>
        <div className="h-7 w-7 bg-[#5e2b9d] rounded-[6px] flex items-center justify-center shrink-0">
          <Zap className="h-4 w-4 text-white" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-sm font-bold text-[#111827] leading-tight">PeopleCore</p>
            <p className="text-[10px] text-[#9ca3af] leading-tight">HRMS</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {navigation.map((item) => (
          <NavItemComponent key={item.id} item={item} collapsed={collapsed} />
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-[#e5e7eb] p-2">
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center h-8 rounded-[6px] text-[#9ca3af] hover:bg-[#f1f3f5] hover:text-[#374151] transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
    </aside>
  )
}

