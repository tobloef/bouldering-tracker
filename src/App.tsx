import React, {
  useState,
} from "react";
import LoggingView from "./LoggingView";
import AttemptsView from "./AttemptsView";
import { useLocalStorage } from "react-use";
import {
  GymName,
  GYMS,
} from "./gyms";

const VIEWS = ["Logging", "Attempts"] as const;
type View = typeof VIEWS[number];

function App() {
  const [selectedView, setSelectedView] = useState<View>("Logging");
  const [selectedGymName, setSelectedGymName] = useLocalStorage<GymName>('selectedGymName', "Boulders Sydhavn");

  return (
    <div className="flex flex-col px-8 py-4 overflow-hidden h-full select-none">
      <div className="flex space-x-4 mb-4">
        {VIEWS.map((view) => (
          <button
            key={view}
            className={`flex-1 text-2xl rounded border-2 border-black py-1 ${view === selectedView ? "bg-blue-200" : "bg-gray-100"}`}
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
            <LoggingView selectedGymName={selectedGymName} />
          )}
          {selectedView === "Attempts" && (
            <AttemptsView selectedGymName={selectedGymName} />
          )}
        </>
      )}
    </div>
  )
}

export default App
