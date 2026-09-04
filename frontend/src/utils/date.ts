export const MIN_PER_DAY = 24 * 60;

export function toHHMM(min: number) {
  const n = ((min % MIN_PER_DAY) + MIN_PER_DAY) % MIN_PER_DAY;
  const h = Math.floor(n / 60);
  const m = n % 60;
  return `${h}:${String(m).padStart(2, "0")}`;
}