import Reveal from "./Reveal";
import { bubble, Section, SectionHead } from "./ui";
import { GUARANTEE_ICONS, IconTile } from "./icons";
import type { Dict } from "@/i18n";

export default function Guarantees({ dict }: { dict: Dict }) {
  return (
    <Section id="guarantees">
      <SectionHead
        title={dict.guarantees.heading}
        sub={dict.guarantees.sub}
      />

      <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
        {dict.guarantees.items.map((item, i) => (
          <Reveal key={item.title} delay={(i % 3) * 70}>
            <article className={`h-full ${bubble} p-6 sm:p-7`}>
              <IconTile icon={GUARANTEE_ICONS[i]} />
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
    </Section>
  );
}
