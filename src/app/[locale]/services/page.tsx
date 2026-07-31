import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Services from "@/components/Services";
import ServiceTagGroups from "@/components/ServiceTagGroups";
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
    path: "/services",
    title: pages.services.metaTitle,
    description: pages.services.metaDescription,
  });
}

export default async function ServicesPage({
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
        title={dict.pages.services.title}
        lead={dict.pages.services.lead}
      />
      <Services dict={dict} />
      <ServiceTagGroups dict={dict} locale={locale} />
      <CtaBand dict={dict} locale={locale} />
    </>
  );
}
