/**
 * Database Queries - WorkSession
 * CRUD operations for WorkSession table
 */

import { eq, and, gte, lt, desc } from "drizzle-orm";
import { db } from "../index";
import { workSession, type WorkSession, type NewWorkSession } from "../schema";

/**
 * Create a new work session
 */
export async function createWorkSession(
  session: NewWorkSession,
): Promise<WorkSession> {
  const result = await db.insert(workSession).values(session).returning();
  return result[0];
}

/**
 * Find the latest work session for a user
 */
export async function findLatestSessionByUserId(
  userId: number,
): Promise<WorkSession | undefined> {
  const result = await db
    .select()
    .from(workSession)
    .where(eq(workSession.userId, userId))
    .orderBy(desc(workSession.timestamp))
    .limit(1);
  return result[0];
}

/**
 * Find all sessions for a user today
 */
export async function findTodaySessionsByUserId(
  userId: number,
): Promise<WorkSession[]> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const result = await db
    .select()
    .from(workSession)
    .where(
      and(
        eq(workSession.userId, userId),
        gte(workSession.timestamp, today),
        lt(workSession.timestamp, tomorrow),
      ),
    )
    .orderBy(desc(workSession.timestamp));

  return result;
}

/**
 * Find all sessions for a user in a specific group today
 */
export async function findTodaySessionsByUserAndGroup(
  userId: number,
  groupId: number,
): Promise<WorkSession[]> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const result = await db
    .select()
    .from(workSession)
    .where(
      and(
        eq(workSession.userId, userId),
        eq(workSession.groupId, groupId),
        gte(workSession.timestamp, today),
        lt(workSession.timestamp, tomorrow),
      ),
    )
    .orderBy(desc(workSession.timestamp));

  return result;
}

/**
 * Delete work session by ID
 */
export async function deleteWorkSession(id: number): Promise<void> {
  await db.delete(workSession).where(eq(workSession.id, id));
}
