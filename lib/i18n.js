export const LANGUAGES = ["en", "mn", "ja", "ko", "es"];
export const DEFAULT_LANGUAGE = "en";
export const LANGUAGE_COOKIE = "mongolway-lang";

export const LANGUAGE_OPTIONS = [
  {
    code: "en",
    shortLabel: "EN",
    nativeLabel: "English"
  },
  {
    code: "mn",
    shortLabel: "MN",
    nativeLabel: "Монгол"
  },
  {
    code: "ja",
    shortLabel: "JA",
    nativeLabel: "日本語"
  },
  {
    code: "ko",
    shortLabel: "KO",
    nativeLabel: "한국어"
  },
  {
    code: "es",
    shortLabel: "ES",
    nativeLabel: "Español"
  }
];

export async function getCurrentLanguage() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(LANGUAGE_COOKIE)?.value;

  if (LANGUAGES.includes(cookieValue)) {
    return cookieValue;
  }

  return DEFAULT_LANGUAGE;
}

export function normalizeLanguage(value) {
  return LANGUAGES.includes(value) ? value : DEFAULT_LANGUAGE;
}

export function getLanguageOption(code) {
  return LANGUAGE_OPTIONS.find((item) => item.code === code) || LANGUAGE_OPTIONS[0];
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

export function interpolate(template, values = {}) {
  return String(template || "").replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ""));
}

export function statusLabel(status, language) {
  const labels = {
    pending: {
      en: "Pending",
      mn: "Хүлээгдэж буй",
      ja: "保留中",
      ko: "대기 중",
      es: "Pendiente"
    },
    paid: {
      en: "Paid",
      mn: "Төлөгдсөн",
      ja: "支払い済み",
      ko: "결제 완료",
      es: "Pagado"
    },
    cancelled: {
      en: "Cancelled",
      mn: "Цуцлагдсан",
      ja: "キャンセル済み",
      ko: "취소됨",
      es: "Cancelado"
    },
    failed: {
      en: "Failed",
      mn: "Амжилтгүй",
      ja: "失敗",
      ko: "실패",
      es: "Fallido"
    },
    refunded: {
      en: "Refunded",
      mn: "Буцаан олгосон",
      ja: "返金済み",
      ko: "환불됨",
      es: "Reembolsado"
    }
  };

  return localize(labels[status] || labels.pending, language);
}
