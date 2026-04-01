import { BookingForm } from "@/components/booking-form";
import { PageHero } from "@/components/page-hero";
import { getCurrentUser } from "@/lib/auth/session";
import { getCurrentLanguage } from "@/lib/i18n";
import { getRepository } from "@/lib/repositories/content-repository";
import { getUiCopy } from "@/lib/ui-copy";

export default async function BookingPage({ searchParams }) {
  const params = await searchParams;
  const language = await getCurrentLanguage();
  const ui = getUiCopy(language);
  const repository = await getRepository();
  const snapshot = await repository.getPublicSnapshot();
  const currentUser = await getCurrentUser();

  return (
    <>
      <PageHero
        eyebrow={ui.booking.pageLabel}
        title={ui.booking.formTitle}
        body={ui.booking.formBody}
        image="https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="section-space pt-0">
        <div className="shell-container">
          <BookingForm
            tours={snapshot.tours}
            language={language}
            ui={ui}
            initialTourId={params.tour}
            currentUser={currentUser}
          />
        </div>
      </section>
    </>
  );
}
