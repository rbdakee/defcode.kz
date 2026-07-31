import Reveal from "./Reveal";
import { Pill, Section } from "./ui";
import { IconTile, SERVICE_ICONS } from "./icons";
import type { Dict } from "@/i18n";

/**
 * Полные карточки услуг — только на странице раздела. Заголовок
 * страницы даёт PageHero, поэтому названия услуг здесь верхний
 * уровень заголовков внутри контента.
 */
export default function Services({ dict }: { dict: Dict }) {
  return (
    <Section id="services">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dict.services.items.map((service, i) => (
          <Reveal key={service.title} delay={(i % 3) * 70}>
            <article className="flex h-full flex-col rounded-card border border-line bg-white p-6 transition-shadow duration-300 hover:shadow-[0_18px_40px_-24px_rgba(14,14,49,0.3)] sm:p-7">
              <IconTile icon={SERVICE_ICONS[i]} />
              <h2 className="mt-4 text-xl font-semibold text-balance text-ink">
                {service.title}
              </h2>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-pretty text-muted">
                {service.desc}
              </p>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {service.tags.map((tag) => (
                  <li key={tag}>
                    <Pill>{tag}</Pill>
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
