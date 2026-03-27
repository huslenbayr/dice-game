import { NextResponse } from "next/server";
import { resolveSignedInPath, applySessionCookie } from "@/lib/auth/session";
import { signInWithPassword } from "@/lib/auth/service";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const payload = await request.json();
    const result = await signInWithPassword(payload);
    const redirectTo = resolveSignedInPath(result.user, payload.next);
    const response = NextResponse.json({
      user: result.user,
      redirectTo
    });

    applySessionCookie(response, result.session);
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to sign in." }, { status: 400 });
  }
}

