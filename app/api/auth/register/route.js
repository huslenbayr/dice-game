import { NextResponse } from "next/server";
import { applySessionCookie, resolveSignedInPath } from "@/lib/auth/session";
import { registerWithPassword } from "@/lib/auth/service";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const payload = await request.json();
    const result = await registerWithPassword(payload);
    const redirectTo = resolveSignedInPath(result.user, payload.next);
    const response = NextResponse.json({
      user: result.user,
      redirectTo
    });

    applySessionCookie(response, result.session);
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to create account." }, { status: 400 });
  }
}

