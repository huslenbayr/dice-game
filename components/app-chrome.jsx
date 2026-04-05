"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LandingHeader } from "@/components/landing-header";
import { CustomCursor } from "@/components/custom-cursor";

export function AppChrome({ children, language, site, ui, currentUser, defaultTheme = null }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className={`min-h-screen ${isHome ? "landing-home" : "pb-6 sm:pb-8"}`}>
      {isHome ? (
        <>
          <CustomCursor />
          <LandingHeader
            language={language}
            ui={ui}
            currentUser={currentUser}
            defaultTheme={defaultTheme}
          />
        </>
      ) : (
        <SiteHeader
          language={language}
          site={site}
          ui={ui}
          currentUser={currentUser}
          defaultTheme={defaultTheme}
        />
      )}
      <main>{children}</main>
      {isHome ? null : <SiteFooter language={language} site={site} ui={ui} />}
    </div>
  );
}
