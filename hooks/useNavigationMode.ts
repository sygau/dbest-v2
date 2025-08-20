'use client'
import { useMemo } from 'react'

export const useNavigationMode = () => {
  const navigationMode = useMemo(() => {
    if (typeof window === 'undefined') {
      // Server-side: default to SPA mode
      return 'spa'
    }
    
    // Check environment variable
    const envMode = process.env.NEXT_PUBLIC_NAVIGATION_MODE
    if (envMode === 'traditional') {
      return 'traditional'
    }
    
    // Default to SPA mode
    return 'spa'
  }, [])

  const isTraditionalMode = navigationMode === 'traditional'
  const isSPAMode = navigationMode === 'spa'

  return {
    mode: navigationMode,
    isTraditionalMode,
    isSPAMode,
    // Utility function to get the appropriate navigation component
    getNavigationComponent: (href: string, children: React.ReactNode, props?: any) => {
      if (isTraditionalMode) {
        return { type: 'a', href, children, ...props }
      }
      return { type: 'link', href, children, ...props }
    }
  }
} 