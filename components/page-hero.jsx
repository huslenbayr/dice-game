export function PageHero({ eyebrow, title, body, actions, image }) {
  return (
    <section className="section-space pb-6 pt-8 lg:pb-10">
      <div className="shell-container">
        <div className="grid gap-6 overflow-hidden rounded-[34px] border border-white/60 bg-slate-900 text-white shadow-soft lg:grid-cols-[1.08fr_0.92fr]">
          <div className="flex flex-col justify-center px-6 py-8 sm:px-8 lg:px-10 lg:py-12">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">{eyebrow}</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/75">{body}</p>
            {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
          </div>
          <div
            className="min-h-[320px] bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(20,32,43,0.18), rgba(20,32,43,0.42)), url('${image}')`
            }}
          />
        </div>
      </div>
    </section>
  );
}
