import Link from "next/link";
import { formatTourPriceRange } from "@/lib/format";
import { localize } from "@/lib/i18n";

export function TourCard({ tour, language, ui }) {
  const route = localize(tour.route, language);
  const overview = localize(tour.overview || tour.intro, language);
  const highlights = localize(tour.highlights, language) || [];

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
            {localize(tour.durationLabel, language)}
          </span>
          <span>{route || localize(tour.destination, language)}</span>
        </div>
        <div>
          <h3 className="font-display text-2xl">{localize(tour.title, language)}</h3>
          <p className="mt-3 prose-copy">{overview}</p>
        </div>
        {highlights.length ? (
          <ul className="space-y-2 text-sm leading-7 muted-text">
            {highlights.slice(0, 4).map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        ) : null}
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="min-w-0">
            <p className="text-sm uppercase tracking-[0.25em] faint-text">Price</p>
            <p className="mt-1 font-display text-3xl">{formatTourPriceRange(tour, language)}</p>
            <p className="mt-1 text-sm muted-text">{ui.common.perPerson}</p>
          </div>
          <div className="flex flex-wrap gap-2 xl:justify-end">
            <Link href={`/tours/${tour.slug}`} className="btn-secondary btn-cta px-4">
              {ui.common.viewDetails}
            </Link>
            <Link href={`/booking?tour=${tour.id}`} className="btn-primary btn-cta px-4">
              {localize({ en: "Book This Tour" }, language)}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
