import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTrackers } from "../data/useTrackers";
import { Navbar } from "./Navbar";

export const TrackerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { trackers, updateTracker } = useTrackers();
  const tracker = trackers.find((t) => t.id === parseInt(id));

  if (!tracker) {
    return <div>Tracker not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-indigo-100 text-indigo-600">
                <i className={`fas fa-${tracker.imgName} text-2xl`}></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {tracker.title}
                </h1>
                <p className="text-gray-600">{tracker.description}</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/")}
              className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition duration-200"
            >
              <i className="fa-solid fa-chevron-left text-xl"></i>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 bg-indigo-50 rounded-lg">
              <h3 className="text-sm font-medium text-indigo-600 mb-2">
                Current Progress
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  {tracker.currentProgress}
                </span>
                {tracker.unit && (
                  <span className="text-sm text-gray-500">{tracker.unit}</span>
                )}
              </div>
            </div>

            <div className="p-4 bg-indigo-50 rounded-lg">
              <h3 className="text-sm font-medium text-indigo-600 mb-2">
                Daily Goal
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  {tracker.dailyGoal}
                </span>
                {tracker.unit && (
                  <span className="text-sm text-gray-500">{tracker.unit}</span>
                )}
              </div>
            </div>

            <div className="p-4 bg-indigo-50 rounded-lg">
              <h3 className="text-sm font-medium text-indigo-600 mb-2">
                Weekly Goal
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  {tracker.weeklyGoal}
                </span>
                {tracker.unit && (
                  <span className="text-sm text-gray-500">{tracker.unit}</span>
                )}
              </div>
            </div>

            <div className="p-4 bg-indigo-50 rounded-lg">
              <h3 className="text-sm font-medium text-indigo-600 mb-2">
                Monthly Goal
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  {tracker.monthlyGoal}
                </span>
                {tracker.unit && (
                  <span className="text-sm text-gray-500">{tracker.unit}</span>
                )}
              </div>
            </div>

            <div className="p-4 bg-indigo-50 rounded-lg">
              <h3 className="text-sm font-medium text-indigo-600 mb-2">
                Total Goal
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  {tracker.totalGoal}
                </span>
                {tracker.unit && (
                  <span className="text-sm text-gray-500">{tracker.unit}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
