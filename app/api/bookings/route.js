import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { logError } from "@/lib/logging";
import { createBookingSubmission } from "@/lib/services/booking-service";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const payload = await request.json();
    const currentUser = await getCurrentUser();
    const result = await createBookingSubmission(payload, {
      userId: currentUser?.id || null
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    logError("booking_create_failed", {
      reason: error.message || "Unable to create booking."
    });

    return NextResponse.json({ error: error.message || "Unable to create booking." }, { status: 400 });
  }
}
