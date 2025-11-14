import React, { useState, useEffect } from 'react'

interface PrivateProps {
  children: React.ReactNode
}

interface PublicProps {
  children: React.ReactNode
}

/**
 * Hook to determine if we're in private mode based on domain
 * This avoids hydration mismatches by checking client-side
 */
function useIsPrivateMode(): boolean | null {
  const [isPrivate, setIsPrivate] = useState<boolean | null>(null)
  
  useEffect(() => {
    // Check if we're on the private domain (x.dse.best)
    const hostname = window.location.hostname
    const isPrivateDomain = hostname === 'x.dse.best' || hostname === 'xv-dbest.vercel.app'
    setIsPrivate(isPrivateDomain)
  }, [])
  
  return isPrivate
}

/**
 * Component that only renders children in private mode
 * Usage: <Private>content here</Private>
 * 
 * Uses client-side domain detection to avoid hydration mismatches
 */
export function Private({ children }: PrivateProps) {
  const isPrivate = useIsPrivateMode()
  
  // During SSR and initial hydration, don't render anything to avoid mismatch
  if (isPrivate === null) {
    return null
  }
  
  if (!isPrivate) {
    return null
  }
  
  return <>{children}</>
}

/**
 * Component that only renders children in public mode
 * Usage: <Public>content here</Public>
 * 
 * Uses client-side domain detection to avoid hydration mismatches
 */
export function Public({ children }: PublicProps) {
  const isPrivate = useIsPrivateMode()
  
  // During SSR and initial hydration, don't render anything to avoid mismatch
  if (isPrivate === null) {
    return null
  }
  
  if (isPrivate) {
    return null
  }
  
  return <>{children}</>
}

// Export both as default for convenience
export default { Private, Public }
