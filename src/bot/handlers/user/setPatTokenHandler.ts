/**
 * Set PAT Token Handler
 * Handles PAT token input in private messages
 */

import { Context } from "grammy";
import { bot } from "../../index";
import { findUserByTelegramId, updateUserPatToken } from "../../../db/queries";
import { getUserState, setUserState, clearUserState } from "./userState";
import { encryptToken } from "../../../utils/crypto";
import { buildPatTokenKeyboard } from "../../keyboards/main";

/**
 * Setup PAT token handlers
 */
export function setupPatTokenHandlers(): void {
  // Handle text messages in private chat for token input
  bot.on("message:text", handlePrivateMessage);
}

/**
 * Handle private message for PAT token input
 */
async function handlePrivateMessage(ctx: Context): Promise<void> {
  // Only handle private messages
  if (!ctx.message || ctx.chat?.type !== "private") {
    return;
  }

  const telegramId = ctx.from?.id.toString();
  if (!telegramId) return;

  const userState = getUserState(telegramId);

  if (userState === "waiting_for_pat_token") {
    await handleTokenInput(ctx, telegramId);
  }
}

/**
 * Handle token input from user
 */
async function handleTokenInput(
  ctx: Context,
  telegramId: string,
): Promise<void> {
  const token = ctx.message?.text?.trim();

  if (!token) {
    await ctx.reply("❌ توکن نباید خالی باشد. لطفاً توکن خود را وارد کنید:");
    return;
  }

  // Encrypt the token
  const encryptedToken = encryptToken(token);

  // Get user from database
  const user = await findUserByTelegramId(telegramId);

  if (!user) {
    await ctx.reply(
      "❌ کاربر یافت نشد. لطفاً ابتدا در یک گروه مجاز /start را بزنید.",
    );
    clearUserState(telegramId);
    return;
  }

  // Save encrypted token to database
  await updateUserPatToken(user.id, encryptedToken);

  // Clear user state
  clearUserState(telegramId);

  // Show confirmation with masked token
  const maskedToken =
    token.substring(0, 4) + "****" + token.substring(token.length - 4);

  await ctx.reply(
    `✅ <b>توکن با موفقیت ذخیره شد!</b>\n\n` +
      `توکن: <code>${maskedToken}</code>\n\n` +
      `اکنون می‌توانید از قابلیت گزارش روزانه استفاده کنید.`,
    { parse_mode: "HTML" },
  );
}

/**
 * Start the PAT token input flow - sends a private message to user
 */
export async function startPatTokenFlow(ctx: Context): Promise<void> {
  const telegramId = ctx.from?.id.toString();
  const chatId = ctx.from?.id.toString();

  if (!telegramId || !chatId) {
    await ctx.reply("❌ خطا در پردازش درخواست");
    return;
  }

  // Set user state to waiting for token
  setUserState(telegramId, "waiting_for_pat_token");

  // Send private message to user
  const message = `
🔐 <b>تنظیم توکن Azure DevOps</b>

لطفاً توکن شخصی (PAT) خود را وارد کنید.

برای ایجاد توکن:
1. به Azure Devops بروید
2. روی آواتار خود کلیک کنید
3. Security → Personal access tokens
4. یک توکن جدید بسازید با دسترسی‌های Read & Write برای Work Items

⚠️ توکن شما به صورت امن ذخیره می‌شود.
  `;

  await ctx.reply(message, { parse_mode: "HTML" });
}
