"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { getLanguageOption, LANGUAGE_OPTIONS } from "@/lib/i18n";

export function LanguageSwitcher({ language, compact = false }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const currentLanguage = getLanguageOption(language);
  const buttonClass = compact
    ? "inline-flex h-9 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 text-xs font-semibold text-sand shadow-sm transition hover:bg-white/10 sm:text-sm"
    : "inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm font-semibold text-sand shadow-sm transition hover:bg-white/10";

  function updateLanguage(nextLanguage) {
    setIsOpen(false);

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
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        disabled={isPending}
        aria-expanded={isOpen}
        aria-label={`Language: ${currentLanguage.nativeLabel}`}
        className={buttonClass}
      >
        <span>{currentLanguage.shortLabel}</span>
        <span className={`text-[10px] text-white/45 transition ${isOpen ? "rotate-180" : ""}`}>▼</span>
      </button>

      {isOpen ? (
        <div className="absolute right-0 top-full mt-2 w-40 rounded-2xl border border-white/10 bg-ink p-2 shadow-soft">
          <div className="grid gap-1">
            {LANGUAGE_OPTIONS.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => updateLanguage(item.code)}
                className={`flex items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition ${
                  item.code === language ? "bg-clay text-sand" : "text-sand hover:bg-white/10"
                }`}
              >
                <span>{item.nativeLabel}</span>
                <span className={`text-[11px] font-semibold ${item.code === language ? "text-white/85" : "text-white/45"}`}>
                  {item.shortLabel}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
