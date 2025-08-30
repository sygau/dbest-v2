/**
 * Chat Toggle Utility
 * Checks if chat functionality is enabled based on environment variables
 */

export interface ChatConfig {
  enabled: boolean;
  disabledMessage?: string;
}

/**
 * Get chat configuration based on environment variables
 * @returns ChatConfig object with enabled status and optional message
 */
export function getChatConfig(): ChatConfig {
  // Check if chat is disabled via environment variable
  const chatDisabled = process.env.NEXT_PUBLIC_CHAT_DISABLED === 'true';
  const disabledMessage = process.env.NEXT_PUBLIC_CHAT_DISABLED_MESSAGE;

  return {
    enabled: !chatDisabled,
    disabledMessage: disabledMessage || 'Chat Temporarily Unavailable'
  };
}

/**
 * Check if chat is enabled (for client-side use)
 * @returns boolean indicating if chat is enabled
 */
export function isChatEnabled(): boolean {
  // For client-side, we need to check the public environment variable
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_CHAT_DISABLED !== 'true';
  }
  
  // For server-side, use the full config
  return getChatConfig().enabled;
}

/**
 * Get chat disabled message (for client-side use)
 * @returns string message to display when chat is disabled
 */
export function getChatDisabledMessage(): string {
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_CHAT_DISABLED_MESSAGE || 'Chat Temporarily Unavailable';
  }
  
  return getChatConfig().disabledMessage || 'Chat Temporarily Unavailable';
} 