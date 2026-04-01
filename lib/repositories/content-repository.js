import { randomUUID } from "crypto";
import { AUTH_SESSION_DAYS, normalizeEmail } from "@/lib/auth/config";
import { createHttpError } from "@/lib/errors";
import { logWarn } from "@/lib/logging";
import { readLocalStore, updateLocalStore } from "@/lib/storage/local-store";
import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase/clients";
import { applyContentTranslations, applyTourTranslations } from "@/lib/translations/content-locales";

const PROCESS_STARTED_AT = Date.now();

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

function mapSupabaseBooking(item) {
  if (!item) {
    return null;
  }

  return {
    id: item.id,
    userId: item.user_id || null,
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
    createdAt: item.created_at,
    updatedAt: item.updated_at || item.created_at
  };
}

function mapSupabasePaymentSession(item) {
  if (!item) {
    return null;
  }

  return {
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
  };
}

function isRuntimeOverlayRecord(item) {
  const timestamp = Date.parse(item?.updatedAt || item?.createdAt || "");
  return Number.isFinite(timestamp) && timestamp >= PROCESS_STARTED_AT - 1000;
}

function mergeOverlayCollection(primaryItems = [], overlayItems = [], getKey = (item) => item.id) {
  const merged = [];
  const seen = new Set();

  for (const item of overlayItems.filter(isRuntimeOverlayRecord)) {
    const key = getKey(item);

    if (key == null || seen.has(key)) {
      continue;
    }

    seen.add(key);
    merged.push(item);
  }

  for (const item of primaryItems) {
    const key = getKey(item);

    if (key == null || seen.has(key)) {
      continue;
    }

    seen.add(key);
    merged.push(item);
  }

  return merged;
}

function mergeStoreSnapshot(primaryStore, overlayStore) {
  if (!overlayStore) {
    return primaryStore;
  }

  return {
    ...overlayStore,
    ...primaryStore,
    site: mergeSiteContent(primaryStore.site, overlayStore.site),
    guides: primaryStore.guides?.length ? primaryStore.guides : (overlayStore.guides || []),
    tours: primaryStore.tours?.length ? primaryStore.tours : (overlayStore.tours || []),
    emailLeads: primaryStore.emailLeads?.length ? primaryStore.emailLeads : (overlayStore.emailLeads || []),
    emailOutbox: primaryStore.emailOutbox?.length ? primaryStore.emailOutbox : (overlayStore.emailOutbox || []),
    bookings: mergeOverlayCollection(primaryStore.bookings, overlayStore.bookings, (item) => item.id),
    paymentSessions: mergeOverlayCollection(primaryStore.paymentSessions, overlayStore.paymentSessions, (item) => item.id)
  };
}

function mergeSiteContent(primarySite = {}, fallbackSite = {}) {
  return {
    ...fallbackSite,
    ...primarySite,
    contact: {
      ...(fallbackSite.contact || {}),
      ...(primarySite.contact || {}),
      socialLinks: {
        ...((fallbackSite.contact || {}).socialLinks || {}),
        ...((primarySite.contact || {}).socialLinks || {})
      }
    },
    home: {
      ...(fallbackSite.home || {}),
      ...(primarySite.home || {})
    },
    about: {
      ...(fallbackSite.about || {}),
      ...(primarySite.about || {})
    },
    contactPage: {
      ...(fallbackSite.contactPage || {}),
      ...(primarySite.contactPage || {})
    },
    faqIntro: primarySite.faqIntro || fallbackSite.faqIntro || null,
    faqs: primarySite.faqs?.length ? primarySite.faqs : (fallbackSite.faqs || [])
  };
}

function upsertStoreItem(items = [], nextItem, getKey = (item) => item.id) {
  const nextKey = getKey(nextItem);
  return [nextItem, ...items.filter((item) => getKey(item) !== nextKey)];
}

function buildBookingRecord(input, tour, options = {}) {
  const now = new Date().toISOString();

  return {
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
    createdAt: now,
    updatedAt: now
  };
}

function buildPaymentSessionRecord(booking, payload) {
  const now = new Date().toISOString();

  return {
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
    bookings: (bookingsResult.data || []).map(mapSupabaseBooking).filter(Boolean),
    paymentSessions: (paymentsResult.data || []).map(mapSupabasePaymentSession).filter(Boolean),
    emailLeads: [],
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
      return clone(
        applyContentTranslations({
          site: store.site,
          guides: store.guides,
          tours: store.tours,
          bookings: store.bookings,
          paymentSessions: store.paymentSessions
        })
      );
    },
    async getAdminSnapshot() {
      return clone(applyContentTranslations(store));
    },
    async getTourBySlug(slug) {
      return clone(applyTourTranslations(store.tours.find((tour) => tour.slug === slug) || null));
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
      const normalizedEmail = normalizeEmail(email);
      const bookings = (store.bookings || []).filter((booking) => {
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
    try {
      const snapshot = await getSupabaseStoreSnapshot();

      if (snapshot) {
        try {
          const localStore = await readLocalStore();
          return mergeStoreSnapshot(snapshot, localStore);
        } catch {
          return snapshot;
        }
      }
    } catch (error) {
      logWarn("supabase_snapshot_read_failed", {
        reason: error.message || "Unable to read Supabase snapshot."
      });
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
          throw createHttpError(400, "An account with this email already exists.");
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
      const tour = store.tours.find((item) => item.id === input.tourId);

      if (!tour) {
        throw createHttpError(400, "Tour not found.");
      }

      const booking = buildBookingRecord(input, tour, options);

      if (isSupabaseConfigured()) {
        try {
          const supabase = createSupabaseAdminClient();
          const { data, error } = await supabase
            .from("bookings")
            .insert({
              id: booking.id,
              user_id: booking.userId,
              tour_id: booking.tourId,
              tour_title: booking.tourTitle,
              date: booking.date,
              people: booking.people,
              name: booking.name,
              email: booking.email,
              phone: booking.phone,
              nationality: booking.nationality,
              special_request: booking.specialRequest,
              status: booking.status,
              payment_status: booking.paymentStatus,
              payment_session_id: booking.paymentSessionId,
              created_at: booking.createdAt,
              updated_at: booking.updatedAt
            })
            .select("*")
            .single();

          if (error) {
            throw error;
          }

          const savedBooking = mapSupabaseBooking(data) || booking;
          store.bookings = upsertStoreItem(store.bookings, savedBooking, (item) => item.id);
          return clone(savedBooking);
        } catch (error) {
          logWarn("supabase_booking_create_failed", {
            reason: error.message || "Unable to create booking in Supabase.",
            bookingId: booking.id
          });
        }
      }

      const localBooking = await updateLocalStore((localStore) => {
        localStore.bookings.unshift(booking);
        return clone(booking);
      });

      store.bookings = upsertStoreItem(store.bookings, localBooking, (item) => item.id);
      return localBooking;
    },
    async createPaymentSession(bookingId, payload) {
      const booking = store.bookings.find((item) => item.id === bookingId);

      if (!booking) {
        throw createHttpError(404, "Booking not found.");
      }

      const session = buildPaymentSessionRecord(booking, payload);
      const nextBooking = {
        ...booking,
        paymentSessionId: session.id,
        paymentStatus: session.status,
        updatedAt: session.updatedAt,
        status: deriveBookingStatusFromPaymentStatus(session.status, booking.status)
      };

      if (isSupabaseConfigured()) {
        try {
          const supabase = createSupabaseAdminClient();
          const [{ data: paymentData, error: paymentError }, { error: bookingError }] = await Promise.all([
            supabase
              .from("payment_sessions")
              .insert({
                id: session.id,
                booking_id: session.bookingId,
                method: session.method,
                provider: session.provider,
                status: session.status,
                provider_status: session.providerStatus,
                amount: session.amount,
                currency: session.currency,
                reference: session.reference,
                external_id: session.externalId,
                qr_text: session.qrText,
                deep_link: session.deepLink,
                apple_pay_eligible: session.applePayEligible,
                card_summary: session.cardSummary,
                callback_token: session.callbackToken,
                raw_response: session.rawResponse,
                failure_reason: session.failureReason,
                instructions: session.instructions,
                created_at: session.createdAt,
                updated_at: session.updatedAt,
                last_callback_at: session.lastCallbackAt,
                status_history: session.statusHistory
              })
              .select("*")
              .single(),
            supabase
              .from("bookings")
              .update({
                payment_status: nextBooking.paymentStatus,
                payment_session_id: nextBooking.paymentSessionId,
                status: nextBooking.status,
                updated_at: nextBooking.updatedAt
              })
              .eq("id", bookingId)
          ]);

          if (paymentError) {
            throw paymentError;
          }

          if (bookingError) {
            throw bookingError;
          }

          const savedPaymentSession = mapSupabasePaymentSession(paymentData) || session;
          store.paymentSessions = upsertStoreItem(store.paymentSessions, savedPaymentSession, (item) => item.id);
          store.bookings = upsertStoreItem(store.bookings, nextBooking, (item) => item.id);

          return clone({
            booking: nextBooking,
            paymentSession: savedPaymentSession
          });
        } catch (error) {
          logWarn("supabase_payment_session_create_failed", {
            reason: error.message || "Unable to create payment session in Supabase.",
            bookingId
          });
        }
      }

      const fallbackResult = await updateLocalStore((localStore) => {
        const writableBooking = localStore.bookings.find((item) => item.id === bookingId);

        if (!writableBooking) {
          throw createHttpError(404, "Booking not found.");
        }

        localStore.paymentSessions.unshift(session);
        writableBooking.paymentSessionId = session.id;
        writableBooking.paymentStatus = session.status;
        writableBooking.updatedAt = session.updatedAt;
        writableBooking.status = nextBooking.status;

        return clone({
          booking: writableBooking,
          paymentSession: session
        });
      });

      store.paymentSessions = upsertStoreItem(store.paymentSessions, fallbackResult.paymentSession, (item) => item.id);
      store.bookings = upsertStoreItem(store.bookings, fallbackResult.booking, (item) => item.id);
      return fallbackResult;
    },
    async preparePaymentForBooking(bookingId) {
      const booking = await this.getBookingById(bookingId);

      if (!booking) {
        throw createHttpError(404, "Booking not found.");
      }

      return this.createPaymentSession(bookingId, buildMockPaymentSession(booking));
    },
    async updateBookingStatus(bookingId, payload) {
      const booking = store.bookings.find((item) => item.id === bookingId);

      if (!booking) {
        throw createHttpError(404, "Booking not found.");
      }

      const updatedAt = new Date().toISOString();
      const nextBooking = {
        ...booking,
        status: payload.status ?? booking.status,
        paymentStatus: payload.paymentStatus ?? booking.paymentStatus,
        updatedAt
      };
      const existingPaymentSession = store.paymentSessions.find((item) => item.bookingId === bookingId) || null;
      const nextPaymentSession =
        existingPaymentSession && payload.paymentStatus
          ? {
              ...existingPaymentSession,
              status: payload.paymentStatus,
              providerStatus: payload.providerStatus ?? payload.paymentStatus,
              rawResponse: payload.rawResponse ?? existingPaymentSession.rawResponse,
              failureReason: payload.failureReason ?? existingPaymentSession.failureReason,
              updatedAt,
              lastCallbackAt: payload.lastCallbackAt ?? existingPaymentSession.lastCallbackAt,
              statusHistory: appendStatusHistory(existingPaymentSession.statusHistory, {
                status: payload.paymentStatus,
                source: payload.statusSource || "admin",
                at: updatedAt
              })
            }
          : null;

      if (isSupabaseConfigured()) {
        try {
          const supabase = createSupabaseAdminClient();
          const operations = [
            supabase
              .from("bookings")
              .update({
                status: nextBooking.status,
                payment_status: nextBooking.paymentStatus,
                updated_at: nextBooking.updatedAt
              })
              .eq("id", bookingId)
          ];

          if (nextPaymentSession) {
            operations.push(
              supabase
                .from("payment_sessions")
                .update({
                  status: nextPaymentSession.status,
                  provider_status: nextPaymentSession.providerStatus,
                  raw_response: nextPaymentSession.rawResponse,
                  failure_reason: nextPaymentSession.failureReason,
                  updated_at: nextPaymentSession.updatedAt,
                  last_callback_at: nextPaymentSession.lastCallbackAt,
                  status_history: nextPaymentSession.statusHistory
                })
                .eq("id", nextPaymentSession.id)
            );
          }

          const results = await Promise.all(operations);

          for (const result of results) {
            if (result.error) {
              throw result.error;
            }
          }

          store.bookings = upsertStoreItem(store.bookings, nextBooking, (item) => item.id);

          if (nextPaymentSession) {
            store.paymentSessions = upsertStoreItem(store.paymentSessions, nextPaymentSession, (item) => item.id);
          }

          return clone(nextBooking);
        } catch (error) {
          logWarn("supabase_booking_status_update_failed", {
            reason: error.message || "Unable to update booking status in Supabase.",
            bookingId
          });
        }
      }

      const nextResult = await updateLocalStore((localStore) => {
        const localBooking = localStore.bookings.find((item) => item.id === bookingId);

        if (!localBooking) {
          throw createHttpError(404, "Booking not found.");
        }

        localBooking.status = payload.status ?? localBooking.status;
        localBooking.paymentStatus = payload.paymentStatus ?? localBooking.paymentStatus;
        localBooking.updatedAt = updatedAt;

        const paymentSession = localStore.paymentSessions.find((item) => item.bookingId === bookingId);
        if (paymentSession && payload.paymentStatus) {
          paymentSession.status = payload.paymentStatus;
          paymentSession.providerStatus = payload.providerStatus ?? payload.paymentStatus;
          paymentSession.rawResponse = payload.rawResponse ?? paymentSession.rawResponse;
          paymentSession.failureReason = payload.failureReason ?? paymentSession.failureReason;
          paymentSession.updatedAt = updatedAt;
          paymentSession.lastCallbackAt = payload.lastCallbackAt ?? paymentSession.lastCallbackAt;
          paymentSession.statusHistory = appendStatusHistory(paymentSession.statusHistory, {
            status: payload.paymentStatus,
            source: payload.statusSource || "admin",
            at: paymentSession.updatedAt
          });
        }

        return clone(localBooking);
      });

      store.bookings = upsertStoreItem(store.bookings, nextResult, (item) => item.id);
      return nextResult;
    },
    async updatePaymentSessionStatus(identifier, payload) {
      const sessionIndex = resolvePaymentSessionIndex(store.paymentSessions, identifier);

      if (sessionIndex === -1) {
        throw createHttpError(404, "Payment session not found.");
      }

      const paymentSession = store.paymentSessions[sessionIndex];
      const booking = store.bookings.find((item) => item.id === paymentSession.bookingId) || null;
      const nextStatus = payload.status ?? paymentSession.status;
      const updatedAt = new Date().toISOString();
      const nextPaymentSession = {
        ...paymentSession,
        status: nextStatus,
        providerStatus: payload.providerStatus ?? nextStatus,
        rawResponse: payload.rawResponse ?? paymentSession.rawResponse,
        externalId: payload.externalId ?? paymentSession.externalId,
        failureReason: payload.failureReason ?? paymentSession.failureReason ?? null,
        updatedAt,
        lastCallbackAt: payload.lastCallbackAt ?? paymentSession.lastCallbackAt ?? updatedAt,
        statusHistory: appendStatusHistory(paymentSession.statusHistory, {
          status: nextStatus,
          source: payload.statusSource || "update",
          at: updatedAt
        })
      };
      const nextBooking = booking
        ? {
            ...booking,
            paymentStatus: nextStatus,
            status: payload.bookingStatus ?? deriveBookingStatusFromPaymentStatus(nextStatus, booking.status),
            paymentSessionId: nextPaymentSession.id,
            updatedAt
          }
        : null;

      if (isSupabaseConfigured()) {
        try {
          const supabase = createSupabaseAdminClient();
          const operations = [
            supabase
              .from("payment_sessions")
              .update({
                status: nextPaymentSession.status,
                provider_status: nextPaymentSession.providerStatus,
                raw_response: nextPaymentSession.rawResponse,
                external_id: nextPaymentSession.externalId,
                failure_reason: nextPaymentSession.failureReason,
                updated_at: nextPaymentSession.updatedAt,
                last_callback_at: nextPaymentSession.lastCallbackAt,
                status_history: nextPaymentSession.statusHistory
              })
              .eq("id", nextPaymentSession.id)
          ];

          if (nextBooking) {
            operations.push(
              supabase
                .from("bookings")
                .update({
                  payment_status: nextBooking.paymentStatus,
                  status: nextBooking.status,
                  payment_session_id: nextBooking.paymentSessionId,
                  updated_at: nextBooking.updatedAt
                })
                .eq("id", nextBooking.id)
            );
          }

          const results = await Promise.all(operations);

          for (const result of results) {
            if (result.error) {
              throw result.error;
            }
          }

          store.paymentSessions = upsertStoreItem(store.paymentSessions, nextPaymentSession, (item) => item.id);

          if (nextBooking) {
            store.bookings = upsertStoreItem(store.bookings, nextBooking, (item) => item.id);
          }

          return clone({
            booking: nextBooking,
            paymentSession: nextPaymentSession,
            previousStatus: payload.previousStatus ?? null
          });
        } catch (error) {
          logWarn("supabase_payment_status_update_failed", {
            reason: error.message || "Unable to update payment status in Supabase.",
            paymentId: nextPaymentSession.id
          });
        }
      }

      const nextResult = await updateLocalStore((localStore) => {
        const localSessionIndex = resolvePaymentSessionIndex(localStore.paymentSessions, identifier);

        if (localSessionIndex === -1) {
          throw createHttpError(404, "Payment session not found.");
        }

        const writablePaymentSession = localStore.paymentSessions[localSessionIndex];
        const writableBooking = localStore.bookings.find((item) => item.id === writablePaymentSession.bookingId);

        writablePaymentSession.status = nextStatus;
        writablePaymentSession.providerStatus = payload.providerStatus ?? nextStatus;
        writablePaymentSession.rawResponse = payload.rawResponse ?? writablePaymentSession.rawResponse;
        writablePaymentSession.externalId = payload.externalId ?? writablePaymentSession.externalId;
        writablePaymentSession.failureReason = payload.failureReason ?? writablePaymentSession.failureReason ?? null;
        writablePaymentSession.updatedAt = updatedAt;
        writablePaymentSession.lastCallbackAt = payload.lastCallbackAt ?? writablePaymentSession.lastCallbackAt ?? updatedAt;
        writablePaymentSession.statusHistory = appendStatusHistory(writablePaymentSession.statusHistory, {
          status: nextStatus,
          source: payload.statusSource || "update",
          at: updatedAt
        });

        if (writableBooking) {
          writableBooking.paymentStatus = nextStatus;
          writableBooking.status = payload.bookingStatus ?? deriveBookingStatusFromPaymentStatus(nextStatus, writableBooking.status);
          writableBooking.paymentSessionId = writablePaymentSession.id;
          writableBooking.updatedAt = updatedAt;
        }

        return clone({
          booking: writableBooking || null,
          paymentSession: writablePaymentSession,
          previousStatus: payload.previousStatus ?? null
        });
      });

      if (nextResult.paymentSession) {
        store.paymentSessions = upsertStoreItem(store.paymentSessions, nextResult.paymentSession, (item) => item.id);
      }

      if (nextResult.booking) {
        store.bookings = upsertStoreItem(store.bookings, nextResult.booking, (item) => item.id);
      }

      return nextResult;
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
    },
    async createEmailLead(payload) {
      return updateLocalStore((localStore) => {
        localStore.emailLeads = localStore.emailLeads || [];
        const normalizedEmail = normalizeEmail(payload.email);
        const existingLead = localStore.emailLeads.find((item) => normalizeEmail(item.email) === normalizedEmail);

        if (existingLead) {
          return clone({
            ...existingLead,
            alreadyExists: true
          });
        }

        const lead = {
          id: randomUUID(),
          email: normalizedEmail,
          source: payload.source || "homepage",
          status: payload.status || "new",
          createdAt: new Date().toISOString()
        };

        localStore.emailLeads.unshift(lead);
        return clone(lead);
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
