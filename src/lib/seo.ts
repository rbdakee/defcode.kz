import type { Metadata } from "next";
import { defaultLocale, locales, localeTags, type Locale } from "@/i18n/config";
import { company } from "@/content/company";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? `https://${company.domain}`;

/**
 * Общая обвязка метаданных для любой страницы: canonical, hreflang
 * на все языки и Open Graph. Страницам остаётся передать заголовок,
 * описание и свой путь — так ни один раздел не останется без alternates.
 */
export function pageMetadata({
  locale,
  path = "",
  title,
  description,
}: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
}): Metadata {
  const urlFor = (target: Locale) => `/${target}${path}`;

  /* Картинку превью подставляем руками каждой странице.
     Файл opengraph-image.tsx закрывает только свой сегмент и вложенным
     разделам не достаётся: без этой строки ссылка на /ru/services
     разворачивалась бы в мессенджере серым прямоугольником, а на /ru — нет.
     Картинка одна на язык: она про компанию, а не про конкретный раздел. */
  const ogImage = {
    url: `/${locale}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: company.name,
  };

  return {
    title,
    description,
    alternates: {
      canonical: urlFor(locale),
      languages: {
        ...Object.fromEntries(locales.map((l) => [localeTags[l], urlFor(l)])),
        // Куда вести тех, чей язык не подошёл ни под один hreflang —
        // тот же ответ, что даёт редирект с общего адреса.
        "x-default": urlFor(defaultLocale),
      },
    },
    openGraph: {
      type: "website",
      siteName: company.name,
      title,
      description,
      url: urlFor(locale),
      locale: localeTags[locale].replace("-", "_"),
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}
