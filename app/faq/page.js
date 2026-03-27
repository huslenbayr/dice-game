import { PageHero } from "@/components/page-hero";
import { getCurrentLanguage, localize } from "@/lib/i18n";
import { getRepository } from "@/lib/repositories/content-repository";
import { getUiCopy } from "@/lib/ui-copy";

export default async function FaqPage() {
  const language = await getCurrentLanguage();
  const ui = getUiCopy(language);
  const repository = await getRepository();
  const snapshot = await repository.getPublicSnapshot();
  const { site } = snapshot;

  return (
    <>
      <PageHero
        eyebrow={ui.faq.pageLabel}
        title={ui.faq.pageLabel}
        body={localize(site.faqIntro, language)}
        image="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="section-space pt-0">
        <div className="shell-container">
          <div className="glass-panel p-6 sm:p-8 lg:p-10">
            <div className="space-y-4">
              {site.faqs.map((item) => (
                <details key={item.id} className="rounded-[24px] border border-slate-200 bg-white p-5">
                  <summary className="cursor-pointer text-lg font-semibold text-ink">
                    {localize(item.question, language)}
                  </summary>
                  <p className="mt-4 prose-copy">{localize(item.answer, language)}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
