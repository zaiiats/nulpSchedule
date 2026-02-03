import { useMemo } from "react";
import Lesson from "./Lesson";
import { buildLessonKey, getAdditionalData } from "../../utils/additionalData";

type Props = {
  name: string;
  teacher?: string;
  type: "lab" | "practice" | "lection" | string;
  classNum: string;
  corps: string;
  teacherPhoto: string;
  time?: string;
  style?: React.CSSProperties;
  ymd: string;
  pair: number; 
  group: 0 | 1;
  weekType: string | number;
};

export default function LessonInteractive(props: Props) {
  const key = useMemo(
    () =>
      buildLessonKey({
        ymd: props.ymd,
        pair: props.pair,
        group: props.group,
        weekType: props.weekType,
      }),
    [props.ymd, props.pair, props.group, props.weekType],
  );

  const add = getAdditionalData(key);

  return (
    <div style={props.style} role="button" tabIndex={0}>
      <Lesson
        name={props.name}
        teacher={props.teacher}
        type={props.type}
        classNum={props.classNum}
        corps={props.corps}
        teacherPhoto={props.teacherPhoto}
        time={props.time}
        isWithAdditionalInfo={Boolean(add.withInfoIcon) || Boolean(add.notes)}
        isUrgent={Boolean(add.urgent)}
      />
    </div>
  );
}
