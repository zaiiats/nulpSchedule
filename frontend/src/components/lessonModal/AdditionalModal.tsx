import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getAdditionalData,
  setAdditionalData,
  type AdditionalData,
} from "../../utils/additionalData";
import type { LessonModalPayload } from "../../context/LessonContext";
import Badge from "../lessonCell/Badge";
import { TYPE_LABELS } from "../../constants";

const Backdrop = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: ${({ $open }) => ($open ? "grid" : "none")};
  place-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  width: min(560px, 92vw);
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  display: grid;
  gap: 12px;
`;

/* картка з усією інфою про пару */
const HeaderCard = styled.div`
  display: grid;
  grid-template-columns: 84px 1fr;
  gap: 12px;
  align-items: center;
`;

const Photo = styled.div<{ $src?: string }>`
  width: 84px;
  height: 84px;
  border-radius: 12px;
  background: ${({ $src }) =>
    $src ? `center/cover no-repeat url(${$src})` : "var(--surface-2)"};
  border: 1px solid var(--border);
  display: grid;
  place-items: center;
  color: var(--muted);
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const Title = styled.div`
  display: grid;
  gap: 6px;
  min-width: 0;
`;

const TitleTop = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`;
const Name = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

const MetaLine = styled.div`
  font-size: 12px;
  color: var(--muted);
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  b {
    color: var(--text);
    font-weight: 700;
  }
`;

/* текстова зона фіксованої висоти */
const NotesArea = styled.textarea`
  width: 100%;
  height: 120px; /* фіксована */
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
  padding: 8px;
  resize: none; /* зафіксували */
  line-height: 1.4;
`;

/* нижній футер: ліворуч чекбокс, праворуч кнопки */
const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
  cursor: pointer;
  &:hover {
    background: var(--surface-2);
  }
`;

/* акуратний чекбокс */
const CheckboxLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
`;

const CustomBox = styled.span<{ $checked: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: ${({ $checked }) => ($checked ? "var(--danger-2)" : "var(--bg)")};
  display: inline-grid;
  place-items: center;
  transition: background 120ms ease, border-color 120ms ease;

  &:after {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 3px;
    background: ${({ $checked }) =>
      $checked ? "var(--danger)" : "transparent"};
    transition: background 120ms ease;
  }
`;

function initials(full?: string) {
  if (!full) return "—";
  return full
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function AdditionalModal({
  open,
  payload,
  onClose,
}: {
  open: boolean;
  payload: LessonModalPayload | null;
  onClose: () => void;
}) {
  const lessonKey = payload?.key ?? "";
  const [data, setData] = useState<AdditionalData>({
    urgent: false,
    notes: "",
    withInfoIcon: false,
  });

  useEffect(() => {
    if (!open || !lessonKey) return;
    setData(getAdditionalData(lessonKey));
  }, [open, lessonKey]);

  const typeKey = (payload?.type || "").toLowerCase();
  const typeLabel = TYPE_LABELS[typeKey] ?? payload?.type ?? "";

  const handleSave = () => {
    if (!lessonKey) return;
    const notes = data.notes?.trim() ?? "";
    setAdditionalData(lessonKey, {
      urgent: Boolean(data.urgent),
      notes,
      withInfoIcon: Boolean(notes),
    });
    onClose();
  };

  console.log(payload);

  return (
    <Backdrop $open={open} onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <HeaderCard>
          <Photo $src={payload?.teacherPhoto}>
            {!payload?.teacherPhoto ? initials(payload?.teacher) : null}
          </Photo>

          <Title>
            <TitleTop>
              <Name title={payload?.title}>{payload?.title ?? "Урок"}</Name>
              {typeLabel ? <Badge kind={typeKey}>{typeLabel}</Badge> : null}
            </TitleTop>

            <MetaLine>
              {payload?.time ? <span>⏰ {payload.time}</span> : null}
              {payload?.classNum || payload?.corps ? (
                <span>
                  ауд. {payload?.classNum ? <b>{payload.classNum}</b> : "—"}
                  {payload?.corps ? (
                    <>
                      {" "}
                      , корп. <b>{payload.corps}</b>
                    </>
                  ) : null}
                </span>
              ) : null}
              {payload?.teacher ? <span>👤 {payload.teacher}</span> : null}
            </MetaLine>
          </Title>
        </HeaderCard>

        <div>
          <label
            style={{
              fontSize: 12,
              color: "var(--muted)",
              display: "block",
              marginBottom: 6,
            }}
          >
            Нотатки
          </label>
          <NotesArea
            value={data.notes ?? ""}
            onChange={(e) => setData((s) => ({ ...s, notes: e.target.value }))}
          />
        </div>

        <Footer>
          <CheckboxLabel>
            <HiddenCheckbox
              checked={Boolean(data.urgent)}
              onChange={(e) =>
                setData((s) => ({ ...s, urgent: e.target.checked }))
              }
            />
            <CustomBox $checked={Boolean(data.urgent)} />
            Терміново
          </CheckboxLabel>

          <Actions>
            <Button onClick={onClose}>Скасувати</Button>
            <Button onClick={handleSave}>Зберегти</Button>
          </Actions>
        </Footer>
      </Modal>
    </Backdrop>
  );
}
