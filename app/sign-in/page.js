import { redirect } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { AuthPanel } from "@/components/auth-panel";
import { getAuthProviders } from "@/lib/auth/config";
import { getCurrentLanguage } from "@/lib/i18n";
import { getCurrentUser, resolveSignedInPath } from "@/lib/auth/session";
import { getUiCopy } from "@/lib/ui-copy";

function getFirstParamValue(value) {
  return Array.isArray(value) ? value[0] : value;
}

function resolveAuthErrorMessage(errorCode, ui) {
  if (String(errorCode || "").startsWith("oauth_google")) {
    return ui.auth.googleErrorMessage;
  }

  return "";
}

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const language = await getCurrentLanguage();
  const ui = getUiCopy(language);
  const currentUser = await getCurrentUser();
  const nextPath = getFirstParamValue(params.next);
  const initialError = resolveAuthErrorMessage(getFirstParamValue(params.error), ui);

  if (currentUser) {
    redirect(resolveSignedInPath(currentUser, nextPath));
  }

  return (
    <>
      <PageHero
        eyebrow={ui.auth.pageLabel}
        title={ui.auth.title}
        body={ui.auth.body}
        image="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="section-space pt-0">
        <div className="shell-container">
          <AuthPanel
            language={language}
            ui={ui}
            nextPath={nextPath}
            providers={getAuthProviders(language)}
            initialError={initialError}
          />
        </div>
      </section>
    </>
  );
}
