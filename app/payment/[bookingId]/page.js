import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { PaymentPanel } from "@/components/payment-panel";
import { PRICE_BASE_CURRENCY } from "@/lib/currency";
import { getCurrentLanguage, localize } from "@/lib/i18n";
import { getPaymentCheckoutContext } from "@/lib/payments/provider";
import { buildPricingContext } from "@/lib/pricing";
import { getRepository } from "@/lib/repositories/content-repository";
import { getExchangeRates } from "@/lib/services/exchange-rate-service";
import { getUiCopy } from "@/lib/ui-copy";

export default async function PaymentPage({ params }) {
  const { bookingId } = await params;
  const language = await getCurrentLanguage();
  const ui = getUiCopy(language);
  const repository = await getRepository();
  const snapshot = await repository.getPublicSnapshot();
  const pricing = buildPricingContext(language, await getExchangeRates());
  const booking = snapshot.bookings.find((item) => item.id === bookingId);

  if (!booking) {
    notFound();
  }

  const tour = snapshot.tours.find((item) => item.id === booking.tourId);
  const rawPaymentSession = snapshot.paymentSessions.find((item) => item.bookingId === booking.id) || null;
  const paymentSession = rawPaymentSession
    ? {
        ...rawPaymentSession,
        method: rawPaymentSession.method || (String(rawPaymentSession.provider || "").includes("qpay") ? "qpay" : "card"),
        reference: rawPaymentSession.reference || rawPaymentSession.id,
        amount: rawPaymentSession.amount || Number(tour?.price || 0) * Number(booking.people || 1),
        currency: rawPaymentSession.currency || PRICE_BASE_CURRENCY,
        applePayEligible: Boolean(rawPaymentSession.applePayEligible),
        deepLink: rawPaymentSession.deepLink || null
      }
    : null;
  const paymentContext = getPaymentCheckoutContext(booking);

  return (
    <>
      <PageHero
        eyebrow={ui.payment.pageLabel}
        title={ui.payment.title}
        body={ui.payment.body}
        image={tour.gallery[1] || tour.gallery[0]}
      />

      <section className="section-space pt-0">
        <div className="shell-container">
          <PaymentPanel
          booking={booking}
          tour={tour}
          paymentSession={paymentSession}
          paymentContext={paymentContext}
          pricing={pricing}
          language={language}
          ui={ui}
        />
        </div>
      </section>
    </>
  );
}
