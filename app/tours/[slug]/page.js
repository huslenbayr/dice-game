import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { PriceStatusNote } from "@/components/price-status-note";
import { getCurrentLanguage, interpolate, localize } from "@/lib/i18n";
import { buildPricingContext, getPriceDisplay } from "@/lib/pricing";
import { getRepository } from "@/lib/repositories/content-repository";
import { getExchangeRates } from "@/lib/services/exchange-rate-service";
import { getUiCopy } from "@/lib/ui-copy";

export default async function TourDetailsPage({ params }) {
  const { slug } = await params;
  const language = await getCurrentLanguage();
  const ui = getUiCopy(language);
  const repository = await getRepository();
  const tour = await repository.getTourBySlug(slug);
  const pricing = buildPricingContext(language, await getExchangeRates());

  if (!tour) {
    return (
      <section className="section-space">
        <div className="shell-container">
          <div className="glass-panel p-8 text-center">
            <h1 className="font-display text-3xl">{ui.tours.notFoundTitle}</h1>
            <p className="mt-4 prose-copy">{ui.tours.notFoundBody}</p>
          </div>
        </div>
      </section>
    );
  }

  const price = getPriceDisplay(tour.price, pricing, language);

  return (
    <>
      <PageHero
        eyebrow={localize(tour.destination, language)}
        title={localize(tour.title, language)}
        body={localize(tour.intro, language)}
        image={tour.gallery[0]}
        actions={
          <Link
            href={`/booking?tour=${tour.id}`}
            className="btn-primary btn-cta px-6"
          >
            {ui.common.startBooking}
          </Link>
        }
      />

      <section className="section-space pt-0">
        <div className="shell-container grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="space-y-6">
            <div className="glass-panel p-6 sm:p-8">
              <p className="section-label">{ui.common.itinerary}</p>
              <div className="mt-6 space-y-4">
                {tour.itinerary.map((item) => (
                  <div key={`${tour.id}-${item.day}`} className="surface-soft p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--mw-accent)]">
                      {interpolate(ui.common.dayLabel, { day: item.day })}
                    </p>
                    <h3 className="mt-3 font-display text-2xl">{localize(item.title, language)}</h3>
                    <p className="mt-3 prose-copy">{localize(item.description, language)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="glass-panel p-6 sm:p-8">
                <p className="section-label">{ui.common.included}</p>
                <ul className="mt-5 space-y-3 text-sm leading-7 muted-text">
                  {localize(tour.included, language).map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="glass-panel p-6 sm:p-8">
                <p className="section-label">{ui.common.excluded}</p>
                <ul className="mt-5 space-y-3 text-sm leading-7 muted-text">
                  {localize(tour.excluded, language).map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="glass-panel p-6 sm:p-8">
              <p className="section-label">{ui.common.bookingSummary}</p>
              <h2 className="mt-4 font-display text-4xl tabular-nums">{price.formatted}</h2>
              <p className="mt-1 text-sm faint-text">{ui.common.perPerson}</p>
              <PriceStatusNote pricing={pricing} ui={ui} className="mt-3 text-sm muted-text" />
              <div className="mt-6 space-y-4 text-sm muted-text">
                <div className="flex items-center justify-between gap-4">
                  <span>{ui.common.dates}</span>
                  <strong className="detail-value">{tour.dates.length}</strong>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>{ui.common.guides}</span>
                  <strong className="detail-value">{tour.guideNames.length}</strong>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {tour.dates.map((date) => (
                  <span key={date} className="rounded-full border border-[color:var(--mw-border)] bg-[var(--mw-control-bg)] px-3 py-2 text-sm muted-text">
                    {date}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {tour.guideNames.map((guide) => (
                  <span key={guide} className="rounded-full border border-[color:var(--mw-border)] px-3 py-2 text-sm muted-text">
                    {guide}
                  </span>
                ))}
              </div>
              <Link
                href={`/booking?tour=${tour.id}`}
                className="btn-primary btn-cta mt-8 px-6"
              >
                {ui.common.startBooking}
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {tour.gallery.map((image, index) => (
                <div
                  key={`${tour.id}-gallery-${index}`}
                  className={`rounded-[28px] bg-cover bg-center ${index === 0 ? "sm:col-span-2 h-64" : "h-44"}`}
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(34,40,49,0.08), rgba(34,40,49,0.3)), url('${image}')`
                  }}
                />
              ))}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
