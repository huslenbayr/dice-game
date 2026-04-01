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

export function formatCurrency(amount, language = "en") {
  const locale = getLocale(language);
  const formattedNumber = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Number(amount || 0));

  return `$${formattedNumber}`;
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
