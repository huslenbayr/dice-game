import { getEmailProvider } from "@/lib/email/config";
import { sendLeadEmails } from "@/lib/email";
import { logError, logInfo, logWarn } from "@/lib/logging";
import { getRepository } from "@/lib/repositories/content-repository";
import { assertEmailLeadPayload } from "@/lib/validation";

function buildEmailFailureResult(error, recipient = null) {
  return {
    success: false,
    delivered: false,
    provider: getEmailProvider(),
    recipient,
    message: error.message
  };
}

function logEmailResult(eventName, lead, result) {
  if (!result) {
    return;
  }

  if (result.success) {
    logInfo(`${eventName}_sent`, {
      leadId: lead.id,
      provider: result.provider,
      recipient: result.recipient || null,
      messageId: result.messageId || null
    });

    return;
  }

  logWarn(`${eventName}_failed`, {
    leadId: lead.id,
    provider: result.provider || "unknown",
    recipient: result.recipient || null,
    reason: result.message || "Email was not delivered."
  });
}

async function sendLeadNotificationSafely(lead, language) {
  try {
    const emailResults = await sendLeadEmails({ lead, language });
    logEmailResult("lead_admin_email", lead, emailResults.adminNotification);
    logEmailResult("lead_traveler_email", lead, emailResults.travelerAutoReply);
    return emailResults;
  } catch (error) {
    logError("lead_email_failed", {
      leadId: lead.id,
      provider: getEmailProvider(),
      reason: error.message
    });

    return {
      adminNotification: buildEmailFailureResult(error),
      travelerAutoReply: buildEmailFailureResult(error, lead.email)
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

  const emailResults = lead.alreadyExists ? null : await sendLeadNotificationSafely(lead, input.language);

  return {
    lead,
    emailResult: emailResults?.adminNotification || null,
    travelerEmailResult: emailResults?.travelerAutoReply || null,
    alreadyExists: Boolean(lead.alreadyExists)
  };
}
