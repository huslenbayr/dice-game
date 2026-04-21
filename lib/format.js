function getLocale(language = "en") {
  const locales = {
    en: "en-US",
    mn: "mn-MN",
    ja: "ja-JP",
    ko: "ko-KR",
    es: "es-ES"
  };

  return locales[language] || locales.en;
}

const LANGUAGE_CURRENCY = {
  en: "USD",
  mn: "MNT",
  ja: "JPY",
  ko: "KRW",
  es: "EUR"
};

const USD_DISPLAY_RATES = {
  USD: 1,
  EUR: 0.8676,
  JPY: 159.42,
  KRW: 1515.48,
  MNT: 3568.72
};

function getDisplayCurrency(language = "en") {
  return LANGUAGE_CURRENCY[language] || LANGUAGE_CURRENCY.en;
}

export function formatCurrency(amount, language = "en", options = {}) {
  const locale = getLocale(language);
  const baseCurrency = String(options.baseCurrency || "USD").toUpperCase();
  const currency = String(options.currency || getDisplayCurrency(language)).toUpperCase();
  const shouldConvert = options.convert ?? (baseCurrency === "USD" && currency !== baseCurrency);
  const exchangeRate = USD_DISPLAY_RATES[currency] || 1;
  const normalizedAmount = Number(amount || 0);
  const convertedAmount = shouldConvert ? normalizedAmount * exchangeRate : normalizedAmount;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(convertedAmount);
}

export function formatCurrencyRange(minAmount, maxAmount, language = "en", options = {}) {
  const minimum = Number(minAmount || 0);
  const maximum = Number(maxAmount || 0);

  if (!maximum || maximum === minimum) {
    return formatCurrency(minimum, language, options);
  }

  return `${formatCurrency(minimum, language, options)}-${formatCurrency(maximum, language, options)}`;
}

export function formatTourPriceRange(tour, language = "en", options = {}) {
  return formatCurrencyRange(tour?.price, tour?.priceTo, language, options);
}

export function formatDate(value, language = "en") {
  return new Intl.DateTimeFormat(getLocale(language), {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(`${value}T12:00:00Z`));
}

export function formatDateTime(value, language = "en") {
  return new Intl.DateTimeFormat(getLocale(language), {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}
