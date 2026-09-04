import styled from "styled-components";
import type { Dispatch, SetStateAction } from "react";
import { formatDateRange } from "../utils/date";


type Props = {
  group: 0 | 1;
  setGroup: Dispatch<SetStateAction<0 | 1>>;
  currentDate: Date;
  setCurrentDate: Dispatch<SetStateAction<Date>>;
  weekType: 0 | 1;
};

const Bar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Btn = styled.button`
  appearance: none;
  border: 1px solid var(--border);
  background: var(--surface-2);
  color: var(--text);
  border-radius: 10px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: all 120ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
    border-color: #334155;
  }
  &:active {
    transform: translateY(0);
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--ring);
  }
`;

const InfoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  white-space: nowrap;
`;

const DateStr = styled.span`
  color: var(--muted);
  font-variant-numeric: tabular-nums;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.18);
  border: 1px solid var(--primary);
  color: var(--text);
  font-size: 12px;
  line-height: 1.4;
`;

export default function HeaderControls({
  group,
  setGroup,
  currentDate,
  setCurrentDate,
  weekType,
}: Props) {
  const toggleGroup = () => setGroup((prev) => (prev === 0 ? 1 : 0));
  
  const goPrev = () => setCurrentDate((prev) => new Date(prev.getTime() - 7 * 24 * 60 * 60 * 1000));
  const goNext = () => setCurrentDate((prev) => new Date(prev.getTime() + 7 * 24 * 60 * 60 * 1000));

  return (
    <Bar>
      <Btn type="button" onClick={toggleGroup}>
        Підгрупа: <b>{group + 1}</b>
      </Btn>

      <Section>
        <Btn type="button" onClick={goPrev} style={{ padding: "6px 10px" }}>
          &lt;
        </Btn>
        
        <InfoWrap>
          <DateStr>{formatDateRange(currentDate)}</DateStr>
          <Badge>{weekType === 0 ? "Чисельник" : "Знаменник"}</Badge>
        </InfoWrap>

        <Btn type="button" onClick={goNext} style={{ padding: "6px 10px" }}>
          &gt;
        </Btn>
      </Section>
    </Bar>
  );
}