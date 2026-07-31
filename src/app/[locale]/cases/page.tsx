import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Cases from "@/components/Cases";
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
    path: "/cases",
    title: pages.cases.metaTitle,
    description: pages.cases.metaDescription,
  });
}

export default async function CasesPage({
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
        title={dict.pages.cases.title}
        lead={dict.pages.cases.lead}
      />
      <Cases dict={dict} />
      <CtaBand dict={dict} locale={locale} />
    </>
  );
}
