type Actions = {
  onToggleGroup: () => void;
  onPrevWeek: () => void;
  onNextWeek: () => void;
};

function isEditableTarget(e: KeyboardEvent): boolean {
  const t = e.target as HTMLElement | null;
  if (!t) return false;

  // Будь-який input/textarea/select або contenteditable — ігноруємо
  const tag = t.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if ((t as HTMLElement).isContentEditable) return true;

  // На випадок кастомних компонентів, що оголошують себе як текстове поле
  const role = t.getAttribute("role");
  if (role === "textbox" || role === "searchbox") return true;

  return false;
}

function matchKey(e: KeyboardEvent, letter: "a" | "d" | "f"): boolean {
  // Пріоритет фізичному коду клавіші — стабільно між розкладками
  const code = e.code;
  if (letter === "a" && code === "KeyA") return true;
  if (letter === "d" && code === "KeyD") return true;
  if (letter === "f" && code === "KeyF") return true;

  // Фолбек по символу (на випадок, якщо хтось хоче саме 'a' в активній розкладці)
  const k = (e.key || "").toLowerCase();
  return k === letter;
}

export function bindHotkeys(actions: Actions) {
  const handler = (e: KeyboardEvent) => {
    // Якщо фокус у полі введення або натиснуті модифікатори — не чіпаємо
    if (isEditableTarget(e)) return;
    if (e.ctrlKey || e.altKey || e.metaKey) return;

    if (matchKey(e, "a")) {
      e.preventDefault();
      actions.onPrevWeek();
      return;
    }
    if (matchKey(e, "d")) {
      e.preventDefault();
      actions.onNextWeek();
      return;
    }
    if (matchKey(e, "f")) {
      e.preventDefault();
      actions.onToggleGroup();
      return;
    }
  };

  window.addEventListener("keydown", handler);
  return () => window.removeEventListener("keydown", handler);
}
