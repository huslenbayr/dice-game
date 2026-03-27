"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/format";

function localize(value, language) {
  return typeof value === "string" ? value : value?.[language] ?? value?.en ?? "";
}

export function BookingForm({ tours, language, ui, initialTourId, currentUser }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const startingTour = tours.find((tour) => tour.id === initialTourId) || tours[0];
  const [values, setValues] = useState({
    tourId: startingTour?.id || "",
    date: startingTour?.dates?.[0] || "",
    people: 2,
    name: currentUser?.fullName || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    nationality: currentUser?.nationality || "",
    specialRequest: ""
  });

  const selectedTour = useMemo(
    () => tours.find((tour) => tour.id === values.tourId) || tours[0],
    [tours, values.tourId]
  );

  const summary = useMemo(() => {
    if (!selectedTour) {
      return null;
    }

    return {
      total: Number(selectedTour.price) * Number(values.people || 1),
      title: localize(selectedTour.title, language),
      date: values.date
    };
  }, [selectedTour, values.people, values.date, language]);

  function handleChange(event) {
    const { name, value } = event.target;
    const nextValues = {
      ...values,
      [name]: name === "people" ? Number(value) : value
    };

    if (name === "tourId") {
      const nextTour = tours.find((tour) => tour.id === value);
      nextValues.date = nextTour?.dates?.[0] || "";
    }

    setValues(nextValues);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    startTransition(async () => {
      try {
        const response = await fetch("/api/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(values)
        });

        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error || "Booking failed.");
        }

        setSuccessMessage(language === "mn" ? "Захиалга амжилттай хадгалагдлаа." : "Booking saved successfully.");

        router.push(payload.nextStep?.paymentUrl || `/payment/${payload.bookingId || payload.booking.id}`);
        router.refresh();
      } catch (submissionError) {
        setError(submissionError.message);
      }
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.92fr]">
      <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">{ui.booking.pageLabel}</p>
          <h2 className="mt-3 font-display text-3xl">{ui.booking.formTitle}</h2>
          <p className="mt-3 prose-copy">{ui.booking.formBody}</p>
          {currentUser ? (
            <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">{ui.booking.signedInHint}</div>
          ) : null}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-600">
            <span>{ui.booking.fields.tour}</span>
            <select
              name="tourId"
              value={values.tourId}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3"
            >
              {tours.map((tour) => (
                <option key={tour.id} value={tour.id}>
                  {localize(tour.title, language)}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-600">
            <span>{ui.booking.fields.date}</span>
            <select
              name="date"
              value={values.date}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3"
            >
              {(selectedTour?.dates || []).map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-600">
            <span>{ui.booking.fields.people}</span>
            <input
              name="people"
              type="number"
              min="1"
              max="12"
              value={values.people}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-600">
            <span>{ui.booking.fields.nationality}</span>
            <input
              name="nationality"
              value={values.nationality}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-600">
            <span>{ui.booking.fields.name}</span>
            <input
              name="name"
              value={values.name}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-600">
            <span>{ui.booking.fields.email}</span>
            <input
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-600 sm:col-span-2">
            <span>{ui.booking.fields.phone}</span>
            <input
              name="phone"
              value={values.phone}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-600 sm:col-span-2">
            <span>{ui.booking.fields.specialRequest}</span>
            <textarea
              name="specialRequest"
              value={values.specialRequest}
              onChange={handleChange}
              rows={5}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3"
            />
          </label>
        </div>
        {error ? <div className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
        {successMessage ? (
          <div className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{successMessage}</div>
        ) : null}
        <button
          type="submit"
          disabled={isPending}
          className="mt-6 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-70"
        >
          {isPending ? "..." : ui.booking.confirm}
        </button>
      </form>

      <aside className="glass-panel p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">{ui.common.bookingSummary}</p>
        {summary ? (
          <div className="mt-5 space-y-5">
            <div
              className="h-64 rounded-[24px] bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(20,32,43,0.08), rgba(20,32,43,0.38)), url('${selectedTour.gallery[0]}')`
              }}
            />
            <div>
              <h3 className="font-display text-3xl">{summary.title}</h3>
              <p className="mt-2 prose-copy">{localize(selectedTour.intro, language)}</p>
            </div>
            <div className="space-y-4 rounded-[24px] bg-slate-50 p-5">
              <div className="flex items-center justify-between gap-4 text-sm text-slate-600">
                <span>{ui.booking.fields.date}</span>
                <strong className="text-ink">{summary.date}</strong>
              </div>
              <div className="flex items-center justify-between gap-4 text-sm text-slate-600">
                <span>{ui.booking.fields.people}</span>
                <strong className="text-ink">{values.people}</strong>
              </div>
              <div className="flex items-center justify-between gap-4 text-sm text-slate-600">
                <span>{ui.common.from}</span>
                <strong className="text-ink">{formatCurrency(summary.total, language)}</strong>
              </div>
            </div>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
