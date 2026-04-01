import { createSupabasePublicClient } from "@/lib/supabase/clients";
import { buildSiteUrl } from "@/lib/site";

const OAUTH_COOKIE_MAX_AGE_SECONDS = 60 * 10;

function shouldPersistOAuthCookie(key) {
  return String(key || "").endsWith("-code-verifier");
}

function getCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/"
  };
}

export function getRequestOrigin(request) {
  if (process.env.NODE_ENV !== "production") {
    return request.nextUrl.origin;
  }

  const configuredSiteUrl = buildSiteUrl("/");

  if (configuredSiteUrl) {
    return configuredSiteUrl.replace(/\/$/, "");
  }

  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") || "https";

  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  return request.nextUrl.origin;
}

export function createSupabaseRouteHandlerClient(request) {
  const pendingCookies = new Map();
  const deletedCookies = new Set();

  const storage = {
    isServer: true,
    async getItem(key) {
      if (!shouldPersistOAuthCookie(key)) {
        return null;
      }

      if (deletedCookies.has(key)) {
        return null;
      }

      if (pendingCookies.has(key)) {
        return pendingCookies.get(key);
      }

      return request.cookies.get(key)?.value || null;
    },
    async setItem(key, value) {
      if (!shouldPersistOAuthCookie(key)) {
        return;
      }

      deletedCookies.delete(key);
      pendingCookies.set(key, String(value));
    },
    async removeItem(key) {
      if (!shouldPersistOAuthCookie(key)) {
        return;
      }

      pendingCookies.delete(key);
      deletedCookies.add(key);
    }
  };

  const supabase = createSupabasePublicClient({
    auth: {
      storage
    }
  });

  return {
    supabase,
    applyToResponse(response) {
      const baseCookieOptions = getCookieOptions();

      for (const [key, value] of pendingCookies.entries()) {
        response.cookies.set(key, value, {
          ...baseCookieOptions,
          maxAge: OAUTH_COOKIE_MAX_AGE_SECONDS
        });
      }

      for (const key of deletedCookies.values()) {
        response.cookies.set(key, "", {
          ...baseCookieOptions,
          expires: new Date(0)
        });
      }

      return response;
    }
  };
}
