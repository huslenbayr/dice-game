function normalizeDetails(details) {
  return details && typeof details === "object" ? details : { value: details };
}

export function logInfo(event, details = {}) {
  console.info(`[mongolway] ${event}`, normalizeDetails(details));
}

export function logWarn(event, details = {}) {
  console.warn(`[mongolway] ${event}`, normalizeDetails(details));
}

export function logError(event, details = {}) {
  console.error(`[mongolway] ${event}`, normalizeDetails(details));
}
