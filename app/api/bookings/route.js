import { NextResponse } from "next/server";
import { getErrorStatusCode } from "@/lib/errors";
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
    const statusCode = getErrorStatusCode(error, 500);
    const message =
      statusCode >= 500
        ? "Unable to save your booking right now. Please try again."
        : error.message || "Unable to create booking.";

    logError("booking_create_failed", {
      reason: error.message || "Unable to create booking.",
      statusCode,
      stack: error.stack || null
    });

    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
