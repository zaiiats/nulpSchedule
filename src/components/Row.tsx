import styled from "styled-components";
import type { DayCode } from "../utils/date";

type Props = {
  index: number;
  day: DayCode;
  group: 0 | 1;
  weekType: string | number;
};

const RowWrap = styled.div`
  width: 100%;
  height: 100%; /* займе відведене місце в гріді */
  display: flex;
  align-items: center;
  justify-content: center;

  border-bottom: 1px solid var(--border);
  background: var(--surface-2);
  color: var(--muted);

  font-size: 4px;
  transition: background 0.15s ease, border-color 0.15s ease;

  &:first-child {
    border-top: 1px solid var(--border);
  }
`;

export default function Row({ index, day, group, weekType }: Props) {
  return (
    <RowWrap
      data-row-index={index}
      data-day={day}
      data-group={group}
      data-week-type={weekType}
    >
    </RowWrap>
  );
}
