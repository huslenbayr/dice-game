"use client";

import { useState } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { HeaderAuthControls } from "@/components/header-auth-controls";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";

function MenuButton({ isOpen, onToggle, ui }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-label={isOpen ? ui.common.closeMenu : ui.common.openMenu}
      className="theme-control inline-flex h-10 w-10 items-center justify-center rounded-full transition"
    >
      <span className="relative block h-3.5 w-4">
        <span
          className={`absolute left-0 top-0 h-0.5 w-4 rounded-full bg-current transition ${
            isOpen ? "translate-y-[6px] rotate-45" : ""
          }`}
        />
        <span
          className={`absolute left-0 top-[6px] h-0.5 w-4 rounded-full bg-current transition ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`absolute left-0 top-[12px] h-0.5 w-4 rounded-full bg-current transition ${
            isOpen ? "-translate-y-[6px] -rotate-45" : ""
          }`}
        />
      </span>
    </button>
  );
}

export function SiteHeader({ language, site, ui, currentUser, defaultTheme = null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 pt-3 sm:pt-4">
      <div className="shell-container">
        <div className="theme-header rounded-[30px] border px-3 py-3 backdrop-blur sm:px-4 lg:px-5">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link href="/" className="flex min-w-0 shrink-0 items-center gap-3" onClick={closeMenu}>
              <div className="theme-logo-surface flex h-12 items-center rounded-[22px] px-3.5 py-2 shadow-soft sm:h-14 sm:px-4">
                <BrandLogo brandName={site.brandName} priority />
              </div>
              <div className="hidden min-w-0 2xl:block">
                <p className="truncate text-[11px] font-medium uppercase tracking-[0.22em] faint-text">
                  {site.contact.officeLocation}
                </p>
              </div>
            </Link>

            <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex 2xl:gap-1">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="theme-nav-link whitespace-nowrap rounded-full px-2.5 py-2 text-[12px] font-semibold 2xl:px-3 2xl:py-2.5 2xl:text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="ml-auto hidden shrink-0 items-center gap-2 xl:flex">
              <ThemeToggle ui={ui} compact defaultTheme={defaultTheme} />
              <LanguageSwitcher language={language} compact />
              <HeaderAuthControls currentUser={currentUser} ui={ui} />
              <Link
                href="/booking"
                className="btn-primary btn-cta hidden h-10 whitespace-nowrap px-5 2xl:inline-flex"
              >
                {ui.common.startBooking}
              </Link>
            </div>

            <div className="ml-auto flex shrink-0 items-center gap-2 xl:hidden">
              <ThemeToggle ui={ui} compact defaultTheme={defaultTheme} />
              <LanguageSwitcher language={language} compact />
              <MenuButton isOpen={isMenuOpen} onToggle={() => setIsMenuOpen((current) => !current)} ui={ui} />
            </div>
          </div>

          {isMenuOpen ? (
            <div className="theme-menu mt-3 rounded-[26px] border p-4 shadow-soft xl:hidden">
              <nav className="grid gap-1">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="theme-nav-link rounded-2xl px-3 py-3 text-sm font-semibold"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-4 border-t border-[color:var(--mw-border)] pt-4">
                <div className="flex flex-col gap-2">
                  <HeaderAuthControls currentUser={currentUser} ui={ui} variant="menu" />
                  <Link
                    href="/booking"
                    onClick={closeMenu}
                    className="btn-primary btn-cta inline-flex h-10 px-4"
                  >
                    {ui.common.startBooking}
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
