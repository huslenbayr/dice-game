import { NextResponse } from "next/server";
import { isOAuthProviderEnabled, isSupportedOAuthProvider } from "@/lib/auth/config";
import { sanitizeRedirectPath } from "@/lib/auth/session";
import { logError } from "@/lib/logging";
import { createSupabaseRouteHandlerClient, getRequestOrigin } from "@/lib/supabase/oauth";

export const runtime = "nodejs";

function buildSignInRedirect(request, errorCode, nextPath) {
  const redirectUrl = new URL("/sign-in", getRequestOrigin(request));

  if (errorCode) {
    redirectUrl.searchParams.set("error", errorCode);
  }

  if (nextPath) {
    redirectUrl.searchParams.set("next", nextPath);
  }

  return redirectUrl;
}

export async function GET(request, { params }) {
  const { provider } = await params;
  const nextPath = sanitizeRedirectPath(request.nextUrl.searchParams.get("next"));

  if (!isSupportedOAuthProvider(provider) || !isOAuthProviderEnabled(provider)) {
    return NextResponse.redirect(buildSignInRedirect(request, "oauth_google_unavailable", nextPath));
  }

  const { supabase, applyToResponse } = createSupabaseRouteHandlerClient(request);

  if (!supabase) {
    return NextResponse.redirect(buildSignInRedirect(request, "oauth_google_unavailable", nextPath));
  }

  try {
    const callbackUrl = new URL("/auth/callback", getRequestOrigin(request));

    if (nextPath) {
      callbackUrl.searchParams.set("next", nextPath);
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: callbackUrl.toString(),
        skipBrowserRedirect: true
      }
    });

    if (error || !data?.url) {
      throw error || new Error("No OAuth redirect URL was returned.");
    }

    return applyToResponse(NextResponse.redirect(data.url));
  } catch (error) {
    logError("oauth_start_failed", {
      provider,
      nextPath,
      reason: error.message || "Unable to start OAuth sign-in.",
      stack: error.stack || null
    });

    return applyToResponse(NextResponse.redirect(buildSignInRedirect(request, "oauth_google_failed", nextPath)));
  }
}
