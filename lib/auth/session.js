import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getRepository } from "@/lib/repositories/content-repository";
import { AUTH_SESSION_COOKIE, getAdminEmailAllowlist, normalizeEmail } from "@/lib/auth/config";

export function isAdminUser(user) {
  if (!user) {
    return false;
  }

  const email = normalizeEmail(user.email);
  return user.role === "admin" || getAdminEmailAllowlist().includes(email);
}

export function sanitizeUser(user) {
  if (!user) {
    return null;
  }

  const { passwordHash, passwordSalt, ...safeUser } = user;
  return {
    ...safeUser,
    role: isAdminUser(safeUser) ? "admin" : safeUser.role || "user"
  };
}

export function sanitizeRedirectPath(value) {
  if (!value || typeof value !== "string") {
    return null;
  }

  if (!value.startsWith("/") || value.startsWith("//")) {
    return null;
  }

  return value;
}

export async function getCurrentAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_SESSION_COOKIE)?.value;

  if (!token) {
    return {
      user: null,
      session: null
    };
  }

  const repository = await getRepository();
  const auth = await repository.getUserBySessionToken(token);

  if (!auth?.user || !auth?.session) {
    return {
      user: null,
      session: null
    };
  }

  return {
    user: sanitizeUser(auth.user),
    session: auth.session
  };
}

export async function getCurrentUser() {
  const auth = await getCurrentAuth();
  return auth.user;
}

export async function requireAuthenticatedUser(pathname = "/account") {
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/sign-in?next=${encodeURIComponent(pathname)}`);
  }

  return user;
}

export async function requireAdminUser(pathname = "/admin") {
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/sign-in?next=${encodeURIComponent(pathname)}`);
  }

  if (!isAdminUser(user)) {
    redirect("/account");
  }

  return user;
}

export function getDefaultSignedInPath(user) {
  return isAdminUser(user) ? "/admin" : "/account";
}

export function resolveSignedInPath(user, requestedPath) {
  const safePath = sanitizeRedirectPath(requestedPath);

  if (!safePath) {
    return getDefaultSignedInPath(user);
  }

  if (safePath.startsWith("/admin") && !isAdminUser(user)) {
    return "/account";
  }

  return safePath;
}

export function applySessionCookie(response, session) {
  response.cookies.set(AUTH_SESSION_COOKIE, session.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(session.expiresAt)
  });

  return response;
}

export function clearSessionCookie(response) {
  response.cookies.set(AUTH_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0)
  });

  return response;
}
