import { hashPassword, verifyPassword } from "@/lib/auth/passwords";
import { normalizeEmail } from "@/lib/auth/config";
import { createHttpError } from "@/lib/errors";
import { getRepository } from "@/lib/repositories/content-repository";
import { sanitizeUser } from "@/lib/auth/session";

function assertCredentialsPayload(payload) {
  const email = normalizeEmail(payload.email);
  const password = String(payload.password || "");

  if (!email) {
    throw createHttpError(400, "Email is required.");
  }

  if (!password) {
    throw createHttpError(400, "Password is required.");
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
    throw createHttpError(400, "Full name is required.");
  }

  if (credentials.password.length < 8) {
    throw createHttpError(400, "Password must be at least 8 characters.");
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
    throw createHttpError(400, "Invalid email or password.");
  }

  const isValid = verifyPassword(password, user.passwordSalt, user.passwordHash);

  if (!isValid) {
    throw createHttpError(400, "Invalid email or password.");
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
    throw createHttpError(400, "An account with this email already exists.");
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

function resolveOAuthFullName(profile) {
  const fullName = String(
    profile.fullName ||
      profile.userMetadata?.full_name ||
      profile.userMetadata?.name ||
      profile.userMetadata?.preferred_username ||
      ""
  ).trim();

  if (fullName) {
    return fullName;
  }

  return String(profile.email || "").split("@")[0] || "MongolWay Traveler";
}

export async function signInWithOAuthProfile(profile) {
  const email = normalizeEmail(profile.email);

  if (!email) {
    throw createHttpError(400, "An email address from the selected OAuth provider is required.");
  }

  const repository = await getRepository();
  let user = await repository.getUserByEmail(email);

  if (!user) {
    user = await repository.createUser({
      fullName: resolveOAuthFullName(profile),
      email,
      phone: "",
      nationality: "",
      role: "user",
      authProvider: profile.authProvider || "oauth",
      passwordSalt: null,
      passwordHash: null
    });
  }

  const session = await repository.createSession(user.id, profile.authProvider || "oauth");

  return {
    user: sanitizeUser(user),
    session
  };
}
