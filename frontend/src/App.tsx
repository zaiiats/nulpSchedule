import { useEffect, useState } from "react";
import Main from "./components/Main";
import HeaderControls from "./components/HeaderControls";
import "./App.css";
import { getWeekType } from "./utils/date";

export default function App() {
  const [currentDate, setCurrentDate] = useState(() => new Date());

  const [group, setGroup] = useState<0 | 1>(() => {
    const stored = localStorage.getItem("group");
    return stored === "1" ? 1 : 0;
  });

  useEffect(() => {
    localStorage.setItem("group", String(group));
  }, [group]);

  const weekType = getWeekType(currentDate);

  return (
    <div
      style={{
        display: "flex",
        height: "100dvh",
        flexDirection: "column",
        padding: "8px",
        gap: "8px",
      }}
    >
      <Main group={group} currentWeek={weekType} />
      
      <HeaderControls
        group={group}
        setGroup={setGroup}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        weekType={weekType}
      />
    </div>
  );
}