// Smart AI grader caller with fallback logic.
// Tries ChatAnywhere first, falls back to Groq on 429/502/timeout.

import { callGrader as callChatAnywhere, type ChatMessage, type ChatResult } from './chatanywhere';
import { callGroq, type GroqChatMessage, type GroqResult } from './groq';

export type GraderCall = ChatResult | GroqResult;

interface CallOpts {
  chatanywhereKey?: string;
  chatanywhereModel: string;
  groqKey?: string;
  groqModel: string;
  messages: ChatMessage[];
  temperature?: number;
  timeoutMs?: number;
}

const RETRYABLE_STATUSES = new Set([429, 500, 502, 503]);

export async function callGraderWithFallback(opts: CallOpts): Promise<GraderCall> {
  const { chatanywhereKey, chatanywhereModel, groqKey, groqModel, messages, temperature, timeoutMs } = opts;

  // Try ChatAnywhere first
  if (chatanywhereKey) {
    const result = await callChatAnywhere({
      apiKey: chatanywhereKey,
      model: chatanywhereModel,
      messages,
      temperature,
      timeoutMs,
    });

    if (result.ok) {
      return result;
    }

    // Log the failure for debugging
    console.warn(`[grader] ChatAnywhere failed (${result.status}): ${result.error}`);

    // If it's a retryable error AND we have Groq, try fallback
    if (groqKey && (RETRYABLE_STATUSES.has(result.status ?? 0) || result.error?.includes('timeout') || result.error?.includes('abort'))) {
      console.log(`[grader] Falling back to Groq (${groqModel}) after ChatAnywhere error`);

      const fallback = await callGroq({
        apiKey: groqKey,
        model: groqModel,
        messages: messages as GroqChatMessage[],
        temperature,
        timeoutMs,
      });

      if (fallback.ok) {
        console.log(`[grader] Groq fallback succeeded with ${groqModel}`);
        return fallback;
      }

      // If both fail, return ChatAnywhere's error (it was tried first)
      console.error(`[grader] Both ChatAnywhere and Groq failed. ChatAnywhere: ${result.error}, Groq: ${fallback.error}`);
      return result;
    }

    // No fallback available or not a retryable error, return ChatAnywhere result
    return result;
  }

  // No ChatAnywhere key, try Groq directly
  if (groqKey) {
    console.log(`[grader] Using Groq directly (ChatAnywhere not configured)`);
    return callGroq({
      apiKey: groqKey,
      model: groqModel,
      messages: messages as GroqChatMessage[],
      temperature,
      timeoutMs,
    });
  }

  // No providers configured
  return {
    ok: false,
    error: 'No AI providers configured (ChatAnywhere or Groq)',
  };
}
