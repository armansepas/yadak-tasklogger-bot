# Task 14: Daily Report Handler

## Overview

Implement Daily Report button handler that queries Azure DevOps and sends formatted report to user.

## Core Logic

- User clicks "گزارش روزانه" (Daily Report) button
- Check if user has PAT token set
- Query Azure DevOps for user's work items changed in last 24 hours
- Format results with Persian date header
- Send report to user's private chat

## Relations to Code Files

- /src/app/bot/handlers/reports/dailyReportHandler.ts
- /src/app/services/azureDevopsService.ts
- /src/app/services/userService.ts

## Steps

1. Handle Daily Report callback query
2. Check if user has PAT token
3. If no token, prompt user to set PAT token
4. Call Azure DevOps API with user's token
5. Format response with Persian date
6. Send report to user's private chat

## Checklist

- [ ] Daily Report button working
- [ ] PAT token check implemented
- [ ] Prompt for token if not set
- [ ] Azure DevOps query working
- [ ] Persian date formatting in report
- [ ] Report sent to private chat
