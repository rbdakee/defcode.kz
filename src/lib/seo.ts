import type { Metadata } from "next";
import { locales, localeTags, type Locale } from "@/i18n/config";
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

  return {
    title,
    description,
    alternates: {
      canonical: urlFor(locale),
      languages: {
        ...Object.fromEntries(locales.map((l) => [localeTags[l], urlFor(l)])),
        "x-default": urlFor("ru"),
      },
    },
    openGraph: {
      type: "website",
      siteName: company.name,
      title,
      description,
      url: urlFor(locale),
      locale: localeTags[locale].replace("-", "_"),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}
