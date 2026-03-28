import { sendLeadNotification } from "@/lib/email";
import { logError, logInfo, logWarn } from "@/lib/logging";
import { getRepository } from "@/lib/repositories/content-repository";
import { assertEmailLeadPayload } from "@/lib/validation";

async function sendLeadNotificationSafely(lead) {
  try {
    const emailResult = await sendLeadNotification({ lead });

    if (emailResult?.success) {
      logInfo("lead_email_sent", {
        leadId: lead.id,
        provider: emailResult.provider,
        recipient: emailResult.recipient || process.env.BOOKING_NOTIFICATION_TO || "huslenbayr9779@gmail.com",
        messageId: emailResult.messageId || null
      });
    } else {
      logWarn("lead_email_failed", {
        leadId: lead.id,
        provider: emailResult?.provider || "unknown",
        reason: emailResult?.message || "Email was not delivered."
      });
    }

    return emailResult;
  } catch (error) {
    logError("lead_email_failed", {
      leadId: lead.id,
      provider: process.env.EMAIL_PROVIDER || "auto",
      reason: error.message
    });

    return {
      success: false,
      delivered: false,
      provider: process.env.EMAIL_PROVIDER || "auto",
      message: error.message
    };
  }
}

export async function captureEmailLead(payload) {
  const input = assertEmailLeadPayload(payload);
  const repository = await getRepository();
  const lead = await repository.createEmailLead(input);

  logInfo("lead_saved", {
    leadId: lead.id,
    email: lead.email,
    source: lead.source,
    alreadyExists: Boolean(lead.alreadyExists)
  });

  const emailResult = lead.alreadyExists ? null : await sendLeadNotificationSafely(lead);

  return {
    lead,
    emailResult,
    alreadyExists: Boolean(lead.alreadyExists)
  };
}
