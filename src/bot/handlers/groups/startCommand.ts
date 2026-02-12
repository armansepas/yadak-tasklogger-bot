/**
 * Group Command Handlers
 * Handles /start command and callback queries for work sessions
 */

import { Context, Keyboard } from "grammy";
import { bot } from "../../index";
import {
  findUserByTelegramId,
  findGroupByTelegramId,
} from "../../../db/queries";
import {
  createWorkSession,
  findLatestSessionByUserId,
} from "../../../db/queries/workSession";
import {
  WorkTypeEnum,
  WorkLocationEnum,
  type WorkLocation,
} from "../../../db/schema";
import {
  buildMainKeyboard,
  buildLocationKeyboard,
  CallbackData,
} from "../../keyboards/main";
import {
  formatPersianDate,
  formatPersianTime,
  formatPersianWeekday,
} from "../../../utils/date";
import { startPatTokenFlow } from "../user/setPatTokenHandler";

/**
 * Setup group command handlers
 */
export function setupGroupHandlers(): void {
  // Handle /start command in groups
  bot.command("start", handleStartCommand);

  // Handle inline keyboard callbacks
  bot.callbackQuery(
    [
      CallbackData.START_WORK,
      CallbackData.FINISH_WORK,
      CallbackData.DAILY_REPORT,
      CallbackData.SET_PAT_TOKEN,
      CallbackData.LOCATION_OFFICE,
      CallbackData.LOCATION_REMOTE,
    ],
    handleCallbackQuery,
  );

  // Handle text button clicks in groups
  bot.hears("شروع کار", handleStartWorkText);
  bot.hears("پایان کار", handleFinishWorkText);
  bot.hears("گزارش روزانه", handleDailyReportText);
  bot.hears("تنظیم توکن", handleSetPatTokenText);
  bot.hears("🏢 دفتر", handleOfficeText);
  bot.hears("🏠 remote", handleRemoteText);
}

/**
 * Handle /start command in groups
 */
async function handleStartCommand(ctx: Context): Promise<void> {
  // Delete the command message
  if (ctx.message?.message_id) {
    ctx.api.deleteMessage(ctx.chat!.id, ctx.message.message_id).catch(() => {});
  }

  const welcomeMessage = `
👋 <b>خوش آمدید!</b>

از دکمه‌های زیر استفاده کنید:
`;

  // Send main keyboard
  await ctx.reply(welcomeMessage, {
    parse_mode: "HTML",
    reply_markup: buildMainKeyboard(),
  });
}

/**
 * Handle callback queries from inline keyboard
 */
async function handleCallbackQuery(ctx: Context): Promise<void> {
  const callbackData = ctx.callbackQuery?.data;

  if (!callbackData) return;

  // Answer the callback to stop loading animation
  await ctx.answerCallbackQuery();

  switch (callbackData) {
    case CallbackData.START_WORK:
      await handleStartWork(ctx);
      break;
    case CallbackData.FINISH_WORK:
      await handleFinishWork(ctx);
      break;
    case CallbackData.DAILY_REPORT:
      await handleDailyReport(ctx);
      break;
    case CallbackData.SET_PAT_TOKEN:
      await handleSetPatToken(ctx);
      break;
    case CallbackData.LOCATION_OFFICE:
      await handleLocationSelection(ctx, WorkLocationEnum.OFFICE);
      break;
    case CallbackData.LOCATION_REMOTE:
      await handleLocationSelection(ctx, WorkLocationEnum.REMOTE);
      break;
  }
}

/**
 * Handle Start Work action - show location selection
 */
async function handleStartWork(ctx: Context): Promise<void> {
  const locationMessage = `
🏢 <b>محل کار را انتخاب کنید:</b>
`;

  await ctx.editMessageText(locationMessage, {
    parse_mode: "HTML",
    reply_markup: buildLocationKeyboard(),
  });
}

/**
 * Handle Finish Work action - record session and send message
 */
async function handleFinishWork(ctx: Context): Promise<void> {
  const userId = ctx.from?.id.toString();
  const chatId = ctx.chat?.id.toString();

  if (!userId || !chatId) {
    await ctx.reply("❌ خطا در پردازش درخواست");
    return;
  }

  // Get user and group from database
  const user = await findUserByTelegramId(userId);
  const group = await findGroupByTelegramId(chatId);

  if (!user || !group) {
    await ctx.reply("❌ کاربر یا گروه یافت نشد");
    return;
  }

  // Create work session
  const now = new Date();
  await createWorkSession({
    userId: user.id,
    groupId: group.id,
    type: WorkTypeEnum.FINISH,
    location: undefined,
    timestamp: now,
  });

  // Format message
  const userName = ctx.from?.first_name || "همکار";
  const message = `
🔚 <b>پایان کار</b>

👤 <b>${userName}</b>
📅 ${formatPersianDate(now)}
🕐 ${formatPersianTime(now)}
📆 ${formatPersianWeekday(now)}
`;

  // Send message to group
  await ctx.editMessageText(message, {
    parse_mode: "HTML",
    reply_markup: undefined,
  });
}

/**
 * Handle location selection for Start Work
 */
async function handleLocationSelection(
  ctx: Context,
  location: WorkLocation,
): Promise<void> {
  const userId = ctx.from?.id.toString();
  const chatId = ctx.chat?.id.toString();

  if (!userId || !chatId) {
    await ctx.reply("❌ خطا در پردازش درخواست");
    return;
  }

  // Get user and group from database
  const user = await findUserByTelegramId(userId);
  const group = await findGroupByTelegramId(chatId);

  if (!user || !group) {
    await ctx.reply("❌ کاربر یا گروه یافت نشد");
    return;
  }

  // Create work session
  const now = new Date();
  await createWorkSession({
    userId: user.id,
    groupId: group.id,
    type: WorkTypeEnum.START,
    location: location,
    timestamp: now,
  });

  // Format message
  const userName = ctx.from?.first_name || "همکار";
  const locationText =
    location === WorkLocationEnum.OFFICE ? "🏢 دفتر" : "🏠 دورکاری";
  const message = `
🚀 <b>شروع کار</b>

👤 <b>${userName}</b>
📅 ${formatPersianDate(now)}
🕐 ${formatPersianTime(now)}
📆 ${formatPersianWeekday(now)}
📍 ${locationText}
`;

  // Send message to group
  await ctx.editMessageText(message, {
    parse_mode: "HTML",
    reply_markup: undefined,
  });
}

/**
 * Handle Daily Report action
 */
async function handleDailyReport(ctx: Context): Promise<void> {
  const userId = ctx.from?.id.toString();

  if (!userId) {
    await ctx.reply("❌ خطا در پردازش درخواست");
    return;
  }

  // Get user from database
  const user = await findUserByTelegramId(userId);

  if (!user) {
    await ctx.reply("❌ کاربر یافت نشد");
    return;
  }

  // Check if user has PAT token
  if (!user.patToken) {
    await ctx.editMessageText(
      "⚠️ <b>توکن Azure DevOps تنظیم نشده است.</b>\n\nلطفاً ابتدا توکن خود را تنظیم کنید.",
      {
        parse_mode: "HTML",
        reply_markup: undefined,
      },
    );
    return;
  }

  // Decrypt the token
  const { decryptToken } = await import("../../../utils/crypto");
  const decryptedToken = decryptToken(user.patToken);

  // Get Azure DevOps service
  const { getDailyWorkItems } = await import("../../../services/azure-devops");

  try {
    // Fetch daily work items
    const workItems = await getDailyWorkItems(decryptedToken);

    // Format the response
    const today = formatPersianDate();
    let message = `📊 <b>گزارش روزانه</b>\n\n📅 تاریخ: ${today}\n\n`;

    if (workItems.length === 0) {
      message += "📭 وظیفه‌ای برای امروز یافت نشد.";
    } else {
      message += `📋 <b>${workItems.length} وظیفه:</b>\n\n`;

      for (const item of workItems) {
        const title = item["System.Title"] as string;
        const state = item["System.State"] as string;
        const id = item["id"];

        // State emoji
        const stateEmoji =
          state === "Done" ? "✅" : state === "In Progress" ? "⏳" : "⬜";

        message += `${stateEmoji} <a href="https://dev.azure.com/Yadakdotcom/Yadak.com/_workitems/edit/${id}">#${id}</a> ${title}\n`;
      }
    }

    await ctx.editMessageText(message, {
      parse_mode: "HTML",
      reply_markup: undefined,
    });
  } catch (error) {
    console.error("Azure DevOps error:", error);
    await ctx.editMessageText(
      "❌ <b>خطا در دریافت گزارش</b>\n\nلطفاً توکن خود را بررسی کنید.",
      { parse_mode: "HTML", reply_markup: undefined },
    );
  }
}

/**
 * Handle Set PAT Token action - starts the token input flow in private chat
 */
async function handleSetPatToken(ctx: Context): Promise<void> {
  const telegramId = ctx.from?.id.toString();

  if (!telegramId) {
    await ctx.reply("❌ خطا در پردازش درخواست");
    return;
  }

  // Get user from database
  const user = await findUserByTelegramId(telegramId);

  if (!user) {
    await ctx.editMessageText(
      "❌ <b>کاربر یافت نشد.</b>\n\nابتدا در یک گروه مجاز /start را بزنید.",
      { parse_mode: "HTML", reply_markup: undefined },
    );
    return;
  }

  // Start the PAT token flow in private chat
  await startPatTokenFlow(ctx);

  // Update the group message
  await ctx.editMessageText(
    "🔐 <b>توکن Azure DevOps</b>\n\n" +
      "لطفاً توکن خود را در پیام خصوصی ارسال شده وارد کنید.",
    { parse_mode: "HTML", reply_markup: undefined },
  );
}

// Text button handlers (for Keyboard buttons)

async function handleStartWorkText(ctx: Context): Promise<void> {
  await handleStartWork(ctx);
}

async function handleFinishWorkText(ctx: Context): Promise<void> {
  await handleFinishWork(ctx);
}

async function handleDailyReportText(ctx: Context): Promise<void> {
  await handleDailyReport(ctx);
}

async function handleSetPatTokenText(ctx: Context): Promise<void> {
  await handleSetPatToken(ctx);
}

async function handleOfficeText(ctx: Context): Promise<void> {
  await handleLocationSelection(ctx, WorkLocationEnum.OFFICE);
}

async function handleRemoteText(ctx: Context): Promise<void> {
  await handleLocationSelection(ctx, WorkLocationEnum.REMOTE);
}
