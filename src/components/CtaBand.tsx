import Link from "next/link";
import { ArrowRight, Container } from "./ui";
import { routeHref } from "@/lib/routes";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n";

/**
 * Завершает каждую страницу-раздела. Сама форма живёт только
 * на странице контактов: одна форма — один адрес, никакой
 * путаницы, куда именно ушла заявка.
 */
export default function CtaBand({ dict, locale }: { dict: Dict; locale: Locale }) {
  const t = dict.ctaBand;

  return (
    <section className="bg-night py-16 text-white sm:py-20 lg:py-24">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl">
              {t.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-pretty text-muted-dark sm:text-lg">
              {t.text}
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href={routeHref(locale, "contacts")}
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-brand px-7 text-base font-semibold text-white transition-transform duration-200 hover:bg-brand-dark active:scale-[0.98]"
            >
              {t.button}
              <ArrowRight />
            </Link>
            <p className="mt-3 text-sm text-muted-dark">{t.note}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
