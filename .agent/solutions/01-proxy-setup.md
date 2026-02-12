# Proxy Setup Solution

## Problem

When setting up a Cloudflare Workers proxy for the Telegram bot, the connection would fail with 404 errors. The bot was unable to communicate through the proxy.

## Root Cause

grammy automatically appends `/bot{bot_token}` to the API root URL. If your proxy URL already includes the bot token, grammY would create an incorrect URL.

For example, with:

```
PROXY_URL="https://my-telegram-proxy.workers.dev/bot8541369757:AAH5Yz..."
```

grammy would call:

```
https://my-telegram-proxy.workers.dev/bot8541369757:AAH5Yz.../bot8541369757:AAH5Yz.../getMe
```

This results in a 404 because the endpoint doesn't exist.

## Solution

The proxy URL should NOT include the bot token. grammY adds it automatically.

### Correct Configuration

In `.env`:

```bash
# Don't include the bot token in PROXY_URL
PROXY_URL="https://my-telegram-proxy.workers.dev"

# BOT_TOKEN should still be set separately
BOT_TOKEN=8541369757:AAH5Yz1a8c1mpRxv2e5whWwxe-8ptyq8yTM
```

grammy will then call:

```
https://my-telegram-proxy.workers.dev/bot8541369757:AAH5Yz1a8c1mpRxv2e5whWwxe-8ptyq8yTM/getMe
```

## Code Implementation

In `src/bot/index.ts`:

```typescript
const apiRoot = PROXY_URL ? PROXY_URL : "https://api.telegram.org/bot";

const bot = new Bot(BOT_TOKEN, {
  client: {
    apiRoot,
  },
});
```

## Testing

Test your proxy directly:

```bash
# GET request
curl "https://your-proxy.workers.dev/bot<TOKEN>/getMe"

# POST request
curl -X POST "https://your-proxy.workers.dev/bot<TOKEN>/sendMessage" \
  -H "Content-Type: application/json" \
  -d '{"chat_id": "<YOUR_ID>", "text": "hello"}'
```

Both should return valid JSON responses.
