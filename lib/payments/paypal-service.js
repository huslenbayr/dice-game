import { randomUUID } from "crypto";
import { buildSiteUrl } from "@/lib/site";

function getPayPalMode() {
  return String(process.env.PAYPAL_MODE || "mock").trim().toLowerCase();
}

function getPayPalApiBaseUrl() {
  return getPayPalMode() === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";
}

function getPayPalCredentials() {
  return {
    clientId: String(process.env.PAYPAL_CLIENT_ID || "").trim(),
    clientSecret: String(process.env.PAYPAL_CLIENT_SECRET || "").trim()
  };
}

function assertPayPalApiConfig() {
  if (getPayPalMode() === "mock") {
    return getPayPalCredentials();
  }

  const credentials = getPayPalCredentials();
  const missing = Object.entries(credentials)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length) {
    throw new Error(`PayPal mode is enabled, but these server variables are missing: ${missing.join(", ")}.`);
  }

  return credentials;
}

function resolvePublicOrigin(origin) {
  const input = String(origin || "").trim();

  if (input) {
    try {
      return new URL(input).toString().replace(/\/$/, "");
    } catch {
      // Fall through to the configured site URL if the runtime origin is malformed.
    }
  }

  const configuredSiteUrl = buildSiteUrl("/");

  if (configuredSiteUrl) {
    return configuredSiteUrl.replace(/\/$/, "");
  }

  throw new Error("A public site URL is required to build the PayPal return and cancel URLs.");
}

function buildAppUrl(origin, pathname, params = {}) {
  const baseUrl = resolvePublicOrigin(origin);
  const url = new URL(pathname, `${baseUrl}/`);

  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }

  return url.toString();
}

function formatAmount(value) {
  return Number(value || 0).toFixed(2);
}

async function readPayPalJson(response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return {
      message: text
    };
  }
}

function resolvePayPalErrorMessage(payload, fallbackMessage) {
  const details = Array.isArray(payload?.details) ? payload.details : [];
  const firstDetail = details.find((item) => item?.description || item?.issue);

  return (
    firstDetail?.description ||
    firstDetail?.issue ||
    payload?.message ||
    fallbackMessage ||
    "The PayPal request could not be completed."
  );
}

async function requestPayPalAccessToken() {
  const { clientId, clientSecret } = assertPayPalApiConfig();
  const response = await fetch(`${getPayPalApiBaseUrl()}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials",
    cache: "no-store"
  });
  const payload = await readPayPalJson(response);

  if (!response.ok || !payload?.access_token) {
    const error = new Error(resolvePayPalErrorMessage(payload, "Unable to get a PayPal access token."));
    error.paypalStatus = response.status;
    error.paypalPayload = payload;
    throw error;
  }

  return payload.access_token;
}

async function callPayPalApi(pathname, { method = "GET", body, requestId } = {}) {
  const accessToken = await requestPayPalAccessToken();
  const response = await fetch(`${getPayPalApiBaseUrl()}${pathname}`, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...(requestId ? { "PayPal-Request-Id": requestId } : {})
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store"
  });
  const payload = await readPayPalJson(response);

  if (!response.ok) {
    const error = new Error(resolvePayPalErrorMessage(payload, `PayPal API request failed with ${response.status}.`));
    error.paypalStatus = response.status;
    error.paypalPayload = payload;
    throw error;
  }

  return payload;
}

function resolveApprovalUrl(orderResponse) {
  return (
    orderResponse?.links?.find((link) => link?.rel === "payer-action" || link?.rel === "approve")?.href || null
  );
}

function resolvePayPalProviderStatus(orderResponse) {
  return (
    orderResponse?.purchase_units?.[0]?.payments?.captures?.[0]?.status ||
    orderResponse?.status ||
    "PENDING"
  );
}

export function mapPayPalStatusToPaymentStatus(providerStatus) {
  switch (String(providerStatus || "").trim().toUpperCase()) {
    case "COMPLETED":
      return "paid";
    case "VOIDED":
    case "CANCELLED":
      return "cancelled";
    case "CREATED":
    case "APPROVED":
    case "PAYER_ACTION_REQUIRED":
    case "SAVED":
      return "pending";
    default:
      return "failed";
  }
}

function buildPayPalSessionPayload({
  booking,
  amount,
  currency,
  reference,
  externalId,
  provider,
  providerStatus,
  deepLink,
  callbackToken,
  rawResponse,
  instructions
}) {
  return {
    method: "paypal",
    provider,
    status: "pending",
    providerStatus,
    amount,
    currency,
    reference,
    externalId,
    qrText: null,
    deepLink,
    applePayEligible: false,
    cardSummary: null,
    callbackToken,
    rawResponse,
    failureReason: null,
    instructions
  };
}

function buildMockPayPalSession({ booking, amount, currency, origin }) {
  const reference = `PAYPAL-${randomUUID().slice(0, 8).toUpperCase()}`;
  const externalId = `PAYPAL-MOCK-${randomUUID().slice(0, 12).toUpperCase()}`;
  const callbackToken = randomUUID();

  return buildPayPalSessionPayload({
    booking,
    amount,
    currency,
    reference,
    externalId,
    provider: "paypal-mock",
    providerStatus: "CREATED",
    deepLink: buildAppUrl(origin, "/api/payments/paypal/return", {
      bookingId: booking.id,
      reference,
      token: externalId,
      mock: "1"
    }),
    callbackToken,
    rawResponse: {
      provider: "paypal-mock",
      mock: true,
      reference,
      externalId
    },
    instructions: {
      en: "PayPal mock mode is active. This redirect stays inside the app so you can test the full booking flow before adding live credentials.",
      mn: "PayPal mock mode идэвхтэй байна. Бодит credential хийхээс өмнө бүтэн booking урсгалыг шалгахын тулд redirect нь апп дотроо үлдэнэ."
    }
  });
}

export async function createPayPalPaymentSession({ booking, amount, currency, origin }) {
  if (getPayPalMode() === "mock") {
    return buildMockPayPalSession({ booking, amount, currency, origin });
  }

  assertPayPalApiConfig();
  const reference = `PAYPAL-${randomUUID().slice(0, 8).toUpperCase()}`;
  const callbackToken = randomUUID();
  const returnUrl = buildAppUrl(origin, "/api/payments/paypal/return", {
    bookingId: booking.id,
    reference
  });
  const cancelUrl = buildAppUrl(origin, "/api/payments/paypal/cancel", {
    bookingId: booking.id,
    reference
  });
  const order = await callPayPalApi("/v2/checkout/orders", {
    method: "POST",
    requestId: reference,
    body: {
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: booking.id,
          invoice_id: reference,
          custom_id: booking.id,
          description: `MongolWay booking ${booking.id}`,
          amount: {
            currency_code: currency,
            value: formatAmount(amount)
          }
        }
      ],
      payment_source: {
        paypal: {
          experience_context: {
            brand_name: "MongolWay",
            landing_page: "LOGIN",
            shipping_preference: "NO_SHIPPING",
            user_action: "PAY_NOW",
            return_url: returnUrl,
            cancel_url: cancelUrl
          }
        }
      }
    }
  });
  const approvalUrl = resolveApprovalUrl(order);

  if (!approvalUrl || !order?.id) {
    throw new Error("PayPal did not return an approval link for this order.");
  }

  return buildPayPalSessionPayload({
    booking,
    amount,
    currency,
    reference,
    externalId: order.id,
    provider: `paypal-${getPayPalMode()}`,
    providerStatus: resolvePayPalProviderStatus(order),
    deepLink: approvalUrl,
    callbackToken,
    rawResponse: order,
    instructions: {
      en: "Continue to PayPal to approve this checkout, then return to MongolWay for the final confirmation state.",
      mn: "Энэ checkout-ийг баталгаажуулахын тулд PayPal руу үргэлжлүүлээд, дараа нь эцсийн төлөвөө харахаар MongolWay руу буцна."
    }
  });
}

function normalizeCapturedOrder(orderResponse, orderId) {
  const providerStatus = resolvePayPalProviderStatus(orderResponse);
  const status = mapPayPalStatusToPaymentStatus(providerStatus);

  return {
    status,
    providerStatus,
    externalId: orderResponse?.id || orderId || null,
    rawResponse: orderResponse,
    failureReason:
      status === "failed" ? resolvePayPalErrorMessage(orderResponse, "PayPal did not return a completed capture.") : null
  };
}

async function getPayPalOrder(orderId) {
  if (getPayPalMode() === "mock") {
    return {
      id: orderId,
      status: "COMPLETED",
      mock: true,
      purchase_units: [
        {
          payments: {
            captures: [
              {
                id: `CAP-${randomUUID().slice(0, 8).toUpperCase()}`,
                status: "COMPLETED"
              }
            ]
          }
        }
      ]
    };
  }

  return callPayPalApi(`/v2/checkout/orders/${encodeURIComponent(orderId)}`, {
    method: "GET",
    requestId: `DETAIL-${orderId}`
  });
}

export async function capturePayPalOrder({ orderId, mock = false }) {
  if (!orderId) {
    throw new Error("A PayPal order token is required.");
  }

  if (mock || getPayPalMode() === "mock") {
    return normalizeCapturedOrder(await getPayPalOrder(orderId), orderId);
  }

  try {
    const order = await callPayPalApi(`/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`, {
      method: "POST",
      requestId: `CAP-${orderId}`,
      body: {}
    });

    return normalizeCapturedOrder(order, orderId);
  } catch (error) {
    if (error?.paypalStatus === 409 || error?.paypalStatus === 422) {
      const existingOrder = await getPayPalOrder(orderId);
      const normalizedOrder = normalizeCapturedOrder(existingOrder, orderId);

      if (normalizedOrder.status === "paid") {
        return normalizedOrder;
      }
    }

    throw error;
  }
}

export async function verifyPayPalPaymentCallback({ paymentSession, payload, rawBody, signature }) {
  if ((payload.callbackToken || "") && (paymentSession.callbackToken || "")) {
    if (payload.callbackToken !== paymentSession.callbackToken) {
      throw new Error("PayPal callback token is invalid.");
    }
  }

  return {
    verified: true,
    externalId: payload.externalId || paymentSession.externalId || paymentSession.reference,
    providerStatus: payload.providerStatus || payload.status || paymentSession.providerStatus,
    rawResponse: {
      body: payload,
      rawBody,
      signature: signature || null
    }
  };
}
