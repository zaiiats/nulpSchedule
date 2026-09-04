export const teachers = {
  soroka: { name: "Сорока", photo: "soroka.png" },
  zhuravchak: { name: "Журавчак Даниїл Юрійович", photo: "zhuravchak.png" },
  besaha: { name: "Бесага Христина Степанівна", photo: "besaha.png" },
  dzianyi: { name: "Дзяний Назарій Ростиславович", photo: "dzianyi.png" },
  chervinka: { name: "Червінка Костянтин Андрійович", photo: "chervinka.png" },
  susukaylo: { name: "Сусукайло Віталій Андрійович", photo: "susukaylo.png" },
  karkavchuk: { name: "Каркавчук Валентин Ігорович", photo: "karkavchuk.png" },
  vasylyshyn: { name: "Василишин Святослав Ігорович", photo: "vasylyshyn.png" },
} as const;

export const lessonsNames = {
  incident_investigation:
    "Технології розслідування інцидентів інформаційної безпеки",
  network_security_tools:
    "Інструменти мережевої безпеки та системи журналізаціі подій в КС",
  software_testing: "Тестування програмного забезпечення",
  network_os_security: "Безпека мережевих операційних систем",
  software_security: "Безпека програмного забезпечення",
} as const;

export type LessonType = "lection" | "lab" | "practice";

export type Format =
  | "full"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "topLeft"
  | "bottomLeft"
  | "topRight"
  | "bottomRight";

export interface Location {
  corps: string;
  auditory: string;
}

export interface Lesson {
  name: keyof typeof lessonsNames;
  teacher: keyof typeof teachers;
  type: LessonType;
  format: Format;
  location: Location;
}

export type DayOfWeek = "mon" | "tue" | "wed" | "thu" | "fri";
export type DaySchedule = Record<number, Lesson | Lesson[]>;

export type FullWeekSchedule = {
  [key in DayOfWeek]: DaySchedule;
};

export const STARTING_TIME = 13 * 60;
export const ENDING_TIME = 4 * 60;
export const DAY_TIME = 24 * 60 - STARTING_TIME - ENDING_TIME;
export const TIME_STEP = 5;

export const TYPE_LABELS: Record<LessonType, string> = {
  lab: "Лаба",
  practice: "Практ",
  lection: "Лекц",
};

export const TYPE_COLORS: Record<
  LessonType,
  { bg: string; border: string; text: string }
> = {
  lab: {
    bg: "rgba(234,179,8,0.12)",
    border: "rgba(234,179,8,0.35)",
    text: "#facc15",
  },
  practice: {
    bg: "rgba(239,68,68,0.12)",
    border: "rgba(239,68,68,0.35)",
    text: "#f87171",
  },
  lection: {
    bg: "rgba(34,197,94,0.12)",
    border: "rgba(34,197,94,0.35)",
    text: "#4ade80",
  },
};

export const lessonsData: FullWeekSchedule = {
  mon: {
    5: [
      {
        name: "incident_investigation",
        teacher: "soroka",
        type: "lab",
        format: "right",
        location: { corps: "-", auditory: "-" },
      },
    ],
    6: {
      name: "network_security_tools",
      teacher: "zhuravchak",
      type: "practice",
      format: "full",
      location: { corps: "-", auditory: "-" },
    },
    7: [
      {
        name: "incident_investigation",
        teacher: "soroka",
        type: "lab",
        format: "left",
        location: { corps: "-", auditory: "-" },
      },
      {
        name: "software_testing",
        teacher: "besaha",
        type: "lab",
        format: "right",
        location: { corps: "-", auditory: "-" },
      },
    ],
  },
  tue: {
    5: {
      name: "network_os_security",
      teacher: "dzianyi",
      type: "lection",
      format: "full",
      location: { corps: "-", auditory: "-" },
    },
    6: [
      {
        name: "software_testing",
        teacher: "chervinka",
        type: "lection",
        format: "top",
        location: { corps: "-", auditory: "-" },
      },
      {
        name: "software_security",
        teacher: "susukaylo",
        type: "lection",
        format: "bottom",
        location: { corps: "-", auditory: "-" },
      },
    ],
  },
  wed: {
    4: {
      name: "network_security_tools",
      teacher: "zhuravchak",
      type: "practice",
      format: "full",
      location: { corps: "-", auditory: "-" },
    },
    5: [
      {
        name: "incident_investigation",
        teacher: "soroka",
        type: "lab",
        format: "topLeft",
        location: { corps: "-", auditory: "-" },
      },
      {
        name: "incident_investigation",
        teacher: "soroka",
        type: "lab",
        format: "bottomRight",
        location: { corps: "-", auditory: "-" },
      },
    ],
  },
  thu: {
    4: [
      {
        name: "software_security",
        teacher: "karkavchuk",
        type: "lab",
        format: "right",
        location: { corps: "-", auditory: "-" },
      },
    ],
    5: {
      name: "network_os_security",
      teacher: "dzianyi",
      type: "practice",
      format: "full",
      location: { corps: "-", auditory: "-" },
    },
    6: [
      {
        name: "software_security",
        teacher: "karkavchuk",
        type: "lab",
        format: "left",
        location: { corps: "-", auditory: "-" },
      },
    ],
    7: [
      {
        name: "software_testing",
        teacher: "besaha",
        type: "lab",
        format: "left",
        location: { corps: "-", auditory: "-" },
      },
    ],
  },
  fri: {
    5: {
      name: "incident_investigation",
      teacher: "vasylyshyn",
      type: "lection",
      format: "full",
      location: { corps: "-", auditory: "-" },
    },
    6: [
      {
        name: "network_security_tools",
        teacher: "zhuravchak",
        type: "lection",
        format: "top",
        location: { corps: "-", auditory: "-" },
      },
    ],
  },
};
