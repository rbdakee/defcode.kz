import Link from "next/link";
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Секция — только вертикальный ритм на белом фоне. Подложек во всю
 * ширину нет: пузырями работают карточки внутри, а заголовок секции
 * стоит прямо на белом.
 */
export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-10 sm:py-12 lg:py-14 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/**
 * Пузырь — карточка со светло-серой заливкой на белом фоне. Рамки нет
 * намеренно: форму держит цвет, линия дала бы ту же границу дважды.
 */
export const bubble = "rounded-card bg-paper";

/**
 * Кликабельный пузырь. При наведении всплывает: заливка уходит в белый,
 * а тень отрывает карточку от фона. Подсвечивать его тоном бренда нельзя —
 * теги внутри залиты ровно этим тоном и растворились бы в подложке.
 */
export const bubbleLink =
  `${bubble} transition-[background-color,box-shadow] duration-200 ` +
  "hover:bg-white hover:shadow-[0_18px_44px_-26px_rgba(14,14,49,0.35)]";

/**
 * Шапка секции. Если передана ссылка «смотреть всё», на десктопе она
 * встаёт справа от заголовка, на мобильном — под подзаголовком:
 * иначе на 360px она отжимает заголовок в две буквы на строку.
 */
export function SectionHead({
  title,
  sub,
  more,
}: {
  title: string;
  sub?: string;
  more?: { href: string; label: string };
}) {
  return (
    /* Раскладку в строку включаем только когда есть что ставить справа:
       иначе items-end растянул бы заголовок по высоте ячейки грида
       и прибил бы его к низу колонки (так было в FAQ). */
    <div
      className={
        more ? "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10" : ""
      }
    >
      <div className="max-w-3xl">
        <h2 className="text-3xl leading-[1.1] font-semibold tracking-tight text-balance text-ink sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {sub ? (
          <p className="mt-4 text-base leading-relaxed text-pretty text-muted sm:text-lg">
            {sub}
          </p>
        ) : null}
      </div>

      {more ? <MoreLink href={more.href} label={more.label} /> : null}
    </div>
  );
}

/** Ссылка «смотреть всё» — из витрины на главной в полный раздел. */
export function MoreLink({
  href,
  label,
  className = "",
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-dark sm:text-base ${className}`}
    >
      {label}
      <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-brand-tint px-3 py-1 text-xs font-medium text-brand-dark sm:text-[13px]">
      {children}
    </span>
  );
}

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={`size-4 shrink-0 ${className}`}
    >
      <path
        d="M4 10h12m0 0-4.5-4.5M16 10l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
