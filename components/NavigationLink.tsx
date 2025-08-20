'use client'
import Link from 'next/link'
import { ReactNode } from 'react'

interface NavigationLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
  [key: string]: any
}

export default function NavigationLink({ 
  href, 
  children, 
  className, 
  onClick,
  ...props 
}: NavigationLinkProps) {
  // Check if traditional navigation is enabled
  const useTraditionalNavigation = process.env.NEXT_PUBLIC_NAVIGATION_MODE === 'traditional'
  
  if (useTraditionalNavigation) {
    // Use traditional navigation with full page reload
    return (
      <a 
        href={href} 
        className={className}
        onClick={(e) => {
          if (onClick) {
            onClick()
          }
          // Allow default behavior for full page reload
        }}
        {...props}
      >
        {children}
      </a>
    )
  }
  
  // Use Next.js Link for SPA navigation (default behavior)
  return (
    <Link 
      href={href} 
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </Link>
  )
} 