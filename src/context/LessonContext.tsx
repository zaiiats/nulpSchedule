import { createContext } from "react";

export interface LessonModalPayload {
  key: string; 
  title?: string;
  teacher?: string; 
  pair: number;
  ymd: string; 
  group: 0 | 1; 
  weekType: string | number;
  teacherPhoto?: string; 
  type?: "lab" | "practice" | "lection" | string;
  classNum?: string; 
  corps?: string; 
  time?: string;
}

export interface LessonContextValue {
  openModal: (data: LessonModalPayload) => void;
  closeModal: () => void;
}

export const LessonContext = createContext<LessonContextValue>({
  openModal: () => {},
  closeModal: () => {},
});
