import { cn } from '../../lib/cn'
import type { ReactNode } from 'react'

interface RadioOption {
  value: string
  label: ReactNode
  disabled?: boolean
}

interface RadioGroupProps {
  name: string
  options: RadioOption[]
  value?: string
  onChange?: (value: string) => void
  variant?: 'default' | 'quiz'
  className?: string
}

export function RadioGroup({ name, options, value, onChange, variant = 'default', className }: RadioGroupProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {options.map((opt) => (
        <label
          key={opt.value}
          className={cn(
            'flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer text-sm',
            'text-[var(--color-body)] border-[var(--color-border)] bg-[var(--color-card-bg)]',
            variant === 'quiz' && value === opt.value && 'border-violet-500 bg-[rgba(139,92,246,0.07)]',
            opt.disabled && 'opacity-50 cursor-not-allowed',
          )}
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => !opt.disabled && onChange?.(opt.value)}
            disabled={opt.disabled}
            className="w-4 h-4 accent-violet-600 flex-shrink-0"
          />
          <span className="flex-1">{opt.label}</span>
        </label>
      ))}
    </div>
  )
}
