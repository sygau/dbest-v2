import { cn } from '../../lib/cn'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link' | 'success' | 'warning' | 'info'
  size?: 'sm' | 'md' | 'lg' | 'icon'
}

export function Button({ className, variant = 'default', size = 'md', ...props }: ButtonProps) {
  const hasShadow = variant !== 'link' && variant !== 'ghost'
  return (
    <>
      <button
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-none cursor-pointer',
          'disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none',
          hasShadow && 'active:translate-y-[2px]',
          (variant === 'default' || variant === 'destructive' || variant === 'success' || variant === 'warning' || variant === 'info') && 'shadow-[0_4px_0_0] active:shadow-[0_2px_0_0]',
          variant === 'default' && 'bg-violet-500 text-white border-2 border-violet-600 shadow-violet-700',
          variant === 'secondary' && 'btn-secondary',
          variant === 'outline' && 'btn-outline',
          variant === 'ghost' && 'bg-transparent text-violet-600 border-2 border-transparent shadow-transparent',
          variant === 'destructive' && 'bg-red-500 text-white border-2 border-red-600 shadow-red-700',
          variant === 'link' && 'bg-transparent text-violet-600 underline p-0 h-auto border-0 shadow-none',
          variant === 'success' && 'bg-[#22693a] text-white border-2 border-[#1a5230] shadow-[#0f3520]',
          variant === 'warning' && 'bg-amber-400 text-amber-900 border-2 border-amber-500 shadow-amber-600',
          variant === 'info' && 'bg-sky-500 text-white border-2 border-sky-600 shadow-sky-700',
          size === 'sm' && 'h-9 px-4 text-xs',
          size === 'md' && 'h-11 px-5 text-sm',
          size === 'lg' && 'h-12 px-7 text-base',
          size === 'icon' && 'h-11 w-11 p-0',
          className
        )}
        {...props}
      />
      <style jsx>{`
        .btn-secondary {
          background-color: white;
          color: #7c3aed;
          border: 2px solid #ede9fe;
          box-shadow: 0 4px 0 0 #ede9fe;
        }
        .btn-secondary:active { box-shadow: 0 2px 0 0 #ede9fe; }
        [data-theme="dark"] .btn-secondary {
          background-color: #2a2a2a;
          color: #c4b5fd;
          border-color: #3f3f3f;
          box-shadow: 0 4px 0 0 #3f3f3f;
        }
        [data-theme="dark"] .btn-secondary:active { box-shadow: 0 2px 0 0 #3f3f3f; }
        [data-theme="blue"] .btn-secondary {
          background-color: #1a2847;
          color: #a8c5ff;
          border-color: #2a3a5a;
          box-shadow: 0 4px 0 0 #2a3a5a;
        }
        [data-theme="blue"] .btn-secondary:active { box-shadow: 0 2px 0 0 #2a3a5a; }

        .btn-outline {
          background-color: white;
          color: #7c3aed;
          border: 2px solid #a78bfa;
          box-shadow: 0 4px 0 0 #d8b4fe;
        }
        .btn-outline:active { box-shadow: 0 2px 0 0 #d8b4fe; }
        [data-theme="dark"] .btn-outline {
          background-color: #1a1a1a;
          color: #d8b4fe;
          border-color: #6d28d9;
          box-shadow: 0 4px 0 0 #4c1d95;
        }
        [data-theme="dark"] .btn-outline:active { box-shadow: 0 2px 0 0 #4c1d95; }
        [data-theme="blue"] .btn-outline {
          background-color: #0f1a33;
          color: #b8d4ff;
          border-color: #5b7db3;
          box-shadow: 0 4px 0 0 #3a5286;
        }
        [data-theme="blue"] .btn-outline:active { box-shadow: 0 2px 0 0 #3a5286; }
      `}</style>
    </>
  )
}
