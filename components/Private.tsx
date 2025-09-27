import React from 'react'

interface PrivateProps {
  children: React.ReactNode
}

interface PublicProps {
  children: React.ReactNode
}

/**
 * Simple component that only renders children in private mode
 * Usage: <Private>content here</Private>
 */
export function Private({ children }: PrivateProps) {
  const isPrivate = process.env.PASSCODE_MODE === 'true'
  
  if (!isPrivate) {
    return null
  }
  
  return <>{children}</>
}

/**
 * Simple component that only renders children in public mode
 * Usage: <Public>content here</Public>
 */
export function Public({ children }: PublicProps) {
  const isPrivate = process.env.PASSCODE_MODE === 'true'
  
  if (isPrivate) {
    return null
  }
  
  return <>{children}</>
}

// Export both as default for convenience
export default { Private, Public }
