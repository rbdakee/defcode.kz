import Reveal from "./Reveal";
import { bubble, Section } from "./ui";
import type { Dict } from "@/i18n";

export default function Process({ dict }: { dict: Dict }) {
  return (
    <Section id="process">
      {/* Шаг — пузырь, а не строка с линией сверху: границу держит
          заливка, поэтому список читается как лестница карточек. */}
      <ol className="grid gap-3 sm:gap-4">
        {dict.process.steps.map((step, i) => (
          <li key={step.title}>
            <Reveal delay={i * 60}>
              <div
                className={`grid gap-x-8 gap-y-2 ${bubble} p-6 sm:grid-cols-[3rem_1fr] sm:p-8`}
              >
                {/* Preflight гасит маркеры списка, поэтому номер шага
                    рисуем сами. Для скринридера порядок и так задан ol. */}
                <span
                  aria-hidden="true"
                  className="text-sm font-medium text-brand tabular-nums"
                >
                  {i + 1}
                </span>

                <div className="grid gap-2 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-8">
                  <h2 className="text-lg font-semibold text-balance text-ink sm:text-xl">
                    {step.title}
                  </h2>
                  <p className="text-[15px] leading-relaxed text-pretty text-muted">
                    {step.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
