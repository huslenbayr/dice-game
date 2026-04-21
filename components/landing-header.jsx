"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { localize } from "@/lib/i18n";
import { BrandLogo } from "@/components/brand-logo";
import { HeaderAuthControls } from "@/components/header-auth-controls";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";

export function LandingHeader({ language, site, ui, currentUser, defaultTheme = null }) {
  const labels = {
    welcome: localize(
      {
        en: "Welcome",
        mn: "Танилцуулга",
        ja: "イントロ",
        ko: "소개",
        es: "Inicio"
      },
      language
    ),
    tours: localize(
      {
        en: "Tours",
        mn: "Аяллууд",
        ja: "ツアー",
        ko: "투어",
        es: "Tours"
      },
      language
    ),
    destinations: localize(
      {
        en: "Destinations",
        mn: "Чиглэлүүд",
        ja: "目的地",
        ko: "여행지",
        es: "Destinos"
      },
      language
    )
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="landing-header-wrap"
    >
      <div className="shell-container">
        <div className="landing-header">
          <Link href="/" className="landing-brand-cluster">
            <span className="landing-logo-frame">
              <BrandLogo brandName={site?.brandName || "MongolWay"} priority />
            </span>
            <span className="landing-brand-mark">mongolway.com</span>
          </Link>

          <nav className="landing-header-nav">
            <a href="#welcome" className="landing-header-link">
              {labels.welcome}
            </a>
            <a href="#featured-tours" className="landing-header-link">
              {labels.tours}
            </a>
            <a href="#destinations" className="landing-header-link">
              {labels.destinations}
            </a>
            <Link href="/contact" className="landing-header-link">
              {ui.nav.contact}
            </Link>
          </nav>

          <div className="landing-header-controls">
            <ThemeToggle ui={ui} compact defaultTheme={defaultTheme} />
            <LanguageSwitcher language={language} compact />
            <div className="hidden sm:flex">
              <HeaderAuthControls currentUser={currentUser} ui={ui} />
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
