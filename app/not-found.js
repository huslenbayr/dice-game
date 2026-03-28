import Link from "next/link";
import { getCurrentLanguage } from "@/lib/i18n";
import { getUiCopy } from "@/lib/ui-copy";

export default async function NotFound() {
  const language = await getCurrentLanguage();
  const ui = getUiCopy(language);

  return (
    <section className="section-space">
      <div className="shell-container">
        <div className="glass-panel p-8 text-center">
          <h1 className="font-display text-4xl">{ui.notFound.title}</h1>
          <p className="mt-4 prose-copy">{ui.notFound.body}</p>
          <Link
            href="/"
            className="btn-primary mt-6 px-6"
          >
            {ui.common.backHome}
          </Link>
        </div>
      </div>
    </section>
  );
}
