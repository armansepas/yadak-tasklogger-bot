# yadak-tasklog-bot

Internal Telegram bot for task logging and work tracking.

## Tech Stack

- **Runtime**: Bun.js
- **Language**: TypeScript
- **Telegram Library**: grammY
- **Database ORM**: Drizzle
- **Database**: SQLite

## Project Structure

```
yadak-tasklog-bot/
├── src/
│   ├── index.ts          # Main entry point
│   ├── bot/              # Bot layer (grammy handlers)
│   ├── db/               # Database layer
│   ├── services/         # Business logic services
│   └── utils/            # Utility functions
├── .env                  # Environment variables (create from .env.example)
├── drizzle.config.ts    # Drizzle configuration
└── package.json
```

## Setup

1. Install dependencies:

   ```bash
   bun install
   ```

2. Copy `.env.example` to `.env` and fill in the values:

   ```
   BOT_TOKEN=<telegram bot token>
   BOT_ADMIN_TELEGRAM_ID=<telegram id of super admin>
   ```

3. Generate database schema:

   ```bash
   bun run db:generate
   ```

4. Push database schema:

   ```bash
   bun run db:push
   ```

5. Start the bot:
   ```bash
   bun run dev
   ```

## Environment Variables

| Variable                | Description                                 |
| ----------------------- | ------------------------------------------- |
| `BOT_TOKEN`             | Telegram bot token                          |
| `BOT_ADMIN_TELEGRAM_ID` | Telegram ID of super admin                  |
| `PROXY_URL`             | (Optional) Proxy URL for Cloudflare Workers |

## Features

- Start/Finish work announcements with buttons
- Daily report generation with Azure DevOps integration
- Off-day reminder scheduling
- Super-admin group/user approval system
- Message tracking and cleanup
