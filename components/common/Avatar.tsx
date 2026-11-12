import { cn } from '@/lib/utils'

interface AvatarProps {
  name?: string | null
  photoUrl?: string | null
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeClasses = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
}

function getInitials(name?: string | null): string {
  if (!name) return '?'
  const parts = name.trim().split(' ')
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? '?'
  return ((parts[0][0] ?? '') + (parts[parts.length - 1][0] ?? '')).toUpperCase()
}

function getColor(name?: string | null): string {
  const colors = [
    'bg-[#e4d8f5] text-[#5e2b9d]',
    'bg-[#dbeafe] text-[#1d4ed8]',
    'bg-[#dcfce7] text-[#15803d]',
    'bg-[#fef3c7] text-[#b45309]',
    'bg-[#fee2e2] text-[#b91c1c]',
    'bg-[#f0fdf4] text-[#166534]',
    'bg-[#e0f2fe] text-[#0369a1]',
  ]
  if (!name) return colors[0]
  const idx = name.charCodeAt(0) % colors.length
  return colors[idx]
}

export function Avatar({ name, photoUrl, size = 'md', className }: AvatarProps) {
  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt={name ?? 'Avatar'}
        className={cn(
          'rounded-full object-cover border border-[#e5e7eb]',
          sizeClasses[size],
          className
        )}
      />
    )
  }

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center font-semibold border border-[#e5e7eb] shrink-0',
        sizeClasses[size],
        getColor(name),
        className
      )}
    >
      {getInitials(name)}
    </div>
  )
}

