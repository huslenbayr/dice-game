import { randomUUID } from "crypto";

function getCardProviderMode() {
  return String(process.env.CARD_PAYMENT_PROVIDER || "mock").toLowerCase();
}

function assertLiveCardProviderConfig() {
  const missing = ["CARD_PAYMENT_SECRET_KEY", "CARD_PAYMENT_WEBHOOK_SECRET"].filter(
    (key) => !process.env[key]
  );

  if (missing.length) {
    throw new Error(
      `Card payment live mode is enabled, but these server variables are missing: ${missing.join(", ")}.`
    );
  }
}

function normalizeCardNumber(value) {
  return String(value || "").replace(/\s+/g, "");
}

function detectCardBrand(cardNumber) {
  if (/^4/.test(cardNumber)) {
    return "Visa";
  }

  if (/^(5[1-5]|2[2-7])/.test(cardNumber)) {
    return "Mastercard";
  }

  if (/^3[47]/.test(cardNumber)) {
    return "Amex";
  }

  return "Card";
}

function passesLuhn(cardNumber) {
  let sum = 0;
  let shouldDouble = false;

  for (let index = cardNumber.length - 1; index >= 0; index -= 1) {
    let digit = Number(cardNumber[index]);

    if (Number.isNaN(digit)) {
      return false;
    }

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

function assertCardPayload(card) {
  const normalizedNumber = normalizeCardNumber(card.cardNumber);
  const month = Number(card.expiryMonth);
  const year = Number(card.expiryYear);
  const cvc = String(card.cvc || "").trim();
  const cardholderName = String(card.cardholderName || "").trim();

  if (!cardholderName) {
    throw new Error("Cardholder name is required.");
  }

  if (!/^\d{13,19}$/.test(normalizedNumber) || !passesLuhn(normalizedNumber)) {
    throw new Error("Card number is invalid.");
  }

  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new Error("Expiry month is invalid.");
  }

  if (!Number.isInteger(year) || year < new Date().getFullYear()) {
    throw new Error("Expiry year is invalid.");
  }

  if (!/^\d{3,4}$/.test(cvc)) {
    throw new Error("CVC is invalid.");
  }

  return {
    normalizedNumber,
    month,
    year,
    cardholderName
  };
}

export async function createCardPaymentSession({ booking, amount, currency, card }) {
  if (getCardProviderMode() === "live") {
    assertLiveCardProviderConfig();
    throw new Error("Card live mode is configured, but the real gateway client is not connected yet.");
  }

  const validatedCard = assertCardPayload(card);
  const shouldFail = validatedCard.normalizedNumber.endsWith("0002");
  const brand = detectCardBrand(validatedCard.normalizedNumber);
  const last4 = validatedCard.normalizedNumber.slice(-4);
  const reference = `CARD-${randomUUID().slice(0, 8).toUpperCase()}`;
  const externalId = `CARD-SESSION-${randomUUID().slice(0, 12).toUpperCase()}`;
  const callbackToken = randomUUID();
  const status = shouldFail ? "failed" : "paid";

  return {
    method: "card",
    provider: "card-gateway-ready",
    status,
    providerStatus: status,
    amount,
    currency,
    reference,
    externalId,
    qrText: null,
    deepLink: null,
    applePayEligible: true,
    cardSummary: {
      brand,
      last4,
      cardholderName: validatedCard.cardholderName
    },
    callbackToken,
    rawResponse: {
      provider: "card-gateway-ready",
      mock: true,
      approved: !shouldFail,
      externalId,
      reference
    },
    failureReason: shouldFail ? "The mock card gateway marked the payment as failed." : null,
    instructions: {
      en: shouldFail
        ? "The mock card gateway returned a failed payment state. Connect a live provider later to replace this simulation."
        : "The mock card gateway approved this payment. Replace it with a live card provider when credentials are ready.",
      mn: shouldFail
        ? "Mock картын gateway төлбөрийг failed төлөвт буцаалаа. Дараа нь бодит provider-оор энэ симуляцийг солино."
        : "Mock картын gateway энэ төлбөрийг зөвшөөрлөө. Бодит provider холбох үед энэ симуляцийг солино."
    }
  };
}

export async function verifyCardPaymentCallback({ paymentSession, payload, rawBody, signature }) {
  const webhookSecret = process.env.CARD_PAYMENT_WEBHOOK_SECRET;

  if (getCardProviderMode() === "live") {
    assertLiveCardProviderConfig();
  }

  if (webhookSecret) {
    if (signature !== webhookSecret) {
      throw new Error("Card payment callback signature is invalid.");
    }
  } else if ((payload.callbackToken || "") !== (paymentSession.callbackToken || "")) {
    throw new Error(
      "CARD_PAYMENT_WEBHOOK_SECRET is not configured, so the callbackToken must match the stored payment session."
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
