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

- [x] /start command working in groups
- [x] Inline keyboard displayed with 4 buttons
- [x] Start Work shows office/remote selection
- [x] Finish Work records session
- [x] Work sessions stored in database
