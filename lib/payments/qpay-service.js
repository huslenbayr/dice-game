import { createHmac } from "crypto";
import { createQPaySession } from "@/lib/payments/providers/qpay-ready-provider";

function getQPayMode() {
  return String(process.env.QPAY_MODE || "mock").toLowerCase();
}

function getRequiredQPayConfig() {
  return {
    merchantCode: process.env.QPAY_MERCHANT_CODE,
    username: process.env.QPAY_USERNAME,
    password: process.env.QPAY_PASSWORD,
    callbackSecret: process.env.QPAY_CALLBACK_SECRET
  };
}

function assertLiveQPayConfig() {
  const config = getRequiredQPayConfig();
  const missing = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length) {
    throw new Error(
      `QPay live mode is enabled, but these server variables are missing: ${missing.join(", ")}.`
    );
  }

  return config;
}

export async function createQPayPaymentSession({ booking, amount, currency }) {
  if (getQPayMode() === "live") {
    assertLiveQPayConfig();
    throw new Error("QPay live mode is configured, but the real invoice API client is not connected yet.");
  }

  return createQPaySession({ booking, amount, currency });
}

export async function verifyQPayPaymentCallback({ paymentSession, payload, rawBody, signature }) {
  if (getQPayMode() === "live") {
    const { callbackSecret } = assertLiveQPayConfig();
    const expectedSignature = createHmac("sha256", callbackSecret).update(rawBody).digest("hex");

    if (signature !== expectedSignature) {
      throw new Error("QPay callback signature is invalid.");
    }
  } else if ((payload.callbackToken || "") !== (paymentSession.callbackToken || "")) {
    throw new Error(
      "QPAY_CALLBACK_SECRET is not configured, so the callbackToken must match the stored payment session."
    );
  }

  return {
    verified: true,
    externalId: payload.externalId || paymentSession.externalId || paymentSession.reference,
    providerStatus: payload.providerStatus || payload.status,
    rawResponse: {
      body: payload,
      rawBody,
      signature: signature || null
    }
  };
}
