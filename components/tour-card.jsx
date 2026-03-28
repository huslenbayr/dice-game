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
        <div className="flex flex-wrap items-center gap-2 text-sm text-white/60">
          <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1">
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
            <span key={guide} className="rounded-full border border-white/10 px-3 py-1 text-sm text-white/72">
              {guide}
            </span>
          ))}
        </div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-white/45">{ui.common.from}</p>
            <p className="mt-1 font-display text-3xl">{formatCurrency(tour.price, language)}</p>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/tours/${tour.slug}`}
              className="btn-secondary px-4"
            >
              {ui.common.viewDetails}
            </Link>
            <Link
              href={`/booking?tour=${tour.id}`}
              className="btn-primary px-4"
            >
              {ui.common.startBooking}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
