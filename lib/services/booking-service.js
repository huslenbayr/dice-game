import { sendBookingNotification } from "@/lib/email";
import { logError, logInfo, logWarn } from "@/lib/logging";
import { getPaymentCheckoutContext } from "@/lib/payments/provider";
import { getRepository } from "@/lib/repositories/content-repository";
import { assertBookingPayload } from "@/lib/validation";

async function sendBookingNotificationSafely({ booking, tour }) {
  try {
    const emailResult = await sendBookingNotification({ booking, tour });

    if (emailResult?.success) {
      logInfo("booking_email_sent", {
        bookingId: booking.id,
        provider: emailResult.provider,
        recipient: emailResult.recipient || process.env.BOOKING_NOTIFICATION_TO || "huslenbayr9779@gmail.com",
        messageId: emailResult.messageId || null
      });
    } else {
      logWarn("booking_email_failed", {
        bookingId: booking.id,
        provider: emailResult?.provider || "unknown",
        reason: emailResult?.message || "Email was not delivered."
      });
    }

    return emailResult;
  } catch (error) {
    logError("booking_email_failed", {
      bookingId: booking.id,
      provider: process.env.EMAIL_PROVIDER || "auto",
      reason: error.message
    });

    return {
      success: false,
      delivered: false,
      provider: process.env.EMAIL_PROVIDER || "auto",
      message: error.message
    };
  }
}

export async function createBookingSubmission(payload, options = {}) {
  assertBookingPayload(payload);

  const repository = await getRepository();
  const snapshot = await repository.getPublicSnapshot();
  const tour = snapshot.tours.find((item) => item.id === payload.tourId);

  if (!tour) {
    throw new Error("Tour not found.");
  }

  if (!tour.dates.includes(payload.date)) {
    throw new Error("Selected date is unavailable.");
  }

  const booking = await repository.createBooking(payload, {
    userId: options.userId || null
  });

  logInfo("booking_saved", {
    bookingId: booking.id,
    tourId: booking.tourId,
    travelerEmail: booking.email
  });

  const paymentContext = getPaymentCheckoutContext(booking);
  const emailResult = await sendBookingNotificationSafely({ booking, tour });

  return {
    bookingId: booking.id,
    booking,
    emailResult,
    nextStep: {
      paymentUrl: `/payment/${booking.id}`,
      createPaymentEndpoint: "/api/payments/create",
      statusEndpoint: `/api/payments/status?bookingId=${booking.id}`,
      recommendedMethodId: paymentContext.recommendedMethodId,
      travelerMarket: paymentContext.travelerMarket
    }
  };
}
