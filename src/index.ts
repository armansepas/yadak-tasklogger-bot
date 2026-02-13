/**
 * Yadak TaskLog Bot
 * Main entry point
 */

import "dotenv/config";

// Initialize database (imports and initializes the client)
import "./db";

// Import bot instance
import { bot } from "./bot";

console.log("Yadak TaskLog Bot starting...");

// Track running state for graceful shutdown
let isShuttingDown = false;

// Start bot polling
async function startBot() {
  try {
    await bot.start();
    console.log("Bot started successfully");
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
