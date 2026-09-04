import {
  teachers,
  lessonsNames,
  lessonsData,
  type Lesson,
  type Format,
  type DayOfWeek,
} from "./constants";

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
    8: { startMin: 1175, endMin: 1255, label: "19:35 - 20:55" },
  };
  return times[pair] || { startMin: 0, endMin: 0, label: "" };
}

export function getDayLessons(day: DayOfWeek, group: 0 | 1, weekType: 0 | 1) {
  const daySchedule = lessonsData[day];
  if (!daySchedule) return [];

  const isNumerator = weekType === 0;
  const out: NormalizedLesson[] = [];

  for (const [pairStr, data] of Object.entries(daySchedule)) {
    const pair = Number(pairStr);
    if (!Number.isFinite(pair)) continue;

    const lessonsList: Lesson[] = Array.isArray(data) ? data : [data];

    for (const lesson of lessonsList) {
      if (isLessonVisible(lesson.format, group, isNumerator)) {
        const teacherData = teachers[lesson.teacher as keyof typeof teachers];
        const lessonName =
          lessonsNames[lesson.name as keyof typeof lessonsNames];
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
