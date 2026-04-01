import { PageHero } from "@/components/page-hero";
import { getCurrentLanguage, localize } from "@/lib/i18n";
import { getRepository } from "@/lib/repositories/content-repository";
import { getUiCopy } from "@/lib/ui-copy";

export default async function ContactPage() {
  const language = await getCurrentLanguage();
  const ui = getUiCopy(language);
  const repository = await getRepository();
  const snapshot = await repository.getPublicSnapshot();
  const { site } = snapshot;

  return (
    <>
      <PageHero
        eyebrow={ui.contact.pageLabel}
        title={localize(site.contactPage.title, language)}
        body={localize(site.contactPage.body, language)}
        image="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="section-space pt-0">
        <div className="shell-container grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="glass-panel p-6 sm:p-8">
            <p className="section-label">{site.brandName}</p>
            <h2 className="mt-4 font-display text-3xl">{ui.common.contactPerson}</h2>
            <p className="mt-3 prose-copy">{site.contactPerson}</p>
            <div className="mt-6 space-y-4 text-sm muted-text">
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
              <p>
                <strong className="detail-value">{ui.contact.fields.office}:</strong> {site.contact.officeLocation}
              </p>
            </div>
          </div>
          <div
            className="glass-panel min-h-[360px] bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(34,40,49,0.08), rgba(34,40,49,0.34)), url('https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=80')"
            }}
          />
        </div>
      </section>
    </>
  );
}
