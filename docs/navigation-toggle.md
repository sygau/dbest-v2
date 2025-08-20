# Navigation Mode Toggle

This feature allows you to easily switch between SPA (Single Page Application) and traditional browser navigation modes using environment variables.

## Configuration

Set the `NEXT_PUBLIC_NAVIGATION_MODE` environment variable to control navigation behavior:

### SPA Mode (Default)
```bash
NEXT_PUBLIC_NAVIGATION_MODE=spa
# or leave empty
```

- Uses Next.js client-side navigation
- Faster page transitions
- Better user experience
- May have issues with AdSense

### Traditional Mode
```bash
NEXT_PUBLIC_NAVIGATION_MODE=traditional
```

- Uses full page reloads
- Better compatibility with AdSense
- Slower page transitions
- More traditional web experience

## Implementation

The toggle is implemented through:

1. **NavigationLink Component** (`components/NavigationLink.tsx`)
   - Automatically switches between `<Link>` and `<a>` tags based on environment variable
   - Maintains the same API as Next.js Link component

2. **useNavigationMode Hook** (`hooks/useNavigationMode.ts`)
   - Provides utilities for checking current navigation mode
   - Can be used in components that need to know the current mode

## Usage

### Basic Usage
```tsx
import NavigationLink from '../components/NavigationLink'

// This will automatically use the correct navigation method
<NavigationLink href="/about">About</NavigationLink>
```

### Checking Navigation Mode
```tsx
import { useNavigationMode } from '../hooks/useNavigationMode'

function MyComponent() {
  const { mode, isTraditionalMode, isSPAMode } = useNavigationMode()
  
  return (
    <div>
      Current mode: {mode}
      {isTraditionalMode && <p>Using traditional navigation</p>}
      {isSPAMode && <p>Using SPA navigation</p>}
    </div>
  )
}
```

## Benefits

- **Easy Toggle**: Change navigation mode without code changes
- **AdSense Compatibility**: Traditional mode works better with AdSense
- **Performance**: SPA mode provides better performance
- **No Breaking Changes**: All existing Link components work the same way

## Migration

All existing `Link` components in the codebase have been replaced with `NavigationLink` components. The API remains the same, so no changes are needed in existing code.

## Environment Variables

Add to your `.env.local` file:

```bash
# For SPA mode (default)
NEXT_PUBLIC_NAVIGATION_MODE=spa

# For traditional mode (better for AdSense)
NEXT_PUBLIC_NAVIGATION_MODE=traditional
```

## Deployment

- **Vercel**: Set environment variables in the Vercel dashboard
- **Other platforms**: Set the `NEXT_PUBLIC_NAVIGATION_MODE` environment variable in your deployment platform 