import { useT } from '../messages';
import { useLang } from '../i18n';
// Written by ../../generate-encyclopedia.mjs; counts only articles that exist.
import encyclopedia from '../encyclopedia.generated.json';

type Localized = Record<string, string>;
const pick = (m: Localized, lang: string): string => m[lang] ?? m.en;

/** Encyclopedia home for the visitor's language, or the English one if it isn't translated. */
export function encyclopediaHome(lang: string): string {
  return pick(encyclopedia.home as Localized, lang);
}

export function EncyclopediaSection() {
  const t = useT();
  const { lang } = useLang();
  const e = t.encyclopedia;
  const translated = (encyclopedia.langs as string[]).includes(lang);

  return (
    <section id="encyclopedia" className="py-24 border-t border-border-subtle">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-10">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3">{e.eyebrow}</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">{e.headline}</h2>
            <p className="text-lg text-zinc-400 leading-relaxed">
              {e.description}
              {!translated && e.note ? <span className="block mt-2 text-sm text-zinc-500">{e.note}</span> : null}
            </p>
          </div>
          <a href={encyclopediaHome(lang)} className="btn-primary shrink-0 self-start md:self-auto">
            {e.cta}
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {encyclopedia.categories.map((c) => (
            <a
              key={c.slug}
              href={pick(c.url as Localized, lang)}
              className="group flex items-center gap-3 rounded-xl border border-border-subtle bg-bg-elevated px-4 py-3.5 transition-colors hover:border-green-500/50"
            >
              <span className="w-8 shrink-0 text-center text-2xl" aria-hidden>
                {c.icon}
              </span>
              <span className="min-w-0">
                <span className="block font-semibold text-zinc-100 group-hover:text-white leading-snug">
                  {pick(c.name as Localized, lang)}
                </span>
                <span className="block text-xs text-zinc-500">📄 {c.count}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
