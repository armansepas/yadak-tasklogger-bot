/**
 * Bot Middleware
 * Middleware functions for access control and other bot behaviors
 */

import { Context, NextFunction } from "grammy";
import { bot, BOT_ADMIN_TELEGRAM_ID } from "./index";

/**
 * Check if the user is the super admin
 */
export function isAdmin(ctx: Context): boolean {
  const userId = ctx.from?.id.toString();
  return userId === BOT_ADMIN_TELEGRAM_ID;
}

/**
 * Middleware to check if the update is from private chat
 */
export async function isPrivateChat(
  ctx: Context,
  next: NextFunction,
): Promise<void> {
  if (ctx.chat?.type === "private") {
    await next();
  }
}

/**
 * Middleware to check if the update is from a group
 */
export async function isGroupChat(
  ctx: Context,
  next: NextFunction,
): Promise<void> {
  if (ctx.chat?.type === "group" || ctx.chat?.type === "supergroup") {
    await next();
  }
}

/**
 * Admin-only middleware - only allows super admin in private chat
 */
export async function adminOnly(
  ctx: Context,
  next: NextFunction,
): Promise<void> {
  // Must be private chat
  if (ctx.chat?.type !== "private") {
    return;
  }

  // Must be admin
  if (!isAdmin(ctx)) {
    await ctx.reply(
      "⛔ Unauthorized. This command is only for the super admin.",
    );
    return;
  }

  await next();
}

/**
 * Allowed group/user middleware - will be implemented in later tasks
 * This is a placeholder for the access control middleware
 */
export async function accessControl(
  ctx: Context,
  next: NextFunction,
): Promise<void> {
  // TODO: Implement access control based on ManagedGroup and ManagedUser status
  // For now, allow all
  await next();
}
