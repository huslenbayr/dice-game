import { localize } from "@/lib/i18n";
import { isSupabaseAuthConfigured } from "@/lib/supabase/clients";

export const AUTH_SESSION_COOKIE = "mongolway-session";
export const AUTH_SESSION_DAYS = Number(process.env.AUTH_SESSION_DAYS || 14);
export const SUPPORTED_OAUTH_PROVIDERS = ["google"];

export function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

export function getAdminEmailAllowlist() {
  return String(process.env.ADMIN_EMAIL_ALLOWLIST || "huslenbayr9779@gmail.com")
    .split(",")
    .map((item) => normalizeEmail(item))
    .filter(Boolean);
}

export function isSupportedOAuthProvider(provider) {
  return SUPPORTED_OAUTH_PROVIDERS.includes(String(provider || "").trim().toLowerCase());
}

export function isOAuthProviderEnabled(provider) {
  const normalizedProvider = String(provider || "").trim().toLowerCase();

  if (normalizedProvider === "google") {
    return isSupabaseAuthConfigured();
  }

  return false;
}

export function getAuthProviders(language = "en") {
  const providers = [
    {
      id: "credentials",
      kind: "password",
      enabled: true,
      label: {
        en: "Email and password",
        mn: "Имэйл ба нууц үг",
        ja: "メールとパスワード",
        ko: "이메일과 비밀번호",
        es: "Correo y contraseña"
      },
      description: {
        en: "Sign in as a traveler or admin with a role-aware session.",
        mn: "Аялагч эсвэл админаар дүрд суурилсан сесстэй нэвтэрнэ.",
        ja: "役割を判別するセッションで旅行者または管理者としてログインします。",
        ko: "역할을 인식하는 세션으로 여행자 또는 관리자 계정으로 로그인합니다.",
        es: "Inicia sesión como viajero o administrador con una sesión basada en roles."
      }
    },
    {
      id: "google",
      kind: "oauth",
      enabled: isOAuthProviderEnabled("google"),
      label: {
        en: "Google",
        mn: "Google",
        ja: "Google",
        ko: "Google",
        es: "Google"
      },
      description: {
        en: "Continue with your Google account through the Supabase-backed OAuth flow.",
        mn: "Supabase-д тулгуурласан OAuth урсгалаар Google бүртгэлээрээ үргэлжлүүлнэ.",
        ja: "SupabaseベースのOAuthフローでGoogleアカウントから続行します。",
        ko: "Supabase 기반 OAuth 흐름으로 Google 계정으로 계속합니다.",
        es: "Continúa con tu cuenta de Google mediante el flujo OAuth respaldado por Supabase."
      }
    }
  ];

  return providers.map((provider) => ({
    ...provider,
    title: localize(provider.label, language),
    body: localize(provider.description, language),
    uiActiveLabel: localize(
      {
        en: "Active",
        mn: "Идэвхтэй",
        ja: "利用可能",
        ko: "사용 가능",
        es: "Activo"
      },
      language
    ),
    uiPlannedLabel: localize(
      {
        en: "Planned",
        mn: "Бэлтгэсэн",
        ja: "準備済み",
        ko: "준비됨",
        es: "Planificado"
      },
      language
    )
  }));
}
