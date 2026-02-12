/**
 * Database Queries - BotMessage
 * CRUD operations for BotMessage table
 */

import { eq, and, desc } from "drizzle-orm";
import { db } from "../index";
import { botMessage, type BotMessage, type NewBotMessage } from "../schema";

/**
 * Create a new bot message record
 */
export async function createBotMessage(
  message: NewBotMessage,
): Promise<BotMessage> {
  const result = await db.insert(botMessage).values(message).returning();
  return result[0];
}

/**
 * Find bot messages by chat ID
 */
export async function findMessagesByChatId(
  chatId: string,
): Promise<BotMessage[]> {
  return db
    .select()
    .from(botMessage)
    .where(eq(botMessage.chatId, chatId))
    .orderBy(desc(botMessage.createdAt));
}

/**
 * Find bot messages by chat ID and type
 */
export async function findMessagesByChatIdAndType(
  chatId: string,
  type: string,
): Promise<BotMessage[]> {
  return db
    .select()
    .from(botMessage)
    .where(and(eq(botMessage.chatId, chatId), eq(botMessage.type, type)))
    .orderBy(desc(botMessage.createdAt));
}

/**
 * Find bot messages by user ID
 */
export async function findMessagesByUserId(
  userId: number,
): Promise<BotMessage[]> {
  return db
    .select()
    .from(botMessage)
    .where(eq(botMessage.userId, userId))
    .orderBy(desc(botMessage.createdAt));
}

/**
 * Delete a bot message by ID
 */
export async function deleteBotMessage(id: number): Promise<void> {
  await db.delete(botMessage).where(eq(botMessage.id, id));
}

/**
 * Delete bot messages by IDs
 */
export async function deleteBotMessages(ids: number[]): Promise<void> {
  if (ids.length === 0) return;
  await db.delete(botMessage).where(
    // @ts-ignore - drizzle issue with inArray
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (botMessage as any).id.in(ids),
  );
}

/**
 * Delete all bot messages for a chat
 */
export async function deleteMessagesByChatId(chatId: string): Promise<void> {
  await db.delete(botMessage).where(eq(botMessage.chatId, chatId));
}

/**
 * Delete bot messages by chat ID and type
 */
export async function deleteMessagesByChatIdAndType(
  chatId: string,
  type: string,
): Promise<void> {
  await db
    .delete(botMessage)
    .where(and(eq(botMessage.chatId, chatId), eq(botMessage.type, type)));
}

/**
 * Get the latest bot message for a chat and type
 */
export async function getLatestMessageByChatIdAndType(
  chatId: string,
  type: string,
): Promise<BotMessage | undefined> {
  const result = await db
    .select()
    .from(botMessage)
    .where(and(eq(botMessage.chatId, chatId), eq(botMessage.type, type)))
    .orderBy(desc(botMessage.createdAt))
    .limit(1);
  return result[0];
}
