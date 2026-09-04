import styled from "styled-components";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  group: 0 | 1;
  setGroup: Dispatch<SetStateAction<0 | 1>>;
  currentWeek: 0 | 1;
  setCurrentWeek: Dispatch<SetStateAction<0 | 1>>;
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

const Text = styled.span`
  font-size: 14px;
  white-space: nowrap;
`;

export default function HeaderControls({
  group,
  setGroup,
  currentWeek,
  setCurrentWeek,
}: Props) {
  const toggleGroup = () => setGroup((prev) => (prev === 0 ? 1 : 0));
  const toggleWeek = () => setCurrentWeek((prev) => (prev === 0 ? 1 : 0));

  return (
    <Bar>
      <Btn type="button" onClick={toggleGroup}>
        Підгрупа: <b>{group + 1}</b>
      </Btn>

      <Section>
        <Btn type="button" onClick={toggleWeek}>
          Змінити
        </Btn>
        <Badge>{currentWeek + 1}</Badge>
        <Text>{currentWeek === 0 ? "Чисельник" : "Знаменник"}</Text>
      </Section>
    </Bar>
  );
}