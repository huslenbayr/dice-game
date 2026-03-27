export function formatCurrency(amount, language = "en") {
  const locale = language === "mn" ? "mn-MN" : "en-US";
  const formattedNumber = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Number(amount || 0));

  return `$${formattedNumber}`;
}

export function formatDate(value, language = "en") {
  return new Intl.DateTimeFormat(language === "mn" ? "mn-MN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(`${value}T12:00:00Z`));
}

export function formatDateTime(value, language = "en") {
  return new Intl.DateTimeFormat(language === "mn" ? "mn-MN" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}
