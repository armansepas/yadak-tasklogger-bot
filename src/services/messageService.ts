/**
 * Message Service
 * Handles bot message tracking and cleanup
 */

import { Api } from "grammy";
import {
  createBotMessage,
  findMessagesByChatIdAndType,
  getLatestMessageByChatIdAndType,
} from "../db/queries/message";

// Message types for categorization
export const MessageType = {
  WELCOME: "welcome",
  START_WORK: "start_work",
  FINISH_WORK: "finish_work",
  DAILY_REPORT: "daily_report",
  SET_PAT_TOKEN: "set_pat_token",
  LOCATION_SELECT: "location_select",
} as const;

export type MessageType = (typeof MessageType)[keyof typeof MessageType];

/**
 * Track a bot message after sending
 */
export async function trackMessage(
  api: Api,
  chatId: string,
  messageId: number,
  type: MessageType,
  userId?: number,
): Promise<void> {
  await createBotMessage({
    chatId,
    messageId,
    userId,
    type,
  });
}

/**
 * Clean up old messages of a specific type in a chat before sending new one
 * Deletes old messages and returns the new message tracking info
 */
export async function cleanupAndTrack(
  api: Api,
  chatId: string,
  newMessageId: number,
  type: MessageType,
  userId?: number,
): Promise<void> {
  // Find old messages of this type
  const oldMessages = await findMessagesByChatIdAndType(chatId, type);

  // Delete old messages from Telegram
  for (const msg of oldMessages) {
    try {
      await api.deleteMessage(chatId, msg.messageId);
    } catch (error) {
      // Message may already be deleted, ignore
    }
  }

  // Track the new message
  await trackMessage(api, chatId, newMessageId, type, userId);
}

/**
 * Send a message and track it (replaces old messages of same type)
 */
export async function sendAndTrackMessage(
  api: Api,
  chatId: string,
  text: string,
  type: MessageType,
  options?: {
    userId?: number;
    parseMode?: "HTML" | "Markdown";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    replyMarkup?: any;
  },
): Promise<number> {
  // First cleanup old messages of this type
  const oldMessages = await findMessagesByChatIdAndType(chatId, type);

  // Delete old messages from Telegram
  for (const msg of oldMessages) {
    try {
      await api.deleteMessage(chatId, msg.messageId);
    } catch (error) {
      // Message may already be deleted, ignore
    }
  }

  // Send the new message
  const sentMessage = await api.sendMessage(chatId, text, {
    parse_mode: options?.parseMode,
    reply_markup: options?.replyMarkup,
  });

  // Track the new message
  await trackMessage(
    api,
    chatId,
    sentMessage.message_id,
    type,
    options?.userId,
  );

  return sentMessage.message_id;
}

/**
 * Edit a message and update tracking
 */
export async function editAndTrackMessage(
  api: Api,
  chatId: string,
  messageId: number,
  text: string,
  type: MessageType,
  options?: {
    userId?: number;
    parseMode?: "HTML" | "Markdown";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    replyMarkup?: any;
  },
): Promise<void> {
  // Edit the message
  await api.editMessageText(chatId, messageId, text, {
    parse_mode: options?.parseMode,
    reply_markup: options?.replyMarkup,
  });

  // Get existing message record
  const existing = await getLatestMessageByChatIdAndType(chatId, type);

  // If exists and different messageId, delete old one
  if (existing && existing.messageId !== messageId) {
    try {
      await api.deleteMessage(chatId, existing.messageId);
    } catch (error) {
      // Ignore if already deleted
    }
  }

  // Track with the new message ID
  await trackMessage(api, chatId, messageId, type, options?.userId);
}

/**
 * Delete all tracked messages for a chat
 */
export async function deleteAllTrackedMessages(
  api: Api,
  chatId: string,
): Promise<void> {
  const messages = await findMessagesByChatIdAndType(chatId, "");

  for (const msg of messages) {
    try {
      await api.deleteMessage(chatId, msg.messageId);
    } catch (error) {
      // Ignore if already deleted
    }
  }
}
