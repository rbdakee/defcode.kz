"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { bubble } from "./ui";
import type { Dict } from "@/i18n";

/** Сколько «печатает» бот и сколько времени даём прочитать реплику. */
const TYPING_MS = 1100;
const READ_MS = 1500;
const START_MS = 500;
/** Пауза перед тем, как диалог начнётся заново. */
const HOLD_MS = 3200;

/* Системную настройку «уменьшить движение» читаем через внешний источник,
   а не эффектом с setState: так значение известно уже на первом рендере,
   не вызывает лишнюю перерисовку и подхватывается, если её переключить
   прямо во время просмотра. На сервере считаем, что движение разрешено. */
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduced(onChange: () => void) {
  const mq = matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const getReduced = () => matchMedia(REDUCED_QUERY).matches;
const getReducedOnServer = () => false;

/**
 * Демонстрация диалога с ассистентом — вёрсткой, а не видео.
 *
 * Видеофайл пришлось бы держать в трёх копиях под три языка, он весил бы
 * мегабайты и мылил бы на ретине. Здесь диалог собирается из словаря,
 * поэтому переводится сам и остаётся чётким.
 *
 * Таймер запускается, только когда блок доехал до экрана: анимация,
 * крутящаяся за пределами вида, зря будит процессор на телефоне.
 * При включённом «уменьшить движение» показываем всю переписку сразу.
 */
export default function AiChat({ dict }: { dict: Dict }) {
  const { aiChat } = dict;
  const messages = aiChat.messages;

  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);

  const reduced = useSyncExternalStore(
    subscribeReduced,
    getReduced,
    getReducedOnServer,
  );

  /* Ждём появления блока в зоне видимости. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Наблюдателя нет — показываем сразу, но через таймер: менять
       состояние прямо в теле эффекта нельзя, это лишний каскад рендеров. */
    if (typeof IntersectionObserver === "undefined") {
      const t = setTimeout(() => setActive(true));
      return () => clearTimeout(t);
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Одна цепочка таймеров на весь проход диалога. Каждая реплика знает
     своё смещение от начала, поэтому состояние не гоняется по кругу
     через зависимости эффекта и цикл не может разъехаться. */
  useEffect(() => {
    /* При «уменьшить движение» переписка просто показана целиком —
       её собирает рендер ниже, таймеры здесь не нужны вовсе. */
    if (!active || reduced) return;

    let stopped = false;
    let timers: ReturnType<typeof setTimeout>[] = [];

    const run = () => {
      timers = [];

      /* Сброс — тоже событие в цепочке, а не вызов из тела эффекта:
         так он одинаково отрабатывает и на первом проходе, и на повторе. */
      timers.push(
        setTimeout(() => {
          setShown(0);
          setTyping(false);
        }),
      );

      let at = START_MS;

      messages.forEach((message, i) => {
        if (message.from === "bot") {
          timers.push(setTimeout(() => setTyping(true), at));
          at += TYPING_MS;
        }

        timers.push(
          setTimeout(() => {
            setTyping(false);
            setShown(i + 1);
          }, at),
        );

        at += READ_MS;
      });

      timers.push(
        setTimeout(() => {
          if (!stopped) run();
        }, at + HOLD_MS),
      );
    };

    run();

    return () => {
      stopped = true;
      timers.forEach(clearTimeout);
    };
  }, [active, reduced, messages]);

  /* При выключенном движении переписка видна целиком с первого кадра. */
  const visible = reduced ? messages.length : shown;

  return (
    /* На широком экране окно чата и подпись встают рядом: одно окно
       шириной в текстовую колонку посреди пустой полосы выглядело бы
       забытым. На узком — подпись просто уходит под окно. */
    <figure
      ref={ref}
      className={`${bubble} p-5 sm:p-7 lg:flex lg:items-center lg:gap-12`}
    >
      <div className="mx-auto flex w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-[0_18px_44px_-30px_rgba(14,14,49,0.45)] lg:mx-0 lg:shrink-0">
        <header className="flex items-center gap-2.5 border-b border-line px-4 py-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand font-mono text-sm text-white">
            {"}"}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm leading-tight font-semibold text-ink">
              {aiChat.title}
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-muted">
              <span className="size-1.5 rounded-full bg-[#27c93f]" />
              {aiChat.status}
            </span>
          </span>
        </header>

        {/* Высоту задаёт невидимая копия всей переписки, а живые реплики
            лежат поверх неё абсолютом. Так блок сразу занимает столько,
            сколько займёт в конце: он не растёт по ходу диалога и не толкает
            страницу вниз на каждой новой реплике. Числом высоту не задать —
            у русского, казахского и английского текста разная длина. */}
        <div className="relative overflow-hidden bg-paper p-4">
          <div aria-hidden="true" className="invisible flex flex-col gap-2">
            {messages.map((message, i) => (
              <Bubble
                key={i}
                mine={message.from === "user"}
                text={message.text}
              />
            ))}
          </div>

          {/* Реплики копятся снизу, старые уходят за верхний край —
              как в настоящем мессенджере. */}
          <div
            className="absolute inset-0 flex flex-col justify-end gap-2 p-4"
            aria-live="polite"
          >
            {messages.slice(0, visible).map((message, i) => (
              <Bubble
                key={i}
                mine={message.from === "user"}
                text={message.text}
              />
            ))}

            {typing ? <Typing label={aiChat.typing} /> : null}
          </div>
        </div>
      </div>

      <figcaption className="mt-5 text-sm leading-relaxed text-pretty text-muted lg:mt-0 lg:flex-1 lg:text-xl lg:leading-relaxed">
        {aiChat.caption}
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */

function Bubble({ mine, text }: { mine: boolean; text: string }) {
  return (
    <p
      className={`chat-in max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
        mine
          ? "self-end rounded-br-sm bg-brand text-white"
          : "self-start rounded-bl-sm bg-white text-ink shadow-[0_1px_2px_rgba(14,14,49,0.1)]"
      }`}
    >
      {text}
    </p>
  );
}

function Typing({ label }: { label: string }) {
  return (
    <p className="chat-in flex w-fit items-center gap-1 self-start rounded-2xl rounded-bl-sm bg-white px-3.5 py-3 shadow-[0_1px_2px_rgba(14,14,49,0.1)]">
      <span className="sr-only">{label}</span>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          aria-hidden="true"
          className="typing-dot size-1.5 rounded-full bg-muted"
          style={{ animationDelay: `${i * 160}ms` }}
        />
      ))}
    </p>
  );
}
