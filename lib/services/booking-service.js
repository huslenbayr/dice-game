import { getEmailProvider } from "@/lib/email/config";
import { sendBookingEmails } from "@/lib/email";
import { logError, logInfo, logWarn } from "@/lib/logging";
import { getPaymentCheckoutContext } from "@/lib/payments/provider";
import { getRepository } from "@/lib/repositories/content-repository";
import { assertBookingPayload } from "@/lib/validation";

function buildEmailFailureResult(error, recipient = null) {
  return {
    success: false,
    delivered: false,
    provider: getEmailProvider(),
    recipient,
    message: error.message
  };
}

function logEmailResult(eventName, booking, result) {
  if (!result) {
    return;
  }

  if (result.success) {
    logInfo(`${eventName}_sent`, {
      bookingId: booking.id,
      provider: result.provider,
      recipient: result.recipient || null,
      messageId: result.messageId || null
    });

    return;
  }

  logWarn(`${eventName}_failed`, {
    bookingId: booking.id,
    provider: result.provider || "unknown",
    recipient: result.recipient || null,
    reason: result.message || "Email was not delivered."
  });
}

async function sendBookingEmailsSafely({ booking, tour, language }) {
  try {
    const emailResults = await sendBookingEmails({ booking, tour, language });
    logEmailResult("booking_admin_email", booking, emailResults.adminNotification);
    logEmailResult("booking_traveler_email", booking, emailResults.travelerAutoReply);
    return emailResults;
  } catch (error) {
    logError("booking_email_failed", {
      bookingId: booking.id,
      provider: getEmailProvider(),
      reason: error.message
    });

    return {
      adminNotification: buildEmailFailureResult(error),
      travelerAutoReply: buildEmailFailureResult(error, booking.email)
    };
  }
}

export async function createBookingSubmission(payload, options = {}) {
  const input = assertBookingPayload(payload);

  const repository = await getRepository();
  const snapshot = await repository.getPublicSnapshot();
  const tour = snapshot.tours.find((item) => item.id === input.tourId);

  if (!tour) {
    throw new Error("Tour not found.");
  }

  if (!tour.dates.includes(input.date)) {
    throw new Error("Selected date is unavailable.");
  }

  const booking = await repository.createBooking(input, {
    userId: options.userId || null
  });

  logInfo("booking_saved", {
    bookingId: booking.id,
    tourId: booking.tourId,
    travelerEmail: booking.email
  });

  const paymentContext = getPaymentCheckoutContext(booking);
  const emailResults = await sendBookingEmailsSafely({ booking, tour, language: input.language });

  return {
    bookingId: booking.id,
    booking,
    emailResult: emailResults.adminNotification,
    travelerEmailResult: emailResults.travelerAutoReply,
    nextStep: {
      paymentUrl: `/payment/${booking.id}`,
      createPaymentEndpoint: "/api/payments/create",
      statusEndpoint: `/api/payments/status?bookingId=${booking.id}`,
      recommendedMethodId: paymentContext.recommendedMethodId,
      travelerMarket: paymentContext.travelerMarket
    }
  };
}
