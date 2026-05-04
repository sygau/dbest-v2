import { cn } from '../../lib/cn'
import type { InputHTMLAttributes } from 'react'

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'flex h-9 w-full rounded-md border border-violet-200 bg-[var(--color-input-bg)] px-3 py-1 text-sm text-[var(--color-body)] mt-[5px]',
        'placeholder:text-[var(--color-placeholder)]',
        'focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-400/30 focus:ring-offset-0',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
}
