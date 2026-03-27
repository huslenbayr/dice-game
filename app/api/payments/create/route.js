import { NextResponse } from "next/server";
import { logError } from "@/lib/logging";
import { createPaymentForBooking } from "@/lib/services/payment-service";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const payload = await request.json();
    const result = await createPaymentForBooking(payload);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    logError("payment_create_failed", {
      reason: error.message || "Unable to create payment."
    });

    return NextResponse.json({ error: error.message || "Unable to create payment." }, { status: 400 });
  }
}
