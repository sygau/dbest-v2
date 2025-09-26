import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('UNLOCK API CALLED:', req.method, req.url)
  
  // Just return success for ANY request to test
  return res.status(200).json({ 
    ok: true, 
    message: 'API is working!',
    method: req.method,
    timestamp: new Date().toISOString()
  })
}
