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

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.4c-.2 1.2-.9 2.2-1.9 2.9l3 2.3c1.8-1.6 2.8-4.1 2.8-7 0-.7-.1-1.4-.2-2H12Z"
      />
      <path
        fill="#34A853"
        d="M12 21c2.7 0 4.9-.9 6.6-2.4l-3-2.3c-.8.6-2 .9-3.6.9-2.7 0-5-1.8-5.8-4.3l-3.1 2.4C4.8 18.8 8.1 21 12 21Z"
      />
      <path
        fill="#4A90E2"
        d="M6.2 12.9c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9l-3.1-2.4C2.4 8 2 9.5 2 11s.4 3 1.1 4.3l3.1-2.4Z"
      />
      <path
        fill="#FBBC05"
        d="M12 4.8c1.4 0 2.7.5 3.7 1.4l2.8-2.8C16.9 1.9 14.7 1 12 1 8.1 1 4.8 3.2 3.1 6.7l3.1 2.4c.8-2.5 3.1-4.3 5.8-4.3Z"
      />
    </svg>
  );
}

async function readJsonSafely(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export function AuthPanel({ language, ui, nextPath, providers, initialError = "" }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("sign-in");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const googleProvider = providers.find((provider) => provider.id === "google") || null;
  const googleAuthHref = nextPath
    ? `/api/auth/oauth/google?next=${encodeURIComponent(nextPath)}`
    : "/api/auth/oauth/google";
  const displayedError = error || initialError;

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

        const payload = await readJsonSafely(response);

        if (!response.ok) {
          throw new Error(payload?.error || ui.auth.errorMessage);
        }

        setFeedback(ui.auth.successMessage);
        if (!payload?.redirectTo) {
          throw new Error(ui.auth.errorMessage);
        }

        router.push(payload.redirectTo);
        router.refresh();
      } catch (submissionError) {
        const message =
          submissionError instanceof Error && submissionError.message !== "Failed to fetch"
            ? submissionError.message
            : ui.auth.errorMessage;

        setError(message);
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
        {googleProvider ? (
          <>
            <div className="surface-soft-strong rounded-[24px] p-4 sm:p-5">
              {googleProvider.enabled ? (
                <a
                  href={googleAuthHref}
                  className="flex min-h-14 items-center justify-center gap-3 rounded-[18px] border border-[color:var(--mw-border)] bg-[var(--mw-control-bg)] px-5 text-sm font-semibold detail-value transition hover:border-[color:rgba(0,173,181,0.34)] hover:bg-[var(--mw-control-bg-hover)]"
                >
                  <GoogleIcon />
                  <span>{ui.auth.continueWithGoogle}</span>
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="flex min-h-14 w-full cursor-not-allowed items-center justify-center gap-3 rounded-[18px] border border-[color:var(--mw-border)] bg-[var(--mw-control-bg)] px-5 text-sm font-semibold detail-value opacity-70"
                >
                  <GoogleIcon />
                  <span>{ui.auth.continueWithGoogle}</span>
                </button>
              )}
              <p className="mt-3 text-sm leading-6 muted-text">{googleProvider.body}</p>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-[color:var(--mw-border)]" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] faint-text">{ui.auth.orContinueWithEmail}</p>
              <div className="h-px flex-1 bg-[color:var(--mw-border)]" />
            </div>
          </>
        ) : null}

        <div className="theme-control mt-6 inline-flex rounded-full p-1">
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

        {displayedError ? <div className="error-box mt-5">{displayedError}</div> : null}
        {feedback ? <div className="success-box mt-5">{feedback}</div> : null}
      </section>
    </div>
  );
}
