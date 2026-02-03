import styled from "styled-components";
import type { DayCode } from "../utils/date";
import Rows from "./schedule/Rows";

const StyledWrapper = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: var(--shadow-md);
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  height: 1000px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text);
  font-size: 14px;
  padding-top: 6px;
`;

const Title = styled.div`
  font-weight: 600;
`;

type ScheduleProps = {
  day: DayCode;
  group: 0 | 1;
  weekType: string | number;
  label: string;
  date: Date;
  classGroup: string;
};

export default function Schedule({
  date,
  day,
  group,
  weekType,
  label,
  classGroup,
}: ScheduleProps) {
  return (
    <StyledWrapper>
      <Header>
        <Title>{label}</Title>
      </Header>

      <Rows
        classGroup={classGroup}
        date={date}
        day={day}
        group={group}
        weekType={weekType}
      />
    </StyledWrapper>
  );
}
