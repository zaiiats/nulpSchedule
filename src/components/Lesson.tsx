import styled from "styled-components";
import type { CSSProperties } from "react";

type Props = {
  name: string;
  teacher?: string;
  type: "lab" | "practice" | "lection" | string;
  classNum: string;
  corps: string;
  teacherPhoto: string;
  time?: string;
  style?: CSSProperties;
};

const TYPE_LABELS: Record<string, string> = {
  lab: "Лабка",
  practice: "Практ",
  lection: "Лекція",
};

const TYPE_COLORS: Record<
  string,
  { bg: string; border: string; text: string }
> = {
  lab: {
    bg: "rgba(234,179,8,0.12)",
    border: "rgba(234,179,8,0.35)",
    text: "#facc15",
  }, // жовта
  practice: {
    bg: "rgba(239,68,68,0.12)",
    border: "rgba(239,68,68,0.35)",
    text: "#f87171",
  }, // червона
  lection: {
    bg: "rgba(34,197,94,0.12)",
    border: "rgba(34,197,94,0.35)",
    text: "#4ade80",
  }, // зелена
};

const Wrap = styled.div`
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text);
  padding: 4px;
  display: grid;
  grid-template-columns: 86px 1fr;
  column-gap: 10px;
  align-items: stretch;
  overflow: hidden;
  min-height: 0;
  transition: background 120ms ease, border-color 120ms ease;

  &:hover {
    background: var(--surface);
    border-color: #3a4a60;
  }
`;

/* Ліва колонка: фото 75% висоти, під ним ім’я */
const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
`;

const Photo = styled.div<{ $src?: string }>`
  flex: 0 0 75%;
  height: calc(75% - 8px);
  border-radius: 10px;
  background: ${({ $src }) =>
    $src ? `center/cover no-repeat url(${$src})` : "var(--surface)"};
  border: 1px solid var(--border);
`;

const Teacher = styled.div`
  text-align: center;
  margin-top: 6px;
  font-size: 11px;
  color: var(--muted);
  text-wrap: balance;
`;

const RightCol = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  min-width: 0;
`;

/* Заголовок в 1 рядок */
const Title = styled.div`
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/* Рядок мети: бейдж типу, час, аудиторія */
const MetaRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  min-width: 0;
  flex-wrap: wrap; /* на дуже вузьких екранах переносимося */
`;

const Badge = styled.span<{ $kind: string }>`
  ${({ $kind }) => {
    const c = TYPE_COLORS[$kind] ?? {
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
  padding: 2px 8px;
  font-size: 11px;
  line-height: 1.2;
  white-space: nowrap;
`;

const Meta = styled.span`
  font-size: 12px;
  color: var(--muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  const typeLabel = TYPE_LABELS[typeKey] ?? type;
  const room =
    classNum && corps
      ? `ауд. ${classNum}, корп. ${corps}`
      : classNum || corps || "";

  // Якщо немає фото — сірий фон із ініціалами, впишемо поверх
  const photoContent = teacherPhoto ? null : (
    <div
      style={{
        height: "100%",
        display: "grid",
        placeItems: "center",
        fontSize: 12,
        color: "var(--muted)",
        letterSpacing: "0.5px",
        fontWeight: 700,
      }}
    >
      {initials(teacher)}
    </div>
  );

  return (
    <Wrap style={style} title={name}>
      <LeftCol>
        <Photo $src={teacherPhoto || undefined}>{photoContent}</Photo>
        <Teacher title={teacher}>{teacher}</Teacher>
      </LeftCol>

      <RightCol>
        <MetaRow>
          <Title title={name}>{name}</Title>
          {typeLabel && <Badge $kind={typeKey}>{typeLabel}</Badge>}
          {time && <Meta>{time}</Meta>}
          {room && <Meta>{room}</Meta>}
        </MetaRow>
      </RightCol>
    </Wrap>
  );
}
