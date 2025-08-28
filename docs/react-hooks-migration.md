# React Hooks Migration from jQuery

This document summarizes the React hooks created to replace jQuery-based functionality in the main.js file. These hooks follow React best practices and integrate with Next.js for better performance and maintainability.

## Hooks Overview

| Hook Name | Purpose | Original jQuery Functionality |
|-----------|---------|------------------------------|
| `useThemeSwitcher` | Manages theme switching | Theme switching with localStorage |
| `useNavigationToggle` | Controls sidebar toggle | Sidebar toggle and hover effects |
| `useSearchControl` | Manages search UI | Search popup show/hide |
| `useScrollBehavior` | Manages scrollbar behavior | Scrollbar hiding and customization |
| `useBackToTop` | Manages back-to-top button | Back to top button show/hide and scrolling |
| `useActiveNavigation` | Manages active navigation links | Navigation highlighting based on current path |
| `useStickyHeader` | Manages sticky header | Header stickiness on scroll |
| `useUIInitialization` | Combines all hooks | Main initialization in $(function(){}) |

## Detailed Hook Descriptions

### useThemeSwitcher

Replaces jQuery theme switching functionality. Manages theme selection and persistence in localStorage.

```typescript
const { 
  currentTheme, 
  handleBlueTheme, 
  handleLightTheme, 
  handleDarkTheme, 
  handleSemiDarkTheme, 
  handleBorderedTheme, 
  toggleDarkMode 
} = useThemeSwitcher();
```

### useNavigationToggle

Replaces jQuery sidebar toggle functionality. Manages sidebar state, toggling, and hover effects.

```typescript
const { 
  isToggled, 
  isSidebarHovered, 
  toggleSidebar, 
  closeSidebar, 
  handleSidebarMouseEnter, 
  handleSidebarMouseLeave 
} = useNavigationToggle();
```

### useSearchControl

Replaces jQuery search control functionality. Manages search popup visibility.

```typescript
const { 
  isSearchVisible, 
  openSearch, 
  closeSearch, 
  handleMobileSearchClick, 
  handleMobileSearchClose 
} = useSearchControl();
```

### useScrollBehavior

Replaces jQuery scrollbar functionality. Manages scrollbar visibility and behavior.

```typescript
const { 
  hideSidebarScrollbars, 
  hideAllScrollbars 
} = useScrollBehavior();
```

### useBackToTop

Replaces jQuery back-to-top button functionality. Manages button visibility and scrolling behavior.

```typescript
const { 
  isVisible, 
  scrollToTop, 
  handleKeyDown 
} = useBackToTop();
```

### useActiveNavigation

Replaces jQuery navigation highlighting functionality. Manages active state of navigation links based on current path.

```typescript
useActiveNavigation(); // No returned values, works internally
```

### useStickyHeader

Replaces jQuery sticky header functionality. Manages header stickiness on scroll.

```typescript
const { 
  isSticky 
} = useStickyHeader();
```

### useUIInitialization

Combined hook that initializes all UI functionality. This is the main hook to use in your components.

```typescript
const ui = useUIInitialization();
// Now you can use any of the methods from any hook
ui.toggleSidebar();
ui.scrollToTop();
```

## Usage in Components

To use these hooks in your components, you can either:

1. Use the combined `useUIInitialization` hook:

```tsx
import useUIInitialization from '@/hooks/useUIInitialization';

function MyComponent() {
  const ui = useUIInitialization();
  
  return (
    <button onClick={ui.toggleSidebar}>
      Toggle Sidebar
    </button>
  );
}
```

2. Use individual hooks for specific functionality:

```tsx
import useThemeSwitcher from '@/hooks/useThemeSwitcher';
import useBackToTop from '@/hooks/useBackToTop';

function MyComponent() {
  const { handleDarkTheme, handleLightTheme } = useThemeSwitcher();
  const { isVisible, scrollToTop } = useBackToTop();
  
  return (
    <div>
      <button onClick={handleDarkTheme}>Dark Theme</button>
      <button onClick={handleLightTheme}>Light Theme</button>
      {isVisible && (
        <button onClick={scrollToTop}>Back to Top</button>
      )}
    </div>
  );
}
```

## Migration Benefits

1. **Better Performance**: React hooks optimize rendering and reduce unnecessary DOM manipulations
2. **Type Safety**: TypeScript integration provides better type checking and IDE support
3. **Code Organization**: Functionality is modularized into specific hooks
4. **Maintainability**: Easier to maintain and extend than jQuery code
5. **React Integration**: Properly integrates with React's component lifecycle
6. **Next.js Integration**: Works with Next.js router and SSR
7. **Reduced Dependencies**: Eliminates jQuery dependency

## Next Steps

1. Update components to use these hooks
2. Remove jQuery dependency
3. Test functionality across different browsers and devices
4. Optimize performance further if needed 