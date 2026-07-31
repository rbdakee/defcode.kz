import type { ReactNode } from "react";
import Reveal from "./Reveal";
import AutomationFlow from "./AutomationFlow";
import AiChat from "./AiChat";
import { Section, SectionHead } from "./ui";
import type { Dict } from "@/i18n";

/**
 * Два направления, которые словами объясняются хуже всего: автоматизация
 * заявок и ассистент на языковой модели. Здесь они показаны, а не описаны.
 *
 * Демонстрации идут одна под другой, а не в две колонки: схеме потока
 * нужны три панели в ряд, и в половине ширины таблица Google Sheets
 * схлопывалась в нечитаемые огрызки колонок.
 *
 * Оба блока — иллюстрации собственного изготовления. Снимков клиентских
 * систем тут нет и быть не может: это ровно то, что мы обещаем не публиковать.
 */
export default function ServiceDemos({ dict }: { dict: Dict }) {
  return (
    <Section id="demos">
      <SectionHead title={dict.demos.heading} sub={dict.demos.sub} />

      <div className="mt-10 space-y-4 sm:mt-14">
        <Demo heading={dict.automation.heading}>
          <AutomationFlow dict={dict} />
        </Demo>

        <Demo heading={dict.aiChat.heading} delay={70}>
          <AiChat dict={dict} />
        </Demo>
      </div>
    </Section>
  );
}

function Demo({
  heading,
  delay = 0,
  children,
}: {
  heading: string;
  delay?: number;
  children: ReactNode;
}) {
  return (
    <Reveal delay={delay}>
      <h3 className="mb-4 text-lg font-semibold text-ink">{heading}</h3>
      {children}
    </Reveal>
  );
}
