# AI Prompt: Translation API Endpoint with Turnstile Verification

## Objective
Create a secure Next.js API route at `pages/api/translate.ts` that:
1. Accepts POST requests with ancient Chinese text
2. Verifies Cloudflare Turnstile tokens to prevent bot abuse
3. Calls an AI service (e.g., OpenAI GPT-4) to translate classical Chinese to modern Chinese
4. Returns the translated text with proper error handling

## Requirements

### 1. API Route Structure
- **File:** `pages/api/translate.ts`
- **Method:** POST only
- **Request Body:**
  ```typescript
  {
    text: string;        // Ancient Chinese text to translate
    turnstileToken: string;  // Cloudflare Turnstile verification token
  }
  ```
- **Response:**
  ```typescript
  {
    translation: string;  // Modern Chinese translation
  }
  ```

### 2. Security Requirements

#### A. Turnstile Verification
- Verify the Turnstile token with Cloudflare's API before processing
- Endpoint: `https://challenges.cloudflare.com/turnstile/v0/siteverify`
- Required environment variables:
  - `TURNSTILE_SECRET_KEY`: Your Cloudflare Turnstile secret key
- Reject requests with invalid or missing tokens

#### B. Input Validation
- Maximum text length: 2000 characters
- Reject empty or whitespace-only input
- Sanitize input to prevent injection attacks
- Check Content-Type header is `application/json`

#### C. Rate Limiting
- Implement basic rate limiting by IP address
- Suggested limit: 10 requests per minute per IP
- Return 429 status code when limit exceeded

#### D. CORS & Headers
- Allow requests only from `https://dse.best` and `https://www.dse.best`
- Set appropriate security headers:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `X-XSS-Protection: 1; mode=block`

### 3. AI Translation Logic

#### A. AI Service Integration
Use OpenAI GPT-4 or similar service with the following prompt template:

```
You are a Classical Chinese (文言文) to Modern Chinese (白話文) translator specialized in DSE-level texts.

Translate the following Classical Chinese text into clear, natural Modern Chinese (Cantonese-influenced Mandarin suitable for Hong Kong students):

[INPUT TEXT]

Requirements:
- Preserve the original meaning and tone
- Use vocabulary appropriate for Hong Kong secondary students
- Maintain paragraph structure
- Do not add explanations or notes, only provide the translation
```

#### B. Environment Variables
- `OPENAI_API_KEY`: Your OpenAI API key (or equivalent for your chosen AI service)
- `AI_MODEL`: Model name (e.g., `gpt-4` or `gpt-3.5-turbo`)

#### C. Error Handling
- Handle AI service timeouts (set timeout to 30 seconds)
- Catch and log API errors without exposing internal details to client
- Return user-friendly error messages in Chinese

### 4. Implementation Checklist

```typescript
// pages/api/translate.ts

import type { NextApiRequest, NextApiResponse } from 'next';

// TODO: Implement the following functions:
// 1. verifyTurnstile(token: string): Promise<boolean>
// 2. validateInput(text: string): { valid: boolean; error?: string }
// 3. checkRateLimit(ip: string): boolean
// 4. translateText(text: string): Promise<string>
// 5. Main handler with proper error handling and logging

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1. Check request method (POST only)
  // 2. Extract and validate request body
  // 3. Verify Turnstile token
  // 4. Check rate limit
  // 5. Validate input text
  // 6. Call AI translation service
  // 7. Return translation or error
}
```

### 5. Error Response Format

```typescript
{
  error: string;  // User-friendly error message in Chinese
  code?: string;  // Optional error code for debugging
}
```

### 6. Logging Requirements
- Log all translation requests with:
  - Timestamp
  - IP address (hashed for privacy)
  - Input text length
  - Success/failure status
  - Response time
- Do NOT log the actual input/output text to protect user privacy

### 7. Testing Considerations
- Test with various Classical Chinese texts (short and long)
- Test with invalid Turnstile tokens
- Test rate limiting behavior
- Test with malformed requests
- Test AI service timeout scenarios

## Example Implementation Notes

### Turnstile Verification
```typescript
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: ip,
    }),
  });
  
  const data = await response.json();
  return data.success === true;
}
```

### Rate Limiting (Simple In-Memory)
```typescript
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);
  
  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute
    return true;
  }
  
  if (limit.count >= 10) {
    return false;
  }
  
  limit.count++;
  return true;
}
```

### OpenAI Integration
```typescript
async function translateText(text: string): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.AI_MODEL || 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a Classical Chinese to Modern Chinese translator...',
        },
        {
          role: 'user',
          content: text,
        },
      ],
      temperature: 0.3,
      max_tokens: 2000,
    }),
  });
  
  const data = await response.json();
  return data.choices[0].message.content;
}
```

## Environment Variables Summary
Add these to your `.env.local` file:

```bash
# Cloudflare Turnstile
TURNSTILE_SECRET_KEY=your_turnstile_secret_key
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key

# OpenAI (or your chosen AI service)
OPENAI_API_KEY=your_openai_api_key
AI_MODEL=gpt-4

# Optional: Rate limiting config
RATE_LIMIT_MAX=10
RATE_LIMIT_WINDOW_MS=60000
```

## Deployment Notes
- Ensure environment variables are set in production (Vercel/Cloudflare Pages)
- Monitor API usage and costs (OpenAI charges per token)
- Consider implementing request logging for debugging
- Set up error monitoring (e.g., Sentry) for production issues
