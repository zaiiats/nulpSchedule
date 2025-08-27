export const START_DATE = new Date(2025, 8, 8);
export const END_DATE   = new Date(2025, 11, 20);

export function startOfISOWeek(d: Date) {
  const nd = new Date(d);
  const day = nd.getDay() || 7;
  if (day !== 1) nd.setDate(nd.getDate() - (day - 1));
  nd.setHours(0,0,0,0);
  return nd;
}

export function addDays(d: Date, days: number) {
  const nd = new Date(d);
  nd.setDate(nd.getDate() + days);
  return nd;
}

export function clampDate(d: Date, min: Date, max: Date) {
  const t = d.getTime();
  if (t < min.getTime()) return new Date(min);
  if (t > max.getTime()) return new Date(max);
  return d;
}

export function getISOWeek(date: Date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((+d - +yearStart) / 86400000 + 1) / 7);
}

export function getWeekType(date: Date, labels = { even: "Чисельник", odd: "Знаменник" }) {
  return getISOWeek(date) % 2 === 1 ? labels.even : labels.odd;
}

export function nextDay(d: Date) {
  return addDays(d, 1);
}

export function isWeekend(d: Date) {
  const wd = d.getDay(); 
  return wd === 0 || wd === 6;
}

export function nextWorkdayOrSelf(d: Date) {
  let nd = new Date(d);
  while (isWeekend(nd)) nd = nextDay(nd);
  return nd;
}

export function fmtDayNameAndDay(d: Date) {
  const weekday = d.toLocaleDateString("uk-UA", { weekday: "long" });
  const day = d.toLocaleDateString("uk-UA", { day: "numeric" });
  const cap = weekday.charAt(0).toUpperCase() + weekday.slice(1);
  return `${cap}, ${day}`;
}

export type DayCode = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
export function getDayCode(date = new Date()): DayCode {
  const codes = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;
  return codes[date.getDay()] as DayCode;
}

export function fmtDayMonth(d: Date) {
  return d.toLocaleDateString("uk-UA", { day: "numeric", month: "short" });
}