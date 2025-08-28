import styled from "styled-components";
import InformationalIcon from "./InformationalIcon";

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: start;
  width: 100%;
`;

const TitleText = styled.p`
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default function TitleRow({
  name,
  showInfo,
}: {
  name: string;
  showInfo?: boolean;
}) {
  return (
    <Row title={name}>
      <TitleText>{name}</TitleText>
      {showInfo ? <InformationalIcon /> : null}
    </Row>
  );
}
