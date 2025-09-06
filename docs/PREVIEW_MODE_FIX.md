# Preview Mode Fix Documentation

## Problem
The Contentful preview functionality was causing Cloudflare 1101 errors and crashing the entire site, including static pages.

## Root Causes
1. **Edge Runtime Incompatibility**: The preview page was using `export const runtime = 'experimental-edge'` which doesn't work well with Cloudflare Pages for SSR functions
2. **Unhandled Errors**: Missing environment variables and API failures were causing uncaught exceptions
3. **No Graceful Degradation**: Preview failures would crash instead of showing error pages

## Fixes Applied

### 1. Removed Edge Runtime
- Removed `export const runtime = 'experimental-edge'` from `/pages/blog/preview.tsx`
- This allows the page to use standard Node.js runtime which is more stable on Cloudflare

### 2. Enhanced Error Handling
- Added comprehensive try-catch blocks around the entire `getServerSideProps` function
- Added timeout protection for Contentful API calls (10 seconds)
- Graceful fallback to redirect users to safety pages instead of crashing

### 3. Environment Variable Validation
- Early validation of required environment variables
- Friendly error messages for missing configuration
- Redirect to safety page if preview is not configured

### 4. Created Safety Features
- **`/pages/api/preview-health.ts`**: API endpoint to check preview configuration
- Improved error UI in the main preview page
- Graceful redirects to `/blog` when preview fails

### 5. Improved User Experience
- Better error messages for different failure scenarios
- Timeout handling for slow API responses
- Visual feedback for configuration issues

## Environment Variables Required
For preview mode to work properly, these environment variables must be set in Cloudflare Pages:

```
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_PREVIEW_TOKEN=your_preview_token
PREVIEW_SECRET=your_secret_key
CONTENTFUL_ENVIRONMENT=master (optional, defaults to master)
```

## Testing
1. **Preview Not Configured**: Preview attempts redirect to `/blog` gracefully
2. **Preview Health Check**: Visit `/api/preview-health` - should return JSON status
3. **Preview With Errors**: Access `/blog/preview` without parameters - should redirect to `/blog`
4. **Valid Preview**: Access `/blog/preview?slug=test&secret=valid_secret` - should work or show helpful error

## Safety Features
- All preview errors now redirect to safety pages instead of crashing
- Site remains functional even if Contentful preview is completely broken
- No impact on static pages or main site functionality
- Graceful degradation in all failure scenarios

## Monitoring
- Preview errors are logged to console for debugging
- API health endpoint can be used for monitoring
- User-friendly error messages help identify configuration issues

## Future Improvements
- Consider adding preview mode toggle in admin interface
- Add preview authentication beyond just secret parameter
- Implement preview content caching for better performance
