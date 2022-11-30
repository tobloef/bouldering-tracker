import React, {
  useEffect,
  useState,
} from "react";
import LoggingView from "./LoggingView";
import AttemptsView from "./AttemptsView";
import { useLocalStorage } from "react-use";
import {
  GymName,
  GYMS,
} from "./gyms";
import { supabase } from "./supabaseClient";
import { Session } from "@supabase/supabase-js";
import Auth from "./Auth";

const VIEWS = ["Logging", "Attempts"] as const;
type View = typeof VIEWS[number];

function App() {
  const [session, setSession] = useState<Session>();
  const [selectedView, setSelectedView] = useState<View>("Logging");
  const [selectedGymName, setSelectedGymName] = useLocalStorage<GymName>('selectedGymName', "Boulders Sydhavn");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session ?? undefined);
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session ?? undefined);
    })
  }, [])

  if (session == null) {
    return (
      <Auth />
    )
  }

  return (
    <div className="flex flex-col px-8 py-4 overflow-hidden h-full select-none">
      <div className="flex space-x-4 mb-4">
        {VIEWS.map((view) => (
          <button
            key={view}
            className={`flex-1 text-2xl rounded border-2 border-black py-2 ${view === selectedView ? "bg-blue-200" : "bg-gray-100"} hover:brightness-75 font-bold`}
            onClick={() => setSelectedView(view)}
          >
            {view}
          </button>
        ))}
      </div>
      <select
        className="text-3xl font-bold mb-4 border-2 border-black rounded p-2"
        onChange={(e) => setSelectedGymName(e.target.value as GymName)}
        value={selectedGymName}
      >
        {Object.keys(GYMS).map((gymName) => (
          <option key={gymName} value={gymName}>{gymName}</option>
        ))}
      </select>
      {selectedGymName != null && (
        <>
          {selectedView === "Logging" && (
            <LoggingView selectedGymName={selectedGymName} session={session} />
          )}
          {selectedView === "Attempts" && (
            <AttemptsView selectedGymName={selectedGymName} session={session} />
          )}
        </>
      )}
    </div>
  )
}

export default App
