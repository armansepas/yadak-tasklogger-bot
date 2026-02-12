# Reports Handlers

This folder contains handlers for report-related functionality.

## Files

- `dailyReportHandler.ts` - Handles the Daily Report button action. Queries Azure DevOps for user's work items changed in the last 24 hours and sends the formatted report to the user's private chat.

## Usage

The daily report handler is imported and used in `src/bot/handlers/groups/startCommand.ts` for both callback queries and text button clicks.
