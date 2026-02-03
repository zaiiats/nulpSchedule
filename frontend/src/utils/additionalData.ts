export type AdditionalData = {
  urgent?: boolean;        
  notes?: string;         
  withInfoIcon?: boolean; 
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

export function buildLessonKey(opts: {
  ymd: string;       
  pair: number;      
  group: 0 | 1;     
  weekType: string | number;
}) {
  const { ymd, pair, group, weekType } = opts;
  return `${ymd}|pair=${pair}|group=${group}|week=${String(weekType)}`;
}

export function getAdditionalData(key: string): AdditionalData {
  const store = loadStore();
  return store[key] ?? { urgent: false, notes: "", withInfoIcon: false };
}

export function setAdditionalData(key: string, patch: Partial<AdditionalData>) {
  const store = loadStore();
  const prev = store[key] ?? {};
  store[key] = { ...prev, ...patch };
  saveStore(store);
}

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
