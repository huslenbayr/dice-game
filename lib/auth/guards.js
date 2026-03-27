import { NextResponse } from "next/server";
import { getCurrentAuth, isAdminUser } from "@/lib/auth/session";
import { logWarn } from "@/lib/logging";

export async function requireAuthenticatedApiUser() {
  const auth = await getCurrentAuth();

  if (!auth.user) {
    logWarn("api_auth_required", { path: "protected-api" });
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  return auth.user;
}

export async function requireAdminApiUser() {
  const auth = await getCurrentAuth();

  if (!auth.user) {
    logWarn("api_admin_auth_required", { path: "admin-api" });
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  if (!isAdminUser(auth.user)) {
    logWarn("api_admin_access_denied", {
      userId: auth.user.id,
      email: auth.user.email
    });
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  return auth.user;
}
