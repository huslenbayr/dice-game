import { NextResponse } from "next/server";
import { logError } from "@/lib/logging";
import { cancelPayPalCheckout } from "@/lib/services/payment-service";

export const runtime = "nodejs";

function buildRedirect(request, bookingId) {
  const redirectUrl = new URL(bookingId ? `/payment/${bookingId}` : "/", request.nextUrl.origin);
  redirectUrl.searchParams.set("method", "paypal");
  redirectUrl.searchParams.set("payment", "cancelled");
  return redirectUrl;
}

export async function GET(request) {
  const bookingId = String(request.nextUrl.searchParams.get("bookingId") || "").trim();
  const reference = String(request.nextUrl.searchParams.get("reference") || "").trim();
  const token = String(request.nextUrl.searchParams.get("token") || "").trim();

  if (!bookingId) {
    return NextResponse.redirect(buildRedirect(request, null));
  }

  try {
    await cancelPayPalCheckout({
      bookingId,
      reference: reference || null,
      orderId: token || null
    });
  } catch (error) {
    logError("paypal_cancel_failed", {
      bookingId,
      reference: reference || null,
      orderId: token || null,
      reason: error.message || "Unable to cancel the PayPal checkout."
    });
  }

  return NextResponse.redirect(buildRedirect(request, bookingId));
}
