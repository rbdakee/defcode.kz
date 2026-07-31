import { TechLogo } from "./tech-logos";
import { stack } from "@/content/stack";
import type { Dict } from "@/i18n";

/**
 * Секция собрана вручную, а не через Section: бегущей строке нужна
 * вся ширина панели без внутренних полей, иначе лента «обрывалась бы»
 * на отступах. Скругление панели само обрезает ленту по краям.
 */
export default function Stack({ dict }: { dict: Dict }) {
  return (
    <section className="px-2 py-2 sm:px-4 sm:py-2.5 lg:px-6 lg:py-3">
      <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-3xl bg-night py-14 text-white sm:py-16 lg:rounded-[2.5rem] lg:py-20">
        <div className="px-4 sm:px-8 lg:px-12">
          <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            {dict.stack.heading}
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] text-pretty text-muted-dark sm:text-base">
            {dict.stack.sub}
          </p>
        </div>

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
                className="flex items-center gap-2.5 rounded-full bg-white/6 px-4 py-2 font-mono text-sm whitespace-nowrap text-white/85 ring-1 ring-white/10 ring-inset"
              >
                <TechLogo name={tech} className="size-4 text-white/70" />
                {tech}
              </li>
            ))}
          </ul>
        </div>

        {/* Тот же список, но доступный скринридеру и поисковику. */}
        <ul className="sr-only">
          {stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
