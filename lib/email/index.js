import {
  getCompanyEmailSender,
  getCompanyReplyTo,
  getEmailProvider,
  getNotificationRecipient,
  hasSmtpConfig
} from "@/lib/email/config";
import { sendWithMockProvider } from "@/lib/email/providers/mock-email-provider";
import { sendWithSmtpProvider } from "@/lib/email/providers/smtp-email-provider";
import { sendWithGoogleWorkspaceProvider } from "@/lib/email/providers/google-workspace-email-provider";
import { localize, normalizeLanguage, statusLabel } from "@/lib/i18n";
import { getRepository } from "@/lib/repositories/content-repository";
import { buildSiteUrl } from "@/lib/site";

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function paragraph(label, value) {
  return `
    <p style="margin:0 0 12px;font-size:15px;line-height:1.7;color:#EEEEEE;">
      <strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}
    </p>
  `;
}

function bodyParagraph(value) {
  return `
    <p style="margin:0 0 14px;font-size:15px;line-height:1.75;color:rgba(238,238,238,0.84);">
      ${escapeHtml(value)}
    </p>
  `;
}

function buildBaseEmailLayout({ brandName, title, intro, content, ctaHref = null, ctaLabel = null, footerHtml = "" }) {
  return `
    <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;background:#222831;padding:32px 16px;">
      <div style="max-width:640px;margin:0 auto;border-radius:28px;border:1px solid rgba(238,238,238,0.12);background:linear-gradient(180deg, rgba(61,67,76,0.98), rgba(34,40,49,0.98));padding:32px;color:#EEEEEE;">
        <p style="margin:0 0 12px;font-size:12px;line-height:1.4;letter-spacing:0.24em;text-transform:uppercase;color:rgba(238,238,238,0.56);">
          ${escapeHtml(brandName)}
        </p>
        <h1 style="margin:0 0 16px;font-size:30px;line-height:1.18;color:#FFFFFF;">
          ${escapeHtml(title)}
        </h1>
        ${intro ? `<p style="margin:0 0 22px;font-size:16px;line-height:1.75;color:rgba(238,238,238,0.8);">${escapeHtml(intro)}</p>` : ""}
        ${content}
        ${
          ctaHref && ctaLabel
            ? `
              <div style="margin-top:28px;">
                <a href="${escapeHtml(ctaHref)}" style="display:inline-block;border-radius:999px;background:#00ADB5;color:#EEEEEE;padding:12px 20px;font-size:14px;font-weight:700;text-decoration:none;">
                  ${escapeHtml(ctaLabel)}
                </a>
              </div>
            `
            : ""
        }
      </div>
      ${
        footerHtml
          ? `<div style="max-width:640px;margin:16px auto 0;padding:0 8px;font-size:13px;line-height:1.7;color:rgba(238,238,238,0.58);">${footerHtml}</div>`
          : ""
      }
    </div>
  `;
}

async function getEmailBrandContext() {
  const repository = await getRepository();
  const snapshot = await repository.getPublicSnapshot();
  const site = snapshot.site || {};

  return {
    brandName: site.brandName || "MongolWay",
    supportEmail: site.contact?.email || getCompanyReplyTo(),
    supportPhone: site.contact?.phone || "+976 94789779",
    officeLocation: site.contact?.officeLocation || "Ulaanbaatar, Mongolia"
  };
}

function buildBookingNotificationHtml({ brandName, booking, tour }) {
  return buildBaseEmailLayout({
    brandName,
    title: "New booking submitted",
    intro: `${booking.name} submitted a new booking through the website.`,
    content: [
      paragraph("Tour", localize(tour.title, "en")),
      paragraph("Booking ID", booking.id),
      paragraph("Date", booking.date),
      paragraph("People", booking.people),
      paragraph("Name", booking.name),
      paragraph("Email", booking.email),
      paragraph("Phone", booking.phone),
      paragraph("Nationality", booking.nationality),
      paragraph("Special request", booking.specialRequest || "None"),
      paragraph("Status", booking.status)
    ].join("")
  });
}

function buildBookingAutoReplyHtml({ brandName, supportEmail, supportPhone, booking, tour, language }) {
  const normalizedLanguage = normalizeLanguage(language);
  const paymentUrl = buildSiteUrl(`/payment/${booking.id}`);
  const intro = localize(
    {
      en: "Thanks for booking with us. We have received your request and our team will follow up shortly.",
      mn: "Захиалга илгээсэнд баярлалаа. Бид таны хүсэлтийг хүлээн авсан бөгөөд манай баг удахгүй эргэн холбогдоно.",
      ja: "ご予約ありがとうございます。お申し込みを受け付けました。担当チームよりまもなくご連絡します。",
      ko: "예약해 주셔서 감사합니다. 요청을 접수했으며 저희 팀이 곧 연락드리겠습니다.",
      es: "Gracias por tu reserva. Hemos recibido tu solicitud y nuestro equipo se pondra en contacto contigo pronto."
    },
    normalizedLanguage
  );

  return buildBaseEmailLayout({
    brandName,
    title: localize(
      {
        en: "Your MongolWay booking request is in",
        mn: "Таны MongolWay захиалгын хүсэлтийг хүлээн авлаа",
        ja: "MongolWay の予約リクエストを受け付けました",
        ko: "MongolWay 예약 요청이 접수되었습니다",
        es: "Recibimos tu solicitud de reserva de MongolWay"
      },
      normalizedLanguage
    ),
    intro,
    content: [
      paragraph(localize({ en: "Journey", mn: "Аялал", ja: "旅程", ko: "여정", es: "Viaje" }, normalizedLanguage), localize(tour.title, normalizedLanguage)),
      paragraph(localize({ en: "Booking reference", mn: "Захиалгын дугаар", ja: "予約番号", ko: "예약 번호", es: "Referencia" }, normalizedLanguage), booking.id),
      paragraph(localize({ en: "Departure date", mn: "Явах огноо", ja: "出発日", ko: "출발일", es: "Fecha de salida" }, normalizedLanguage), booking.date),
      paragraph(localize({ en: "Travelers", mn: "Аялагчдын тоо", ja: "人数", ko: "여행자 수", es: "Viajeros" }, normalizedLanguage), booking.people),
      bodyParagraph(
        localize(
          {
            en: `If you need to add details before payment, reply to ${supportEmail} or call ${supportPhone}.`,
            mn: `Төлбөр хийхээс өмнө нэмэлт мэдээлэл өгөх шаардлагатай бол ${supportEmail} хаяг руу бичих эсвэл ${supportPhone} дугаарт залгана уу.`,
            ja: `お支払い前に追加情報が必要な場合は、${supportEmail} へご返信いただくか、${supportPhone} までお電話ください。`,
            ko: `결제 전에 추가 안내가 필요하시면 ${supportEmail} 로 회신하시거나 ${supportPhone} 로 연락해 주세요.`,
            es: `Si necesitas agregar detalles antes del pago, responde a ${supportEmail} o llama al ${supportPhone}.`
          },
          normalizedLanguage
        )
      )
    ].join(""),
    ctaHref: paymentUrl,
    ctaLabel: paymentUrl
      ? localize(
          {
            en: "Open payment page",
            mn: "Төлбөрийн хуудсыг нээх",
            ja: "支払いページを開く",
            ko: "결제 페이지 열기",
            es: "Abrir pagina de pago"
          },
          normalizedLanguage
        )
      : null,
    footerHtml: `
      ${escapeHtml(supportEmail)}<br />
      ${escapeHtml(supportPhone)}
    `
  });
}

function buildPaymentStatusEmailHtml({ brandName, booking, tour, paymentSession, previousStatus, nextStatus }) {
  return buildBaseEmailLayout({
    brandName,
    title: "Payment status updated",
    intro: "A payment session changed state for an existing booking.",
    content: [
      paragraph("Tour", localize(tour.title, "en")),
      paragraph("Booking ID", booking.id),
      paragraph("Traveler", `${booking.name} (${booking.email})`),
      paragraph("Payment ID", paymentSession.id),
      paragraph("Provider", paymentSession.provider),
      paragraph("Reference", paymentSession.reference),
      paragraph("Previous status", previousStatus || "n/a"),
      paragraph("New status", statusLabel(nextStatus, "en")),
      paragraph("Amount", `${paymentSession.amount} ${paymentSession.currency}`)
    ].join("")
  });
}

function buildLeadNotificationHtml({ brandName, lead }) {
  return buildBaseEmailLayout({
    brandName,
    title: "New homepage lead captured",
    intro: "A visitor requested more travel details from the homepage email capture form.",
    content: [
      paragraph("Email", lead.email),
      paragraph("Lead ID", lead.id),
      paragraph("Source", lead.source),
      paragraph("Status", lead.status),
      paragraph("Created at", lead.createdAt)
    ].join("")
  });
}

function buildLeadAutoReplyHtml({ brandName, supportEmail, supportPhone, officeLocation, language }) {
  const normalizedLanguage = normalizeLanguage(language);
  const toursUrl = buildSiteUrl("/tours");

  return buildBaseEmailLayout({
    brandName,
    title: localize(
      {
        en: "Thanks for your interest in MongolWay",
        mn: "MongolWay-г сонирхсонд баярлалаа",
        ja: "MongolWay にご関心をお寄せいただきありがとうございます",
        ko: "MongolWay에 관심을 보내주셔서 감사합니다",
        es: "Gracias por tu interes en MongolWay"
      },
      normalizedLanguage
    ),
    intro: localize(
      {
        en: "We have received your email and will share more journey details, travel updates, and useful planning information.",
        mn: "Бид таны имэйлийг хүлээн авсан бөгөөд аяллын дэлгэрэнгүй, шинэ мэдээ, хэрэгтэй төлөвлөлтийн мэдээллийг илгээх болно.",
        ja: "メールアドレスを受け取りました。旅程の詳細や最新情報、計画に役立つ情報をお送りします。",
        ko: "이메일을 잘 받았습니다. 더 자세한 여행 정보와 업데이트, 준비 팁을 보내드리겠습니다.",
        es: "Hemos recibido tu correo y te enviaremos mas detalles de viaje, actualizaciones y consejos utiles de planificacion."
      },
      normalizedLanguage
    ),
    content: [
      bodyParagraph(
        localize(
          {
            en: `If you would like to speak with us sooner, reply to ${supportEmail} or call ${supportPhone}.`,
            mn: `Илүү хурдан холбогдохыг хүсвэл ${supportEmail} руу бичих эсвэл ${supportPhone} дугаарт залгана уу.`,
            ja: `お急ぎの場合は ${supportEmail} にご返信いただくか、${supportPhone} までお電話ください。`,
            ko: `더 빠르게 상담받고 싶으시면 ${supportEmail} 로 회신하시거나 ${supportPhone} 로 연락해 주세요.`,
            es: `Si prefieres hablar con nosotros antes, responde a ${supportEmail} o llama al ${supportPhone}.`
          },
          normalizedLanguage
        )
      )
    ].join(""),
    ctaHref: toursUrl,
    ctaLabel: toursUrl
      ? localize(
          {
            en: "See tours",
            mn: "Аяллуудыг үзэх",
            ja: "ツアーを見る",
            ko: "투어 보기",
            es: "Ver tours"
          },
          normalizedLanguage
        )
      : null,
    footerHtml: `
      ${escapeHtml(officeLocation)}<br />
      ${escapeHtml(supportEmail)}<br />
      ${escapeHtml(supportPhone)}
    `
  });
}

async function deliverEmail(message) {
  const emailProvider = getEmailProvider();

  if (emailProvider === "mock") {
    return sendWithMockProvider(message, {
      reason: "EMAIL_PROVIDER is set to mock. Stored locally instead of sending."
    });
  }

  if (emailProvider === "google-workspace") {
    if (!hasSmtpConfig("google-workspace")) {
      throw new Error(
        "EMAIL_PROVIDER is set to google-workspace, but SMTP_USER / SMTP_PASS (and optional SMTP_HOST) are missing."
      );
    }

    return sendWithGoogleWorkspaceProvider(message);
  }

  if (emailProvider === "smtp") {
    if (!hasSmtpConfig("smtp")) {
      throw new Error("EMAIL_PROVIDER is set to smtp, but SMTP_HOST / SMTP_USER / SMTP_PASS are missing.");
    }

    return sendWithSmtpProvider(message);
  }

  if (hasSmtpConfig("smtp")) {
    return sendWithSmtpProvider(message);
  }

  return sendWithMockProvider(message, {
    reason: "SMTP is not configured. Stored locally instead of sending."
  });
}

function buildFailedDeliveryResult(error, recipient = null) {
  return {
    success: false,
    delivered: false,
    provider: getEmailProvider(),
    recipient,
    message: error.message || "Email was not delivered."
  };
}

export async function sendEmail(message) {
  return deliverEmail({
    from: message.from || getCompanyEmailSender(),
    replyTo: message.replyTo || getCompanyReplyTo(),
    ...message
  });
}

export async function sendNotificationEmail(message) {
  return sendEmail({
    ...message,
    to: message.to || getNotificationRecipient()
  });
}

export async function sendBookingEmails({ booking, tour, language = "en" }) {
  const context = await getEmailBrandContext();

  const [adminResult, travelerResult] = await Promise.allSettled([
    sendNotificationEmail({
      subject: `New booking request for ${localize(tour.title, "en")} - ${context.brandName}`,
      html: buildBookingNotificationHtml({
        brandName: context.brandName,
        booking,
        tour
      }),
      replyTo: booking.email
    }),
    sendEmail({
      to: booking.email,
      subject: localize(
        {
          en: `We received your ${context.brandName} booking request`,
          mn: `${context.brandName} захиалгын хүсэлтийг хүлээн авлаа`,
          ja: `${context.brandName} の予約リクエストを受け付けました`,
          ko: `${context.brandName} 예약 요청이 접수되었습니다`,
          es: `Recibimos tu solicitud de reserva de ${context.brandName}`
        },
        language
      ),
      html: buildBookingAutoReplyHtml({
        brandName: context.brandName,
        supportEmail: context.supportEmail,
        supportPhone: context.supportPhone,
        booking,
        tour,
        language
      }),
      replyTo: context.supportEmail
    })
  ]);

  return {
    adminNotification:
      adminResult.status === "fulfilled" ? adminResult.value : buildFailedDeliveryResult(adminResult.reason),
    travelerAutoReply:
      travelerResult.status === "fulfilled"
        ? travelerResult.value
        : buildFailedDeliveryResult(travelerResult.reason, booking.email)
  };
}

export async function sendPaymentStatusNotification({ booking, tour, paymentSession, previousStatus, nextStatus }) {
  const context = await getEmailBrandContext();

  return sendNotificationEmail({
    subject: `Payment ${statusLabel(nextStatus, "en")} for ${localize(tour.title, "en")} - ${context.brandName}`,
    html: buildPaymentStatusEmailHtml({
      brandName: context.brandName,
      booking,
      tour,
      paymentSession,
      previousStatus,
      nextStatus
    }),
    replyTo: booking.email
  });
}

export async function sendLeadEmails({ lead, language = "en" }) {
  const context = await getEmailBrandContext();

  const [adminResult, travelerResult] = await Promise.allSettled([
    sendNotificationEmail({
      subject: `New lead from ${lead.source} - ${context.brandName}`,
      html: buildLeadNotificationHtml({
        brandName: context.brandName,
        lead
      }),
      replyTo: lead.email
    }),
    sendEmail({
      to: lead.email,
      subject: localize(
        {
          en: `Thanks for connecting with ${context.brandName}`,
          mn: `${context.brandName}-тай холбогдсонд баярлалаа`,
          ja: `${context.brandName} にご連絡いただきありがとうございます`,
          ko: `${context.brandName}에 연락해 주셔서 감사합니다`,
          es: `Gracias por conectar con ${context.brandName}`
        },
        language
      ),
      html: buildLeadAutoReplyHtml({
        brandName: context.brandName,
        supportEmail: context.supportEmail,
        supportPhone: context.supportPhone,
        officeLocation: context.officeLocation,
        language
      }),
      replyTo: context.supportEmail
    })
  ]);

  return {
    adminNotification:
      adminResult.status === "fulfilled" ? adminResult.value : buildFailedDeliveryResult(adminResult.reason),
    travelerAutoReply:
      travelerResult.status === "fulfilled"
        ? travelerResult.value
        : buildFailedDeliveryResult(travelerResult.reason, lead.email)
  };
}
