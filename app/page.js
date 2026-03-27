import Link from "next/link";
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
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5"
            >
              {ui.common.exploreTours}
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
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
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">{ui.home.featuredJourneys}</p>
                <h2 className="mt-4 font-display text-4xl">{localize(site.home.storyTitle, language)}</h2>
                <p className="mt-4 max-w-3xl prose-copy">{localize(site.home.storyBody, language)}</p>
              </div>
              <div className="rounded-[28px] bg-slate-50 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">{site.brandName}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{localize(site.home.sectionIntro, language)}</p>
                <div className="mt-5 space-y-3 text-sm text-slate-600">
                  <p>
                    <strong className="text-ink">{ui.common.contactPerson}:</strong> {site.contactPerson}
                  </p>
                  <p>
                    <strong className="text-ink">{ui.contact.fields.phone}:</strong> {site.contact.phone}
                  </p>
                  <p>
                    <strong className="text-ink">{ui.contact.fields.email}:</strong> {site.contact.email}
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
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">{site.brandName}</p>
              <h2 className="mt-4 font-display text-4xl">{ui.home.whyTitle}</h2>
              <p className="mt-4 prose-copy">{ui.home.whyBody}</p>
            </div>
            <div
              className="glass-panel min-h-[320px] bg-cover bg-center"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(20,32,43,0.08), rgba(20,32,43,0.28)), url('https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80')"
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
