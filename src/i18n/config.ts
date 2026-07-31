export const locales = ["ru", "kk", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";

/** Подписи в переключателе языка. Каждый язык подписан сам собой. */
export const localeNames: Record<Locale, string> = {
  ru: "Рус",
  kk: "Қаз",
  en: "Eng",
};

/** Для атрибута lang и hreflang. */
export const localeTags: Record<Locale, string> = {
  ru: "ru-KZ",
  kk: "kk-KZ",
  en: "en",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
