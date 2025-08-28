import styled from "styled-components";

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
  white-space: normal;
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

export default function PhotoBlock({
  teacher,
  teacherPhoto,
}: {
  teacher?: string;
  teacherPhoto?: string;
}) {
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
    <LeftCol>
      <Photo $src={teacherPhoto || undefined}>{photoContent}</Photo>
      <Teacher title={teacher}>{teacher}</Teacher>
    </LeftCol>
  );
}
