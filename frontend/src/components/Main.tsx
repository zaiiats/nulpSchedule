/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";
import {
  getDayCode,
  type DayCode,
  getWeekType,
  nextDay,
  fmtDayNameAndDay,
} from "../utils/date";
import Schedule from "./Schedule";
import { END_WEEK } from "../constants";

const toLocalDateOnly = (d: Date) => {
  const nd = new Date(d);
  nd.setHours(12, 0, 0, 0);
  return nd;
};

type Props = {
  group: 0 | 1;
  currentWeek: Date;
  classGroup: string;
};

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  overflow: auto;

  @media screen and (max-width: 2000px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

export default function Main({ group, currentWeek, classGroup }: Props) {
  const daysData: Array<{
    date: Date;
    code: DayCode;
    label: string;
    weekType: string | number;
  }> = [];

  const weekStart = toLocalDateOnly(
    currentWeek instanceof Date ? currentWeek : new Date(currentWeek as any),
  );

  let cursor = new Date(weekStart);

  while (daysData.length < 5 && cursor.getTime() <= END_WEEK.getTime()) {
    const wd = cursor.getDay();

    if (wd !== 0 && wd !== 6) {
      const code = getDayCode(cursor);
      const weekType = getWeekType(cursor);
      const label = fmtDayNameAndDay(cursor);

      daysData.push({
        date: new Date(cursor),
        code,
        label,
        weekType,
      });
    }

    cursor = nextDay(cursor);
  }

  return (
    <StyledWrapper>
      {daysData.map((d) => (
        <Schedule
          classGroup={classGroup}
          key={d.date.toDateString()}
          day={d.code}
          group={group}
          weekType={d.weekType}
          label={d.label}
          date={d.date}
        />
      ))}
    </StyledWrapper>
  );
}
