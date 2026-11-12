import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

type Status =
  | 'active'
  | 'inactive'
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'cancelled'
  | 'terminated'
  | 'on_leave'
  | 'resigned'
  | 'full_time'
  | 'part_time'
  | 'contract'
  | 'intern'

const statusConfig: Record<Status, { label: string; variant: 'success' | 'secondary' | 'warning' | 'destructive' | 'default' | 'info' }> = {
  active: { label: 'Active', variant: 'success' },
  inactive: { label: 'Inactive', variant: 'secondary' },
  pending: { label: 'Pending', variant: 'warning' },
  approved: { label: 'Approved', variant: 'success' },
  rejected: { label: 'Rejected', variant: 'destructive' },
  cancelled: { label: 'Cancelled', variant: 'secondary' },
  terminated: { label: 'Terminated', variant: 'destructive' },
  on_leave: { label: 'On Leave', variant: 'warning' },
  resigned: { label: 'Resigned', variant: 'secondary' },
  full_time: { label: 'Full Time', variant: 'info' },
  part_time: { label: 'Part Time', variant: 'default' },
  contract: { label: 'Contract', variant: 'warning' },
  intern: { label: 'Intern', variant: 'default' },
}

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status as Status] ?? { label: status, variant: 'secondary' as const }
  return (
    <Badge variant={config.variant} className={cn('capitalize', className)}>
      {config.label}
    </Badge>
  )
}

