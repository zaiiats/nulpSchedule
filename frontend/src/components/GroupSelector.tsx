import styled from "styled-components";
import { Button } from "./confs/GroupConfiguration";

const FullScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  color: white;
  gap: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  font-family: sans-serif;
`;

const GroupList = styled.div`
  display: flex;
  gap: 16px;
`;

const LargeButton = styled(Button)`
  padding: 20px 40px;
  font-size: 1.5rem;
  min-width: 120px;
`;

const GROUPS = ["305", "306", "307"] as const;

interface Props {
  onSelect: (group: "305" | "306" | "307") => void;
}

export default function GroupSelector({ onSelect }: Props) {
  return (
    <FullScreenContainer>
      <Title>Виберіть групу</Title>
      <GroupList>
        {GROUPS.map((g) => (
          <LargeButton 
            key={g} 
            onClick={() => onSelect(g)}
          >
            {g}
          </LargeButton>
        ))}
      </GroupList>
    </FullScreenContainer>
  );
}