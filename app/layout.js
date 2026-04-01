import "@/app/globals.css";
import Script from "next/script";
import { getCurrentUser } from "@/lib/auth/session";
import { getCurrentLanguage } from "@/lib/i18n";
import { getRepository } from "@/lib/repositories/content-repository";
import { getMetadataBase } from "@/lib/site";
import { getStoredTheme, getThemeScript } from "@/lib/theme";
import { getUiCopy } from "@/lib/ui-copy";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const dynamic = "force-dynamic";

export const metadata = {
  metadataBase: getMetadataBase() || undefined,
  title: {
    default: "MongolWay",
    template: "%s | MongolWay"
  },
  applicationName: "MongolWay",
  description: "Thoughtful multilingual journeys across Mongolia with booking, payments, and tailored travel support.",
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
    <html lang={language} data-theme={storedTheme || undefined} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Script id="mongolway-theme-init" strategy="beforeInteractive">
          {getThemeScript()}
        </Script>
        <div className="min-h-screen pb-6 sm:pb-8">
          <SiteHeader
            language={language}
            site={snapshot.site}
            ui={ui}
            currentUser={currentUser}
            defaultTheme={storedTheme}
          />
          <main>{children}</main>
          <SiteFooter language={language} site={snapshot.site} ui={ui} />
        </div>
      </body>
    </html>
  );
}
