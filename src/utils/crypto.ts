/**
 * Crypto Utilities
 * Token encryption/decryption for PAT tokens
 */

import "dotenv/config";
import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  createHash,
} from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "";

/**
 * Get the encryption key (padded to 32 bytes)
 */
function getKey(): Buffer {
  if (!ENCRYPTION_KEY) {
    return Buffer.alloc(32);
  }
  // SHA-256 hash of the key to ensure it's 32 bytes
  return createHash("sha256").update(ENCRYPTION_KEY).digest();
}

/**
 * Check if encryption is configured
 */
export function isEncryptionConfigured(): boolean {
  return ENCRYPTION_KEY.length > 0;
}

/**
 * Encrypt a token using AES-256-GCM
 */
export function encryptToken(plainText: string): string {
  if (!isEncryptionConfigured()) {
    // If no encryption key is set, return the plain text (for development)
    return plainText;
  }

  const key = getKey();
  const iv = randomBytes(12);

  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([
    cipher.update(plainText, "utf-8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  // Combine iv + authTag + encrypted data
  const combined = Buffer.concat([iv, authTag, encrypted]);
  return combined.toString("base64");
}

/**
 * Decrypt a token using AES-256-GCM
 */
export function decryptToken(encryptedText: string): string {
  if (!isEncryptionConfigured()) {
    // If no encryption key is set, return the encrypted text as-is
    return encryptedText;
  }

  try {
    const key = getKey();
    const combined = Buffer.from(encryptedText, "base64");

    // Extract iv, authTag, and encrypted data
    const iv = combined.subarray(0, 12);
    const authTag = combined.subarray(12, 28);
    const encrypted = combined.subarray(28);

    const decipher = createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);

    return decrypted.toString("utf-8");
  } catch (error) {
    // If decryption fails, return the original text
    console.error("Decryption failed:", error);
    return encryptedText;
  }
}
