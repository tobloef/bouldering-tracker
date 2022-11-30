import React, {
  useCallback,
  useMemo,
} from "react";
import {
  AnyAttempt,
  Attempt,
} from "./attempt";
import {
  GymName,
  GYMS,
} from "./gyms";
import invert from "invert-color";
import formatDate from "./formatDate";

type AttemptsViewProps = {
  selectedGymName: GymName,
}

const AttemptsView: React.FC<AttemptsViewProps> = ({ selectedGymName }) => {
  const attempts: Array<AnyAttempt> = useMemo(() => [
    {
      gymName: "Boulders Sydhavn",
      gradeName: "Blue",
      outcome: "Top",
      date: new Date(),
    },
    {
      gymName: "Boulders Sydhavn",
      gradeName: "Orange",
      outcome: "Flash",
      date: new Date(),
    },
    {
      gymName: "Boulders Sydhavn",
      gradeName: "Purple",
      outcome: "Fail",
      date: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 3),
    },
  ], []);

  const deleteAttempt = useCallback((attempt: AnyAttempt) => {
    const {
      gymName,
      gradeName,
      outcome,
    } = attempt;

    if (!confirm(`Really delete a ${outcome} on ${gradeName} grade in ${gymName}?`)) {
      return;
    }

    console.debug(gymName, gradeName, outcome);
  }, []);

  const filteredAttempts = useMemo(() => {
    return attempts.filter((a): a is Attempt<typeof selectedGymName>  => a.gymName === selectedGymName)
  }, [selectedGymName, attempts]);

  return (
    <div className="flex-col space-y-2 overflow-auto">
      {filteredAttempts.map((attempt, i) => {
        const dateString = formatDate(attempt.date);
        const prevAttempt = filteredAttempts[i - 1];
        const prevDateString = prevAttempt != null
          ? formatDate(prevAttempt.date)
          : undefined;

        const grade = GYMS[attempt.gymName].grades[attempt.gradeName];

        return (
          <div className="first:-mt-2">
            {dateString !== prevDateString && (
              <p
                className="font-bold text-2xl text-center pb-1 pt-4"
              >
                {dateString}
              </p>
            )}
            <div className="flex space-x-2">
              <div
                className="flex-1 flex justify-around border-2 border-black text-xl p-2 rounded font-bold"
                style={{
                  backgroundColor: grade.color,
                  color: invert(grade.color, true),
                }}
              >
                <span>{attempt.gradeName} ({grade.fontGrades.join("/")}):</span>
                <span>{attempt.outcome}</span>
              </div>
              <button
                className="font-bold text-white bg-red-500 text-xl border-2 border-black px-2 py-1 rounded"
                onClick={() => deleteAttempt(attempt)}
              >
                X
              </button>
            </div>
          </div>
        );
      })}
    </div>
  )
};

export default AttemptsView;
