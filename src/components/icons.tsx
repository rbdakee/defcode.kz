import type { ReactNode } from "react";

/**
 * Рисованный набор иконок сайта. Все — в одной геометрии с ArrowRight
 * и галочками: сетка 24×24, штрих 1.75, скруглённые концы. Никаких
 * библиотек: иконки инлайнятся в разметку и ничего не весят.
 */

export type IconComponent = (props: { className?: string }) => ReactNode;

function Base({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      {children}
    </svg>
  );
}

/** Плитка с иконкой — единый вид визуальных якорей в карточках. */
export function IconTile({
  icon: Icon,
  className = "",
}: {
  icon: IconComponent;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`grid size-11 shrink-0 place-items-center rounded-xl bg-brand-tint text-brand ${className}`}
    >
      <Icon className="size-5.5" />
    </span>
  );
}

/* ------------------------------------------------------------------ */

export const IconMobile: IconComponent = ({ className }) => (
  <Base className={className}>
    <rect x="7" y="2.75" width="10" height="18.5" rx="2.75" />
    <path d="M10.5 18h3" />
  </Base>
);

export const IconBrowser: IconComponent = ({ className }) => (
  <Base className={className}>
    <rect x="2.75" y="4.25" width="18.5" height="15.5" rx="2.75" />
    <path d="M2.75 9h18.5M6 6.6h.01M8.75 6.6h.01M6.25 13h4M6.25 16h7.5" />
  </Base>
);

export const IconBot: IconComponent = ({ className }) => (
  <Base className={className}>
    <rect x="4.25" y="7.5" width="15.5" height="12" rx="3" />
    <path d="M12 7.5V4.6" />
    <circle cx="12" cy="3.4" r="1.1" />
    <path d="M9.25 12.25v1.5M14.75 12.25v1.5M9.75 16.5h4.5" />
  </Base>
);

export const IconChecklist: IconComponent = ({ className }) => (
  <Base className={className}>
    <rect x="5" y="4.25" width="14" height="17" rx="2.5" />
    <rect x="8.75" y="2" width="6.5" height="4" rx="1.25" />
    <path d="m8.75 14 2.25 2.25 4.5-5.25" />
  </Base>
);

export const IconSparkles: IconComponent = ({ className }) => (
  <Base className={className}>
    <path d="M11.5 5.5q1.3 6.2 7.5 7.5-6.2 1.3-7.5 7.5Q10.2 14.3 4 13q6.2-1.3 7.5-7.5Z" />
    <path d="M18.5 2.75v4.5M16.25 5h4.5" />
  </Base>
);

export const IconCursor: IconComponent = ({ className }) => (
  <Base className={className}>
    <path d="M9.25 9.25 19.5 13.2l-4.4 1.9-1.9 4.4-3.95-10.25z" />
    <path d="M5.5 2.5v2.75M2.5 5.5h2.75M11.5 3.4 10 4.9M3.4 11.5 4.9 10" />
  </Base>
);

export const IconEye: IconComponent = ({ className }) => (
  <Base className={className}>
    <path d="M2.75 12S6.25 5.9 12 5.9 21.25 12 21.25 12 17.75 18.1 12 18.1 2.75 12 2.75 12z" />
    <circle cx="12" cy="12" r="2.75" />
  </Base>
);

export const IconTable: IconComponent = ({ className }) => (
  <Base className={className}>
    <rect x="3.25" y="4.25" width="17.5" height="15.5" rx="2.5" />
    <path d="M3.25 9.5h17.5M12 9.5v10.25" />
  </Base>
);

export const IconInbox: IconComponent = ({ className }) => (
  <Base className={className}>
    <rect x="2.75" y="4.75" width="18.5" height="14.5" rx="2.5" />
    <path d="M2.75 13.25H8l1.6 2.75h4.8l1.6-2.75h5.25" />
  </Base>
);

export const IconBulb: IconComponent = ({ className }) => (
  <Base className={className}>
    <path d="M12 2.75a6.25 6.25 0 0 1 3.6 11.35c-.7.5-1.1 1.3-1.1 2.15v.25h-5v-.25c0-.85-.4-1.65-1.1-2.15A6.25 6.25 0 0 1 12 2.75z" />
    <path d="M9.75 19.75h4.5M10.75 22h2.5" />
  </Base>
);

export const IconContract: IconComponent = ({ className }) => (
  <Base className={className}>
    <path d="M14 2.75H7.25a2 2 0 0 0-2 2v14.5a2 2 0 0 0 2 2h9.5a2 2 0 0 0 2-2V7.5L14 2.75z" />
    <path d="M14 2.75V7.5h4.75M8.75 13.25h6.5M8.75 16.75h4" />
  </Base>
);

export const IconStages: IconComponent = ({ className }) => (
  <Base className={className}>
    <path d="M5.5 19.25v-3.5M12 19.25v-7.5M18.5 19.25V7.75M3.5 21.75h17" />
  </Base>
);

export const IconCode: IconComponent = ({ className }) => (
  <Base className={className}>
    <path d="m8.5 7.75-4.25 4.25L8.5 16.25M15.5 7.75l4.25 4.25-4.25 4.25M13.25 5.25l-2.5 13.5" />
  </Base>
);

export const IconShield: IconComponent = ({ className }) => (
  <Base className={className}>
    <path d="M12 2.75 19 5.4v5.3c0 4.6-2.8 7.9-7 10.35C7.8 18.6 5 15.3 5 10.7V5.4l7-2.65z" />
    <path d="m9 12.1 2.1 2.1 3.9-4.4" />
  </Base>
);

export const IconHeadset: IconComponent = ({ className }) => (
  <Base className={className}>
    <path d="M4.75 14v-2a7.25 7.25 0 0 1 14.5 0v2" />
    <rect x="3" y="13.25" width="3.75" height="5.5" rx="1.75" />
    <rect x="17.25" y="13.25" width="3.75" height="5.5" rx="1.75" />
    <path d="M19.125 18.75v.75a2.5 2.5 0 0 1-2.5 2.5H13.5" />
  </Base>
);

export const IconChart: IconComponent = ({ className }) => (
  <Base className={className}>
    <path d="M4.25 4.25v14.5a1 1 0 0 0 1 1h14.5" />
    <path d="m8 15 3.4-4 3 2.5 4.35-5.25" />
  </Base>
);

export const IconPen: IconComponent = ({ className }) => (
  <Base className={className}>
    <path d="M15.75 5 19 8.25 8.25 19l-4.25 1 1-4.25L15.75 5z" />
    <path d="m13.5 7.25 3.25 3.25" />
  </Base>
);

export const IconServer: IconComponent = ({ className }) => (
  <Base className={className}>
    <rect x="3.75" y="4" width="16.5" height="6.75" rx="2" />
    <rect x="3.75" y="13.25" width="16.5" height="6.75" rx="2" />
    <path d="M7.25 7.4h.01M7.25 16.6h.01" />
  </Base>
);

export const IconPhone: IconComponent = ({ className }) => (
  <Base className={className}>
    <path d="M21 16.42v2.58a1.9 1.9 0 0 1-2.07 1.9 18.8 18.8 0 0 1-8.2-2.92 18.5 18.5 0 0 1-5.7-5.7A18.8 18.8 0 0 1 2.1 4.07 1.9 1.9 0 0 1 4 2h2.58a1.9 1.9 0 0 1 1.9 1.63c.12.92.34 1.82.66 2.68a1.9 1.9 0 0 1-.43 2L7.6 9.4a15.2 15.2 0 0 0 7 7l1.1-1.1a1.9 1.9 0 0 1 2-.43c.86.32 1.76.54 2.68.66A1.9 1.9 0 0 1 21 16.42z" />
  </Base>
);

export const IconMail: IconComponent = ({ className }) => (
  <Base className={className}>
    <rect x="2.75" y="4.75" width="18.5" height="14.5" rx="2.5" />
    <path d="m3.75 6.5 8.25 6 8.25-6" />
  </Base>
);

export const IconSend: IconComponent = ({ className }) => (
  <Base className={className}>
    <path d="M20.75 3.25 13.6 20.6l-3.6-7.6-7.6-3.6 18.35-6.15z" />
    <path d="M10 14 20.75 3.25" />
  </Base>
);

export const IconChat: IconComponent = ({ className }) => (
  <Base className={className}>
    <path d="M12 3.25a8.75 8.75 0 0 1 0 17.5c-1.4 0-2.73-.33-3.9-.92L3.25 20.75l.92-4.85A8.75 8.75 0 0 1 12 3.25z" />
    <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
  </Base>
);

/* ------------------------------------------------------------------
   Порядок в мапах совпадает с порядком пунктов в словаре — тот же
   приём, что TARGETS в Hooks: держать иконки в словарях нельзя,
   иначе их пришлось бы дублировать и чинить в трёх языках сразу.
   ------------------------------------------------------------------ */

/** services.items: мобильные · веб и SaaS · боты · учёт · AI · сайты */
export const SERVICE_ICONS: IconComponent[] = [
  IconMobile,
  IconBrowser,
  IconBot,
  IconChecklist,
  IconSparkles,
  IconCursor,
];

/** hooks.items: не вижу команду · Excel и WhatsApp · заявки теряются · есть идея */
export const HOOK_ICONS: IconComponent[] = [IconEye, IconTable, IconInbox, IconBulb];

/** guarantees.items: договор · оплата по этапам · код ваш · данные ваши · поддержка */
export const GUARANTEE_ICONS: IconComponent[] = [
  IconContract,
  IconStages,
  IconCode,
  IconShield,
  IconHeadset,
];

/** mega.groups: аналитика · разработка · дизайн · AI · учёт · инфраструктура */
export const MEGA_GROUP_ICONS: IconComponent[] = [
  IconChart,
  IconCode,
  IconPen,
  IconSparkles,
  IconChecklist,
  IconServer,
];
