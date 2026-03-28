import { PageHero } from "@/components/page-hero";
import { getRepository } from "@/lib/repositories/content-repository";
import { getCurrentLanguage, localize } from "@/lib/i18n";
import { UI_LOCALES } from "@/lib/translations/ui-locales";
import { getUiCopy } from "@/lib/ui-copy";

export default async function AboutPage() {
  const language = await getCurrentLanguage();
  const ui = getUiCopy(language);
  const repository = await getRepository();
  const snapshot = await repository.getPublicSnapshot();
  const { site, guides, tours } = snapshot;
  const uniqueGuideNames = [...new Set(tours.flatMap((tour) => tour.guideNames))];
  const guideCards = uniqueGuideNames.map((name) => guides.find((guide) => guide.name === name) || {
    id: name,
    name,
    role: {
      en: UI_LOCALES.en.about.fallbackGuideRole,
      mn: UI_LOCALES.mn.about.fallbackGuideRole,
      ja: UI_LOCALES.ja.about.fallbackGuideRole,
      ko: UI_LOCALES.ko.about.fallbackGuideRole,
      es: UI_LOCALES.es.about.fallbackGuideRole
    },
    bio: {
      en: UI_LOCALES.en.about.fallbackGuideBio,
      mn: UI_LOCALES.mn.about.fallbackGuideBio,
      ja: UI_LOCALES.ja.about.fallbackGuideBio,
      ko: UI_LOCALES.ko.about.fallbackGuideBio,
      es: UI_LOCALES.es.about.fallbackGuideBio
    }
  });

  return (
    <>
      <PageHero
        eyebrow={ui.about.pageLabel}
        title={localize(site.about.title, language)}
        body={localize(site.about.intro, language)}
        image="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="section-space pt-0">
        <div className="shell-container grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="glass-panel p-6 sm:p-8">
            <p className="section-label">{site.brandName}</p>
            <h2 className="mt-4 font-display text-3xl">{localize(site.about.approachTitle, language)}</h2>
            <p className="mt-4 prose-copy">{localize(site.about.approachBody, language)}</p>
          </div>
          <div
            className="glass-panel min-h-[320px] bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(34,40,49,0.08), rgba(34,40,49,0.32)), url('https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1600&q=80')"
            }}
          />
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="shell-container">
          <div className="glass-panel p-6 sm:p-8 lg:p-10">
            <p className="section-label">{ui.common.guides}</p>
            <h2 className="mt-4 font-display text-4xl">{ui.about.guidesTitle}</h2>
            <p className="mt-4 max-w-3xl prose-copy">{ui.about.guidesBody}</p>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {guideCards.map((guide, index) => (
                <article key={guide.id} className="surface-soft p-6">
                  <div
                    className="h-56 rounded-[24px] bg-cover bg-center"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(34,40,49,0.08), rgba(34,40,49,0.34)), url('https://images.unsplash.com/photo-${
                        index === 0 ? "1494790108377-be9c29b29330" : index === 1 ? "1438761681033-6461ffad8d80" : "1500648767791-00dcc994a43e"
                      }?auto=format&fit=crop&w=1000&q=80')`
                    }}
                  />
                  <h3 className="mt-5 font-display text-2xl">{guide.name}</h3>
                  <p className="mt-2 text-sm font-semibold text-clay">{localize(guide.role, language)}</p>
                  <p className="mt-4 prose-copy">{localize(guide.bio, language)}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
