# yadak-tasklog-bot

Internal Telegram bot for task logging and work tracking.

## Quick Start

To start the bot:

```bash
bun run dev
```

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
│   ├── index.ts              # Main entry point - starts bot polling
│   ├── bot/
│   │   ├── index.ts          # Bot initialization with proxy support
│   │   ├── middleware.ts     # Access control middleware
│   │   ├── handlers/        # Command and callback handlers
│   │   │   ├── admin.ts     # Super admin commands
│   │   │   ├── discovery.ts # Group/user approval flow
│   │   │   ├── groups/      # Group commands (/start, buttons)
│   │   │   ├── reports/     # Daily report handlers
│   │   │   └── user/        # User settings (PAT token)
│   │   └── keyboards/       # Inline keyboard definitions
│   ├── db/
│   │   ├── index.ts          # Database client initialization
│   │   ├── schema.ts        # Drizzle schema (tables)
│   │   └── queries/         # Database query functions
│   ├── services/
│   │   ├── azure-devops.ts   # Azure DevOps API integration
│   │   └── messageService.ts # Bot message management
│   └── utils/
│       ├── date.ts           # Date/time utilities
│       └── crypto.ts         # Encryption utilities
├── .env                      # Environment variables
├── drizzle.config.ts         # Drizzle configuration
└── package.json
```

### Code Navigation for Developers

- **Bot logic**: Start with [`src/bot/index.ts`](src/bot/index.ts) to understand bot initialization
- **Handlers**: See [`src/bot/handlers/`](src/bot/handlers/) for all command handlers
- **Database**: Check [`src/db/schema.ts`](src/db/schema.ts) for table definitions
- **Services**: [`src/services/`](src/services/) contains Azure DevOps integration

## Setup

1. Install dependencies:

   ```bash
   bun install
   ```

2. Copy `.env.example` to `.env` and fill in the values:

   ```
   BOT_TOKEN=<telegram bot token>
   BOT_ADMIN_TELEGRAM_ID=<telegram id of super admin>
   PROXY_URL=<optional cloudflare worker proxy>
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

| Variable                | Description                                                 |
| ----------------------- | ----------------------------------------------------------- |
| `BOT_TOKEN`             | Telegram bot token                                          |
| `BOT_ADMIN_TELEGRAM_ID` | Telegram ID of super admin                                  |
| `PROXY_URL`             | (Optional) Cloudflare Workers proxy URL (without bot token) |
| `AZURE_DEVOPS_BASE_URL` | Azure DevOps instance URL                                   |
| `ENCRYPTION_KEY`        | Key for encrypting PAT tokens                               |

---

## For Telegram Users

### Initial Setup (Super Admin)

1. Start a private chat with the bot
2. Use `/groups` to see all groups
3. Use `/users` to see all users
4. Approve/reject groups and users using buttons

### Adding a New Group

1. Invite the bot to a Telegram group
2. The bot will notify the super admin
3. Super admin approves the group via buttons
4. Once approved, users can use the bot

### Using the Bot in Groups

After the group is approved:

1. Type `/start` to see the main menu
2. Use the inline buttons:
   - **Start Work** - Log work start (office or remote)
   - **Finish Work** - Log work finish
   - **Daily Report** - Get Azure DevOps tasks for today
   - **Set PAT Token** - Configure your Azure DevOps PAT

### Setting Your PAT Token

1. Click **Set PAT Token** button
2. Enter your Azure DevOps Personal Access Token
3. The token is encrypted before storing

---

## Features

- Start/Finish work announcements with buttons
- Daily report generation with Azure DevOps integration
- Off-day reminder scheduling (future)
- Super-admin group/user approval system
- Message tracking and cleanup
- Proxy support via Cloudflare Workers
