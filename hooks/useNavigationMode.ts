'use client'
import { useMemo, useState, useEffect } from 'react'

export const useNavigationMode = () => {
  // Start with a default value that matches server-side rendering
  const [navigationMode, setNavigationMode] = useState<'spa' | 'traditional'>('spa')

  useEffect(() => {
    // Only check environment variable on the client side
    const envMode = process.env.NEXT_PUBLIC_NAVIGATION_MODE
    if (envMode === 'traditional') {
      setNavigationMode('traditional')
    } else {
      setNavigationMode('spa')
    }
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