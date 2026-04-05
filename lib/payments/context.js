function normalizeValue(value) {
  return String(value || "").trim().toLowerCase();
}

function isMongolianNationality(value) {
  const normalized = normalizeValue(value);
  return normalized.includes("mongol") || normalized.includes("mongolia") || normalized.includes("монгол");
}

function isMongolianPhone(value) {
  const normalized = String(value || "").replace(/[^\d+]/g, "");
  return normalized.startsWith("+976") || normalized.startsWith("976");
}

export function getTravelerMarket(booking) {
  if (isMongolianNationality(booking.nationality)) {
    return "local";
  }

  if (!booking.nationality && isMongolianPhone(booking.phone)) {
    return "local";
  }

  return "international";
}

export function getPaymentMethodOptions(booking) {
  const travelerMarket = getTravelerMarket(booking);
  const recommendedMethodId = travelerMarket === "local" ? "qpay" : "paypal";
  const methods = [
    {
      id: "paypal",
      type: "redirect",
      title: {
        en: "PayPal",
        mn: "PayPal"
      },
      description: {
        en: "Best for international travelers. Redirect to PayPal for approval, then return to the booking page with the confirmed payment state.",
        mn: "Гадаад аялагчдад хамгийн тохиромжтой. PayPal руу орж зөвшөөрөөд, баталгаажсан төлбөрийн төлөвтэйгээр захиалгын хуудас руу буцна."
      },
      recommendedFor: "international",
      capabilities: {
        cardEntry: false,
        applePayReady: false,
        qr: false,
        deepLink: true
      }
    },
    {
      id: "card",
      type: "card",
      title: {
        en: "Card payment",
        mn: "Картаар төлөх"
      },
      description: {
        en: "Fallback checkout for manual card entry. Apple Pay can still be layered in later when the connected card gateway supports it.",
        mn: "Гар аргаар карт оруулах fallback checkout. Холбогдсон картын gateway дэмжвэл дараа нь Apple Pay-г нэмж болно."
      },
      recommendedFor: "international",
      capabilities: {
        cardEntry: true,
        applePayReady: true,
        qr: false,
        deepLink: false
      }
    },
    {
      id: "qpay",
      type: "qr",
      title: {
        en: "QPay",
        mn: "QPay"
      },
      description: {
        en: "Best for local checkout with QR and deep-link readiness for Mongolian users.",
        mn: "Монгол хэрэглэгчдэд зориулсан QR болон deep link-д бэлэн төлбөрийн сонголт."
      },
      recommendedFor: "local",
      capabilities: {
        cardEntry: false,
        applePayReady: false,
        qr: true,
        deepLink: true
      }
    }
  ];

  methods.sort((left, right) => {
    if (left.id === recommendedMethodId) {
      return -1;
    }

    if (right.id === recommendedMethodId) {
      return 1;
    }

    return 0;
  });

  return {
    travelerMarket,
    recommendedMethodId,
    methods
  };
}
