import { NextResponse } from "next/server";
import { clearSessionCookie, getCurrentAuth } from "@/lib/auth/session";
import { getRepository } from "@/lib/repositories/content-repository";

export const runtime = "nodejs";

export async function POST() {
  const auth = await getCurrentAuth();

  if (auth.session?.token) {
    const repository = await getRepository();
    await repository.deleteSession(auth.session.token);
  }

  const response = NextResponse.json({ success: true });
  clearSessionCookie(response);
  return response;
}
