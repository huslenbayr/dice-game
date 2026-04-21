"use client";

import { useState, useTransition } from "react";
import { localize } from "@/lib/i18n";

function buildInitialValues(tours, language) {
  return {
    fullName: "",
    email: "",
    country: "",
    travelDates: "",
    travelers: "2",
    tourInterest: localize(tours[0]?.title, language) || "Custom tour",
    message: ""
  };
}

export function ContactInquiryForm({ tours, language }) {
  const [values, setValues] = useState(buildInitialValues(tours, language));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({
      ...current,
      [name]: value
    }));
  }

  function mapErrorMessage(message) {
    const normalized = String(message || "").toLowerCase();

    if (normalized.includes("required")) {
      return "Please complete all required fields before sending your inquiry.";
    }

    if (normalized.includes("invalid")) {
      return "Please enter a valid email address.";
    }

    if (normalized.includes("travelers")) {
      return "Please enter a valid number of travelers.";
    }

    return "We couldn't send your inquiry right now. Please try again.";
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const response = await fetch("/api/leads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...values,
            source: "contact-inquiry",
            language
          })
        });

        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error || "Unable to send inquiry.");
        }

        setSuccess("Thanks for your inquiry. We'll get back to you with the best option for your trip.");
        setValues(buildInitialValues(tours, language));
      } catch (submissionError) {
        setError(mapErrorMessage(submissionError?.message));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8">
      <p className="section-label">Send Inquiry</p>
      <h2 className="mt-4 font-display text-3xl">Tell us about your Mongolia trip.</h2>
      <p className="mt-3 prose-copy">
        Share your travel dates, group size, and destinations you are interested in, and we will help you plan the
        right itinerary.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="field-label">
          <span>Full Name</span>
          <input name="fullName" value={values.fullName} onChange={handleChange} className="field-control" required />
        </label>
        <label className="field-label">
          <span>Email Address</span>
          <input
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            className="field-control"
            autoComplete="email"
            required
          />
        </label>
        <label className="field-label">
          <span>Country</span>
          <input name="country" value={values.country} onChange={handleChange} className="field-control" required />
        </label>
        <label className="field-label">
          <span>Travel Dates</span>
          <input
            name="travelDates"
            value={values.travelDates}
            onChange={handleChange}
            className="field-control"
            placeholder="e.g. July 2026 or 2026-07-10 to 2026-07-24"
            required
          />
        </label>
        <label className="field-label">
          <span>Number of Travelers</span>
          <input
            name="travelers"
            type="number"
            min="1"
            max="20"
            value={values.travelers}
            onChange={handleChange}
            className="field-control"
            required
          />
        </label>
        <label className="field-label">
          <span>Tour Interest</span>
          <select name="tourInterest" value={values.tourInterest} onChange={handleChange} className="field-control">
            {tours.map((tour) => {
              const title = localize(tour.title, language);
              return (
                <option key={tour.id} value={title}>
                  {title}
                </option>
              );
            })}
            <option value="Custom tour">Custom tour</option>
          </select>
        </label>
        <label className="field-label sm:col-span-2">
          <span>Message</span>
          <textarea
            name="message"
            value={values.message}
            onChange={handleChange}
            rows={6}
            className="field-control"
            placeholder="Tell us more about your interests, preferred destinations, or special requests."
            required
          />
        </label>
      </div>
      {error ? <div className="error-box mt-4">{error}</div> : null}
      {success ? <div className="success-box mt-4">{success}</div> : null}
      <button type="submit" disabled={isPending} className="btn-primary btn-cta mt-6 disabled:opacity-70">
        {isPending ? "..." : "Send Inquiry"}
      </button>
    </form>
  );
}
