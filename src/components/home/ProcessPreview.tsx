import Reveal from "../Reveal";
import { bubble, Section, SectionHead } from "../ui";
import { routeHref } from "@/lib/routes";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n";

/**
 * Только названия шагов: на главной важно, что процесс вообще есть
 * и он короткий. Что происходит внутри каждого шага — на /process.
 */
export default function ProcessPreview({
  dict,
  locale,
}: {
  dict: Dict;
  locale: Locale;
}) {
  return (
    <Section>
      <SectionHead
        title={dict.process.heading}
        sub={dict.process.sub}
        more={{
          href: routeHref(locale, "process"),
          label: dict.links.howWeWork,
        }}
      />

      <ol className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-5">
        {dict.process.steps.map((step, i) => (
          <li key={step.title}>
            <Reveal delay={i * 60}>
              <div className={`h-full ${bubble} p-5`}>
                {/* Preflight гасит маркеры списка, поэтому номер рисуем сами. */}
                <span
                  aria-hidden="true"
                  className="text-sm font-medium text-brand tabular-nums"
                >
                  {i + 1}
                </span>
                <p className="mt-3 text-base font-semibold text-balance text-ink">
                  {step.title}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
