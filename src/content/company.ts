/**
 * ЕДИНОЕ МЕСТО ДЛЯ ФАКТОВ О КОМПАНИИ.
 *
 * Всё, что помечено null — ещё не заполнено. Компоненты такие блоки
 * молча скрывают, поэтому на сайт не попадёт ни заглушка, ни выдуманная цифра.
 * Заполните — блок появится сам, править вёрстку не нужно.
 */

export const company = {
  name: "Defcode",
  /** Домен без протокола. Нужен для canonical, hreflang и Open Graph. */
  domain: "defcode.kz", // TODO: подтвердить, когда домен будет куплен

  /**
   * Подпись в футере. Для ИП достаточно «ИП Фамилия И. О.» — публиковать
   * ИИН закон не обязывает, а в футере он ничего не добавляет: проверить
   * ИП по нему всё равно можно только через кабинет налоговой.
   */
  legalName: "ИП Defcode" as string | null,
  bin: null as string | null, // у ИП без БИН — оставляем пустым, блок скроется

  city: null as string | null, // TODO: Астана / Алматы / ...
  address: null as string | null, // TODO: не обязательно

  phone: "+7 (777) 227-00-88",
  email: null as string | null, // TODO
  telegram: null as string | null, // TODO: username без @
  whatsapp: null as string | null, // TODO: тот же номер цифрами — 77772270088, если на нём есть WhatsApp
  instagram: null as string | null, // TODO: username без @

  /** Например «Пн–Пт, 10:00–19:00». Показывается рядом с формой. */
  workingHours: null as string | null, // TODO
} as const;

/**
 * Цифры для hero. Показываем только заполненные.
 * Если не заполнено ничего — hero покажет качественные бейджи из словаря.
 */
export const stats = {
  years: null as string | null, // TODO: «5»
  projects: null as string | null, // TODO: «40+»
  team: null as string | null, // TODO: «12»
  avgWeeks: null as string | null, // TODO: «8» — средний срок запуска в неделях
} as const;

/** Ссылка на телефон: убираем всё, кроме цифр и плюса. */
export const phoneHref = company.phone
  ? `tel:${company.phone.replace(/[^\d+]/g, "")}`
  : null;

export const telegramHref = company.telegram
  ? `https://t.me/${company.telegram}`
  : null;

export const whatsappHref = company.whatsapp
  ? `https://wa.me/${company.whatsapp}`
  : null;

export const emailHref = company.email ? `mailto:${company.email}` : null;

export const instagramHref = company.instagram
  ? `https://instagram.com/${company.instagram}`
  : null;

/** Есть ли вообще хоть один способ связи — от этого зависит блок «или напишите сразу». */
export const hasDirectContacts = Boolean(
  phoneHref || telegramHref || whatsappHref || emailHref,
);
