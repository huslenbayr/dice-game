import { HomeLandingPage } from "@/components/home-landing-page";
import { getCurrentLanguage } from "@/lib/i18n";
import { getRepository } from "@/lib/repositories/content-repository";
import { getPublishedTours } from "@/lib/tours";

export default async function HomePage() {
  const [language, repository] = await Promise.all([getCurrentLanguage(), getRepository()]);
  const snapshot = await repository.getPublicSnapshot();

  return <HomeLandingPage language={language} tours={getPublishedTours(snapshot.tours)} site={snapshot.site} />;
}
