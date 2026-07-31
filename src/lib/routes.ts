import type { Locale } from "@/i18n/config";

/**
 * Разделы сайта. Сегмент пути совпадает с ключом, поэтому один список
 * закрывает и навигацию, и sitemap, и подсветку активного пункта меню.
 */
export const routeKeys = [
  "services",
  "cases",
  "process",
  "about",
  "contacts",
] as const;

export type RouteKey = (typeof routeKeys)[number];

/** Без ключа — главная страница языка. */
export function routeHref(locale: Locale, key?: RouteKey) {
  return key ? `/${locale}/${key}` : `/${locale}`;
}

/**
 * Якорь на отдельный кейс или шаг процесса. Считается от позиции в словаре,
 * а не от названия: названия переведены на три языка, и ссылка из меню
 * ломалась бы при переключении языка.
 */
export function itemAnchor(prefix: "case" | "step", index: number) {
  return `${prefix}-${index + 1}`;
}

/**
 * Какой раздел открыт сейчас. Первый сегмент — язык, второй — раздел;
 * на главной второго сегмента нет, поэтому возвращаем null.
 */
export function activeRoute(pathname: string): RouteKey | null {
  const segment = pathname.split("/")[2];
  return routeKeys.includes(segment as RouteKey) ? (segment as RouteKey) : null;
}
