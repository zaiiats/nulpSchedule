import { useEffect, useState } from "react";
import Main from "./components/Main";
import "./App.css";
import HeaderControls from "./components/HeaderControls";

export default function App() {
  const [currentWeek, setCurrentWeek] = useState<0 | 1>(0);

  const [group, setGroup] = useState<0 | 1>(() => {
    const stored = localStorage.getItem("group");
    return stored === "1" ? 1 : 0;
  });

  useEffect(() => localStorage.setItem("group", String(group)), [group]);

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
      <HeaderControls
        group={group}
        setGroup={setGroup}
        currentWeek={currentWeek}
        setCurrentWeek={setCurrentWeek}
      />

      <Main group={group} currentWeek={currentWeek} />
    </div>
  );
}
