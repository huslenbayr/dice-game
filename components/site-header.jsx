import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { HeaderAuthControls } from "@/components/header-auth-controls";
import { LanguageSwitcher } from "@/components/language-switcher";

export function SiteHeader({ language, site, ui, currentUser }) {
  const nav = [
    { href: "/", label: ui.nav.home },
    { href: "/about", label: ui.nav.about },
    { href: "/tours", label: ui.nav.tours },
    { href: "/booking", label: ui.nav.booking },
    { href: "/contact", label: ui.nav.contact },
    { href: "/faq", label: ui.nav.faq }
  ];

  if (currentUser?.role === "admin") {
    nav.push({ href: "/admin", label: ui.nav.admin });
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/90 backdrop-blur">
      <div className="shell-container flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="flex items-center gap-4">
          <div className="rounded-[24px] border border-slate-200 bg-white px-4 py-3 shadow-soft">
            <BrandLogo brandName={site.brandName} priority />
          </div>
          <div>
            <div className="text-sm text-slate-500">{site.contact.officeLocation}</div>
          </div>
        </Link>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <nav className="flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-600">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-wrap items-center gap-3">
            <LanguageSwitcher language={language} />
            <HeaderAuthControls currentUser={currentUser} ui={ui} />
            <Link
              href="/booking"
              className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              {ui.common.startBooking}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
