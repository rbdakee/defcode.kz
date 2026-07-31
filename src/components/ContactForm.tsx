"use client";

import { useEffect, useState } from "react";
import { bubble, Section } from "./ui";
import {
  IconChat,
  IconMail,
  IconPhone,
  IconSend,
  type IconComponent,
} from "./icons";
import { takePrefill } from "@/lib/prefill";
import {
  company,
  emailHref,
  hasDirectContacts,
  phoneHref,
  telegramHref,
  whatsappHref,
} from "@/content/company";
import type { Dict } from "@/i18n";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm({ dict }: { dict: Dict }) {
  const t = dict.contact;
  const [status, setStatus] = useState<Status>("idle");
  const [task, setTask] = useState("");
  const [errors, setErrors] = useState<{ name?: string; contact?: string }>({});

  /* Пришли сюда кликом по задаче в меню — подставляем её в поле.
     Фокус не ставим: на мобильном это выдернуло бы клавиатуру сразу
     после перехода и утащило страницу вниз.

     sessionStorage не существует во время рендера на сервере, поэтому
     прочитать его можно только после монтирования — правило про setState
     в эффекте здесь и описывает как раз разрешённый случай: забираем
     состояние из внешней системы, недоступной при рендере. */
  useEffect(() => {
    const stored = takePrefill();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored) setTask(stored);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const contact = String(data.get("contact") ?? "").trim();

    const nextErrors: typeof errors = {};
    if (!name) nextErrors.name = t.errorRequired;
    if (!contact) nextErrors.contact = t.errorContact;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          contact,
          task: String(data.get("task") ?? "").trim(),
          // Ловушка для ботов: настоящий человек это поле не видит.
          website: String(data.get("website") ?? ""),
          locale: document.documentElement.lang,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
      setTask("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="contact">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1 className="text-3xl leading-[1.1] font-semibold tracking-tight text-balance text-ink sm:text-4xl lg:text-5xl">
              {t.heading}
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-pretty text-muted sm:text-lg">
              {t.sub}
            </p>

            {hasDirectContacts ? (
              <div className="mt-8">
                <p className="font-mono text-xs tracking-widest text-muted uppercase">
                  {t.orWrite}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {whatsappHref ? (
                    <DirectLink href={whatsappHref} icon={IconChat}>
                      WhatsApp
                    </DirectLink>
                  ) : null}
                  {telegramHref ? (
                    <DirectLink href={telegramHref} icon={IconSend}>
                      Telegram
                    </DirectLink>
                  ) : null}
                  {phoneHref ? (
                    <DirectLink href={phoneHref} icon={IconPhone}>
                      {company.phone}
                    </DirectLink>
                  ) : null}
                  {emailHref ? (
                    <DirectLink href={emailHref} icon={IconMail}>
                      {company.email}
                    </DirectLink>
                  ) : null}
                </ul>
                {company.workingHours ? (
                  <p className="mt-3 text-sm text-muted">{company.workingHours}</p>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className={`${bubble} p-6 sm:p-8`}>
            {status === "sent" ? (
              <div className="flex h-full min-h-64 flex-col items-start justify-center">
                <span
                  aria-hidden="true"
                  className="grid size-12 place-items-center rounded-full bg-brand text-white"
                >
                  <svg viewBox="0 0 16 16" className="size-5">
                    <path
                      d="m3.5 8.5 3 3 6-7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h3 className="mt-5 text-xl font-semibold text-ink">{t.successTitle}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  {t.successText}
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
                <Field
                  label={t.name}
                  name="name"
                  placeholder={t.namePlaceholder}
                  autoComplete="name"
                  error={errors.name}
                />
                <Field
                  label={t.contact}
                  name="contact"
                  placeholder={t.contactPlaceholder}
                  autoComplete="tel"
                  error={errors.contact}
                />

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-ink">{t.task}</span>
                  <textarea
                    name="task"
                    rows={4}
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder={t.taskPlaceholder}
                    className="resize-y rounded-2xl bg-white px-4 py-3 text-base text-ink ring-1 ring-line ring-inset placeholder:text-muted/60 focus:ring-brand focus:outline-none"
                  />
                </label>

                {/* Honeypot: скрыт от людей, но виден ботам, которые
                    заполняют все поля подряд. */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label>
                    Website
                    <input name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-1 flex h-13 items-center justify-center rounded-full bg-brand px-6 text-base font-semibold text-white transition-transform duration-200 hover:bg-brand-dark active:scale-[0.99] disabled:opacity-60"
                >
                  {status === "sending" ? t.sending : t.submit}
                </button>

                {status === "error" ? (
                  <p role="alert" className="text-sm text-red-600">
                    {t.errorSend}
                  </p>
                ) : null}

                <p className="text-xs leading-relaxed text-muted">{t.privacy}</p>
              </form>
            )}
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function Field({
  label,
  name,
  placeholder,
  autoComplete,
  error,
}: {
  label: string;
  name: string;
  placeholder: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-ink">{label}</span>
      <input
        name={name}
        type="text"
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        className={`h-13 rounded-2xl bg-white px-4 text-base text-ink ring-1 ring-inset placeholder:text-muted/60 focus:outline-none ${
          error ? "ring-red-500" : "ring-line focus:ring-brand"
        }`}
      />
      {error ? (
        <span role="alert" className="text-sm text-red-600">
          {error}
        </span>
      ) : null}
    </label>
  );
}

function DirectLink({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: IconComponent;
  children: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-11 items-center gap-2 rounded-full bg-paper px-4 text-sm font-medium text-ink transition-colors hover:bg-brand-tint hover:text-brand-dark"
      >
        <Icon className="size-4 text-brand" />
        {children}
      </a>
    </li>
  );
}
