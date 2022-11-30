import {
  Grade,
  GymName,
  GYMS,
} from "./gyms";
import invert from "invert-color";
import React, { useCallback } from "react";
import {
  AnyAttempt,
  Attempt,
  GradeNames,
  OUTCOMES,
} from "./attempt";

type LoggingViewProps = {
  selectedGymName: GymName,
}

const LoggingView: React.FC<LoggingViewProps> = ({ selectedGymName }) => {
  const selectedGym = selectedGymName != null ? GYMS[selectedGymName] : undefined;

  const logAttempt = useCallback((
    attempt: AnyAttempt
  ) => {
    const {
      gymName,
      gradeName,
      outcome,
    } = attempt;

    if (!confirm(`Really log a ${outcome} on ${gradeName} grade in ${gymName}?`)) {
      return;
    }

    console.debug(gymName, gradeName, outcome);
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
                className="flex-1 px-4 py-6 hover:brightness-75 rounded border-2 border-black"
                style={{
                  backgroundColor: grade.color,
                }}
                onClick={() => logAttempt({
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
