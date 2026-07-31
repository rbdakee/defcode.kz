import Reveal from "./Reveal";
import { Pill, Section } from "./ui";
import type { Dict } from "@/i18n";

export default function Cases({ dict }: { dict: Dict }) {
  const { cases } = dict;

  return (
    <Section id="cases" tone="night">
      <div className="grid gap-4 lg:grid-cols-2">
        {cases.items.map((item, i) => (
          <Reveal key={item.industry} delay={(i % 2) * 70}>
            <article className="flex h-full flex-col rounded-card bg-night-2 p-6 ring-1 ring-line-dark ring-inset sm:p-8">
              <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="text-xl font-semibold text-white sm:text-2xl">
                  {item.industry}
                </h2>
                <span className="font-mono text-xs text-brand-light">
                  {item.scale}
                </span>
              </header>

              <dl className="mt-6 flex-1 space-y-5">
                <Row label={cases.labels.task} value={item.task} />
                <Row label={cases.labels.solution} value={item.solution} />
                <Row label={cases.labels.result} value={item.result} accent />
              </dl>

              <ul className="mt-6 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <li key={tag}>
                    <Pill dark>{tag}</Pill>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Row({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <dt className="font-mono text-[11px] tracking-widest text-muted-dark uppercase">
        {label}
      </dt>
      <dd
        className={`mt-1.5 text-[15px] leading-relaxed text-pretty ${
          accent ? "font-medium text-white" : "text-muted-dark"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
