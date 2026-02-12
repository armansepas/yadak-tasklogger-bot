# Group Handlers

This folder contains handlers for group-specific commands and interactions.

## Files

- `startCommand.ts` - Handles /start command and work session callbacks
  - /start command in groups
  - Start Work callback - shows office/remote selection
  - Finish Work callback - records session
  - Daily Report callback - placeholder for Azure DevOps integration
  - Set PAT Token callback - for PAT token management
  - Location selection (Office/Remote)

## Setup

Import and call the setup function in the main bot entry point:

```typescript
import { setupGroupHandlers } from "./handlers/groups/startCommand";

setupGroupHandlers();
```

The handlers are automatically protected by the accessControl middleware.
