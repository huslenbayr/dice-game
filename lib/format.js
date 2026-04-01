import { getCurrencyForLanguage, getLocaleForLanguage } from "@/lib/currency";

export function formatCurrency(amount, language = "en", options = {}) {
  const locale = options.locale || getLocaleForLanguage(language);
  const currency = options.currency || getCurrencyForLanguage(language);

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Number(amount || 0));
}

export function formatDate(value, language = "en") {
  return new Intl.DateTimeFormat(getLocaleForLanguage(language), {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(`${value}T12:00:00Z`));
}

export function formatDateTime(value, language = "en") {
  return new Intl.DateTimeFormat(getLocaleForLanguage(language), {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}
