import React from 'react'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn('flex items-center gap-1', className)} aria-label="Breadcrumb">
      <Link href="/dashboard" className="text-[#9ca3af] hover:text-[#5e2b9d] transition-colors">
        <Home className="h-3.5 w-3.5" />
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-3 w-3 text-[#d1d5db]" />
          {item.href && index < items.length - 1 ? (
            <Link
              href={item.href}
              className="text-xs text-[#6b7280] hover:text-[#5e2b9d] transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-xs text-[#111827] font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

