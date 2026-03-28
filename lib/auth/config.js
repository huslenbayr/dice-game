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
      enabled: false,
      label: {
        en: "Google",
        mn: "Google",
        ja: "Google",
        ko: "Google",
        es: "Google"
      },
      description: {
        en: "Prepared in the architecture so social sign-in can be added later.",
        mn: "Сошиал нэвтрэлтийг дараа нэмэхэд зориулсан архитектур бэлтгэсэн.",
        ja: "後でソーシャルログインを追加できるように構成済みです。",
        ko: "나중에 소셜 로그인을 추가할 수 있도록 구조가 준비되어 있습니다.",
        es: "La arquitectura ya está preparada para añadir acceso social más adelante."
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
