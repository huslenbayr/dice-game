"use client";

import { useEffect, useState, useTransition } from "react";
import { formatCurrency } from "@/lib/format";

function localize(value, language) {
  return typeof value === "string" ? value : value?.[language] ?? value?.en ?? "";
}

function getStatusLabel(status, language) {
  const labels = {
    pending: language === "mn" ? "Хүлээгдэж буй" : "Pending",
    paid: language === "mn" ? "Төлөгдсөн" : "Paid",
    failed: language === "mn" ? "Амжилтгүй" : "Failed",
    cancelled: language === "mn" ? "Цуцлагдсан" : "Cancelled",
    refunded: language === "mn" ? "Буцаан олгосон" : "Refunded"
  };

  return labels[status] || labels.pending;
}

function MethodCard({ method, selected, recommended, language, ui, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(method.id)}
      className={`rounded-[24px] border p-5 text-left transition ${
        selected ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className={`font-semibold ${selected ? "text-white" : "text-ink"}`}>{localize(method.title, language)}</h3>
          <p className={`mt-2 text-sm leading-6 ${selected ? "text-white/75" : "text-slate-600"}`}>
            {localize(method.description, language)}
          </p>
        </div>
        {recommended ? (
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              selected ? "bg-white/15 text-white" : "bg-slate-100 text-slate-700"
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
          throw new Error(payload.error || "Unable to prepare payment.");
        }

        setSession(payload.paymentSession);

        if (payload.paymentSession.method === "card") {
          if (payload.paymentSession.status === "paid") {
            setMessage(language === "mn" ? "Картын төлбөр амжилттай боллоо." : "Card payment completed successfully.");
          } else {
            setError(language === "mn" ? "Картын төлбөр failed төлөвтэй буцлаа." : "Card payment returned a failed state.");
          }
        } else {
          setMessage(language === "mn" ? "QPay checkout бэлэн боллоо." : "Prepared the QPay checkout flow.");
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
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">{ui.payment.pageLabel}</p>
        <h2 className="mt-3 font-display text-3xl">{ui.payment.title}</h2>
        <p className="mt-3 prose-copy">{ui.payment.body}</p>

        <div className="mt-8 grid gap-4 rounded-[24px] bg-slate-50 p-5">
          <div className="flex items-center justify-between gap-4 text-sm text-slate-600">
            <span>{ui.booking.fields.tour}</span>
            <strong className="text-ink">{localize(tour.title, language)}</strong>
          </div>
          <div className="flex items-center justify-between gap-4 text-sm text-slate-600">
            <span>{ui.booking.fields.date}</span>
            <strong className="text-ink">{booking.date}</strong>
          </div>
          <div className="flex items-center justify-between gap-4 text-sm text-slate-600">
            <span>{ui.booking.fields.people}</span>
            <strong className="text-ink">{booking.people}</strong>
          </div>
          <div className="flex items-center justify-between gap-4 text-sm text-slate-600">
            <span>{ui.common.paymentSummary}</span>
            <strong className="text-ink">{getStatusLabel(session?.status || booking.paymentStatus, language)}</strong>
          </div>
          <div className="flex items-center justify-between gap-4 text-sm text-slate-600">
            <span>{ui.common.from}</span>
            <strong className="text-ink">{formatCurrency(bookingAmount, language)}</strong>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">{ui.payment.methodsTitle}</p>
          <p className="mt-3 text-sm text-slate-600">
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
            <label className="space-y-2 text-sm font-medium text-slate-600 sm:col-span-2">
              <span>{ui.payment.cardFields.cardholderName}</span>
              <input
                name="cardholderName"
                value={cardValues.cardholderName}
                onChange={handleCardChange}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3"
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-600 sm:col-span-2">
              <span>{ui.payment.cardFields.cardNumber}</span>
              <input
                name="cardNumber"
                inputMode="numeric"
                value={cardValues.cardNumber}
                onChange={handleCardChange}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3"
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-600">
              <span>{ui.payment.cardFields.expiryMonth}</span>
              <input
                name="expiryMonth"
                inputMode="numeric"
                value={cardValues.expiryMonth}
                onChange={handleCardChange}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3"
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-600">
              <span>{ui.payment.cardFields.expiryYear}</span>
              <input
                name="expiryYear"
                inputMode="numeric"
                value={cardValues.expiryYear}
                onChange={handleCardChange}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3"
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-600">
              <span>{ui.payment.cardFields.cvc}</span>
              <input
                name="cvc"
                inputMode="numeric"
                value={cardValues.cvc}
                onChange={handleCardChange}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3"
              />
            </label>
            <div className="rounded-[24px] bg-slate-50 px-5 py-4 text-sm text-slate-600 sm:col-span-2">
              {ui.payment.applePayNote}
            </div>
          </div>
        ) : (
          <div className="mt-8 rounded-[24px] bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-600">
            {language === "mn"
              ? "QPay сонголт нь QR болон deep link-д бэлэн байдлаар үүснэ. Жинхэнэ callback баталгаажуулалт дараа нь gateway холболтоор нэмэгдэнэ."
              : "The QPay option creates a QR and deep-link ready session first. Real callback confirmation can be added later at the gateway layer."}
          </div>
        )}

        {error ? <div className="mt-5 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
        {message ? <div className="mt-5 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</div> : null}

        <button
          type="button"
          onClick={handleCheckout}
          disabled={isPending}
          className="mt-6 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-70"
        >
          {selectedMethod === "card" ? ui.payment.cardSubmit : ui.payment.qpaySubmit}
        </button>
      </div>

      <aside className="glass-panel p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
          {session?.method === "card" ? ui.payment.cardResultTitle : ui.payment.qpayResultTitle}
        </p>
        {session ? (
          <div className="mt-5 space-y-5">
            {session.method === "qpay" ? (
              <>
                <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                  <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-[28px] bg-white text-center text-xs text-slate-400 shadow-sm">
                    QPay QR Placeholder
                  </div>
                  <p className="mt-5 text-sm text-slate-600">{localize(session.instructions, language)}</p>
                </div>
                <div className="rounded-[24px] bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-700">{ui.payment.reference}</p>
                  <p className="mt-2 break-all text-sm text-slate-500">{session.reference}</p>
                  <p className="mt-4 text-sm font-semibold text-slate-700">{ui.payment.deepLink}</p>
                  <p className="mt-2 break-all text-sm text-slate-500">{session.deepLink}</p>
                </div>
              </>
            ) : (
              <div className="space-y-4 rounded-[24px] bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-4 text-sm text-slate-600">
                  <span>{ui.common.status}</span>
                  <strong className="text-ink">{getStatusLabel(session.status, language)}</strong>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm text-slate-600">
                  <span>{ui.common.paymentMethod}</span>
                  <strong className="text-ink">{localize(sessionOption.title, language)}</strong>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm text-slate-600">
                  <span>{ui.payment.reference}</span>
                  <strong className="text-ink">{session.reference}</strong>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm text-slate-600">
                  <span>{ui.common.from}</span>
                  <strong className="text-ink">{formatCurrency(session.amount, language)}</strong>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-600">
                  <p>
                    <strong className="text-ink">{session.cardSummary?.brand || "Card"}</strong>
                    {session.cardSummary?.last4 ? ` ending in ${session.cardSummary.last4}` : ""}
                  </p>
                  <p className="mt-2">{localize(session.instructions, language)}</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-5 rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
            {selectedMethod === "card"
              ? language === "mn"
                ? "Энд картаар төлөхийн үр дүн, intent/session лавлагаа, дараа нь Apple Pay capability гарч ирнэ."
                : "This panel will show the card checkout result, session reference, and future Apple Pay capability notes."
              : language === "mn"
                ? "Энд дараа нь QPay-ийн QR, deep link, callback-д суурилсан баталгаажуулалтын төлөв гарч ирнэ."
                : "This panel will later hold the QPay QR, deep link, and callback-driven confirmation state."}
          </div>
        )}
      </aside>
    </div>
  );
}
