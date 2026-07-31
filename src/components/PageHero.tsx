import Link from "next/link";
import { Container } from "./ui";
import { routeHref } from "@/lib/routes";
import type { Locale } from "@/i18n/config";

/**
 * Шапка страницы-раздела. Держит то же свечение, что и hero главной,
 * но ниже ростом — раздел не должен притворяться главной страницей.
 * Хлебная крошка нужна не только для SEO: с внутренней страницы
 * должен быть виден путь назад, кроме кнопки «назад» в браузере.
 */
export default function PageHero({
  locale,
  homeLabel,
  title,
  lead,
}: {
  locale: Locale;
  homeLabel: string;
  title: string;
  lead: string;
}) {
  return (
    <section className="relative overflow-hidden pt-10 pb-10 sm:pt-14 sm:pb-12 lg:pt-20 lg:pb-16">
      {/* Радиальный градиент вместо размытого круга: прозрачный край
          не оставляет жёсткой кромки при обрезке по границе секции. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="drift absolute -top-40 -right-24 size-[26rem] bg-radial from-brand/13 to-transparent to-70% sm:size-[34rem]" />
      </div>

      <Container>
        <nav aria-label="breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-muted">
            <li>
              <Link href={routeHref(locale)} className="transition-colors hover:text-brand">
                {homeLabel}
              </Link>
            </li>
            <li aria-hidden="true" className="text-line">
              /
            </li>
            <li aria-current="page" className="text-ink">
              {title}
            </li>
          </ol>
        </nav>

        <h1 className="mt-5 text-3xl leading-[1.08] font-semibold tracking-tight text-balance text-ink sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-pretty text-muted sm:text-lg">
          {lead}
        </p>
      </Container>
    </section>
  );
}
