export const THEMES = ["dark", "light"];
export const THEME_COOKIE = "mongolway-theme";
export const DEFAULT_THEME = "dark";

export function normalizeTheme(value) {
  return THEMES.includes(value) ? value : null;
}

export async function getStoredTheme() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  return normalizeTheme(cookieStore.get(THEME_COOKIE)?.value);
}

export function getThemeScript() {
  return `
    (function () {
      try {
        var storageKey = '${THEME_COOKIE}';
        var cookieMatch = document.cookie.match(new RegExp('(?:^|; )' + storageKey + '=([^;]+)'));
        var cookieTheme = cookieMatch ? decodeURIComponent(cookieMatch[1]) : null;
        var savedTheme = null;

        try {
          savedTheme = window.localStorage.getItem(storageKey);
        } catch (storageError) {
          savedTheme = null;
        }

        var theme = savedTheme || cookieTheme;

        if (theme !== 'light' && theme !== 'dark') {
          theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
        }

        document.documentElement.dataset.theme = theme;
        document.documentElement.style.colorScheme = theme;
      } catch (error) {
        document.documentElement.dataset.theme = '${DEFAULT_THEME}';
        document.documentElement.style.colorScheme = '${DEFAULT_THEME}';
      }
    })();
  `;
}
