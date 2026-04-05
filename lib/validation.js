import { normalizeLanguage } from "@/lib/i18n";
import { createHttpError } from "@/lib/errors";

export function assertBookingPayload(payload) {
  const requiredFields = ["tourId", "date", "people", "name", "email", "phone", "nationality"];

  for (const field of requiredFields) {
    if (!String(payload[field] ?? "").trim()) {
      throw createHttpError(400, `${field} is required.`);
    }
  }

  const people = Number(payload.people);
  if (!Number.isInteger(people) || people < 1 || people > 12) {
    throw createHttpError(400, "People must be between 1 and 12.");
  }

  const email = String(payload.email || "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createHttpError(400, "Email is invalid.");
  }

  return {
    tourId: String(payload.tourId).trim(),
    date: String(payload.date).trim(),
    people,
    name: String(payload.name).trim(),
    email,
    phone: String(payload.phone).trim(),
    nationality: String(payload.nationality).trim(),
    specialRequest: String(payload.specialRequest || "").trim(),
    language: normalizeLanguage(payload.language)
  };
}

export function assertEmailLeadPayload(payload) {
  const email = String(payload.email || "").trim().toLowerCase();
  const source = String(payload.source || "homepage").trim().toLowerCase() || "homepage";

  if (!email) {
    throw createHttpError(400, "Email is required.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createHttpError(400, "Email is invalid.");
  }

  return {
    email,
    source,
    language: normalizeLanguage(payload.language)
  };
}

const PAYMENT_STATUSES = ["pending", "paid", "failed", "cancelled", "refunded"];
const PAYMENT_METHODS = ["qpay", "card", "paypal"];

export function assertPaymentCreatePayload(payload) {
  const bookingId = String(payload.bookingId || "").trim();
  const method = payload.method ? String(payload.method).trim().toLowerCase() : "";

  if (!bookingId) {
    throw createHttpError(400, "bookingId is required.");
  }

  if (method && !PAYMENT_METHODS.includes(method)) {
    throw createHttpError(400, "Unsupported payment method.");
  }

  return {
    bookingId,
    method: method || null,
    card: payload.card || null
  };
}

export function assertPaymentCallbackPayload(payload) {
  const provider = String(payload.provider || "").trim().toLowerCase();
  const paymentId = String(payload.paymentId || "").trim();
  const bookingId = String(payload.bookingId || "").trim();
  const reference = String(payload.reference || "").trim();
  const externalId = String(payload.externalId || "").trim();
  const status = String(payload.status || "").trim().toLowerCase();

  if (!provider) {
    throw createHttpError(400, "provider is required.");
  }

  if (!paymentId && !bookingId && !reference && !externalId) {
    throw createHttpError(400, "paymentId, bookingId, reference, or externalId is required.");
  }

  if (!PAYMENT_STATUSES.includes(status)) {
    throw createHttpError(400, "Unsupported payment status.");
  }

  return {
    ...payload,
    provider,
    paymentId: paymentId || null,
    bookingId: bookingId || null,
    reference: reference || null,
    externalId: externalId || null,
    status
  };
}

export function assertPaymentStatusLookup(searchParams) {
  const bookingId = String(searchParams.get("bookingId") || "").trim();
  const paymentId = String(searchParams.get("paymentId") || "").trim();

  if (!bookingId && !paymentId) {
    throw createHttpError(400, "bookingId or paymentId is required.");
  }

  return {
    bookingId: bookingId || null,
    paymentId: paymentId || null
  };
}

export function isSupportedPaymentStatus(status) {
  return PAYMENT_STATUSES.includes(String(status || "").trim().toLowerCase());
}
