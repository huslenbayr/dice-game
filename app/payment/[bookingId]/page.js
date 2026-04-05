import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { PaymentPanel } from "@/components/payment-panel";
import { getCurrentLanguage, localize } from "@/lib/i18n";
import { getPaymentCheckoutContext, inferPaymentMethod } from "@/lib/payments/provider";
import { getRepository } from "@/lib/repositories/content-repository";
import { getUiCopy } from "@/lib/ui-copy";

function resolveInitialPaymentFeedback(ui, searchParams) {
  const paymentState = String(searchParams?.payment || "").trim().toLowerCase();
  const method = String(searchParams?.method || "").trim().toLowerCase();

  if (method !== "paypal") {
    return {
      initialMessage: "",
      initialError: ""
    };
  }

  switch (paymentState) {
    case "paid":
      return {
        initialMessage: ui.payment.paypalSuccess,
        initialError: ""
      };
    case "pending":
      return {
        initialMessage: ui.payment.paypalPending,
        initialError: ""
      };
    case "cancelled":
      return {
        initialMessage: "",
        initialError: ui.payment.paypalCancelled
      };
    case "failed":
      return {
        initialMessage: "",
        initialError: ui.payment.paypalFailed
      };
    default:
      return {
        initialMessage: "",
        initialError: ""
      };
  }
}

export default async function PaymentPage({ params, searchParams }) {
  const { bookingId } = await params;
  const resolvedSearchParams = await searchParams;
  const language = await getCurrentLanguage();
  const ui = getUiCopy(language);
  const repository = await getRepository();
  const snapshot = await repository.getPublicSnapshot();
  const booking = snapshot.bookings.find((item) => item.id === bookingId);

  if (!booking) {
    notFound();
  }

  const tour = snapshot.tours.find((item) => item.id === booking.tourId);
  const rawPaymentSession = snapshot.paymentSessions.find((item) => item.bookingId === booking.id) || null;
  const paymentSession = rawPaymentSession
    ? {
        ...rawPaymentSession,
        method: inferPaymentMethod(rawPaymentSession),
        reference: rawPaymentSession.reference || rawPaymentSession.id,
        amount: rawPaymentSession.amount || Number(tour?.price || 0) * Number(booking.people || 1),
        currency: rawPaymentSession.currency || "USD",
        applePayEligible: Boolean(rawPaymentSession.applePayEligible),
        deepLink: rawPaymentSession.deepLink || null
      }
    : null;
  const paymentContext = getPaymentCheckoutContext(booking);
  const { initialMessage, initialError } = resolveInitialPaymentFeedback(ui, resolvedSearchParams);

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
          language={language}
          ui={ui}
          initialMessage={initialMessage}
          initialError={initialError}
        />
        </div>
      </section>
    </>
  );
}
