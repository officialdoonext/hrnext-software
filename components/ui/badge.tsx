import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-[4px] px-2 py-0.5 text-xs font-medium border',
  {
    variants: {
      variant: {
        default: 'bg-[#f3eefb] text-[#5e2b9d] border-[#cbb4ec]',
        secondary: 'bg-[#f1f3f5] text-[#6b7280] border-[#e5e7eb]',
        success: 'bg-[#f0fdf4] text-[#16a34a] border-[#bbf7d0]',
        warning: 'bg-[#fffbeb] text-[#d97706] border-[#fde68a]',
        destructive: 'bg-[#fef2f2] text-[#dc2626] border-[#fecaca]',
        info: 'bg-[#eff6ff] text-[#2563eb] border-[#bfdbfe]',
        outline: 'bg-transparent text-[#6b7280] border-[#d1d5db]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

