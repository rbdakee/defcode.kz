import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";

/**
 * Все страницы живут под /ru, /kk и /en. Запрос без языка в пути
 * перенаправляем — так у каждой языковой версии свой постоянный адрес,
 * который можно индексировать и которым можно делиться.
 *
 * Язык берём из accept-language, а если ни один из наших там не назван —
 * из defaultLocale, то есть казахский.
 *
 * Заголовок разбираем с весами (`ru;q=0.8`), а не ищем подстроку. У жителей
 * Казахстана в списке обычно стоят сразу и kk, и ru — по подстроке победил бы
 * тот, что раньше в коде, а не тот, что человек поставил выше в браузере.
 */
function pickLocale(request: NextRequest): Locale {
  const ranked = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().toLowerCase().split(";");
      const weight = params.find((p) => p.trim().startsWith("q="));
      return { tag, q: weight ? Number(weight.split("=")[1]) : 1 };
    })
    .filter((item) => item.tag && Number.isFinite(item.q) && item.q > 0)
    // Сортировка в JS устойчивая: при равных весах остаётся порядок заголовка.
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    // ru-KZ, kk-Cyrl-KZ, en-US — нас интересует только первая часть.
    const base = tag.split("-")[0];
    if (isLocale(base)) return base;
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${pickLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Не трогаем API, ассеты Next и любые файлы с расширением.
  matcher: ["/((?!api|_next/static|_next/image|brand|favicon.ico|.*\\..*).*)"],
};
