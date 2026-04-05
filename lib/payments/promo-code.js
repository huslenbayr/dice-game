import { createHttpError } from "@/lib/errors";

const DEFAULT_PROMO_CODE = "MONGOLWAY001";
const DEFAULT_PROMO_AMOUNT = 0.01;

function roundCurrencyAmount(value) {
  return Math.round(Number(value || 0) * 100) / 100;
}

export function normalizePromoCode(value) {
  return String(value || "").trim().toUpperCase();
}

export function getPromoCodeConfig() {
  const configuredCode = normalizePromoCode(process.env.CHECKOUT_PROMO_CODE || process.env.PROMO_CODE || DEFAULT_PROMO_CODE);
  const configuredAmount = roundCurrencyAmount(
    process.env.CHECKOUT_PROMO_AMOUNT || process.env.PROMO_PRICE || DEFAULT_PROMO_AMOUNT
  );

  return {
    code: configuredCode,
    amount: configuredAmount >= 0.01 ? configuredAmount : DEFAULT_PROMO_AMOUNT
  };
}

export function resolvePromotionalPricing({ baseAmount, promoCode }) {
  const normalizedPromoCode = normalizePromoCode(promoCode);
  const normalizedBaseAmount = roundCurrencyAmount(baseAmount);

  if (!normalizedPromoCode) {
    return {
      originalAmount: normalizedBaseAmount,
      finalAmount: normalizedBaseAmount,
      promo: null
    };
  }

  const config = getPromoCodeConfig();

  if (normalizedPromoCode !== config.code) {
    throw createHttpError(400, "Promo code is invalid.");
  }

  const finalAmount = Math.min(normalizedBaseAmount, config.amount);
  const discountAmount = roundCurrencyAmount(normalizedBaseAmount - finalAmount);

  return {
    originalAmount: normalizedBaseAmount,
    finalAmount,
    promo: {
      applied: true,
      code: normalizedPromoCode,
      originalAmount: normalizedBaseAmount,
      discountAmount,
      finalAmount
    }
  };
}
