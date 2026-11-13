'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ChevronRight,
  ChevronLeft,
  Zap,
  ChevronsDownUp,
  ChevronsUpDown,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react'
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
  openState,
  onToggle,
}: {
  item: NavItem
  collapsed: boolean
  depth?: number
  openState: Record<string, boolean>
  onToggle: (id: string) => void
}) {
  const pathname = usePathname()
  // By default open all menu accordions (defaults to true if not explicitly set to false)
  const isOpen = openState[item.id] !== false

  const isActive = item.href ? pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href)) : false
  const hasChildren = item.children && item.children.length > 0
  const Icon = item.icon

  if (hasChildren) {
    return (
      <div className="w-full">
        <button
          type="button"
          onClick={() => onToggle(item.id)}
          className={cn(
            'w-full flex items-center gap-2.5 px-3 py-2 rounded-[6px] text-sm transition-colors group cursor-pointer',
            isOpen
              ? 'text-[#5e2b9d] bg-[#f3eefb]/70 font-medium'
              : 'text-[#374151] hover:bg-[#f1f3f5] hover:text-[#111827]',
            depth > 0 && 'pl-7'
          )}
          title={collapsed ? item.label : undefined}
        >
          {Icon && (
            <Icon
              className={cn(
                'h-4 w-4 shrink-0',
                isOpen ? 'text-[#5e2b9d]' : 'text-[#9ca3af] group-hover:text-[#374151]'
              )}
            />
          )}
          {!collapsed && (
            <>
              <span className="flex-1 text-left truncate">{item.label}</span>
              <ChevronRight
                className={cn(
                  'h-3.5 w-3.5 text-[#9ca3af] transition-transform duration-200 shrink-0',
                  isOpen && 'rotate-90 text-[#5e2b9d]'
                )}
              />
            </>
          )}
        </button>
        {!collapsed && isOpen && (
          <div className="mt-0.5 ml-3 pl-3 border-l border-[#e5e7eb] space-y-0.5">
            {item.children!.map((child) => (
              <NavItemComponent
                key={child.id}
                item={child}
                collapsed={collapsed}
                depth={depth + 1}
                openState={openState}
                onToggle={onToggle}
              />
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
        'flex items-center gap-2.5 px-3 py-2 rounded-[6px] text-sm transition-colors group cursor-pointer',
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
            <span className="ml-auto text-xs bg-[#5e2b9d] text-white rounded-full px-1.5 py-0.5 leading-none font-normal">
              {item.badge}
            </span>
          )}
        </>
      )}
    </Link>
  )
}

export function Sidebar({ navigation, collapsed = false, onToggleCollapse }: SidebarProps) {
  // Store open state for each menu accordion. By default ALL menu accordions are OPEN.
  const [openState, setOpenState] = React.useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    navigation.forEach((item) => {
      if (item.children) {
        initial[item.id] = true
        item.children.forEach((child) => {
          if (child.children) {
            initial[child.id] = true
          }
        })
      }
    })
    return initial
  })

  // Check if all accordions are currently open
  const areAllOpen = React.useMemo(() => {
    return navigation.every((item) => {
      if (!item.children || item.children.length === 0) return true
      return openState[item.id] !== false
    })
  }, [navigation, openState])

  // Toggle single accordion
  const handleToggle = React.useCallback((id: string) => {
    setOpenState((prev) => ({
      ...prev,
      [id]: prev[id] === false ? true : false,
    }))
  }, [])

  // Toggle all accordions at once (Expand All / Collapse All)
  const handleToggleAllAccordions = React.useCallback(() => {
    const nextState = !areAllOpen
    const updated: Record<string, boolean> = {}
    navigation.forEach((item) => {
      if (item.children) {
        updated[item.id] = nextState
        item.children.forEach((child) => {
          if (child.children) {
            updated[child.id] = nextState
          }
        })
      }
    })
    setOpenState(updated)
  }, [areAllOpen, navigation])

  return (
    <aside
      className={cn(
        'flex flex-col bg-white border-r border-[#e5e7eb] h-screen sticky top-0 transition-[width] duration-200 ease-in-out z-30 select-none',
        collapsed ? 'w-14' : 'w-60'
      )}
    >
      {/* Sidebar Header: Logo & Collapse Button */}
      <div
        className={cn(
          'flex items-center h-14 border-b border-[#e5e7eb] shrink-0 justify-between',
          collapsed ? 'px-2 justify-center' : 'px-4'
        )}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="h-7 w-7 bg-[#5e2b9d] rounded-[6px] flex items-center justify-center shrink-0 shadow-xs">
            <Zap className="h-4 w-4 text-white" />
          </div>
          {!collapsed && (
            <div className="truncate">
              <p className="text-sm font-bold text-[#111827] leading-tight truncate">PeopleCore</p>
              <p className="text-[10px] text-[#9ca3af] leading-tight">HRMS Enterprise</p>
            </div>
          )}
        </div>

        {/* Header Collapse/Expand Toggle Button */}
        {!collapsed && onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="p-1 rounded-[6px] text-[#9ca3af] hover:text-[#111827] hover:bg-[#f1f3f5] transition-colors cursor-pointer"
            title="Collapse sidebar"
          >
            <PanelLeftClose className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Accordion Controls Bar (Expand All / Collapse All) */}
      {!collapsed && (
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#f1f3f5] bg-[#fafbfc] text-[11px] text-[#6b7280]">
          <span className="font-semibold uppercase tracking-wider text-[10px] text-[#9ca3af]">Navigation</span>
          <button
            type="button"
            onClick={handleToggleAllAccordions}
            className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[#5e2b9d] hover:bg-[#f3eefb] font-medium transition-colors cursor-pointer"
            title={areAllOpen ? 'Collapse all menus' : 'Expand all menus'}
          >
            {areAllOpen ? (
              <>
                <ChevronsDownUp className="h-3 w-3" />
                <span>Collapse All</span>
              </>
            ) : (
              <>
                <ChevronsUpDown className="h-3 w-3" />
                <span>Expand All</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
        {navigation.map((item) => (
          <NavItemComponent
            key={item.id}
            item={item}
            collapsed={collapsed}
            openState={openState}
            onToggle={handleToggle}
          />
        ))}
      </nav>

      {/* Bottom Sidebar Collapse/Expand Toggle */}
      <div className="border-t border-[#e5e7eb] p-2 bg-[#fafbfc]">
        <button
          type="button"
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center gap-2 h-8 rounded-[6px] text-xs text-[#6b7280] hover:bg-[#f1f3f5] hover:text-[#111827] transition-colors cursor-pointer"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <PanelLeft className="h-4 w-4 text-[#5e2b9d]" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 text-[#9ca3af]" />
              <span className="font-medium text-[11px]">Collapse Sidebar</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
