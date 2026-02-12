# Task 08: Group Discovery Flow

## Overview

Implement automatic group and user discovery when bot receives first message from a new group.

## Core Logic

- When bot receives update from unknown group/user:
  - Insert group with status='pending' into ManagedGroup
  - Insert user with status='pending' into ManagedUser
  - Send notification to super admin in private chat
  - Send approval message with Approve/Reject inline buttons
  - Store admin message reference for tracking

## Relations to Code Files

- /src/app/bot/handlers/discovery.ts
- /src/app/services/groupService.ts
- /src/app/services/userService.ts

## Steps

1. Create group and user insert functions
2. Implement super admin notification
3. Create inline keyboard with Approve/Reject buttons
4. Handle callback queries from approval buttons
5. Store admin message reference

## Checklist

- [x] New groups created with pending status
- [x] New users created with pending status
- [x] Super admin notified
- [x] Approval buttons working
- [x] Admin message reference stored
