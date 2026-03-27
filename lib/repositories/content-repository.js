import { randomUUID } from "crypto";
import { AUTH_SESSION_DAYS, normalizeEmail } from "@/lib/auth/config";
import { readLocalStore, updateLocalStore } from "@/lib/storage/local-store";
import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase/clients";

function buildMockPaymentSession(booking) {
  return {
    id: randomUUID(),
    bookingId: booking.id,
    method: "qpay",
    provider: "qpay-ready-mock",
    status: booking.paymentStatus || "pending",
    providerStatus: booking.paymentStatus || "pending",
    amount: 0,
    currency: "USD",
    reference: `QPAY-${booking.id.slice(0, 8).toUpperCase()}`,
    externalId: `QPAY-MOCK-${booking.id.slice(0, 8).toUpperCase()}`,
    qrText: `QPAY-DEMO|${booking.id}|${booking.date}|${booking.people}`,
    deepLink: `qpay://pay?invoice=${booking.id}`,
    applePayEligible: false,
    cardSummary: null,
    callbackToken: randomUUID(),
    rawResponse: null,
    failureReason: null,
    instructions: {
      en: "QPay dynamic QR and callback handling can be connected here later.",
      mn: "Энд дараа нь QPay-ийн динамик QR болон callback боловсруулалтыг холбоно."
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastCallbackAt: null,
    statusHistory: []
  };
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function sessionIsExpired(session) {
  return !session?.expiresAt || new Date(session.expiresAt).getTime() <= Date.now();
}

function buildSession(userId, provider = "credentials") {
  return {
    id: randomUUID(),
    token: randomUUID(),
    userId,
    provider,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + AUTH_SESSION_DAYS * 24 * 60 * 60 * 1000).toISOString()
  };
}

function deriveBookingStatusFromPaymentStatus(paymentStatus, currentStatus = "pending") {
  switch (paymentStatus) {
    case "paid":
      return "paid";
    case "cancelled":
    case "refunded":
      return "cancelled";
    case "failed":
      return currentStatus === "paid" ? "paid" : "pending";
    case "pending":
      return currentStatus === "cancelled" ? "cancelled" : "pending";
    default:
      return currentStatus || "pending";
  }
}

function appendStatusHistory(statusHistory = [], entry) {
  return [...statusHistory, entry];
}

function resolvePaymentSessionIndex(paymentSessions, identifier = {}) {
  const paymentId = identifier.paymentId || identifier.id || null;
  const bookingId = identifier.bookingId || null;
  const reference = identifier.reference || null;
  const externalId = identifier.externalId || null;

  return paymentSessions.findIndex((session) => {
    if (paymentId && session.id === paymentId) {
      return true;
    }

    if (bookingId && session.bookingId === bookingId) {
      return true;
    }

    if (reference && session.reference === reference) {
      return true;
    }

    if (externalId && session.externalId === externalId) {
      return true;
    }

    return false;
  });
}

async function getSupabaseStoreSnapshot() {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return null;
  }

  const [siteResult, guidesResult, toursResult, bookingsResult, paymentsResult] = await Promise.all([
    supabase.from("site_content").select("*").single(),
    supabase.from("guides").select("*").order("name"),
    supabase.from("tours").select("*").order("slug"),
    supabase.from("bookings").select("*").order("created_at", { ascending: false }),
    supabase.from("payment_sessions").select("*").order("created_at", { ascending: false })
  ]);

  return {
    site: siteResult.data?.payload || {},
    guides: guidesResult.data || [],
    tours: toursResult.data || [],
    bookings:
      (bookingsResult.data || []).map((item) => ({
        id: item.id,
        tourId: item.tour_id,
        tourTitle: item.tour_title,
        date: item.date,
        people: item.people,
        name: item.name,
        email: item.email,
        phone: item.phone,
        nationality: item.nationality,
        specialRequest: item.special_request,
        status: item.status,
        paymentStatus: item.payment_status,
        paymentSessionId: item.payment_session_id,
        createdAt: item.created_at
      })) || [],
    paymentSessions:
      (paymentsResult.data || []).map((item) => ({
        id: item.id,
        bookingId: item.booking_id,
        method: item.method,
        provider: item.provider,
        status: item.status,
        providerStatus: item.provider_status,
        amount: item.amount,
        currency: item.currency,
        reference: item.reference,
        externalId: item.external_id,
        qrText: item.qr_text,
        deepLink: item.deep_link,
        applePayEligible: item.apple_pay_eligible,
        cardSummary: item.card_summary,
        callbackToken: item.callback_token,
        rawResponse: item.raw_response,
        failureReason: item.failure_reason,
        instructions: item.instructions,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        lastCallbackAt: item.last_callback_at,
        statusHistory: item.status_history || []
      })) || [],
    emailOutbox: []
  };
}

async function saveSiteToSupabase(site) {
  const supabase = createSupabaseAdminClient();
  await supabase.from("site_content").upsert({ id: 1, payload: site });
}

async function saveGuidesToSupabase(guides) {
  const supabase = createSupabaseAdminClient();
  await supabase.from("guides").delete().neq("id", "");
  if (guides.length) {
    await supabase.from("guides").insert(guides);
  }
}

async function saveToursToSupabase(tours) {
  const supabase = createSupabaseAdminClient();
  await supabase.from("tours").delete().neq("id", "");
  if (tours.length) {
    await supabase.from("tours").insert(tours);
  }
}

function buildRepositoryFromStore(store) {
  return {
    async getPublicSnapshot() {
      return clone({
        site: store.site,
        guides: store.guides,
        tours: store.tours,
        bookings: store.bookings,
        paymentSessions: store.paymentSessions
      });
    },
    async getAdminSnapshot() {
      return clone(store);
    },
    async getTourBySlug(slug) {
      return clone(store.tours.find((tour) => tour.slug === slug) || null);
    },
    async getBookingById(bookingId) {
      return clone(store.bookings.find((booking) => booking.id === bookingId) || null);
    },
    async getPaymentSessionByBookingId(bookingId) {
      return clone(store.paymentSessions.find((session) => session.bookingId === bookingId) || null);
    },
    async getPaymentSessionById(paymentId) {
      return clone(store.paymentSessions.find((session) => session.id === paymentId) || null);
    },
    async getUserById(userId) {
      const localStore = await readLocalStore();
      return clone(localStore.users?.find((user) => user.id === userId) || null);
    },
    async getUserByEmail(email) {
      const localStore = await readLocalStore();
      const normalizedEmail = normalizeEmail(email);
      return clone(localStore.users?.find((user) => normalizeEmail(user.email) === normalizedEmail) || null);
    },
    async getUserBySessionToken(token) {
      const localStore = await readLocalStore();
      const session = localStore.authSessions?.find((item) => item.token === token) || null;

      if (!session) {
        return null;
      }

      if (sessionIsExpired(session)) {
        await updateLocalStore((writableStore) => {
          writableStore.authSessions = (writableStore.authSessions || []).filter((item) => item.token !== token);
          return true;
        });
        return null;
      }

      const user = localStore.users?.find((item) => item.id === session.userId) || null;

      if (!user) {
        return null;
      }

      return clone({ user, session });
    },
    async getBookingsForUser({ userId, email }) {
      const localStore = await readLocalStore();
      const normalizedEmail = normalizeEmail(email);
      const bookings = (localStore.bookings || []).filter((booking) => {
        if (userId && booking.userId === userId) {
          return true;
        }

        return normalizeEmail(booking.email) === normalizedEmail;
      });

      return clone(bookings);
    }
  };
}

async function getActiveStore() {
  if (isSupabaseConfigured()) {
    const snapshot = await getSupabaseStoreSnapshot();
    if (snapshot) {
      return snapshot;
    }
  }

  return readLocalStore();
}

export async function getRepository() {
  const store = await getActiveStore();

  return {
    ...(buildRepositoryFromStore(store)),
    async createUser(payload) {
      return updateLocalStore((localStore) => {
        localStore.users = localStore.users || [];
        const normalizedEmail = normalizeEmail(payload.email);
        const existingUser = localStore.users.find((user) => normalizeEmail(user.email) === normalizedEmail);

        if (existingUser) {
          throw new Error("An account with this email already exists.");
        }

        const user = {
          id: randomUUID(),
          fullName: payload.fullName,
          email: normalizedEmail,
          phone: payload.phone || "",
          nationality: payload.nationality || "",
          role: payload.role || "user",
          authProvider: payload.authProvider || "credentials",
          passwordSalt: payload.passwordSalt,
          passwordHash: payload.passwordHash,
          createdAt: new Date().toISOString()
        };

        localStore.users.unshift(user);
        return clone(user);
      });
    },
    async createSession(userId, provider = "credentials") {
      return updateLocalStore((localStore) => {
        localStore.authSessions = (localStore.authSessions || []).filter((session) => !sessionIsExpired(session));

        const session = buildSession(userId, provider);
        localStore.authSessions.unshift(session);
        return clone(session);
      });
    },
    async deleteSession(token) {
      return updateLocalStore((localStore) => {
        localStore.authSessions = (localStore.authSessions || []).filter((session) => session.token !== token);
        return true;
      });
    },
    async createBooking(input, options = {}) {
      const storeResult = await updateLocalStore((localStore) => {
        const tour = localStore.tours.find((item) => item.id === input.tourId);
        const booking = {
          id: randomUUID(),
          userId: options.userId || input.userId || null,
          tourId: tour.id,
          tourTitle: tour.title,
          date: input.date,
          people: Number(input.people),
          name: input.name,
          email: input.email,
          phone: input.phone,
          nationality: input.nationality,
          specialRequest: input.specialRequest,
          status: "pending",
          paymentStatus: "pending",
          paymentSessionId: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        localStore.bookings.unshift(booking);
        return clone(booking);
      });

      return storeResult;
    },
    async createPaymentSession(bookingId, payload) {
      return updateLocalStore((localStore) => {
        const booking = localStore.bookings.find((item) => item.id === bookingId);

        if (!booking) {
          throw new Error("Booking not found.");
        }

        const now = new Date().toISOString();
        const session = {
          id: payload.id || randomUUID(),
          bookingId: booking.id,
          method: payload.method || "qpay",
          provider: payload.provider,
          status: payload.status || "pending",
          providerStatus: payload.providerStatus || payload.status || "pending",
          amount: Number(payload.amount || 0),
          currency: payload.currency || "USD",
          reference: payload.reference || `PAY-${booking.id.slice(0, 8).toUpperCase()}`,
          externalId: payload.externalId || payload.reference || `PAY-${booking.id.slice(0, 8).toUpperCase()}`,
          qrText: payload.qrText || null,
          deepLink: payload.deepLink || null,
          applePayEligible: Boolean(payload.applePayEligible),
          cardSummary: payload.cardSummary || null,
          callbackToken: payload.callbackToken || null,
          rawResponse: payload.rawResponse || null,
          failureReason: payload.failureReason || null,
          instructions: payload.instructions || null,
          createdAt: now,
          updatedAt: now,
          lastCallbackAt: payload.lastCallbackAt || null,
          statusHistory: appendStatusHistory([], {
            status: payload.status || "pending",
            source: payload.statusSource || "create",
            at: now
          })
        };

        localStore.paymentSessions.unshift(session);

        booking.paymentSessionId = session.id;
        booking.paymentStatus = session.status;
        booking.updatedAt = now;

        booking.status = deriveBookingStatusFromPaymentStatus(session.status, booking.status);

        return clone({
          booking,
          paymentSession: session
        });
      });
    },
    async preparePaymentForBooking(bookingId) {
      const booking = await this.getBookingById(bookingId);

      if (!booking) {
        throw new Error("Booking not found.");
      }

      return this.createPaymentSession(bookingId, buildMockPaymentSession(booking));
    },
    async updateBookingStatus(bookingId, payload) {
      return updateLocalStore((localStore) => {
        const booking = localStore.bookings.find((item) => item.id === bookingId);

        if (!booking) {
          throw new Error("Booking not found.");
        }

        booking.status = payload.status ?? booking.status;
        booking.paymentStatus = payload.paymentStatus ?? booking.paymentStatus;
        booking.updatedAt = new Date().toISOString();

        const paymentSession = localStore.paymentSessions.find((item) => item.bookingId === bookingId);
        if (paymentSession && payload.paymentStatus) {
          paymentSession.status = payload.paymentStatus;
          paymentSession.providerStatus = payload.providerStatus ?? payload.paymentStatus;
          paymentSession.rawResponse = payload.rawResponse ?? paymentSession.rawResponse;
          paymentSession.failureReason = payload.failureReason ?? paymentSession.failureReason;
          paymentSession.updatedAt = new Date().toISOString();
          paymentSession.lastCallbackAt = payload.lastCallbackAt ?? paymentSession.lastCallbackAt;
          paymentSession.statusHistory = appendStatusHistory(paymentSession.statusHistory, {
            status: payload.paymentStatus,
            source: payload.statusSource || "admin",
            at: paymentSession.updatedAt
          });
        }

        return clone(booking);
      });
    },
    async updatePaymentSessionStatus(identifier, payload) {
      return updateLocalStore((localStore) => {
        const sessionIndex = resolvePaymentSessionIndex(localStore.paymentSessions, identifier);

        if (sessionIndex === -1) {
          throw new Error("Payment session not found.");
        }

        const paymentSession = localStore.paymentSessions[sessionIndex];
        const booking = localStore.bookings.find((item) => item.id === paymentSession.bookingId);
        const nextStatus = payload.status ?? paymentSession.status;
        const now = new Date().toISOString();

        paymentSession.status = nextStatus;
        paymentSession.providerStatus = payload.providerStatus ?? nextStatus;
        paymentSession.rawResponse = payload.rawResponse ?? paymentSession.rawResponse;
        paymentSession.externalId = payload.externalId ?? paymentSession.externalId;
        paymentSession.failureReason = payload.failureReason ?? paymentSession.failureReason ?? null;
        paymentSession.updatedAt = now;
        paymentSession.lastCallbackAt = payload.lastCallbackAt ?? paymentSession.lastCallbackAt ?? now;
        paymentSession.statusHistory = appendStatusHistory(paymentSession.statusHistory, {
          status: nextStatus,
          source: payload.statusSource || "update",
          at: now
        });

        if (booking) {
          booking.paymentStatus = nextStatus;
          booking.status = payload.bookingStatus ?? deriveBookingStatusFromPaymentStatus(nextStatus, booking.status);
          booking.paymentSessionId = paymentSession.id;
          booking.updatedAt = now;
        }

        return clone({
          booking: booking || null,
          paymentSession,
          previousStatus: payload.previousStatus ?? null
        });
      });
    },
    async upsertTour(payload) {
      return updateLocalStore((localStore) => {
        const nextTour = {
          id: payload.id || randomUUID(),
          slug: payload.slug,
          title: payload.title,
          intro: payload.intro,
          destination: payload.destination,
          durationDays: Number(payload.durationDays),
          durationLabel: payload.durationLabel,
          price: Number(payload.price),
          dates: payload.dates,
          guideNames: payload.guideNames,
          highlights: payload.highlights,
          itinerary: payload.itinerary,
          included: payload.included,
          excluded: payload.excluded,
          gallery: payload.gallery
        };

        const index = localStore.tours.findIndex((tour) => tour.id === nextTour.id);

        if (index === -1) {
          localStore.tours.push(nextTour);
        } else {
          localStore.tours[index] = nextTour;
        }

        return clone(nextTour);
      });
    },
    async deleteTour(tourId) {
      return updateLocalStore((localStore) => {
        localStore.tours = localStore.tours.filter((tour) => tour.id !== tourId);
        return true;
      });
    },
    async updateSiteContent(payload) {
      return updateLocalStore((localStore) => {
        localStore.site = payload;
        return clone(localStore.site);
      });
    },
    async recordEmailNotification(payload) {
      return updateLocalStore((localStore) => {
        const item = {
          id: randomUUID(),
          ...payload,
          createdAt: new Date().toISOString()
        };

        localStore.emailOutbox.unshift(item);
        return clone(item);
      });
    }
  };
}

export async function syncSupabaseContentIfEnabled(snapshot) {
  if (!isSupabaseConfigured()) {
    return;
  }

  await saveSiteToSupabase(snapshot.site);
  await saveGuidesToSupabase(snapshot.guides);
  await saveToursToSupabase(snapshot.tours);
}
