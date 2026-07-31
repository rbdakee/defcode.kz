import type { MetadataRoute } from "next";
import { defaultLocale, locales, localeTags } from "@/i18n/config";
import { routeKeys } from "@/lib/routes";
import { siteUrl } from "@/lib/seo";

/** Главная и все разделы — на каждом языке. */
const paths = ["", ...routeKeys.map((key) => `/${key}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      // Главная на языке по умолчанию — основная точка входа, остальное ниже.
      priority: path === "" ? (locale === defaultLocale ? 1 : 0.8) : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [localeTags[l], `${siteUrl}/${l}${path}`]),
        ),
      },
    })),
  );
}
