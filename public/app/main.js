const app = document.getElementById("app");

const translations = {
  en: {
    locale: "en-US",
    brandTagline: "Trusted guide-led journeys",
    nav: {
      home: "Home",
      about: "About",
      tours: "Tours",
      gallery: "Gallery",
      blog: "Travel Tips",
      faq: "FAQ",
      contact: "Contact",
      dashboard: "Dashboard",
      admin: "Admin",
      signin: "Sign in"
    },
    common: {
      exploreTours: "Explore tours",
      startBooking: "Start booking",
      contactUs: "Speak to an advisor",
      learnMore: "Learn more",
      viewDetails: "View details",
      payNow: "Pay now",
      saveChanges: "Save changes",
      cancelBooking: "Cancel booking",
      premiumTravel: "Premium guide service",
      trustedSince: "Trusted since 2012",
      heroEyebrow: "Trusted online tourism guide service",
      reasonsEyebrow: "Why guests choose us",
      destinationsEyebrow: "Featured destinations",
      toursEyebrow: "Popular tour packages",
      reviewsEyebrow: "Guest reviews",
      guidesEyebrow: "Meet the guide team",
      newsletterEyebrow: "Seasonal offers and travel tips",
      mapEyebrow: "Map and office",
      dashboardEyebrow: "Customer account",
      adminEyebrow: "Operations dashboard",
      bookNow: "Book now",
      browseGuides: "Meet our guides"
    },
    home: {
      title: "Journeys that feel impeccably planned and genuinely local.",
      copy:
        "Atlas Path Travel pairs elegant itineraries with trusted local guides, secure online booking, and calm guest care for travelers who want confidence as much as inspiration.",
      proofTitle: "Trusted by repeat travelers, families, and corporate guests",
      proofCopy:
        "From private anniversary escapes to polished small-group departures, we build routes that feel refined, personal, and easy to trust.",
      reasonsTitle: "Built to feel premium, clear, and dependable",
      destinationsTitle: "Signature destinations curated for confidence",
      toursTitle: "Popular departures ready to book online",
      reviewsTitle: "What travelers say after the journey",
      newsletterTitle: "Get first access to seasonal offers and insider travel notes",
      newsletterCopy:
        "We send thoughtful destination updates, new departures, and offer windows without spamming your inbox."
    },
    about: {
      title: "A tourism company designed around trust, clarity, and local expertise.",
      copy:
        "We combine careful planning, experienced guides, and transparent service design so guests can book with confidence and travel with ease.",
      mission: "Mission",
      vision: "Vision",
      highlights: "Service highlights",
      teamTitle: "Guides guests remember by name"
    },
    tours: {
      title: "Curated tours with transparent detail before you book.",
      copy:
        "Compare destinations, durations, prices, categories, and ratings, then move directly into booking and payment with a clear summary.",
      filters: "Find the right journey",
      noResults: "No tours match your current filters. Try widening price or duration."
    },
    booking: {
      title: "Secure your tour in a few calm steps.",
      copy:
        "Choose a departure, confirm guest details, review the booking summary, and move directly into deposit or full payment.",
      summary: "Booking summary",
      support: "Need a custom rooming request or a private departure? Add it in special requests and our team will follow up."
    },
    payment: {
      title: "Protected payment and instant invoice detail.",
      copy:
        "Choose deposit or full settlement, apply a promo code if available, and track the payment status immediately.",
      summary: "Payment summary",
      receipt: "Receipt and invoice"
    },
    dashboard: {
      title: "Manage your trips, payments, and profile from one place.",
      copy:
        "Signed-in travelers can review bookings, track balances, request changes, and keep profile information current.",
      authTitle: "Sign in or create an account",
      authCopy:
        "Accounts let you manage bookings, review payment status, and modify eligible departures online."
    },
    admin: {
      title: "Operational visibility for tours, bookings, customers, guides, and payments.",
      copy:
        "This dashboard surfaces the data a trusted travel business needs every day, from revenue and popular itineraries to status updates and review moderation."
    },
    contact: {
      title: "Speak with a trusted travel advisor.",
      copy:
        "Reach our guest care team by email, phone, or WhatsApp, or leave a planning note and we will respond quickly."
    },
    faq: {
      title: "Frequently asked questions",
      copy: "Clear answers about booking, payments, policies, and guide support."
    },
    gallery: {
      title: "A visual look at the journeys we design.",
      copy: "Browse destination and itinerary imagery from our signature departures."
    },
    blog: {
      title: "Travel tips and destination notes from the Atlas Path team.",
      copy: "Editorial guides, planning advice, and seasonal insights to help guests travel well."
    },
    signin: {
      title: "Welcome back",
      copy: "Use your customer or admin account to access the relevant dashboard."
    }
  },
  es: {
    locale: "es-ES",
    brandTagline: "Viajes guiados de confianza",
    nav: {
      home: "Inicio",
      about: "Nosotros",
      tours: "Tours",
      gallery: "Galería",
      blog: "Consejos",
      faq: "FAQ",
      contact: "Contacto",
      dashboard: "Cuenta",
      admin: "Admin",
      signin: "Acceder"
    },
    common: {
      exploreTours: "Explorar tours",
      startBooking: "Reservar ahora",
      contactUs: "Hablar con un asesor",
      learnMore: "Más información",
      viewDetails: "Ver detalles",
      payNow: "Pagar ahora",
      saveChanges: "Guardar cambios",
      cancelBooking: "Cancelar reserva",
      premiumTravel: "Servicio premium",
      trustedSince: "Confianza desde 2012",
      heroEyebrow: "Servicio turístico online de confianza",
      reasonsEyebrow: "Por qué elegirnos",
      destinationsEyebrow: "Destinos destacados",
      toursEyebrow: "Paquetes populares",
      reviewsEyebrow: "Opiniones de viajeros",
      guidesEyebrow: "Nuestro equipo de guías",
      newsletterEyebrow: "Ofertas y consejos",
      mapEyebrow: "Mapa y oficina",
      dashboardEyebrow: "Cuenta del cliente",
      adminEyebrow: "Panel operativo",
      bookNow: "Reservar",
      browseGuides: "Conocer guías"
    },
    home: {
      title: "Viajes impecablemente planificados y profundamente locales.",
      copy:
        "Atlas Path Travel une itinerarios elegantes con guías expertos, reservas seguras y atención cercana para viajeros que buscan confianza e inspiración.",
      proofTitle: "Confiado por viajeros repetitivos, familias y clientes corporativos",
      proofCopy:
        "Desde aniversarios privados hasta salidas en grupos pequeños, diseñamos rutas refinadas y fáciles de confiar.",
      reasonsTitle: "Diseñado para sentirse premium, claro y confiable",
      destinationsTitle: "Destinos seleccionados con seguridad",
      toursTitle: "Salidas populares para reservar online",
      reviewsTitle: "Lo que dicen nuestros viajeros",
      newsletterTitle: "Recibe ofertas de temporada y notas exclusivas",
      newsletterCopy:
        "Compartimos actualizaciones útiles sobre destinos, nuevas salidas y promociones sin saturar tu bandeja."
    },
    about: {
      title: "Una empresa turística creada alrededor de la confianza, la claridad y la experiencia local.",
      copy:
        "Combinamos planificación cuidadosa, guías con experiencia y un servicio transparente para que el viaje se sienta sencillo desde el primer clic.",
      mission: "Misión",
      vision: "Visión",
      highlights: "Puntos fuertes",
      teamTitle: "Guías que los viajeros recuerdan"
    },
    tours: {
      title: "Tours curados con información transparente antes de reservar.",
      copy:
        "Compara destinos, duración, precio, categoría y valoración antes de avanzar hacia la reserva y el pago.",
      filters: "Encuentra tu viaje",
      noResults: "No hay tours con estos filtros. Ajusta precio o duración."
    },
    booking: {
      title: "Confirma tu viaje en pocos pasos.",
      copy:
        "Selecciona una salida, revisa el resumen y continúa directamente al pago del depósito o del importe total.",
      summary: "Resumen de reserva",
      support: "¿Necesitas una salida privada o una solicitud especial? Escríbelo en los comentarios."
    },
    payment: {
      title: "Pago protegido e información inmediata de factura.",
      copy:
        "Elige depósito o pago completo, aplica un código promocional y revisa el estado del pago al momento.",
      summary: "Resumen de pago",
      receipt: "Recibo y factura"
    },
    dashboard: {
      title: "Gestiona tus viajes, pagos y perfil desde un solo lugar.",
      copy:
        "Los viajeros registrados pueden revisar reservas, saldos, solicitudes de cambio y datos de perfil.",
      authTitle: "Accede o crea una cuenta",
      authCopy:
        "La cuenta te permite gestionar reservas, revisar pagos y modificar salidas elegibles online."
    },
    admin: {
      title: "Visibilidad operativa para tours, reservas, clientes, guías y pagos.",
      copy:
        "Este panel muestra lo que un negocio turístico de confianza necesita controlar cada día."
    },
    contact: {
      title: "Habla con un asesor de viajes de confianza.",
      copy:
        "Contacta a nuestro equipo por correo, teléfono o WhatsApp, o deja un mensaje de planificación."
    },
    faq: {
      title: "Preguntas frecuentes",
      copy: "Respuestas claras sobre reservas, pagos, políticas y guías."
    },
    gallery: {
      title: "Una mirada visual a los viajes que diseñamos.",
      copy: "Explora imágenes de destinos y rutas de nuestras salidas destacadas."
    },
    blog: {
      title: "Consejos de viaje y notas de destino del equipo Atlas Path.",
      copy: "Guías editoriales, consejos de planificación e ideas de temporada."
    },
    signin: {
      title: "Bienvenido de nuevo",
      copy: "Usa tu cuenta de cliente o administrador para entrar."
    }
  }
};

const state = {
  language: window.localStorage.getItem("atlas-language") || "en",
  publicData: null,
  currentUser: null,
  loadingRoute: true,
  mobileMenu: false,
  notice: null,
  noticeTimer: null,
  dashboardData: {
    bookings: [],
    payments: []
  },
  adminData: null,
  latestBooking: null,
  latestPayment: null,
  paymentContext: {
    booking: null,
    payment: null
  },
  bookingDraft: {
    tourId: "",
    date: "",
    guests: 2
  },
  paymentDraft: {
    bookingId: "",
    accessCode: "",
    paymentOption: "deposit",
    method: "card",
    promoCode: ""
  },
  filters: {
    destination: "all",
    price: "all",
    duration: "all",
    category: "all",
    rating: "all"
  }
};

function translate(path) {
  const languagePack = translations[state.language] || translations.en;
  const fallback = translations.en;

  const lookup = (source) =>
    path.split(".").reduce((value, key) => (value && value[key] !== undefined ? value[key] : undefined), source);

  return lookup(languagePack) ?? lookup(fallback) ?? path;
}

function locale() {
  return translate("locale");
}

function getRoute() {
  const pathname = window.location.pathname;
  const trimmed = pathname.replace(/^\/+|\/+$/g, "");
  const segments = trimmed ? trimmed.split("/") : [];

  if (segments.length === 0) {
    return { page: "home" };
  }

  if (segments[0] === "tours" && segments[1]) {
    return { page: "tour-detail", slug: segments.slice(1).join("/") };
  }

  if (segments[0] === "tours") {
    return { page: "tours" };
  }

  if (
    [
      "about",
      "booking",
      "payment",
      "dashboard",
      "contact",
      "faq",
      "gallery",
      "blog",
      "admin",
      "signin"
    ].includes(segments[0])
  ) {
    return { page: segments[0] };
  }

  return { page: "not-found" };
}

function getQuery() {
  return new URLSearchParams(window.location.search);
}

function selected(value, expected) {
  return value === expected ? "selected" : "";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatMoney(value) {
  return new Intl.NumberFormat(locale(), {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(Number(value || 0));
}

function formatDate(value) {
  if (!value) {
    return "TBD";
  }

  return new Intl.DateTimeFormat(locale(), {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(`${value}T12:00:00Z`));
}

function formatDateTime(value) {
  if (!value) {
    return "Pending";
  }

  return new Intl.DateTimeFormat(locale(), {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function setNotice(text, type = "success") {
  if (state.noticeTimer) {
    window.clearTimeout(state.noticeTimer);
  }

  state.notice = { text, type };
  state.noticeTimer = window.setTimeout(() => {
    state.notice = null;
    render();
  }, 5200);
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    body:
      options.body && typeof options.body !== "string"
        ? JSON.stringify(options.body)
        : options.body
  });

  const isJson = (response.headers.get("content-type") || "").includes("application/json");
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    throw new Error(payload.error || payload || "Request failed.");
  }

  return payload;
}

function uniqueValues(items, selector) {
  return [...new Set(items.map(selector).filter(Boolean))];
}

function findTourById(tourId) {
  return (state.publicData?.tours || []).find((tour) => tour.id === tourId) || null;
}

function findTourBySlug(slug) {
  return (state.publicData?.tours || []).find((tour) => tour.slug === slug) || null;
}

function findGuideById(guideId) {
  return (state.publicData?.guides || []).find((guide) => guide.id === guideId) || null;
}

function renderStatus(status) {
  return `<span class="status status--${escapeHtml(status || "pending")}">${escapeHtml(status || "pending")}</span>`;
}

function renderSectionIntro(eyebrow, title, copy, action = "") {
  return `
    <div class="section__intro">
      <div>
        <div class="eyebrow">${escapeHtml(eyebrow)}</div>
        <h2 class="section-title">${escapeHtml(title)}</h2>
        <p class="section-copy">${escapeHtml(copy)}</p>
      </div>
      ${action}
    </div>
  `;
}

function renderFeatureList(items) {
  return `
    <div class="feature-list">
      ${items
        .map(
          (item) => `
            <div class="feature-list__item">
              <span class="feature-list__bullet"></span>
              <div>${escapeHtml(item)}</div>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function renderTourCard(tour) {
  return `
    <article class="tour-card">
      <div class="tour-card__image" style="background-image: linear-gradient(180deg, rgba(16,32,49,0.02), rgba(16,32,49,0.34)), url('${escapeHtml(
        tour.image
      )}')"></div>
      <div class="tour-card__body">
        <div class="badge-row">
          <span class="badge">${escapeHtml(tour.category)}</span>
          <span class="badge badge--gold">${tour.rating.toFixed(1)} / 5</span>
        </div>
        <div>
          <h3 class="card-title">${escapeHtml(tour.title)}</h3>
          <div class="tour-card__meta">
            <span>${escapeHtml(tour.location)}</span>
            <span>${escapeHtml(tour.durationLabel)}</span>
            <span>${escapeHtml(tour.difficulty)}</span>
          </div>
        </div>
        <p class="section-copy">${escapeHtml(tour.overview)}</p>
        <div class="tour-card__meta">
          <span>Max ${escapeHtml(tour.maxGroupSize)} guests</span>
          <span>${escapeHtml(tour.availabilityCount)} departures</span>
        </div>
        <div class="booking-card__top">
          <div class="price-tag">${formatMoney(tour.price)} <small>per guest</small></div>
          <div class="inline-actions">
            <a class="btn btn--secondary btn--small" data-link href="/tours/${escapeHtml(tour.slug)}">${escapeHtml(
              translate("common.viewDetails")
            )}</a>
            <a class="btn btn--primary btn--small" data-link href="/booking?tour=${escapeHtml(tour.id)}">${escapeHtml(
              translate("common.bookNow")
            )}</a>
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderGuideCard(guide) {
  return `
    <article class="guide-card">
      <div class="destination-card__image" style="background-image: linear-gradient(180deg, rgba(16,32,49,0.06), rgba(16,32,49,0.2)), url('${escapeHtml(
        guide.photo
      )}')"></div>
      <div class="guide-card__body">
        <div class="badge-row">
          <span class="badge">${escapeHtml(guide.role)}</span>
          <span class="badge badge--gold">${guide.rating.toFixed(1)} rating</span>
        </div>
        <h3 class="card-title">${escapeHtml(guide.name)}</h3>
        <p class="section-copy">${escapeHtml(guide.bio)}</p>
        <div class="pill-list">
          ${guide.languages.map((language) => `<span class="chip">${escapeHtml(language)}</span>`).join("")}
        </div>
        <div class="pill-list" style="margin-top: 12px;">
          ${guide.specialties.map((specialty) => `<span class="chip">${escapeHtml(specialty)}</span>`).join("")}
        </div>
      </div>
    </article>
  `;
}

function renderReviewCard(review) {
  return `
    <article class="review-card">
      <div class="review-card__body">
        <div class="badge-row">
          <span class="badge badge--gold">${"★".repeat(Math.round(review.rating))}</span>
          <span class="chip">${escapeHtml(review.tourTitle)}</span>
        </div>
        <p style="font-size: 1.05rem; line-height: 1.8; margin: 18px 0 14px;">“${escapeHtml(review.body)}”</p>
        <div>
          <strong>${escapeHtml(review.guestName)}</strong>
          <div class="subtle">${escapeHtml(review.guestLocation)} · ${formatDate(review.date)}</div>
        </div>
      </div>
    </article>
  `;
}

function renderFeatureCard(item) {
  return `
    <article class="feature-card">
      <div class="feature-card__body">
        <h3 class="card-title">${escapeHtml(item.title)}</h3>
        <p class="section-copy">${escapeHtml(item.description)}</p>
      </div>
    </article>
  `;
}

function renderOfferCard(offer) {
  return `
    <article class="offer-card">
      <div class="offer-card__body">
        <span class="badge badge--gold">${escapeHtml(offer.badge)}</span>
        <h3 class="card-title">${escapeHtml(offer.title)}</h3>
        <p class="section-copy">${escapeHtml(offer.description)}</p>
      </div>
    </article>
  `;
}

function getFilteredTours() {
  const tours = state.publicData?.tours || [];

  return tours.filter((tour) => {
    if (state.filters.destination !== "all") {
      const destination = `${tour.location} ${tour.destination}`.toLowerCase();
      if (!destination.includes(state.filters.destination.toLowerCase())) {
        return false;
      }
    }

    if (state.filters.category !== "all" && tour.category !== state.filters.category) {
      return false;
    }

    if (state.filters.duration !== "all" && Number(tour.durationDays) > Number(state.filters.duration)) {
      return false;
    }

    if (state.filters.price !== "all" && Number(tour.price) > Number(state.filters.price)) {
      return false;
    }

    if (state.filters.rating !== "all" && Number(tour.rating) < Number(state.filters.rating)) {
      return false;
    }

    return true;
  });
}

function ensureBookingDraft() {
  const query = getQuery();
  const queryTourId = query.get("tour");
  const availableTours = state.publicData?.tours || [];

  if (queryTourId && findTourById(queryTourId)) {
    state.bookingDraft.tourId = queryTourId;
  } else if (!state.bookingDraft.tourId && availableTours[0]) {
    state.bookingDraft.tourId = availableTours[0].id;
  }

  const selectedTour = findTourById(state.bookingDraft.tourId);

  if (selectedTour && !selectedTour.availability.includes(state.bookingDraft.date)) {
    state.bookingDraft.date = selectedTour.availability[0] || "";
  }
}

function bookingSummaryModel() {
  ensureBookingDraft();
  const tour = findTourById(state.bookingDraft.tourId);

  if (!tour) {
    return null;
  }

  const guests = Math.max(1, Number(state.bookingDraft.guests || 1));
  const subtotal = Number(tour.price) * guests;
  const depositDue = subtotal * 0.3;

  return {
    tour,
    guests,
    date: state.bookingDraft.date,
    subtotal,
    depositDue
  };
}

function getPromoPreview(tour, baseAmount) {
  const code = String(state.paymentDraft.promoCode || "").trim().toUpperCase();
  const promos = state.publicData?.promoCodes || [];

  if (!code) {
    return {
      promoCode: null,
      discount: 0,
      total: baseAmount
    };
  }

  const match = promos.find((promo) => promo.code === code);

  if (!match) {
    return {
      promoCode: null,
      discount: 0,
      total: baseAmount
    };
  }

  if (match.appliesToCategories?.length && !match.appliesToCategories.includes(tour.category)) {
    return {
      promoCode: null,
      discount: 0,
      total: baseAmount
    };
  }

  const discount =
    match.type === "percent"
      ? Math.round(baseAmount * (match.value / 100))
      : Math.min(baseAmount, match.value);

  return {
    promoCode: match.code,
    discount,
    total: Math.max(baseAmount - discount, 0)
  };
}

function getBaseCharge(booking, option) {
  const paid = Number(booking?.paidAmount || 0);
  if (option === "full") {
    return Math.max(Number(booking.totalAmount || 0) - paid, 0);
  }

  return Math.max(Number(booking.depositDue || 0) - paid, 0);
}

function paymentSummaryModel() {
  const booking = state.paymentContext.booking;
  if (!booking) {
    return null;
  }

  const tour = findTourById(booking.tourId);
  const paymentOption = getBaseCharge(booking, "deposit") > 0 ? state.paymentDraft.paymentOption : "full";
  const baseAmount = getBaseCharge(booking, paymentOption);
  const promo = tour ? getPromoPreview(tour, baseAmount) : { promoCode: null, discount: 0, total: baseAmount };

  return {
    booking,
    tour,
    paymentOption,
    baseAmount,
    promo,
    finalAmount: promo.total
  };
}

function pageMeta(route) {
  switch (route.page) {
    case "home":
      return {
        title: "Atlas Path Travel | Trusted Guide-Led Journeys",
        description:
          "Explore premium tours, trusted guides, secure booking, and realistic payment and account tools for modern travel."
      };
    case "about":
      return {
        title: "About Atlas Path Travel",
        description: "Learn about Atlas Path Travel, our mission, experience, and multilingual guide team."
      };
    case "tours":
      return {
        title: "Tour Packages | Atlas Path Travel",
        description: "Browse curated tours by destination, price, duration, category, and rating."
      };
    case "tour-detail":
      return {
        title: `${findTourBySlug(route.slug)?.title || "Tour"} | Atlas Path Travel`,
        description: findTourBySlug(route.slug)?.overview || "Tour details, itinerary, inclusions, and booking options."
      };
    default:
      return {
        title: "Atlas Path Travel",
        description: "Trusted guide-led journeys with booking, payment, dashboard, and support tools."
      };
  }
}

function setMeta() {
  const meta = pageMeta(getRoute());
  document.title = meta.title;
  const descriptionTag = document.querySelector('meta[name="description"]');
  if (descriptionTag) {
    descriptionTag.setAttribute("content", meta.description);
  }
}

async function refreshBootstrap() {
  const data = await api("/api/bootstrap");
  state.publicData = data;
  state.currentUser = data.currentUser;
}

async function loadDashboardData() {
  if (!state.currentUser) {
    state.dashboardData = { bookings: [], payments: [] };
    return;
  }

  const [bookingResult, paymentResult] = await Promise.all([api("/api/bookings"), api("/api/payments")]);
  state.dashboardData = {
    bookings: bookingResult.bookings,
    payments: paymentResult.payments
  };
}

async function loadAdminData() {
  if (state.currentUser?.role !== "admin") {
    state.adminData = null;
    return;
  }

  state.adminData = await api("/api/admin/dashboard");
}

async function loadPaymentContext() {
  const query = getQuery();
  const bookingId = query.get("booking");
  const accessCode = query.get("access") || state.paymentDraft.accessCode;

  if (!bookingId) {
    state.paymentContext = {
      booking: state.latestBooking,
      payment: state.latestPayment
    };
    return;
  }

  state.paymentDraft.bookingId = bookingId;
  state.paymentDraft.accessCode = accessCode || "";

  const queryString = accessCode ? `?accessCode=${encodeURIComponent(accessCode)}` : "";
  const bookingResult = await api(`/api/bookings/${encodeURIComponent(bookingId)}${queryString}`);
  state.paymentContext.booking = bookingResult.booking;

  if (getBaseCharge(bookingResult.booking, "deposit") <= 0) {
    state.paymentDraft.paymentOption = "full";
  }

  if (state.currentUser) {
    try {
      await loadDashboardData();
    } catch (error) {
      console.warn(error);
    }

    const latestPayment = [...state.dashboardData.payments]
      .filter((payment) => payment.bookingId === bookingId)
      .sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt))[0];

    if (latestPayment) {
      state.paymentContext.payment = latestPayment;
    }
  }
}

async function loadRouteData() {
  const route = getRoute();

  if (route.page === "dashboard") {
    await loadDashboardData();
  }

  if (route.page === "payment") {
    await loadPaymentContext();
  }

  if (route.page === "admin") {
    await loadAdminData();
  }
}

async function navigate(path, { replace = false } = {}) {
  if (window.location.pathname + window.location.search === path) {
    state.mobileMenu = false;
    render();
    return;
  }

  state.mobileMenu = false;
  state.loadingRoute = true;

  if (replace) {
    window.history.replaceState({}, "", path);
  } else {
    window.history.pushState({}, "", path);
  }

  syncDraftsFromQuery();
  render();
  await loadRouteData();
  state.loadingRoute = false;
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function syncDraftsFromQuery() {
  const route = getRoute();
  const query = getQuery();

  if (route.page === "booking") {
    const bookingTour = query.get("tour");
    if (bookingTour && findTourById(bookingTour)) {
      state.bookingDraft.tourId = bookingTour;
    }
    ensureBookingDraft();
  }

  if (route.page === "payment") {
    state.paymentDraft.bookingId = query.get("booking") || state.paymentDraft.bookingId;
    state.paymentDraft.accessCode = query.get("access") || state.paymentDraft.accessCode;
  }
}

function renderHeader() {
  const route = getRoute();
  const navLinks = [
    { href: "/", key: "home" },
    { href: "/about", key: "about" },
    { href: "/tours", key: "tours" },
    { href: "/gallery", key: "gallery" },
    { href: "/blog", key: "blog" },
    { href: "/faq", key: "faq" },
    { href: "/contact", key: "contact" }
  ];

  const accountHref = state.currentUser ? "/dashboard" : "/signin";
  const accountLabel = state.currentUser ? translate("nav.dashboard") : translate("nav.signin");

  return `
    <div class="topbar">
      <div class="topbar__inner">
        <div class="topbar__meta">
          <span class="topbar__tag"><span class="topbar__dot"></span>${escapeHtml(
            translate("common.trustedSince")
          )}</span>
          <span>${escapeHtml(state.publicData.contact.phone)}</span>
          <span>${escapeHtml(state.publicData.contact.officeHours)}</span>
        </div>
        <div class="topbar__tags">
          <span>${escapeHtml(translate("common.premiumTravel"))}</span>
          <span>${escapeHtml(state.publicData.contact.email)}</span>
        </div>
      </div>
    </div>
    <header class="header">
      <div class="header__inner">
        <a class="brand" data-link href="/">
          <img class="brand__mark" src="/assets/brand-mark.svg" alt="Atlas Path Travel logo" />
          <div>
            <div class="brand__name">${escapeHtml(state.publicData.company.name)}</div>
            <div class="brand__tagline">${escapeHtml(translate("brandTagline"))}</div>
          </div>
        </a>
        <nav class="nav">
          <div class="nav__links">
            ${navLinks
              .map(
                (link) => `
                  <a class="nav__link ${window.location.pathname === link.href ? "is-active" : ""}" data-link href="${link.href}">
                    ${escapeHtml(translate(`nav.${link.key}`))}
                  </a>
                `
              )
              .join("")}
          </div>
          <div class="nav__actions">
            <div class="language-switcher">
              <button type="button" class="${state.language === "en" ? "is-active" : ""}" data-action="set-language" data-lang="en">EN</button>
              <button type="button" class="${state.language === "es" ? "is-active" : ""}" data-action="set-language" data-lang="es">ES</button>
            </div>
            <a class="btn btn--secondary btn--small" data-link href="${accountHref}">${escapeHtml(accountLabel)}</a>
            <a class="btn btn--primary btn--small" data-link href="/booking">${escapeHtml(translate("common.startBooking"))}</a>
          </div>
        </nav>
        <button class="menu-toggle" type="button" data-action="toggle-menu">Menu</button>
      </div>
      ${
        state.mobileMenu
          ? `
            <div class="mobile-nav">
              <div class="mobile-nav__links">
                ${navLinks
                  .map(
                    (link) => `
                      <a class="nav__link ${window.location.pathname === link.href ? "is-active" : ""}" data-link href="${link.href}">
                        ${escapeHtml(translate(`nav.${link.key}`))}
                      </a>
                    `
                  )
                  .join("")}
                ${state.currentUser?.role === "admin" ? `<a class="nav__link" data-link href="/admin">${escapeHtml(translate("nav.admin"))}</a>` : ""}
              </div>
              <div class="mobile-nav__actions">
                <div class="language-switcher">
                  <button type="button" class="${state.language === "en" ? "is-active" : ""}" data-action="set-language" data-lang="en">EN</button>
                  <button type="button" class="${state.language === "es" ? "is-active" : ""}" data-action="set-language" data-lang="es">ES</button>
                </div>
                <a class="btn btn--secondary btn--small" data-link href="${accountHref}">${escapeHtml(accountLabel)}</a>
                <a class="btn btn--primary btn--small" data-link href="/booking">${escapeHtml(translate("common.startBooking"))}</a>
              </div>
            </div>
          `
          : ""
      }
    </header>
  `;
}

function renderFooter() {
  const paymentStatuses = ["paid", "pending", "failed", "refunded"]
    .map((status) => renderStatus(status))
    .join("");

  return `
    <footer class="footer">
      <div class="footer__inner">
        <div class="footer__grid">
          <div>
            <div class="brand" style="margin-bottom: 14px;">
              <img class="brand__mark" src="/assets/brand-mark.svg" alt="Atlas Path Travel logo" />
              <div>
                <div class="brand__name" style="color: white;">${escapeHtml(state.publicData.company.name)}</div>
                <div class="brand__tagline" style="color: rgba(255,248,238,0.7);">${escapeHtml(
                  state.publicData.company.tagline
                )}</div>
              </div>
            </div>
            <p class="footer__copy">${escapeHtml(state.publicData.company.intro)}</p>
            <div class="badge-row" style="margin-top: 16px;">${paymentStatuses}</div>
          </div>
          <div>
            <div class="footer__title">Explore</div>
            <div class="footer__links">
              <a data-link href="/about">${escapeHtml(translate("nav.about"))}</a>
              <a data-link href="/tours">${escapeHtml(translate("nav.tours"))}</a>
              <a data-link href="/gallery">${escapeHtml(translate("nav.gallery"))}</a>
              <a data-link href="/blog">${escapeHtml(translate("nav.blog"))}</a>
            </div>
          </div>
          <div>
            <div class="footer__title">Support</div>
            <div class="footer__meta">
              <span>${escapeHtml(state.publicData.contact.phone)}</span>
              <span>${escapeHtml(state.publicData.contact.email)}</span>
              <span>${escapeHtml(state.publicData.contact.address)}</span>
              <span>${escapeHtml(state.publicData.contact.officeHours)}</span>
            </div>
          </div>
          <div>
            <div class="footer__title">${escapeHtml(translate("home.newsletterTitle"))}</div>
            <form data-form="newsletter" class="form-grid">
              <div class="field">
                <label for="newsletter-email">Email</label>
                <input id="newsletter-email" name="email" type="email" placeholder="traveler@example.com" required />
              </div>
              <button class="btn btn--primary btn--small" type="submit">${escapeHtml(translate("common.learnMore"))}</button>
            </form>
          </div>
        </div>
      </div>
      <div class="floating-chat">
        <a href="https://wa.me/41795550148" target="_blank" rel="noreferrer">WhatsApp guest care</a>
      </div>
    </footer>
  `;
}

function renderHomePage() {
  const featuredTours = (state.publicData.tours || []).filter((tour) => tour.featured).slice(0, 3);
  const featuredReviews = (state.publicData.reviews || []).filter((review) => review.featured).slice(0, 3);
  const company = state.publicData.company;

  return `
    <section class="hero hero--home">
      <div class="hero__content">
        <div class="eyebrow">${escapeHtml(translate("common.heroEyebrow"))}</div>
        <h1 class="hero__title">${escapeHtml(translate("home.title"))}</h1>
        <p class="hero__copy">${escapeHtml(translate("home.copy"))}</p>
        <div class="hero__actions" style="margin-top: 28px;">
          <a class="btn btn--primary" data-link href="/tours">${escapeHtml(translate("common.exploreTours"))}</a>
          <a class="btn btn--ghost" data-link href="/contact">${escapeHtml(translate("common.contactUs"))}</a>
        </div>
        <div class="hero__stats">
          ${company.stats
            .map(
              (stat) => `
                <div class="stat-card">
                  <div class="stat-card__value">${escapeHtml(stat.value)}</div>
                  <div class="stat-card__label">${escapeHtml(stat.label)}</div>
                </div>
              `
            )
            .join("")}
        </div>
      </div>
      <div class="hero__media">
        <div class="hero-card hero-card--highlight">
          <div class="hero-card__title">${escapeHtml(translate("home.proofTitle"))}</div>
          <div class="hero-card__value">3,200+</div>
          <p class="hero-card__copy">${escapeHtml(translate("home.proofCopy"))}</p>
        </div>
        <div class="hero-image-stack">
          <div class="hero-image hero-image--tall" style="background-image: url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80')"></div>
          <div class="stack">
            <div class="hero-image" style="background-image: url('https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=80')"></div>
            <div class="hero-image" style="background-image: url('https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1200&q=80')"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-surface glass-card">
      ${renderSectionIntro(
        translate("common.destinationsEyebrow"),
        translate("home.destinationsTitle"),
        "Featured regions chosen for guide strength, itinerary quality, and guest confidence."
      )}
      <div class="grid grid--4">
        ${state.publicData.destinations
          .map(
            (destination) => `
              <article class="destination-card">
                <div class="destination-card__image" style="background-image: linear-gradient(180deg, rgba(16,32,49,0.06), rgba(16,32,49,0.3)), url('${escapeHtml(
                  destination.image
                )}')"></div>
                <div class="destination-card__body">
                  <span class="badge">${escapeHtml(destination.region)}</span>
                  <h3 class="card-title">${escapeHtml(destination.name)}</h3>
                  <p class="section-copy">${escapeHtml(destination.teaser)}</p>
                </div>
              </article>
            `
          )
          .join("")}
      </div>
    </section>

    <section class="section section-surface glass-card">
      ${renderSectionIntro(
        translate("common.toursEyebrow"),
        translate("home.toursTitle"),
        "Each tour includes itinerary detail, guide information, inclusions, difficulty, pricing, and live departure dates.",
        `<a class="btn btn--secondary" data-link href="/tours">${escapeHtml(translate("common.exploreTours"))}</a>`
      )}
      <div class="grid grid--3">
        ${featuredTours.map(renderTourCard).join("")}
      </div>
    </section>

    <section class="section section-surface glass-card">
      ${renderSectionIntro(
        translate("common.reasonsEyebrow"),
        translate("home.reasonsTitle"),
        "The product experience is built to reassure guests at every step, from the first enquiry to payment and departure."
      )}
      <div class="grid grid--4">
        ${company.reasons.map(renderFeatureCard).join("")}
      </div>
    </section>

    <section class="section section-surface glass-card">
      ${renderSectionIntro(
        translate("common.guidesEyebrow"),
        "Local experts with multilingual guest care",
        "Every guide profile shows language coverage, specialties, ratings, and destination fit."
      )}
      <div class="grid grid--3">
        ${(state.publicData.guides || []).slice(0, 3).map(renderGuideCard).join("")}
      </div>
      <div class="center" style="margin-top: 20px;">
        <a class="btn btn--secondary" data-link href="/about">${escapeHtml(translate("common.browseGuides"))}</a>
      </div>
    </section>

    <section class="section section-surface glass-card">
      ${renderSectionIntro(
        translate("common.reviewsEyebrow"),
        translate("home.reviewsTitle"),
        "Testimonials, verified ratings, safety standards, and transparent policies help travelers book with confidence."
      )}
      <div class="grid grid--3">
        ${featuredReviews.map(renderReviewCard).join("")}
      </div>
      <div class="grid grid--4" style="margin-top: 20px;">
        ${state.publicData.trustBadges.map(renderFeatureCard).join("")}
      </div>
    </section>

    <section class="section section-surface glass-card">
      ${renderSectionIntro(
        translate("common.newsletterEyebrow"),
        translate("home.newsletterTitle"),
        translate("home.newsletterCopy")
      )}
      <div class="grid grid--3">
        ${state.publicData.offers.map(renderOfferCard).join("")}
      </div>
    </section>
  `;
}

function renderAboutPage() {
  const company = state.publicData.company;

  return `
    <section class="hero hero--inner">
      <div class="eyebrow">${escapeHtml(translate("common.premiumTravel"))}</div>
      <h1 class="page-title">${escapeHtml(translate("about.title"))}</h1>
      <p class="page-copy">${escapeHtml(translate("about.copy"))}</p>
    </section>

    <section class="section section-surface glass-card">
      <div class="grid grid--2">
        <div class="panel">
          <div class="eyebrow">${escapeHtml(translate("about.mission"))}</div>
          <h2 class="card-title">${escapeHtml(company.mission)}</h2>
          <p class="section-copy">${escapeHtml(company.intro)}</p>
        </div>
        <div class="panel">
          <div class="eyebrow">${escapeHtml(translate("about.vision"))}</div>
          <h2 class="card-title">${escapeHtml(company.vision)}</h2>
          <p class="section-copy">Base: ${escapeHtml(company.base)} · ${escapeHtml(company.experienceYears)} years of guest-facing experience.</p>
        </div>
      </div>
    </section>

    <section class="section section-surface glass-card">
      ${renderSectionIntro(
        translate("about.highlights"),
        "How Atlas Path works in practice",
        "Our service model is designed for premium travelers who value responsiveness, clear policies, and destination expertise."
      )}
      <div class="grid grid--4">
        ${company.serviceHighlights.map(renderFeatureCard).join("")}
      </div>
    </section>

    <section class="section section-surface glass-card">
      ${renderSectionIntro(
        translate("common.guidesEyebrow"),
        translate("about.teamTitle"),
        "Photos, languages, specialties, ratings, and guide backgrounds are surfaced directly to help travelers choose with confidence."
      )}
      <div class="grid grid--3">
        ${(state.publicData.guides || []).map(renderGuideCard).join("")}
      </div>
    </section>
  `;
}

function renderToursPage() {
  const tours = getFilteredTours();
  const allTours = state.publicData.tours || [];
  const destinations = uniqueValues(allTours, (tour) => tour.destination);
  const categories = uniqueValues(allTours, (tour) => tour.category);

  return `
    <section class="hero hero--inner">
      <div class="eyebrow">${escapeHtml(translate("common.toursEyebrow"))}</div>
      <h1 class="page-title">${escapeHtml(translate("tours.title"))}</h1>
      <p class="page-copy">${escapeHtml(translate("tours.copy"))}</p>
    </section>

    <section class="section filters-layout">
      <aside class="filters-card glass-card">
        <div class="panel__heading">
          <div class="eyebrow">${escapeHtml(translate("tours.filters"))}</div>
          <h2 class="card-title">Smart tour filters</h2>
        </div>
        <form data-form="tour-filters" class="form-grid">
          <div class="field">
            <label for="filter-destination">Destination</label>
            <select id="filter-destination" name="destination">
              <option value="all">All destinations</option>
              ${destinations
                .map(
                  (destination) => `
                    <option value="${escapeHtml(destination)}" ${selected(state.filters.destination, destination)}>${escapeHtml(destination)}</option>
                  `
                )
                .join("")}
            </select>
          </div>
          <div class="field">
            <label for="filter-category">Category</label>
            <select id="filter-category" name="category">
              <option value="all">All categories</option>
              ${categories
                .map(
                  (category) => `
                    <option value="${escapeHtml(category)}" ${selected(state.filters.category, category)}>${escapeHtml(category)}</option>
                  `
                )
                .join("")}
            </select>
          </div>
          <div class="field">
            <label for="filter-price">Max price</label>
            <select id="filter-price" name="price">
              <option value="all" ${selected(state.filters.price, "all")}>Any budget</option>
              <option value="2000" ${selected(state.filters.price, "2000")}>Up to $2,000</option>
              <option value="3000" ${selected(state.filters.price, "3000")}>Up to $3,000</option>
              <option value="4000" ${selected(state.filters.price, "4000")}>Up to $4,000</option>
            </select>
          </div>
          <div class="field">
            <label for="filter-duration">Duration</label>
            <select id="filter-duration" name="duration">
              <option value="all" ${selected(state.filters.duration, "all")}>Any duration</option>
              <option value="5" ${selected(state.filters.duration, "5")}>Up to 5 days</option>
              <option value="7" ${selected(state.filters.duration, "7")}>Up to 7 days</option>
              <option value="10" ${selected(state.filters.duration, "10")}>Up to 10 days</option>
            </select>
          </div>
          <div class="field">
            <label for="filter-rating">Rating</label>
            <select id="filter-rating" name="rating">
              <option value="all" ${selected(state.filters.rating, "all")}>Any rating</option>
              <option value="4.8" ${selected(state.filters.rating, "4.8")}>4.8 and above</option>
              <option value="4.9" ${selected(state.filters.rating, "4.9")}>4.9 only</option>
            </select>
          </div>
        </form>
      </aside>
      <div class="stack">
        <div class="section-surface glass-card">
          <div class="booking-card__top">
            <div>
              <div class="eyebrow">Results</div>
              <h2 class="card-title">${escapeHtml(String(tours.length))} journeys available</h2>
            </div>
            <a class="btn btn--secondary btn--small" data-link href="/booking">${escapeHtml(
              translate("common.startBooking")
            )}</a>
          </div>
        </div>
        ${
          tours.length
            ? `<div class="grid grid--2">${tours.map(renderTourCard).join("")}</div>`
            : `<div class="empty-state">${escapeHtml(translate("tours.noResults"))}</div>`
        }
      </div>
    </section>
  `;
}

function renderTourDetailPage(route) {
  const tour = findTourBySlug(route.slug);

  if (!tour) {
    return `
      <section class="section">
        <div class="empty-state">That tour could not be found.</div>
      </section>
    `;
  }

  const relatedReviews = (state.publicData.reviews || []).filter((review) => review.tourId === tour.id);
  const leadGuides = (tour.guideIds || []).map(findGuideById).filter(Boolean);

  return `
    <section class="hero hero--inner">
      <div class="eyebrow">${escapeHtml(tour.category)}</div>
      <h1 class="page-title">${escapeHtml(tour.title)}</h1>
      <p class="page-copy">${escapeHtml(tour.overview)}</p>
      <div class="hero__actions" style="margin-top: 20px;">
        <a class="btn btn--primary" data-link href="/booking?tour=${escapeHtml(tour.id)}">${escapeHtml(
          translate("common.bookNow")
        )}</a>
        <a class="btn btn--ghost" data-link href="/contact">${escapeHtml(translate("common.contactUs"))}</a>
      </div>
    </section>

    <section class="section tour-hero">
      <div class="stack">
        <div class="tour-gallery">
          <div class="tour-gallery__main" style="background-image: url('${escapeHtml(tour.gallery[0])}')"></div>
          <div class="tour-gallery__stack">
            <div style="background-image: url('${escapeHtml(tour.gallery[1] || tour.gallery[0])}')"></div>
            <div style="background-image: url('${escapeHtml(tour.gallery[2] || tour.gallery[0])}')"></div>
          </div>
        </div>
        <div class="section-surface glass-card">
          <div class="badge-row">
            <span class="badge">${escapeHtml(tour.location)}</span>
            <span class="badge badge--gold">${tour.rating.toFixed(1)} guest rating</span>
          </div>
          <div class="columns" style="margin-top: 18px;">
            <div>
              <h3 class="card-title">Highlights</h3>
              ${renderFeatureList(tour.highlights)}
            </div>
            <div>
              <h3 class="card-title">Lead guide</h3>
              ${leadGuides
                .map(
                  (guide) => `
                    <div class="panel">
                      <div class="badge-row">
                        <span class="badge">${escapeHtml(guide.role)}</span>
                        <span class="badge badge--gold">${guide.rating.toFixed(1)}</span>
                      </div>
                      <h4 class="card-title">${escapeHtml(guide.name)}</h4>
                      <p class="section-copy">${escapeHtml(guide.bio)}</p>
                      <div class="pill-list">${guide.languages
                        .map((language) => `<span class="chip">${escapeHtml(language)}</span>`)
                        .join("")}</div>
                    </div>
                  `
                )
                .join("")}
            </div>
          </div>
        </div>
      </div>
      <aside class="tour-aside glass-card">
        <div class="eyebrow">Quick facts</div>
        <h2 class="card-title">${formatMoney(tour.price)} <span class="subtle">per guest</span></h2>
        <div class="tour-facts">
          <div class="fact-row"><span>Duration</span><strong>${escapeHtml(tour.durationLabel)}</strong></div>
          <div class="fact-row"><span>Difficulty</span><strong>${escapeHtml(tour.difficulty)}</strong></div>
          <div class="fact-row"><span>Group size</span><strong>Up to ${escapeHtml(tour.maxGroupSize)}</strong></div>
          <div class="fact-row"><span>Availability</span><strong>${escapeHtml(tour.availabilityCount)} departures</strong></div>
        </div>
        <div class="summary-emphasis" style="margin-top: 16px;">
          <strong>Next departures</strong>
          <div class="pill-list" style="margin-top: 12px;">
            ${tour.availability.map((date) => `<span class="chip">${escapeHtml(formatDate(date))}</span>`).join("")}
          </div>
        </div>
        <div class="inline-actions" style="margin-top: 20px;">
          <a class="btn btn--primary" data-link href="/booking?tour=${escapeHtml(tour.id)}">${escapeHtml(
            translate("common.startBooking")
          )}</a>
        </div>
      </aside>
    </section>

    <section class="section section-surface glass-card">
      ${renderSectionIntro("Itinerary", "Day-by-day route", "Clear pacing and realistic sequencing for a premium guest experience.")}
      <div class="timeline">
        ${tour.itinerary
          .map(
            (item) => `
              <div class="timeline__item">
                <div class="eyebrow" style="color: var(--gold-deep);">${escapeHtml(item.day)}</div>
                <h3 class="card-title">${escapeHtml(item.title)}</h3>
                <p class="section-copy">${escapeHtml(item.description)}</p>
              </div>
            `
          )
          .join("")}
      </div>
    </section>

    <section class="section section-surface glass-card">
      <div class="columns">
        <div>
          <h2 class="card-title">Included</h2>
          ${renderFeatureList(tour.included)}
        </div>
        <div>
          <h2 class="card-title">Excluded</h2>
          ${renderFeatureList(tour.excluded)}
        </div>
      </div>
    </section>

    <section class="section section-surface glass-card">
      ${renderSectionIntro(translate("common.mapEyebrow"), "Meeting point and destination map", escapeHtml(tour.safety))}
      <div class="map-frame">
        <iframe src="${escapeHtml(tour.mapEmbedUrl)}" width="100%" height="320" loading="lazy" title="Tour map"></iframe>
      </div>
    </section>

    <section class="section section-surface glass-card">
      ${renderSectionIntro(translate("common.reviewsEyebrow"), "Guest feedback for this journey", "Verified ratings and destination-specific testimonials help guests understand the experience before they book.")}
      <div class="grid grid--3">
        ${relatedReviews.length ? relatedReviews.map(renderReviewCard).join("") : `<div class="empty-state">Reviews will appear here soon.</div>`}
      </div>
    </section>
  `;
}

function renderBookingPage() {
  const summary = bookingSummaryModel();
  const tour = summary?.tour;
  const user = state.currentUser;
  const fullName = user?.fullName || "";
  const email = user?.email || "";
  const phone = user?.phone || "";
  const nationality = user?.nationality || "";

  return `
    <section class="hero hero--inner">
      <div class="eyebrow">${escapeHtml(translate("common.startBooking"))}</div>
      <h1 class="page-title">${escapeHtml(translate("booking.title"))}</h1>
      <p class="page-copy">${escapeHtml(translate("booking.copy"))}</p>
    </section>

    <section class="section booking-layout">
      <div class="panel glass-card">
        <div class="panel__heading">
          <div class="eyebrow">Booking form</div>
          <h2 class="card-title">Traveler details and departure selection</h2>
        </div>
        <form data-form="booking" class="form-grid">
          <div class="form-grid form-grid--2">
            <div class="field">
              <label for="booking-tour">Package</label>
              <select id="booking-tour" name="tourId" data-sync="booking">
                ${(state.publicData.tours || [])
                  .map(
                    (item) => `
                      <option value="${escapeHtml(item.id)}" ${selected(state.bookingDraft.tourId, item.id)}>${escapeHtml(
                        `${item.title} · ${formatMoney(item.price)}`
                      )}</option>
                    `
                  )
                  .join("")}
              </select>
            </div>
            <div class="field">
              <label for="booking-date">Departure date</label>
              <select id="booking-date" name="date" data-sync="booking">
                ${(tour?.availability || [])
                  .map(
                    (date) => `
                      <option value="${escapeHtml(date)}" ${selected(state.bookingDraft.date, date)}>${escapeHtml(formatDate(date))}</option>
                    `
                  )
                  .join("")}
              </select>
            </div>
          </div>
          <div class="form-grid form-grid--2">
            <div class="field">
              <label for="booking-guests">Number of guests</label>
              <input
                id="booking-guests"
                name="guests"
                type="number"
                min="1"
                max="${escapeHtml(String(tour?.maxGroupSize || 12))}"
                value="${escapeHtml(String(state.bookingDraft.guests || 2))}"
                data-sync="booking"
              />
            </div>
            <div class="field">
              <label for="booking-nationality">Nationality</label>
              <input id="booking-nationality" name="nationality" value="${escapeHtml(nationality)}" required />
            </div>
          </div>
          <div class="form-grid form-grid--2">
            <div class="field">
              <label for="booking-name">Full name</label>
              <input id="booking-name" name="fullName" value="${escapeHtml(fullName)}" required />
            </div>
            <div class="field">
              <label for="booking-email">Email</label>
              <input id="booking-email" name="email" type="email" value="${escapeHtml(email)}" required />
            </div>
          </div>
          <div class="form-grid form-grid--2">
            <div class="field">
              <label for="booking-phone">Phone</label>
              <input id="booking-phone" name="phone" value="${escapeHtml(phone)}" required />
            </div>
            <div class="field">
              <label for="booking-policy">Policy window</label>
              <input id="booking-policy" value="${escapeHtml(state.publicData.policies.modification)}" readonly />
            </div>
          </div>
          <div class="field">
            <label for="booking-requests">Special requests</label>
            <textarea id="booking-requests" name="specialRequests" placeholder="Rooming, dietary, accessibility, celebration notes, or pace preferences."></textarea>
          </div>
          <button class="btn btn--primary" type="submit">${escapeHtml(translate("common.startBooking"))}</button>
        </form>
      </div>
      <aside class="summary-card glass-card">
        <div class="eyebrow">${escapeHtml(translate("booking.summary"))}</div>
        ${
          summary
            ? `
              <h2 class="card-title">${escapeHtml(summary.tour.title)}</h2>
              <p class="section-copy">${escapeHtml(summary.tour.overview)}</p>
              <div class="summary-list" style="margin-top: 16px;">
                <div class="summary-line"><span>Destination</span><strong>${escapeHtml(summary.tour.location)}</strong></div>
                <div class="summary-line"><span>Departure</span><strong>${escapeHtml(formatDate(summary.date))}</strong></div>
                <div class="summary-line"><span>Guests</span><strong>${escapeHtml(String(summary.guests))}</strong></div>
                <div class="summary-line"><span>Package total</span><strong>${formatMoney(summary.subtotal)}</strong></div>
                <div class="summary-line"><span>Deposit due today</span><strong>${formatMoney(summary.depositDue)}</strong></div>
              </div>
              <div class="summary-emphasis" style="margin-top: 18px;">
                <strong>${escapeHtml(translate("booking.support"))}</strong>
              </div>
            `
            : `<div class="empty-state">Select a tour to see the booking summary.</div>`
        }
      </aside>
    </section>
  `;
}

function renderReceipt(payment) {
  return `
    <div class="summary-card glass-card">
      <div class="eyebrow">${escapeHtml(translate("payment.receipt"))}</div>
      <h2 class="card-title">${escapeHtml(payment.invoiceNumber)}</h2>
      <div class="summary-list">
        <div class="summary-line"><span>Status</span><strong>${renderStatus(payment.status)}</strong></div>
        <div class="summary-line"><span>Amount</span><strong>${formatMoney(payment.amount)}</strong></div>
        <div class="summary-line"><span>Method</span><strong>${escapeHtml(payment.method.replace("_", " "))}</strong></div>
        <div class="summary-line"><span>Billing email</span><strong>${escapeHtml(payment.billingEmail)}</strong></div>
        <div class="summary-line"><span>Issued</span><strong>${escapeHtml(formatDateTime(payment.createdAt))}</strong></div>
      </div>
    </div>
  `;
}

function renderPaymentPage() {
  const model = paymentSummaryModel();
  const booking = model?.booking;
  const payment = state.latestPayment || state.paymentContext.payment;

  if (!booking) {
    return `
      <section class="section">
        <div class="empty-state">Choose a booking first to continue to payment.</div>
      </section>
    `;
  }

  const billingName = booking.traveler?.fullName || state.currentUser?.fullName || "";
  const billingEmail = booking.traveler?.email || state.currentUser?.email || "";
  const depositAvailable = getBaseCharge(booking, "deposit") > 0;

  return `
    <section class="hero hero--inner">
      <div class="eyebrow">${escapeHtml(translate("common.payNow"))}</div>
      <h1 class="page-title">${escapeHtml(translate("payment.title"))}</h1>
      <p class="page-copy">${escapeHtml(translate("payment.copy"))}</p>
    </section>

    <section class="section booking-layout">
      <div class="panel glass-card">
        <div class="panel__heading">
          <div class="eyebrow">${escapeHtml(translate("payment.summary"))}</div>
          <h2 class="card-title">${escapeHtml(booking.tourTitle)} · ${escapeHtml(booking.bookingCode)}</h2>
        </div>
        <form data-form="payment" class="form-grid">
          <input type="hidden" name="bookingId" value="${escapeHtml(booking.id)}" />
          <input type="hidden" name="accessCode" value="${escapeHtml(state.paymentDraft.accessCode || booking.accessCode || "")}" />
          <div class="form-grid form-grid--2">
            <div class="field">
              <label for="payment-option">Payment option</label>
              <select id="payment-option" name="paymentOption" data-sync="payment">
                ${
                  depositAvailable
                    ? `<option value="deposit" ${selected(state.paymentDraft.paymentOption, "deposit")}>Deposit</option>`
                    : ""
                }
                <option value="full" ${selected(
                  depositAvailable ? state.paymentDraft.paymentOption : "full",
                  "full"
                )}>Full amount</option>
              </select>
            </div>
            <div class="field">
              <label for="payment-method">Method</label>
              <select id="payment-method" name="method" data-sync="payment">
                <option value="card" ${selected(state.paymentDraft.method, "card")}>Secure card</option>
                <option value="bank_transfer" ${selected(state.paymentDraft.method, "bank_transfer")}>Bank transfer</option>
                <option value="wallet" ${selected(state.paymentDraft.method, "wallet")}>Digital wallet</option>
              </select>
            </div>
          </div>
          <div class="form-grid form-grid--2">
            <div class="field">
              <label for="billing-name">Billing name</label>
              <input id="billing-name" name="billingName" value="${escapeHtml(billingName)}" required />
            </div>
            <div class="field">
              <label for="billing-email">Billing email</label>
              <input id="billing-email" name="billingEmail" type="email" value="${escapeHtml(billingEmail)}" required />
            </div>
          </div>
          <div class="field">
            <label for="promo-code">Promo code</label>
            <input
              id="promo-code"
              name="promoCode"
              value="${escapeHtml(state.paymentDraft.promoCode || "")}"
              placeholder="SPRING10"
              data-sync="payment"
            />
          </div>
          <button class="btn btn--primary" type="submit">${escapeHtml(translate("common.payNow"))}</button>
        </form>
      </div>
      <aside class="summary-card glass-card">
        <div class="eyebrow">${escapeHtml(translate("payment.summary"))}</div>
        <h2 class="card-title">${escapeHtml(model.tour?.title || booking.tourTitle)}</h2>
        <div class="summary-list">
          <div class="summary-line"><span>Booking status</span><strong>${renderStatus(booking.bookingStatus)}</strong></div>
          <div class="summary-line"><span>Current payment status</span><strong>${renderStatus(booking.paymentStatus)}</strong></div>
          <div class="summary-line"><span>Already paid</span><strong>${formatMoney(booking.paidAmount || 0)}</strong></div>
          <div class="summary-line"><span>Outstanding</span><strong>${formatMoney(booking.outstandingAmount || 0)}</strong></div>
          <div class="summary-line"><span>Charge type</span><strong>${escapeHtml(model.paymentOption)}</strong></div>
          <div class="summary-line"><span>Charge before promo</span><strong>${formatMoney(model.baseAmount)}</strong></div>
          <div class="summary-line"><span>Promo discount</span><strong>${formatMoney(model.promo.discount)}</strong></div>
          <div class="summary-line"><span>Amount to process</span><strong>${formatMoney(model.finalAmount)}</strong></div>
        </div>
        ${
          payment
            ? `<div style="margin-top: 18px;">${renderReceipt(payment)}</div>`
            : `<div class="summary-emphasis" style="margin-top: 18px;"><strong>Invoice and receipt details appear here after a successful payment.</strong></div>`
        }
      </aside>
    </section>
  `;
}

function renderDashboardPage() {
  if (!state.currentUser) {
    return `
      <section class="hero hero--inner">
        <div class="eyebrow">${escapeHtml(translate("common.dashboardEyebrow"))}</div>
        <h1 class="page-title">${escapeHtml(translate("dashboard.title"))}</h1>
        <p class="page-copy">${escapeHtml(translate("dashboard.copy"))}</p>
      </section>

      <section class="section auth-layout">
        <div class="panel glass-card">
          <div class="panel__heading">
            <div class="eyebrow">${escapeHtml(translate("dashboard.authTitle"))}</div>
            <h2 class="card-title">${escapeHtml(translate("signin.title"))}</h2>
          </div>
          <form data-form="login" class="form-grid">
            <div class="field">
              <label for="login-email">Email</label>
              <input id="login-email" name="email" type="email" value="traveler@atlaspath.travel" required />
            </div>
            <div class="field">
              <label for="login-password">Password</label>
              <input id="login-password" name="password" type="password" value="Travel2026!" required />
            </div>
            <button class="btn btn--primary" type="submit">Sign in</button>
          </form>
          <div class="demo-credentials" style="margin-top: 18px;">
            Customer demo: <strong>traveler@atlaspath.travel</strong> / <strong>Travel2026!</strong><br />
            Admin demo: <strong>admin@atlaspath.travel</strong> / <strong>AtlasAdmin123!</strong>
          </div>
        </div>
        <div class="panel glass-card">
          <div class="panel__heading">
            <div class="eyebrow">Create account</div>
            <h2 class="card-title">Claim your bookings and future trips</h2>
            <p class="section-copy">${escapeHtml(translate("dashboard.authCopy"))}</p>
          </div>
          <form data-form="signup" class="form-grid">
            <div class="field">
              <label for="signup-name">Full name</label>
              <input id="signup-name" name="fullName" required />
            </div>
            <div class="form-grid form-grid--2">
              <div class="field">
                <label for="signup-email">Email</label>
                <input id="signup-email" name="email" type="email" required />
              </div>
              <div class="field">
                <label for="signup-phone">Phone</label>
                <input id="signup-phone" name="phone" />
              </div>
            </div>
            <div class="form-grid form-grid--2">
              <div class="field">
                <label for="signup-nationality">Nationality</label>
                <input id="signup-nationality" name="nationality" />
              </div>
              <div class="field">
                <label for="signup-password">Password</label>
                <input id="signup-password" name="password" type="password" required />
              </div>
            </div>
            <button class="btn btn--dark" type="submit">Create account</button>
          </form>
        </div>
      </section>
    `;
  }

  const bookings = state.dashboardData.bookings || [];
  const payments = state.dashboardData.payments || [];

  return `
    <section class="hero hero--inner">
      <div class="eyebrow">${escapeHtml(translate("common.dashboardEyebrow"))}</div>
      <h1 class="page-title">${escapeHtml(translate("dashboard.title"))}</h1>
      <p class="page-copy">${escapeHtml(translate("dashboard.copy"))}</p>
      <div class="hero__actions" style="margin-top: 20px;">
        ${state.currentUser.role === "admin" ? `<a class="btn btn--ghost" data-link href="/admin">${escapeHtml(translate("nav.admin"))}</a>` : ""}
        <button class="btn btn--primary" type="button" data-action="logout">Sign out</button>
      </div>
    </section>

    <section class="section dashboard-grid">
      <div class="dashboard-list">
        <div class="panel glass-card">
          <div class="panel__heading">
            <div class="eyebrow">Upcoming and past bookings</div>
            <h2 class="card-title">${escapeHtml(String(bookings.length))} booking records</h2>
          </div>
          ${
            bookings.length
              ? bookings
                  .map(
                    (booking) => `
                      <article class="booking-card glass-card">
                        <div class="booking-card__image" style="background-image: linear-gradient(180deg, rgba(16,32,49,0.05), rgba(16,32,49,0.35)), url('${escapeHtml(
                          booking.image
                        )}')"></div>
                        <div class="booking-card__top">
                          <div>
                            <h3 class="card-title">${escapeHtml(booking.tourTitle)}</h3>
                            <div class="subtle">${escapeHtml(booking.bookingCode)} · ${escapeHtml(formatDate(booking.date))}</div>
                          </div>
                          <div class="badge-row">
                            ${renderStatus(booking.bookingStatus)}
                            ${renderStatus(booking.paymentStatus)}
                          </div>
                        </div>
                        <div class="booking-card__meta">
                          <span>${escapeHtml(String(booking.guests))} guests</span>
                          <span>Outstanding ${formatMoney(booking.outstandingAmount)}</span>
                          <span>Modify until ${escapeHtml(formatDateTime(booking.canModifyUntil))}</span>
                        </div>
                        <div class="summary-line">
                          <span>Traveler</span>
                          <strong>${escapeHtml(booking.traveler.fullName)}</strong>
                        </div>
                        <div class="summary-line">
                          <span>Special requests</span>
                          <strong>${escapeHtml(booking.traveler.specialRequests || "None recorded")}</strong>
                        </div>
                        ${
                          booking.isModifiable
                            ? `
                              <form data-form="booking-update" class="form-grid" style="margin-top: 18px;">
                                <input type="hidden" name="bookingId" value="${escapeHtml(booking.id)}" />
                                <div class="form-grid form-grid--2">
                                  <div class="field">
                                    <label>New departure</label>
                                    <select name="date">
                                      ${booking.nextDates
                                        .map(
                                          (date) => `
                                            <option value="${escapeHtml(date)}" ${selected(booking.date, date)}>${escapeHtml(formatDate(date))}</option>
                                          `
                                        )
                                        .join("")}
                                    </select>
                                  </div>
                                  <div class="field">
                                    <label>Guests</label>
                                    <input name="guests" type="number" min="1" max="12" value="${escapeHtml(String(booking.guests))}" />
                                  </div>
                                </div>
                                <div class="inline-actions">
                                  <button class="btn btn--secondary btn--small" type="submit" value="update">${escapeHtml(
                                    translate("common.saveChanges")
                                  )}</button>
                                  <button class="btn btn--dark btn--small" type="submit" value="cancel" name="intent">${escapeHtml(
                                    translate("common.cancelBooking")
                                  )}</button>
                                  ${
                                    booking.outstandingAmount > 0
                                      ? `<a class="btn btn--primary btn--small" data-link href="/payment?booking=${escapeHtml(
                                          booking.id
                                        )}&access=${escapeHtml(booking.accessCode)}">${escapeHtml(translate("common.payNow"))}</a>`
                                      : ""
                                  }
                                </div>
                              </form>
                            `
                            : `
                              <div class="inline-actions" style="margin-top: 18px;">
                                ${
                                  booking.outstandingAmount > 0
                                    ? `<a class="btn btn--primary btn--small" data-link href="/payment?booking=${escapeHtml(
                                        booking.id
                                      )}&access=${escapeHtml(booking.accessCode)}">${escapeHtml(translate("common.payNow"))}</a>`
                                    : ""
                                }
                              </div>
                            `
                        }
                      </article>
                    `
                  )
                  .join("")
              : `<div class="empty-state">You have no booking records yet.</div>`
          }
        </div>
      </div>
      <div class="stack">
        <div class="profile-card glass-card">
          <div class="panel__heading">
            <div class="eyebrow">Profile</div>
            <h2 class="card-title">${escapeHtml(state.currentUser.fullName)}</h2>
          </div>
          <form data-form="profile" class="form-grid">
            <div class="field">
              <label for="profile-name">Full name</label>
              <input id="profile-name" name="fullName" value="${escapeHtml(state.currentUser.fullName)}" required />
            </div>
            <div class="field">
              <label for="profile-phone">Phone</label>
              <input id="profile-phone" name="phone" value="${escapeHtml(state.currentUser.phone || "")}" />
            </div>
            <div class="field">
              <label for="profile-nationality">Nationality</label>
              <input id="profile-nationality" name="nationality" value="${escapeHtml(state.currentUser.nationality || "")}" />
            </div>
            <div class="field">
              <label for="profile-language">Preferred language</label>
              <input id="profile-language" name="preferredLanguage" value="${escapeHtml(
                state.currentUser.preferredLanguage || "English"
              )}" />
            </div>
            <button class="btn btn--primary btn--small" type="submit">Update profile</button>
          </form>
        </div>
        <div class="summary-card glass-card">
          <div class="eyebrow">Payment history</div>
          <h2 class="card-title">${escapeHtml(String(payments.length))} payment records</h2>
          <div class="receipt-list">
            ${
              payments.length
                ? payments
                    .slice()
                    .sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt))
                    .map(
                      (payment) => `
                        <div class="summary-emphasis">
                          <div class="booking-card__top">
                            <strong>${escapeHtml(payment.invoiceNumber)}</strong>
                            ${renderStatus(payment.status)}
                          </div>
                          <div class="subtle" style="margin: 10px 0;">${escapeHtml(payment.tourTitle)} · ${escapeHtml(
                        formatDateTime(payment.createdAt)
                      )}</div>
                          <div class="booking-card__top">
                            <span>${escapeHtml(payment.type)} payment</span>
                            <strong>${formatMoney(payment.amount)}</strong>
                          </div>
                        </div>
                      `
                    )
                    .join("")
                : `<div class="empty-state">Payments will appear here after booking activity.</div>`
            }
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderContactPage() {
  const contact = state.publicData.contact;

  return `
    <section class="hero hero--inner">
      <div class="eyebrow">${escapeHtml(translate("common.contactUs"))}</div>
      <h1 class="page-title">${escapeHtml(translate("contact.title"))}</h1>
      <p class="page-copy">${escapeHtml(translate("contact.copy"))}</p>
    </section>

    <section class="section contact-grid">
      <div class="stack">
        <div class="grid grid--3">
          <article class="contact-card">
            <div class="contact-card__body">
              <span class="badge">Email</span>
              <h3 class="card-title">${escapeHtml(contact.email)}</h3>
              <p class="section-copy">Planning requests, travel advice, and booking support.</p>
            </div>
          </article>
          <article class="contact-card">
            <div class="contact-card__body">
              <span class="badge">Phone</span>
              <h3 class="card-title">${escapeHtml(contact.phone)}</h3>
              <p class="section-copy">Call our concierge team during office hours for quick assistance.</p>
            </div>
          </article>
          <article class="contact-card">
            <div class="contact-card__body">
              <span class="badge">WhatsApp</span>
              <h3 class="card-title">${escapeHtml(contact.whatsapp)}</h3>
              <p class="section-copy">Fast guest care for active bookings and in-destination questions.</p>
            </div>
          </article>
        </div>
        <div class="panel glass-card">
          <div class="panel__heading">
            <div class="eyebrow">Send a message</div>
            <h2 class="card-title">Tell us what kind of journey you are planning</h2>
          </div>
          <form data-form="contact" class="form-grid">
            <div class="form-grid form-grid--2">
              <div class="field">
                <label for="contact-name">Name</label>
                <input id="contact-name" name="name" required />
              </div>
              <div class="field">
                <label for="contact-email">Email</label>
                <input id="contact-email" name="email" type="email" required />
              </div>
            </div>
            <div class="field">
              <label for="contact-topic">Topic</label>
              <input id="contact-topic" name="topic" placeholder="Private trip, family travel, corporate group..." />
            </div>
            <div class="field">
              <label for="contact-message">Message</label>
              <textarea id="contact-message" name="message" required></textarea>
            </div>
            <button class="btn btn--primary" type="submit">Send message</button>
          </form>
        </div>
      </div>
      <aside class="stack">
        <div class="summary-card glass-card">
          <div class="eyebrow">${escapeHtml(translate("common.mapEyebrow"))}</div>
          <h2 class="card-title">Geneva office</h2>
          <p class="section-copy">${escapeHtml(contact.address)}</p>
          <div class="subtle">${escapeHtml(contact.officeHours)}</div>
          <div class="pill-list" style="margin-top: 14px;">
            <span class="chip"><a href="${escapeHtml(contact.socials.instagram)}" target="_blank" rel="noreferrer">Instagram</a></span>
            <span class="chip"><a href="${escapeHtml(contact.socials.facebook)}" target="_blank" rel="noreferrer">Facebook</a></span>
            <span class="chip"><a href="${escapeHtml(contact.socials.linkedin)}" target="_blank" rel="noreferrer">LinkedIn</a></span>
          </div>
        </div>
        <div class="map-frame">
          <iframe src="${escapeHtml(contact.mapEmbedUrl)}" width="100%" height="360" loading="lazy" title="Office map"></iframe>
        </div>
      </aside>
    </section>
  `;
}

function renderFaqPage() {
  return `
    <section class="hero hero--inner">
      <div class="eyebrow">${escapeHtml(translate("nav.faq"))}</div>
      <h1 class="page-title">${escapeHtml(translate("faq.title"))}</h1>
      <p class="page-copy">${escapeHtml(translate("faq.copy"))}</p>
    </section>

    <section class="section section-surface glass-card">
      <div class="faq-list">
        ${state.publicData.faqs
          .map(
            (item) => `
              <details class="faq-item">
                <summary>${escapeHtml(item.question)}</summary>
                <p>${escapeHtml(item.answer)}</p>
              </details>
            `
          )
          .join("")}
      </div>
    </section>

    <section class="section section-surface glass-card">
      ${renderSectionIntro("Trust and policy", "Safety information and support", "Clear communication and visible policies help travelers feel secure before committing to a departure.")}
      <div class="grid grid--3">
        ${state.publicData.trustBadges.map(renderFeatureCard).join("")}
      </div>
    </section>
  `;
}

function renderGalleryPage() {
  const images = [
    ...state.publicData.destinations.map((destination) => ({
      title: destination.name,
      label: destination.region,
      image: destination.image
    })),
    ...state.publicData.tours.slice(0, 5).map((tour) => ({
      title: tour.title,
      label: tour.location,
      image: tour.image
    }))
  ];

  return `
    <section class="hero hero--inner">
      <div class="eyebrow">${escapeHtml(translate("nav.gallery"))}</div>
      <h1 class="page-title">${escapeHtml(translate("gallery.title"))}</h1>
      <p class="page-copy">${escapeHtml(translate("gallery.copy"))}</p>
    </section>

    <section class="section">
      <div class="gallery-grid">
        ${images
          .map(
            (item) => `
              <article class="gallery-card">
                <div class="gallery-card__image" style="background-image: linear-gradient(180deg, rgba(16,32,49,0.05), rgba(16,32,49,0.28)), url('${escapeHtml(
                  item.image
                )}')"></div>
                <div class="gallery-card__body">
                  <span class="badge">${escapeHtml(item.label)}</span>
                  <h3 class="card-title">${escapeHtml(item.title)}</h3>
                </div>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderBlogPage() {
  return `
    <section class="hero hero--inner">
      <div class="eyebrow">${escapeHtml(translate("nav.blog"))}</div>
      <h1 class="page-title">${escapeHtml(translate("blog.title"))}</h1>
      <p class="page-copy">${escapeHtml(translate("blog.copy"))}</p>
    </section>

    <section class="section">
      <div class="grid grid--3">
        ${state.publicData.blogPosts
          .map(
            (post) => `
              <article class="blog-card">
                <div class="blog-card__image" style="background-image: linear-gradient(180deg, rgba(16,32,49,0.05), rgba(16,32,49,0.26)), url('${escapeHtml(
                  post.image
                )}')"></div>
                <div class="blog-card__body">
                  <div class="badge-row">
                    <span class="badge">${escapeHtml(post.category)}</span>
                    <span class="chip">${escapeHtml(formatDate(post.publishedAt))}</span>
                  </div>
                  <h3 class="card-title">${escapeHtml(post.title)}</h3>
                  <p class="section-copy">${escapeHtml(post.excerpt)}</p>
                  <div class="subtle">By ${escapeHtml(post.author)}</div>
                </div>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderAdminPage() {
  if (state.currentUser?.role !== "admin") {
    return `
      <section class="section">
        <div class="empty-state">
          Admin access is required to view operational data. Use the seeded admin account on the sign-in page.
        </div>
      </section>
    `;
  }

  if (!state.adminData) {
    return `<section class="section"><div class="loading">Loading admin dashboard…</div></section>`;
  }

  return `
    <section class="hero hero--inner">
      <div class="eyebrow">${escapeHtml(translate("common.adminEyebrow"))}</div>
      <h1 class="page-title">${escapeHtml(translate("admin.title"))}</h1>
      <p class="page-copy">${escapeHtml(translate("admin.copy"))}</p>
      <div class="hero__actions" style="margin-top: 20px;">
        <a class="btn btn--ghost" data-link href="/dashboard">${escapeHtml(translate("nav.dashboard"))}</a>
        <button class="btn btn--primary" type="button" data-action="logout">Sign out</button>
      </div>
    </section>

    <section class="section">
      <div class="metric-grid">
        <div class="metric-card glass-card">
          <div class="eyebrow">Bookings</div>
          <div class="metric-card__value">${escapeHtml(String(state.adminData.analytics.totalBookings))}</div>
          <div class="subtle">All booking records</div>
        </div>
        <div class="metric-card glass-card">
          <div class="eyebrow">Revenue</div>
          <div class="metric-card__value">${formatMoney(state.adminData.analytics.totalRevenue)}</div>
          <div class="subtle">Paid revenue recorded</div>
        </div>
        <div class="metric-card glass-card">
          <div class="eyebrow">Active tours</div>
          <div class="metric-card__value">${escapeHtml(String(state.adminData.analytics.activeTours))}</div>
          <div class="subtle">Sellable departures</div>
        </div>
        <div class="metric-card glass-card">
          <div class="eyebrow">Pending payments</div>
          <div class="metric-card__value">${escapeHtml(String(state.adminData.analytics.pendingPayments))}</div>
          <div class="subtle">Follow-up required</div>
        </div>
      </div>
    </section>

    <section class="section section-surface glass-card">
      ${renderSectionIntro("Popular tours", "Top-booked journeys", "Snapshot of the departures attracting the highest booking volume.")}
      <div class="grid grid--3">
        ${state.adminData.analytics.popularTours
          .map(
            (tour) => `
              <article class="feature-card">
                <div class="feature-card__body">
                  <span class="badge">${escapeHtml(String(tour.bookings))} bookings</span>
                  <h3 class="card-title">${escapeHtml(tour.title)}</h3>
                </div>
              </article>
            `
          )
          .join("")}
      </div>
    </section>

    <section class="section section-surface glass-card">
      ${renderSectionIntro("Bookings", "Manage customer reservations", "Update booking and payment statuses directly from the operations view.")}
      <div class="table-wrap glass-card">
        <table class="table">
          <thead>
            <tr>
              <th>Booking</th>
              <th>Customer</th>
              <th>Tour</th>
              <th>Statuses</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            ${state.adminData.bookings
              .map(
                (booking) => `
                  <tr>
                    <td>
                      <strong>${escapeHtml(booking.bookingCode)}</strong><br />
                      <span class="subtle">${escapeHtml(formatDate(booking.date))}</span>
                    </td>
                    <td>${escapeHtml(booking.traveler.fullName)}</td>
                    <td>${escapeHtml(booking.tourTitle)}</td>
                    <td>
                      ${renderStatus(booking.bookingStatus)}
                      ${renderStatus(booking.paymentStatus)}
                    </td>
                    <td>
                      <form data-form="admin-booking-update" class="form-grid">
                        <input type="hidden" name="bookingId" value="${escapeHtml(booking.id)}" />
                        <select name="bookingStatus">
                          ${["reserved", "confirmed", "completed", "cancelled"]
                            .map(
                              (status) => `
                                <option value="${status}" ${selected(booking.bookingStatus, status)}>${status}</option>
                              `
                            )
                            .join("")}
                        </select>
                        <select name="paymentStatus">
                          ${["pending", "paid", "failed", "refunded"]
                            .map(
                              (status) => `
                                <option value="${status}" ${selected(booking.paymentStatus, status)}>${status}</option>
                              `
                            )
                            .join("")}
                        </select>
                        <button class="btn btn--secondary btn--small" type="submit">Update</button>
                      </form>
                    </td>
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </section>

    <section class="section section-surface glass-card">
      ${renderSectionIntro("Payments", "Track invoices and payment states", "Operations can mark pending transfers, failures, paid records, or refunds in one place.")}
      <div class="table-wrap glass-card">
        <table class="table">
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Booking</th>
              <th>Method</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            ${state.adminData.payments
              .map(
                (payment) => `
                  <tr>
                    <td>${escapeHtml(payment.invoiceNumber)}</td>
                    <td>${escapeHtml(payment.bookingCode)}<br /><span class="subtle">${escapeHtml(payment.tourTitle)}</span></td>
                    <td>${escapeHtml(payment.method)}</td>
                    <td>${formatMoney(payment.amount)}</td>
                    <td>${renderStatus(payment.status)}</td>
                    <td>
                      <form data-form="admin-payment-update" class="form-grid">
                        <input type="hidden" name="paymentId" value="${escapeHtml(payment.id)}" />
                        <select name="status">
                          ${["pending", "paid", "failed", "refunded"]
                            .map(
                              (status) => `
                                <option value="${status}" ${selected(payment.status, status)}>${status}</option>
                              `
                            )
                            .join("")}
                        </select>
                        <button class="btn btn--secondary btn--small" type="submit">Save</button>
                      </form>
                    </td>
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </section>

    <section class="section admin-grid" style="grid-template-columns: 1fr 1fr;">
      <div class="stack">
        <div class="section-surface glass-card">
          ${renderSectionIntro("Tours", "Update sellable packages", "Adjust featured status, popularity, rating, and pricing without leaving the dashboard.")}
          <div class="grid grid--2">
            ${state.adminData.tours
              .map(
                (tour) => `
                  <article class="panel">
                    <h3 class="card-title">${escapeHtml(tour.title)}</h3>
                    <form data-form="admin-tour-update" class="form-grid">
                      <input type="hidden" name="tourId" value="${escapeHtml(tour.id)}" />
                      <div class="form-grid form-grid--2">
                        <div class="field">
                          <label>Price</label>
                          <input name="price" type="number" value="${escapeHtml(String(tour.price))}" />
                        </div>
                        <div class="field">
                          <label>Rating</label>
                          <input name="rating" type="number" step="0.1" min="0" max="5" value="${escapeHtml(String(tour.rating))}" />
                        </div>
                      </div>
                      <div class="form-grid form-grid--2">
                        <div class="field">
                          <label>Featured</label>
                          <select name="featured">
                            <option value="true" ${selected(String(Boolean(tour.featured)), "true")}>true</option>
                            <option value="false" ${selected(String(Boolean(tour.featured)), "false")}>false</option>
                          </select>
                        </div>
                        <div class="field">
                          <label>Popular</label>
                          <select name="popular">
                            <option value="true" ${selected(String(Boolean(tour.popular)), "true")}>true</option>
                            <option value="false" ${selected(String(Boolean(tour.popular)), "false")}>false</option>
                          </select>
                        </div>
                      </div>
                      <button class="btn btn--secondary btn--small" type="submit">Update tour</button>
                    </form>
                  </article>
                `
              )
              .join("")}
          </div>
        </div>

        <div class="section-surface glass-card">
          ${renderSectionIntro("Create a new tour", "Add a sellable package", "This lightweight form seeds a new tour package into the local data store.")}
          <form data-form="admin-new-tour" class="form-grid">
            <div class="form-grid form-grid--2">
              <div class="field"><label>Title</label><input name="title" required /></div>
              <div class="field"><label>Location</label><input name="location" required /></div>
            </div>
            <div class="form-grid form-grid--2">
              <div class="field"><label>Destination</label><input name="destination" /></div>
              <div class="field"><label>Category</label><input name="category" /></div>
            </div>
            <div class="form-grid form-grid--2">
              <div class="field"><label>Duration days</label><input name="durationDays" type="number" value="5" /></div>
              <div class="field"><label>Price</label><input name="price" type="number" value="1800" /></div>
            </div>
            <div class="form-grid form-grid--2">
              <div class="field"><label>Image URL</label><input name="image" /></div>
              <div class="field"><label>Availability CSV</label><input name="availabilityCsv" placeholder="2026-09-01,2026-10-01" /></div>
            </div>
            <button class="btn btn--primary btn--small" type="submit">Create tour</button>
          </form>
        </div>
      </div>

      <div class="stack">
        <div class="section-surface glass-card">
          ${renderSectionIntro("Guides", "Manage guide profiles", "Adjust guide role and rating or add new profiles for destination coverage.")}
          <div class="grid grid--2">
            ${state.adminData.guides
              .map(
                (guide) => `
                  <article class="panel">
                    <h3 class="card-title">${escapeHtml(guide.name)}</h3>
                    <form data-form="admin-guide-update" class="form-grid">
                      <input type="hidden" name="guideId" value="${escapeHtml(guide.id)}" />
                      <div class="field"><label>Role</label><input name="role" value="${escapeHtml(guide.role)}" /></div>
                      <div class="field"><label>Rating</label><input name="rating" type="number" step="0.1" min="0" max="5" value="${escapeHtml(String(guide.rating))}" /></div>
                      <button class="btn btn--secondary btn--small" type="submit">Update guide</button>
                    </form>
                  </article>
                `
              )
              .join("")}
          </div>
        </div>

        <div class="section-surface glass-card">
          ${renderSectionIntro("Add a guide", "Create guide profile", "New guide profiles appear immediately in the about page and tour associations can be added later.")}
          <form data-form="admin-new-guide" class="form-grid">
            <div class="field"><label>Name</label><input name="name" required /></div>
            <div class="field"><label>Role</label><input name="role" /></div>
            <div class="field"><label>Photo URL</label><input name="photo" /></div>
            <div class="field"><label>Languages CSV</label><input name="languagesCsv" placeholder="English, French" /></div>
            <div class="field"><label>Specialties CSV</label><input name="specialtiesCsv" placeholder="Food tours, private groups" /></div>
            <div class="field"><label>Rating</label><input name="rating" type="number" step="0.1" min="0" max="5" value="4.8" /></div>
            <button class="btn btn--primary btn--small" type="submit">Create guide</button>
          </form>
        </div>

        <div class="section-surface glass-card">
          ${renderSectionIntro("Reviews", "Moderate testimonials", "Approve or feature reviews to shape the public trust layer of the site.")}
          <div class="grid">
            ${state.adminData.reviews
              .map(
                (review) => `
                  <article class="panel">
                    <strong>${escapeHtml(review.guestName)}</strong>
                    <div class="subtle" style="margin: 6px 0 12px;">${escapeHtml(review.tourTitle)}</div>
                    <p class="section-copy">${escapeHtml(review.body)}</p>
                    <form data-form="admin-review-update" class="form-grid">
                      <input type="hidden" name="reviewId" value="${escapeHtml(review.id)}" />
                      <div class="form-grid form-grid--2">
                        <div class="field">
                          <label>Approved</label>
                          <select name="approved">
                            <option value="true" ${selected(String(Boolean(review.approved)), "true")}>true</option>
                            <option value="false" ${selected(String(Boolean(review.approved)), "false")}>false</option>
                          </select>
                        </div>
                        <div class="field">
                          <label>Featured</label>
                          <select name="featured">
                            <option value="true" ${selected(String(Boolean(review.featured)), "true")}>true</option>
                            <option value="false" ${selected(String(Boolean(review.featured)), "false")}>false</option>
                          </select>
                        </div>
                      </div>
                      <button class="btn btn--secondary btn--small" type="submit">Update review</button>
                    </form>
                  </article>
                `
              )
              .join("")}
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderSignInPage() {
  return renderDashboardPage();
}

function renderNotFoundPage() {
  return `
    <section class="section">
      <div class="empty-state">
        <h2 class="card-title">Page not found</h2>
        <p class="section-copy">The page you tried to open does not exist in this travel platform.</p>
        <a class="btn btn--primary" data-link href="/">Return home</a>
      </div>
    </section>
  `;
}

function renderPage() {
  const route = getRoute();

  if (state.loadingRoute) {
    return `<section class="section"><div class="loading">Loading the next section of Atlas Path Travel…</div></section>`;
  }

  switch (route.page) {
    case "home":
      return renderHomePage();
    case "about":
      return renderAboutPage();
    case "tours":
      return renderToursPage();
    case "tour-detail":
      return renderTourDetailPage(route);
    case "booking":
      return renderBookingPage();
    case "payment":
      return renderPaymentPage();
    case "dashboard":
      return renderDashboardPage();
    case "contact":
      return renderContactPage();
    case "faq":
      return renderFaqPage();
    case "gallery":
      return renderGalleryPage();
    case "blog":
      return renderBlogPage();
    case "admin":
      return renderAdminPage();
    case "signin":
      return renderSignInPage();
    default:
      return renderNotFoundPage();
  }
}

function render() {
  setMeta();

  if (!state.publicData) {
    app.innerHTML = `<div class="loading">Loading Atlas Path Travel…</div>`;
    return;
  }

  app.innerHTML = `
    <div class="app-shell">
      ${renderHeader()}
      <main class="page">
        ${
          state.notice
            ? `<div class="notice notice--${escapeHtml(state.notice.type)}">${escapeHtml(state.notice.text)}</div>`
            : ""
        }
        ${renderPage()}
      </main>
      ${renderFooter()}
    </div>
  `;
}

function formDataToObject(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function csvToArray(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

async function handleFormSubmit(form, submitter) {
  switch (form.dataset.form) {
    case "newsletter": {
      const payload = formDataToObject(form);
      const result = await api("/api/newsletter", { method: "POST", body: payload });
      setNotice(result.message, "success");
      form.reset();
      return;
    }

    case "contact": {
      const payload = formDataToObject(form);
      const result = await api("/api/contact", { method: "POST", body: payload });
      setNotice(result.message, "success");
      form.reset();
      render();
      return;
    }

    case "login": {
      const payload = formDataToObject(form);
      const result = await api("/api/auth/login", { method: "POST", body: payload });
      await refreshBootstrap();
      await loadRouteData();
      state.loadingRoute = false;
      setNotice(result.message, "success");
      await navigate(state.currentUser?.role === "admin" ? "/admin" : "/dashboard", { replace: true });
      return;
    }

    case "signup": {
      const payload = formDataToObject(form);
      const result = await api("/api/auth/signup", { method: "POST", body: payload });
      await refreshBootstrap();
      await loadRouteData();
      state.loadingRoute = false;
      setNotice(result.message, "success");
      await navigate("/dashboard", { replace: true });
      return;
    }

    case "profile": {
      const payload = formDataToObject(form);
      const result = await api("/api/me", { method: "PUT", body: payload });
      state.currentUser = result.user;
      await refreshBootstrap();
      setNotice(result.message, "success");
      render();
      return;
    }

    case "booking": {
      const payload = formDataToObject(form);
      payload.guests = Number(payload.guests || state.bookingDraft.guests || 1);
      const result = await api("/api/bookings", { method: "POST", body: payload });
      state.latestBooking = {
        ...result.booking,
        accessCode: result.accessCode
      };
      state.paymentContext.booking = state.latestBooking;
      state.paymentContext.payment = null;
      state.latestPayment = null;
      state.paymentDraft.bookingId = result.booking.id;
      state.paymentDraft.accessCode = result.accessCode;
      state.paymentDraft.paymentOption = "deposit";
      setNotice(result.message, "success");
      if (state.currentUser) {
        await loadDashboardData();
      }
      await navigate(`/payment?booking=${encodeURIComponent(result.booking.id)}&access=${encodeURIComponent(result.accessCode)}`);
      return;
    }

    case "payment": {
      const payload = formDataToObject(form);
      const result = await api("/api/payments", { method: "POST", body: payload });
      state.latestPayment = result.payment;
      state.paymentContext.payment = result.payment;
      state.paymentContext.booking = result.booking;
      setNotice(result.message, "success");
      if (state.currentUser) {
        await loadDashboardData();
      }
      render();
      return;
    }

    case "booking-update": {
      const payload = formDataToObject(form);
      const intent = submitter?.name === "intent" ? submitter.value : "update";
      const body =
        intent === "cancel"
          ? { bookingStatus: "cancelled" }
          : { date: payload.date, guests: Number(payload.guests || 1) };
      const result = await api(`/api/bookings/${encodeURIComponent(payload.bookingId)}`, {
        method: "PATCH",
        body
      });
      await loadDashboardData();
      setNotice(result.message, "success");
      render();
      return;
    }

    case "admin-booking-update": {
      const payload = formDataToObject(form);
      const result = await api(`/api/admin/bookings/${encodeURIComponent(payload.bookingId)}`, {
        method: "PATCH",
        body: {
          bookingStatus: payload.bookingStatus,
          paymentStatus: payload.paymentStatus
        }
      });
      await loadAdminData();
      setNotice(result.message, "success");
      render();
      return;
    }

    case "admin-payment-update": {
      const payload = formDataToObject(form);
      const result = await api(`/api/admin/payments/${encodeURIComponent(payload.paymentId)}`, {
        method: "PATCH",
        body: { status: payload.status }
      });
      await loadAdminData();
      setNotice(result.message, "success");
      render();
      return;
    }

    case "admin-tour-update": {
      const payload = formDataToObject(form);
      const result = await api(`/api/admin/tours/${encodeURIComponent(payload.tourId)}`, {
        method: "PATCH",
        body: {
          price: Number(payload.price),
          rating: Number(payload.rating),
          featured: payload.featured === "true",
          popular: payload.popular === "true"
        }
      });
      await loadAdminData();
      setNotice(result.message, "success");
      render();
      return;
    }

    case "admin-review-update": {
      const payload = formDataToObject(form);
      const result = await api(`/api/admin/reviews/${encodeURIComponent(payload.reviewId)}`, {
        method: "PATCH",
        body: {
          approved: payload.approved === "true",
          featured: payload.featured === "true"
        }
      });
      await loadAdminData();
      setNotice(result.message, "success");
      render();
      return;
    }

    case "admin-guide-update": {
      const payload = formDataToObject(form);
      const result = await api(`/api/admin/guides/${encodeURIComponent(payload.guideId)}`, {
        method: "PATCH",
        body: {
          role: payload.role,
          rating: Number(payload.rating)
        }
      });
      await loadAdminData();
      setNotice(result.message, "success");
      render();
      return;
    }

    case "admin-new-tour": {
      const payload = formDataToObject(form);
      const result = await api("/api/admin/tours", {
        method: "POST",
        body: {
          title: payload.title,
          location: payload.location,
          destination: payload.destination,
          category: payload.category,
          durationDays: Number(payload.durationDays || 5),
          price: Number(payload.price || 1800),
          image: payload.image,
          availability: csvToArray(payload.availabilityCsv)
        }
      });
      form.reset();
      await loadAdminData();
      setNotice(result.message, "success");
      render();
      return;
    }

    case "admin-new-guide": {
      const payload = formDataToObject(form);
      const result = await api("/api/admin/guides", {
        method: "POST",
        body: {
          name: payload.name,
          role: payload.role,
          photo: payload.photo,
          languages: csvToArray(payload.languagesCsv),
          specialties: csvToArray(payload.specialtiesCsv),
          rating: Number(payload.rating || 4.8)
        }
      });
      form.reset();
      await loadAdminData();
      setNotice(result.message, "success");
      render();
      return;
    }

    default:
      return;
  }
}

function handleBookingSync(target) {
  const name = target.name;
  if (name === "tourId") {
    state.bookingDraft.tourId = target.value;
    const tour = findTourById(target.value);
    state.bookingDraft.date = tour?.availability?.[0] || "";
  }

  if (name === "date") {
    state.bookingDraft.date = target.value;
  }

  if (name === "guests") {
    const numericValue = Math.max(1, Number(target.value || 1));
    state.bookingDraft.guests = numericValue;
  }
}

function handlePaymentSync(target) {
  if (target.name === "paymentOption") {
    state.paymentDraft.paymentOption = target.value;
  }

  if (target.name === "method") {
    state.paymentDraft.method = target.value;
  }

  if (target.name === "promoCode") {
    state.paymentDraft.promoCode = target.value;
  }
}

document.addEventListener("click", async (event) => {
  const link = event.target.closest("[data-link]");

  if (link) {
    const href = link.getAttribute("href");
    if (href?.startsWith("/")) {
      event.preventDefault();
      await navigate(href);
      return;
    }
  }

  const action = event.target.closest("[data-action]");

  if (!action) {
    return;
  }

  if (action.dataset.action === "toggle-menu") {
    state.mobileMenu = !state.mobileMenu;
    render();
    return;
  }

  if (action.dataset.action === "set-language") {
    state.language = action.dataset.lang || "en";
    window.localStorage.setItem("atlas-language", state.language);
    render();
    return;
  }

  if (action.dataset.action === "logout") {
    const result = await api("/api/auth/logout", { method: "POST" });
    await refreshBootstrap();
    state.dashboardData = { bookings: [], payments: [] };
    state.adminData = null;
    state.latestBooking = null;
    state.latestPayment = null;
    state.paymentContext = { booking: null, payment: null };
    setNotice(result.success ? "Signed out successfully." : "Signed out.", "success");
    await navigate("/", { replace: true });
  }
});

document.addEventListener("submit", async (event) => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) {
    return;
  }

  event.preventDefault();

  try {
    await handleFormSubmit(form, event.submitter);
  } catch (error) {
    setNotice(error.message || "Something went wrong.", "error");
    render();
  }
});

document.addEventListener("change", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLElement)) {
    return;
  }

  if (target instanceof HTMLInputElement || target instanceof HTMLSelectElement) {
    if (target.dataset.sync === "booking") {
      handleBookingSync(target);
      render();
      return;
    }

    if (target.dataset.sync === "payment") {
      handlePaymentSync(target);
      render();
      return;
    }
  }

  const filterForm = target.closest('[data-form="tour-filters"]');
  if (filterForm instanceof HTMLFormElement) {
    const values = formDataToObject(filterForm);
    state.filters = {
      destination: values.destination || "all",
      price: values.price || "all",
      duration: values.duration || "all",
      category: values.category || "all",
      rating: values.rating || "all"
    };
    render();
  }
});

window.addEventListener("popstate", async () => {
  state.loadingRoute = true;
  syncDraftsFromQuery();
  render();
  await loadRouteData();
  state.loadingRoute = false;
  render();
});

async function init() {
  try {
    render();
    await refreshBootstrap();
    syncDraftsFromQuery();
    await loadRouteData();
  } catch (error) {
    setNotice(error.message || "Unable to load the travel platform.", "error");
  } finally {
    state.loadingRoute = false;
    render();
  }
}

init();
