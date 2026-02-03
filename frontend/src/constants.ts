export const teachers = {
  kret: { name: "Крет Т.Б.", photo: "kret.jpg" },
  horpenyuk: { name: "Горпенюк А.Я.", photo: "horpenyuk.jpg" },
  kolbasynskyi: { name: "Колбасинський І.В.", photo: "kolbasynskyi.jpg" },
  piskozub: { name: "Піскозуб А.З.", photo: "piskozub.jpg" },
  yuzevych: { name: "Юзевич В.М.", photo: "yuzevych.jpg" },
  poberezhnyk: { name: "Побережник В.О.", photo: "poberezhnyk.jpg" },
  kotlyarov: { name: "Котляров О.Ю.", photo: "kotlyarov.jpg" },
  partyka: { name: "Партика А.І.", photo: "partyka.jpg" },
  leskiv: { name: "Леськів Т.С.", photo: "leskiv.jpg" },
  stefankiv: { name: "Стефанків", photo: "stefankiv.jpg" },
  kolchenko: { name: "Кольченко В.В.", photo: "kolchenko.jpg" },
} as const;

export const lessonsNames = {
  infrastructure: "Безпека інфраструктури комп'ютерних мереж",
  crypto: "Криптографічні системи та протоколи",
  hacking: "Етичний хакінг в комп'ютерних системах і мережах",
  web_security: "Безпека вебдодатків",
  mobile_security: "Безпека мобільних технологій, частина 1",
  web_prog: "Web-програмування",
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

export type LessonsData = Record<"305" | "306" | "307", FullWeekSchedule>;

export const STARTING_TIME = 8 * 60; // 08:00
export const ENDING_TIME = 4 * 60; // 04:00
export const DAY_TIME = 24 * 60 - STARTING_TIME - ENDING_TIME;
export const TIME_STEP = 5;
export const LESSON_DURATION = 80;
export const BREAK_DURATION = 15;

export const START_WEEK = new Date(2026, 1, 9); // Понеділок, 9 лютого
export const END_WEEK = new Date(2026, 5, 29); // Понеділок, 29 червня

export const TYPE_LABELS: Record<LessonType, string> = {
  lab: "Лабка",
  practice: "Практ",
  lection: "Лекція",
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

export const lessonsData: LessonsData = {
  306: {
    mon: {
      4: [
        {
          name: "infrastructure",
          teacher: "kret",
          type: "lab",
          format: "left",
          location: { corps: "20", auditory: "221 б" },
        },
      ],
      5: {
        name: "crypto",
        teacher: "horpenyuk",
        type: "lection",
        format: "full",
        location: { corps: "19", auditory: "202" },
      },
      6: [
        {
          name: "hacking",
          teacher: "kolbasynskyi",
          type: "lab",
          format: "left",
          location: { corps: "19", auditory: "210" },
        },
        {
          name: "infrastructure",
          teacher: "kret",
          type: "lab",
          format: "right",
          location: { corps: "20", auditory: "221б" },
        },
      ],
    },
    tue: {
      5: {
        name: "infrastructure",
        teacher: "piskozub",
        type: "lection",
        format: "full",
        location: {
          corps: "19",
          auditory: "202",
        },
      },
      6: [
        {
          name: "crypto",
          teacher: "yuzevych",
          type: "lab",
          format: "left",
          location: {
            corps: "19",
            auditory: "210",
          },
        },
        {
          name: "hacking",
          teacher: "kolbasynskyi",
          type: "lab",
          format: "right",
          location: {
            corps: "19",
            auditory: "220",
          },
        },
      ],
      7: {
        name: "crypto",
        teacher: "yuzevych",
        type: "lab",
        format: "right",
        location: {
          corps: "19",
          auditory: "210",
        },
      },
    },
    wed: {
      5: [
        {
          name: "crypto",
          teacher: "yuzevych",
          type: "practice",
          format: "top",
          location: {
            corps: "19",
            auditory: "221",
          },
        },
        {
          name: "hacking",
          teacher: "piskozub",
          type: "lection",
          format: "bottom",
          location: {
            corps: "19",
            auditory: "208",
          },
        },
      ],
      6: [
        {
          name: "web_security",
          teacher: "poberezhnyk",
          type: "lab",
          format: "topLeft",
          location: {
            corps: "20",
            auditory: "221 а",
          },
        },
        {
          name: "web_security",
          teacher: "kotlyarov",
          type: "lection",
          format: "bottom",
          location: {
            corps: "19",
            auditory: "208",
          },
        },
      ],
      7: [
        {
          name: "hacking",
          teacher: "kolbasynskyi",
          type: "lab",
          format: "topLeft",
          location: {
            corps: "20",
            auditory: "231",
          },
        },
        {
          name: "web_security",
          teacher: "poberezhnyk",
          type: "lab",
          format: "topRight",
          location: {
            corps: "20",
            auditory: "221 а",
          },
        },
        {
          name: "hacking",
          teacher: "kolbasynskyi",
          type: "lab",
          format: "bottomRight",
          location: {
            corps: "20",
            auditory: "231",
          },
        },
      ],
    },
    thu: {
      5: [
        {
          name: "mobile_security",
          teacher: "partyka",
          type: "lection",
          format: "bottom",
          location: {
            corps: "19",
            auditory: "202",
          },
        },
      ],
      6: [
        {
          name: "web_prog",
          teacher: "leskiv",
          type: "lection",
          format: "bottom",
          location: {
            corps: "19",
            auditory: "202",
          },
        },
      ],
    },
    fri: {
      5: [
        {
          name: "mobile_security",
          teacher: "stefankiv",
          type: "lab",
          format: "topLeft",
          location: {
            corps: "20",
            auditory: "221 б",
          },
        },
        {
          name: "web_prog",
          teacher: "kolchenko",
          type: "lab",
          format: "bottomLeft",
          location: {
            corps: "20",
            auditory: "227",
          },
        },
      ],
      6: [
        {
          name: "web_security",
          teacher: "poberezhnyk",
          type: "lab",
          format: "left",
          location: {
            corps: "20",
            auditory: "221 а",
          },
        },
        {
          name: "mobile_security",
          teacher: "stefankiv",
          type: "lab",
          format: "topRight",
          location: {
            corps: "20",
            auditory: "221 б",
          },
        },
        {
          name: "web_prog",
          teacher: "kolchenko",
          type: "lab",
          format: "bottomRight",
          location: {
            corps: "20",
            auditory: "227",
          },
        },
      ],
      7: {
        name: "web_security",
        teacher: "poberezhnyk",
        type: "lab",
        format: "right",
        location: {
          corps: "20",
          auditory: "221 а",
        },
      },
    },
  },
  305: { mon: {}, tue: {}, wed: {}, thu: {}, fri: {} },
  307: { mon: {}, tue: {}, wed: {}, thu: {}, fri: {} },
};
