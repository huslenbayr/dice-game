"use client";

import { BrandLogo } from "@/components/brand-logo";
import { localize } from "@/lib/i18n";

export function SiteFooter({ language, site, ui }) {
  return (
    <footer className="section-space">
      <div className="shell-container">
        <div className="theme-footer-surface overflow-hidden rounded-[34px] shadow-soft">
          <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.15fr_0.78fr_0.78fr] lg:px-10 lg:py-10">
            <div className="space-y-5">
              <div className="theme-logo-surface inline-flex rounded-[28px] px-5 py-4 shadow-soft">
                <BrandLogo brandName={site.brandName} variant="footer" />
              </div>
              <h2 className="max-w-xl font-display text-3xl leading-tight detail-value">
                {localize(site.home.heroTitle, language)}
              </h2>
              {site.home?.heroSubtitle ? <p className="max-w-xl prose-copy">{localize(site.home.heroSubtitle, language)}</p> : null}
            </div>
            <div className="space-y-4 text-sm muted-text">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] detail-value">{ui.footer.contactTitle}</p>
              <p>
                <strong className="detail-value">{ui.contact.fields.phone}:</strong>{" "}
                <a className="contact-link" href={`tel:${site.contact.phone.replace(/\s+/g, "")}`}>
                  {site.contact.phone}
                </a>
              </p>
              <p>
                <strong className="detail-value">{ui.contact.fields.email}:</strong>{" "}
                <a className="contact-link" href={`mailto:${site.contact.email}`}>
                  {site.contact.email}
                </a>
              </p>
              {site.contact.whatsapp ? (
                <p>
                  <strong className="detail-value">WhatsApp:</strong>{" "}
                  <a className="contact-link" href={`https://wa.me/${site.contact.whatsapp.replace(/[^\d]/g, "")}`}>
                    {site.contact.whatsapp}
                  </a>
                </p>
              ) : null}
              <p className="leading-7">
                <strong className="detail-value">{ui.common.office}:</strong> {site.contact.officeLocation}
              </p>
            </div>
            <div className="space-y-4 text-sm muted-text">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] detail-value">{ui.common.language}</p>
                <p className="mt-2">{ui.footer.languageTitle}</p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] detail-value">{ui.footer.socialTitle}</p>
              </div>
              <p>
                <a className="theme-link-accent transition" href={site.contact.socialLinks.instagram} target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </p>
              <p>
                <a className="theme-link-accent transition" href={site.contact.socialLinks.facebook} target="_blank" rel="noreferrer">
                  Facebook
                </a>
              </p>
              <p>
                <a className="theme-link-accent transition" href={site.contact.socialLinks.x} target="_blank" rel="noreferrer">
                  X
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
