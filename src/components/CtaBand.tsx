import Link from "next/link";
import { ArrowRight, Section } from "./ui";
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
    <Section>
      {/* Единственный цветной пузырь на сайте — им заканчивается страница,
          поэтому призыв не спорит за внимание ни с чем выше. */}
      <div className="relative overflow-hidden rounded-card bg-linear-to-br from-brand to-brand-dark px-6 py-10 text-white sm:px-10 sm:py-12 lg:px-14 lg:py-14">
        {/* Скобка из логотипа как водяной знак — жест бренда, не нумерация. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 -bottom-24 font-mono text-[16rem] leading-none text-white/6 select-none"
        >
          {"}"}
        </span>

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl">
              {t.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-pretty text-white/80 sm:text-lg">
              {t.text}
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href={routeHref(locale, "contacts")}
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-white px-7 text-base font-semibold text-brand-dark transition-transform duration-200 hover:bg-brand-tint active:scale-[0.98]"
            >
              {t.button}
              <ArrowRight />
            </Link>
            <p className="mt-3 text-sm text-white/70">{t.note}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
