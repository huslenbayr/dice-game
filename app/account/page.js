import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { getCurrentLanguage, localize, statusLabel } from "@/lib/i18n";
import { requireAuthenticatedUser } from "@/lib/auth/session";
import { getRepository } from "@/lib/repositories/content-repository";
import { getUiCopy } from "@/lib/ui-copy";

export default async function AccountPage() {
  const language = await getCurrentLanguage();
  const ui = getUiCopy(language);
  const currentUser = await requireAuthenticatedUser("/account");
  const repository = await getRepository();
  const snapshot = await repository.getPublicSnapshot();
  const bookings = await repository.getBookingsForUser({
    userId: currentUser.id,
    email: currentUser.email
  });

  return (
    <>
      <PageHero
        eyebrow={ui.account.pageLabel}
        title={ui.account.title}
        body={ui.account.body}
        image="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="section-space pt-0">
        <div className="shell-container grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
          <aside className="glass-panel p-6 sm:p-8">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">{ui.account.profileTitle}</p>
            <h2 className="mt-4 font-display text-3xl">{currentUser.fullName}</h2>
            <div className="mt-6 space-y-4 text-sm text-slate-600">
              <p>
                <strong className="text-ink">{ui.auth.fields.email}:</strong> {currentUser.email}
              </p>
              <p>
                <strong className="text-ink">{ui.auth.fields.phone}:</strong> {currentUser.phone || "-"}
              </p>
              <p>
                <strong className="text-ink">{ui.auth.fields.nationality}:</strong> {currentUser.nationality || "-"}
              </p>
              <p>
                <strong className="text-ink">{ui.common.accountArea}:</strong>{" "}
                {currentUser.role === "admin" ? ui.nav.admin : ui.account.pageLabel}
              </p>
            </div>
            <Link
              href="/booking"
              className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              {ui.account.bookAnother}
            </Link>
          </aside>

          <div className="glass-panel p-6 sm:p-8">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">{ui.account.bookingsTitle}</p>
            {bookings.length ? (
              <div className="mt-6 space-y-4">
                {bookings.map((booking) => {
                  const tour = snapshot.tours.find((item) => item.id === booking.tourId);
                  const amount = Number(tour?.price || 0) * Number(booking.people || 1);

                  return (
                    <article key={booking.id} className="rounded-[24px] border border-slate-200 bg-white p-5">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                          <h3 className="font-display text-2xl">{localize(booking.tourTitle, language)}</h3>
                          <p className="mt-2 text-sm text-slate-500">{formatDateTime(booking.createdAt, language)}</p>
                        </div>
                        <div className="text-left lg:text-right">
                          <p className="font-display text-2xl">{formatCurrency(amount, language)}</p>
                          <p className="mt-1 text-sm text-slate-500">{booking.date}</p>
                        </div>
                      </div>
                      <div className="mt-5 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                          <span className="block text-xs uppercase tracking-[0.2em] text-slate-400">{ui.booking.fields.people}</span>
                          <strong className="mt-1 block text-ink">{booking.people}</strong>
                        </div>
                        <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                          <span className="block text-xs uppercase tracking-[0.2em] text-slate-400">{ui.common.status}</span>
                          <strong className="mt-1 block text-ink">{statusLabel(booking.status, language)}</strong>
                        </div>
                        <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                          <span className="block text-xs uppercase tracking-[0.2em] text-slate-400">{ui.common.payment}</span>
                          <strong className="mt-1 block text-ink">{statusLabel(booking.paymentStatus, language)}</strong>
                        </div>
                      </div>
                      <Link
                        href={`/payment/${booking.id}`}
                        className="mt-5 inline-flex rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        {ui.account.managePayment}
                      </Link>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="mt-6 rounded-[24px] bg-slate-50 px-5 py-6 text-sm text-slate-600">{ui.account.noBookings}</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
