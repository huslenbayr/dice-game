import { BrandLogo } from "@/components/brand-logo";
import { localize } from "@/lib/i18n";

export function SiteFooter({ language, site, ui }) {
  return (
    <footer className="section-space">
      <div className="shell-container">
        <div className="overflow-hidden rounded-[34px] border border-white/10 bg-ink text-sand shadow-soft">
          <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.15fr_0.78fr_0.78fr] lg:px-10 lg:py-10">
            <div className="space-y-5">
              <div className="inline-flex rounded-[28px] border border-white/10 bg-sand px-5 py-4 shadow-soft">
                <BrandLogo brandName={site.brandName} variant="footer" />
              </div>
              <h2 className="max-w-xl font-display text-3xl leading-tight text-sand">
                {localize(site.home.heroTitle, language)}
              </h2>
            </div>
            <div className="space-y-4 text-sm text-white/72">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sand">{ui.footer.contactTitle}</p>
              <p>
                <strong className="text-sand">{ui.contact.fields.phone}:</strong> {site.contact.phone}
              </p>
              <p>
                <strong className="text-sand">{ui.contact.fields.email}:</strong> {site.contact.email}
              </p>
              <p className="leading-7">
                <strong className="text-sand">{ui.common.office}:</strong> {site.contact.officeLocation}
              </p>
            </div>
            <div className="space-y-4 text-sm text-white/72">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sand">{ui.common.language}</p>
                <p className="mt-2">{ui.footer.languageTitle}</p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sand">{ui.footer.socialTitle}</p>
              </div>
              <p>
                <a className="transition hover:text-clay" href={site.contact.socialLinks.instagram} target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </p>
              <p>
                <a className="transition hover:text-clay" href={site.contact.socialLinks.facebook} target="_blank" rel="noreferrer">
                  Facebook
                </a>
              </p>
              <p>
                <a className="transition hover:text-clay" href={site.contact.socialLinks.x} target="_blank" rel="noreferrer">
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
