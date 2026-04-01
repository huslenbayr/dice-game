import Link from "next/link";
import { HeroVideoBackground } from "@/components/hero-video-background";
import { SmoothScrollButton } from "@/components/smooth-scroll-button";

export function HomeHero({ eyebrow, title, body, ui, scrollTargetId }) {
  return (
    <section className="section-space pb-6 pt-5 sm:pt-6 lg:pb-8 lg:pt-7">
      <div className="shell-container">
        <div
          className="home-hero-shell shadow-soft"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(16,22,28,0.16), rgba(16,22,28,0.42)), url('https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=80')"
          }}
        >
          <HeroVideoBackground src="/huske.mov" playLabel={ui.common.playVideo} />
          <div className="home-hero-overlay" />

          <div className="relative z-10 flex min-h-[72svh] items-center justify-center px-5 py-10 sm:min-h-[78svh] sm:px-8 sm:py-12 lg:min-h-[calc(100svh-8.75rem)] lg:px-12 lg:py-14">
            <div className="mx-auto max-w-3xl text-center text-white">
              <p className="mx-auto max-w-xl text-[11px] uppercase tracking-[0.34em] text-white/72 sm:text-xs">
                {eyebrow}
              </p>
              <h1 className="mx-auto mt-5 max-w-[13ch] font-display text-[3rem] leading-[0.96] sm:text-[4rem] lg:text-[5.15rem]">
                {title}
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/82 sm:text-base sm:leading-8">
                {body}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <SmoothScrollButton targetId={scrollTargetId} className="btn-primary btn-cta px-6">
                  {ui.common.getStarted}
                </SmoothScrollButton>
                <Link href="/tours" className="btn-secondary btn-cta px-6 text-white">
                  {ui.common.exploreTours}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
