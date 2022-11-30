export type Gym = {
  grades: Record<string, Grade>,
};

export type Grade = {
  color: string,
  fontGrades: readonly FontGrade[],
  vGrades: readonly VGrade[],
};

export type FontGrade = `${number}${"A" | "B" | "C" | ""}${"+" | ""}`;

export type VGrade = `V${"B" | number}${"+" | "-" | ""}`;

export type GymName = keyof typeof GYMS;

export const GYMS = {
  "Boulders Sydhavn": {
    grades: {
      "Green": {
        color: "#42ac3b",
        fontGrades: ["3", "4"],
        vGrades: ["VB", "V0"],
      },
      "Yellow": {
        color: "#eee630",
        fontGrades: ["4", "4+"],
        vGrades: ["V0"],
      },
      "Orange": {
        color: "#ff9428",
        fontGrades: ["4+", "5"],
        vGrades: ["V1"],
      },
      "Blue": {
        color: "#0a71da",
        fontGrades: ["5", "5+"],
        vGrades: ["V1", "V2"],
      },
      "Purple": {
        color: "#54177b",
        fontGrades: ["5+", "6A"],
        vGrades: ["V2", "V3"],
      },
      "Red": {
        color: "#d22425",
        fontGrades: ["6A", "6C"],
        vGrades: ["V3", "V5"],
      },
      "Black": {
        color: "#000000",
        fontGrades: ["6C", "7A+"],
        vGrades: ["V5", "V7"],
      },
      "Pink": {
        color: "#bd3086",
        fontGrades: ["7A+", "7C+"],
        vGrades: ["V7", "V10"],
      },
    }
  },
  "Blocs & Walls": {
    grades: {
      "Green": {
        color: "#42ac3b",
        fontGrades: [],
        vGrades: [],
      },
      "Yellow": {
        color: "#eee630",
        fontGrades: [],
        vGrades: [],
      },
      "Blue": {
        color: "#1666be",
        fontGrades: [],
        vGrades: [],
      },
      "Red": {
        color: "#d22425",
        fontGrades: [],
        vGrades: [],
      },
      "Black": {
        color: "#000000",
        fontGrades: [],
        vGrades: [],
      },
    },
  },
  "Beta Boulders South": {
    grades: {
      "Teal": {
        color: "#74a4a1",
        fontGrades: [],
        vGrades: [],
      },
      "Green": {
        color: "#42ac3b",
        fontGrades: [],
        vGrades: [],
      },
      "Yellow": {
        color: "#eee630",
        fontGrades: [],
        vGrades: [],
      },
      "Blue": {
        color: "#1666be",
        fontGrades: [],
        vGrades: [],
      },
      "Orange": {
        color: "#ff9428",
        fontGrades: [],
        vGrades: [],
      },
      "Red": {
        color: "#d22425",
        fontGrades: [],
        vGrades: [],
      },
      "Black": {
        color: "#000000",
        fontGrades: [],
        vGrades: [],
      },
    },
  }
} as const satisfies Record<string, Gym>;
