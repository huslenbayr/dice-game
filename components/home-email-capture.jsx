"use client";

import { useState, useTransition } from "react";

export function HomeEmailCapture({ ui, language }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  function mapErrorMessage(message) {
    const normalized = String(message || "").toLowerCase();

    if (normalized.includes("required")) {
      return ui.home.emailCaptureRequired;
    }

    if (normalized.includes("invalid")) {
      return ui.home.emailCaptureInvalid;
    }

    return ui.home.emailCaptureError;
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
            email,
            source: "homepage",
            language
          })
        });

        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error || ui.home.emailCaptureError);
        }

        setSuccess(ui.home.emailCaptureSuccess);
        setEmail("");
      } catch (submissionError) {
        setError(mapErrorMessage(submissionError.message));
      }
    });
  }

  return (
    <section className="section-space pt-0">
      <div className="shell-container">
        <div className="glass-panel overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="section-label">MongolWay</p>
              <h2 className="mt-4 max-w-2xl font-display text-4xl">{ui.home.emailCaptureTitle}</h2>
              <p className="mt-4 max-w-2xl prose-copy">{ui.home.emailCaptureBody}</p>
            </div>
            <form onSubmit={handleSubmit} className="surface-soft-strong p-4 sm:p-5">
              <label className="field-label">
                <span className="sr-only">{ui.home.emailCapturePlaceholder}</span>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={ui.home.emailCapturePlaceholder}
                    className="field-control flex-1"
                    autoComplete="email"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isPending}
                    className="btn-primary btn-cta min-w-[156px] disabled:opacity-70"
                  >
                    {ui.home.emailCaptureSubmit}
                  </button>
                </div>
              </label>
              <div aria-live="polite" className="min-h-0">
                {error ? <div className="error-box mt-4">{error}</div> : null}
                {success ? <div className="success-box mt-4">{success}</div> : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
