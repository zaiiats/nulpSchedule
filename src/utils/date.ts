// Типи
export type DayCode = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

// Константи
export const MIN_PER_DAY = 24 * 60;

// Базові утиліти/математика
export function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

// Операції з датами (додавання/наступний день/вихідні/наступний робочий)
export function addDays(d: Date, days: number) {
  const nd = new Date(d);
  nd.setDate(nd.getDate() + days);
  return nd;
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
  console.log(nd);
  while (isWeekend(nd)) nd = nextDay(nd);
  console.log(nd);
  return nd;
}

// Межі/кламп дати
export function clampDate(d: Date, min: Date, max: Date) {
  const t = d.getTime();
  if (t < min.getTime()) return new Date(min);
  if (t > max.getTime()) return new Date(max);
  return d;
}

// Тиждень (ISO)
export function startOfISOWeek(d: Date) {
  const nd = new Date(d);
  const day = nd.getDay() || 7;
  if (day !== 1) nd.setDate(nd.getDate() - (day - 1));
  nd.setHours(0, 0, 0, 0);
  return nd;
}

export function getISOWeek(date: Date) {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((+d - +yearStart) / 86400000 + 1) / 7);
}

export function getWeekType(
  date: Date,
  labels = { even: "Чисельник", odd: "Знаменник" }
) {
  return getISOWeek(date) % 2 === 1 ? labels.even : labels.odd;
}

// День тижня / коди
export function getDayCode(date = new Date()): DayCode {
  const codes = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;
  return codes[date.getDay()] as DayCode;
}

// Порівняння дат
export const toYMD = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

export const isSameLocalDate = (a: Date, b: Date) => toYMD(a) === toYMD(b);

export function isTodayDate(d: Date) {
  return isSameLocalDate(d, new Date());
}

// Форматування дат/часу
export function fmtDayMonth(d: Date) {
  return d.toLocaleDateString("uk-UA", { day: "numeric", month: "short" });
}

export function fmtDayNameAndDay(d: Date) {
  const weekday = d.toLocaleDateString("uk-UA", { weekday: "long" });
  const day = d.toLocaleDateString("uk-UA", { day: "numeric" });
  const cap = weekday.charAt(0).toUpperCase() + weekday.slice(1);
  const month = d.toLocaleDateString("uk-UA", { month: "short" });  
  return `${cap}, ${day} ${month}`;
}

export function toHHMM(min: number) {
  const n = ((min % MIN_PER_DAY) + MIN_PER_DAY) % MIN_PER_DAY;
  const h = Math.floor(n / 60);
  const m = n % 60;
  return `${h}:${String(m).padStart(2, "0")}`;
}

export function toHH_MM_fromDate(d: Date) {
  const h = d.getHours();
  const m = d.getMinutes();
  return `${h}:${String(m).padStart(2, "0")}`;
}
