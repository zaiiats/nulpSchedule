import styled from "styled-components";
import { END_DATE } from "../constants";
import {
  getDayCode,
  type DayCode,
  getWeekType,
  nextDay,
  nextWorkdayOrSelf,
  fmtDayNameAndDay,
} from "../utils/date";
import Schedule from "./Schedule";

type Props = {
  group: 0 | 1;
  currentWeek: Date; // понеділок вибраного тижня
};

const StyledWrapper = styled.div`
  padding: 8px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  overflow: hidden;
  
  @media screen and (max-width: 1600px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
  }
  
`;

export default function Main({ group, currentWeek }: Props) {
  const daysData: Array<{
    date: Date;
    code: DayCode;
    label: string;
    weekType: string | number;
  }> = [];
  let cursor = nextWorkdayOrSelf(new Date(currentWeek));

  while (daysData.length < 5 && cursor.getTime() <= END_DATE.getTime()) {
    const wd = cursor.getDay();
    if (wd !== 0 && wd !== 6) {
      const code = getDayCode(cursor);
      const weekType = getWeekType(cursor);    
      const label = fmtDayNameAndDay(cursor);  
      daysData.push({ date: new Date(cursor), code, label, weekType });
    }
    cursor = nextDay(cursor);
  }

  return (
    <StyledWrapper>
      {daysData.map((d) => (
        <Schedule
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
