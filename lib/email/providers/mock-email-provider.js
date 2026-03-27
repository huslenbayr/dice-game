import { getRepository } from "@/lib/repositories/content-repository";

export async function sendWithMockProvider(message, options = {}) {
  const repository = await getRepository();
  const outboxItem = await repository.recordEmailNotification({
    to: message.to,
    from: message.from,
    subject: message.subject,
    html: message.html,
    provider: "mock",
    reason: options.reason || "Stored locally for inspection."
  });

  return {
    success: false,
    delivered: false,
    provider: "mock",
    outboxId: outboxItem.id,
    message: options.reason || "Stored locally instead of sending."
  };
}
