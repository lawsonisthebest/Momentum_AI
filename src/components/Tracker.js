// Tracker.jsx
import React from "react";
import { Link } from "react-router-dom";

export const Tracker = (props) => {
  const progressPercentage = Math.min(
    100,
    ((props.currentProgress || 0) / (props.totalGoal || 1)) * 100
  );

  return (
    <Link
      to={`/tracker-details/${props.id}`}
      className="block group transition-all duration-200"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center bg-white rounded-xl p-4 border border-gray-200 hover:border-indigo-300 transition-all duration-300">
        <div className="flex-shrink-0 mb-3 sm:mb-0 sm:mr-4">
          <div className="w-12 h-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <i
              className={`fas fa-${props.imgName || "chart-line"} text-xl`}
            ></i>
          </div>
        </div>

        <div className="flex-grow min-w-0 w-full">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2">
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {props.title || "Untitled"}
            </h2>
            <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
              {(props.currentProgress || 0).toLocaleString()} /{" "}
              {(props.totalGoal || 0).toLocaleString()} {props.unit || ""}
            </span>
          </div>

          <div className="mt-2">
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-indigo-500 to-indigo-300 h-2 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-gray-500 truncate">
                {props.category || "Uncategorized"}
              </span>
              {props.unit && (
                <span className="text-xs font-medium text-gray-500">
                  • {props.unit}
                </span>
              )}
            </div>
            <span className="text-xs font-medium text-indigo-600 whitespace-nowrap">
              {Math.round(progressPercentage)}% complete
            </span>
          </div>
        </div>

        <div className="ml-4 flex-shrink-0">
          <i className="fas fa-chevron-right text-gray-400 group-hover:text-indigo-500"></i>
        </div>
      </div>
    </Link>
  );
};
