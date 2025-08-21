import { useState, useEffect } from 'react'

export function useViewCount(slug: string) {
  const [viewCount, setViewCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch initial view count
  useEffect(() => {
    const fetchViewCount = async () => {
      try {
        const response = await fetch(`/api/view-count?slug=${encodeURIComponent(slug)}`)
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

  // Increment view count (only once per session)
  useEffect(() => {
    const incrementViewCount = async () => {
      // Check if we've already counted this view in this session
      const sessionKey = `viewed_${slug}`
      if (sessionStorage.getItem(sessionKey)) {
        return
      }

      try {
        const response = await fetch('/api/view-count', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slug }),
        })

        if (response.ok) {
          const data = await response.json()
          setViewCount(data.count)
          // Mark as viewed in this session
          sessionStorage.setItem(sessionKey, 'true')
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