/* eslint-disable @typescript-eslint/no-explicit-any */
import { lessonsData } from "../constants";

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

import {
  teachers,
  lessonsNames,
  type Lesson,
  type Format,
  type DayOfWeek,
} from "../constants";

const isLessonVisible = (
  format: Format,
  userGroup: 0 | 1,
  isNumerator: boolean,
): boolean => {
  switch (format) {
    case "full":
      return true;
    case "top":
      return isNumerator;
    case "bottom":
      return !isNumerator;

    case "left":
      return userGroup === 0;
    case "right":
      return userGroup === 1;

    case "topLeft":
      return userGroup === 0 && isNumerator;
    case "bottomLeft":
      return userGroup === 0 && !isNumerator;

    case "topRight":
      return userGroup === 1 && isNumerator;
    case "bottomRight":
      return userGroup === 1 && !isNumerator;

    default:
      return false;
  }
};

export function getDayLessons(
  classGroup: "305" | "306" | "307",
  day: DayOfWeek,
  group: 0 | 1,
  weekType: string | number,
) {
  const groupData = lessonsData[classGroup];
  if (!groupData) return [];

  const daySchedule = groupData[day];
  if (!daySchedule) return [];

  const rowIdx = getWeekRowIndex(weekType);
  const isNumerator = rowIdx === 0;

  const out: any[] = [];

  for (const [pairStr, data] of Object.entries(daySchedule)) {
    const pair = Number(pairStr);
    if (!Number.isFinite(pair)) continue;

    const lessonsList: Lesson[] = Array.isArray(data) ? data : [data];

    for (const lesson of lessonsList) {
      if (isLessonVisible(lesson.format, group, isNumerator)) {
        const teacherData = teachers[lesson.teacher];
        const lessonName = lessonsNames[lesson.name];
        const t = pairTimes(pair);

        out.push({
          pair,
          startMin: t.startMin,
          endMin: t.endMin,
          label: t.label,

          title: lessonName || "Невідома дисципліна",
          teacher: teacherData?.name || "",
          photo: teacherData?.photo || "",

          type: lesson.type,
          class: lesson.location.auditory,
          corps: lesson.location.corps,
        });
      }
    }
  }

  out.sort((a, b) => a.startMin - b.startMin);
  return out;
}

export function pairTimes(pair: number) {
  const times: Record<
    number,
    { startMin: number; endMin: number; label: string }
  > = {
    1: { startMin: 510, endMin: 590, label: "08:30 - 09:50" },
    2: { startMin: 605, endMin: 685, label: "10:05 - 11:25" },
    3: { startMin: 700, endMin: 780, label: "11:40 - 13:00" },
    4: { startMin: 795, endMin: 875, label: "13:15 - 14:35" },
    5: { startMin: 890, endMin: 970, label: "14:50 - 16:10" },
    6: { startMin: 985, endMin: 1065, label: "16:25 - 17:45" },
    7: { startMin: 1080, endMin: 1160, label: "18:00 - 19:20" },
  };
  return times[pair] || { startMin: 0, endMin: 0, label: "" };
}

export function getEarliestStartMin(
  lessons: NormalizedLesson[],
  fallback = DAY_START_MIN,
) {
  return lessons.length
    ? Math.min(...lessons.map((l) => l.startMin))
    : fallback;
}
