import { NextResponse } from "next/server";
import { logError } from "@/lib/logging";
import { processPaymentCallback } from "@/lib/services/payment-service";
import { assertPaymentCallbackPayload } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const rawBody = await request.text();
    const parsedPayload = JSON.parse(rawBody);
    const payload = assertPaymentCallbackPayload({
      ...parsedPayload,
      callbackToken:
        parsedPayload.callbackToken ||
        request.headers.get("x-callback-token") ||
        request.headers.get("x-qpay-token") ||
        null
    });
    const result = await processPaymentCallback({
      payload,
      rawBody,
      headers: request.headers
    });

    return NextResponse.json(result);
  } catch (error) {
    logError("payment_callback_failed", {
      reason: error.message || "Unable to process payment callback."
    });

    return NextResponse.json({ error: error.message || "Unable to process payment callback." }, { status: 400 });
  }
}
