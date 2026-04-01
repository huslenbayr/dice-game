import { PageHero } from "@/components/page-hero";
import { PriceStatusNote } from "@/components/price-status-note";
import { TourCard } from "@/components/tour-card";
import { getCurrentLanguage } from "@/lib/i18n";
import { buildPricingContext } from "@/lib/pricing";
import { getRepository } from "@/lib/repositories/content-repository";
import { getExchangeRates } from "@/lib/services/exchange-rate-service";
import { getUiCopy } from "@/lib/ui-copy";

export default async function ToursPage() {
  const language = await getCurrentLanguage();
  const ui = getUiCopy(language);
  const repository = await getRepository();
  const snapshot = await repository.getPublicSnapshot();
  const pricing = buildPricingContext(language, await getExchangeRates());

  return (
    <>
      <PageHero
        eyebrow={ui.tours.pageLabel}
        title={ui.home.featuredJourneys}
        body={ui.tours.body}
        image="https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="section-space pt-0">
        <div className="shell-container">
          <PriceStatusNote pricing={pricing} ui={ui} className="mb-4 text-sm muted-text" />
          <div className="grid gap-6 lg:grid-cols-3">
            {snapshot.tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} pricing={pricing} language={language} ui={ui} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
