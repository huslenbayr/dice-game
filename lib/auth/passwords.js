import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

const KEY_LENGTH = 64;

export function hashPassword(password, existingSalt) {
  const salt = existingSalt || randomBytes(16).toString("hex");
  const passwordHash = scryptSync(String(password), salt, KEY_LENGTH).toString("hex");

  return {
    salt,
    passwordHash
  };
}

export function verifyPassword(password, salt, passwordHash) {
  const expected = Buffer.from(passwordHash, "hex");
  const candidate = scryptSync(String(password), salt, KEY_LENGTH);

  if (expected.length !== candidate.length) {
    return false;
  }

  return timingSafeEqual(expected, candidate);
}
