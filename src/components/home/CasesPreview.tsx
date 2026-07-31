import Reveal from "../Reveal";
import { Pill, Section, SectionHead } from "../ui";
import { routeHref } from "@/lib/routes";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n";

const PREVIEW_COUNT = 3;

/**
 * На главной от кейса нужен только результат — задача и решение
 * читаются уже на странице раздела. Так витрина не превращается
 * в три экрана мелкого текста.
 */
export default function CasesPreview({
  dict,
  locale,
}: {
  dict: Dict;
  locale: Locale;
}) {
  const { cases } = dict;

  return (
    <Section tone="night">
      <SectionHead
        title={cases.heading}
        sub={cases.sub}
        dark
        more={{ href: routeHref(locale, "cases"), label: dict.links.allCases }}
      />

      <div className="mt-10 grid gap-4 sm:mt-14 lg:grid-cols-3">
        {cases.items.slice(0, PREVIEW_COUNT).map((item, i) => (
          <Reveal key={item.industry} delay={(i % 3) * 70}>
            <article className="flex h-full flex-col rounded-card bg-night-2 p-6 ring-1 ring-line-dark ring-inset sm:p-7">
              <h3 className="text-xl font-semibold text-balance text-white">
                {item.industry}
              </h3>
              <p className="mt-1 font-mono text-xs text-brand-light">{item.scale}</p>

              <p className="mt-5 flex-1 text-[15px] leading-relaxed text-pretty text-muted-dark">
                {item.result}
              </p>

              <ul className="mt-6 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <li key={tag}>
                    <Pill dark>{tag}</Pill>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
