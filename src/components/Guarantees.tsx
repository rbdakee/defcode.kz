import Reveal from "./Reveal";
import { Container, Section, SectionHead } from "./ui";
import type { Dict } from "@/i18n";

export default function Guarantees({ dict }: { dict: Dict }) {
  return (
    <Section id="guarantees">
      <Container>
        <SectionHead
          title={dict.guarantees.heading}
          sub={dict.guarantees.sub}
        />

        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {dict.guarantees.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 70}>
              <article className="h-full rounded-card border border-line bg-white p-6 sm:p-7">
                <span
                  aria-hidden="true"
                  className="grid size-9 place-items-center rounded-full bg-brand-tint text-brand"
                >
                  <svg viewBox="0 0 16 16" className="size-4">
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
                <h3 className="mt-4 text-lg font-semibold text-balance text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-pretty text-muted">
                  {item.desc}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
