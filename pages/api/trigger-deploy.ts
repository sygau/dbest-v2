import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const secret = req.headers['x-webhook-secret']
  if (!process.env.SANITY_WEBHOOK_SECRET || secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const ghRepo = process.env.GITHUB_REPO
  const ghToken = process.env.GH_DEPLOY_TOKEN

  if (!ghRepo || !ghToken) {
    return res.status(500).json({ error: 'Missing env config' })
  }

  const response = await fetch(
    `https://api.github.com/repos/${ghRepo}/actions/workflows/deploy.yml/dispatches`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ghToken}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'dse-best-webhook',
      },
      body: JSON.stringify({ ref: 'main', inputs: { reason: 'sanity-publish' } }),
    }
  )

  if (!response.ok) {
    const body = await response.text()
    console.error('[trigger-deploy] GitHub API error:', response.status, body)
    return res.status(502).json({ error: 'GitHub dispatch failed' })
  }

  return res.json({ triggered: true })
}
