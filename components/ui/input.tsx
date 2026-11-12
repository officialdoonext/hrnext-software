import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-[6px] border border-[#d1d5db] bg-white px-3 py-1.5 text-sm text-[#111827]',
          'placeholder:text-[#9ca3af]',
          'focus:outline-none focus:border-[#5e2b9d] focus:ring-2 focus:ring-[#5e2b9d]/10',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#f8f9fa]',
          'transition-colors',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }

