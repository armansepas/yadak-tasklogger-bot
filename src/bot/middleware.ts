/**
 * Bot Middleware
 * Simplified middleware - no access control, everyone is welcome
 */

import { Context, NextFunction } from "grammy";

/**
 * Get the user's Telegram ID as string
 */
export function getUserTelegramId(ctx: Context): string | undefined {
  return ctx.from?.id.toString();
}

/**
 * Get the chat's Telegram ID as string
 */
export function getChatTelegramId(ctx: Context): string | undefined {
  return ctx.chat?.id.toString();
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
 * Simple pass-through middleware - allows all updates
 */
export async function accessControl(
  ctx: Context,
  next: NextFunction,
): Promise<void> {
  await next();
}
