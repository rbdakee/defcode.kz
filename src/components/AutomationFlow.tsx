import { bubble } from "./ui";
import type { Dict } from "@/i18n";

/**
 * Схема пути заявки: форма → таблица → уведомление.
 *
 * Это иллюстрация, а не снимок клиентской системы: имена, телефон и суммы
 * выдуманы намеренно, показывать чужую CRM мы не имеем права. Собрано
 * вёрсткой, а не картинкой — так оно переводится на три языка, остаётся
 * чётким на любом экране и весит нисколько.
 */
export default function AutomationFlow({ dict }: { dict: Dict }) {
  const { automation } = dict;

  return (
    <figure className={`${bubble} p-5 sm:p-7`}>
      {/* На мобильном панели идут колонкой и стрелка смотрит вниз,
          на десктопе — в строку. Поворот делаем классом, а не второй
          разметкой: две копии стрелки разъезжались бы при переводе. */}
      <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center md:gap-4">
        <Panel label={automation.form.label}>
          <div className="flex h-full flex-col gap-2.5 rounded-xl bg-white p-3.5">
            <Field label={automation.form.name} value={automation.form.nameValue} />
            <Field label={automation.form.phone} value={automation.form.phoneValue} />
            <Field label={automation.form.task} value={automation.form.taskValue} />
            <div className="mt-auto rounded-full bg-brand py-2 text-center text-[13px] font-semibold text-white">
              {automation.form.submit}
            </div>
          </div>
        </Panel>

        <Arrow />

        <Panel label={automation.sheet.label}>
          <div className="overflow-hidden rounded-xl bg-white">
            <div className="grid grid-cols-4 bg-[#0f9d58] px-2.5 py-2 text-[10px] font-semibold text-white">
              {automation.sheet.cols.map((col) => (
                <span key={col} className="truncate">
                  {col}
                </span>
              ))}
            </div>

            {automation.sheet.rows.map((row) => (
              <div
                key={row[0]}
                className="grid grid-cols-4 px-2.5 py-2 text-[11px] text-ink"
              >
                {row.map((cell, i) => (
                  <span key={i} className="truncate">
                    {cell}
                  </span>
                ))}
              </div>
            ))}

            {/* Свежая строка подсвечена — видно, что заявка долетела. */}
            <div className="grid grid-cols-4 bg-[#e8f5e9] px-2.5 py-2 text-[11px] font-medium text-ink">
              {automation.sheet.freshRow.map((cell, i) => (
                <span key={i} className="flex items-center gap-1 truncate">
                  {i === 3 ? (
                    <span className="size-1.5 shrink-0 rounded-full bg-[#0f9d58]" />
                  ) : null}
                  {cell}
                </span>
              ))}
            </div>
          </div>
        </Panel>

        <Arrow />

        <Panel label={automation.telegram.label}>
          <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white">
            <div className="flex items-center gap-2 bg-[#517da2] px-3 py-2.5 text-white">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white text-[11px] font-bold text-[#517da2]">
                D
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[12px] leading-tight font-semibold">
                  {automation.telegram.chat}
                </span>
                <span className="block text-[10px] opacity-80">
                  {automation.telegram.bot}
                </span>
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-end bg-[#ebeef0] p-3">
              <div className="rounded-xl rounded-tl-sm bg-white p-2.5 text-[11px] leading-relaxed text-ink shadow-[0_1px_2px_rgba(14,14,49,0.12)]">
                <span className="block font-bold">
                  {automation.telegram.title}
                </span>
                <span className="mt-1 block">
                  {automation.form.nameValue} · {automation.form.phoneValue}
                </span>
                <span className="block">{automation.telegram.channel}</span>
                <span className="mt-1 block text-muted">
                  «{automation.form.taskValue}»
                </span>
                <span className="mt-1 block text-right text-[9px] text-muted">
                  {automation.telegram.time}
                </span>
              </div>
            </div>

            <div className="py-2 text-center text-[11px] font-medium text-[#3390ec]">
              {automation.telegram.action}
            </div>
          </div>
        </Panel>
      </div>

      <figcaption className="mt-5 text-sm leading-relaxed text-pretty text-muted">
        {automation.caption}
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */

function Panel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <span className="mb-2.5 font-mono text-[10px] tracking-widest text-muted uppercase">
        {label}
      </span>
      <div className="flex-1">{children}</div>
    </div>
  );
}

/** На мобильном стрелка смотрит вниз, на десктопе — вправо. */
function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="mx-auto text-brand rotate-90 md:rotate-0"
    >
      <svg viewBox="0 0 24 24" fill="none" className="size-5">
        <path
          d="M4 12h15m0 0-5-5m5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <span className="block">
      <span className="mb-1 block text-[10px] text-muted">{label}</span>
      <span className="block truncate rounded-lg bg-paper px-2.5 py-2 text-[12px] text-ink">
        {value}
      </span>
    </span>
  );
}
