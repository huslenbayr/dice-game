import { cookies } from "next/headers";

export const LANGUAGES = ["mn", "en"];
export const DEFAULT_LANGUAGE = "en";

export async function getCurrentLanguage() {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get("mongolway-lang")?.value;

  if (LANGUAGES.includes(cookieValue)) {
    return cookieValue;
  }

  return DEFAULT_LANGUAGE;
}

export function normalizeLanguage(value) {
  return LANGUAGES.includes(value) ? value : DEFAULT_LANGUAGE;
}

export function localize(value, language) {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "string" || typeof value === "number") {
    return value;
  }

  if (Array.isArray(value)) {
    return value;
  }

  return value[language] ?? value[DEFAULT_LANGUAGE] ?? Object.values(value)[0] ?? "";
}

export function statusLabel(status, language) {
  const labels = {
    pending: {
      en: "Pending",
      mn: "Хүлээгдэж буй"
    },
    paid: {
      en: "Paid",
      mn: "Төлөгдсөн"
    },
    cancelled: {
      en: "Cancelled",
      mn: "Цуцлагдсан"
    },
    failed: {
      en: "Failed",
      mn: "Амжилтгүй"
    },
    refunded: {
      en: "Refunded",
      mn: "Буцаан олгосон"
    }
  };

  return localize(labels[status] || labels.pending, language);
}
