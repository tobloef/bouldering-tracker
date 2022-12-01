export type Gym = {
  grades: Record<string, Grade>,
};

export type Grade = {
  color: string,
  fontGrades: readonly FontGrade[],
};

export type FontGrade = `${">" | ""}${number}${"A" | "B" | "C" | ""}${"+" | ""}`;

export type GymName = keyof typeof GYMS;

export const GYMS = {
  "Boulders Sydhavn": {
    grades: {
      "Green": {
        color: "#42ac3b",
        fontGrades: ["3", "4"],
      },
      "Yellow": {
        color: "#eee630",
        fontGrades: ["4", "4+"],
      },
      "Orange": {
        color: "#ff9428" +
          "",
        fontGrades: ["4+", "5"],
      },
      "Blue": {
        color: "#0a71da",
        fontGrades: ["5", "5+"],
      },
      "Purple": {
        color: "#54177b",
        fontGrades: ["5+", "6A"],
      },
      "Red": {
        color: "#d22425",
        fontGrades: ["6A", "6C"],
      },
      "Black": {
        color: "#000000",
        fontGrades: ["6C", "7A+"],
      },
      "Pink": {
        color: "#bd3086",
        fontGrades: [">7A+"],
      },
    }
  },
  "Blocs & Walls": {
    grades: {
      "Green": {
        color: "#42ac3b",
        fontGrades: ["3"],
      },
      "Yellow": {
        color: "#eee630",
        fontGrades: ["4"],
      },
      "Blue": {
        color: "#1666be",
        fontGrades: ["5"],
      },
      "Red": {
        color: "#d22425",
        fontGrades: ["6"],
      },
      "Black": {
        color: "#000000",
        fontGrades: ["7"],
      },
    },
  },
  "Beta Boulders South": {
    grades: {
      "Teal": {
        color: "#74a4a1",
        fontGrades: ["4"],
      },
      "Green": {
        color: "#42ac3b",
        fontGrades: ["5"],
      },
      "Yellow": {
        color: "#eee630",
        fontGrades: ["5B", "6A"],
      },
      "Blue": {
        color: "#1666be",
        fontGrades: ["6A", "6B"],
      },
      "Orange": {
        color: "#ff9428",
        fontGrades: ["6B", "6C"],
      },
      "Red": {
        color: "#d22425",
        fontGrades: ["6C", "7A"],
      },
      "Black": {
        color: "#000000",
        fontGrades: [">6C+"],
      },
    },
  }
} as const satisfies Record<string, Gym>;
