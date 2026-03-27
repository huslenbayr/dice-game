import nodemailer from "nodemailer";

export async function sendWithSmtpProvider(message) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || "false") === "true",
    auth: process.env.SMTP_USER
      ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      : undefined
  });

  const result = await transporter.sendMail(message);

  return {
    success: true,
    delivered: true,
    provider: "smtp",
    messageId: result.messageId,
    recipient: message.to
  };
}
