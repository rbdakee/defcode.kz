import { Container } from "./ui";
import { stack } from "@/content/stack";
import type { Dict } from "@/i18n";

export default function Stack({ dict }: { dict: Dict }) {
  return (
    <section className="border-y border-line bg-paper py-14 sm:py-20">
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight text-balance text-ink sm:text-3xl">
          {dict.stack.heading}
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] text-pretty text-muted sm:text-base">
          {dict.stack.sub}
        </p>
      </Container>

      {/* Бегущая строка: список дублируется, а трек уезжает ровно на -50%,
          поэтому склейка приходится на одинаковый кадр и шва не видно. */}
      <div
        className="marquee relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] sm:mt-10"
        aria-hidden="true"
      >
        <ul className="marquee-track flex w-max gap-3">
          {[...stack, ...stack].map((tech, i) => (
            <li
              key={`${tech}-${i}`}
              className="rounded-full border border-line bg-white px-4 py-2 font-mono text-sm whitespace-nowrap text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>

      {/* Тот же список, но доступный скринридеру и поисковику. */}
      <Container>
        <ul className="sr-only">
          {stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
