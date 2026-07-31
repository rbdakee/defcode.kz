const STORAGE_KEY = "defcode:prefill";

/**
 * Клик по задаче в меню услуг ведёт на страницу контактов — а форма
 * должна открыться уже заполненной. Значение переживает переход
 * в sessionStorage: query-параметр сделал бы страницу динамической,
 * а адрес — грязным.
 *
 * Приватные режимы браузеров умеют запрещать хранилище, поэтому оба
 * вызова молча переживают отказ: в худшем случае форма откроется пустой.
 */
export function stashPrefill(text: string) {
  try {
    sessionStorage.setItem(STORAGE_KEY, text);
  } catch {
    /* хранилище недоступно — не страшно */
  }
}

/** Забирает значение и сразу его стирает: подстановка одноразовая. */
export function takePrefill(): string | null {
  try {
    const value = sessionStorage.getItem(STORAGE_KEY);
    if (value) sessionStorage.removeItem(STORAGE_KEY);
    return value;
  } catch {
    return null;
  }
}
