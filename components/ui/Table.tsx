import { cn } from '../../lib/cn'

export function Table({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-auto rounded-lg border border-[var(--color-border)]">
      <table className={cn('w-full border-collapse text-sm', className)} {...props} />
    </div>
  )
}

export function TableHeader({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn('bg-[var(--color-table-head-bg,var(--color-card-inner-bg))]', className)} {...props} />
}

export function TableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn('', className)} {...props} />
}

export function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        'ui-table-row border-b border-[var(--color-border)] last:border-b-0',
        className
      )}
      {...props}
    />
  )
}

export function TableHead({ className, ...props }: React.HTMLAttributes<HTMLTableHeaderCellElement>) {
  return (
    <th
      className={cn(
        'h-9 px-3 py-2 text-left align-middle text-xs font-bold uppercase tracking-wider text-[var(--color-table-head-text,var(--color-muted))] border-b border-[var(--color-border)]',
        className
      )}
      {...props}
    />
  )
}

export function TableCell({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn('px-3 py-2 align-middle text-[var(--color-body)]', className)} {...props} />
}
