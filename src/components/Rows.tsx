import styled from "styled-components";
import type { DayCode } from "../utils/date";
import { TIME_STEP, STARTING_TIME, DAY_TIME } from "../constants";
import Lesson from "./Lesson";
import EmptyLesson from "./EmptyLesson";
import { getDayLessons, pairTimes } from "../utils/dayLessons";

const HOURS_COL = 84; // px

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
const HOUR_SPAN = 60 / TIME_STEP; // 12

function toHHMM(min: number) {
  const n = ((min % MIN_PER_DAY) + MIN_PER_DAY) % MIN_PER_DAY;
  const h = Math.floor(n / 60);
  const m = n % 60;
  return `${h}:${String(m).padStart(2, "0")}`;
}

export default function Rows({ day, group, weekType }: Props) {
  const totalRows = Math.max(1, Math.ceil(DAY_TIME / TIME_STEP));

  // 1) годинні підписи (ліва колонка)
  const hourCells = [];
  for (let t = STARTING_TIME; t < STARTING_TIME + DAY_TIME; t += 60) {
    const relStart = Math.floor((t - STARTING_TIME) / TIME_STEP); // 0-based
    const gridStart = relStart + 1; // 1-based
    const span = Math.min(HOUR_SPAN, totalRows - relStart);
    hourCells.push(
      <HourCell
        key={`hour-${t}`}
        style={{ gridRow: `${gridStart} / span ${span}` }}
      >
        {toHHMM(t)} - {toHHMM(t + 60)}
      </HourCell>
    );
  }

  // 2) нормалізовані заняття
  const lessons = getDayLessons(day, group, weekType); // [{pair, startMin, endMin, ...}]
  const byPair = new Map<number, (typeof lessons)[number]>();
  for (const l of lessons) byPair.set(l.pair, l);

  // 3) повний список пар, які хочемо показувати
  const ALL_PAIRS = [1, 2, 3, 4, 5, 6, 7];

  // 4) для кожної пари рахуємо позицію (за фіксованим часом pairTimes)
  const cells = ALL_PAIRS.map((pair) => {
    const { startMin, endMin, label } = pairTimes(pair); // час пари

    // позиція від 08:00
    const delta =
      (((startMin - STARTING_TIME) % MIN_PER_DAY) + MIN_PER_DAY) % MIN_PER_DAY;
    const startIndex = Math.max(0, Math.floor(delta / TIME_STEP)); // 0-based
    const span = Math.max(1, Math.round((endMin - startMin) / TIME_STEP));
    const gridStart = Math.min(startIndex + 1, totalRows); // 1-based
    const gridSpan = Math.min(span, Math.max(1, totalRows - startIndex));

    const found = byPair.get(pair);
    if (found) {
      return (
        <Lesson
          key={`pair-${pair}`}
          style={{
            gridColumn: "2",
            gridRow: `${gridStart} / span ${gridSpan}`,
          }}
          classNum={found.class}
          corps={found.corps}
          type={found.type}
          teacherPhoto={found.photo}
          name={found.title}
          teacher={found.teacher}
          time={found.label} // з нормалізованих (можеш і label з pairTimes поставити)
        />
      );
    }

    // якщо заняття немає — рендеримо заглушку
    return (
      <EmptyLesson
        key={`pair-${pair}`}
        pair={pair}
        time={label}
        style={{ gridColumn: "2", gridRow: `${gridStart} / span ${gridSpan}` }}
      />
    );
  });

  return (
    <Grid $rows={totalRows}>
      {hourCells}
      {cells}
    </Grid>
  );
}
