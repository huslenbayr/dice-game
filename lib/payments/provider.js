import { getPaymentMethodOptions } from "@/lib/payments/context";
import { createQPayPaymentSession, verifyQPayPaymentCallback } from "@/lib/payments/qpay-service";
import {
  createCardPaymentSession,
  verifyCardPaymentCallback
} from "@/lib/payments/providers/card-mock-provider";

function getBookingAmount(tour, booking) {
  return Number(tour?.price || 0) * Number(booking?.people || 1);
}

function getPaymentProviders() {
  return {
    card: {
      id: "card",
      createSession: ({ booking, amount, currency, card }) =>
        createCardPaymentSession({ booking, amount, currency, card }),
      verifyCallback: ({ paymentSession, payload, rawBody, signature }) =>
        verifyCardPaymentCallback({ paymentSession, payload, rawBody, signature })
    },
    qpay: {
      id: "qpay",
      createSession: ({ booking, amount, currency }) => createQPayPaymentSession({ booking, amount, currency }),
      verifyCallback: ({ paymentSession, payload, rawBody, signature }) =>
        verifyQPayPaymentCallback({ paymentSession, payload, rawBody, signature })
    }
  };
}

function getProviderKeyFromPaymentSession(paymentSession) {
  if (paymentSession?.method) {
    return paymentSession.method;
  }

  return String(paymentSession?.provider || "").includes("qpay") ? "qpay" : "card";
}

export function getPaymentCheckoutContext(booking) {
  return getPaymentMethodOptions(booking);
}

export function resolvePaymentMethod(booking, requestedMethod) {
  const paymentContext = getPaymentMethodOptions(booking);
  const methodId = requestedMethod || paymentContext.recommendedMethodId;
  const providers = getPaymentProviders();

  if (!providers[methodId]) {
    throw new Error("Unsupported payment method.");
  }

  return {
    methodId,
    paymentContext,
    provider: providers[methodId]
  };
}

export async function createPaymentSessionWithProvider({ booking, tour, method, card }) {
  const { methodId, paymentContext, provider } = resolvePaymentMethod(booking, method);
  const amount = getBookingAmount(tour, booking);
  const currency = "USD";
  const sessionPayload = await provider.createSession({
    booking,
    amount,
    currency,
    card
  });

  return {
    sessionPayload,
    methodId,
    amount,
    currency,
    paymentContext
  };
}

export async function verifyPaymentProviderCallback({ paymentSession, payload, rawBody, signature }) {
  const providers = getPaymentProviders();
  const providerKey = getProviderKeyFromPaymentSession(paymentSession);
  const provider = providers[providerKey];

  if (!provider) {
    throw new Error("Unsupported payment provider.");
  }

  return provider.verifyCallback({
    paymentSession,
    payload,
    rawBody,
    signature
  });
}
