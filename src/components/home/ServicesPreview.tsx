import Link from "next/link";
import Reveal from "../Reveal";
import { ArrowRight, Container, Pill, Section, SectionHead } from "../ui";
import { routeHref } from "@/lib/routes";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n";

/**
 * Витрина услуг на главной. Намеренно короче карточек на странице
 * раздела: здесь задача — показать охват, а не рассказать про каждую
 * услугу. Развёрнутые описания живут на /services.
 */
export default function ServicesPreview({
  dict,
  locale,
}: {
  dict: Dict;
  locale: Locale;
}) {
  return (
    <Section>
      <Container>
        <SectionHead
          title={dict.services.heading}
          sub={dict.services.sub}
          more={{
            href: routeHref(locale, "services"),
            label: dict.links.allServices,
          }}
        />

        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {dict.services.items.map((service, i) => (
            <Reveal key={service.title} delay={(i % 3) * 70}>
              <Link
                href={routeHref(locale, "services")}
                className="group flex h-full flex-col rounded-card border border-line bg-white p-6 transition-colors hover:border-brand"
              >
                <h3 className="flex items-start justify-between gap-4 text-lg font-semibold text-balance text-ink">
                  {service.title}
                  <ArrowRight className="mt-1 text-brand transition-transform duration-200 group-hover:translate-x-1" />
                </h3>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <li key={tag}>
                      <Pill>{tag}</Pill>
                    </li>
                  ))}
                </ul>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
