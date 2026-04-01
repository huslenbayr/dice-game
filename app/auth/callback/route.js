import { NextResponse } from "next/server";
import { signInWithOAuthProfile } from "@/lib/auth/service";
import { isSupportedOAuthProvider } from "@/lib/auth/config";
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
    user?.identities?.find((identity) => identity?.identity_data?.full_name)?.identity_data?.full_name ||
    user?.identities?.find((identity) => identity?.identity_data?.name)?.identity_data?.name ||
    user?.user_metadata?.preferred_username ||
    user?.email ||
    ""
  );
}

function resolveOAuthEmail(user) {
  return (
    user?.email ||
    user?.user_metadata?.email ||
    user?.identities?.find((identity) => identity?.identity_data?.email)?.identity_data?.email ||
    ""
  );
}

export async function GET(request) {
  const nextPath = sanitizeRedirectPath(request.nextUrl.searchParams.get("next"));
  const providerParam = String(request.nextUrl.searchParams.get("provider") || "").trim().toLowerCase();
  const requestedProvider = isSupportedOAuthProvider(providerParam) ? providerParam : null;
  const code = request.nextUrl.searchParams.get("code");
  const { supabase, applyToResponse } = createSupabaseRouteHandlerClient(request);

  if (!supabase || !code) {
    return applyToResponse(NextResponse.redirect(buildSignInRedirect(request, "oauth_failed", nextPath)));
  }

  try {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      throw error;
    }

    const email = resolveOAuthEmail(data?.user);

    if (!email) {
      throw new Error("The selected OAuth provider did not return a usable email address.");
    }

    const result = await signInWithOAuthProfile({
      email,
      fullName: resolveOAuthFullName(data.user),
      authProvider: String(data.user.app_metadata?.provider || requestedProvider || "oauth")
    });

    const redirectTo = resolveSignedInPath(result.user, nextPath);
    const response = applyToResponse(NextResponse.redirect(new URL(redirectTo, getRequestOrigin(request))));
    applySessionCookie(response, result.session);
    return response;
  } catch (error) {
    logError("oauth_callback_failed", {
      provider: requestedProvider,
      reason: error.message || "Unable to complete OAuth sign-in.",
      nextPath,
      stack: error.stack || null
    });

    return applyToResponse(NextResponse.redirect(buildSignInRedirect(request, "oauth_failed", nextPath)));
  }
}
