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
  const recommendedMethodId = travelerMarket === "local" ? "qpay" : "card";
  const methods = [
    {
      id: "card",
      type: "card",
      title: {
        en: "Card payment",
        mn: "Картаар төлөх"
      },
      description: {
        en: "Best for international travelers. Card checkout is prepared first, with room to add Apple Pay on supported gateways later.",
        mn: "Гадаад аялагчдад илүү тохиромжтой. Эхний ээлжид картын checkout, дараа нь дэмждэг gateway дээр Apple Pay нэмэх боломжтой."
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

