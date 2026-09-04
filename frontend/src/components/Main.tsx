import styled from "styled-components";
import type { DayOfWeek } from "../utils/constants";
import Rows from "./Rows";

type Props = {
  group: 0 | 1;
  currentWeek: 0 | 1;
};

const GridContainer = styled.main`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  overflow: auto;

  @media screen and (max-width: 2000px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const DayCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  height: 600px;
  width: 100%;
`;

const DayHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text);
  font-size: 14px;
  font-weight: 600;
  padding-top: 6px;
`;

const WORK_DAYS: { code: DayOfWeek; label: string }[] = [
  { code: "mon", label: "Понеділок" },
  { code: "tue", label: "Вівторок" },
  { code: "wed", label: "Середа" },
  { code: "thu", label: "Четвер" },
  { code: "fri", label: "П'ятниця" },
];

export default function Main({ group, currentWeek }: Props) {
  return (
    <GridContainer>
      {WORK_DAYS.map((d) => (
        <DayCard key={d.code}>
          <DayHeader>{d.label}</DayHeader>
          <Rows day={d.code} group={group} weekType={currentWeek} />
        </DayCard>
      ))}
    </GridContainer>
  );
}
