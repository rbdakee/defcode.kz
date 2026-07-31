import { NextResponse } from "next/server";

/** Заявка уходит в Telegram-чат — отдельный сервис для этого не нужен. */
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

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

  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!res.ok) {
      console.error("[lead] Telegram ответил ошибкой:", res.status, await res.text());
      return NextResponse.json({ error: "telegram_failed" }, { status: 502 });
    }
  } catch (error) {
    console.error("[lead] Не удалось достучаться до Telegram:", error);
    return NextResponse.json({ error: "telegram_unreachable" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
