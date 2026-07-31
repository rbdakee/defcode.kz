import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales, type Locale } from "@/i18n/config";

/**
 * Все страницы живут под /ru, /kk и /en. Запрос без языка в пути
 * перенаправляем — так у каждой языковой версии свой постоянный адрес,
 * который можно индексировать и которым можно делиться.
 */
function pickLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language")?.toLowerCase() ?? "";

  // Порядок важен: русский — язык по умолчанию, поэтому проверяем его первым
  // и уходим на другой язык, только если русского в списке нет.
  if (header.includes("ru")) return "ru";
  if (header.includes("kk")) return "kk";
  if (header.includes("en")) return "en";
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
