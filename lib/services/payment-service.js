import { sendPaymentStatusNotification } from "@/lib/email";
import { getEmailProvider } from "@/lib/email/config";
import { logError, logInfo, logWarn } from "@/lib/logging";
import {
  createPaymentSessionWithProvider,
  getPaymentCheckoutContext,
  verifyPaymentProviderCallback
} from "@/lib/payments/provider";
import { getRepository } from "@/lib/repositories/content-repository";
import { assertPaymentCreatePayload, isSupportedPaymentStatus } from "@/lib/validation";

function deriveBookingStatusFromPaymentStatus(paymentStatus, currentStatus = "pending") {
  switch (paymentStatus) {
    case "paid":
      return "paid";
    case "cancelled":
    case "refunded":
      return "cancelled";
    case "failed":
      return currentStatus === "paid" ? "paid" : "pending";
    case "pending":
      return currentStatus === "cancelled" ? "cancelled" : "pending";
    default:
      return currentStatus || "pending";
  }
}

function findPaymentSession(snapshot, identifier = {}) {
  return (
    snapshot.paymentSessions.find((session) => {
      if (identifier.paymentId && session.id === identifier.paymentId) {
        return true;
      }

      if (identifier.bookingId && session.bookingId === identifier.bookingId) {
        return true;
      }

      if (identifier.reference && session.reference === identifier.reference) {
        return true;
      }

      if (identifier.externalId && session.externalId === identifier.externalId) {
        return true;
      }

      return false;
    }) || null
  );
}

function buildPaymentResponse({ booking, paymentSession, paymentContext, tour, emailResult, alreadyPaid = false }) {
  return {
    bookingId: booking.id,
    paymentId: paymentSession?.id || null,
    booking,
    paymentSession,
    paymentStatus: paymentSession?.status || booking.paymentStatus || "pending",
    bookingStatus: booking.status,
    paymentOptions: paymentContext?.methods || [],
    recommendedMethodId: paymentContext?.recommendedMethodId || null,
    travelerMarket: paymentContext?.travelerMarket || null,
    nextStep: {
      paymentUrl: `/payment/${booking.id}`,
      statusEndpoint: `/api/payments/status?bookingId=${booking.id}`,
      callbackEndpoint: "/api/payments/callback",
      confirmationPage: `/payment/${booking.id}`
    },
    emailResult: emailResult || null,
    alreadyPaid,
    tour: tour
      ? {
          id: tour.id,
          title: tour.title,
          price: tour.price
        }
      : null
  };
}

async function sendPaymentStatusNotificationSafely({ booking, tour, paymentSession, previousStatus, nextStatus }) {
  if (!tour || !paymentSession || previousStatus === nextStatus) {
    return null;
  }

  try {
    const emailResult = await sendPaymentStatusNotification({
      booking,
      tour,
      paymentSession,
      previousStatus,
      nextStatus
    });

    if (emailResult?.success) {
      logInfo("payment_status_email_sent", {
        bookingId: booking.id,
        paymentId: paymentSession.id,
        provider: emailResult.provider,
        recipient: emailResult.recipient || null,
        nextStatus
      });
    } else {
      logWarn("payment_status_email_failed", {
        bookingId: booking.id,
        paymentId: paymentSession.id,
        provider: emailResult?.provider || "unknown",
        reason: emailResult?.message || "Email was not delivered.",
        nextStatus
      });
    }

    return emailResult;
  } catch (error) {
    logError("payment_status_email_failed", {
      bookingId: booking.id,
      paymentId: paymentSession.id,
      provider: getEmailProvider(),
      reason: error.message,
      nextStatus
    });

    return {
      success: false,
      delivered: false,
      provider: getEmailProvider(),
      message: error.message
    };
  }
}

async function getBookingAndTour(repository, bookingId) {
  const snapshot = await repository.getAdminSnapshot();
  const booking = snapshot.bookings.find((item) => item.id === bookingId) || null;

  if (!booking) {
    throw new Error("Booking not found.");
  }

  const tour = snapshot.tours.find((item) => item.id === booking.tourId) || null;

  if (!tour) {
    throw new Error("Tour not found.");
  }

  return {
    snapshot,
    booking,
    tour
  };
}

export async function createPaymentForBooking(payload) {
  const { bookingId, method, card } = assertPaymentCreatePayload(payload);
  const repository = await getRepository();
  const { snapshot, booking, tour } = await getBookingAndTour(repository, bookingId);
  const paymentContext = getPaymentCheckoutContext(booking);
  const existingPaymentSession = findPaymentSession(snapshot, { bookingId });

  if (existingPaymentSession?.status === "paid") {
    return buildPaymentResponse({
      booking,
      paymentSession: existingPaymentSession,
      paymentContext,
      tour,
      alreadyPaid: true
    });
  }

  const previousStatus = booking.paymentStatus || "pending";
  const { sessionPayload } = await createPaymentSessionWithProvider({
    booking,
    tour,
    method,
    card
  });

  const result = await repository.createPaymentSession(booking.id, {
    ...sessionPayload,
    rawResponse: sessionPayload.rawResponse || sessionPayload,
    statusSource: "create"
  });

  logInfo("payment_session_created", {
    bookingId: booking.id,
    paymentId: result.paymentSession.id,
    provider: result.paymentSession.provider,
    method: result.paymentSession.method,
    status: result.paymentSession.status,
    amount: result.paymentSession.amount,
    currency: result.paymentSession.currency
  });

  const emailResult = await sendPaymentStatusNotificationSafely({
    booking: result.booking,
    tour,
    paymentSession: result.paymentSession,
    previousStatus,
    nextStatus: result.paymentSession.status
  });

  return buildPaymentResponse({
    booking: result.booking,
    paymentSession: result.paymentSession,
    paymentContext,
    tour,
    emailResult
  });
}

export async function getPaymentStatusDetails(identifier) {
  const repository = await getRepository();
  const snapshot = await repository.getAdminSnapshot();
  const paymentSession = identifier.paymentId
    ? findPaymentSession(snapshot, { paymentId: identifier.paymentId })
    : findPaymentSession(snapshot, { bookingId: identifier.bookingId });
  const booking = paymentSession
    ? snapshot.bookings.find((item) => item.id === paymentSession.bookingId) || null
    : snapshot.bookings.find((item) => item.id === identifier.bookingId) || null;

  if (!booking && !paymentSession) {
    throw new Error("Payment record not found.");
  }

  const tour = booking ? snapshot.tours.find((item) => item.id === booking.tourId) || null : null;
  const paymentContext = booking ? getPaymentCheckoutContext(booking) : null;

  return buildPaymentResponse({
    booking: booking || {
      id: paymentSession.bookingId,
      status: "pending",
      paymentStatus: paymentSession.status
    },
    paymentSession,
    paymentContext,
    tour
  });
}

export async function processPaymentCallback({ payload, rawBody, headers }) {
  if (!isSupportedPaymentStatus(payload.status)) {
    throw new Error("Unsupported payment status.");
  }

  const repository = await getRepository();
  const snapshot = await repository.getAdminSnapshot();
  const paymentSession = findPaymentSession(snapshot, payload);

  if (!paymentSession) {
    throw new Error("Payment session not found.");
  }

  const booking = snapshot.bookings.find((item) => item.id === paymentSession.bookingId) || null;
  const tour = booking ? snapshot.tours.find((item) => item.id === booking.tourId) || null : null;

  if (!booking) {
    throw new Error("Booking not found.");
  }

  const verification = await verifyPaymentProviderCallback({
    paymentSession,
    payload,
    rawBody,
    signature:
      headers.get("x-provider-signature") ||
      headers.get("x-qpay-signature") ||
      headers.get("x-card-signature") ||
      null
  });

  const previousStatus = paymentSession.status;
  const result = await repository.updatePaymentSessionStatus(
    { paymentId: paymentSession.id },
    {
      status: payload.status,
      providerStatus: verification.providerStatus || payload.status,
      externalId: verification.externalId || payload.externalId || paymentSession.externalId,
      rawResponse: verification.rawResponse,
      failureReason: payload.failureReason || null,
      statusSource: "callback",
      lastCallbackAt: new Date().toISOString(),
      previousStatus
    }
  );

  logInfo("payment_callback_processed", {
    bookingId: booking.id,
    paymentId: paymentSession.id,
    provider: paymentSession.provider,
    previousStatus,
    nextStatus: result.paymentSession.status
  });

  const emailResult = await sendPaymentStatusNotificationSafely({
    booking: result.booking,
    tour,
    paymentSession: result.paymentSession,
    previousStatus,
    nextStatus: result.paymentSession.status
  });

  return {
    ...buildPaymentResponse({
      booking: result.booking,
      paymentSession: result.paymentSession,
      paymentContext: getPaymentCheckoutContext(result.booking),
      tour,
      emailResult
    }),
    callbackVerified: Boolean(verification.verified)
  };
}

export async function updateBookingPaymentState({ bookingId, status, paymentStatus, providerStatus, rawResponse }) {
  if (paymentStatus && !isSupportedPaymentStatus(paymentStatus)) {
    throw new Error("Unsupported payment status.");
  }

  const repository = await getRepository();
  const { booking, tour } = await getBookingAndTour(repository, bookingId);
  const paymentSession = await repository.getPaymentSessionByBookingId(bookingId);
  const previousStatus = paymentSession?.status || booking.paymentStatus || "pending";

  if (paymentSession && paymentStatus) {
    const result = await repository.updatePaymentSessionStatus(
      { paymentId: paymentSession.id },
      {
        status: paymentStatus,
        providerStatus: providerStatus || paymentStatus,
        rawResponse: rawResponse || null,
        statusSource: "admin",
        bookingStatus: status || deriveBookingStatusFromPaymentStatus(paymentStatus, booking.status),
        previousStatus
      }
    );

    const emailResult = await sendPaymentStatusNotificationSafely({
      booking: result.booking,
      tour,
      paymentSession: result.paymentSession,
      previousStatus,
      nextStatus: result.paymentSession.status
    });

    return {
      booking: result.booking,
      paymentSession: result.paymentSession,
      emailResult
    };
  }

  const updatedBooking = await repository.updateBookingStatus(bookingId, {
    status: status ?? booking.status,
    paymentStatus: paymentStatus ?? booking.paymentStatus,
    providerStatus: providerStatus || paymentStatus || booking.paymentStatus,
    rawResponse: rawResponse || null,
    statusSource: "admin"
  });

  return {
    booking: updatedBooking,
    paymentSession,
    emailResult: null
  };
}
