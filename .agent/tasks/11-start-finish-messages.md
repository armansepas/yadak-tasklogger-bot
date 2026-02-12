# Task 11: Start/Finish Work Message Formatting

## Overview

Implement formatted message sending for start and finish work announcements with Persian date/time.

## Core Logic

Start Work message includes:

- User name
- Date (Persian format: ۱۴۰۳/۵/۶)
- Time
- Weekday
- Remote/Office flag

Finish Work message:

- Same as start but without flags
- Different message text

## Relations to Code Files

- /src/app/utils/date.ts - Persian date conversion
- /src/app/bot/handlers/work/startWorkHandler.ts
- /src/app/bot/handlers/work/finishWorkHandler.ts
- /src/app/services/workSessionService.ts

## Steps

1. Create Persian date formatting utility
2. Implement Start Work message formatting and sending
3. Implement Finish Work message formatting and sending
4. Store work session with type and location in database
5. Delete user command messages when possible

## Checklist

- [ ] Persian date utility working
- [ ] Start Work message formatted correctly
- [ ] Finish Work message formatted correctly
- [ ] Work sessions stored in database
- [ ] Command messages cleaned up
