"use client";

import { useState } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { HeaderAuthControls } from "@/components/header-auth-controls";
import { LanguageSwitcher } from "@/components/language-switcher";

function MenuButton({ isOpen, onToggle, ui }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-label={isOpen ? ui.common.closeMenu : ui.common.openMenu}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sand transition hover:bg-white/10"
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

export function SiteHeader({ language, site, ui, currentUser }) {
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
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ink/92 backdrop-blur">
      <div className="shell-container py-2.5 sm:py-3">
        <div className="flex items-center gap-3 xl:gap-6">
          <Link href="/" className="flex min-w-0 flex-none items-center gap-3" onClick={closeMenu}>
            <div className="flex h-10 items-center rounded-2xl border border-white/10 bg-sand px-3 py-2 shadow-soft sm:h-11 sm:px-4">
              <BrandLogo brandName={site.brandName} priority />
            </div>
            <div className="hidden min-w-0 2xl:block">
              <p className="truncate text-xs text-white/48">{site.contact.officeLocation}</p>
            </div>
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 xl:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-semibold text-white/72 transition hover:bg-white/10 hover:text-sand"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden flex-none items-center gap-2 xl:flex">
            <LanguageSwitcher language={language} compact />
            <HeaderAuthControls currentUser={currentUser} ui={ui} />
            <Link
              href="/booking"
              className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-full bg-clay px-4 text-sm font-semibold text-sand transition hover:-translate-y-0.5 2xl:px-5"
            >
              {ui.common.startBooking}
            </Link>
          </div>

          <div className="ml-auto flex flex-none items-center gap-2 xl:hidden">
            <LanguageSwitcher language={language} compact />
            <MenuButton isOpen={isMenuOpen} onToggle={() => setIsMenuOpen((current) => !current)} ui={ui} />
          </div>
        </div>

        {isMenuOpen ? (
          <div className="mt-3 rounded-[26px] border border-white/10 bg-sky/95 p-3 shadow-soft xl:hidden">
            <nav className="grid gap-1">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="rounded-2xl px-3 py-2.5 text-sm font-semibold text-sand transition hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-3 border-t border-white/10 pt-3">
              <div className="flex flex-col gap-2">
                <HeaderAuthControls currentUser={currentUser} ui={ui} variant="menu" />
                <Link
                  href="/booking"
                  onClick={closeMenu}
                  className="inline-flex h-10 items-center justify-center rounded-full bg-clay px-4 text-sm font-semibold text-sand transition hover:-translate-y-0.5"
                >
                  {ui.common.startBooking}
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
