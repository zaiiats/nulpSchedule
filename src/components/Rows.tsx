import styled from "styled-components";
import type { DayCode } from "../utils/date";
import { TIME_STEP, STARTING_TIME, DAY_TIME } from "../constants";
import Lesson from "./Lesson";
import { getDayLessons } from "../utils/dayLessons";

const HOURS_COL = 80; // px

const Grid = styled.div<{ $rows: number }>`
  position: relative;
  display: grid;
  grid-template-columns: ${HOURS_COL}px 1fr; /* години | уроки */
  grid-template-rows: repeat(${({ $rows }) => $rows}, minmax(0, 1fr));
  column-gap: 6px;
  row-gap: 2px;
  height: 100%;
  width: 100%;
`;

const HourCell = styled.div`
  grid-column: 1;
  align-self: start;
  justify-self: start;
  padding: 2px 4px;
  font-size: 11px;
  color: var(--muted);
  user-select: none;
  pointer-events: none;
  border-top: 1px dashed rgba(148, 163, 184, 0.25);
`;

type Props = {
  day: DayCode;
  group: 0 | 1;
  weekType: string | number;
};

const MIN_PER_DAY = 24 * 60;

function toHHMM(min: number) {
  const n = ((min % MIN_PER_DAY) + MIN_PER_DAY) % MIN_PER_DAY;
  const h = Math.floor(n / 60);
  const m = n % 60;
  return `${h}:${String(m).padStart(2, "0")}`;
}

export default function Rows({ day, group, weekType }: Props) {
  const totalRows = Math.max(1, Math.ceil(DAY_TIME / TIME_STEP));

  const hourCells = [];
  const HOUR_SPAN = 60 / TIME_STEP;

  for (let t = STARTING_TIME; t < STARTING_TIME + DAY_TIME; t += 60) {
    const relStart = Math.floor((t - STARTING_TIME) / TIME_STEP);
    const gridStart = relStart + 1;
    const span = Math.min(HOUR_SPAN, totalRows - relStart);
    const label = `${toHHMM(t)} - ${toHHMM(t + 60)}`;

    hourCells.push(
      <HourCell
        key={`hour-${t}`}
        style={{ gridRow: `${gridStart} / span ${span}` }}
      >
        {label}
      </HourCell>
    );
  }
  const lessons = getDayLessons(day, group, weekType);
  const lessonCells = lessons.map((l) => {
    const delta =
      (((l.startMin - STARTING_TIME) % MIN_PER_DAY) + MIN_PER_DAY) %
      MIN_PER_DAY;

    const startIndex = Math.max(0, Math.floor(delta / TIME_STEP));
    const span = Math.max(1, Math.round((l.endMin - l.startMin) / TIME_STEP));

    const gridStart = Math.min(startIndex + 1, totalRows);
    const gridSpan = Math.min(span, Math.max(1, totalRows - startIndex));

    return (
      <Lesson
        key={`${day}-${l.pair}-${group}`}
        style={{ gridColumn: "2", gridRow: `${gridStart} / span ${gridSpan}` }}
        classNum={l.class}
        corps={l.corps}
        type={l.type}
        teacherPhoto={l.photo}
        name={l.title}
        teacher={l.teacher}
        time={l.label}
      />
    );
  });

  return (
    <Grid $rows={totalRows}>
      {hourCells}
      {lessonCells}
    </Grid>
  );
}
