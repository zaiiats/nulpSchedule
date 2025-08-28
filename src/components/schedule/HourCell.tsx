import styled from "styled-components";

const HourCell = styled.div`
  grid-column: 1;
  align-self: start;
  justify-self: center;
  padding: 2px 4px;
  font-size: 11px;
  color: var(--muted);
  user-select: none;
  pointer-events: none;
  border-top: 1px dashed rgba(148, 163, 184, 0.25);
`;

export default HourCell;
