import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
      {Icon && (
        <div className="h-12 w-12 rounded-full bg-[#f3eefb] flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-[#5e2b9d]" />
        </div>
      )}
      <h3 className="text-sm font-semibold text-[#111827] mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-[#6b7280] max-w-sm">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

