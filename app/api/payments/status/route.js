import { NextResponse } from "next/server";
import { logError } from "@/lib/logging";
import { getPaymentStatusDetails } from "@/lib/services/payment-service";
import { assertPaymentStatusLookup } from "@/lib/validation";

export const runtime = "nodejs";

export async function GET(request) {
  try {
    const identifier = assertPaymentStatusLookup(request.nextUrl.searchParams);
    const result = await getPaymentStatusDetails(identifier);
    return NextResponse.json(result);
  } catch (error) {
    logError("payment_status_lookup_failed", {
      reason: error.message || "Unable to load payment status."
    });

    return NextResponse.json({ error: error.message || "Unable to load payment status." }, { status: 400 });
  }
}
