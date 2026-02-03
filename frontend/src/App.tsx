import { useEffect, useMemo, useState } from "react";
import GroupConfiguration from "./components/confs/GroupConfiguration";
import TimeConfiguration from "./components/confs/TimeConfiguration";
import { startOfISOWeek, clampDate } from "./utils/date";
import Main from "./components/Main";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { END_WEEK, START_WEEK } from "./constants";
import GroupSelector from "./components/GroupSelector";
import ClassGroupConfiguration from "./components/confs/ClassGroupConfiguration";

export default function App() {
  const [classGroup, setClassGroup] = useState<"305" | "306" | "307" | null>(
    () => {
      const stored = localStorage.getItem("classGroup");
      if (stored === "305" || stored === "306" || stored === "307") {
        return stored;
      }
      return null;
    },
  );

  const [group, setGroup] = useState<0 | 1>(() => {
    const stored = localStorage.getItem("group");
    return stored === "1" ? 1 : 0;
  });

  const initialWeek = useMemo(() => {
    const now = new Date();
    const clamped = clampDate(now, START_WEEK, END_WEEK);
    return startOfISOWeek(clamped);
  }, []);
  const [currentWeek, setCurrentWeek] = useState<Date>(initialWeek);

  useEffect(() => localStorage.setItem("group", String(group)), [group]);
  useEffect(() => {
    if (classGroup) {
      localStorage.setItem("classGroup", classGroup);
    }
  }, [classGroup]);

  if (!classGroup) {
    return (
      <div className="App">
        <GroupSelector onSelect={setClassGroup} />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div
        style={{
          display: "flex",
          height: "100dvh",
          flexDirection: "column",
          padding: "8px",
          gap: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <ClassGroupConfiguration
            classGroup={classGroup}
            setClassGroup={setClassGroup}
          />

          <GroupConfiguration group={group} setGroup={setGroup} />
        </div>

        <Main classGroup={classGroup} group={group} currentWeek={currentWeek} />

        <TimeConfiguration
          currentWeek={currentWeek}
          setCurrentWeek={setCurrentWeek}
          start={START_WEEK}
          end={END_WEEK}
        />
      </div>
    </BrowserRouter>
  );
}
