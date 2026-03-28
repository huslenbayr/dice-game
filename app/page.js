import Link from "next/link";
import { HomeEmailCapture } from "@/components/home-email-capture";
import { PageHero } from "@/components/page-hero";
import { TourCard } from "@/components/tour-card";
import { localize, getCurrentLanguage } from "@/lib/i18n";
import { getRepository } from "@/lib/repositories/content-repository";
import { getUiCopy } from "@/lib/ui-copy";

export default async function HomePage() {
  const language = await getCurrentLanguage();
  const ui = getUiCopy(language);
  const repository = await getRepository();
  const snapshot = await repository.getPublicSnapshot();
  const { site, tours } = snapshot;

  return (
    <>
      <PageHero
        eyebrow={localize(site.home.eyebrow, language)}
        title={localize(site.home.heroTitle, language)}
        body={localize(site.home.heroSubtitle, language)}
        image="https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=80"
        actions={
          <>
            <Link
              href="/tours"
              className="btn-primary px-6"
            >
              {ui.common.exploreTours}
            </Link>
            <Link
              href="/contact"
              className="btn-secondary px-6"
            >
              {ui.common.contact}
            </Link>
          </>
        }
      />

      <section className="section-space pt-0">
        <div className="shell-container">
          <div className="glass-panel p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
              <div>
                <p className="section-label">{ui.home.featuredJourneys}</p>
                <h2 className="mt-4 font-display text-4xl">{localize(site.home.storyTitle, language)}</h2>
                <p className="mt-4 max-w-3xl prose-copy">{localize(site.home.storyBody, language)}</p>
              </div>
              <div className="surface-soft p-5">
                <p className="section-label">{site.brandName}</p>
                <p className="mt-3 text-sm leading-7 text-white/72">{localize(site.home.sectionIntro, language)}</p>
                <div className="mt-5 space-y-3 text-sm text-white/72">
                  <p>
                    <strong className="text-sand">{ui.common.contactPerson}:</strong> {site.contactPerson}
                  </p>
                  <p>
                    <strong className="text-sand">{ui.contact.fields.phone}:</strong> {site.contact.phone}
                  </p>
                  <p>
                    <strong className="text-sand">{ui.contact.fields.email}:</strong> {site.contact.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {tours.map((tour) => (
                <TourCard key={tour.id} tour={tour} language={language} ui={ui} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="shell-container">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="glass-panel p-6 sm:p-8">
              <p className="section-label">{site.brandName}</p>
              <h2 className="mt-4 font-display text-4xl">{ui.home.whyTitle}</h2>
              <p className="mt-4 prose-copy">{ui.home.whyBody}</p>
            </div>
            <div
              className="glass-panel min-h-[320px] bg-cover bg-center"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(34,40,49,0.12), rgba(34,40,49,0.3)), url('https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80')"
              }}
            />
          </div>
        </div>
      </section>

      <HomeEmailCapture ui={ui} />
    </>
  );
}
