import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getDict } from "@/i18n";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { company } from "@/content/company";
import { siteUrl } from "@/lib/seo";

/* Кириллица нужна для русского, cyrillic-ext — для казахских ә ғ қ ң ө ұ ү һ. */
const inter = Inter({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-inter",
  display: "swap",
});

/* Моноширинный нужен с казахскими ә ғ қ ң ө ұ ү һ: у JetBrains Mono их нет,
   браузер подставлял запасной шрифт и буквы выбивались по ширине прямо
   в надзаголовках. У Noto Sans Mono покрытие полное. */
const mono = Noto_Sans_Mono({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500"],
  variable: "--font-mono-brand",
  display: "swap",
});

/* Один раз на всё дерево: относительные адреса в canonical, hreflang
   и Open Graph разворачиваются от него. Заголовки и описания задают
   сами страницы — здесь их нет намеренно, иначе раздел мог бы уехать
   в выдачу с заголовком главной. */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
};

/* Языки перечислены здесь, поэтому все вложенные разделы тоже
   собираются статически для каждого из них. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0c2f" },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDict(locale as Locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: siteUrl,
    description: dict.meta.description,
    ...(company.email ? { email: company.email } : {}),
    ...(company.phone ? { telephone: company.phone } : {}),
    ...(company.city
      ? {
          address: {
            "@type": "PostalAddress",
            addressLocality: company.city,
            addressCountry: "KZ",
          },
        }
      : {}),
  };

  return (
    /* Шапка и подвал живут в макете: при переходе между разделами они
       не перерисовываются, состояние меню и позиция скролла шапки целы. */
    <html lang={locale} className={`${inter.variable} ${mono.variable}`}>
      <body className="antialiased">
        <Header dict={dict} locale={locale} />
        <main id="main">{children}</main>
        <Footer dict={dict} locale={locale} />
        <script
          type="application/ld+json"
          // Данные собираем сами из company.ts, пользовательского ввода тут нет.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
