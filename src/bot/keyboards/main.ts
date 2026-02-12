/**
 * Main Inline Keyboards
 * Inline keyboard definitions for group commands
 */

import { Keyboard } from "grammy";

/**
 * Main menu keyboard for groups
 * Contains: Start Work, Finish Work, Daily Report, Set PAT Token
 */
export function getMainKeyboard(): Keyboard {
  return new Keyboard()
    .text("شروع کار")
    .text("پایان کار")
    .row()
    .text("گزارش روزانه")
    .text("تنظیم توکن");
}

/**
 * Location selection keyboard for Start Work
 * Contains: Office, Remote
 */
export function getLocationKeyboard(): Keyboard {
  return new Keyboard().text("🏢 دفتر").text("🏠 remote");
}

/**
 * Callback data prefixes
 */
export const CallbackData = {
  // Work session actions
  START_WORK: "start_work",
  FINISH_WORK: "finish_work",
  DAILY_REPORT: "daily_report",
  SET_PAT_TOKEN: "set_pat_token",

  // Location selection
  LOCATION_OFFICE: "location_office",
  LOCATION_REMOTE: "location_remote",

  // PAT token actions
  CONFIRM_PAT_TOKEN: "confirm_pat_token",
  CANCEL_PAT_TOKEN: "cancel_pat_token",
} as const;

/**
 * Build inline keyboard for main menu
 */
export function buildMainKeyboard(): {
  inline_keyboard: Array<Array<{ text: string; callback_data: string }>>;
} {
  return {
    inline_keyboard: [
      [
        { text: "🚀 شروع کار", callback_data: CallbackData.START_WORK },
        { text: "🔚 پایان کار", callback_data: CallbackData.FINISH_WORK },
      ],
      [
        { text: "📊 گزارش روزانه", callback_data: CallbackData.DAILY_REPORT },
        { text: "🔐 تنظیم توکن", callback_data: CallbackData.SET_PAT_TOKEN },
      ],
    ],
  };
}

/**
 * Build inline keyboard for location selection
 */
export function buildLocationKeyboard(): {
  inline_keyboard: Array<Array<{ text: string; callback_data: string }>>;
} {
  return {
    inline_keyboard: [
      [
        {
          text: "🏢 دفتر (Office)",
          callback_data: CallbackData.LOCATION_OFFICE,
        },
        {
          text: "🏠 دورکاری (Remote)",
          callback_data: CallbackData.LOCATION_REMOTE,
        },
      ],
    ],
  };
}

/**
 * Build inline keyboard for PAT token confirmation
 */
export function buildPatTokenKeyboard(): {
  inline_keyboard: Array<Array<{ text: string; callback_data: string }>>;
} {
  return {
    inline_keyboard: [
      [
        { text: "✅ تأیید", callback_data: CallbackData.CONFIRM_PAT_TOKEN },
        { text: "❌ لغو", callback_data: CallbackData.CANCEL_PAT_TOKEN },
      ],
    ],
  };
}
