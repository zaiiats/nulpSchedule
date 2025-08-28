import styled from "styled-components";
import type { CSSProperties } from "react";

const Box = styled.div`
  background: transparent;
  border: 1px dashed var(--border);
  border-radius: 10px;
  color: var(--muted);
  display: grid;
  place-items: center;
  padding: 6px;
  font-size: 12px;
  user-select: none;
`;

type Props = {
  pair: number;
  time?: string;
  style?: CSSProperties;
};

export default function EmptyLesson({ pair, time, style }: Props) {
  return (
    <Box style={style} title={"Нема пари"}>
      {pair} пара - {time}
    </Box>
  );
}
