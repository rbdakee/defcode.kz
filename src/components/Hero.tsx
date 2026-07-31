"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, bubble, Container } from "./ui";
import { stats } from "@/content/company";
import { routeHref } from "@/lib/routes";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n";

const ROTATE_MS = 2600;

/* Колонок ровно столько, сколько цифр заполнено в company.ts: иначе
   при трёх заполненных из четырёх в ряду зияла бы пустая ячейка.
   Классы перечислены целиком — Tailwind ищет их в исходнике по строкам
   и собранную на лету строку вида `sm:grid-cols-${n}` не увидит. */
const STAT_COLUMNS: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
};

export default function Hero({ dict, locale }: { dict: Dict; locale: Locale }) {
  const { hero } = dict;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % hero.rotating.length),
      ROTATE_MS,
    );
    return () => clearInterval(id);
  }, [hero.rotating.length]);

  /* Показываем только заполненные цифры. Пока их нет — качественные
     бейджи, чтобы место под hero не выглядело пустым. */
  const filledStats = [
    { value: stats.years, label: hero.statLabels.years },
    { value: stats.projects, label: hero.statLabels.projects },
    { value: stats.team, label: hero.statLabels.team },
    { value: stats.avgWeeks, label: hero.statLabels.avgWeeks },
  ].filter((s): s is { value: string; label: string } => Boolean(s.value));

  return (
    <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-24 lg:pb-28">
      {/* Декор: мягкое свечение бренда. pointer-events-none, чтобы
          не перехватывать нажатия на мобильном.

          Обрезки по границе секции быть не должно: пятно висит на белом
          и любой срез читается как прямоугольная заплатка. Поэтому здесь
          нет overflow-hidden — пятно гаснет само, а горизонтальный сдвиг
          снимает overflow-x у body. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="drift absolute -top-32 -right-24 size-[28rem] bg-radial from-brand/15 to-transparent to-70% sm:size-[36rem]" />
        <div className="drift absolute -bottom-40 -left-32 size-[22rem] bg-radial from-brand-light/13 to-transparent to-70% [animation-delay:-5s] sm:size-[30rem]" />
      </div>

      <Container>
        {/* Кегль подобран замером: самая длинная фраза ротации занимает
            11.9 × кегля. Отсюда потолок — 23.5px на экране 320, 26.9 на 360,
            30.2 на 400 и 49.7 на 640. Если превысить, фраза переносится
            на две строки, контейнер резервирует их высоту навсегда
            и под короткими вариантами зияет пустая строка.
            Заголовок поэтому занимает всю ширину контейнера: окно кода
            стоит рядом с подзаголовком, а не с ним. */}
        <h1 className="text-[1.4rem] leading-[1.08] font-semibold tracking-tight text-ink min-[360px]:text-[1.6rem] min-[400px]:text-[1.85rem] sm:text-5xl lg:text-6xl xl:text-7xl">
          {/* Для скринридера — обычный связный заголовок.
              Визуальная ротация ниже помечена как декоративная. */}
          <span className="sr-only">
            {hero.lead} {hero.rotating[0]} {hero.tail}
          </span>

          <span aria-hidden="true" className="block">
            <span className="block">{hero.lead}</span>

            {/* Все варианты лежат в одной ячейке грида: контейнер получает
                ширину самого длинного и высоту строки, поэтому при смене
                слова макет не прыгает. */}
            <span className="grid">
              {hero.rotating.map((word, i) => (
                <span
                  key={word}
                  className={`col-start-1 row-start-1 text-brand ${
                    i === index ? "rotate-word" : "invisible"
                  }`}
                >
                  {word}
                </span>
              ))}
            </span>

            {/* pre-line оживляет \n из словаря только на десктопе:
                на телефоне и планшете перенос схлопывается в пробел. */}
            <span className="block lg:whitespace-pre-line">{hero.tail}</span>
          </span>
        </h1>

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-center lg:gap-16">
          <div>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-muted sm:text-lg">
              {hero.subtitle}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={routeHref(locale, "contacts")}
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-brand px-7 text-base font-semibold text-white transition-transform duration-200 hover:bg-brand-dark active:scale-[0.98]"
              >
                {hero.ctaPrimary}
                <ArrowRight />
              </Link>
              <Link
                href={routeHref(locale, "process")}
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-white px-7 text-base font-semibold text-ink ring-1 ring-line ring-inset transition-colors hover:ring-brand"
              >
                {hero.ctaSecondary}
              </Link>
            </div>
          </div>

          <CodeWindow />
        </div>

        {/* Цифры и бейджи — тоже пузыри: линия-разделитель здесь только
            расчерчивала бы белое поле, а заливка отделяет их сама. */}
        <div className="mt-12 sm:mt-16">
          {filledStats.length > 0 ? (
            <dl className={`grid grid-cols-2 gap-3 ${STAT_COLUMNS[filledStats.length]}`}>
              {filledStats.map((stat) => (
                <div key={stat.label} className={`${bubble} p-5`}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-sm text-muted">{stat.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {hero.fallbackBadges.map((badge) => (
                <li
                  key={badge}
                  className={`${bubble} flex items-center gap-2 px-4 py-2.5 text-sm text-muted`}
                >
                  <Check />
                  {badge}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

/**
 * Строки «кода» — плашки, а не текст: чужой код показывать нельзя,
 * а выдуманный листинг читался бы как бутафория. Отступы и цвета
 * повторяют ритм настоящего файла, закрывающая скобка — знак логотипа.
 */
const CODE_LINES: { indent: 0 | 1 | 2; bars: { w: string; c: string }[] }[] = [
  {
    indent: 0,
    bars: [
      { w: "w-12", c: "bg-brand-light/90" },
      { w: "w-24", c: "bg-white/30" },
      { w: "w-5", c: "bg-brand-tint-2/50" },
    ],
  },
  {
    indent: 1,
    bars: [
      { w: "w-16", c: "bg-white/25" },
      { w: "w-10", c: "bg-brand-light/60" },
    ],
  },
  {
    indent: 1,
    bars: [
      { w: "w-24", c: "bg-white/20" },
      { w: "w-8", c: "bg-brand-tint-2/40" },
    ],
  },
  {
    indent: 2,
    bars: [
      { w: "w-14", c: "bg-brand-light/70" },
      { w: "w-16", c: "bg-white/25" },
    ],
  },
  { indent: 2, bars: [{ w: "w-20", c: "bg-white/20" }] },
  {
    indent: 1,
    bars: [
      { w: "w-10", c: "bg-brand-tint-2/45" },
      { w: "w-14", c: "bg-white/25" },
    ],
  },
  {
    indent: 0,
    bars: [
      { w: "w-8", c: "bg-brand-light/80" },
      { w: "w-24", c: "bg-white/20" },
    ],
  },
];

const INDENT = ["", "pl-4", "pl-8"];

function CodeWindow() {
  return (
    <div
      aria-hidden="true"
      className="relative mt-12 w-full max-w-md lg:mt-0 lg:justify-self-end"
    >
      {/* Свечение позади окна — тем же приёмом, что пятна на фоне. */}
      <div className="absolute -inset-8 -z-10 bg-radial from-brand/13 to-transparent to-75%" />

      <div className="overflow-hidden rounded-2xl bg-night shadow-[0_32px_64px_-36px_rgba(14,14,49,0.55)] ring-1 ring-line-dark">
        <div className="flex items-center gap-1.5 border-b border-line-dark px-4 py-3">
          <span className="size-2.5 rounded-full bg-[#ff5f56]/80" />
          <span className="size-2.5 rounded-full bg-[#ffbd2e]/80" />
          <span className="size-2.5 rounded-full bg-[#27c93f]/80" />
          <span className="ml-3 font-mono text-xs text-muted-dark">defcode.kz</span>
        </div>

        <div className="flex flex-col gap-3 p-5 sm:p-6">
          {CODE_LINES.map((line, i) => (
            <div key={i} className={`flex items-center gap-2 ${INDENT[line.indent]}`}>
              {line.bars.map((bar, j) => (
                <span key={j} className={`h-2 rounded-full ${bar.w} ${bar.c}`} />
              ))}
            </div>
          ))}

          <div className="flex items-center gap-1.5 pt-1 font-mono text-sm leading-none text-brand-light">
            {"}"}
            <span className="cursor-blink inline-block h-3.5 w-[7px] rounded-[2px] bg-brand-light/80" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4 shrink-0 text-brand">
      <path
        d="m3.5 8.5 3 3 6-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
