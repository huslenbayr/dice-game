import { NextResponse } from "next/server";
import { requireAdminApiUser } from "@/lib/auth/guards";
import { updateBookingPaymentState } from "@/lib/services/payment-service";

export const runtime = "nodejs";

export async function PATCH(request, { params }) {
  try {
    const adminUser = await requireAdminApiUser();
    if (adminUser instanceof NextResponse) {
      return adminUser;
    }

    const { bookingId } = await params;
    const payload = await request.json();
    const result = await updateBookingPaymentState({
      bookingId,
      status: payload.status,
      paymentStatus: payload.paymentStatus,
      providerStatus: payload.providerStatus
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to update booking." }, { status: 400 });
  }
}
