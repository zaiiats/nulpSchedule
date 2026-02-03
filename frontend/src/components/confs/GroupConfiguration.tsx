import styled from "styled-components";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  group: 0 | 1;
  setGroup: Dispatch<SetStateAction<0 | 1>>;
};

const StyledWrapper = styled.div`

`;

export const Button = styled.button`
  appearance: none;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 8px 12px;
  font-size: 14px;
  background: var(--surface-3);
  color: var(--text);
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: all 120ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
    background: var(--surface-2);
    border-color: #334155;
  }

  &:active {
    transform: translateY(0);
    box-shadow: var(--shadow-sm);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--ring);
  }
`;

export default function GroupConfiguration({ group, setGroup }: Props) {
  const toggle = () => setGroup((prev) => (prev === 0 ? 1 : 0));

  return (
    <StyledWrapper>
      <Button
        type="button"
        onClick={toggle}
      >
        Підгрупа: {group + 1}
      </Button>
    </StyledWrapper>
  );
}
