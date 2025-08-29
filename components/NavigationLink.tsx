'use client'
import { useRouter } from 'next/router'
import { useState, useEffect, MouseEvent } from 'react'
import { useNavigationMode } from '../hooks/useNavigationMode'

interface NavigationLinkProps {
  href: string
  children: React.ReactNode
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
  const router = useRouter()
  const { isTraditionalMode, isTraditionalNewMode } = useNavigationMode()
  const [isClient, setIsClient] = useState(false)
  
  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  // Handle navigation with loading state in SPA mode
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Call the original onClick handler if provided
    if (onClick) {
      onClick()
    }
    
    // If in traditional mode, allow default browser navigation
    if (isTraditionalMode || isTraditionalNewMode) {
      return
    }
    
    // In SPA mode, prevent default and handle navigation via router
    e.preventDefault()
    
    // Only navigate if the href is different from the current path
    if (href !== router.asPath) {
      router.push(href)
    }
  }
  
  // Before client hydration, render a simple anchor tag to avoid hydration mismatch
  if (!isClient) {
    return (
      <a 
        href={href} 
        className={className}
        {...props}
      >
        {children}
      </a>
    )
  }
  
  if (isTraditionalMode || isTraditionalNewMode) {
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
  
  // Use Next.js Link for SPA navigation with skeleton loading
  return (
    <a 
      href={href} 
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  )
} 