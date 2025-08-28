// Локальні нотатки/статус для кожного уроку

export type AdditionalData = {
  urgent?: boolean;        // чи підсвічувати як термінове
  notes?: string;          // довільні нотатки
  withInfoIcon?: boolean;  // чи показувати іконку "і"
};

type Store = Record<string, AdditionalData>;

const LS_KEY = "lesson.additionalData.v1";

function safeParse<T>(s: string | null): T | null {
  if (!s) return null;
  try {
    return JSON.parse(s) as T;
  } catch {
    return null;
  }
}

function loadStore(): Store {
  const raw = safeParse<Store>(localStorage.getItem(LS_KEY));
  return raw && typeof raw === "object" ? raw : {};
}

function saveStore(store: Store) {
  localStorage.setItem(LS_KEY, JSON.stringify(store));
}

// Унікальний ключ уроку: 2025-08-28|pair=3|group=1|week=A
export function buildLessonKey(opts: {
  ymd: string;        // формат YYYY-MM-DD
  pair: number;       // № пари
  group: 0 | 1;       // група
  weekType: string | number; // тип тижня
}) {
  const { ymd, pair, group, weekType } = opts;
  return `${ymd}|pair=${pair}|group=${group}|week=${String(weekType)}`;
}

// Отримати дані (або дефолти)
export function getAdditionalData(key: string): AdditionalData {
  const store = loadStore();
  return store[key] ?? { urgent: false, notes: "", withInfoIcon: false };
}

// Оновити/злити дані
export function setAdditionalData(key: string, patch: Partial<AdditionalData>) {
  const store = loadStore();
  const prev = store[key] ?? {};
  store[key] = { ...prev, ...patch };
  saveStore(store);
}

// За потреби: видалити або очистити все
export function removeAdditionalData(key: string) {
  const store = loadStore();
  if (key in store) {
    delete store[key];
    saveStore(store);
  }
}

export function clearAllAdditionalData() {
  saveStore({});
}
