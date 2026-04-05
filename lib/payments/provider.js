import { getPaymentMethodOptions } from "@/lib/payments/context";
import {
  createPayPalPaymentSession,
  verifyPayPalPaymentCallback
} from "@/lib/payments/paypal-service";
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
    paypal: {
      id: "paypal",
      createSession: ({ booking, amount, currency, origin }) =>
        createPayPalPaymentSession({ booking, amount, currency, origin }),
      verifyCallback: ({ paymentSession, payload, rawBody, signature }) =>
        verifyPayPalPaymentCallback({ paymentSession, payload, rawBody, signature })
    },
    qpay: {
      id: "qpay",
      createSession: ({ booking, amount, currency }) => createQPayPaymentSession({ booking, amount, currency }),
      verifyCallback: ({ paymentSession, payload, rawBody, signature }) =>
        verifyQPayPaymentCallback({ paymentSession, payload, rawBody, signature })
    }
  };
}

export function inferPaymentMethod(paymentSession) {
  const method = String(paymentSession?.method || "").trim().toLowerCase();

  if (method === "paypal" || method === "qpay" || method === "card") {
    return method;
  }

  const provider = String(paymentSession?.provider || "").trim().toLowerCase();

  if (provider.includes("paypal")) {
    return "paypal";
  }

  if (provider.includes("qpay")) {
    return "qpay";
  }

  return "card";
}

function getProviderKeyFromPaymentSession(paymentSession) {
  return inferPaymentMethod(paymentSession);
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

export async function createPaymentSessionWithProvider({ booking, tour, method, card, origin }) {
  const { methodId, paymentContext, provider } = resolvePaymentMethod(booking, method);
  const amount = getBookingAmount(tour, booking);
  const currency = "USD";
  const sessionPayload = await provider.createSession({
    booking,
    amount,
    currency,
    card,
    origin
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
