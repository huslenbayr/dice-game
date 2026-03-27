import { randomUUID } from "crypto";

export async function createQPaySession({ booking, amount, currency }) {
  const reference = `QPAY-${randomUUID().slice(0, 8).toUpperCase()}`;
  const externalId = `QPAY-INVOICE-${randomUUID().slice(0, 12).toUpperCase()}`;
  const callbackToken = randomUUID();

  return {
    method: "qpay",
    provider: "qpay-ready",
    status: "pending",
    providerStatus: "pending",
    amount,
    currency,
    reference,
    externalId,
    qrText: `QPAY-DEMO|${reference}|${booking.id}|${amount}`,
    deepLink: `qpay://pay?invoice=${reference}`,
    applePayEligible: false,
    cardSummary: null,
    callbackToken,
    rawResponse: {
      provider: "qpay-ready",
      mock: true,
      externalId,
      reference
    },
    failureReason: null,
    instructions: {
      en: "QPay QR and deep-link checkout can connect here later, including callback-based payment confirmation.",
      mn: "Энд дараа нь QPay QR, deep link болон callback-д суурилсан төлбөрийн баталгаажуулалтыг холбоно."
    }
  };
}
