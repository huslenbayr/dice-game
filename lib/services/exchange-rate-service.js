import "server-only";

import { PRICE_BASE_CURRENCY, SUPPORTED_DISPLAY_CURRENCIES } from "@/lib/currency";

const EXCHANGE_RATE_SOURCE_URL = "https://api.frankfurter.dev/v2/rates";
const EXCHANGE_RATE_SOURCE_NAME = "Frankfurter";
const EXCHANGE_RATE_CACHE_TTL_MS = 1000 * 60 * 60 * 6;
const EXCHANGE_RATE_TIMEOUT_MS = 5000;

const BACKUP_RATES = Object.freeze({
  USD: 1,
  EUR: 0.92,
  JPY: 151,
  KRW: 1360,
  MNT: 3450
});

let ratesCache = null;
let inFlightRequest = null;

function buildRateUrl() {
  const searchParams = new URLSearchParams({
    base: PRICE_BASE_CURRENCY,
    quotes: SUPPORTED_DISPLAY_CURRENCIES.filter((currency) => currency !== PRICE_BASE_CURRENCY).join(",")
  });

  return `${EXCHANGE_RATE_SOURCE_URL}?${searchParams.toString()}`;
}

function normalizeLiveRates(payload) {
  if (!Array.isArray(payload) || payload.length === 0) {
    throw new Error("Exchange rate payload was empty.");
  }

  const rates = {
    [PRICE_BASE_CURRENCY]: 1
  };

  for (const item of payload) {
    if (!item?.quote || typeof item.rate !== "number" || Number.isNaN(item.rate)) {
      continue;
    }

    rates[item.quote] = item.rate;
  }

  for (const currency of SUPPORTED_DISPLAY_CURRENCIES) {
    if (typeof rates[currency] !== "number" || rates[currency] <= 0) {
      throw new Error(`Missing exchange rate for ${currency}.`);
    }
  }

  return {
    baseCurrency: PRICE_BASE_CURRENCY,
    rates,
    mode: "live",
    stale: false,
    sourceName: EXCHANGE_RATE_SOURCE_NAME,
    sourceUrl: buildRateUrl(),
    fetchedAt: new Date().toISOString(),
    publishedAt: payload[0]?.date || null,
    error: null
  };
}

async function fetchLiveRates() {
  const response = await fetch(buildRateUrl(), {
    headers: {
      Accept: "application/json"
    },
    cache: "no-store",
    signal: AbortSignal.timeout(EXCHANGE_RATE_TIMEOUT_MS)
  });

  if (!response.ok) {
    throw new Error(`Exchange rate request failed with ${response.status}.`);
  }

  const payload = await response.json();
  return normalizeLiveRates(payload);
}

function readFreshCache() {
  if (!ratesCache) {
    return null;
  }

  if (ratesCache.expiresAt <= Date.now()) {
    return null;
  }

  return {
    ...ratesCache.snapshot,
    mode: "cached",
    stale: false
  };
}

function buildFallbackSnapshot(errorMessage = null) {
  return {
    baseCurrency: PRICE_BASE_CURRENCY,
    rates: BACKUP_RATES,
    mode: "fallback",
    stale: true,
    sourceName: EXCHANGE_RATE_SOURCE_NAME,
    sourceUrl: buildRateUrl(),
    fetchedAt: null,
    publishedAt: null,
    error: errorMessage
  };
}

export async function getExchangeRates() {
  const freshCache = readFreshCache();

  if (freshCache) {
    return freshCache;
  }

  if (!inFlightRequest) {
    inFlightRequest = (async () => {
      try {
        const liveSnapshot = await fetchLiveRates();
        ratesCache = {
          snapshot: liveSnapshot,
          expiresAt: Date.now() + EXCHANGE_RATE_CACHE_TTL_MS
        };
        return liveSnapshot;
      } catch (error) {
        if (ratesCache?.snapshot) {
          return {
            ...ratesCache.snapshot,
            mode: "cached",
            stale: true,
            error: error.message || "Unable to refresh exchange rates."
          };
        }

        return buildFallbackSnapshot(error.message || "Unable to load exchange rates.");
      } finally {
        inFlightRequest = null;
      }
    })();
  }

  return inFlightRequest;
}
