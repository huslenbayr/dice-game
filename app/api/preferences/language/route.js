import { NextResponse } from "next/server";
import { normalizeLanguage } from "@/lib/i18n";

export async function POST(request) {
  const payload = await request.json();
  const language = normalizeLanguage(payload.language);

  const response = NextResponse.json({ success: true, language });
  response.cookies.set("mongolway-lang", language, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365
  });

  return response;
}
