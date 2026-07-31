import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
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
    path: "/contacts",
    title: pages.contacts.metaTitle,
    description: pages.contacts.metaDescription,
  });
}

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  /* Форма — единственный блок страницы и единственная форма на сайте:
     все кнопки «обсудить задачу» ведут именно сюда, поэтому заявка
     не может уйти «непонятно откуда». */
  return <ContactForm dict={getDict(locale)} />;
}
