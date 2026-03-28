"use client";

import { useEffect, useState, useTransition } from "react";
import { formatCurrency } from "@/lib/format";
import { localize, statusLabel } from "@/lib/i18n";

function MethodCard({ method, selected, recommended, language, ui, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(method.id)}
      className={`rounded-[24px] border p-5 text-left transition ${
        selected ? "border-clay bg-clay/[0.16] text-sand" : "border-white/10 bg-white/5 hover:border-clay/50"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className={`font-semibold ${selected ? "text-sand" : "text-sand"}`}>{localize(method.title, language)}</h3>
          <p className={`mt-2 text-sm leading-6 ${selected ? "text-white/78" : "text-white/65"}`}>
            {localize(method.description, language)}
          </p>
        </div>
        {recommended ? (
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              selected ? "bg-white/12 text-sand" : "bg-white/10 text-white/75"
            }`}
          >
            {ui.common.recommended}
          </span>
        ) : null}
      </div>
    </button>
  );
}

export function PaymentPanel({ booking, tour, paymentSession, paymentContext, language, ui }) {
  const [session, setSession] = useState(paymentSession);
  const [selectedMethod, setSelectedMethod] = useState(paymentSession?.method || paymentContext.recommendedMethodId);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [cardValues, setCardValues] = useState({
    cardholderName: booking.name || "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: ""
  });

  const selectedOption = paymentContext.methods.find((method) => method.id === selectedMethod) || paymentContext.methods[0];
  const sessionOption = paymentContext.methods.find((method) => method.id === session?.method) || selectedOption;
  const bookingAmount = Number(tour.price || 0) * Number(booking.people || 1);

  function handleCardChange(event) {
    const { name, value } = event.target;
    setCardValues((current) => ({
      ...current,
      [name]: value
    }));
  }

  function handleCheckout() {
    setMessage("");
    setError("");

    startTransition(async () => {
      try {
        const response = await fetch("/api/payments/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            bookingId: booking.id,
            method: selectedMethod,
            card: selectedMethod === "card" ? cardValues : undefined
          })
        });

        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error || ui.payment.errorMessage);
        }

        setSession(payload.paymentSession);

        if (payload.paymentSession.method === "card") {
          if (payload.paymentSession.status === "paid") {
            setMessage(ui.payment.cardSuccess);
          } else {
            setError(ui.payment.cardFailed);
          }
        } else {
          setMessage(ui.payment.qpayPrepared);
        }
      } catch (submissionError) {
        setError(submissionError.message);
      }
    });
  }

  useEffect(() => {
    if (!session?.status || session.status !== "pending") {
      return undefined;
    }

    const intervalId = window.setInterval(async () => {
      try {
        const response = await fetch(`/api/payments/status?bookingId=${booking.id}`, {
          cache: "no-store"
        });

        if (!response.ok) {
          return;
        }

        const payload = await response.json();

        if (payload.paymentSession) {
          setSession(payload.paymentSession);
        }
      } catch {
        // Keep polling silent on the client while the server route remains authoritative.
      }
    }, 8000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [booking.id, session?.status]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.92fr]">
      <div className="glass-panel p-6 sm:p-8">
        <p className="section-label">{ui.payment.pageLabel}</p>
        <h2 className="mt-3 font-display text-3xl">{ui.payment.title}</h2>
        <p className="mt-3 prose-copy">{ui.payment.body}</p>

        <div className="surface-soft mt-8 grid gap-4 p-5">
          <div className="flex items-center justify-between gap-4 text-sm text-white/70">
            <span>{ui.booking.fields.tour}</span>
            <strong className="detail-value">{localize(tour.title, language)}</strong>
          </div>
          <div className="flex items-center justify-between gap-4 text-sm text-white/70">
            <span>{ui.booking.fields.date}</span>
            <strong className="detail-value">{booking.date}</strong>
          </div>
          <div className="flex items-center justify-between gap-4 text-sm text-white/70">
            <span>{ui.booking.fields.people}</span>
            <strong className="detail-value">{booking.people}</strong>
          </div>
          <div className="flex items-center justify-between gap-4 text-sm text-white/70">
            <span>{ui.common.paymentSummary}</span>
            <strong className="detail-value">{statusLabel(session?.status || booking.paymentStatus, language)}</strong>
          </div>
          <div className="flex items-center justify-between gap-4 text-sm text-white/70">
            <span>{ui.common.from}</span>
            <strong className="detail-value">{formatCurrency(bookingAmount, language)}</strong>
          </div>
        </div>

        <div className="mt-8">
          <p className="section-label">{ui.payment.methodsTitle}</p>
          <p className="mt-3 text-sm text-white/68">
            {paymentContext.travelerMarket === "local" ? ui.payment.localHint : ui.payment.internationalHint}
          </p>
          <div className="mt-5 grid gap-4">
            {paymentContext.methods.map((method) => (
              <MethodCard
                key={method.id}
                method={method}
                selected={selectedMethod === method.id}
                recommended={paymentContext.recommendedMethodId === method.id}
                language={language}
                ui={ui}
                onSelect={setSelectedMethod}
              />
            ))}
          </div>
        </div>

        {selectedMethod === "card" ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <label className="field-label sm:col-span-2">
              <span>{ui.payment.cardFields.cardholderName}</span>
              <input
                name="cardholderName"
                value={cardValues.cardholderName}
                onChange={handleCardChange}
                className="field-control"
              />
            </label>
            <label className="field-label sm:col-span-2">
              <span>{ui.payment.cardFields.cardNumber}</span>
              <input
                name="cardNumber"
                inputMode="numeric"
                value={cardValues.cardNumber}
                onChange={handleCardChange}
                className="field-control"
              />
            </label>
            <label className="field-label">
              <span>{ui.payment.cardFields.expiryMonth}</span>
              <input
                name="expiryMonth"
                inputMode="numeric"
                value={cardValues.expiryMonth}
                onChange={handleCardChange}
                className="field-control"
              />
            </label>
            <label className="field-label">
              <span>{ui.payment.cardFields.expiryYear}</span>
              <input
                name="expiryYear"
                inputMode="numeric"
                value={cardValues.expiryYear}
                onChange={handleCardChange}
                className="field-control"
              />
            </label>
            <label className="field-label">
              <span>{ui.payment.cardFields.cvc}</span>
              <input
                name="cvc"
                inputMode="numeric"
                value={cardValues.cvc}
                onChange={handleCardChange}
                className="field-control"
              />
            </label>
            <div className="surface-soft px-5 py-4 text-sm text-white/70 sm:col-span-2">
              {ui.payment.applePayNote}
            </div>
          </div>
        ) : (
          <div className="surface-soft mt-8 px-5 py-4 text-sm leading-7 text-white/70">
            {ui.payment.qpayPanelNote}
          </div>
        )}

        {error ? <div className="error-box mt-5">{error}</div> : null}
        {message ? <div className="success-box mt-5">{message}</div> : null}

        <button
          type="button"
          onClick={handleCheckout}
          disabled={isPending}
          className="btn-primary mt-6 disabled:opacity-70"
        >
          {selectedMethod === "card" ? ui.payment.cardSubmit : ui.payment.qpaySubmit}
        </button>
      </div>

      <aside className="glass-panel p-6 sm:p-8">
        <p className="section-label">
          {session?.method === "card" ? ui.payment.cardResultTitle : ui.payment.qpayResultTitle}
        </p>
        {session ? (
          <div className="mt-5 space-y-5">
            {session.method === "qpay" ? (
              <>
                <div className="rounded-[28px] border border-dashed border-white/20 bg-white/5 p-8 text-center">
                  <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-[28px] bg-white/[0.08] text-center text-xs text-white/55 shadow-sm">
                    QPay QR Placeholder
                  </div>
                  <p className="mt-5 text-sm text-white/70">{localize(session.instructions, language)}</p>
                </div>
                <div className="surface-soft p-5">
                  <p className="text-sm font-semibold text-sand">{ui.payment.reference}</p>
                  <p className="mt-2 break-all text-sm text-white/60">{session.reference}</p>
                  <p className="mt-4 text-sm font-semibold text-sand">{ui.payment.deepLink}</p>
                  <p className="mt-2 break-all text-sm text-white/60">{session.deepLink}</p>
                </div>
              </>
            ) : (
              <div className="surface-soft space-y-4 p-5">
                <div className="flex items-center justify-between gap-4 text-sm text-white/70">
                  <span>{ui.common.status}</span>
                  <strong className="detail-value">{statusLabel(session.status, language)}</strong>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm text-white/70">
                  <span>{ui.common.paymentMethod}</span>
                  <strong className="detail-value">{localize(sessionOption.title, language)}</strong>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm text-white/70">
                  <span>{ui.payment.reference}</span>
                  <strong className="detail-value">{session.reference}</strong>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm text-white/70">
                  <span>{ui.common.from}</span>
                  <strong className="detail-value">{formatCurrency(session.amount, language)}</strong>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/70">
                  <p>
                    <strong className="text-sand">{session.cardSummary?.brand || "Card"}</strong>
                    {session.cardSummary?.last4 ? ` ending in ${session.cardSummary.last4}` : ""}
                  </p>
                  <p className="mt-2">{localize(session.instructions, language)}</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-5 rounded-[28px] border border-dashed border-white/20 bg-white/5 p-8 text-center text-sm text-white/60">
            {selectedMethod === "card" ? ui.payment.cardPanelPlaceholder : ui.payment.qpayPanelPlaceholder}
          </div>
        )}
      </aside>
    </div>
  );
}
