import { BASE_WEEK_START } from "./constants";

export const MIN_PER_DAY = 24 * 60;

export function toHHMM(min: number) {
  const n = ((min % MIN_PER_DAY) + MIN_PER_DAY) % MIN_PER_DAY;
  const h = Math.floor(n / 60);
  const m = n % 60;
  return `${h}:${String(m).padStart(2, "0")}`;
}

export function getStartOfWeek(d: Date) {
  const date = new Date(d);
  const day = date.getDay() || 7;
  date.setDate(date.getDate() - (day - 1));
  date.setHours(0, 0, 0, 0);
  return date;
}

export function getWeekType(d: Date): 0 | 1 {
  const start = getStartOfWeek(d).getTime();
  const base = getStartOfWeek(BASE_WEEK_START).getTime();
  const diffWeeks = Math.round((start - base) / (1000 * 60 * 60 * 24 * 7));
  return Math.abs(diffWeeks) % 2 === 0 ? 0 : 1;
}

export function formatDateRange(d: Date) {
  const start = getStartOfWeek(d);
  const fmt = (date: Date) =>
    `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}`;
  return fmt(start);
}
