/**
 * Отправка сообщений ботом.
 *
 * Адресат в TELEGRAM_CHAT_ID задаётся одним из двух способов:
 *   • числовой id чата — `123456789` или `-1001234567890` у групп;
 *   • тег — `@rbdakee`.
 *
 * С тегом есть нюанс, который стоит знать заранее. Bot API принимает
 * `@имя` в chat_id только для публичных каналов и супергрупп. Для личного
 * аккаунта он отвечает «chat not found»: метода «найди пользователя по
 * тегу» в API нет вообще — иначе боты рассылали бы спам кому угодно.
 *
 * Обход ровно один, и он же требование Telegram: человек должен сам
 * написать боту (кнопка «Начать» / команда /start). После этого его чат
 * появляется в getUpdates, откуда мы и достаём числовой id, а дальше
 * пишем уже по нему. Найденный id держим в памяти процесса, чтобы не
 * дёргать getUpdates на каждую заявку.
 */

type TelegramResponse = {
  ok: boolean;
  description?: string;
  error_code?: number;
  result?: unknown;
};

type TelegramChat = {
  id: number;
  type?: string;
  username?: string;
  is_bot?: boolean;
};

/** Тег в нижнем регистре → числовой id. Сбрасывается при перезапуске. */
const resolvedIds = new Map<string, number>();

async function callApi(
  token: string,
  method: string,
  payload: Record<string, unknown>,
): Promise<TelegramResponse> {
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  try {
    return (await res.json()) as TelegramResponse;
  } catch {
    return { ok: false, error_code: res.status, description: res.statusText };
  }
}

/** Все объекты чатов и отправителей, которые встречаются в одном update. */
function chatsInUpdate(update: Record<string, unknown>): TelegramChat[] {
  const found: TelegramChat[] = [];

  for (const key of [
    "message",
    "edited_message",
    "channel_post",
    "edited_channel_post",
    "my_chat_member",
    "chat_member",
    "callback_query",
  ]) {
    const holder = update[key] as Record<string, unknown> | undefined;
    if (!holder || typeof holder !== "object") continue;

    const chat = holder.chat as TelegramChat | undefined;
    if (chat?.id) found.push(chat);

    // from пригодится, если человек писал боту в группе: id личного чата
    // у пользователя тот же самый.
    const from = holder.from as TelegramChat | undefined;
    if (from?.id && !from.is_bot) found.push({ ...from, type: "private" });
  }

  return found;
}

/**
 * Ищет числовой id по тегу среди последних обновлений бота.
 * offset отрицательный: берём хвост очереди и ничего в ней не подтверждаем,
 * иначе апдейты пропали бы для настоящего обработчика бота, если он есть.
 */
async function resolveByUsername(token: string, tag: string): Promise<number | null> {
  const key = tag.replace(/^@/, "").toLowerCase();

  const cached = resolvedIds.get(key);
  if (cached) return cached;

  const res = await callApi(token, "getUpdates", { offset: -100, limit: 100 });

  if (!res.ok || !Array.isArray(res.result)) {
    console.error(
      `[telegram] Не удалось прочитать getUpdates, чтобы найти ${tag}:`,
      res.description ?? "неизвестная ошибка",
      res.error_code === 409
        ? "— у бота включён webhook, getUpdates при нём не работает. Укажите числовой TELEGRAM_CHAT_ID."
        : "",
    );
    return null;
  }

  // Записи chat важнее from: там тип чата достоверный.
  const candidates = (res.result as Record<string, unknown>[])
    .flatMap(chatsInUpdate)
    .filter((chat) => chat.username?.toLowerCase() === key);

  const match = candidates[0];
  if (!match) {
    console.error(
      `[telegram] ${tag} не найден среди тех, кто писал боту. Так и должно быть, пока адресат ` +
        "сам не открыл бота и не нажал «Начать» — Telegram не даёт ботам писать первыми. " +
        "Для канала или супергруппы вместо этого добавьте бота туда участником.",
    );
    return null;
  }

  resolvedIds.set(key, match.id);
  return match.id;
}

export type SendResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "chat_not_found" | "failed" | "unreachable" };

/** Ошибки про топики звучат непонятно — переводим в конкретное действие. */
function topicHint(description: string | undefined, thread: number | undefined): string {
  const text = description?.toLowerCase() ?? "";

  if (text.includes("topic_closed")) {
    return thread === undefined
      ? "— тема General в группе закрыта. Откройте её или укажите TELEGRAM_TOPIC_ID нужного топика."
      : "— этот топик закрыт. Откройте его или возьмите id другого.";
  }

  if (text.includes("thread not found")) {
    return "— TELEGRAM_TOPIC_ID указывает на несуществующий топик. Это число из ссылки на сообщение в теме, а не id чата.";
  }

  if (thread !== undefined && text.includes("chat not found")) {
    return "— проверьте TELEGRAM_CHAT_ID: у супергруппы он отрицательный и начинается с -100.";
  }

  return "";
}

/**
 * Разбирает слитную запись «чат_топик» вида -1001234567890_4 — в таком
 * виде id темы отдают многие боты-помощники, и его удобно вставить целиком.
 *
 * Подчёркивание разрешено и в тегах (@my_channel), поэтому режем только
 * то, что целиком состоит из цифр: «минус, число, подчёркивание, число».
 */
function splitChatAndTopic(raw: string): { chat: string; topic?: string } {
  const combined = /^(-?\d+)_(\d+)$/.exec(raw);
  return combined ? { chat: combined[1], topic: combined[2] } : { chat: raw };
}

/**
 * Отправляет сообщение. chatId — число, `@тег`, строка с числом или
 * слитная запись `-100…_4` вместе с номером темы.
 *
 * topicId нужен только для групп с топиками: без него сообщение падает
 * в тему General, а если её закрыли или скрыли — не доходит вовсе.
 * Обычным группам и личкам параметр передавать нельзя, Telegram ругнётся.
 */
export async function sendTelegramMessage(
  token: string | undefined,
  chatId: string | undefined,
  text: string,
  topicId?: string,
): Promise<SendResult> {
  if (!token || !chatId) return { ok: false, reason: "not_configured" };

  const { chat, topic } = splitChatAndTopic(chatId.trim());

  const target = chat;
  const isTag = target.startsWith("@");

  // Отдельная переменная главнее: ею можно переопределить слитную запись.
  const rawThread = topicId?.trim() || topic;
  const thread = rawThread ? Number(rawThread) : undefined;

  const send = (to: string | number) =>
    callApi(token, "sendMessage", {
      chat_id: to,
      text,
      parse_mode: "HTML",
      link_preview_options: { is_disabled: true },
      ...(Number.isFinite(thread) ? { message_thread_id: thread } : {}),
    });

  try {
    // По тегу пробуем напрямую: у каналов и супергрупп так и работает.
    const known = isTag ? resolvedIds.get(target.slice(1).toLowerCase()) : undefined;
    let res = await send(known ?? target);

    if (!res.ok && isTag && !known) {
      // Причину неудачи resolveByUsername пишет в лог сам: у «webhook мешает»
      // и «человек не нажимал Начать» разные лечения.
      const id = await resolveByUsername(token, target);
      if (id === null) return { ok: false, reason: "chat_not_found" };

      res = await send(id);

      // Заготовка протухла: адресат мог удалить чат с ботом.
      if (!res.ok) resolvedIds.delete(target.slice(1).toLowerCase());
    }

    if (!res.ok) {
      console.error(
        "[telegram] Сообщение не ушло:",
        res.error_code ?? "",
        res.description ?? "неизвестная ошибка",
        topicHint(res.description, thread),
      );
      return { ok: false, reason: "failed" };
    }

    return { ok: true };
  } catch (error) {
    console.error("[telegram] Не удалось достучаться до api.telegram.org:", error);
    return { ok: false, reason: "unreachable" };
  }
}
