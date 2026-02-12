# Task 18: Bot Startup & Entry Point

## Overview

Create the main entry point that starts the bot and scheduler.

## Core Logic

- Initialize bot
- Start bot polling
- Start scheduler
- Handle graceful shutdown

## Relations to Code Files

- /src/app/index.ts - Main entry point
- /src/app/bot/index.ts
- /src/app/scheduler/index.ts

## Steps

1. Create main index.ts entry point
2. Initialize database connection
3. Start bot polling
4. Start scheduler
5. Handle process signals for graceful shutdown

## Checklist

- [x] Entry point created
- [x] Bot starts polling
- [ ] Scheduler starts running (not implemented yet)
- [x] Graceful shutdown handling
- [x] No HTTP server used
