import styled from "styled-components";
import type { CSSProperties } from "react";
import { TYPE_LABELS, TYPE_COLORS } from "../utils/constants";

type Props = {
  name: string;
  teacher?: string;
  type: "lab" | "practice" | "lection" | string;
  classNum?: string;
  corps?: string;
  teacherPhoto?: string;
  time?: string;
  style?: CSSProperties;
};

const Wrap = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--text);
  padding: 6px;
  display: grid;
  grid-template-columns: 90px 1fr;
  column-gap: 10px;
  align-items: center;
  height: 100%;
  overflow: hidden;
`;

const Photo = styled.div<{ $src?: string }>`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  background: ${({ $src }) =>
    $src ? `center/cover no-repeat url(${$src})` : "var(--surface-2)"};
  border: 1px solid var(--border);
  display: grid;
  place-items: center;
  font-size: 14px;
  font-weight: 700;
  color: var(--muted);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 4px;
  min-width: 0;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const StyledBadge = styled.span<{ $kind: string }>`
  ${({ $kind }) => {
    const c = TYPE_COLORS[$kind as keyof typeof TYPE_COLORS] ?? {
      bg: "rgba(148,163,184,0.12)",
      border: "rgba(148,163,184,0.35)",
      text: "var(--muted)",
    };
    return `
      background: ${c.bg};
      border: 1px solid ${c.border};
      color: ${c.text};
    `;
  }}
  border-radius: 999px;
  padding: 1px 6px;
  font-size: 10px;
  font-weight: 600;
  line-height: 1.2;
`;

const Time = styled.span`
  font-size: 11px;
  color: var(--muted);
`;

const LessonName = styled.div`
  font-size: 13px;
  font-weight: 600;
  line-height: 1.3;
  height: 100%;
`;

const TeacherName = styled.div`
  font-size: 12px;
  color: var(--text);
  line-height: 1.3;
`;

const Location = styled.div`
  font-size: 11px;
  color: var(--muted);

  b {
    color: var(--text);
    font-weight: 600;
  }
`;

function initials(full?: string) {
  if (!full) return "—";
  return full
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Lesson({
  name,
  teacher,
  type,
  classNum,
  corps,
  teacherPhoto,
  time,
  style,
}: Props) {
  const typeKey = (type || "").toLowerCase();
  const typeLabel =
    (TYPE_LABELS[typeKey as keyof typeof TYPE_LABELS] as string) ?? type;

  const roomEl =
    classNum || corps ? (
      <Location>
        ауд. {classNum ? <b>{classNum}</b> : "—"}
        {corps ? (
          <>
            , корп. <b>{corps}</b>
          </>
        ) : null}
      </Location>
    ) : null;

  return (
    <Wrap style={style}>
      <Photo $src={teacherPhoto || undefined}>
        {!teacherPhoto && initials(teacher)}
      </Photo>

      <Content>
        <LessonName>{name}</LessonName>

        <TopRow>
          {typeLabel && <StyledBadge $kind={typeKey}>{typeLabel}</StyledBadge>}
          {time && <Time>{time}</Time>}
        </TopRow>

        {teacher && <TeacherName>{teacher}</TeacherName>}

        {/*roomEl*/}
      </Content>
    </Wrap>
  );
}
