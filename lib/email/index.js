import { sendWithMockProvider } from "@/lib/email/providers/mock-email-provider";
import { sendWithSmtpProvider } from "@/lib/email/providers/smtp-email-provider";
import { localize } from "@/lib/i18n";

function getEmailMode() {
  return String(process.env.EMAIL_PROVIDER || "auto").toLowerCase();
}

function hasSmtpConfig() {
  return Boolean(process.env.SMTP_HOST);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getNotificationRecipient() {
  return process.env.BOOKING_NOTIFICATION_TO || "huslenbayr9779@gmail.com";
}

function getNotificationSender() {
  return process.env.BOOKING_NOTIFICATION_FROM || "no-reply@mongolway.mn";
}

function buildBaseEmailLayout(title, content) {
  return `
    <div style="font-family:Arial,sans-serif;background:#222831;padding:32px;">
      <div style="max-width:640px;margin:0 auto;background:#393E46;border:1px solid rgba(238,238,238,0.12);border-radius:24px;padding:32px;color:#EEEEEE;">
        <p style="margin:0 0 12px;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(238,238,238,0.56);">MongolWay</p>
        <h2 style="margin:0 0 20px;font-size:28px;line-height:1.2;">${escapeHtml(title)}</h2>
        ${content}
      </div>
    </div>
  `;
}

function buildBookingEmailHtml({ booking, tour }) {
  return buildBaseEmailLayout(
    "New booking submitted",
    `
      <p><strong>Tour:</strong> ${escapeHtml(localize(tour.title, "en"))}</p>
      <p><strong>Booking ID:</strong> ${escapeHtml(booking.id)}</p>
      <p><strong>Date:</strong> ${escapeHtml(booking.date)}</p>
      <p><strong>People:</strong> ${escapeHtml(booking.people)}</p>
      <p><strong>Name:</strong> ${escapeHtml(booking.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(booking.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(booking.phone)}</p>
      <p><strong>Nationality:</strong> ${escapeHtml(booking.nationality)}</p>
      <p><strong>Special request:</strong> ${escapeHtml(booking.specialRequest || "None")}</p>
      <p><strong>Status:</strong> ${escapeHtml(booking.status)}</p>
    `
  );
}

function buildPaymentStatusEmailHtml({ booking, tour, paymentSession, previousStatus, nextStatus }) {
  return buildBaseEmailLayout(
    "Payment status updated",
    `
      <p><strong>Tour:</strong> ${escapeHtml(localize(tour.title, "en"))}</p>
      <p><strong>Booking ID:</strong> ${escapeHtml(booking.id)}</p>
      <p><strong>Traveler:</strong> ${escapeHtml(booking.name)} (${escapeHtml(booking.email)})</p>
      <p><strong>Payment ID:</strong> ${escapeHtml(paymentSession.id)}</p>
      <p><strong>Provider:</strong> ${escapeHtml(paymentSession.provider)}</p>
      <p><strong>Reference:</strong> ${escapeHtml(paymentSession.reference)}</p>
      <p><strong>Previous status:</strong> ${escapeHtml(previousStatus || "n/a")}</p>
      <p><strong>New status:</strong> ${escapeHtml(nextStatus)}</p>
      <p><strong>Amount:</strong> ${escapeHtml(paymentSession.amount)} ${escapeHtml(paymentSession.currency)}</p>
    `
  );
}

function buildLeadCaptureEmailHtml({ lead }) {
  return buildBaseEmailLayout(
    "New email lead captured",
    `
      <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
      <p><strong>Lead ID:</strong> ${escapeHtml(lead.id)}</p>
      <p><strong>Source:</strong> ${escapeHtml(lead.source)}</p>
      <p><strong>Status:</strong> ${escapeHtml(lead.status)}</p>
      <p><strong>Created at:</strong> ${escapeHtml(lead.createdAt)}</p>
    `
  );
}

async function deliverEmail(message) {
  const emailMode = getEmailMode();

  if (emailMode === "mock") {
    return sendWithMockProvider(message, {
      reason: "EMAIL_PROVIDER is set to mock. Stored locally instead of sending."
    });
  }

  if (emailMode === "smtp" && !hasSmtpConfig()) {
    throw new Error("EMAIL_PROVIDER is set to smtp, but SMTP_HOST is missing. Add SMTP settings on the server.");
  }

  if (hasSmtpConfig()) {
    return sendWithSmtpProvider(message);
  }

  return sendWithMockProvider(message, {
    reason: "SMTP is not configured. Stored locally instead of sending."
  });
}

export async function sendNotificationEmail(message) {
  return deliverEmail({
    ...message,
    to: message.to || getNotificationRecipient(),
    from: message.from || getNotificationSender()
  });
}

export async function sendBookingNotification({ booking, tour }) {
  return sendNotificationEmail({
    subject: `New booking for ${localize(tour.title, "en")} - MongolWay`,
    html: buildBookingEmailHtml({ booking, tour })
  });
}

export async function sendPaymentStatusNotification({ booking, tour, paymentSession, previousStatus, nextStatus }) {
  return sendNotificationEmail({
    subject: `Payment ${nextStatus} for ${localize(tour.title, "en")} - MongolWay`,
    html: buildPaymentStatusEmailHtml({ booking, tour, paymentSession, previousStatus, nextStatus })
  });
}

export async function sendLeadNotification({ lead }) {
  return sendNotificationEmail({
    subject: `New lead from ${lead.source} - MongolWay`,
    html: buildLeadCaptureEmailHtml({ lead })
  });
}
