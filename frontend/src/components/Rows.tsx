import {
  TIME_STEP,
  STARTING_TIME,
  DAY_TIME,
  type DayOfWeek,
} from "../constants";
import EmptyLesson from "./EmptyLesson";
import { getDayLessons, pairTimes } from "../utils/dayLessons";
import { toHHMM } from "../utils/date";
import Lesson from "./Lesson";
import styled from "styled-components";

type Props = {
  day: DayOfWeek;
  group: 0 | 1;
  weekType: 0 | 1;
};

const HOUR_SPAN = 60 / TIME_STEP;
const ALL_PAIRS = [1, 2, 3, 4, 5, 6, 7];

export const HOURS_COL = 84;

const Grid = styled.div<{ $rows: number }>`
  position: relative;
  display: grid;
  grid-template-columns: ${HOURS_COL}px 1fr;
  grid-template-rows: repeat(${({ $rows }) => $rows}, minmax(0, 1fr));
  column-gap: 6px;
  row-gap: 2px;
  height: 100%;
  width: 100%;
`;

const HourCell = styled.div`
  grid-column: 1;
  align-self: start;
  justify-self: center;
  padding: 2px 4px;
  font-size: 11px;
  color: var(--muted);
  user-select: none;
  pointer-events: none;
  border-top: 1px dashed rgba(148, 163, 184, 0.25);
`;

export default function Rows({ day, group, weekType }: Props) {
  const totalRows = Math.max(1, Math.ceil(DAY_TIME / TIME_STEP));

  const hourCells = [];
  for (let t = STARTING_TIME; t < STARTING_TIME + DAY_TIME; t += 60) {
    const relStart = Math.floor((t - STARTING_TIME) / TIME_STEP);
    const gridStart = relStart + 1;
    const span = Math.min(HOUR_SPAN, totalRows - relStart);
    hourCells.push(
      <HourCell
        key={`hour-${t}`}
        style={{ gridRow: `${gridStart} / span ${span}` }}
      >
        {toHHMM(t)} - {toHHMM(t + 60)}
      </HourCell>,
    );
  }

  const lessons = getDayLessons(day, group, weekType);

  const byPair = new Map<number, (typeof lessons)[number]>();
  for (const l of lessons) byPair.set(l.pair, l);

  const cells = ALL_PAIRS.map((pair) => {
    const { startMin, endMin, label } = pairTimes(pair);

    if (startMin < STARTING_TIME || startMin >= STARTING_TIME + DAY_TIME) {
      return null;
    }

    const delta = startMin - STARTING_TIME;
    const startIndex = Math.floor(delta / TIME_STEP);
    const span = Math.round((endMin - startMin) / TIME_STEP);
    const gridStart = startIndex + 1;
    const gridSpan = span;

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
          time={found.label}
        />
      );
    }

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
