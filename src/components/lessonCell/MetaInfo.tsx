import styled from "styled-components";
import Badge from "./Badge";

const Meta = styled.span`
  font-size: 12px;
  color: var(--muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  b {
    color: var(--text);
    font-weight: 700;
  }
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  min-width: 0;
  gap: 4px;
`;

export default function MetaInfo({
  typeKey,
  typeLabel,
  time,
  classNum,
  corps,
}: {
  typeKey: string;
  typeLabel?: string;
  time?: string;
  classNum?: string;
  corps?: string;
}) {
  const roomEl =
    classNum || corps ? (
      <Meta>
        ауд. {classNum ? <b>{classNum}</b> : "—"}
        {corps ? (
          <>
            , корп. <b>{corps}</b>
          </>
        ) : null}
      </Meta>
    ) : null;

  return (
    <Wrap>
      {typeLabel ? <Badge kind={typeKey}>{typeLabel}</Badge> : null}
      {time ? <Meta>{time}</Meta> : null}
      {roomEl}
    </Wrap>
  );
}
