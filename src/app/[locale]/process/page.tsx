import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Process from "@/components/Process";
import Stack from "@/components/Stack";
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
    path: "/process",
    title: pages.process.metaTitle,
    description: pages.process.metaDescription,
  });
}

export default async function ProcessPage({
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
        title={dict.pages.process.title}
        lead={dict.pages.process.lead}
      />
      <Process dict={dict} />
      <Stack dict={dict} />
      <CtaBand dict={dict} locale={locale} />
    </>
  );
}
