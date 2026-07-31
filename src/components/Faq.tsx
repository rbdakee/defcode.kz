"use client";

import { useState } from "react";
import { Section, SectionHead } from "./ui";
import type { Dict } from "@/i18n";

export default function Faq({ dict }: { dict: Dict }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" tone="none">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
        <SectionHead title={dict.faq.heading} sub={dict.faq.sub} />

        <div className="divide-y divide-line border-y border-line">
          {dict.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-button-${i}`}
                    className="flex w-full items-start justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-base font-medium text-balance text-ink sm:text-lg">
                      {item.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-brand-tint text-brand transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      <svg viewBox="0 0 12 12" className="size-3">
                        <path
                          d="M6 2v8M2 6h8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>
                </h3>

                {/* Ответ всегда в DOM, просто обрезан по высоте:
                    так его видят поисковики и находит поиск по странице. */}
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-5 text-[15px] leading-relaxed text-pretty text-muted">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
