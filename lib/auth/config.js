import { localize } from "@/lib/i18n";
import { isSupabaseAuthConfigured } from "@/lib/supabase/clients";

export const AUTH_SESSION_COOKIE = "mongolway-session";
export const AUTH_SESSION_DAYS = Number(process.env.AUTH_SESSION_DAYS || 14);
const OAUTH_PROVIDERS = [
  {
    id: "google",
    label: {
      en: "Google",
      mn: "Google",
      ja: "Google",
      ko: "Google",
      es: "Google"
    },
    actionLabel: {
      en: "Continue with Google",
      mn: "Google-ээр үргэлжлүүлэх",
      ja: "Googleで続行",
      ko: "Google로 계속하기",
      es: "Continuar con Google"
    },
    description: {
      en: "Continue with your Google account through the Supabase-backed OAuth flow.",
      mn: "Supabase-д тулгуурласан OAuth урсгалаар Google бүртгэлээрээ үргэлжлүүлнэ.",
      ja: "SupabaseベースのOAuthフローでGoogleアカウントから続行します。",
      ko: "Supabase 기반 OAuth 흐름으로 Google 계정으로 계속합니다.",
      es: "Continúa con tu cuenta de Google mediante el flujo OAuth respaldado por Supabase."
    }
  },
  {
    id: "apple",
    label: {
      en: "Apple",
      mn: "Apple",
      ja: "Apple",
      ko: "Apple",
      es: "Apple"
    },
    actionLabel: {
      en: "Continue with Apple",
      mn: "Apple-аар үргэлжлүүлэх",
      ja: "Appleで続行",
      ko: "Apple로 계속하기",
      es: "Continuar con Apple"
    },
    description: {
      en: "Support Sign in with Apple through the same Supabase-backed server callback flow.",
      mn: "Ижил Supabase-д тулгуурласан сервер callback урсгалаар Apple-ээр нэвтрэхийг дэмжинэ.",
      ja: "同じSupabaseベースのサーバーコールバックフローでAppleサインインをサポートします。",
      ko: "같은 Supabase 기반 서버 콜백 흐름으로 Apple 로그인을 지원합니다.",
      es: "Admite Sign in with Apple mediante el mismo flujo con callback del servidor respaldado por Supabase."
    }
  },
  {
    id: "facebook",
    label: {
      en: "Facebook",
      mn: "Facebook",
      ja: "Facebook",
      ko: "Facebook",
      es: "Facebook"
    },
    actionLabel: {
      en: "Continue with Facebook",
      mn: "Facebook-ээр үргэлжлүүлэх",
      ja: "Facebookで続行",
      ko: "Facebook으로 계속하기",
      es: "Continuar con Facebook"
    },
    description: {
      en: "Allow travelers to sign in with Facebook through the Supabase OAuth provider flow.",
      mn: "Аялагчид Supabase OAuth provider урсгалаар Facebook-аар нэвтрэх боломжтой байна.",
      ja: "Supabase OAuthプロバイダーフローでFacebookログインを利用できるようにします。",
      ko: "Supabase OAuth 공급자 흐름을 통해 Facebook 로그인을 지원합니다.",
      es: "Permite que los viajeros inicien sesión con Facebook mediante el flujo del proveedor OAuth de Supabase."
    }
  }
];

export const SUPPORTED_OAUTH_PROVIDERS = OAUTH_PROVIDERS.map((provider) => provider.id);

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
  return isSupportedOAuthProvider(normalizedProvider) && isSupabaseAuthConfigured();
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
    ...OAUTH_PROVIDERS.map((provider) => ({
      ...provider,
      kind: "oauth",
      enabled: isOAuthProviderEnabled(provider.id)
    }))
  ];

  return providers.map((provider) => ({
    ...provider,
    title: localize(provider.label, language),
    action: provider.actionLabel ? localize(provider.actionLabel, language) : null,
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
