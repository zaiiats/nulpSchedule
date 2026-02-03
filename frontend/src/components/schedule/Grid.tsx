import styled from "styled-components";

export const HOURS_COL = 84; 

const Grid = styled.div<{ $rows: number }>`
  position: relative;
  display: grid;
  grid-template-columns: ${HOURS_COL}px 1fr;
  grid-template-rows: repeat(${({ $rows }) => $rows}, minmax(0, 1fr));
  column-gap: 6px;
  row-gap: 2px;
  height: 100%;
  width: 100%;
`;

export default Grid;
