import styled from "styled-components";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  group: 0 | 1;
  setGroup: Dispatch<SetStateAction<0 | 1>>;
};

const Wrapper = styled.div`
  position: fixed;
  z-index: 1000;

  bottom: 8px;
  right: 8px;
  transform: null;

  @media screen and (max-width: 800px) {
    bottom: unset;
    top: 8px;
    right: 50%;
    transform: translateX(50%);
  }
`;

const Button = styled.button`
  appearance: none;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 8px 12px;
  font-size: 14px;
  background: var(--surface-3);
  color: var(--text);
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: transform 120ms ease, box-shadow 120ms ease, background 120ms ease,
    border-color 120ms ease;

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
    <Wrapper>
      <Button
        type="button"
        onClick={toggle}
        aria-pressed={group === 1}
        title="Натисни, щоб перемкнути (гаряча клавіша: g)"
      >
        Група: {group}
      </Button>
    </Wrapper>
  );
}
