# AI Bot Implementation for dse.best Chat

## Overview
Implemented an intelligent AI chatbot assistant (DBestBot) that helps students with dse.best website features and HKDSE study guidance. The bot uses ChatGPT to intelligently decide when to respond based on full chat context.

## Implementation Details

### 1. Backend (apibranch/chat-auth.js)

#### AI Configuration
- **Provider**: ChatAnywhere (OpenAI-compatible API)
- **Endpoint**: `https://api.chatanywhere.tech/v1/chat/completions`
- **Model**: `gpt-3.5-turbo` (configurable via `AI_MODEL` env var)
- **API Key**: Set via `CHATANYWHERE_API_KEY` environment variable
- **Context Window**: Last 50 messages from Ably history
- **Context Format**: Last 15 non-sticker messages with **timestamps** (username + content + time)
- **Temperature**: 0.7 (balanced creativity)
- **Max Tokens**: 300 per response
- **Presence Penalty**: 0.6 (reduce repetition)
- **Frequency Penalty**: 0.3 (encourage variety)

#### Bot Behavior (AI-Driven Decision Making)
**NO CLIENT-SIDE DETECTION** - The AI reads the full chat context and decides whether to respond based on:
- Chat history with **timestamps** (last 15 non-sticker messages)
- Current message content with timestamp
- Conversation flow and timing (can detect if chat is active or idle)
- System prompt instructions
- **Language detection** (responds in same language as user)

The bot **automatically ignores**:
- Sticker-only messages (filtered server-side)
- Messages from moderators (filtered server-side)
- Social chatter between users (AI detects this from context + timing)
- Off-topic conversations (AI returns `[NO_RESPONSE_NEEDED]`)

**Language Support**:
- **English** - Full support
- **Traditional Chinese (Cantonese)** - Full support (繁體中文/廣東話)
- Bot detects user's language and responds accordingly
- Mixed language messages are handled intelligently

#### Enhanced System Prompt
The bot has detailed knowledge of all dse.best pages and features:
- **Homepage** (https://dse.best) - Main dashboard
- **Past Papers** (https://dse.best/resources) - HKDSE past papers by subject/year
- **12P Study Tool** (https://dse.best/resources) - Practice questions
- **Chat** (https://dse.best/chat) - Live student chatroom
- **Cutoff Calculator** (https://dse.best/legacycuttoff) - University admission scores
- **Blog** (https://dse.best/blog) - Study tips and guidance
- **Pomodoro Timer** (https://dse.best/pomodoro) - Focus timer
- **Countdown** (https://dse.best/countdown) - DSE exam countdown
- **Visual Arts** (https://dse.best/visual-arts) - VA resources

The bot can **link to these pages** in responses to guide students effectively.

#### Rate Limiting & Toggle Control
- **Rate Limit**: Minimum 10 seconds between bot responses to same user
- **Redis Toggle**: `/aibot on/off` moderator command to enable/disable bot
- **Default State**: Enabled (unless explicitly disabled by moderator)
- Uses Redis key `ai:bot:enabled` for persistent state

#### Message Flow (Updated - AI-Driven with Timestamps)
1. User sends **non-sticker, non-moderator** message → passes moderation
2. Message published to Ably channel (globally visible)
3. Server checks:
   - Is AI bot enabled? (Redis toggle via `/aibot on/off`)
   - Is user rate-limited? (10s cooldown per user)
4. If checks pass:
   - Fetch last 50 messages from Ably history
   - Format last 15 non-sticker messages with **timestamps**:
     ```
     [21:30] Alice: 點樣用past paper?
     [21:31] DBestBot: 去 https://dse.best/resources 就搵到晒 📚
     [21:32] Bob: thanks!
     [21:35] Charlie: @bot how do I use 12P?
     ```
   - Include AI's own previous responses in history
   - Send to ChatGPT with system prompt + formatted history + current message with timestamp
5. AI analyzes context and decides:
   - **Respond** → Returns helpful message in user's language
   - **Stay silent** → Returns `[NO_RESPONSE_NEEDED]`
6. If AI responds (not `[NO_RESPONSE_NEEDED]`):
   - Publish bot reply to Ably with `isBot: true` flag
   - **Response is globally visible to all users**
7. Bot message appears in chat with purple AI badge

### 2. Frontend (pages/chat.tsx + public/assets/js/chat.js)

#### UI Changes
- **AI Badge**: Purple gradient badge with "AI" text
- **Message Bubble**: Special styling with purple accent border
- **Animation**: Subtle pulse effect on AI badge

#### Message Rendering
- Updated `addMessage()` function to accept `isBot` parameter
- Bot messages display with:
  - Username: "DBestBot"
  - Purple "AI" badge next to name
  - Special bubble styling with gradient background
  - Left border accent in purple

#### CSS Styling
```css
.ai-badge {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  animation: ai-pulse 2s ease-in-out infinite;
}

.chat-bubble.ai-bot {
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
  border-left: 3px solid #667eea;
}
```

## Environment Variables Required

Add these to your Vercel project:

```bash
CHATANYWHERE_API_KEY=sk-your-api-key-here
AI_MODEL=gpt-3.5-turbo  # Optional, defaults to gpt-3.5-turbo
REDIS_URL=redis://your-redis-url  # For rate limiting
ABLY_API_KEY=your-ably-key  # For chat messaging
MOD_SECRET_KEY=your-secret-key  # For moderator auth
```

## Moderator Commands

Moderators can control the AI bot with:
- `/aibot on` - Enable AI bot responses
- `/aibot off` - Disable AI bot responses
- `/help` - See all moderator commands

## Testing the Bot

1. **Direct mention**: Send `@bot hello` or `@dbestbot how do I study?`
2. **Site questions**: Send `how do I use past papers?` or `點樣用12P?`
3. **AI decides**: The bot reads context and decides if it should respond
4. **Should be silent for**: 
   - Social chat between friends (AI detects this)
   - `[excited]` (sticker only - filtered)
   - Off-topic conversations (AI politely declines)

## Bot Capabilities

### What it CAN answer:
- How to use chat features
- How to access past papers
- How to use 12P tools
- How to navigate the site
- HKDSE study strategies using dse.best
- General exam preparation tips

### What it CANNOT answer:
- Life advice, gossip, politics, emotional/mental support, etc non-study/non-student problems
- Non-HKDSE academic questions
- Direct exam answers (will suggest strategies instead)
- Random topics unrelated to studying

## Future Improvements

1. **Context Memory**: Add chat history to AI calls for better context
2. **Advanced Triggers**: Detect when room is idle and proactively help
3. **Feedback System**: Let users rate bot responses
4. **Analytics**: Track which questions are most common
5. **Multi-language**: Better Cantonese/English detection
6. **Fallback Responses**: Pre-written answers for common questions if API fails

## Security Considerations

- Bot messages bypass moderation (trusted source)
- Rate limiting prevents API abuse
- Fire-and-forget async pattern doesn't block user messages
- API key stored securely in environment variables
- Bot cannot be impersonated (server-side flag)

## Cost Estimation

ChatAnywhere pricing (approximate):
- gpt-3.5-turbo: ~$0.002 per 1K tokens
- Average response: ~100-200 tokens
- Cost per response: ~$0.0004
- 1000 bot responses: ~$0.40

Very affordable for moderate usage!
