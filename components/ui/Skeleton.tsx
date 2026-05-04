import { cn } from '../../lib/cn'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('rounded-md skeleton-shimmer', className)}
      {...props}
    />
  )
}
