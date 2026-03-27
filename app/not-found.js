import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section-space">
      <div className="shell-container">
        <div className="glass-panel p-8 text-center">
          <h1 className="font-display text-4xl">Page not found</h1>
          <p className="mt-4 prose-copy">The page you asked for is not available in this MongolWay build.</p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
          >
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
