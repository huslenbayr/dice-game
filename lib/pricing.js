import { getCurrencyForLanguage, getLocaleForLanguage, PRICE_BASE_CURRENCY } from "@/lib/currency";
import { formatCurrency } from "@/lib/format";

export function buildPricingContext(language, exchangeRates) {
  return {
    language,
    locale: getLocaleForLanguage(language),
    baseCurrency: exchangeRates?.baseCurrency || PRICE_BASE_CURRENCY,
    displayCurrency: getCurrencyForLanguage(language),
    rates: exchangeRates?.rates || {
      [PRICE_BASE_CURRENCY]: 1
    },
    mode: exchangeRates?.mode || "fallback",
    stale: Boolean(exchangeRates?.stale),
    fetchedAt: exchangeRates?.fetchedAt || null,
    publishedAt: exchangeRates?.publishedAt || null,
    sourceName: exchangeRates?.sourceName || null,
    sourceUrl: exchangeRates?.sourceUrl || null,
    error: exchangeRates?.error || null
  };
}

export function convertPrice(amount, pricing) {
  const numericAmount = Number(amount || 0);

  if (!pricing) {
    return numericAmount;
  }

  const baseRate = Number(pricing.rates?.[pricing.baseCurrency] || 1);
  const targetRate = Number(pricing.rates?.[pricing.displayCurrency] || 0);

  if (!baseRate || !targetRate) {
    return numericAmount;
  }

  return numericAmount * (targetRate / baseRate);
}

export function getPriceDisplay(amount, pricing, language = pricing?.language || "en") {
  const convertedAmount = convertPrice(amount, pricing);
  const currency = pricing?.displayCurrency || getCurrencyForLanguage(language);

  return {
    amount: convertedAmount,
    currency,
    formatted: formatCurrency(convertedAmount, language, {
      currency
    })
  };
}

export function getPricingStatusMessage(pricing, ui) {
  if (!pricing?.stale) {
    return "";
  }

  if (pricing.mode === "fallback") {
    return ui.common.exchangeRateBackup;
  }

  return ui.common.exchangeRateCached;
}
