type Disposer = () => void;

export function bindHotkeys(handlers: {
  onToggleGroup?: () => void;
  onPrevWeek?: () => void;
  onNextWeek?: () => void;
}): Disposer {
  const onKey = (e: KeyboardEvent) => {
    const k = e.key.toLowerCase();
    if ((k === "g" || k === "п") && handlers.onToggleGroup) handlers.onToggleGroup();
    if ((k === "a" || k === "ф") && handlers.onPrevWeek)   handlers.onPrevWeek();
    if ((k === "d" || k === "в") && handlers.onNextWeek)   handlers.onNextWeek();
  };
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}
