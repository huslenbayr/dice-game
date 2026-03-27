"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function LanguageSwitcher({ language }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function updateLanguage(nextLanguage) {
    startTransition(async () => {
      await fetch("/api/preferences/language", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ language: nextLanguage })
      });

      router.refresh();
    });
  }

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/80 p-1 text-sm shadow-sm">
      {[
        { code: "mn", label: "MN" },
        { code: "en", label: "EN" }
      ].map((item) => (
        <button
          key={item.code}
          type="button"
          onClick={() => updateLanguage(item.code)}
          disabled={isPending}
          className={`rounded-full px-3 py-2 font-semibold transition ${
            language === item.code ? "bg-ink text-white" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
