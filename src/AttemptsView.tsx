import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  AnyAttempt,
  Attempt,
  fromDbFormat,
} from "./attempt";
import {
  GymName,
  GYMS,
} from "./gyms";
import invert from "invert-color";
import formatDate from "./formatDate";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";
import {
  deleteAttempt,
  getAttempts,
} from "./supabaseQueries";

type AttemptsViewProps = {
  selectedGymName: GymName,
  session: Session,
}

const AttemptsView: React.FC<AttemptsViewProps> = ({ selectedGymName }) => {
  const [attempts, setAttempts] = useState<AnyAttempt[]>();
  const [attemptsLoading, setAttemptsLoading] = useState<boolean>();
  const [deleteAttemptLoading, setDeleteAttemptLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setAttemptsLoading(true);

        const { data, error } = await getAttempts();

        if (error != null) {
          throw error;
        }

        if (data != null) {
          setAttempts(data.map(fromDbFormat));
        } else {
          throw new Error("Unknown error");
        }
      } catch (error) {
        alert(`Error loading attempts: ${(error as Error).message}`);
      } finally {
        setAttemptsLoading(false);
      }
    })();
  }, []);

  const tryDeleteAttempt = useCallback(async (attempt: AnyAttempt) => {
    const {
      gymName,
      gradeName,
      outcome,
    } = attempt;

    if (!confirm(`Really delete this ${outcome} on a ${gradeName} grade in ${gymName}?`)) {
      return;
    }

    try {
      setDeleteAttemptLoading(true);

      await deleteAttempt(attempt.id);

      setAttempts((prev) => prev?.filter((a) => a.id !== attempt.id));
    } catch (error) {
      alert(`Error deleting attempt: ${(error as Error).message}`);
    } finally {
      setDeleteAttemptLoading(false);
    }
  }, []);

  const filteredAttempts = useMemo(() => {
    if (attempts == null) {
      return [];
    }

    return attempts.filter((a): a is Attempt<typeof selectedGymName>  => a.gymName === selectedGymName)
  }, [selectedGymName, attempts]);

  if (attemptsLoading) {
    return (
      <div className="flex justify-center items-center flex-1">
        <p className="text-3xl font-bold">Loading attempts...</p>
      </div>
    )
  }

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
                className="
                  font-bold text-white bg-red-500 text-xl border-2 border-black px-2 py-1 rounded hover:brightness-75
                  disabled:brightness-200 disabled:hover:brightness-100
                "
                onClick={() => tryDeleteAttempt(attempt)}
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
