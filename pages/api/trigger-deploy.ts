import type { NextApiRequest, NextApiResponse } from 'next'

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'c4f2a8b1e36d9075'
const SITE_HOST = 'dse.best'

async function pingIndexNow(urls: string[]) {
  if (urls.length === 0) return
  try {
    await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: SITE_HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    })
  } catch {
    // non-fatal
  }
}

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

  // Try to extract slug from Sanity webhook body for IndexNow ping
  const urlsToIndex: string[] = []
  try {
    const body = req.body
    const docType = body?._type
    const slug = body?.slug?.current ?? body?.slug

    if (slug) {
      if (docType === 'post') {
        urlsToIndex.push(`https://${SITE_HOST}/blog/${slug}`)
      } else if (slug) {
        urlsToIndex.push(`https://${SITE_HOST}/${slug}`)
      }
    }
  } catch {
    // body parse failed — ping homepage as fallback
  }

  if (urlsToIndex.length === 0) {
    urlsToIndex.push(`https://${SITE_HOST}/`)
  }

  // Fire IndexNow in parallel with GitHub dispatch
  const [response] = await Promise.all([
    fetch(
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
    ),
    pingIndexNow(urlsToIndex),
  ])

  if (!response.ok) {
    const body = await response.text()
    console.error('[trigger-deploy] GitHub API error:', response.status, body)
    return res.status(502).json({ error: 'GitHub dispatch failed' })
  }

  return res.json({ triggered: true, indexNow: urlsToIndex })
}
