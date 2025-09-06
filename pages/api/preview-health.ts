import type { NextApiRequest, NextApiResponse } from 'next'

interface HealthResponse {
  status: 'ok' | 'error'
  preview: {
    configured: boolean
    errors: string[]
  }
  timestamp: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthResponse>
) {
  try {
    const errors: string[] = []
    let configured = true

    // Check required environment variables
    const space = process.env.CONTENTFUL_SPACE_ID || process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
    const previewToken = process.env.CONTENTFUL_PREVIEW_TOKEN
    const previewSecret = process.env.PREVIEW_SECRET

    if (!space) {
      errors.push('CONTENTFUL_SPACE_ID not configured')
      configured = false
    }

    if (!previewToken) {
      errors.push('CONTENTFUL_PREVIEW_TOKEN not configured')
      configured = false
    }

    if (!previewSecret) {
      errors.push('PREVIEW_SECRET not configured')
      configured = false
    }

    res.status(200).json({
      status: 'ok',
      preview: {
        configured,
        errors
      },
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      preview: {
        configured: false,
        errors: [error.message || 'Unknown error']
      },
      timestamp: new Date().toISOString()
    })
  }
}
