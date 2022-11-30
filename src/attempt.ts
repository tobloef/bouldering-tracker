import {
  GymName,
  GYMS,
} from "./gyms";

export type Attempt<T extends GymName> = {
  gymName: T,
  gradeName: GradeNames<T>,
  outcome: Outcome,
  date: Date,
}


type Distribute<U> = U extends GymName ? Attempt<U> : never;
export type AnyAttempt = Distribute<GymName>;

export type GradeNames<T extends GymName> = keyof (typeof GYMS)[T]["grades"];

export const OUTCOMES = ["Fail", "Top", "Flash"] as const;
export type Outcome = typeof OUTCOMES[number];
