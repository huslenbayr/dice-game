import Link from "next/link";
import { formatCurrency } from "@/lib/format";
import { localize } from "@/lib/i18n";

export function TourCard({ tour, language, ui }) {
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
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="min-w-0">
            <p className="text-sm uppercase tracking-[0.25em] faint-text">{ui.common.from}</p>
            <p className="mt-1 font-display text-3xl">{formatCurrency(tour.price, language)}</p>
          </div>
          <div className="flex flex-wrap gap-2 xl:justify-end">
            <Link
              href={`/tours/${tour.slug}`}
              className="btn-secondary btn-cta px-4"
            >
              {ui.common.viewDetails}
            </Link>
            <Link
              href={`/booking?tour=${tour.id}`}
              className="btn-primary btn-cta px-4"
            >
              {ui.common.startBooking}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
