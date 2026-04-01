import { getGoogleWorkspaceTransportConfig } from "@/lib/email/config";
import { sendWithSmtpProvider } from "@/lib/email/providers/smtp-email-provider";

export async function sendWithGoogleWorkspaceProvider(message) {
  return sendWithSmtpProvider(message, {
    providerName: "google-workspace",
    transportConfig: getGoogleWorkspaceTransportConfig()
  });
}
