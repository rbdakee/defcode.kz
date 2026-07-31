import Link from "next/link";
import Logo from "./Logo";
import { Container } from "./ui";
import {
  company,
  emailHref,
  instagramHref,
  phoneHref,
  telegramHref,
  whatsappHref,
} from "@/content/company";
import { routeHref } from "@/lib/routes";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n";

/**
 * Футер нарочно плоский и без разделительных линий: фон у него тот же
 * белый, что у страницы, поэтому он не «секция», а тихое завершение.
 * Разделы идут горизонтальной строкой — вертикальная колонка на шесть
 * пунктов оставляла справа пустое поле высотой в целый экран.
 */
export default function Footer({ dict, locale }: { dict: Dict; locale: Locale }) {
  const year = new Date().getFullYear();

  const contacts = [
    phoneHref ? { href: phoneHref, label: company.phone! } : null,
    emailHref ? { href: emailHref, label: company.email! } : null,
    whatsappHref ? { href: whatsappHref, label: "WhatsApp" } : null,
    telegramHref ? { href: telegramHref, label: "Telegram" } : null,
    instagramHref ? { href: instagramHref, label: "Instagram" } : null,
  ].filter((item): item is { href: string; label: string } => item !== null);

  const sections = [
    { href: routeHref(locale, "services"), label: dict.nav.services },
    { href: routeHref(locale, "cases"), label: dict.nav.cases },
    { href: routeHref(locale, "process"), label: dict.nav.process },
    { href: routeHref(locale, "about"), label: dict.nav.about },
    { href: `${routeHref(locale, "about")}#faq`, label: dict.nav.faq },
    { href: routeHref(locale, "contacts"), label: dict.nav.contacts },
  ];

  return (
    <footer className="bg-white">
      <Container className="pt-6 pb-8 sm:pt-8 sm:pb-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-sm">
            <Link href={`/${locale}`} aria-label="Defcode" className="inline-block">
              <Logo className="h-6 w-auto" />
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-pretty text-muted">
              {dict.footer.tagline}
            </p>
          </div>

          <nav aria-label={dict.footer.navHeading}>
            {/* Жёсткая сетка 3×2, заполняется по колонкам. flex-wrap здесь
                ронял последний пункт на отдельную строку — выглядело съехавшим. */}
            <ul className="grid grid-flow-col grid-rows-3 gap-x-12 gap-y-2.5">
              {sections.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-ink/80 transition-colors hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            {contacts.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-ink/80 transition-colors hover:text-brand"
              >
                {item.label}
              </a>
            ))}
            <Link
              href={routeHref(locale, "contacts")}
              className="inline-flex h-10 items-center rounded-full bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              {dict.nav.cta}
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-1.5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          {/* В копирайте стоит юрлицо, а не бренд: у ИП они называются
              одинаково, и «Defcode · ИП Defcode» читалось бы как заикание.
              Бренд и так стоит логотипом строкой выше. */}
          <p>
            © {year} {company.legalName ?? company.name}
            {company.bin ? ` · БИН ${company.bin}` : ""}
            {company.city ? ` · ${company.city}` : ""}
          </p>
          <p>{dict.footer.rights}</p>
        </div>
      </Container>
    </footer>
  );
}
