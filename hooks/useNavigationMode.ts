'use client'
import { useMemo, useState, useEffect } from 'react'

export const useNavigationMode = () => {
  // Start with a default value that matches server-side rendering
  const [navigationMode, setNavigationMode] = useState<'spa' | 'traditional' | 'traditional_new'>('spa')

  useEffect(() => {
    // Only check environment variable on the client side
    const envMode = process.env.NEXT_PUBLIC_NAVIGATION_MODE
    if (envMode === 'traditional') {
      setNavigationMode('traditional')
    } else if (envMode === 'traditional_new') {
      setNavigationMode('traditional_new')
    } else {
      setNavigationMode('spa')
    }
  }, [])

  const isTraditionalMode = navigationMode === 'traditional'
  const isTraditionalNewMode = navigationMode === 'traditional_new'
  const isSPAMode = navigationMode === 'spa'

  return {
    mode: navigationMode,
    isTraditionalMode,
    isTraditionalNewMode,
    isSPAMode,
    // Utility function to get the appropriate navigation component
    getNavigationComponent: (href: string, children: React.ReactNode, props?: any) => {
      if (isTraditionalMode || isTraditionalNewMode) {
        return { type: 'a', href, children, ...props }
      }
      return { type: 'link', href, children, ...props }
    }
  }
} 