import React from "react";
import { Link } from "react-router-dom";

export const NewTracker = ({ addTracker }) => {
  return (
    <div className="w-full">
      <Link
        to={"/new-tracker"}
        className="w-full h-12 flex items-center justify-center gap-3 rounded-lg bg-white border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-500 hover:text-white transition-all duration-300 ease-in-out shadow-sm"
      >
        <i className="fas fa-plus text-lg"></i>
        <span className="text-lg font-medium">Add New Tracker</span>
      </Link>
    </div>
  );
};
