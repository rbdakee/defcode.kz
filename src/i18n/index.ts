import ru from "./dictionaries/ru";
import kk from "./dictionaries/kk";
import en from "./dictionaries/en";
import type { Locale } from "./config";

const dictionaries = { ru, kk, en } as const;

export function getDict(locale: Locale) {
  return dictionaries[locale];
}

export type { Dict } from "./dictionaries/ru";
