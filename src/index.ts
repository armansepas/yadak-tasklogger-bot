/**
 * Yadak TaskLog Bot
 * Main entry point
 */

import "dotenv/config";

// Initialize database (imports and initializes the client)
import "./db";

// Import bot instance
import { bot } from "./bot";

// Get admin ID from environment
const BOT_ADMIN_TELEGRAM_ID: string = process.env.BOT_ADMIN_TELEGRAM_ID!;
if (!BOT_ADMIN_TELEGRAM_ID) {
  console.error("BOT_ADMIN_TELEGRAM_ID is not set");
  process.exit(1);
}

console.log("Yadak TaskLog Bot starting...");

// Track running state for graceful shutdown
let isShuttingDown = false;

// Start bot polling
async function startBot() {
  try {
    // Start bot directly - proxy is working (404 means request reached worker)
    await bot.start();
    console.log("Bot started successfully");

    // Send startup notification to admin
    try {
      await bot.api.sendMessage(
        BOT_ADMIN_TELEGRAM_ID,
        "🤖 Bot started successfully!\n\nWaiting for commands...",
      );
    } catch (e) {
      console.error("Failed to notify admin:", e);
    }
  } catch (error) {
    console.error("Failed to start bot:", error);
    process.exit(1);
  }
}

// Handle graceful shutdown
function setupGracefulShutdown() {
  const shutdown = async (signal: string) => {
    if (isShuttingDown) {
      console.log("Shutdown already in progress...");
      return;
    }

    isShuttingDown = true;
    console.log(`\n${signal} received, shutting down gracefully...`);

    try {
      // Stop the bot
      await bot.stop();
      console.log("Bot stopped");

      // Send shutdown notification to admin
      try {
        await bot.api.sendMessage(
          BOT_ADMIN_TELEGRAM_ID,
          "⚠️ Bot is shutting down...",
        );
      } catch (e) {
        // Ignore errors during shutdown
      }

      console.log("Shutdown complete");
      process.exit(0);
    } catch (error) {
      console.error("Error during shutdown:", error);
      process.exit(1);
    }
  };

  // Handle various termination signals
  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGQUIT", () => shutdown("SIGQUIT"));
}

// Start the bot
setupGracefulShutdown();
startBot();
