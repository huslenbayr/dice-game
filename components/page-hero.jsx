export function PageHero({
  eyebrow,
  title,
  body,
  actions,
  image,
  videoSrc = null,
  variant = "default",
  mediaContent = null
}) {
  const isHome = variant === "home";
  const hasVideo = isHome && Boolean(videoSrc);

  return (
    <section className={isHome ? "section-space pb-6 pt-5 sm:pt-6 lg:pb-10 lg:pt-7" : "section-space pb-6 pt-8 lg:pb-10"}>
      <div className="shell-container">
        <div
          className={`theme-hero-surface grid overflow-hidden rounded-[34px] shadow-soft ${
            isHome
              ? "gap-0 lg:grid-cols-[minmax(0,1.02fr)_minmax(23rem,0.98fr)] xl:grid-cols-[minmax(0,0.96fr)_minmax(26rem,1.04fr)]"
              : "gap-6 lg:grid-cols-[1.08fr_0.92fr]"
          }`}
        >
          <div
            className={`flex flex-col justify-center ${
              isHome
                ? "px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10 xl:px-12 xl:py-12"
                : "px-6 py-8 sm:px-8 lg:px-10 lg:py-12"
            }`}
          >
            <p className={`faint-text uppercase tracking-[0.3em] ${isHome ? "max-w-sm text-[11px] leading-5" : "text-xs"}`}>
              {eyebrow}
            </p>
            <h1
              className={`font-display ${
                isHome
                  ? "mt-4 max-w-[14ch] text-[2.6rem] leading-[0.98] sm:text-[3.2rem] lg:text-[3.85rem] xl:text-[4.4rem]"
                  : "mt-4 max-w-3xl text-4xl leading-tight sm:text-5xl lg:text-6xl"
              }`}
            >
              {title}
            </h1>
            <p
              className={`muted-text ${
                isHome
                  ? "mt-5 max-w-[36rem] text-[15px] leading-7 sm:text-base sm:leading-8"
                  : "mt-5 max-w-2xl text-base leading-8"
              }`}
            >
              {body}
            </p>
            {actions ? <div className={isHome ? "mt-7 flex flex-wrap gap-3" : "mt-8 flex flex-wrap gap-3"}>{actions}</div> : null}
          </div>
          <div
            className={`relative overflow-hidden bg-cover bg-center ${isHome ? "min-h-[280px] sm:min-h-[340px]" : "min-h-[320px]"}`}
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(34,40,49,0.22), rgba(34,40,49,0.48)), url('${image}')`
            }}
          >
            {hasVideo ? (
              <>
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={image}
                >
                  <source src={videoSrc} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,24,39,0.16),rgba(17,24,39,0.48))]" />
              </>
            ) : null}
            {mediaContent ? <div className="hero-media-panel">{mediaContent}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
