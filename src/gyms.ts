export type Gym = {
  grades: Record<string, Grade>,
};

export type Grade = {
  color: string,
  fontGrades: (
    | {
      from: "below",
      to: FontGrade,
    }
    | {
      from: FontGrade,
      to: FontGrade,
    }
    | {
      from: FontGrade,
      to: "above",
    }
  ),
};

export type FontGrade = `${number}${"A" | "B" | "C" | ""}${"+" | ""}`;

export type GymName = keyof typeof GYMS;

export const GYMS = {
  "Boulders Sydhavn": {
    grades: {
      "Green": {
        color: "#42ac3b",
        fontGrades: { from: "3", to: "4" },
      },
      "Yellow": {
        color: "#eee630",
        fontGrades: { from: "4", to: "4+" },
      },
      "Orange": {
        color: "#ff9428" +
          "",
        fontGrades: { from: "4+", to: "5" },
      },
      "Blue": {
        color: "#0a71da",
        fontGrades: { from: "5", to: "5+"},
      },
      "Purple": {
        color: "#54177b",
        fontGrades: { from: "5+", to: "6A"},
      },
      "Red": {
        color: "#d22425",
        fontGrades: { from: "6A", to: "6C"},
      },
      "Black": {
        color: "#000000",
        fontGrades: { from: "6C", to: "7A+"},
      },
      "Pink": {
        color: "#bd3086",
        fontGrades: { from: "7A+", to: "above"},
      },
    }
  },
  "Blocs & Walls": {
    grades: {
      "Green": {
        color: "#42ac3b",
        fontGrades: { from: "3", to: "4"},
      },
      "Yellow": {
        color: "#eee630",
        fontGrades: { from: "4", to: "5"},
      },
      "Blue": {
        color: "#1666be",
        fontGrades: { from: "5", to: "6"},
      },
      "Red": {
        color: "#d22425",
        fontGrades: { from: "6", to: "7"},
      },
      "Black": {
        color: "#000000",
        fontGrades: { from: "7", to: "above"},
      },
    },
  },
  "Beta Boulders South": {
    grades: {
      "Teal": {
        color: "#74a4a1",
        fontGrades: { from: "4", to: "5" },
      },
      "Green": {
        color: "#42ac3b",
        fontGrades: { from: "5", to: "5B"},
      },
      "Yellow": {
        color: "#eee630",
        fontGrades: { from: "5B", to: "6A"},
      },
      "Blue": {
        color: "#1666be",
        fontGrades: { from: "6A", to: "6B"},
      },
      "Orange": {
        color: "#ff9428",
        fontGrades: { from: "6B", to: "6C"},
      },
      "Red": {
        color: "#d22425",
        fontGrades: { from: "6C", to: "7A"},
      },
      "Black": {
        color: "#000000",
        fontGrades: { from: "6C+", to: "above" },
      },
    },
  }
} as const satisfies Record<string, Gym>;
