import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from 'redis'

// Create Redis client with connection pooling
let redisClient: any = null

async function getRedisClient() {
  if (!redisClient) {
    redisClient = createClient({
      url: process.env.REDIS_URL || 'redis://default:DTBSTJ27DpCzsdbwJSR9kDvH7SZ8oAjG@redis-11863.c295.ap-southeast-1-1.ec2.redns.redis-cloud.com:11863',
      socket: {
        reconnectStrategy: (retries) => Math.min(retries * 50, 500)
      }
    })

    redisClient.on('error', (err: Error) => {
      console.error('Redis Client Error:', err)
    })

    if (!redisClient.isOpen) {
      await redisClient.connect()
    }
  }
  
  return redisClient
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { slugs } = req.query
    
    if (!slugs || typeof slugs !== 'string') {
      return res.status(400).json({ error: 'Slugs parameter is required' })
    }

    const slugArray = slugs.split(',')
    const client = await getRedisClient()
    
    // Fetch all view counts in parallel
    const viewCounts: Record<string, number> = {}
    
    await Promise.all(
      slugArray.map(async (slug) => {
        try {
          const count = await client.get(`viewCount:${slug}`)
          viewCounts[slug] = count ? parseInt(count, 10) : 0
        } catch (error) {
          console.error(`Error fetching count for ${slug}:`, error)
          viewCounts[slug] = 0
        }
      })
    )

    return res.status(200).json({ 
      counts: viewCounts,
      success: true 
    })
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
