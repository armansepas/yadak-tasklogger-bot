# Task 10: Group Commands & Start/Finish Work

## Overview

Implement /start command and inline keyboard with Start Work, Finish Work, Daily Report, and Set PAT Token buttons.

## Core Logic

- /start command in groups shows inline keyboard
- Inline keyboard buttons:
  - "شروع کار" (Start Work) → shows office/remote selection
  - "پایان کار" (Finish Work)
  - "گزارش روزانه" (Daily Report)
  - "تنظیم توکن" (Set PAT Token)

## Relations to Code Files

- /src/app/bot/handlers/groups/startCommand.ts
- /src/app/bot/keyboards/main.ts - Inline keyboard definitions
- /src/app/services/workSessionService.ts
- /src/app/utils/date.ts - Persian date formatting

## Steps

1. Implement /start command handler
2. Create main inline keyboard with 4 buttons
3. Handle Start Work callback - show office/remote selection
4. Handle Finish Work callback - record session
5. Implement work session storage in database

## Checklist

- [ ] /start command working in groups
- [ ] Inline keyboard displayed with 4 buttons
- [ ] Start Work shows office/remote selection
- [ ] Finish Work records session
- [ ] Work sessions stored in database
