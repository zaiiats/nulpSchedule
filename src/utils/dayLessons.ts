/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DayCode } from "./date";
import { lessonsData } from "../utils/lessonsData";

export const DAY_START_MIN = 8 * 60 + 30;
export const LESSON_MIN = 80;
export const BREAK_MIN = 15;

export type NormalizedLesson = {
  pair: number;
  startMin: number;
  endMin: number;
  label: string;
  title: string;
  teacher: string;
  type: string;
  class: string;
  corps: string;
  photo: string;
};

export function getWeekRowIndex(weekType: string | number): 0 | 1 {
  if (typeof weekType === "number") return weekType % 2 === 1 ? 0 : 1;
  const w = weekType.toLowerCase();
  if (w.includes("чис") || w.includes("пар")) return 0;
  if (w.includes("зна") || w.includes("непар")) return 1;
  return 0;
}

function toHHMM(totalMin: number): string {
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** час пари у хвилинах від початку доби */
export function pairTimes(pair: number) {
  // якщо у тебе пари стартують з "2", формула (pair-1)
  const startMin = DAY_START_MIN + (LESSON_MIN + BREAK_MIN) * (pair - 1);
  const endMin = startMin + LESSON_MIN;
  return { startMin, endMin, label: `${toHHMM(startMin)} — ${toHHMM(endMin)}` };
}

/** головна утиліта: повертає нормалізований список занять на день */
export function getDayLessons(
  day: DayCode,
  group: 0 | 1,
  weekType: string | number
): NormalizedLesson[] {
  const rowIdx = getWeekRowIndex(weekType);
  const dayObj = (lessonsData as any)?.[day] as Record<string, any> | undefined;
  if (!dayObj) return [];

  const out: NormalizedLesson[] = [];

  // перебираємо всі пари, що є у дня
  for (const k of Object.keys(dayObj)) {
    const pair = Number(k);
    if (!Number.isFinite(pair)) continue;

    const slot = dayObj[pair] as any[][]; // [[Cell,Cell],[Cell,Cell]]
    const cell = slot?.[rowIdx]?.[group]; // потрібна клітинка

    // порожньо — пропускаємо
    if (!cell || (typeof cell === "object" && Object.keys(cell).length === 0))
      continue;

    const t = pairTimes(pair);

    out.push({
      pair,
      startMin: t.startMin,
      endMin: t.endMin,
      label: t.label,
      title: cell.name ?? "Урок",
      teacher: cell.teacher ?? "",
      type: cell.type ?? "",
      class: cell.class ?? "",
      corps: cell.corps ?? "",
      photo: cell.teacherPhoto ?? "",
    });
  }

  // впорядковуємо за часом початку
  out.sort((a, b) => a.startMin - b.startMin);
  return out;
}

/** допоміжне: дає найраніший старт дня (для побудови гріда) */
export function getEarliestStartMin(
  lessons: NormalizedLesson[],
  fallback = DAY_START_MIN
) {
  return lessons.length
    ? Math.min(...lessons.map((l) => l.startMin))
    : fallback;
}
