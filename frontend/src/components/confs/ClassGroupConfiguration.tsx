import styled from "styled-components";
import { Button } from "./GroupConfiguration"; 

const StyledWrapper = styled.div`

`;

interface Props {
  classGroup: string | null;
  setClassGroup: (val: "305" | "306" | "307" | null) => void;
}

export default function ClassGroupConfiguration({ classGroup, setClassGroup }: Props) {
  if (!classGroup) return null;

  return (
    <StyledWrapper>
      <Button
        type="button"
        onClick={() => setClassGroup(null)}
      >
        Група: {classGroup}
      </Button>
    </StyledWrapper>
  );
}