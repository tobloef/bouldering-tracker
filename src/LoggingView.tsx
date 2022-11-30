import {
  Grade,
  GymName,
  GYMS,
} from "./gyms";
import invert from "invert-color";
import React, {
  useCallback,
  useState,
} from "react";
import {
  AnyAttempt,
  Attempt,
  GradeNames,
  OUTCOMES,
} from "./attempt";
import { Session } from "@supabase/supabase-js";
import {
  createAttempt,
  deleteAttempt,
} from "./supabaseQueries";

type LoggingViewProps = {
  selectedGymName: GymName,
  session: Session,
}

const LoggingView: React.FC<LoggingViewProps> = ({ selectedGymName }) => {
  const selectedGym = selectedGymName != null ? GYMS[selectedGymName] : undefined;

  const [createAttemptLoading, setCreateAttemptLoading] = useState<boolean>(false);

  const tryCreateAttempt = useCallback(async (attempt: Omit<Attempt<GymName>, "userId" | "id">) => {
    const {
      gymName,
      gradeName,
      outcome,
    } = attempt;

    if (!confirm(`Really add this ${outcome} on a ${gradeName} grade in ${gymName}?`)) {
      return;
    }

    try {
      setCreateAttemptLoading(true);

      await createAttempt(attempt);
    } catch (error) {
      alert(`Error deleting attempt: ${(error as Error).message}`);
    } finally {
      setCreateAttemptLoading(false);
    }
  }, []);

  const grades = selectedGym != null
    ? (Object.entries(selectedGym.grades) as [GradeNames<typeof selectedGymName>, Grade][])
    : undefined;

  return (
    <>
      <div
        className={"flex-col space-y-4 overflow-auto"}
      >
        {grades && grades.map(([gradeName, grade]) => (
          <div
            key={gradeName}
            className="flex space-x-2 font-bold text-2xl"
            style={{
              color: invert(grade.color, true),
            }}
          >
            {OUTCOMES.map((outcome) => (
              <button
                key={outcome}
                className="
                  flex-1 px-4 py-6 hover:brightness-75 rounded border-2 border-black
                  disabled:saturate-50 disabled:hover:brightness-100
                "
                style={{
                  backgroundColor: grade.color,
                }}
                onClick={() => tryCreateAttempt({
                  gymName: selectedGymName,
                  gradeName,
                  outcome,
                  date: new Date(),
                })}
              >
                {outcome}
              </button>
            ))}
          </div>
        ))}
      </div>
    </>
  )
};

export default LoggingView;
