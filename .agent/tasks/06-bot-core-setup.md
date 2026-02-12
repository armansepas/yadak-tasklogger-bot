# Task 06: Bot Core Setup

## Overview

Initialize the grammY bot instance with token and optional proxy support.

## Core Logic

- Create bot instance using BOT_TOKEN from environment
- Apply proxy middleware if PROXY_URL is set
- Set up error handling and logging

## Relations to Code Files

- /src/app/bot/index.ts - Bot instance
- /src/app/bot/middleware.ts - Middleware functions

## Steps

1. Create bot instance with grammY
2. Add proxy configuration if needed
3. Set up error handlers
4. Export bot for use in other modules

## Checklist

- [ ] Bot instance created
- [ ] Proxy configured (if needed)
- [ ] Error handling in place
- [ ] Bot exported for use
