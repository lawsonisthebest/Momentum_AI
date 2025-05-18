import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: "fa-chart-line",
      color: "blue",
    },
    {
      to: "/calendar",
      label: "Calendar",
      icon: "fa-calendar",
      color: "purple",
    },
    {
      to: "/tasks",
      label: "Tasks",
      icon: "fa-tasks",
      color: "green",
    },
    {
      to: "/wellness",
      label: "Wellness",
      icon: "fa-heartbeat",
      color: "pink",
    },
    {
      to: "/goal-recommendations",
      label: "Goals",
      icon: "fa-bullseye",
      color: "yellow",
    },
    {
      to: "/rewards",
      label: "Rewards",
      icon: "fa-trophy",
      color: "red",
    },
  ];

  return (
    <nav className="w-full px-4 py-3 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm bg-opacity-80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-black text-xl sm:text-2xl font-bold tracking-tight truncate hover:opacity-80 transition-opacity duration-200"
        >
          <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
            Momentum
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center justify-center w-12 h-12 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <div
                className={`w-10 h-10 rounded-lg bg-${item.color}-50 flex items-center justify-center flex-shrink-0`}
              >
                <i
                  className={`fas ${item.icon} text-${item.color}-600 text-xl`}
                ></i>
              </div>
            </Link>
          ))}
          <Link
            to="/account"
            className="flex items-center justify-center w-12 h-12 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
          >
            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-user text-gray-600 text-xl"></i>
            </div>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <i className="fas fa-bars text-gray-600"></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 py-2 bg-white rounded-lg shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div
                className={`w-8 h-8 rounded-lg bg-${item.color}-50 flex items-center justify-center`}
              >
                <i className={`fas ${item.icon} text-${item.color}-600`}></i>
              </div>
              <span>{item.label}</span>
            </Link>
          ))}
          <Link
            to="/account"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
              <i className="fas fa-user text-gray-600"></i>
            </div>
            <span>Account</span>
          </Link>
        </div>
      )}
    </nav>
  );
};
