# Secure CDN Implementation

## Overview

This document describes the secure CDN implementation that protects the `appendLinksX.js` script from unauthorized access while providing dynamic CDN URL management with caching and versioning.

## Architecture

### Components

1. **Secure CDN API Endpoint** (`/api/secure-cdn`)
   - Authorizes users using the same passcode system as the main unlock mechanism
   - Returns current CDN URL with versioning and expiry information
   - Supports CDN URL changes without code deployment

2. **Updated appendLinksX.js**
   - Fetches CDN URL from secure endpoint instead of hardcoded value
   - Implements localStorage caching with expiry
   - Falls back to hardcoded URL if secure endpoint fails

3. **Middleware Updates**
   - Removed hardcoded restriction for `appendLinksX.js`
   - Security now handled at the API level

## Security Features

### Authorization
- Uses the same passcode cookie system as the main unlock mechanism
- Validates cookie version against current secrets hash
- Returns 401 Unauthorized for invalid/missing cookies

### CDN URL Management
- CDN URL can be updated in the API endpoint configuration
- Version tracking for cache invalidation
- Configurable cache expiry (default: 24 hours)

### Caching Strategy
- Client-side localStorage caching with expiry
- Automatic cache refresh when expired
- Fallback to hardcoded URL if secure endpoint fails

## Configuration

### Environment Variables
The secure CDN endpoint uses the same environment variables as the unlock system:
- `PASSCODE_SECRETS` or `PASSCODE_SECRET`
- `PASSCODE_COOKIE_NAME` (default: 'site_pass')
- `PASSCODE_MODE`

### CDN Configuration
Edit the `CDN_CONFIG` object in `/api/secure-cdn.ts`:

```typescript
const CDN_CONFIG = {
  primaryUrl: 'https://your-cdn-url.pages.dev',
  fallbackUrl: 'https://fallback-cdn.pages.dev',
  version: '1.0.0',
  cacheExpiryHours: 24
}
```

## API Response Format

```json
{
  "ok": true,
  "cdnUrl": "https://x7m2qv9gkz1w8n3r5t6b4c0aehjldpuoyfsvxiwqzmnk3g7r2t9b6c5aeh.pages.dev",
  "fallbackUrl": "https://dbest-cdn.pages.dev",
  "version": "1.0.0",
  "expiresAt": "2024-01-15T12:00:00.000Z",
  "cacheExpiryHours": 24
}
```

## Client-Side Implementation

### Caching Logic
1. Check localStorage for cached config and expiry
2. If cache is valid, use cached CDN URL
3. If cache expired or missing, fetch from `/api/secure-cdn`
4. Cache new config with expiry timestamp
5. Fall back to hardcoded URL if API fails

### Error Handling
- Network failures fall back to hardcoded URL
- Invalid responses fall back to hardcoded URL
- Authorization failures are logged but don't break functionality

## Benefits

1. **Security**: CDN URL is not exposed in client-side code
2. **Flexibility**: CDN URL can be changed without code deployment
3. **Performance**: Client-side caching reduces API calls
4. **Reliability**: Fallback mechanism ensures functionality even if API fails
5. **Versioning**: Cache invalidation when CDN URL changes

## Testing

### Manual Testing
1. Access the site with valid passcode
2. Check browser console for CDN URL logs
3. Verify localStorage contains cached config
4. Test cache expiry by manually clearing localStorage

### API Testing
Use the test endpoint `/api/test-secure-cdn` to verify the secure CDN endpoint functionality.

## Maintenance

### Updating CDN URL
1. Edit the `primaryUrl` in `/api/secure-cdn.ts`
2. Increment the `version` number
3. Deploy the changes
4. Client caches will automatically refresh when expired

### Monitoring
- Check server logs for API call patterns
- Monitor localStorage usage in client browsers
- Verify fallback behavior during CDN outages

## Security Considerations

1. **Cookie Security**: Uses HttpOnly, Secure, and SameSite cookie attributes
2. **Authorization**: Same security model as main unlock system
3. **No Data Exposure**: CDN URL only accessible to authorized users
4. **Fallback Safety**: Hardcoded fallback ensures functionality even if security fails

## Troubleshooting

### Common Issues

1. **401 Unauthorized**: Check passcode cookie validity
2. **Cache Not Updating**: Clear localStorage or wait for expiry
3. **Fallback Not Working**: Verify hardcoded URL is accessible
4. **API Not Responding**: Check server logs and endpoint configuration

### Debug Commands

```javascript
// Check cached CDN config
console.log('Cached config:', localStorage.getItem('secure_cdn_config'));
console.log('Cache expiry:', localStorage.getItem('secure_cdn_expiry'));

// Clear cache
localStorage.removeItem('secure_cdn_config');
localStorage.removeItem('secure_cdn_expiry');

// Test API endpoint
fetch('/api/secure-cdn').then(r => r.json()).then(console.log);
```
