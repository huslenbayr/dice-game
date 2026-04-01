import { NextResponse } from "next/server";
import { signInWithOAuthProfile } from "@/lib/auth/service";
import { applySessionCookie, resolveSignedInPath, sanitizeRedirectPath } from "@/lib/auth/session";
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

function resolveOAuthFullName(user) {
  return (
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.user_metadata?.preferred_username ||
    user?.email ||
    ""
  );
}

export async function GET(request) {
  const nextPath = sanitizeRedirectPath(request.nextUrl.searchParams.get("next"));
  const code = request.nextUrl.searchParams.get("code");
  const { supabase, applyToResponse } = createSupabaseRouteHandlerClient(request);

  if (!supabase || !code) {
    return applyToResponse(NextResponse.redirect(buildSignInRedirect(request, "oauth_google_failed", nextPath)));
  }

  try {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      throw error;
    }

    if (!data?.user?.email) {
      throw new Error("Google did not return a usable email address.");
    }

    const result = await signInWithOAuthProfile({
      email: data.user.email,
      fullName: resolveOAuthFullName(data.user),
      authProvider: String(data.user.app_metadata?.provider || "google")
    });

    const redirectTo = resolveSignedInPath(result.user, nextPath);
    const response = applyToResponse(NextResponse.redirect(new URL(redirectTo, getRequestOrigin(request))));
    applySessionCookie(response, result.session);
    return response;
  } catch (error) {
    logError("oauth_callback_failed", {
      reason: error.message || "Unable to complete OAuth sign-in.",
      nextPath,
      stack: error.stack || null
    });

    return applyToResponse(NextResponse.redirect(buildSignInRedirect(request, "oauth_google_failed", nextPath)));
  }
}
