// useTrackers.js
import { useState, useEffect } from "react";

export function useTrackers() {
  const [trackers, setTrackers] = useState(() => {
    // Try to get trackers from localStorage, return empty array if none exist
    const savedTrackers = localStorage.getItem("trackers");
    return savedTrackers ? JSON.parse(savedTrackers) : [];
  });

  // Save trackers to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("trackers", JSON.stringify(trackers));
  }, [trackers]);

  const addTracker = (newTracker) => {
    setTrackers([...trackers, newTracker]);
  };

  const updateTracker = (id, updatedData) => {
    setTrackers(
      trackers.map((tracker) =>
        tracker.id === id ? { ...tracker, ...updatedData } : tracker
      )
    );
  };

  const deleteTracker = (id) => {
    setTrackers(trackers.filter((tracker) => tracker.id !== id));
  };

  return { trackers, addTracker, updateTracker, deleteTracker };
}
