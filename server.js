const http = require("http");
const fs = require("fs");
const path = require("path");
const { randomBytes, scryptSync, timingSafeEqual } = require("crypto");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1";
const publicDir = path.join(__dirname, "public");
const storePath = path.join(__dirname, "data", "store.json");
const sessionCookieName = "atlas_session";

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function roundCurrency(value) {
  return Number((Number(value) || 0).toFixed(2));
}

function readStore() {
  return JSON.parse(fs.readFileSync(storePath, "utf8"));
}

function writeStore(store) {
  fs.writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`);
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function parseCookies(request) {
  const header = request.headers.cookie || "";
  return header.split(";").reduce((accumulator, item) => {
    const [key, ...valueParts] = item.trim().split("=");

    if (!key) {
      return accumulator;
    }

    accumulator[key] = decodeURIComponent(valueParts.join("="));
    return accumulator;
  }, {});
}

function buildCookie(name, value, options = {}) {
  const parts = [`${name}=${encodeURIComponent(value)}`];

  if (options.maxAge !== undefined) {
    parts.push(`Max-Age=${options.maxAge}`);
  }

  if (options.path) {
    parts.push(`Path=${options.path}`);
  }

  if (options.httpOnly) {
    parts.push("HttpOnly");
  }

  if (options.sameSite) {
    parts.push(`SameSite=${options.sameSite}`);
  }

  if (options.secure) {
    parts.push("Secure");
  }

  return parts.join("; ");
}

function parseJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;

      if (body.length > 1_000_000) {
        reject(new Error("Request body is too large."));
        request.destroy();
      }
    });

    request.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch (error) {
        reject(new Error("Invalid JSON payload."));
      }
    });

    request.on("error", reject);
  });
}

function sendJson(response, statusCode, payload, extraHeaders = {}) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    ...extraHeaders,
  });
  response.end(JSON.stringify(payload));
}

function sendText(response, statusCode, payload) {
  response.writeHead(statusCode, { "Content-Type": "text/plain; charset=utf-8" });
  response.end(payload);
}

function serveStaticFile(filePath, response) {
  const extension = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[extension] || "application/octet-stream";
  const content = fs.readFileSync(filePath);
  response.writeHead(200, { "Content-Type": contentType });
  response.end(content);
}

function hashPassword(password, salt = randomBytes(16).toString("hex")) {
  return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
}

function verifyPassword(password, storedHash) {
  const [salt, storedKey] = String(storedHash || "").split(":");

  if (!salt || !storedKey) {
    return false;
  }

  const candidate = scryptSync(password, salt, 64);
  const storedBuffer = Buffer.from(storedKey, "hex");

  if (candidate.length !== storedBuffer.length) {
    return false;
  }

  return timingSafeEqual(candidate, storedBuffer);
}

function randomId(prefix) {
  return `${prefix}_${randomBytes(6).toString("hex")}`;
}

function sanitizeUser(user) {
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    role: user.role,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    nationality: user.nationality,
    preferredLanguage: user.preferredLanguage,
    preferredCurrency: user.preferredCurrency,
    createdAt: user.createdAt,
  };
}

function publicGuide(guide) {
  return {
    id: guide.id,
    name: guide.name,
    role: guide.role,
    photo: guide.photo,
    bio: guide.bio,
    languages: guide.languages,
    specialties: guide.specialties,
    rating: guide.rating,
    experienceYears: guide.experienceYears,
    certifications: guide.certifications,
  };
}

function publicTour(tour, store) {
  const guides = (tour.guideIds || [])
    .map((guideId) => store.guides.find((guide) => guide.id === guideId))
    .filter(Boolean)
    .map((guide) => ({
      id: guide.id,
      name: guide.name,
      photo: guide.photo,
      rating: guide.rating,
      languages: guide.languages,
    }));

  return {
    ...tour,
    guides,
    availabilityCount: (tour.availability || []).length,
  };
}

function publicReview(review, store) {
  const tour = store.tours.find((item) => item.id === review.tourId);

  return {
    ...review,
    tourTitle: tour ? tour.title : "",
    tourSlug: tour ? tour.slug : "",
  };
}

function getSetCookieHeader(token) {
  return buildCookie(sessionCookieName, token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 14,
    path: "/",
    sameSite: "Lax",
  });
}

function getClearCookieHeader() {
  return buildCookie(sessionCookieName, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "Lax",
  });
}

function getAuthenticatedUser(request, store) {
  const cookies = parseCookies(request);
  const token = cookies[sessionCookieName];

  if (!token) {
    return { user: null, token: null, expired: false };
  }

  const session = (store.sessions || []).find((item) => item.id === token);

  if (!session) {
    return { user: null, token, expired: false };
  }

  if (new Date(session.expiresAt).getTime() <= Date.now()) {
    store.sessions = store.sessions.filter((item) => item.id !== token);
    return { user: null, token, expired: true };
  }

  const user = store.users.find((item) => item.id === session.userId) || null;
  return { user, token, expired: false };
}

function claimGuestBookings(store, user) {
  if (!user) {
    return 0;
  }

  let claimed = 0;
  const email = normalizeEmail(user.email);

  store.bookings.forEach((booking) => {
    if (!booking.customerId && normalizeEmail(booking.traveler.email) === email) {
      booking.customerId = user.id;
      claimed += 1;
    }
  });

  return claimed;
}

function createSession(store, userId) {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString();
  store.sessions = (store.sessions || []).filter(
    (session) => new Date(session.expiresAt).getTime() > Date.now(),
  );
  store.sessions.push({ id: token, userId, expiresAt });
  return token;
}

function destroySession(store, token) {
  store.sessions = (store.sessions || []).filter((session) => session.id !== token);
}

function findPromoCode(store, code) {
  const normalizedCode = String(code || "").trim().toUpperCase();

  if (!normalizedCode) {
    return null;
  }

  return store.promoCodes.find(
    (promoCode) => promoCode.active && promoCode.code.toUpperCase() === normalizedCode,
  );
}

function applyPromoCode(store, code, amount, tour) {
  const promoCode = findPromoCode(store, code);

  if (!promoCode) {
    return {
      promoCode: null,
      discountAmount: 0,
      finalAmount: roundCurrency(amount),
    };
  }

  if (
    Array.isArray(promoCode.appliesToCategories) &&
    promoCode.appliesToCategories.length > 0 &&
    !promoCode.appliesToCategories.includes(tour.category)
  ) {
    throw new Error("Promo code does not apply to this tour category.");
  }

  const discountAmount =
    promoCode.type === "percent"
      ? roundCurrency(amount * (promoCode.value / 100))
      : roundCurrency(Math.min(amount, promoCode.value));

  return {
    promoCode: promoCode.code,
    discountAmount,
    finalAmount: roundCurrency(Math.max(amount - discountAmount, 0)),
  };
}

function calculateBookingTotals(tour, guests) {
  const subtotal = roundCurrency(Number(tour.price) * Number(guests));
  return {
    subtotal,
    totalAmount: subtotal,
    depositDue: roundCurrency(subtotal * 0.3),
  };
}

function paidAmountForBooking(store, bookingId) {
  return roundCurrency(
    store.payments
      .filter((payment) => payment.bookingId === bookingId && payment.status === "paid")
      .reduce((sum, payment) => sum + Number(payment.amount || 0), 0),
  );
}

function computeBookingPaymentStatus(store, booking) {
  const relatedPayments = store.payments.filter((payment) => payment.bookingId === booking.id);

  if (relatedPayments.some((payment) => payment.status === "refunded")) {
    return "refunded";
  }

  const totalPaid = paidAmountForBooking(store, booking.id);

  if (totalPaid >= Number(booking.totalAmount) - 0.01) {
    return "paid";
  }

  if (relatedPayments.some((payment) => payment.status === "failed")) {
    return "failed";
  }

  return "pending";
}

function isBookingModifiable(booking) {
  return (
    booking.bookingStatus !== "cancelled" &&
    booking.bookingStatus !== "completed" &&
    new Date(booking.canModifyUntil).getTime() > Date.now()
  );
}

function hydrateBooking(booking, store) {
  const tour = store.tours.find((item) => item.id === booking.tourId);
  const paidAmount = paidAmountForBooking(store, booking.id);

  return {
    ...booking,
    paidAmount,
    outstandingAmount: roundCurrency(Math.max(Number(booking.totalAmount) - paidAmount, 0)),
    isModifiable: isBookingModifiable(booking),
    tourTitle: tour ? tour.title : "",
    tourSlug: tour ? tour.slug : "",
    image: tour ? tour.image : "",
    nextDates: tour ? tour.availability.filter((date) => date >= booking.date) : [],
  };
}

function hydratePayment(payment, store) {
  const booking = store.bookings.find((item) => item.id === payment.bookingId);
  const tour = booking ? store.tours.find((item) => item.id === booking.tourId) : null;

  return {
    ...payment,
    bookingCode: booking ? booking.bookingCode : "",
    bookingDate: booking ? booking.date : "",
    tourTitle: tour ? tour.title : "",
  };
}

function buildBootstrapPayload(store, user) {
  return {
    company: store.company,
    contact: store.contact,
    destinations: store.destinations,
    offers: store.offers,
    trustBadges: store.trustBadges,
    faqs: store.faqs,
    blogPosts: store.blogPosts,
    guides: store.guides.map(publicGuide),
    promoCodes: store.promoCodes.map((promoCode) => ({
      code: promoCode.code,
      type: promoCode.type,
      value: promoCode.value,
      appliesToCategories: promoCode.appliesToCategories,
    })),
    tours: store.tours.map((tour) => publicTour(tour, store)),
    reviews: store.reviews.filter((review) => review.approved).map((review) => publicReview(review, store)),
    policies: store.policies,
    currentUser: sanitizeUser(user),
  };
}

function buildAdminPayload(store) {
  const totalBookings = store.bookings.length;
  const totalRevenue = roundCurrency(
    store.payments
      .filter((payment) => payment.status === "paid")
      .reduce((sum, payment) => sum + Number(payment.amount || 0), 0),
  );
  const popularTours = store.tours
    .map((tour) => ({
      id: tour.id,
      title: tour.title,
      bookings: store.bookings.filter((booking) => booking.tourId === tour.id).length,
    }))
    .sort((left, right) => right.bookings - left.bookings)
    .slice(0, 5);
  const recentCustomers = store.users
    .filter((user) => user.role === "customer")
    .sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt))
    .slice(0, 5)
    .map(sanitizeUser);

  return {
    analytics: {
      totalBookings,
      totalRevenue,
      activeTours: store.tours.filter((tour) => tour.availability.length > 0).length,
      pendingPayments: store.payments.filter((payment) => payment.status === "pending").length,
      popularTours,
      recentCustomers,
    },
    tours: store.tours.map((tour) => publicTour(tour, store)),
    bookings: store.bookings.map((booking) => hydrateBooking(booking, store)),
    payments: store.payments.map((payment) => hydratePayment(payment, store)),
    customers: store.users.filter((user) => user.role === "customer").map(sanitizeUser),
    reviews: store.reviews.map((review) => publicReview(review, store)),
    guides: store.guides.map(publicGuide),
  };
}

function validatePassword(password) {
  if (String(password || "").trim().length < 8) {
    throw new Error("Password must contain at least 8 characters.");
  }
}

function validateRequired(value, label) {
  if (!String(value || "").trim()) {
    throw new Error(`${label} is required.`);
  }
}

function bookingAccessAllowed(user, booking, accessCode) {
  if (!booking) {
    return false;
  }

  if (user && (user.role === "admin" || booking.customerId === user.id)) {
    return true;
  }

  return Boolean(accessCode && booking.accessCode === accessCode);
}

async function handleApi(request, response, pathname, searchParams) {
  const mutableStore = readStore();
  const auth = getAuthenticatedUser(request, mutableStore);

  if (auth.expired) {
    writeStore(mutableStore);
  }

  if (request.method === "GET" && pathname === "/api/bootstrap") {
    if (auth.user) {
      const claimed = claimGuestBookings(mutableStore, auth.user);

      if (claimed > 0) {
        writeStore(mutableStore);
      }
    }

    sendJson(response, 200, buildBootstrapPayload(mutableStore, auth.user));
    return;
  }

  if (request.method === "GET" && pathname === "/api/tours") {
    const filters = {
      destination: String(searchParams.get("destination") || "").toLowerCase(),
      category: String(searchParams.get("category") || "").toLowerCase(),
      duration: Number(searchParams.get("duration") || 0),
      minRating: Number(searchParams.get("rating") || 0),
      maxPrice: Number(searchParams.get("price") || 0),
    };

    const tours = mutableStore.tours
      .filter((tour) => {
        if (filters.destination && filters.destination !== "all") {
          const destination = `${tour.location} ${tour.destination}`.toLowerCase();
          if (!destination.includes(filters.destination)) {
            return false;
          }
        }

        if (filters.category && filters.category !== "all" && tour.category.toLowerCase() !== filters.category) {
          return false;
        }

        if (filters.duration && Number(tour.durationDays) > filters.duration) {
          return false;
        }

        if (filters.maxPrice && Number(tour.price) > filters.maxPrice) {
          return false;
        }

        if (filters.minRating && Number(tour.rating) < filters.minRating) {
          return false;
        }

        return true;
      })
      .map((tour) => publicTour(tour, mutableStore));

    sendJson(response, 200, { tours });
    return;
  }

  const tourDetailMatch = pathname.match(/^\/api\/tours\/([^/]+)$/);

  if (request.method === "GET" && tourDetailMatch) {
    const slug = decodeURIComponent(tourDetailMatch[1]);
    const tour = mutableStore.tours.find((item) => item.slug === slug);

    if (!tour) {
      sendJson(response, 404, { error: "Tour not found." });
      return;
    }

    sendJson(response, 200, { tour: publicTour(tour, mutableStore) });
    return;
  }

  if (request.method === "POST" && pathname === "/api/auth/signup") {
    const body = await parseJsonBody(request);
    const email = normalizeEmail(body.email);
    validateRequired(body.fullName, "Full name");
    validateRequired(email, "Email");
    validatePassword(body.password);

    if (mutableStore.users.some((user) => normalizeEmail(user.email) === email)) {
      sendJson(response, 409, { error: "An account with that email already exists." });
      return;
    }

    const user = {
      id: randomId("user"),
      role: "customer",
      fullName: String(body.fullName).trim(),
      email,
      phone: String(body.phone || "").trim(),
      nationality: String(body.nationality || "").trim(),
      preferredLanguage: String(body.preferredLanguage || "English").trim(),
      preferredCurrency: "USD",
      passwordHash: hashPassword(String(body.password)),
      createdAt: new Date().toISOString(),
    };

    mutableStore.users.push(user);
    claimGuestBookings(mutableStore, user);
    const token = createSession(mutableStore, user.id);
    writeStore(mutableStore);

    sendJson(
      response,
      201,
      { user: sanitizeUser(user), message: "Account created. Your dashboard is ready." },
      { "Set-Cookie": getSetCookieHeader(token) },
    );
    return;
  }

  if (request.method === "POST" && pathname === "/api/auth/login") {
    const body = await parseJsonBody(request);
    const email = normalizeEmail(body.email);
    const user = mutableStore.users.find((item) => normalizeEmail(item.email) === email);

    if (!user || !verifyPassword(String(body.password || ""), user.passwordHash)) {
      sendJson(response, 401, { error: "Incorrect email or password." });
      return;
    }

    claimGuestBookings(mutableStore, user);
    const token = createSession(mutableStore, user.id);
    writeStore(mutableStore);

    sendJson(
      response,
      200,
      { user: sanitizeUser(user), message: "Welcome back." },
      { "Set-Cookie": getSetCookieHeader(token) },
    );
    return;
  }

  if (request.method === "POST" && pathname === "/api/auth/logout") {
    if (auth.token) {
      destroySession(mutableStore, auth.token);
      writeStore(mutableStore);
    }

    sendJson(
      response,
      200,
      { success: true },
      { "Set-Cookie": getClearCookieHeader() },
    );
    return;
  }

  if (request.method === "GET" && pathname === "/api/me") {
    sendJson(response, 200, { user: sanitizeUser(auth.user) });
    return;
  }

  if (request.method === "PUT" && pathname === "/api/me") {
    if (!auth.user) {
      sendJson(response, 401, { error: "Please sign in to update your profile." });
      return;
    }

    const body = await parseJsonBody(request);
    const store = readStore();
    const user = store.users.find((item) => item.id === auth.user.id);
    user.fullName = String(body.fullName || user.fullName).trim();
    user.phone = String(body.phone || user.phone).trim();
    user.nationality = String(body.nationality || user.nationality).trim();
    user.preferredLanguage = String(body.preferredLanguage || user.preferredLanguage).trim();
    writeStore(store);

    sendJson(response, 200, { user: sanitizeUser(user), message: "Profile updated successfully." });
    return;
  }

  if (request.method === "POST" && pathname === "/api/bookings") {
    const body = await parseJsonBody(request);
    validateRequired(body.tourId, "Tour");
    validateRequired(body.date, "Departure date");
    validateRequired(body.fullName, "Full name");
    validateRequired(body.email, "Email");
    validateRequired(body.phone, "Phone");
    validateRequired(body.nationality, "Nationality");

    const guests = Number(body.guests || 0);

    if (!Number.isInteger(guests) || guests < 1 || guests > 12) {
      sendJson(response, 400, { error: "Guest count must be between 1 and 12." });
      return;
    }

    const tour = mutableStore.tours.find((item) => item.id === body.tourId);

    if (!tour) {
      sendJson(response, 404, { error: "Selected tour could not be found." });
      return;
    }

    if (!tour.availability.includes(body.date)) {
      sendJson(response, 400, { error: "That departure date is no longer available." });
      return;
    }

    const totals = calculateBookingTotals(tour, guests);
    const departureDate = new Date(`${body.date}T09:00:00Z`);
    const canModifyUntil = new Date(departureDate.getTime() - 1000 * 60 * 60 * 24 * 14).toISOString();
    const booking = {
      id: randomId("booking"),
      bookingCode: `AT-${new Date().getFullYear()}-${String(mutableStore.bookings.length + 1).padStart(4, "0")}`,
      accessCode: randomBytes(8).toString("hex"),
      customerId: auth.user ? auth.user.id : null,
      tourId: tour.id,
      date: body.date,
      guests,
      subtotal: totals.subtotal,
      totalAmount: totals.totalAmount,
      depositDue: totals.depositDue,
      paymentStatus: "pending",
      bookingStatus: "reserved",
      traveler: {
        fullName: String(body.fullName).trim(),
        email: normalizeEmail(body.email),
        phone: String(body.phone).trim(),
        nationality: String(body.nationality).trim(),
        specialRequests: String(body.specialRequests || "").trim(),
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      canModifyUntil,
      confirmationSentAt: new Date().toISOString(),
      confirmationMessage: `A tailored confirmation has been prepared for ${String(body.fullName).trim()}.`,
    };

    mutableStore.bookings.push(booking);
    mutableStore.notifications = mutableStore.notifications || [];
    mutableStore.notifications.push({
      id: randomId("note"),
      bookingId: booking.id,
      type: "booking_confirmation",
      message: `Confirmation prepared for ${booking.traveler.email}`,
      createdAt: new Date().toISOString(),
    });
    writeStore(mutableStore);

    sendJson(response, 201, {
      booking: hydrateBooking(booking, mutableStore),
      accessCode: booking.accessCode,
      message: `Booking ${booking.bookingCode} has been reserved and the confirmation was sent to ${booking.traveler.email}.`,
    });
    return;
  }

  const bookingMatch = pathname.match(/^\/api\/bookings\/([^/]+)$/);

  if (request.method === "GET" && bookingMatch) {
    const booking = mutableStore.bookings.find((item) => item.id === decodeURIComponent(bookingMatch[1]));
    const accessCode = searchParams.get("accessCode");

    if (!booking || !bookingAccessAllowed(auth.user, booking, accessCode)) {
      sendJson(response, 404, { error: "Booking not found or access expired." });
      return;
    }

    sendJson(response, 200, { booking: hydrateBooking(booking, mutableStore) });
    return;
  }

  if (request.method === "GET" && pathname === "/api/bookings") {
    if (!auth.user) {
      sendJson(response, 401, { error: "Please sign in to view your bookings." });
      return;
    }

    const claimed = claimGuestBookings(mutableStore, auth.user);

    if (claimed > 0) {
      writeStore(mutableStore);
    }

    const bookings =
      auth.user.role === "admin"
        ? mutableStore.bookings.map((booking) => hydrateBooking(booking, mutableStore))
        : mutableStore.bookings
            .filter((booking) => booking.customerId === auth.user.id)
            .map((booking) => hydrateBooking(booking, mutableStore));

    sendJson(response, 200, { bookings });
    return;
  }

  if (request.method === "PATCH" && bookingMatch) {
    if (!auth.user) {
      sendJson(response, 401, { error: "Please sign in to update a booking." });
      return;
    }

    const body = await parseJsonBody(request);
    const store = readStore();
    const booking = store.bookings.find((item) => item.id === decodeURIComponent(bookingMatch[1]));

    if (!booking) {
      sendJson(response, 404, { error: "Booking not found." });
      return;
    }

    if (auth.user.role !== "admin" && booking.customerId !== auth.user.id) {
      sendJson(response, 403, { error: "You do not have permission to update this booking." });
      return;
    }

    if (auth.user.role !== "admin" && !isBookingModifiable(booking)) {
      sendJson(response, 400, { error: "This booking can no longer be modified under the policy window." });
      return;
    }

    if (body.bookingStatus) {
      booking.bookingStatus = body.bookingStatus;
    }

    if (body.date) {
      const tour = store.tours.find((item) => item.id === booking.tourId);

      if (!tour.availability.includes(body.date)) {
        sendJson(response, 400, { error: "The new departure date is unavailable." });
        return;
      }

      booking.date = body.date;
    }

    if (body.guests) {
      const guests = Number(body.guests);

      if (!Number.isInteger(guests) || guests < 1 || guests > 12) {
        sendJson(response, 400, { error: "Guest count must be between 1 and 12." });
        return;
      }

      booking.guests = guests;
      const tour = store.tours.find((item) => item.id === booking.tourId);
      const totals = calculateBookingTotals(tour, guests);
      booking.subtotal = totals.subtotal;
      booking.totalAmount = totals.totalAmount;
      booking.depositDue = totals.depositDue;
    }

    booking.updatedAt = new Date().toISOString();

    if (booking.bookingStatus === "cancelled" && booking.paymentStatus === "paid") {
      booking.paymentStatus = "refunded";
    }

    writeStore(store);
    sendJson(response, 200, { booking: hydrateBooking(booking, store), message: "Booking updated." });
    return;
  }

  if (request.method === "POST" && pathname === "/api/payments") {
    const body = await parseJsonBody(request);
    validateRequired(body.bookingId, "Booking");
    validateRequired(body.billingName, "Billing name");
    validateRequired(body.billingEmail, "Billing email");

    const booking = mutableStore.bookings.find((item) => item.id === body.bookingId);

    if (!booking || !bookingAccessAllowed(auth.user, booking, body.accessCode)) {
      sendJson(response, 404, { error: "Booking not found or payment access expired." });
      return;
    }

    const tour = mutableStore.tours.find((item) => item.id === booking.tourId);
    const paymentOption = body.paymentOption === "full" ? "full" : "deposit";
    const alreadyPaid = paidAmountForBooking(mutableStore, booking.id);
    const baseAmount =
      paymentOption === "full"
        ? Math.max(Number(booking.totalAmount) - alreadyPaid, 0)
        : Math.max(Number(booking.depositDue) - alreadyPaid, 0);

    if (baseAmount <= 0) {
      sendJson(response, 400, { error: "This booking has already been paid." });
      return;
    }

    const discounted = applyPromoCode(mutableStore, body.promoCode, baseAmount, tour);
    const method = String(body.method || "card");
    let status = "paid";

    if (method === "bank_transfer") {
      status = "pending";
    } else if (method === "manual_review") {
      status = "failed";
    }

    const payment = {
      id: randomId("payment"),
      bookingId: booking.id,
      type: paymentOption,
      amount: discounted.finalAmount,
      originalAmount: roundCurrency(baseAmount),
      discountAmount: discounted.discountAmount,
      promoCode: discounted.promoCode,
      method,
      status,
      currency: "USD",
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(mutableStore.payments.length + 1).padStart(5, "0")}`,
      billingName: String(body.billingName).trim(),
      billingEmail: normalizeEmail(body.billingEmail),
      createdAt: new Date().toISOString(),
      paidAt: status === "paid" ? new Date().toISOString() : null,
    };

    mutableStore.payments.push(payment);
    booking.paymentStatus = computeBookingPaymentStatus(mutableStore, booking);
    booking.bookingStatus = status === "failed" ? "reserved" : "confirmed";
    booking.updatedAt = new Date().toISOString();
    writeStore(mutableStore);

    sendJson(response, 201, {
      payment: hydratePayment(payment, mutableStore),
      booking: hydrateBooking(booking, mutableStore),
      message:
        status === "paid"
          ? "Payment secured and receipt issued."
          : status === "pending"
            ? "Payment is pending bank confirmation."
            : "Payment failed and can be retried.",
    });
    return;
  }

  if (request.method === "GET" && pathname === "/api/payments") {
    if (!auth.user) {
      sendJson(response, 401, { error: "Please sign in to view your payments." });
      return;
    }

    const payments =
      auth.user.role === "admin"
        ? mutableStore.payments.map((payment) => hydratePayment(payment, mutableStore))
        : mutableStore.payments
            .filter((payment) => {
              const booking = mutableStore.bookings.find((item) => item.id === payment.bookingId);
              return booking && booking.customerId === auth.user.id;
            })
            .map((payment) => hydratePayment(payment, mutableStore));

    sendJson(response, 200, { payments });
    return;
  }

  const paymentMatch = pathname.match(/^\/api\/payments\/([^/]+)$/);

  if (request.method === "GET" && paymentMatch) {
    const payment = mutableStore.payments.find((item) => item.id === decodeURIComponent(paymentMatch[1]));

    if (!payment) {
      sendJson(response, 404, { error: "Payment record not found." });
      return;
    }

    const booking = mutableStore.bookings.find((item) => item.id === payment.bookingId);

    if (!booking || !bookingAccessAllowed(auth.user, booking, searchParams.get("accessCode"))) {
      sendJson(response, 403, { error: "You cannot view this receipt." });
      return;
    }

    sendJson(response, 200, { payment: hydratePayment(payment, mutableStore) });
    return;
  }

  if (request.method === "POST" && pathname === "/api/newsletter") {
    const body = await parseJsonBody(request);
    const email = normalizeEmail(body.email);
    validateRequired(email, "Email");

    if (!mutableStore.newsletterSubscriptions.some((item) => normalizeEmail(item.email) === email)) {
      mutableStore.newsletterSubscriptions.push({
        id: randomId("newsletter"),
        email,
        createdAt: new Date().toISOString(),
      });
      writeStore(mutableStore);
    }

    sendJson(response, 201, { message: "You are subscribed to seasonal travel updates." });
    return;
  }

  if (request.method === "POST" && pathname === "/api/contact") {
    const body = await parseJsonBody(request);
    validateRequired(body.name, "Name");
    validateRequired(body.email, "Email");
    validateRequired(body.message, "Message");

    mutableStore.contactMessages.push({
      id: randomId("contact"),
      name: String(body.name).trim(),
      email: normalizeEmail(body.email),
      topic: String(body.topic || "General enquiry").trim(),
      message: String(body.message).trim(),
      createdAt: new Date().toISOString(),
    });
    writeStore(mutableStore);

    sendJson(response, 201, { message: "Your message is with our guest care team now." });
    return;
  }

  if (pathname === "/api/admin/dashboard") {
    if (!auth.user || auth.user.role !== "admin") {
      sendJson(response, 403, { error: "Admin access required." });
      return;
    }

    sendJson(response, 200, buildAdminPayload(mutableStore));
    return;
  }

  if (pathname.startsWith("/api/admin/") && (!auth.user || auth.user.role !== "admin")) {
    sendJson(response, 403, { error: "Admin access required." });
    return;
  }

  const adminTourMatch = pathname.match(/^\/api\/admin\/tours\/([^/]+)$/);
  const adminBookingMatch = pathname.match(/^\/api\/admin\/bookings\/([^/]+)$/);
  const adminPaymentMatch = pathname.match(/^\/api\/admin\/payments\/([^/]+)$/);
  const adminReviewMatch = pathname.match(/^\/api\/admin\/reviews\/([^/]+)$/);
  const adminGuideMatch = pathname.match(/^\/api\/admin\/guides\/([^/]+)$/);

  if (request.method === "POST" && pathname === "/api/admin/tours") {
    const body = await parseJsonBody(request);
    validateRequired(body.title, "Title");
    validateRequired(body.location, "Location");

    const tour = {
      id: randomId("tour"),
      slug: String(body.slug || body.title).trim().toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: String(body.title).trim(),
      location: String(body.location).trim(),
      destination: String(body.destination || body.location).trim(),
      category: String(body.category || "Signature").trim(),
      durationDays: Number(body.durationDays || 5),
      durationLabel: `${Number(body.durationDays || 5)} days`,
      price: Number(body.price || 1200),
      rating: Number(body.rating || 4.7),
      reviewsCount: 0,
      difficulty: String(body.difficulty || "Easy").trim(),
      maxGroupSize: Number(body.maxGroupSize || 10),
      availability: Array.isArray(body.availability) ? body.availability : [],
      image: String(body.image || mutableStore.destinations[0].image),
      gallery: Array.isArray(body.gallery) ? body.gallery : [String(body.image || mutableStore.destinations[0].image)],
      overview: String(body.overview || "Custom-designed itinerary with premium guide support.").trim(),
      highlights: Array.isArray(body.highlights)
        ? body.highlights
        : ["Curated stays", "Local expert guidance", "Flexible pacing"],
      itinerary: Array.isArray(body.itinerary)
        ? body.itinerary
        : [
            {
              day: "Day 1",
              title: "Arrival and orientation",
              description: "Private welcome and destination briefing.",
            }
          ],
      included: Array.isArray(body.included) ? body.included : ["Guided experiences", "Selected transfers"],
      excluded: Array.isArray(body.excluded) ? body.excluded : ["International flights"],
      languages: Array.isArray(body.languages) ? body.languages : ["English"],
      guideIds: Array.isArray(body.guideIds) ? body.guideIds : [],
      meetingPoint: String(body.meetingPoint || body.location).trim(),
      mapEmbedUrl: String(body.mapEmbedUrl || mutableStore.contact.mapEmbedUrl).trim(),
      safety: String(body.safety || "Guest care briefings included.").trim(),
      featured: Boolean(body.featured),
      popular: Boolean(body.popular),
    };

    mutableStore.tours.push(tour);
    writeStore(mutableStore);
    sendJson(response, 201, { tour: publicTour(tour, mutableStore), message: "Tour created." });
    return;
  }

  if (request.method === "PATCH" && adminTourMatch) {
    const body = await parseJsonBody(request);
    const store = readStore();
    const tour = store.tours.find((item) => item.id === decodeURIComponent(adminTourMatch[1]));

    if (!tour) {
      sendJson(response, 404, { error: "Tour not found." });
      return;
    }

    if (body.price !== undefined) {
      tour.price = Number(body.price);
    }

    if (body.rating !== undefined) {
      tour.rating = Number(body.rating);
    }

    if (body.featured !== undefined) {
      tour.featured = Boolean(body.featured);
    }

    if (body.popular !== undefined) {
      tour.popular = Boolean(body.popular);
    }

    if (body.availability && Array.isArray(body.availability)) {
      tour.availability = body.availability;
    }

    writeStore(store);
    sendJson(response, 200, { tour: publicTour(tour, store), message: "Tour updated." });
    return;
  }

  if (request.method === "PATCH" && adminBookingMatch) {
    const body = await parseJsonBody(request);
    const store = readStore();
    const booking = store.bookings.find((item) => item.id === decodeURIComponent(adminBookingMatch[1]));

    if (!booking) {
      sendJson(response, 404, { error: "Booking not found." });
      return;
    }

    if (body.bookingStatus) {
      booking.bookingStatus = body.bookingStatus;
    }

    if (body.paymentStatus) {
      booking.paymentStatus = body.paymentStatus;
    }

    booking.updatedAt = new Date().toISOString();
    writeStore(store);
    sendJson(response, 200, { booking: hydrateBooking(booking, store), message: "Booking updated." });
    return;
  }

  if (request.method === "PATCH" && adminPaymentMatch) {
    const body = await parseJsonBody(request);
    const store = readStore();
    const payment = store.payments.find((item) => item.id === decodeURIComponent(adminPaymentMatch[1]));

    if (!payment) {
      sendJson(response, 404, { error: "Payment not found." });
      return;
    }

    if (body.status) {
      payment.status = body.status;
    }

    if (payment.status === "paid" && !payment.paidAt) {
      payment.paidAt = new Date().toISOString();
    }

    const booking = store.bookings.find((item) => item.id === payment.bookingId);

    if (booking) {
      booking.paymentStatus = computeBookingPaymentStatus(store, booking);
      booking.updatedAt = new Date().toISOString();
    }

    writeStore(store);
    sendJson(response, 200, { payment: hydratePayment(payment, store), message: "Payment updated." });
    return;
  }

  if (request.method === "PATCH" && adminReviewMatch) {
    const body = await parseJsonBody(request);
    const store = readStore();
    const review = store.reviews.find((item) => item.id === decodeURIComponent(adminReviewMatch[1]));

    if (!review) {
      sendJson(response, 404, { error: "Review not found." });
      return;
    }

    if (body.approved !== undefined) {
      review.approved = Boolean(body.approved);
    }

    if (body.featured !== undefined) {
      review.featured = Boolean(body.featured);
    }

    writeStore(store);
    sendJson(response, 200, { review: publicReview(review, store), message: "Review updated." });
    return;
  }

  if (request.method === "POST" && pathname === "/api/admin/guides") {
    const body = await parseJsonBody(request);
    validateRequired(body.name, "Name");

    const guide = {
      id: randomId("guide"),
      name: String(body.name).trim(),
      role: String(body.role || "Tour Guide").trim(),
      photo: String(body.photo || mutableStore.guides[0].photo).trim(),
      bio: String(body.bio || "Experienced local guide.").trim(),
      languages: Array.isArray(body.languages) ? body.languages : ["English"],
      specialties: Array.isArray(body.specialties) ? body.specialties : ["Custom itineraries"],
      rating: Number(body.rating || 4.8),
      experienceYears: Number(body.experienceYears || 6),
      certifications: Array.isArray(body.certifications) ? body.certifications : ["First-aid certified"],
    };

    mutableStore.guides.push(guide);
    writeStore(mutableStore);
    sendJson(response, 201, { guide: publicGuide(guide), message: "Guide created." });
    return;
  }

  if (request.method === "PATCH" && adminGuideMatch) {
    const body = await parseJsonBody(request);
    const store = readStore();
    const guide = store.guides.find((item) => item.id === decodeURIComponent(adminGuideMatch[1]));

    if (!guide) {
      sendJson(response, 404, { error: "Guide not found." });
      return;
    }

    if (body.rating !== undefined) {
      guide.rating = Number(body.rating);
    }

    if (body.role) {
      guide.role = String(body.role).trim();
    }

    writeStore(store);
    sendJson(response, 200, { guide: publicGuide(guide), message: "Guide updated." });
    return;
  }

  sendJson(response, 404, { error: "API route not found." });
}

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);

    if (url.pathname.startsWith("/api/")) {
      await handleApi(request, response, url.pathname, url.searchParams);
      return;
    }

    const requestedPath = url.pathname === "/" ? "/index.html" : url.pathname;
    const normalizedPath = path.normalize(requestedPath).replace(/^(\.\.[/\\])+/, "");
    const filePath = path.join(publicDir, normalizedPath);

    if (!filePath.startsWith(publicDir)) {
      sendText(response, 403, "Forbidden");
      return;
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      serveStaticFile(filePath, response);
      return;
    }

    if (path.extname(filePath)) {
      sendText(response, 404, "Not found");
      return;
    }

    serveStaticFile(path.join(publicDir, "index.html"), response);
  } catch (error) {
    console.error(error);
    sendJson(response, 500, { error: error.message || "Unexpected server error." });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Atlas Path Travel running at http://${HOST}:${PORT}`);
});
