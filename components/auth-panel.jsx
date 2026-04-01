"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

function ProviderCard({ provider, language }) {
  return (
    <div className="surface-soft p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold detail-value">{provider.title}</h3>
          <p className="mt-2 text-sm leading-6 muted-text">{provider.body}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            provider.enabled ? "bg-[color:rgba(0,173,181,0.14)] text-[color:var(--mw-accent)]" : "theme-control faint-text"
          }`}
        >
          {provider.enabled ? provider.uiActiveLabel : provider.uiPlannedLabel}
        </span>
      </div>
    </div>
  );
}

export function AuthPanel({ language, ui, nextPath, providers }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("sign-in");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function submit(path, formData) {
    setError("");
    setFeedback("");

    startTransition(async () => {
      try {
        const response = await fetch(path, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...formData,
            next: nextPath
          })
        });

        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error || ui.auth.errorMessage);
        }

        setFeedback(ui.auth.successMessage);
        router.push(payload.redirectTo);
        router.refresh();
      } catch (submissionError) {
        setError(submissionError.message);
      }
    });
  }

  function handleSignIn(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    submit("/api/auth/sign-in", {
      email: formData.get("email"),
      password: formData.get("password")
    });
  }

  function handleRegister(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    submit("/api/auth/register", {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      nationality: formData.get("nationality"),
      password: formData.get("password")
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
      <aside className="glass-panel p-6 sm:p-8">
        <p className="section-label">{ui.auth.providersTitle}</p>
        <h2 className="mt-4 font-display text-3xl">{ui.auth.title}</h2>
        <p className="mt-4 prose-copy">{ui.auth.providersBody}</p>
        <div className="mt-6 space-y-4">
          {providers.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} language={language} />
          ))}
        </div>
      </aside>

      <section className="glass-panel p-6 sm:p-8">
        <div className="theme-control inline-flex rounded-full p-1">
          <button
            type="button"
            onClick={() => setActiveTab("sign-in")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTab === "sign-in" ? "theme-control-active" : "theme-nav-link"
            }`}
          >
            {ui.auth.signInTab}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("register")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTab === "register" ? "theme-control-active" : "theme-nav-link"
            }`}
          >
            {ui.auth.registerTab}
          </button>
        </div>

        {activeTab === "sign-in" ? (
          <div className="mt-6">
            <h3 className="font-display text-3xl">{ui.auth.signInTitle}</h3>
            <p className="mt-3 prose-copy">{ui.auth.signInBody}</p>
            <form onSubmit={handleSignIn} className="mt-6 grid gap-4">
              <label className="field-label">
                <span>{ui.auth.fields.email}</span>
                <input
                  name="email"
                  type="email"
                  className="field-control"
                  required
                />
              </label>
              <label className="field-label">
                <span>{ui.auth.fields.password}</span>
                <input
                  name="password"
                  type="password"
                  className="field-control"
                  required
                />
              </label>
              <button
                type="submit"
                disabled={isPending}
                className="btn-primary disabled:opacity-70"
              >
                {ui.auth.submitSignIn}
              </button>
            </form>
          </div>
        ) : (
          <div className="mt-6">
            <h3 className="font-display text-3xl">{ui.auth.registerTitle}</h3>
            <p className="mt-3 prose-copy">{ui.auth.registerBody}</p>
            <form onSubmit={handleRegister} className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="field-label sm:col-span-2">
                <span>{ui.auth.fields.fullName}</span>
                <input
                  name="fullName"
                  className="field-control"
                  required
                />
              </label>
              <label className="field-label">
                <span>{ui.auth.fields.email}</span>
                <input
                  name="email"
                  type="email"
                  className="field-control"
                  required
                />
              </label>
              <label className="field-label">
                <span>{ui.auth.fields.phone}</span>
                <input name="phone" className="field-control" />
              </label>
              <label className="field-label">
                <span>{ui.auth.fields.nationality}</span>
                <input
                  name="nationality"
                  className="field-control"
                />
              </label>
              <label className="field-label">
                <span>{ui.auth.fields.password}</span>
                <input
                  name="password"
                  type="password"
                  className="field-control"
                  required
                />
              </label>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-primary disabled:opacity-70"
                >
                  {ui.auth.submitRegister}
                </button>
              </div>
            </form>
          </div>
        )}

        {error ? <div className="error-box mt-5">{error}</div> : null}
        {feedback ? <div className="success-box mt-5">{feedback}</div> : null}
      </section>
    </div>
  );
}
