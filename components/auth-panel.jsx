"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

function ProviderCard({ provider, language }) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-ink">{provider.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{provider.body}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            provider.enabled ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
          }`}
        >
          {provider.enabled ? (language === "mn" ? "Идэвхтэй" : "Active") : language === "mn" ? "Бэлтгэсэн" : "Planned"}
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
          throw new Error(payload.error || "Unable to continue.");
        }

        setFeedback(language === "mn" ? "Амжилттай нэвтэрлээ." : "Signed in successfully.");
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
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">{ui.auth.providersTitle}</p>
        <h2 className="mt-4 font-display text-3xl">{ui.auth.title}</h2>
        <p className="mt-4 prose-copy">{ui.auth.providersBody}</p>
        <div className="mt-6 space-y-4">
          {providers.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} language={language} />
          ))}
        </div>
      </aside>

      <section className="glass-panel p-6 sm:p-8">
        <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1">
          <button
            type="button"
            onClick={() => setActiveTab("sign-in")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTab === "sign-in" ? "bg-ink text-white" : "text-slate-600"
            }`}
          >
            {ui.auth.signInTab}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("register")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTab === "register" ? "bg-ink text-white" : "text-slate-600"
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
              <label className="space-y-2 text-sm font-medium text-slate-600">
                <span>{ui.auth.fields.email}</span>
                <input
                  name="email"
                  type="email"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3"
                  required
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-600">
                <span>{ui.auth.fields.password}</span>
                <input
                  name="password"
                  type="password"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3"
                  required
                />
              </label>
              <button
                type="submit"
                disabled={isPending}
                className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-70"
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
              <label className="space-y-2 text-sm font-medium text-slate-600 sm:col-span-2">
                <span>{ui.auth.fields.fullName}</span>
                <input
                  name="fullName"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3"
                  required
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-600">
                <span>{ui.auth.fields.email}</span>
                <input
                  name="email"
                  type="email"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3"
                  required
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-600">
                <span>{ui.auth.fields.phone}</span>
                <input name="phone" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3" />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-600">
                <span>{ui.auth.fields.nationality}</span>
                <input
                  name="nationality"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-600">
                <span>{ui.auth.fields.password}</span>
                <input
                  name="password"
                  type="password"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3"
                  required
                />
              </label>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-70"
                >
                  {ui.auth.submitRegister}
                </button>
              </div>
            </form>
          </div>
        )}

        {error ? <div className="mt-5 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
        {feedback ? <div className="mt-5 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{feedback}</div> : null}
      </section>
    </div>
  );
}
