import Image from "next/image";
import Reveal from "./Reveal";
import { bubble, Section } from "./ui";
import { photos } from "@/content/photos";
import type { Dict } from "@/i18n";

/**
 * Как выглядит работа: крупный снимок с текстом и полоса офиса под ним.
 *
 * Заголовок здесь один на оба ряда. Разделять их на две секции нельзя —
 * «Как устроена работа» и «Где мы работаем» подряд читаются как повтор,
 * а снимки в обоих случаях про одно и то же.
 *
 * Каждый снимок опционален: нет файла в photos — нет и ряда, а если пусто
 * всё, секция не рендерится вовсе. Пустая рамка или сток «на время»
 * оживляют страницу хуже, чем её отсутствие.
 */
export default function Studio({ dict }: { dict: Dict }) {
  const { studio } = dict;
  const strip = photos.office;

  if (!photos.studio && strip.length === 0) return null;

  return (
    <Section id="studio">
      <Reveal>
        {photos.studio ? (
          <div className={`${bubble} overflow-hidden lg:flex lg:items-stretch`}>
            {/* Пропорции исходника заранее неизвестны, поэтому кадр задаёт
                контейнер, а снимок его закрывает по короткой стороне. */}
            <div className="relative aspect-[16/10] lg:aspect-auto lg:w-1/2">
              <Image
                src={photos.studio}
                alt={studio.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="p-6 sm:p-8 lg:w-1/2 lg:self-center lg:p-10">
              <h2 className="text-2xl font-semibold text-balance text-ink sm:text-3xl">
                {studio.heading}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-pretty text-muted sm:text-base">
                {studio.text}
              </p>
            </div>
          </div>
        ) : null}
      </Reveal>

      {strip.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {strip.map((src, i) => (
            <Reveal key={src.src} delay={(i % 3) * 70}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-card">
                <Image
                  src={src}
                  alt={studio.stripAlts[i] ?? ""}
                  fill
                  sizes="(min-width: 640px) 31vw, 92vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>
      ) : null}
    </Section>
  );
}
