import Link from "next/link";
import { localize } from "@/lib/i18n";
import { getPriceDisplay } from "@/lib/pricing";

export function TourCard({ tour, pricing, language, ui }) {
  const price = getPriceDisplay(tour.price, pricing, language);

  return (
    <article className="glass-panel overflow-hidden">
      <div
        className="h-64 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(20,32,43,0.08), rgba(20,32,43,0.3)), url('${tour.gallery[0]}')`
        }}
      />
      <div className="space-y-5 p-6">
        <div className="flex flex-wrap items-center gap-2 text-sm muted-text">
          <span className="rounded-full border border-[color:var(--mw-border)] bg-[var(--mw-control-bg)] px-3 py-1">
            {localize(tour.destination, language)}
          </span>
          <span>{localize(tour.durationLabel, language)}</span>
        </div>
        <div>
          <h3 className="font-display text-2xl">{localize(tour.title, language)}</h3>
          <p className="mt-3 prose-copy">{localize(tour.intro, language)}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tour.guideNames.map((guide) => (
            <span key={guide} className="rounded-full border border-[color:var(--mw-border)] px-3 py-1 text-sm muted-text">
              {guide}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] faint-text">{ui.common.from}</p>
            <p className="mt-1 font-display text-3xl tabular-nums">{price.formatted}</p>
          </div>
          <div className="grid w-full gap-2 sm:w-auto sm:min-w-[17rem] sm:grid-cols-2">
            <Link
              href={`/tours/${tour.slug}`}
              className="btn-secondary btn-cta inline-flex min-h-12 w-full items-center justify-center px-4 text-center leading-5 whitespace-normal"
            >
              {ui.common.viewDetails}
            </Link>
            <Link
              href={`/booking?tour=${tour.id}`}
              className="btn-primary btn-cta inline-flex min-h-12 w-full items-center justify-center px-4 text-center leading-5 whitespace-normal"
            >
              {ui.common.startBooking}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
