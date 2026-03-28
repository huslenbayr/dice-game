import { NextResponse } from "next/server";
import { logError } from "@/lib/logging";
import { captureEmailLead } from "@/lib/services/email-lead-service";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const payload = await request.json();
    const result = await captureEmailLead(payload);

    return NextResponse.json(result, {
      status: result.alreadyExists ? 200 : 201
    });
  } catch (error) {
    logError("lead_capture_failed", {
      reason: error.message || "Unable to capture lead."
    });

    return NextResponse.json({ error: error.message || "Unable to capture lead." }, { status: 400 });
  }
}
