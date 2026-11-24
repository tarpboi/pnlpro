import {
  venues,
  venueRepoUrl,
  venueLogo,
  botById,
  accentClasses,
  TELEGRAM_URL,
  type VenueMeta,
} from '../bots';
import { useState } from 'react';
import { useLang } from '../i18n';
import { useT } from '../messages';
import { homeCopy, fill } from '../home-copy';

const FIRST = 6;

export function VenuesSection() {
  const t = useT();
  const { lang } = useLang();
  const h = homeCopy(lang);
  const [all, setAll] = useState(false);
  const shown = all ? venues : venues.slice(0, FIRST);

  return (
    <section id="venues" className="py-24 border-t border-border-subtle">
      <div className="container-x">
        <div className="max-w-3xl mb-10">
          <div className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3">{t.venues.eyebrow}</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">{t.venues.headline}</h2>
          <p className="text-lg text-zinc-400 leading-relaxed">{t.venues.description}</p>
        </div>

        {/* One flat grid, no per-venue status. The engine is venue-agnostic and each
            venue has its own repo; claiming a live/beta/roadmap state per venue on the
            marketing site is a capability claim we don't want to make here. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {shown.map((v) => (
            <VenueCard key={v.repo} venue={v} />
          ))}
        </div>
        {venues.length > FIRST && (
          <div className="mt-6 flex justify-center">
            <button type="button" onClick={() => setAll((a) => !a)} className="btn-secondary">
              {all ? h.showLess : fill(h.showAll, { n: venues.length })}
            </button>
          </div>
        )}

        <p className="mt-12 text-sm text-zinc-500 max-w-3xl">
          {t.venues.footnote}{' '}
          <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="text-green-400 hover:text-green-300 font-medium">
            {t.venues.footnoteCta}
          </a>
        </p>
      </div>
    </section>
  );
}

function VenueCard({ venue }: { venue: VenueMeta }) {
  const t = useT();
  const { lang } = useLang();

  return (
    <a
      href={venueRepoUrl(venue.repo)}
      target="_blank"
      rel="noreferrer"
      className="card group flex items-center gap-3 p-4 hover:border-green-500/40 transition-colors"
    >
      <img
        src={venueLogo(venue.domain)}
        alt=""
        width={28}
        height={28}
        loading="lazy"
        className="w-7 h-7 rounded-md shrink-0 bg-white/5"
      />
      <div className="min-w-0 flex-1">
        <div className="font-semibold text-white leading-tight truncate">{venue.name}</div>
        <div className="text-xs text-zinc-500 truncate">{(venue.type as Record<string, string>)[lang] ?? venue.type.en}</div>
      </div>
      <div className="flex shrink-0 -space-x-1" title={venue.strategies.map((id) => t.bots.items[id]?.title ?? id).join(', ')}>
        {venue.strategies.slice(0, 4).map((id) => {
          const bot = botById[id];
          if (!bot) return null;
          const accent = accentClasses[bot.accent];
          return (
            <span key={id} className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[11px] ring-2 ring-bg-surface ${accent.bg}`} aria-hidden>
              {bot.emoji}
            </span>
          );
        })}
        {venue.strategies.length > 4 && (
          <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-zinc-800 px-1 text-[10px] font-semibold text-zinc-300 ring-2 ring-bg-surface">
            +{venue.strategies.length - 4}
          </span>
        )}
      </div>
    </a>
  );
}
