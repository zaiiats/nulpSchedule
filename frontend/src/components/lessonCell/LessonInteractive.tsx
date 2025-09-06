import { useContext, useMemo } from "react";
import Lesson from "./Lesson";
import { LessonContext } from "../../context/LessonContext";
import { buildLessonKey, getAdditionalData } from "../../utils/additionalData";

type Props = {
  // базові пропси Lesson
  name: string;
  teacher?: string;
  type: "lab" | "practice" | "lection" | string;
  classNum: string;
  corps: string;
  teacherPhoto: string;
  time?: string;
  style?: React.CSSProperties;

  // ідентифікатори для ключа уроку
  ymd: string;       // YYYY-MM-DD
  pair: number;      // № пари
  group: 0 | 1;
  weekType: string | number;
};

export default function LessonInteractive(props: Props) {
  const { openModal } = useContext(LessonContext);

  const key = useMemo(
    () =>
      buildLessonKey({
        ymd: props.ymd,
        pair: props.pair,
        group: props.group,
        weekType: props.weekType,
      }),
    [props.ymd, props.pair, props.group, props.weekType]
  );

  const add = getAdditionalData(key);

  const handleClick = () => {
    openModal({
      key,
      title: props.name,
      teacher: props.teacher,
      pair: props.pair,
      ymd: props.ymd,
      group: props.group,
      weekType: props.weekType,
      // додаткові поля для картки в модалці
      teacherPhoto: props.teacherPhoto,
      type: props.type,
      classNum: props.classNum,
      corps: props.corps,
      time: props.time,
    });
  };

  return (
    <div
      style={props.style} // стиль з gridRow/gridColumn на обгортці
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
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
