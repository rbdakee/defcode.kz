import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Studio from "@/components/Studio";
import Guarantees from "@/components/Guarantees";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import { getDict } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const { pages } = getDict(locale);
  return pageMetadata({
    locale,
    path: "/about",
    title: pages.about.metaTitle,
    description: pages.about.metaDescription,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDict(locale);

  return (
    <>
      <PageHero
        locale={locale}
        homeLabel={dict.nav.home}
        title={dict.pages.about.title}
        lead={dict.pages.about.lead}
      />
      <Studio dict={dict} />
      <Guarantees dict={dict} />
      <Faq dict={dict} locale={locale} />
      <CtaBand dict={dict} locale={locale} />
    </>
  );
}
