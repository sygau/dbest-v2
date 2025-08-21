import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from 'redis'

// Create Redis client
const client = createClient({
  url: process.env.REDIS_URL || 'redis://default:DTBSTJ27DpCzsdbwJSR9kDvH7SZ8oAjG@redis-11863.c295.ap-southeast-1-1.ec2.redns.redis-cloud.com:11863'
})

// Connect to Redis
client.on('error', (err) => console.error('Redis Client Error', err))

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Connect to Redis if not connected
  if (!client.isOpen) {
    await client.connect()
  }

  if (req.method === 'GET') {
    const { slug } = req.query
    
    if (!slug || typeof slug !== 'string') {
      return res.status(400).json({ error: 'Slug is required' })
    }

    try {
      const count = await client.get(`viewCount:${slug}`)
      return res.status(200).json({ 
        count: count ? parseInt(count, 10) : 0, 
        success: true 
      })
    } catch (error) {
      console.error('Redis GET error:', error)
      return res.status(500).json({ error: 'Failed to get view count' })
    }
  }

  if (req.method === 'POST') {
    const { slug } = req.body
    
    if (!slug || typeof slug !== 'string') {
      return res.status(400).json({ error: 'Slug is required' })
    }

    try {
      // Increment count atomically
      const newCount = await client.incr(`viewCount:${slug}`)
      return res.status(200).json({ 
        count: newCount,
        success: true 
      })
    } catch (error) {
      console.error('Redis POST error:', error)
      return res.status(500).json({ error: 'Failed to increment view count' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
} 