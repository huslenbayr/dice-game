function normalizeUrl(value) {
  const input = String(value || "").trim();

  if (!input) {
    return null;
  }

  try {
    return new URL(input.startsWith("http://") || input.startsWith("https://") ? input : `https://${input}`);
  } catch {
    return null;
  }
}

export function getMetadataBase() {
  return normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL);
}

export function getSiteUrl() {
  const metadataBase = getMetadataBase();
  return metadataBase ? metadataBase.toString().replace(/\/$/, "") : null;
}

export function buildSiteUrl(pathname = "/") {
  const siteUrl = getSiteUrl();

  if (!siteUrl) {
    return null;
  }

  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${siteUrl}${normalizedPath}`;
}
