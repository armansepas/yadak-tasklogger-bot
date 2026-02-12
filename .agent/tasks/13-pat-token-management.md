# Task 13: PAT Token Management

## Overview

Implement PAT token storage and retrieval for Azure DevOps authentication per user.

## Core Logic

- Users can set their PAT token via button
- Token stored encrypted in ManagedUser table
- Users can update their PAT token anytime
- PAT token used only for Azure DevOps queries

## Relations to Code Files

- /src/app/bot/handlers/user/setPatTokenHandler.ts
- /src/app/services/userService.ts
- /src/app/utils/crypto.ts - Token encryption

## Steps

1. Create token encryption utility
2. Implement "Set PAT Token" button handler
3. Ask user for PAT token via private message
4. Store encrypted token in database
5. Implement token retrieval for Azure DevOps queries

## Checklist

- [x] Token encryption utility working
- [x] "Set PAT Token" button working
- [x] Private message prompt for token
- [x] Token stored encrypted in database
- [x] Token retrievable for queries
