"use client";

import { useRouter } from "next/navigation";
import { Section } from "./ui";
import { MEGA_GROUP_ICONS } from "./icons";
import { stashPrefill } from "@/lib/prefill";
import { routeHref } from "@/lib/routes";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n";

/**
 * Тот же список задач, что в мега-меню, но на странице — его видят
 * и поисковики, и все, кто зашёл с телефона. Нажатие уводит на форму
 * с уже подставленной задачей.
 */
export default function ServiceTagGroups({
  dict,
  locale,
}: {
  dict: Dict;
  locale: Locale;
}) {
  const router = useRouter();

  const onTagClick = (tag: string) => {
    stashPrefill(tag);
    router.push(routeHref(locale, "contacts"));
  };

  return (
    <Section tone="none">
      <h2 className="text-2xl font-semibold tracking-tight text-balance text-ink sm:text-3xl">
        {dict.services.tagsHeading}
      </h2>
      <p className="mt-3 text-[15px] text-muted sm:text-base">
        {dict.services.tagsNote}
      </p>

      <div className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
        {dict.mega.groups.map((group, i) => {
          const Icon = MEGA_GROUP_ICONS[i];
          return (
            <div key={group.title}>
              <h3 className="flex items-center gap-2.5 text-sm font-semibold text-ink">
                <span
                  aria-hidden="true"
                  className="grid size-7 shrink-0 place-items-center rounded-lg bg-brand-tint text-brand"
                >
                  <Icon className="size-4" />
                </span>
                {group.title}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {group.tags.map((tag) => (
                  <li key={tag}>
                    <button
                      type="button"
                      onClick={() => onTagClick(tag)}
                      className="rounded-full bg-paper px-3 py-1.5 text-[13px] text-muted transition-colors hover:bg-brand-tint hover:text-brand-dark sm:text-sm"
                    >
                      {tag}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
