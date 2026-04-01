import { getPricingStatusMessage } from "@/lib/pricing";

export function PriceStatusNote({ pricing, ui, className = "" }) {
  const message = getPricingStatusMessage(pricing, ui);

  if (!message) {
    return null;
  }

  return <p className={className}>{message}</p>;
}
