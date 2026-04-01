import nodemailer from "nodemailer";

export async function sendWithSmtpProvider(message, options = {}) {
  const transportConfig = options.transportConfig || {};

  const transporter = nodemailer.createTransport({
    host: transportConfig.host || process.env.SMTP_HOST,
    port: Number(transportConfig.port || process.env.SMTP_PORT || 587),
    secure:
      String(transportConfig.secure ?? process.env.SMTP_SECURE ?? "false")
        .trim()
        .toLowerCase() === "true",
    auth: transportConfig.authUser || process.env.SMTP_USER
      ? {
          user: transportConfig.authUser || process.env.SMTP_USER,
          pass: transportConfig.authPass || process.env.SMTP_PASS
        }
      : undefined
  });

  const result = await transporter.sendMail(message);

  return {
    success: true,
    delivered: true,
    provider: options.providerName || "smtp",
    messageId: result.messageId,
    recipient: message.to
  };
}
