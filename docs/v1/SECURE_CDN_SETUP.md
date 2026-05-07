# Secure CDN Setup Guide

## Security Issue Resolved

The hardcoded CDN URL has been removed from the client-side JavaScript to prevent unauthorized access. The CDN URL is now only accessible through the secure API endpoint. The development file `appendLinksX_devmt.js` is obfuscated to create the production `appendLinksX.js` file.

## Environment Variable Setup

### Required Environment Variable

Set the following environment variable in your deployment platform:

```bash
SECURE_CDN_URL=https://x7m2qv9gkz1w8n3r5t6b4c0aehjldpuoyfsvxiwqzmnk3g7r2t9b6c5aeh.pages.dev
```

### Platform-Specific Setup

#### Vercel
1. Go to your project dashboard
2. Navigate to Settings > Environment Variables
3. Add `SECURE_CDN_URL` with your CDN URL
4. Deploy the changes

#### Cloudflare Pages
1. Go to your project dashboard
2. Navigate to Settings > Environment Variables
3. Add `SECURE_CDN_URL` with your CDN URL
4. Redeploy the project

#### Local Development
Create a `.env` file:
```bash
SECURE_CDN_URL=https://x7m2qv9gkz1w8n3r5t6b4c0aehjldpuoyfsvxiwqzmnk3g7r2t9b6c5aeh.pages.dev
```

## Security Benefits

1. **No Hardcoded URLs**: CDN URL is not visible in client-side code
2. **Environment-Based**: CDN URL is stored securely in environment variables
3. **Authorization Required**: Only authorized users can access the CDN URL
4. **No Fallback Exposure**: No fallback URL is exposed in client code

## How It Works

1. **Client Request**: Obfuscated `appendLinksX.js` requests CDN URL from `/api/secure-cdn`
2. **Authorization Check**: API validates user's passcode cookie
3. **Secure Response**: Only authorized users receive the CDN URL
4. **Caching**: CDN URL is cached client-side with expiry
5. **No Fallback**: If authorization fails, no CDN URL is provided

## Testing

### Verify Security
1. Open browser developer tools
2. View page source
3. Search for the CDN URL - it should not be visible
4. Check that only authorized users can access paper downloads

### Test API Endpoint
```bash
# This should return 401 for unauthorized users
curl https://your-domain.com/api/secure-cdn

# This should return CDN config for authorized users
curl https://your-domain.com/api/secure-cdn -H "Cookie: site_pass=your-cookie-value"
```

## Troubleshooting

### Common Issues

1. **Environment Variable Not Set**
   - Error: CDN URL falls back to default
   - Solution: Set `SECURE_CDN_URL` environment variable

2. **Authorization Failing**
   - Error: 401 Unauthorized responses
   - Solution: Check passcode cookie is valid

3. **CDN URL Not Working**
   - Error: Paper downloads fail
   - Solution: Verify CDN URL is accessible and correct

### Debug Commands

```javascript
// Check if secure CDN is working
fetch('/api/secure-cdn')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);

// Check cached config
console.log('Cached CDN config:', localStorage.getItem('secure_cdn_config'));
```

## Migration Notes

- **Before**: CDN URL was hardcoded in client-side JavaScript
- **After**: CDN URL is fetched from secure API endpoint
- **Security**: CDN URL is no longer visible to unauthorized users
- **Functionality**: Paper downloads still work for authorized users

## Maintenance

### Updating CDN URL
1. Update the `SECURE_CDN_URL` environment variable
2. Increment the version in the API endpoint
3. Deploy the changes
4. Client caches will refresh automatically

### Monitoring
- Check server logs for API access patterns
- Monitor for unauthorized access attempts
- Verify CDN URL is not exposed in client-side code
