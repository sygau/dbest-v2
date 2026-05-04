import { cn } from '../../lib/cn'

interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  fallback?: string
}

export function Avatar({ className, fallback, children, ...props }: AvatarProps) {
  const isCJK = typeof fallback === 'string' && /[㐀-鿿豈-﫿]/.test(fallback)
  return (
    <span
      className={cn(
        'relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full bg-violet-100 text-violet-900',
        className
      )}
      {...props}
    >
      {children || (
        <span
          className={cn(
            'flex h-full w-full items-center justify-center font-medium leading-none',
            isCJK ? 'text-[1rem]' : 'text-xs'
          )}
          style={isCJK ? { fontWeight: 600, paddingTop: '1px' } : undefined}
        >
          {fallback || '?'}
        </span>
      )}
    </span>
  )
}
