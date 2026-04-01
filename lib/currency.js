export const PRICE_BASE_CURRENCY = "USD";

export const LANGUAGE_TO_LOCALE = {
  en: "en-US",
  mn: "mn-MN",
  ja: "ja-JP",
  ko: "ko-KR",
  es: "es-ES"
};

export const LANGUAGE_TO_CURRENCY = {
  en: "USD",
  mn: "MNT",
  ja: "JPY",
  ko: "KRW",
  es: "EUR"
};

export const SUPPORTED_DISPLAY_CURRENCIES = [...new Set(Object.values(LANGUAGE_TO_CURRENCY))];

export function getLocaleForLanguage(language = "en") {
  return LANGUAGE_TO_LOCALE[language] || LANGUAGE_TO_LOCALE.en;
}

export function getCurrencyForLanguage(language = "en") {
  return LANGUAGE_TO_CURRENCY[language] || LANGUAGE_TO_CURRENCY.en;
}
