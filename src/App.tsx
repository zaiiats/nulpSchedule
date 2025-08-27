import { useEffect, useMemo, useState } from "react";
import GroupConfiguration from "./components/GroupConfiguration";
import TimeConfiguration from "./components/TimeConfiguration";
import {
  START_DATE,
  END_DATE,
  startOfISOWeek,
  addDays,
  clampDate
} from "./utils/date";
import { bindHotkeys } from "./utils/hotkeys";
import Main from "./components/Main";
import "./App.css";

export default function App() {
  const [group, setGroup] = useState<0 | 1>(() => {
    const stored = localStorage.getItem("group");
    return stored === "1" ? 1 : 0;
  });

  const initialWeek = useMemo(() => {
    const now = new Date();
    const base = new Date(Math.max(START_DATE.getTime(), now.getTime()));
    return startOfISOWeek(base);
  }, []);
  const [currentWeek, setCurrentWeek] = useState<Date>(initialWeek);

  useEffect(() => localStorage.setItem("group", String(group)), [group]);
  useEffect(() => {
    const dispose = bindHotkeys({
      onToggleGroup: () => setGroup((prev) => (prev === 0 ? 1 : 0)),
      onPrevWeek: () => {
        const prev = clampDate(addDays(currentWeek, -7), START_DATE, END_DATE);
        if (
          startOfISOWeek(prev).getTime() < startOfISOWeek(currentWeek).getTime()
        ) {
          setCurrentWeek(prev);
        }
      },
      onNextWeek: () => {
        const next = clampDate(addDays(currentWeek, +7), START_DATE, END_DATE);
        if (
          startOfISOWeek(next).getTime() > startOfISOWeek(currentWeek).getTime()
        ) {
          setCurrentWeek(next);
        }
      },
    });
    return dispose;
  }, [currentWeek]);
  return (
    <>
      <GroupConfiguration group={group} setGroup={setGroup} />
      <TimeConfiguration
        currentWeek={currentWeek}
        setCurrentWeek={setCurrentWeek}
        start={START_DATE}
        end={END_DATE}
      />
      <div>
        <Main group={group} currentWeek={currentWeek} />
      </div>
    </>
  );
}
