import styled from "styled-components";

export const NowLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 0;
  border-top: 2px dashed var(--danger);
  z-index: 3;
  pointer-events: none;
`;

export const NowLabel = styled.div`
  position: absolute;
  left: 42px;
  padding: 2px 2px;
  transform: translate(-50%, -50%);
  font-size: 14px;
  line-height: 1;
  color: var(--danger);
  background: var(--bg, transparent);
  user-select: none;
  pointer-events: none;
  z-index: 4;
`;
