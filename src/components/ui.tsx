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
 * Тон секции-пузыря. Фон страницы всегда белый, а секции лежат на нём
 * скруглёнными панелями: paper — рабочая светлая, night — тёмная (кейсы,
 * форма), brand — фиолетовая (призыв). none — без панели: белая секция
 * на белом фоне была бы невидимым пузырём, поэтому просто отступы.
 */
export type SectionTone = "paper" | "night" | "brand" | "none";

const TONE_PANEL: Record<SectionTone, string> = {
  paper: "bg-paper",
  night: "bg-night text-white",
  brand: "bg-linear-to-br from-brand to-brand-dark text-white",
  none: "",
};

export function Section({
  id,
  children,
  className = "",
  panelClassName = "",
  tone = "paper",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Классы самой панели — для overflow-hidden, relative и подобного. */
  panelClassName?: string;
  tone?: SectionTone;
}) {
  const rounded = tone === "none" ? "" : "rounded-3xl lg:rounded-[2.5rem]";

  return (
    /* Внешние отступы — «швы» между пузырями, сквозь них виден белый фон.
       Панель сама выполняет роль Container: второй max-w внутри неё
       удвоил бы горизонтальные поля. */
    <section id={id} className={`px-2 py-2 sm:px-4 sm:py-2.5 lg:px-6 lg:py-3 ${className}`}>
      <div
        className={`mx-auto w-full max-w-7xl px-4 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20 ${rounded} ${TONE_PANEL[tone]} ${panelClassName}`}
      >
        {children}
      </div>
    </section>
  );
}

/**
 * Шапка секции. Если передана ссылка «смотреть всё», на десктопе она
 * встаёт справа от заголовка, на мобильном — под подзаголовком:
 * иначе на 360px она отжимает заголовок в две буквы на строку.
 */
export function SectionHead({
  title,
  sub,
  dark = false,
  more,
}: {
  title: string;
  sub?: string;
  dark?: boolean;
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
        <h2
          className={`text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          {title}
        </h2>
        {sub ? (
          <p
            className={`mt-4 text-base leading-relaxed text-pretty sm:text-lg ${
              dark ? "text-muted-dark" : "text-muted"
            }`}
          >
            {sub}
          </p>
        ) : null}
      </div>

      {more ? <MoreLink href={more.href} dark={dark} label={more.label} /> : null}
    </div>
  );
}

/** Ссылка «смотреть всё» — из витрины на главной в полный раздел. */
export function MoreLink({
  href,
  label,
  dark = false,
  className = "",
}: {
  href: string;
  label: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex shrink-0 items-center gap-2 text-sm font-semibold transition-colors sm:text-base ${
        dark ? "text-brand-light hover:text-white" : "text-brand hover:text-brand-dark"
      } ${className}`}
    >
      {label}
      <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}

export function Pill({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium sm:text-[13px] ${
        dark
          ? "bg-white/8 text-muted-dark ring-1 ring-white/10 ring-inset"
          : "bg-brand-tint text-brand-dark"
      }`}
    >
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
