import { NextResponse } from "next/server";
import { logError } from "@/lib/logging";
import { capturePayPalCheckout } from "@/lib/services/payment-service";

export const runtime = "nodejs";

function buildRedirect(request, bookingId, state) {
  const redirectUrl = new URL(bookingId ? `/payment/${bookingId}` : "/", request.nextUrl.origin);
  redirectUrl.searchParams.set("method", "paypal");
  redirectUrl.searchParams.set("payment", state);
  return redirectUrl;
}

export async function GET(request) {
  const bookingId = String(request.nextUrl.searchParams.get("bookingId") || "").trim();
  const reference = String(request.nextUrl.searchParams.get("reference") || "").trim();
  const token = String(request.nextUrl.searchParams.get("token") || "").trim();
  const mock = request.nextUrl.searchParams.get("mock") === "1";

  if (!bookingId) {
    return NextResponse.redirect(buildRedirect(request, null, "failed"));
  }

  try {
    const result = await capturePayPalCheckout({
      bookingId,
      reference: reference || null,
      orderId: token || null,
      mock
    });
    const state = result.paymentStatus === "paid" ? "paid" : result.paymentStatus === "pending" ? "pending" : "failed";

    return NextResponse.redirect(buildRedirect(request, bookingId, state));
  } catch (error) {
    logError("paypal_return_failed", {
      bookingId,
      reference: reference || null,
      orderId: token || null,
      reason: error.message || "Unable to capture the PayPal checkout."
    });

    return NextResponse.redirect(buildRedirect(request, bookingId, "failed"));
  }
}
