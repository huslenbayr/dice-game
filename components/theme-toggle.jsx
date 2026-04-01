"use client";

import { useEffect, useState } from "react";
import { DEFAULT_THEME, THEME_COOKIE } from "@/lib/theme";

function SunIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current">
      <circle cx="12" cy="12" r="4" strokeWidth="1.7" />
      <path
        strokeWidth="1.7"
        strokeLinecap="round"
        d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current">
      <path
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18.5 14.6A7.5 7.5 0 0 1 9.4 5.5a8.5 8.5 0 1 0 9.1 9.1Z"
      />
    </svg>
  );
}

function readTheme(defaultTheme) {
  if (typeof document === "undefined") {
    return defaultTheme || DEFAULT_THEME;
  }

  return document.documentElement.dataset.theme || defaultTheme || DEFAULT_THEME;
}

export function ThemeToggle({ ui, compact = false, defaultTheme = null }) {
  const [theme, setTheme] = useState(() => readTheme(defaultTheme));
  const isLight = theme === "light";
  const nextTheme = isLight ? "dark" : "light";
  const label = isLight ? ui.common.switchToDarkMode : ui.common.switchToLightMode;

  useEffect(() => {
    setTheme(readTheme(defaultTheme));
  }, [defaultTheme]);

  function applyTheme(value) {
    document.documentElement.dataset.theme = value;
    document.documentElement.style.colorScheme = value;
    window.localStorage.setItem(THEME_COOKIE, value);
    document.cookie = `${THEME_COOKIE}=${value}; path=/; max-age=31536000; samesite=lax`;
    setTheme(value);
  }

  return (
    <button
      type="button"
      onClick={() => applyTheme(nextTheme)}
      aria-label={label}
      aria-pressed={isLight}
      title={label}
      className={`theme-control inline-flex items-center justify-center rounded-full transition ${
        compact ? "h-10 w-10" : "h-11 w-11"
      }`}
    >
      {isLight ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
