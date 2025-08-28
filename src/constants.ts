export const STARTING_TIME = 8 * 60;
export const ENDING_TIME = 4 * 60;
export const DAY_TIME = 24 * 60 - STARTING_TIME - ENDING_TIME;
export const TIME_STEP = 5;
export const LESSON_DURATION = 80;
export const BREAK_DURATION = 15;

export const START_DATE = new Date(2025, 8, 8); // 2025-9-08
export const END_DATE = new Date(2025, 11, 20); // 2025-12-20

export const TYPE_LABELS: Record<string, string> = {
  lab: "Лабка",
  practice: "Практ",
  lection: "Лекція",
};

export const TYPE_COLORS: Record<
  string,
  { bg: string; border: string; text: string }
> = {
  lab: {
    bg: "rgba(234,179,8,0.12)",
    border: "rgba(234,179,8,0.35)",
    text: "#facc15",
  },
  practice: {
    bg: "rgba(239,68,68,0.12)",
    border: "rgba(239,68,68,0.35)",
    text: "#f87171",
  },
  lection: {
    bg: "rgba(34,197,94,0.12)",
    border: "rgba(34,197,94,0.35)",
    text: "#4ade80",
  },
};
