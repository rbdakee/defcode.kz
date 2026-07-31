import { NextResponse } from "next/server";

import { sendTelegramMessage } from "@/lib/telegram";

/**
 * Заявка уходит в Telegram — отдельный сервис для этого не нужен.
 * TELEGRAM_CHAT_ID можно задать числом или тегом вида @rbdakee,
 * подробности и условия — в src/lib/telegram.ts.
 */
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
/** Только для групп с топиками: номер темы, в которую складывать заявки. */
const TOPIC_ID = process.env.TELEGRAM_TOPIC_ID;

const MAX_PER_WINDOW = 5;
const WINDOW_MS = 10 * 60 * 1000;

/**
 * Примитивный лимит по IP. Живёт в памяти процесса, поэтому при
 * перезапуске обнуляется — но свою задачу (отсечь скрипт, который
 * долбит форму в цикле) выполняет.
 */
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Не даём карте расти бесконечно на долгоживущем процессе.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

/** Telegram упадёт с ошибкой, если в HTML-разметке встретятся сырые < > & */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function clamp(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  // Ловушка сработала — отвечаем как при успехе, чтобы бот не подбирал обход.
  if (clamp(body.website, 100)) {
    return NextResponse.json({ ok: true });
  }

  const name = clamp(body.name, 120);
  const contact = clamp(body.contact, 200);
  const task = clamp(body.task, 4000);
  const locale = clamp(body.locale, 10) || "ru";

  if (!name || !contact) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  if (!BOT_TOKEN || !CHAT_ID) {
    // Тихо терять заявки нельзя: пишем в лог и честно сообщаем об ошибке,
    // чтобы посетитель увидел подсказку написать напрямую в мессенджер.
    console.error(
      "[lead] TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы. Заявка не отправлена:",
      { name, contact, task, locale },
    );
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const text = [
    "<b>Новая заявка с сайта</b>",
    "",
    `<b>Имя:</b> ${escapeHtml(name)}`,
    `<b>Контакт:</b> ${escapeHtml(contact)}`,
    task ? `<b>Задача:</b> ${escapeHtml(task)}` : null,
    "",
    `<i>Язык страницы: ${escapeHtml(locale)}</i>`,
  ]
    .filter(Boolean)
    .join("\n");

  const sent = await sendTelegramMessage(BOT_TOKEN, CHAT_ID, text, TOPIC_ID);

  if (!sent.ok) {
    // Тихо терять заявку нельзя: причина уже в логе, дублируем саму заявку,
    // чтобы её можно было достать оттуда руками.
    console.error("[lead] Заявка не отправлена:", { name, contact, task, locale });
    return NextResponse.json(
      { error: sent.reason === "unreachable" ? "telegram_unreachable" : "telegram_failed" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
