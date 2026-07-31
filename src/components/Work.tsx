import Image, { type StaticImageData } from "next/image";
import Reveal from "./Reveal";
import { bubble, bubbleLink, Section, SectionHead } from "./ui";
import { routeHref } from "@/lib/routes";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n";

import kazkioti from "@/assets/work/kazkioti.jpg";
import playincode from "@/assets/work/playincode.jpg";
import saqtagoOnboarding from "@/assets/work/saqtago-onboarding.jpg";
import saqtagoHome from "@/assets/work/saqtago-home.jpg";
import saqtagoOrder from "@/assets/work/saqtago-order.jpg";

type Shot =
  | { kind: "browser"; image: StaticImageData; domain: string }
  | { kind: "phones"; images: StaticImageData[] };

/**
 * Картинки лежат здесь, а не в словаре: словарь переводят, а файл один
 * на все языки. Порядок соответствует dict.work.items — подписи и снимок
 * одной работы всегда берутся по одному индексу.
 *
 * У приложения три экрана: в середине главная — она лучше всего объясняет
 * продукт, по бокам онбординг и заказ. Одиночный телефон оставлял по краям
 * плитки пустые поля, а веером кадр заполняется целиком.
 */
const SHOTS: Shot[] = [
  { kind: "browser", image: kazkioti, domain: "kazkioti.kz" },
  { kind: "browser", image: playincode, domain: "school.playincode.com" },
  { kind: "phones", images: [saqtagoOnboarding, saqtagoHome, saqtagoOrder] },
];

/**
 * Работы, которые можно показать целиком. Сюда попадают только публичные
 * сайты (с разрешения владельца) и собственные продукты — внутренние
 * системы клиентов остаются в кейсах, текстом. Это же правило описано
 * в гарантиях и FAQ, и расходиться с ними блок не должен.
 */
export default function Work({
  dict,
  locale,
  more = false,
}: {
  dict: Dict;
  locale: Locale;
  /** На главной ведём в кейсы, на самой странице кейсов ссылка не нужна. */
  more?: boolean;
}) {
  const { work } = dict;

  return (
    <Section id="work">
      <SectionHead
        title={work.heading}
        sub={work.sub}
        more={
          more
            ? { href: routeHref(locale, "cases"), label: dict.links.allCases }
            : undefined
        }
      />

      <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
        {work.items.map((item, i) => {
          const shot = SHOTS[i];
          if (!shot) return null;

          const body = (
            <>
              {shot.kind === "phones" ? (
                <PhoneFan images={shot.images} alt={item.alt} />
              ) : (
                <BrowserShot
                  image={shot.image}
                  alt={item.alt}
                  domain={shot.domain}
                  priority={i === 0}
                />
              )}

              <div className="mt-5 flex flex-1 flex-col">
                <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-1 font-mono text-xs text-brand">{item.kind}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-pretty text-muted">
                  {item.desc}
                </p>

                {item.href ? (
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                    {work.visit}
                    <ArrowUpRight />
                  </span>
                ) : null}
              </div>
            </>
          );

          return (
            <Reveal key={item.title} delay={(i % 3) * 70}>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex h-full flex-col ${bubbleLink} p-4 sm:p-5`}
                >
                  {body}
                </a>
              ) : (
                <article className={`flex h-full flex-col ${bubble} p-4 sm:p-5`}>
                  {body}
                </article>
              )}
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

/* Пропорция всей визуальной части плитки — вместе с полоской браузера.
   Задавать её только картинке нельзя: у окна браузера сверху есть полоска,
   у телефона её нет, и подписи в ряду разъезжались бы по высоте.

   1.7 выбрано замером: при такой высоте снимок обрезается выше 730-го
   пикселя исходника, а плашка про cookie и кнопка чата на снятых
   страницах начинаются с 765-го — в кадр они не попадают ни на одной
   ширине колонки. */
const SHOT_BOX = "aspect-[1.7/1]";

/**
 * Окно браузера. Мотив тот же, что у окна кода в hero: полоска с тремя
 * точками и адрес. Кадрируем через object-top — резать сами файлы не нужно,
 * а next/image отдаёт их в WebP нужного размера.
 */
function BrowserShot({
  image,
  alt,
  domain,
  priority,
}: {
  image: StaticImageData;
  alt: string;
  domain: string;
  priority: boolean;
}) {
  return (
    <div
      className={`flex ${SHOT_BOX} flex-col overflow-hidden rounded-xl bg-white shadow-[0_18px_40px_-30px_rgba(14,14,49,0.5)]`}
    >
      <div className="flex shrink-0 items-center gap-1.5 px-3 py-2.5">
        <span className="size-2 rounded-full bg-[#ff5f56]/70" />
        <span className="size-2 rounded-full bg-[#ffbd2e]/70" />
        <span className="size-2 rounded-full bg-[#27c93f]/70" />
        <span className="ml-2 truncate font-mono text-[10px] text-muted">
          {domain}
        </span>
      </div>

      {/* min-h-0 обязателен: без него флекс-элемент не даёт себя сжать
          и картинка выдавливает полоску за пределы рамки. */}
      <div className="min-h-0 flex-1">
        <Image
          src={image}
          alt={alt}
          priority={priority}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="size-full object-cover object-top"
        />
      </div>
    </div>
  );
}

/**
 * Три телефона в рамке той же высоты, что и окно браузера. Средний стоит
 * выше и шире — он главный, боковые опущены и заходят под него краями.
 * Экраны уходят за нижний край и там обрезаются: показать их целиком
 * нельзя, вертикальный снимок растянул бы ряд втрое.
 */
function PhoneFan({ images, alt }: { images: StaticImageData[]; alt: string }) {
  const [left, center, right] = images;

  /* Подложки нет намеренно: телефоны стоят прямо на заливке пузыря.
     Цветная панель здесь спорила с самими экранами и читалась как
     ещё один элемент интерфейса. */
  return (
    <div className={`relative ${SHOT_BOX} overflow-hidden`}>
      {/* Боковые рисуем первыми, чтобы средний лёг поверх них. Подпись
          несёт только он: экраны одного приложения, и три одинаковых
          описания подряд скринридер читал бы как три разных продукта. */}
      {left ? (
        <Phone image={left} alt="" className="top-[20%] left-[2%] w-[31%]" />
      ) : null}
      {right ? (
        <Phone image={right} alt="" className="top-[20%] right-[2%] w-[31%]" />
      ) : null}
      {center ? (
        <Phone
          image={center}
          alt={alt}
          className="top-[7%] left-1/2 z-10 w-[36%] -translate-x-1/2"
        />
      ) : null}
    </div>
  );
}

/* Скругление и рамка заданы долями ширины телефона: на плитке он около
   140px, и фиксированные 1.4rem от макета в 390px смотрелись бы оплывшими. */
function Phone({
  image,
  alt,
  className,
}: {
  image: StaticImageData;
  alt: string;
  className: string;
}) {
  return (
    <div className={`absolute ${className}`}>
      <div className="rounded-[1.1rem] bg-ink p-[3px] shadow-[0_16px_36px_-22px_rgba(14,14,49,0.65)]">
        <Image
          src={image}
          alt={alt}
          sizes="(min-width: 1024px) 11vw, (min-width: 640px) 16vw, 32vw"
          className="w-full rounded-[0.95rem]"
        />
      </div>
    </div>
  );
}

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-3.5">
      <path
        d="M5 11 11 5m0 0H6.5M11 5v4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
