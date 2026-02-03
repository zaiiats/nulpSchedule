import type { DayCode } from "../../utils/date";
import {
  TIME_STEP,
  STARTING_TIME,
  DAY_TIME,
  type DayOfWeek,
} from "../../constants";
import EmptyLesson from "../lessonCell/EmptyLesson";
import { getDayLessons, pairTimes } from "../../utils/dayLessons";
import { useEffect, useMemo, useState } from "react";
import Grid from "./Grid";
import HourCell from "./HourCell";
import { NowLine, NowLabel } from "./NowLine";
import {
  MIN_PER_DAY,
  toHHMM,
  toYMD,
  toHH_MM_fromDate,
  isTodayDate,
  clamp,
} from "../../utils/date";
import LessonInteractive from "../lessonCell/LessonInteractive";

type Props = {
  day: DayCode;
  group: 0 | 1;
  weekType: string | number;
  date: Date;
  classGroup: string;
};

const HOUR_SPAN = 60 / TIME_STEP;

export default function Rows({
  date,
  day,
  group,
  weekType,
  classGroup,
}: Props) {
  const totalRows = Math.max(1, Math.ceil(DAY_TIME / TIME_STEP));
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    let intervalId: number | null = null;

    const alignAndStart = () => {
      const now0 = new Date();
      const msToNextMinute =
        (60 - now0.getSeconds()) * 1000 - now0.getMilliseconds();

      const timeoutId = window.setTimeout(() => {
        setNow(new Date());
        intervalId = window.setInterval(() => setNow(new Date()), 60 * 1000);
      }, msToNextMinute);

      return timeoutId;
    };

    const timeoutId = alignAndStart();

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== null) window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      if (!document.hidden) setNow(new Date());
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const showNow = isTodayDate(date);
  const nowLabel = useMemo(() => toHH_MM_fromDate(now), [now]);

  const nowTopPercent = useMemo(() => {
    const minsNow = now.getHours() * 60 + now.getMinutes();
    const delta = minsNow - STARTING_TIME;
    const clamped = clamp(delta, 0, DAY_TIME);
    return (clamped / DAY_TIME) * 100;
  }, [now]);

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

  const lessons = getDayLessons(
    classGroup as "305" | "306" | "307",
    day as DayOfWeek,
    group,
    weekType,
  );
  const byPair = new Map<number, (typeof lessons)[number]>();
  for (const l of lessons) byPair.set(l.pair, l);

  const ALL_PAIRS = [1, 2, 3, 4, 5, 6, 7];
  const ymd = toYMD(date);

  const cells = ALL_PAIRS.map((pair) => {
    const { startMin, endMin, label } = pairTimes(pair);
    const delta =
      (((startMin - STARTING_TIME) % MIN_PER_DAY) + MIN_PER_DAY) % MIN_PER_DAY;
    const startIndex = Math.max(0, Math.floor(delta / TIME_STEP)); // 0-based
    const span = Math.max(1, Math.round((endMin - startMin) / TIME_STEP));
    const gridStart = Math.min(startIndex + 1, totalRows); // 1-based
    const gridSpan = Math.min(span, Math.max(1, totalRows - startIndex));

    const found = byPair.get(pair);

    if (found) {
      return (
        <LessonInteractive
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
          ymd={ymd}
          pair={pair}
          group={group}
          weekType={weekType}
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
      {showNow && (
        <>
          <NowLine style={{ top: `${nowTopPercent}%` }} />
          <NowLabel style={{ top: `${nowTopPercent}%` }}>{nowLabel}</NowLabel>
        </>
      )}
    </Grid>
  );
}
