import { useLang } from '../i18n';
import { homeCopy, fill } from '../home-copy';
import { encyclopediaHome, encyclopediaTopics, encyclopediaTotals } from './EncyclopediaSection';

export function Hero() {
  const { lang } = useLang();
  const h = homeCopy(lang);
  const topics = encyclopediaTopics(lang, 6);
  const stats = [
    { value: String(encyclopediaTotals.articles), label: h.statGuides },
    { value: '493', label: h.statTerms },
    { value: String(encyclopediaTotals.langs), label: h.statLangs },
    { value: '10', label: h.statBots },
  ];
  return (
    <section id="top" className="relative -mt-16 flex min-h-screen min-h-[100svh] flex-col overflow-hidden">
      {/* full-bleed banner video */}
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-70"
        src="/banner.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />

      {/* legibility + brand overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-bg-base via-bg-base/70 to-bg-base/40" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-bg-base/95 via-bg-base/50 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute -left-40 top-1/3 -z-10 h-[520px] w-[520px] rounded-full bg-green-500/15 blur-[130px]" aria-hidden />

      <div className="container-x relative flex w-full flex-1 flex-col justify-center pb-8 pt-24 sm:pb-12 sm:pt-28">
        <div className="max-w-4xl">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-500/25 bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-300 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
            {fill(h.badge, { articles: encyclopediaTotals.articles, langs: encyclopediaTotals.langs })}
          </span>

          <h1 className="text-[2.6rem] font-extrabold leading-[1.05] tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)] sm:text-6xl lg:text-[4.25rem]">
            {h.line1}
            <br />
            <span className="gradient-text">{h.line2}</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg md:text-xl">{h.description}</p>

          <div className="mt-7 flex flex-wrap items-center gap-2.5 sm:gap-3">
            <a href={encyclopediaHome(lang)} className="btn-primary px-4 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base">
              <BookIcon />
              <span>{h.ctaLearn}</span>
            </a>
            <a href="#strategies" className="btn-secondary px-4 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base">
              <span>{h.ctaBots}</span>
              <span aria-hidden>→</span>
            </a>
          </div>

          <div className="mt-8 hidden sm:block">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">{h.popular}</div>
            <div className="flex flex-wrap gap-2">
              {topics.map((c) => (
                <a
                  key={c.slug}
                  href={c.url}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-200 backdrop-blur-sm transition-colors hover:border-green-500/50 hover:text-white"
                >
                  <span aria-hidden>{c.icon}</span>
                  {c.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* stats strip along the bottom edge of the banner */}
      <div className="relative border-t border-white/10 bg-bg-base/60 backdrop-blur-md">
        <div className="container-x grid w-full grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="px-1 py-3 sm:px-2 sm:py-5 md:px-5">
              <div className="text-xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl">{s.value}</div>
              <div className="mt-0.5 text-[11px] leading-tight text-zinc-400 sm:mt-1 sm:text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}
