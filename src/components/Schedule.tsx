import styled from "styled-components";
import type { DayCode } from "../utils/date";
import Rows from "./schedule/Rows";

const StyledWrapper = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: var(--shadow-md);
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  height: calc(100dvh - 16px);
  min-height: 800px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  color: var(--text);
  font-size: 14px;
  padding: 0 12px;
`;

const Title = styled.div`
  font-weight: 600;
`;
const Meta = styled.div`
  color: var(--muted);
  font-size: 12px;
`;

type ScheduleProps = {
  day: DayCode;
  group: 0 | 1;
  weekType: string | number;
  label: string; // «Середа, 23»
  date: Date; // якщо знадобиться точна дата
};

export default function Schedule({
  date,
  day,
  group,
  weekType,
  label,
}: ScheduleProps) {
  return (
    <StyledWrapper>
      <Header>
        <Title>{label}</Title>
        <Meta>{String(weekType)}</Meta>
      </Header>

      <Rows date={date} day={day} group={group} weekType={weekType} />
    </StyledWrapper>
  );
}
