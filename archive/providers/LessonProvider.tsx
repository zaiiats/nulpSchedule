import { useState, type ReactNode } from "react";
import {
  LessonContext,
  type LessonModalPayload,
} from "../context/LessonContext";
import AdditionalModal from "../components/lessonModal/AdditionalModal";

export default function LessonProvider({
  classGroup,
  children,
}: {
  classGroup: string | null;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [payload, setPayload] = useState<LessonModalPayload | null>(null);

  const openModal = (data: LessonModalPayload) => {
    setPayload(data);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setPayload(null);
  };

  return (
    <LessonContext.Provider value={{ openModal, closeModal, classGroup }}>
      {children}
      {/* <AdditionalModal open={isOpen} payload={payload} onClose={closeModal} /> */}
    </LessonContext.Provider>
  );
}
