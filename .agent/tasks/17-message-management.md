# Task 17: Message Management

## Overview

Implement bot message tracking for cleanup and delete actions.

## Core Logic

- Store bot message references in BotMessage table
- In a workflow, delete previous bot messages before sending new one
- Only informational bot messages should remain in chat

## Relations to Code Files

- /src/app/services/messageService.ts
- /src/app/bot/handlers/ - All handlers

## Steps

1. Create message tracking on bot send
2. Implement message cleanup function
3. Delete old bot messages in workflow
4. Keep latest informational message

## Checklist

- [x] Bot messages tracked in database
- [x] Previous messages cleaned up
- [x] Latest message preserved
- [x] Workflow working correctly
