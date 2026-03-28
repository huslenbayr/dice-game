"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function LanguageSwitcher({ language, compact = false }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const wrapperClass = compact
    ? "inline-flex h-9 items-center gap-0.5 rounded-full border border-slate-200 bg-white/90 p-0.5 text-[11px] shadow-sm sm:text-xs"
    : "inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/80 p-1 text-sm shadow-sm";
  const buttonClass = compact ? "min-w-[2.3rem] rounded-full px-2.5 py-1.5 font-semibold transition" : "rounded-full px-3 py-2 font-semibold transition";

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
    <div className={wrapperClass}>
      {[
        { code: "mn", label: "MN" },
        { code: "en", label: "EN" }
      ].map((item) => (
        <button
          key={item.code}
          type="button"
          onClick={() => updateLanguage(item.code)}
          disabled={isPending}
          className={`${buttonClass} ${
            language === item.code ? "bg-ink text-white" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
