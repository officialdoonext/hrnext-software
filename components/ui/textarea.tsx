import * as React from 'react'
import { cn } from '@/lib/utils'

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[72px] w-full rounded-[6px] border border-[#d1d5db] bg-white px-3 py-2 text-sm text-[#111827]',
        'placeholder:text-[#9ca3af]',
        'focus:outline-none focus:border-[#5e2b9d] focus:ring-2 focus:ring-[#5e2b9d]/10',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#f8f9fa]',
        'resize-y transition-colors',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = 'Textarea'

export { Textarea }

