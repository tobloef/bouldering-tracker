import {
  GymName,
  GYMS,
} from "./gyms";
import {
  DbAttempt,
  GetAttemptsResponse,
} from "./supabaseQueries";

export type Attempt<T extends GymName> = {
  id: number,
  userId: string,
  gymName: T,
  gradeName: GradeNames<T>,
  outcome: Outcome,
  date: Date,
}


type Distribute<T> = T extends GymName ? Attempt<T> : never;
type SomePartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type AnyAttempt = Distribute<GymName>;

export type GradeNames<T extends GymName> = keyof (typeof GYMS)[T]["grades"];

export const OUTCOMES = ["Fail", "Top", "Flash"] as const;
export type Outcome = typeof OUTCOMES[number];

export function fromDbFormat(dbAttempt: DbAttempt): AnyAttempt {
  return {
    id: dbAttempt.id,
    userId: dbAttempt.user_id,
    gymName: dbAttempt.gym_name as GymName,
    gradeName: dbAttempt.grade_name as GradeNames<GymName>,
    outcome: dbAttempt.outcome as Outcome,
    date: new Date(dbAttempt.date),
  }
}

export function toDbFormat(attempt: SomePartial<AnyAttempt, "id">): SomePartial<DbAttempt, "id"> {
  return {
    user_id: attempt.userId,
    gym_name: attempt.gymName,
    grade_name: attempt.gradeName,
    date: attempt.date.toISOString(),
    outcome: attempt.outcome,
  }
}
