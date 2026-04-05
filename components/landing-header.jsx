"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { localize } from "@/lib/i18n";
import { HeaderAuthControls } from "@/components/header-auth-controls";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";

export function LandingHeader({ language, ui, currentUser, defaultTheme = null }) {
  const labels = {
    experience: localize(
      {
        en: "Experience",
        mn: "Мэдрэмж",
        ja: "体験",
        ko: "무드",
        es: "Experiencia"
      },
      language
    ),
    signature: localize(
      {
        en: "Signature",
        mn: "Онцлог",
        ja: "シグネチャー",
        ko: "시그니처",
        es: "Firma"
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
          <Link href="/" className="landing-brand-mark">
            mongolway.com
          </Link>

          <nav className="landing-header-nav">
            <a href="#experience" className="landing-header-link">
              {labels.experience}
            </a>
            <a href="#signature" className="landing-header-link">
              {labels.signature}
            </a>
            <Link href="/tours" className="landing-header-link">
              {ui.common.exploreTours}
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
