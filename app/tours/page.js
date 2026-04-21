import { PageHero } from "@/components/page-hero";
import { TourCard } from "@/components/tour-card";
import { getCurrentLanguage } from "@/lib/i18n";
import { getRepository } from "@/lib/repositories/content-repository";
import { getUiCopy } from "@/lib/ui-copy";
import { getPublishedTours } from "@/lib/tours";

export default async function ToursPage() {
  const language = await getCurrentLanguage();
  const ui = getUiCopy(language);
  const repository = await getRepository();
  const snapshot = await repository.getPublicSnapshot();
  const tours = getPublishedTours(snapshot.tours);

  return (
    <>
      <PageHero
        eyebrow={ui.tours.pageLabel}
        title="Mongolia Tour Packages"
        body="Choose the journey that fits your travel style. Our tours are carefully designed to help you experience Mongolia's nature, culture, and nomadic traditions in comfort and safety."
        image="https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="section-space pt-0">
        <div className="shell-container">
          <div className="grid gap-6 lg:grid-cols-3">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} language={language} ui={ui} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
