# Cloudflare Turnstile & AI Translation API Implementation Guide

This guide explains how to set up the backend verification for Cloudflare Turnstile and handle the AI translation logic using a Vercel Serverless Function (Next.js API Route).

## 1. Environment Variables
Add these to your `.env.local` and Vercel project settings:
```env
TURNSTILE_SECRET_KEY=your_cloudflare_turnstile_secret_key
OPENAI_API_KEY=your_openai_api_key
# or if using Anthropic
# ANTHROPIC_API_KEY=your_anthropic_api_key
```

## 2. Frontend Integration (Summary)
The `translator.tsx` page handles the client-side:
- Loads the Turnstile script.
- Renders the widget using the **Site Key**.
- Captures the `token` and sends it to the API.

## 3. Backend Verification Logic
The API route must:
1. Receive the `token` and `text` from the frontend.
2. Verify the `token` with Cloudflare's `/siteverify` endpoint.
3. If valid, proceed to call the AI Model.
4. Return the translated text or an error.

---

## Sample API Implementation
Create a file at `pages/api/translate.ts`:

```typescript
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text, token } = req.body;

  if (!text || !token) {
    return res.status(400).json({ error: 'Missing text or token' });
  }

  try {
    // 1. Verify Cloudflare Turnstile Token
    const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    const verifyResponse = await fetch(verifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${token}`,
    });

    const verifyData = await verifyResponse.json();
    if (!verifyData.success) {
      return res.status(403).json({ error: 'Turnstile verification failed' });
    }

    // 2. Call AI API (Example using OpenAI)
    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `你是一位精通文言文與現代漢語的翻譯專家。
請將用戶提供的文本進行精確翻譯。
- 如果輸入是文言文，請翻譯成現代白話文（HKDSE 標準）。
- 如果輸入是白話文，請翻譯成優雅的文言文。
- 保持語氣自然，符合學術與考試需求。
- 只輸出翻譯結果，不要包含任何解釋或額外字句。`
          },
          { role: 'user', content: text }
        ],
        temperature: 0.3,
      }),
    });

    const aiData = await aiResponse.json();
    const translation = aiData.choices[0]?.message?.content;

    if (!translation) {
      throw new Error('AI failed to generate translation');
    }

    // 3. Return result
    return res.status(200).json({ translation });

  } catch (error) {
    console.error('Translation Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
```
