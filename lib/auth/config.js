import { localize } from "@/lib/i18n";

export const AUTH_SESSION_COOKIE = "mongolway-session";
export const AUTH_SESSION_DAYS = Number(process.env.AUTH_SESSION_DAYS || 14);

export function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

export function getAdminEmailAllowlist() {
  return String(process.env.ADMIN_EMAIL_ALLOWLIST || "huslenbayr9779@gmail.com")
    .split(",")
    .map((item) => normalizeEmail(item))
    .filter(Boolean);
}

export function getAuthProviders(language = "en") {
  const providers = [
    {
      id: "credentials",
      kind: "password",
      enabled: true,
      label: {
        en: "Email and password",
        mn: "Имэйл ба нууц үг"
      },
      description: {
        en: "Sign in as a traveler or admin with a role-aware session.",
        mn: "Аялагч эсвэл админаар дүрд суурилсан сесстэй нэвтэрнэ."
      }
    },
    {
      id: "google",
      kind: "oauth",
      enabled: false,
      label: {
        en: "Google",
        mn: "Google"
      },
      description: {
        en: "Prepared in the architecture so social sign-in can be added later.",
        mn: "Сошиал нэвтрэлтийг дараа нэмэхэд зориулсан архитектур бэлтгэсэн."
      }
    }
  ];

  return providers.map((provider) => ({
    ...provider,
    title: localize(provider.label, language),
    body: localize(provider.description, language)
  }));
}
