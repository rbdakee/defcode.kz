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
    <footer className="border-t border-line-dark bg-night text-white">
      <Container>
        <div className="grid gap-10 py-14 sm:py-16 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
          <div>
            <Link href={`/${locale}`} aria-label="Defcode">
              <Logo variant="dark" className="h-7 w-auto" />
            </Link>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-pretty text-muted-dark">
              {dict.footer.tagline}
            </p>
          </div>

          <nav aria-label={dict.footer.navHeading}>
            <h2 className="font-mono text-xs tracking-widest text-muted-dark uppercase">
              {dict.footer.navHeading}
            </h2>
            <ul className="mt-4 space-y-3">
              {sections.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[15px] text-white/85 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-xs tracking-widest text-muted-dark uppercase">
              {dict.footer.contactsHeading}
            </h2>
            {contacts.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {contacts.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-[15px] text-white/85 transition-colors hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}

            <Link
              href={routeHref(locale, "contacts")}
              className="mt-5 inline-flex h-11 items-center rounded-full bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              {dict.nav.cta}
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-line-dark py-6 text-sm text-muted-dark sm:flex-row sm:items-center sm:justify-between">
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
