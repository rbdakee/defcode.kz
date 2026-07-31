import Link from "next/link";
import Reveal from "./Reveal";
import { ArrowRight, Section, SectionHead } from "./ui";
import { HOOK_ICONS, IconTile } from "./icons";
import { routeHref, type RouteKey } from "@/lib/routes";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n";

/**
 * Куда ведёт каждая боль. Порядок совпадает с порядком карточек
 * в словаре: держать маршруты рядом с переводами нельзя — тогда
 * ссылку пришлось бы дублировать и чинить в трёх языках сразу.
 */
const TARGETS: RouteKey[] = ["cases", "cases", "services", "process"];

export default function Hooks({ dict, locale }: { dict: Dict; locale: Locale }) {
  return (
    <Section>
      <SectionHead title={dict.hooks.heading} sub={dict.hooks.sub} />

      <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2">
        {dict.hooks.items.map((item, i) => (
          <Reveal key={item.quote} delay={i * 70}>
            <Link
              href={routeHref(locale, TARGETS[i])}
              className="group flex h-full flex-col rounded-card border border-line bg-white p-6 transition-colors hover:border-brand sm:p-7"
            >
              <IconTile icon={HOOK_ICONS[i]} />
              <p className="mt-5 text-lg font-semibold text-balance text-ink sm:text-xl">
                <span aria-hidden="true" className="text-brand">
                  «
                </span>
                {item.quote}
                <span aria-hidden="true" className="text-brand">
                  »
                </span>
              </p>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-pretty text-muted">
                {item.answer}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
