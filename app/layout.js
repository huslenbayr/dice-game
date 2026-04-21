import "@/app/globals.css";
import Script from "next/script";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { getCurrentUser } from "@/lib/auth/session";
import { getCurrentLanguage } from "@/lib/i18n";
import { getRepository } from "@/lib/repositories/content-repository";
import { getMetadataBase } from "@/lib/site";
import { getStoredTheme, getThemeScript } from "@/lib/theme";
import { getUiCopy } from "@/lib/ui-copy";
import { AppChrome } from "@/components/app-chrome";

const sansFont = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

export const dynamic = "force-dynamic";

export const metadata = {
  metadataBase: getMetadataBase() || undefined,
  title: {
    default: "MongolWay",
    template: "%s | MongolWay"
  },
  applicationName: "MongolWay",
  description: "Discover the real Mongolia through authentic journeys, nomadic culture, and unforgettable adventures.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "MongolWay",
    statusBarStyle: "black-translucent"
  }
};

export const viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: dark)",
      color: "#222831"
    },
    {
      media: "(prefers-color-scheme: light)",
      color: "#f6f8fb"
    }
  ]
};

export default async function RootLayout({ children }) {
  const [language, currentUser, storedTheme] = await Promise.all([
    getCurrentLanguage(),
    getCurrentUser(),
    getStoredTheme()
  ]);
  const repository = await getRepository();
  const snapshot = await repository.getPublicSnapshot();
  const ui = getUiCopy(language);

  return (
    <html
      lang={language}
      data-theme={storedTheme || undefined}
      suppressHydrationWarning
      className={`${sansFont.variable} ${displayFont.variable}`}
    >
      <body className="font-sans antialiased">
        <Script id="mongolway-theme-init" strategy="beforeInteractive">
          {getThemeScript()}
        </Script>
        <AppChrome
          language={language}
          site={snapshot.site}
          ui={ui}
          currentUser={currentUser}
          defaultTheme={storedTheme}
        >
          {children}
        </AppChrome>
      </body>
    </html>
  );
}
