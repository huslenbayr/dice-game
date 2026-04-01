const EMAIL_PROVIDERS = ["auto", "mock", "smtp", "google-workspace"];
const DEFAULT_COMPANY_EMAIL = "info@mongolway.com";
const DEFAULT_COMPANY_NAME = "MongolWay";

function normalizeProvider(value) {
  const provider = String(value || "auto").trim().toLowerCase();
  return EMAIL_PROVIDERS.includes(provider) ? provider : "auto";
}

function toInteger(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function formatMailbox(address, name = DEFAULT_COMPANY_NAME) {
  const normalizedAddress = String(address || "").trim();

  if (!normalizedAddress) {
    return "";
  }

  if (normalizedAddress.includes("<")) {
    return normalizedAddress;
  }

  return `${name} <${normalizedAddress}>`;
}

export function getEmailProvider() {
  return normalizeProvider(process.env.EMAIL_PROVIDER);
}

export function getCompanyEmailAddress() {
  return String(
    process.env.EMAIL_FROM ||
      process.env.EMAIL_FROM_ADDRESS ||
      process.env.BOOKING_NOTIFICATION_FROM ||
      DEFAULT_COMPANY_EMAIL
  ).trim();
}

export function getCompanyEmailSender() {
  return formatMailbox(getCompanyEmailAddress(), process.env.EMAIL_FROM_NAME || DEFAULT_COMPANY_NAME);
}

export function getCompanyReplyTo() {
  return String(process.env.EMAIL_REPLY_TO || getCompanyEmailAddress()).trim();
}

export function getNotificationRecipient() {
  return String(process.env.EMAIL_ADMIN_TO || process.env.BOOKING_NOTIFICATION_TO || DEFAULT_COMPANY_EMAIL).trim();
}

export function getSmtpTransportConfig(overrides = {}) {
  return {
    host: String(overrides.host || process.env.SMTP_HOST || "").trim(),
    port: toInteger(overrides.port || process.env.SMTP_PORT, 587),
    secure:
      String(overrides.secure ?? process.env.SMTP_SECURE ?? "false")
        .trim()
        .toLowerCase() === "true",
    authUser: String(overrides.authUser || process.env.SMTP_USER || "").trim(),
    authPass: String(overrides.authPass || process.env.SMTP_PASS || "").trim()
  };
}

export function getGoogleWorkspaceTransportConfig() {
  return {
    host: String(process.env.SMTP_HOST || "smtp.gmail.com").trim(),
    port: toInteger(process.env.SMTP_PORT, 465),
    secure:
      String(process.env.SMTP_SECURE ?? "true")
        .trim()
        .toLowerCase() === "true",
    authUser: String(process.env.SMTP_USER || getCompanyEmailAddress()).trim(),
    authPass: String(process.env.SMTP_PASS || "").trim()
  };
}

export function hasSmtpConfig(provider = "smtp") {
  const transportConfig =
    normalizeProvider(provider) === "google-workspace"
      ? getGoogleWorkspaceTransportConfig()
      : getSmtpTransportConfig();

  return Boolean(transportConfig.host && transportConfig.authUser && transportConfig.authPass);
}
