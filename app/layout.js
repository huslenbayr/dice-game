import "@/app/globals.css";
import { getCurrentUser } from "@/lib/auth/session";
import { getCurrentLanguage } from "@/lib/i18n";
import { getRepository } from "@/lib/repositories/content-repository";
import { getUiCopy } from "@/lib/ui-copy";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "MongolWay",
  description: "A multilingual tourism website for a new Mongolian travel company."
};

export default async function RootLayout({ children }) {
  const [language, currentUser] = await Promise.all([getCurrentLanguage(), getCurrentUser()]);
  const repository = await getRepository();
  const snapshot = await repository.getPublicSnapshot();
  const ui = getUiCopy(language);

  return (
    <html lang={language}>
      <body className="bg-mongolway-glow font-sans antialiased">
        <div className="min-h-screen">
          <SiteHeader language={language} site={snapshot.site} ui={ui} currentUser={currentUser} />
          <main>{children}</main>
          <SiteFooter language={language} site={snapshot.site} ui={ui} />
        </div>
      </body>
    </html>
  );
}
