import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Hooks from "@/components/Hooks";
import ServicesPreview from "@/components/home/ServicesPreview";
import Work from "@/components/Work";
import CasesPreview from "@/components/home/CasesPreview";
import ProcessPreview from "@/components/home/ProcessPreview";
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

  const dict = getDict(locale);
  return pageMetadata({
    locale,
    title: dict.meta.title,
    description: dict.meta.description,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDict(locale);

  /* Главная — витрина: каждый блок показывает, что раздел есть,
     и уводит в него. Подробности живут на своих страницах. */
  return (
    <>
      <Hero dict={dict} locale={locale} />
      <Hooks dict={dict} locale={locale} />
      <ServicesPreview dict={dict} locale={locale} />
      {/* Показанные работы идут перед кейсами: сперва то, что можно
          открыть и потрогать, затем закрытые проекты текстом. */}
      <Work dict={dict} locale={locale} more />
      <CasesPreview dict={dict} locale={locale} />
      <ProcessPreview dict={dict} locale={locale} />
      <CtaBand dict={dict} locale={locale} />
    </>
  );
}
