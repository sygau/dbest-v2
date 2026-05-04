import { useState } from 'react'
import { cn } from '../../lib/cn'

interface SwitchProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
}

export function Switch({ checked = false, onCheckedChange, disabled }: SwitchProps) {
  const [internal, setInternal] = useState(checked)
  const isOn = checked !== undefined ? checked : internal

  const toggle = () => {
    if (disabled) return
    const next = !isOn
    if (onCheckedChange) onCheckedChange(next)
    else setInternal(next)
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      disabled={disabled}
      onClick={toggle}
      className={cn(
        'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-none',
        isOn ? 'bg-violet-600' : 'bg-[var(--color-border)]',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <span
        className={cn(
          'pointer-events-none block h-4 w-4 rounded-full bg-white shadow-sm ring-0 transition-none',
          isOn ? 'translate-x-4' : 'translate-x-0'
        )}
      />
    </button>
  )
}
