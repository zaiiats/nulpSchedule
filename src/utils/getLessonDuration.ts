const lessonDuration = 80;   // хв
const breakDuration = 15;    // хв
const startingTime = 8 * 60 + 30; // 8:30 у хвилинах

function toHHMM(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

export const getLessonDuration = (lessonNum: number) => {
  // lessonNum = номер пари (2..7 у твоєму випадку)
  const startingPos = startingTime + (lessonDuration + breakDuration) * (lessonNum - 1);
  const endingPos = startingPos + lessonDuration;

  return `${toHHMM(startingPos)} — ${toHHMM(endingPos)}`;
};
