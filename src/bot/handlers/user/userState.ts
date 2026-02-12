/**
 * User State Management
 * Simple in-memory state for user conversations
 */

export type UserState =
  | "idle"
  | "waiting_for_pat_token"
  | "confirming_pat_token";

/**
 * Map of user telegram ID to their current state
 */
const userStates = new Map<string, { state: UserState; data?: unknown }>();

/**
 * Get user state
 */
export function getUserState(telegramId: string): UserState {
  return userStates.get(telegramId)?.state || "idle";
}

/**
 * Set user state
 */
export function setUserState(
  telegramId: string,
  state: UserState,
  data?: unknown,
): void {
  userStates.set(telegramId, { state, data });
}

/**
 * Clear user state
 */
export function clearUserState(telegramId: string): void {
  userStates.delete(telegramId);
}

/**
 * Get user state data
 */
export function getUserStateData<T>(telegramId: string): T | undefined {
  const userState = userStates.get(telegramId);
  return userState?.data as T | undefined;
}
