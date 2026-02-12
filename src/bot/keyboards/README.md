# Bot Keyboards

This folder contains inline keyboard definitions for the bot.

## Files

- `main.ts` - Main inline keyboard definitions for group commands
  - Start Work button
  - Finish Work button
  - Daily Report button
  - Set PAT Token button
  - Location selection keyboard (Office/Remote)

## Usage

Import the keyboard builders:

```typescript
import { buildMainKeyboard, buildLocationKeyboard } from "./keyboards/main";

// For inline keyboard
await ctx.reply("Message", {
  reply_markup: buildMainKeyboard(),
});
```
