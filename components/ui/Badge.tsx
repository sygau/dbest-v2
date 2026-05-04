import { cn } from '../../lib/cn'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive'
  shape?: 'sharp' | 'square'
  dot?: boolean
}

export function Badge({ className, variant = 'default', shape = 'sharp', dot = false, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 border px-2 py-0.5 text-xs font-semibold leading-tight',
        shape === 'sharp' && 'rounded-sm',
        shape === 'square' && 'rounded-none',
        variant === 'default' && 'border-transparent bg-[#549ee8] text-white',
        variant === 'secondary' && 'border-transparent bg-[#dbeeff] text-[#1565c0]',
        variant === 'outline' && 'border-violet-500 text-violet-600',
        variant === 'destructive' && 'border-transparent bg-red-100 text-red-700',
        className
      )}
      {...props}
    >
      {dot && (
        <span
          aria-hidden="true"
          className="inline-block h-1.5 w-1.5 rounded-full flex-shrink-0"
          style={{ background: 'currentColor', opacity: 0.85, transform: 'translateY(0.7px)' }}
        />
      )}
      {children}
    </span>
  )
}
