# Chat Toggle System

This system allows you to easily enable/disable the chat functionality using environment variables.

## Environment Variables

### Required Variables

- `NEXT_PUBLIC_CHAT_DISABLED` - Set to `'true'` to disable chat, `'false'` or unset to enable

### Optional Variables

- `NEXT_PUBLIC_CHAT_DISABLED_MESSAGE` - Custom message to display when chat is disabled

## Usage

### Enable Chat (Default)
```bash
# No environment variable needed, or explicitly set:
NEXT_PUBLIC_CHAT_DISABLED=false
```

### Disable Chat
```bash
NEXT_PUBLIC_CHAT_DISABLED=true
```

### Disable Chat with Custom Message
```bash
NEXT_PUBLIC_CHAT_DISABLED=true
NEXT_PUBLIC_CHAT_DISABLED_MESSAGE="Chat is temporarily unavailable for maintenance"
```

## How It Works

1. **Build Time**: The environment variables are read during the build process
2. **Navigation**: Chat link is conditionally shown/hidden in the sidebar
3. **Page Access**: If chat is disabled, visiting `/chat` shows a minimal disabled message
4. **SEO**: Disabled chat pages are marked with `noindex, nofollow`

## Files Modified

- `utils/chatToggle.ts` - Utility functions to check chat status
- `components/ChatDisabled.tsx` - Minimal component shown when chat is disabled
- `pages/chat.tsx` - Modified to conditionally render chat or disabled component
- `pages/_app.tsx` - Modified to conditionally show chat link in navigation

## Benefits

- **Easy Toggle**: Simple environment variable to enable/disable
- **Clean Design**: Minimal, professional disabled page
- **SEO Safe**: Proper meta tags for disabled state
- **Maintenance Ready**: Perfect for temporary maintenance periods
- **Customizable**: Custom message for different scenarios 