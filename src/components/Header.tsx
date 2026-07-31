"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { ArrowRight, Container } from "./ui";
import { MEGA_GROUP_ICONS } from "./icons";
import { stashPrefill } from "@/lib/prefill";
import { activeRoute, routeHref, type RouteKey } from "@/lib/routes";
import { locales, localeNames, type Locale } from "@/i18n/config";
import type { Dict } from "@/i18n";

type Props = { dict: Dict; locale: Locale };

export default function Header({ dict, locale }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const current = activeRoute(pathname);

  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<number | null>(0);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const nav: { key: RouteKey; label: string }[] = [
    { key: "cases", label: dict.nav.cases },
    { key: "process", label: dict.nav.process },
    { key: "about", label: dict.nav.about },
  ];

  /* Тень под шапкой появляется только когда под ней действительно есть контент. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Escape закрывает и мега-меню, и мобильную панель. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMegaOpen(false);
      setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /* Клик мимо шапки закрывает мега-меню. */
  useEffect(() => {
    if (!megaOpen) return;
    const onDown = (e: PointerEvent) => {
      if (headerRef.current?.contains(e.target as Node)) return;
      setMegaOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [megaOpen]);

  /* Пока открыта мобильная панель, страница под ней не должна прокручиваться. */
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  /* Поворот планшета может перевести вёрстку в десктопную прямо с открытой
     панелью. Сама она спрячется по lg:hidden, а замок прокрутки остался бы
     висеть — и страница перестала бы скроллиться без единого видимого меню. */
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMobileOpen(false);
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  const closeAll = useCallback(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, []);

  /* Задача из меню не просто ведёт на контакты, а подставляется в форму:
     заполнять проще, чем начинать с пустого поля. */
  const onTagClick = useCallback(
    (tag: string) => {
      stashPrefill(tag);
      closeAll();
      router.push(routeHref(locale, "contacts"));
    },
    [closeAll, locale, router],
  );

  /* Наведение открывает панель, увод — закрывает. Задержка нужна,
     чтобы панель не захлопывалась, пока курсор перебирается на неё с пункта
     меню. Сам пункт остаётся ссылкой: клик уводит на страницу услуг. */
  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };

  const closeMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };

  const linkClass = (active: boolean) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      active ? "text-brand" : "text-ink hover:text-brand"
    }`;

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 transition-shadow duration-300 ${
          scrolled
            ? "bg-white/85 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-md"
            : "bg-white"
        }`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          {dict.nav.skipToContent}
        </a>

        <Container>
          <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
            <Link
              href={routeHref(locale)}
              onClick={closeAll}
              className="shrink-0"
              aria-label="Defcode"
            >
              <Logo priority className="h-6 w-auto sm:h-7" />
            </Link>

            {/* --- Десктопная навигация --- */}
            <nav className="hidden items-center gap-1 lg:flex" aria-label="main">
              {/* Панель — надстройка для мыши: её содержимое целиком есть
                  на странице услуг, куда ведёт сам пункт меню. Поэтому
                  ни aria-expanded, ни доступа с клавиатуры ей не нужно —
                  иначе получилось бы состояние, в которое нельзя попасть табом. */}
              <div onMouseEnter={openMega} onMouseLeave={closeMega}>
                <Link
                  href={routeHref(locale, "services")}
                  onClick={closeAll}
                  aria-current={current === "services" ? "page" : undefined}
                  className={`flex items-center gap-1.5 ${linkClass(current === "services")}`}
                >
                  {dict.nav.services}
                  <svg
                    viewBox="0 0 12 12"
                    aria-hidden="true"
                    className={`size-3 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
                  >
                    <path
                      d="M2.5 4.5 6 8l3.5-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>

              {nav.map((item) => (
                <Link
                  key={item.key}
                  href={routeHref(locale, item.key)}
                  onClick={closeAll}
                  aria-current={current === item.key ? "page" : undefined}
                  className={linkClass(current === item.key)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <LocaleSwitch locale={locale} className="hidden sm:inline-flex" />

              <Link
                href={routeHref(locale, "contacts")}
                onClick={closeAll}
                className="hidden items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark sm:inline-flex"
              >
                {dict.nav.cta}
                <ArrowRight />
              </Link>

              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? dict.nav.closeMenu : dict.nav.openMenu}
                className="-mr-2 grid size-11 place-items-center rounded-xl text-ink lg:hidden"
              >
                <Burger open={mobileOpen} />
              </button>
            </div>
          </div>
        </Container>

        {/* --- Мега-меню (десктоп) --- */}
        <div
          id="mega-menu"
          onMouseEnter={openMega}
          onMouseLeave={closeMega}
          className={`absolute inset-x-0 top-full hidden origin-top transition duration-200 lg:block ${
            megaOpen
              ? "pointer-events-auto scale-100 opacity-100"
              : "pointer-events-none -translate-y-1 scale-[0.99] opacity-0"
          }`}
          aria-hidden={!megaOpen}
          inert={!megaOpen}
        >
          <Container>
            <div className="mb-6 rounded-3xl border border-line bg-white p-6 shadow-[0_24px_60px_-24px_rgba(14,14,49,0.28)] xl:p-8">
              <div className="mb-6 flex items-baseline justify-between gap-6">
                <div>
                  <p className="text-lg font-semibold text-ink">{dict.mega.heading}</p>
                  <p className="mt-1 text-sm text-muted">{dict.mega.note}</p>
                </div>
                <Link
                  href={routeHref(locale, "services")}
                  onClick={closeAll}
                  className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-dark"
                >
                  {dict.mega.cta}
                  <ArrowRight />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-7 xl:grid-cols-3">
                {dict.mega.groups.map((group, i) => {
                  const GroupIcon = MEGA_GROUP_ICONS[i];
                  return (
                    <div key={group.title}>
                      <p className="flex items-center gap-2.5 text-sm font-semibold text-ink">
                        <span
                          aria-hidden="true"
                          className="grid size-7 shrink-0 place-items-center rounded-lg bg-brand-tint text-brand"
                        >
                          <GroupIcon className="size-4" />
                        </span>
                        {group.title}
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {group.tags.map((tag) => (
                          <li key={tag}>
                            <button
                              type="button"
                              onClick={() => onTagClick(tag)}
                              className="rounded-full bg-paper px-2.5 py-1 text-[13px] text-muted transition-colors hover:bg-brand-tint hover:text-brand-dark"
                            >
                              {tag}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </Container>
        </div>
      </header>

      {/* --- Мобильная панель ---

          Лежит СНАРУЖИ шапки, и это принципиально. При прокрутке шапка
          получает backdrop-blur, а `backdrop-filter` превращает элемент
          в containing block для потомков с `position: fixed`. Пока панель
          была внутри, её `top-16 bottom-0` отсчитывались не от экрана,
          а от шапки высотой 64px: высота схлопывалась в ноль, и меню
          открывалось невидимым везде, кроме самого верха страницы.
          Нижнюю кнопку внутри панели ломало ровно так же.

          Тот же капкан ждёт любой transform, filter или will-change
          на шапке — если понадобятся, панель должна остаться снаружи. */}
      <div
        className={`fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto overscroll-contain bg-white transition-opacity duration-200 lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!mobileOpen}
        // Панель остаётся в DOM ради анимации, но пока закрыта — её
        // содержимое не должно ловить фокус табом.
        inert={!mobileOpen}
      >
        <Container className="pt-4 pb-28">
          <nav className="flex flex-col" aria-label="mobile">
            <Link
              href={routeHref(locale, "services")}
              onClick={closeAll}
              aria-current={current === "services" ? "page" : undefined}
              className={`border-b border-line py-4 text-lg font-medium ${
                current === "services" ? "text-brand" : "text-ink"
              }`}
            >
              {dict.nav.services}
            </Link>
            {nav.map((item) => (
              <Link
                key={item.key}
                href={routeHref(locale, item.key)}
                onClick={closeAll}
                aria-current={current === item.key ? "page" : undefined}
                className={`border-b border-line py-4 text-lg font-medium ${
                  current === item.key ? "text-brand" : "text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Задачи на мобильном — аккордеон. Шесть раскрытых групп
              превратили бы меню в экран на три прокрутки. */}
          <p className="mt-8 mb-2 font-mono text-xs tracking-widest text-brand uppercase">
            {dict.services.tagsHeading}
          </p>
          <div className="divide-y divide-line border-y border-line">
            {dict.mega.groups.map((group, i) => {
              const open = openGroup === i;
              const GroupIcon = MEGA_GROUP_ICONS[i];
              return (
                <div key={group.title}>
                  <button
                    type="button"
                    onClick={() => setOpenGroup(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left"
                  >
                    <span className="flex items-center gap-2.5 text-base font-medium text-ink">
                      <span
                        aria-hidden="true"
                        className="grid size-7 shrink-0 place-items-center rounded-lg bg-brand-tint text-brand"
                      >
                        <GroupIcon className="size-4" />
                      </span>
                      {group.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`grid size-6 shrink-0 place-items-center rounded-full bg-brand-tint text-brand transition-transform duration-200 ${
                        open ? "rotate-45" : ""
                      }`}
                    >
                      <svg viewBox="0 0 12 12" className="size-3">
                        <path
                          d="M6 2v8M2 6h8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="flex flex-wrap gap-1.5 pb-4">
                        {group.tags.map((tag) => (
                          <li key={tag}>
                            <button
                              type="button"
                              onClick={() => onTagClick(tag)}
                              className="rounded-full bg-paper px-3 py-1.5 text-sm text-muted"
                            >
                              {tag}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            <p className="mb-2 font-mono text-xs tracking-widest text-brand uppercase">
              {dict.nav.language}
            </p>
            <LocaleSwitch locale={locale} className="inline-flex" />
          </div>
        </Container>

        {/* Кнопка всегда под большим пальцем, не надо мотать наверх. */}
        <div className="fixed inset-x-0 bottom-0 border-t border-line bg-white/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur">
          <Link
            href={routeHref(locale, "contacts")}
            onClick={closeAll}
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-brand text-base font-semibold text-white"
          >
            {dict.nav.cta}
            <ArrowRight />
          </Link>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */

function LocaleSwitch({
  locale,
  className = "",
}: {
  locale: Locale;
  className?: string;
}) {
  const pathname = usePathname();

  /* Меняем только первый сегмент пути, остальное сохраняем —
     чтобы переключение языка не выкидывало на главную. */
  const hrefFor = (next: Locale) => {
    const rest = pathname.split("/").slice(2).join("/");
    return `/${next}${rest ? `/${rest}` : ""}`;
  };

  return (
    /* display задаёт вызывающая сторона: если оставить его здесь,
       он конфликтует с `hidden` и переключатель не прячется на мобильном. */
    <div
      className={`items-center gap-0.5 rounded-full bg-paper p-0.5 ring-1 ring-line ring-inset ${className}`}
    >
      {locales.map((code) => {
        const active = code === locale;
        return (
          <Link
            key={code}
            href={hrefFor(code)}
            hrefLang={code}
            aria-current={active ? "true" : undefined}
            className={`rounded-full px-2.5 py-1.5 text-xs font-semibold transition-colors ${
              active ? "bg-brand text-white" : "text-muted hover:text-ink"
            }`}
          >
            {localeNames[code]}
          </Link>
        );
      })}
    </div>
  );
}

function Burger({ open }: { open: boolean }) {
  return (
    <span aria-hidden="true" className="relative block h-4 w-6">
      <span
        className={`absolute left-0 block h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ${
          open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
        }`}
      />
      <span
        className={`absolute top-1/2 left-0 block h-0.5 w-6 -translate-y-1/2 rounded-full bg-current transition-opacity duration-200 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 block h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ${
          open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
        }`}
      />
    </span>
  );
}
