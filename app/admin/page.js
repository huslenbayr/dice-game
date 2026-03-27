import { PageHero } from "@/components/page-hero";
import { AdminDashboard } from "@/components/admin-dashboard";
import { requireAdminUser } from "@/lib/auth/session";
import { getCurrentLanguage } from "@/lib/i18n";
import { getRepository } from "@/lib/repositories/content-repository";
import { getUiCopy } from "@/lib/ui-copy";

export default async function AdminPage() {
  await requireAdminUser("/admin");
  const language = await getCurrentLanguage();
  const ui = getUiCopy(language);
  const repository = await getRepository();
  const snapshot = await repository.getAdminSnapshot();

  const body =
    language === "mn"
      ? "Жишиг аяллууд, хоёр хэл дээрх агуулга, холбоо барих мэдээлэл, захиалга болон төлбөрийн placeholder төлөвүүдийг нэг дороос удирдана."
      : "Manage sample tours, bilingual content, contact details, bookings, and payment placeholder states from one place.";

  return (
    <>
      <PageHero
        eyebrow={ui.admin.pageLabel}
        title={ui.admin.siteTitle}
        body={body}
        image="https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="section-space pt-0">
        <div className="shell-container">
          <AdminDashboard snapshot={snapshot} language={language} ui={ui} />
        </div>
      </section>
    </>
  );
}
