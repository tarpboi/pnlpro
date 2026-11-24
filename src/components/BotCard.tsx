import type { BotMeta } from '../bots';
import { accentClasses, TELEGRAM_URL } from '../bots';
import { useState } from 'react';
import { useT } from '../messages';
import { useLang } from '../i18n';
import { homeCopy } from '../home-copy';

export function BotCard({ bot, index }: { bot: BotMeta; index: number }) {
  const t = useT();
  const { lang } = useLang();
  const h = homeCopy(lang);
  const [open, setOpen] = useState(false);
  const accent = accentClasses[bot.accent];
  const content = t.bots.items[bot.id];

  if (!content) {
    // Defensive: a translation entry is missing. Render nothing so the page doesn't crash.
    return null;
  }

  return (
    <div className="card p-5 group flex flex-col h-full">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-lg ${accent.bg} ring-1 ${accent.ring} flex items-center justify-center text-xl shadow-lg ${accent.glow}`}
            aria-hidden
          >
            {bot.emoji}
          </div>
          <span className="text-zinc-600 font-mono text-xs">#{String(index + 1).padStart(2, '0')}</span>
        </div>
        <StatusPill status={bot.status} />
      </div>

      <h3 className="text-lg font-bold text-white leading-tight mb-1.5">{content.title}</h3>
      <p className="text-sm text-zinc-400 italic mb-3">{content.tagline}</p>

      <div className={`${accent.bg} border-l-2 ${accent.border} pl-3 py-2 mb-4`}>
        <p className={`text-sm font-semibold ${accent.text} leading-snug`}>{content.hook}</p>
      </div>

      {open && (
        <div className="mb-4">
          <p className="text-sm text-zinc-400 leading-relaxed mb-4">{content.description}</p>
          <div className="border-t border-border-subtle pt-2">
            {content.specs.map((spec) => (
              <div key={spec.label} className="spec-row">
                <span className="spec-label">{spec.label}</span>
                <span className="spec-value">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto flex items-center justify-between gap-3 pt-1">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden className={`transition-transform ${open ? 'rotate-180' : ''}`}>
            <path d="M6 9l6 6 6-6" />
          </svg>
          {open ? h.hide : h.details}
        </button>
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-green-400 hover:text-green-300 transition-colors"
        >
          {t.bots.cardCta}
          <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: BotMeta['status'] }) {
  const t = useT();
  if (status === 'production') {
    return (
      <span className="pill-production">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        {t.bots.statusProduction}
      </span>
    );
  }
  return (
    <span className="pill-dev">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
      {t.bots.statusDev}
    </span>
  );
}
