# Bot Handlers

This folder contains handler modules for different bot functionalities.

## Files

- `discovery.ts` - Handles Group and User Discovery Flow
  - Callback query handlers for approve/reject buttons
  - Updates group/user status in database

## Setup

Import and call the setup functions in the main bot entry point:

```typescript
import { setupDiscoveryHandlers } from "./handlers/discovery";

// In main setup
setupDiscoveryHandlers();
```
