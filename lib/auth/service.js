import { hashPassword, verifyPassword } from "@/lib/auth/passwords";
import { normalizeEmail } from "@/lib/auth/config";
import { getRepository } from "@/lib/repositories/content-repository";
import { sanitizeUser } from "@/lib/auth/session";

function assertCredentialsPayload(payload) {
  const email = normalizeEmail(payload.email);
  const password = String(payload.password || "");

  if (!email) {
    throw new Error("Email is required.");
  }

  if (!password) {
    throw new Error("Password is required.");
  }

  return {
    email,
    password
  };
}

function assertRegistrationPayload(payload) {
  const credentials = assertCredentialsPayload(payload);
  const fullName = String(payload.fullName || "").trim();

  if (!fullName) {
    throw new Error("Full name is required.");
  }

  if (credentials.password.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }

  return {
    ...credentials,
    fullName,
    phone: String(payload.phone || "").trim(),
    nationality: String(payload.nationality || "").trim()
  };
}

export async function signInWithPassword(payload) {
  const { email, password } = assertCredentialsPayload(payload);
  const repository = await getRepository();
  const user = await repository.getUserByEmail(email);

  if (!user || !user.passwordSalt || !user.passwordHash) {
    throw new Error("Invalid email or password.");
  }

  const isValid = verifyPassword(password, user.passwordSalt, user.passwordHash);

  if (!isValid) {
    throw new Error("Invalid email or password.");
  }

  const session = await repository.createSession(user.id, "credentials");

  return {
    user: sanitizeUser(user),
    session
  };
}

export async function registerWithPassword(payload) {
  const nextUser = assertRegistrationPayload(payload);
  const repository = await getRepository();
  const existingUser = await repository.getUserByEmail(nextUser.email);

  if (existingUser) {
    throw new Error("An account with this email already exists.");
  }

  const passwordRecord = hashPassword(nextUser.password);
  const user = await repository.createUser({
    fullName: nextUser.fullName,
    email: nextUser.email,
    phone: nextUser.phone,
    nationality: nextUser.nationality,
    role: "user",
    authProvider: "credentials",
    passwordSalt: passwordRecord.salt,
    passwordHash: passwordRecord.passwordHash
  });

  const session = await repository.createSession(user.id, "credentials");

  return {
    user: sanitizeUser(user),
    session
  };
}

