import styled from "styled-components";
import { useMemo, type Dispatch, type SetStateAction } from "react";
import {
  addDays,
  fmtDayMonth,
  getWeekType,
  startOfISOWeek,
} from "../utils/date";

type Props = {
  currentWeek: Date;
  setCurrentWeek: Dispatch<SetStateAction<Date>>;
  start: Date;
  end: Date;
};

const Wrap = styled.div`
  position: fixed;
  bottom: 8px;
  z-index: 1000;
  left: 8px;
  transform: none;

  @media screen and (max-width: 800px) {
    left: unset;
    right: 50%;
    transform: translateX(50%);
  }
`;

const Bar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--surface-3);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 6px 8px;
  box-shadow: var(--shadow-md);
`;

const Btn = styled.button<{ disabled?: boolean }>`
  appearance: none;
  border: 1px solid var(--border);
  background: ${({ disabled }) => (disabled ? "#1a232f" : "var(--surface-2)")};
  color: ${({ disabled }) => (disabled ? "#9aa0a6" : "var(--text)")};
  border-radius: 10px;
  padding: 6px 10px;
  font-size: 14px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: transform 120ms ease, box-shadow 120ms ease, background 120ms ease,
    border-color 120ms ease;

  &:hover {
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-1px)")};
    box-shadow: ${({ disabled }) => (disabled ? "none" : "var(--shadow-md)")};
    border-color: ${({ disabled }) => (disabled ? "var(--border)" : "#334155")};
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--ring);
  }
`;

const Label = styled.div`
  font-size: 14px;
  white-space: nowrap;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.18);
  border: 1px solid var(--primary);
  color: var(--text);
  font-size: 12px;
  line-height: 1.6;
`;

export default function TimeConfiguration({
  currentWeek,
  setCurrentWeek,
  start,
  end,
}: Props) {
  const from = startOfISOWeek(currentWeek);
  const to = addDays(from, 6);

  const canPrev = useMemo(
    () => startOfISOWeek(from).getTime() > startOfISOWeek(start).getTime(),
    [from, start]
  );
  const canNext = useMemo(
    () => startOfISOWeek(from).getTime() < startOfISOWeek(end).getTime(),
    [from, end]
  );

  const goPrev = () => canPrev && setCurrentWeek(addDays(from, -7));
  const goNext = () => canNext && setCurrentWeek(addDays(from, +7));

  const typeOfWeek = getWeekType(from);

  return (
    <Wrap>
      <Bar>
        <Btn
          onClick={goPrev}
          disabled={!canPrev}
          aria-label="Попередній тиждень"
        >
          &lt;
        </Btn>
        <Label>
          <Badge>{typeOfWeek}</Badge>
          {fmtDayMonth(from)} — {fmtDayMonth(to)}
        </Label>
        <Btn
          onClick={goNext}
          disabled={!canNext}
          aria-label="Наступний тиждень"
        >
          &gt;
        </Btn>
      </Bar>
    </Wrap>
  );
}
