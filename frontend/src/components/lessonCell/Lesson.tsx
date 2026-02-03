/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";
import type { CSSProperties } from "react";
import { lazy, Suspense } from "react";
import { TYPE_LABELS } from "../../constants";

const PhotoBlock = lazy(() => import("./PhotoBlock"));
const TitleRow = lazy(() => import("./TitleRow"));
const MetaInfo = lazy(() => import("./MetaInfo"));

type Props = {
  name: string;
  teacher?: string;
  type: "lab" | "practice" | "lection" | string;
  classNum: string;
  corps: string;
  teacherPhoto: string;
  time?: string;
  style?: CSSProperties;
  isWithAdditionalInfo?: boolean;
  isUrgent?: boolean;
};

const Wrap = styled.div<{ $urgent?: boolean }>`
  cursor: pointer;
  border-radius: 12px;
  color: var(--text);
  padding: 4px;
  display: grid;
  grid-template-columns: 86px 1fr;
  column-gap: 10px;
  align-items: stretch;
  overflow: hidden;
  min-height: 0;
  transition:
    background 120ms ease,
    border-color 120ms ease;
  height: 100%;

  background: ${({ $urgent }) =>
    $urgent ? "var(--danger-2)" : "var(--surface)"};
  border: ${({ $urgent }) =>
    $urgent ? "1px solid var(--border-danger)" : "1px solid var(--border)"};

  &:hover {
    background: var(--surface);
    border-color: #3a4a60;
  }
`;

const RightCol = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  min-width: 0;
`;

export default function Lesson({
  name,
  teacher,
  type,
  classNum,
  corps,
  teacherPhoto,
  time,
  style,
  isWithAdditionalInfo,
  isUrgent,
}: Props) {
  const typeKey = (type || "").toLowerCase();
  const typeLabel =
    (TYPE_LABELS[typeKey as keyof typeof TYPE_LABELS] as string) ?? type;

  return (
    <Wrap style={style} title={name} $urgent={isUrgent}>
      <Suspense fallback={null}>
        <PhotoBlock teacher={teacher} teacherPhoto={teacherPhoto} />
      </Suspense>

      <RightCol>
        <Suspense fallback={null}>
          <TitleRow name={name} showInfo={isWithAdditionalInfo} />
        </Suspense>

        <Suspense fallback={null}>
          <MetaInfo
            typeKey={typeKey}
            typeLabel={typeLabel}
            time={time}
            classNum={classNum}
            corps={corps}
          />
        </Suspense>
      </RightCol>
    </Wrap>
  );
}
