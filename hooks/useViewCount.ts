import { useState, useEffect, useRef } from 'react'

export function useViewCount(slug: string) {
  const [viewCount, setViewCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const hasIncremented = useRef(false)

  // Fetch initial view count
  useEffect(() => {
    const fetchViewCount = async () => {
      try {
        const response = await fetch(`https://api-v2.dse.best/view-count?slug=${encodeURIComponent(slug)}`)
        if (response.ok) {
          const data = await response.json()
          setViewCount(data.count)
        } else {
          console.warn('Failed to fetch view count:', response.status)
          setViewCount(0)
        }
      } catch (error) {
        console.error('Failed to fetch view count:', error)
        setViewCount(0)
      } finally {
        setIsLoading(false)
      }
    }

    fetchViewCount()
  }, [slug])

  // Increment view count (only once per component mount)
  useEffect(() => {
    const incrementViewCount = async () => {
      // Prevent double counting with useRef instead of sessionStorage
      if (hasIncremented.current) {
        return
      }

      // Check if we've already counted this view in this session (fallback)
      const sessionKey = `viewed_${slug}`
      if (typeof window !== 'undefined' && sessionStorage.getItem(sessionKey)) {
        hasIncremented.current = true
        return
      }

      try {
        const response = await fetch('https://api-v2.dse.best/view-count', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slug }),
        })

        if (response.ok) {
          const data = await response.json()
          setViewCount(data.count)
          hasIncremented.current = true
          
          // Mark as viewed in this session (fallback)
          if (typeof window !== 'undefined') {
            sessionStorage.setItem(sessionKey, 'true')
          }
        } else {
          console.warn('Failed to increment view count:', response.status)
        }
      } catch (error) {
        console.error('Failed to increment view count:', error)
      }
    }

    // Small delay to ensure the page is actually viewed
    const timer = setTimeout(incrementViewCount, 2000)
    return () => clearTimeout(timer)
  }, [slug])

  return { viewCount, isLoading }
} 