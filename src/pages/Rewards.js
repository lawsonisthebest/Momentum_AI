import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { Pie, Line, Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { storeItems } from "./Store";
Chart.register(...registerables);

// Chart Options
const pieOptions = {
  plugins: {
    legend: {
      position: "right",
      labels: {
        usePointStyle: true,
        padding: 16,
        font: {
          family: "Inter, sans-serif",
        },
      },
    },
  },
  maintainAspectRatio: false,
};

const lineOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: {
          family: "Inter, sans-serif",
        },
      },
    },
    tooltip: {
      backgroundColor: "#1f2937",
      titleFont: {
        family: "Inter, sans-serif",
      },
      bodyFont: {
        family: "Inter, sans-serif",
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(0, 0, 0, 0.03)",
      },
      ticks: {
        font: {
          family: "Inter, sans-serif",
        },
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          family: "Inter, sans-serif",
        },
      },
    },
  },
  maintainAspectRatio: false,
};

const barOptions = {
  ...lineOptions,
  scales: {
    ...lineOptions.scales,
    x: {
      ...lineOptions.scales.x,
      grid: {
        display: false,
      },
    },
  },
};

const defaultData = {
  points: 0,
  level: 1,
  experience: 0,
  rewards: [],
  history: [],
  lastUpdated: new Date().toISOString(),
};

const TrackingService = {
  getData: () => {
    const data = localStorage.getItem("rewards");
    return data ? JSON.parse(data) : defaultData;
  },

  saveData: (data) => {
    localStorage.setItem("rewards", JSON.stringify(data));
  },

  resetProgress: () => {
    TrackingService.saveData(defaultData);
  },

  updateRewards: (action) => {
    const data = TrackingService.getData();
    const now = new Date();
    const lastUpdated = new Date(data.lastUpdated);
    const isNewDay = now.toDateString() !== lastUpdated.toDateString();

    // Reset daily points if it's a new day
    if (isNewDay) {
      data.dailyPoints = 0;
    }

    // Add points based on action
    let pointsToAdd = 0;
    switch (action.type) {
      case "task_complete":
        pointsToAdd = 10;
        break;
      case "tracker_complete":
        pointsToAdd = 5;
        break;
      case "goal_achieved":
        pointsToAdd = 50;
        break;
      default:
        pointsToAdd = 0;
    }

    // Check if daily points limit is reached
    if (data.dailyPoints + pointsToAdd > 100) {
      pointsToAdd = Math.max(0, 100 - data.dailyPoints);
    }

    // Update points and experience
    data.points += pointsToAdd;
    data.experience += pointsToAdd;
    data.dailyPoints = (data.dailyPoints || 0) + pointsToAdd;

    // Level up if enough experience
    const newLevel = Math.floor(data.experience / 100) + 1;
    if (newLevel > data.level) {
      data.level = newLevel;
      // Add level up reward
      data.rewards.push({
        id: Date.now(),
        type: "level_up",
        points: 50,
        description: `Level ${newLevel} Achievement!`,
        date: now.toISOString(),
      });
    }

    data.lastUpdated = now.toISOString();
    TrackingService.saveData(data);
    return data;
  },
};

export const Rewards = () => {
  const navigate = useNavigate();

  // Add scroll to top effect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [rewards, setRewards] = useState(() => {
    const defaultRewards = {
      points: 0,
      level: 1,
      experience: 0,
      rewards: [],
      history: [],
      lastUpdated: new Date().toISOString(),
    };

    try {
      const saved = localStorage.getItem("rewards");
      return saved ? JSON.parse(saved) : defaultRewards;
    } catch (error) {
      console.error("Error loading rewards:", error);
      return defaultRewards;
    }
  });

  const [showConfetti, setShowConfetti] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [timeFilter, setTimeFilter] = useState("week");
  const [chartType, setChartType] = useState("line");
  const [showStore, setShowStore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const levelThresholds = [
    0, 100, 250, 500, 1000, 2000, 4000, 8000, 16000, 32000,
  ];

  // Initialize task and tracker handlers
  useEffect(() => {
    window.handleTaskComplete = () => {
      setRewards((prev) => {
        const newPoints = Math.min(
          10,
          prev.dailyPointsLimit - prev.dailyPoints
        );
        if (newPoints <= 0) {
          toast.info("Daily points limit reached!");
          return prev;
        }

        const updated = {
          ...prev,
          points: prev.points + newPoints,
          dailyPoints: prev.dailyPoints + newPoints,
          completedTasks: prev.completedTasks + 1,
          dailyProgress: {
            ...prev.dailyProgress,
            tasks: prev.dailyProgress.tasks + 1,
            points: prev.dailyProgress.points + newPoints,
          },
          weeklyProgress: {
            ...prev.weeklyProgress,
            tasks: prev.weeklyProgress.tasks + 1,
            points: prev.weeklyProgress.points + newPoints,
          },
          monthlyProgress: {
            ...prev.monthlyProgress,
            tasks: prev.monthlyProgress.tasks + 1,
            points: prev.monthlyProgress.points + newPoints,
          },
          history: [
            ...prev.history,
            {
              type: "task",
              points: newPoints,
              date: new Date().toISOString(),
            },
          ],
        };

        // Calculate new level
        let newLevel = prev.level;
        for (let i = levelThresholds.length - 1; i >= 0; i--) {
          if (updated.points >= levelThresholds[i]) {
            newLevel = i + 1;
            break;
          }
        }
        updated.level = newLevel;

        // Save to localStorage
        localStorage.setItem("rewards", JSON.stringify(updated));

        // Show notifications
        toast.success(`Task completed! +${newPoints} points`);
        if (newLevel > prev.level) {
          toast.success(`Level Up! You are now level ${newLevel}! 🎉`);
        }

        return updated;
      });
    };

    window.handleTrackerComplete = () => {
      setRewards((prev) => {
        const newPoints = Math.min(5, prev.dailyPointsLimit - prev.dailyPoints);
        if (newPoints <= 0) {
          toast.info("Daily points limit reached!");
          return prev;
        }

        const updated = {
          ...prev,
          points: prev.points + newPoints,
          dailyPoints: prev.dailyPoints + newPoints,
          completedTrackers: prev.completedTrackers + 1,
          dailyProgress: {
            ...prev.dailyProgress,
            trackers: prev.dailyProgress.trackers + 1,
            points: prev.dailyProgress.points + newPoints,
          },
          weeklyProgress: {
            ...prev.weeklyProgress,
            trackers: prev.weeklyProgress.trackers + 1,
            points: prev.weeklyProgress.points + newPoints,
          },
          monthlyProgress: {
            ...prev.monthlyProgress,
            trackers: prev.monthlyProgress.trackers + 1,
            points: prev.monthlyProgress.points + newPoints,
          },
          history: [
            ...prev.history,
            {
              type: "tracker",
              points: newPoints,
              date: new Date().toISOString(),
            },
          ],
        };

        // Calculate new level
        let newLevel = prev.level;
        for (let i = levelThresholds.length - 1; i >= 0; i--) {
          if (updated.points >= levelThresholds[i]) {
            newLevel = i + 1;
            break;
          }
        }
        updated.level = newLevel;

        // Save to localStorage
        localStorage.setItem("rewards", JSON.stringify(updated));

        // Show notifications
        toast.success(`Tracker entry added! +${newPoints} points`);
        if (newLevel > prev.level) {
          toast.success(`Level Up! You are now level ${newLevel}! 🎉`);
        }

        return updated;
      });
    };

    return () => {
      window.handleTaskComplete = undefined;
      window.handleTrackerComplete = undefined;
    };
  }, []);

  // Reset daily progress at midnight
  useEffect(() => {
    const checkAndReset = () => {
      const now = new Date();
      const lastReset = localStorage.getItem("lastReset");
      const today = now.toDateString();

      if (lastReset !== today) {
        setRewards((prev) => {
          const updated = {
            ...prev,
            dailyPoints: 0,
            dailyProgress: { tasks: 0, trackers: 0, points: 0 },
          };
          localStorage.setItem("rewards", JSON.stringify(updated));
          localStorage.setItem("lastReset", today);
          return updated;
        });
      }
    };

    checkAndReset();
    const interval = setInterval(checkAndReset, 60000);
    return () => clearInterval(interval);
  }, []);

  // Remove the polling effect
  useEffect(() => {
    const handleStorageChange = (e) => {
      // Only update if the rewards data actually changed
      if (e.key === "rewards") {
        try {
          const newData = JSON.parse(e.newValue);
          setRewards((prev) => {
            // Only update if the data is different
            if (JSON.stringify(prev) !== e.newValue) {
              return newData;
            }
            return prev;
          });
        } catch (error) {
          console.error("Error parsing rewards data:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const calculateProgress = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const getNextLevelPoints = () => {
    const nextLevel = rewards.level + 1;
    return (
      levelThresholds[nextLevel] || levelThresholds[levelThresholds.length - 1]
    );
  };

  // Generate line chart data
  const lineData = useMemo(() => {
    const labels =
      timeFilter === "week"
        ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        : ["Week 1", "Week 2", "Week 3", "Week 4"];

    const data = timeFilter === "week" ? Array(7).fill(0) : Array(4).fill(0);

    if (rewards.history && Array.isArray(rewards.history)) {
      rewards.history.forEach((entry) => {
        const date = new Date(entry.date);
        const dayOfWeek = date.getDay();
        const weekOfMonth = Math.floor(date.getDate() / 7);

        if (timeFilter === "week") {
          data[dayOfWeek] += entry.points;
        } else {
          data[weekOfMonth] += entry.points;
        }
      });
    }

    return {
      labels,
      datasets: [
        {
          label: `Points per ${timeFilter === "week" ? "day" : "week"}`,
          data,
          borderColor: "#4f46e5",
          backgroundColor: "rgba(79, 70, 229, 0.05)",
          borderWidth: 2,
          tension: 0.3,
          fill: true,
          pointBackgroundColor: "#fff",
          pointBorderColor: "#4f46e5",
          pointBorderWidth: 2,
        },
      ],
    };
  }, [rewards.history, timeFilter]);

  // Generate bar chart data
  const barData = useMemo(() => {
    const labels = rewards.history.map((entry) =>
      new Date(entry.date).toLocaleDateString()
    );
    const data = rewards.history.map((entry) => entry.points);

    return {
      labels,
      datasets: [
        {
          label: "Points",
          data,
          backgroundColor: "rgba(79, 70, 229, 0.8)",
          borderRadius: 6,
        },
      ],
    };
  }, [rewards.history]);

  // Generate pie chart data
  const pieData = useMemo(() => {
    const totalPoints = rewards.history.reduce(
      (sum, entry) => sum + entry.points,
      0
    );
    const remainingPoints = Math.max(0, rewards.dailyPointsLimit - totalPoints);

    return {
      labels: ["Earned", "Remaining"],
      datasets: [
        {
          data: [totalPoints, remainingPoints],
          backgroundColor: [
            "rgba(79, 70, 229, 0.8)",
            "rgba(209, 213, 219, 0.8)",
          ],
          borderWidth: 0,
        },
      ],
    };
  }, [rewards.history, rewards.dailyPointsLimit]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-6 border border-indigo-100">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="min-w-0">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent truncate">
                Rewards Center
              </h1>
              <p className="text-gray-600 mt-1 line-clamp-2">
                Track your progress and earn rewards
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="text-center p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-star text-indigo-600 text-lg"></i>
                </div>
                <div className="min-w-0">
                  <div className="text-2xl font-bold text-indigo-600 truncate">
                    {rewards.points || 0}
                  </div>
                  <div className="text-xs font-medium text-indigo-500 truncate">
                    Total Points
                  </div>
                </div>
              </div>
              <div className="text-center p-3 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-trophy text-purple-600 text-lg"></i>
                </div>
                <div className="min-w-0">
                  <div className="text-2xl font-bold text-purple-600 truncate">
                    Level {rewards.level || 1}
                  </div>
                  <div className="text-xs font-medium text-purple-500 truncate">
                    Current Level
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Level Progress */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Level {rewards.level || 1}</span>
              <span>Level {(rewards.level || 1) + 1}</span>
            </div>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                initial={{ width: 0 }}
                animate={{
                  width: `${calculateProgress(
                    rewards.points || 0,
                    getNextLevelPoints()
                  )}%`,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <div className="text-sm text-gray-600 mt-2 text-right">
              {rewards.points || 0} / {getNextLevelPoints()} points
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Tracking Section */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <i className="fas fa-chart-line text-indigo-500"></i>
                Progress Tracking
              </h2>

              {/* Statistics Panel */}
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-5 border border-emerald-100 mb-8">
                <h3 className="text-lg font-semibold text-emerald-900 mb-5 flex items-center gap-2">
                  <i className="fas fa-chart-pie text-emerald-600"></i>
                  Activity Statistics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white/50 rounded-lg p-4 border border-emerald-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <i className="fas fa-tasks text-emerald-600"></i>
                      </div>
                      <div>
                        <div className="text-sm text-emerald-600">
                          Total Tasks
                        </div>
                        <div className="text-2xl font-bold text-emerald-900">
                          {rewards.completedTasks || 0}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-emerald-600">
                      {rewards.dailyProgress?.tasks || 0} completed today
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-lg p-4 border border-emerald-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <i className="fas fa-clipboard-list text-emerald-600"></i>
                      </div>
                      <div>
                        <div className="text-sm text-emerald-600">
                          Total Entries
                        </div>
                        <div className="text-2xl font-bold text-emerald-900">
                          {rewards.completedTrackers || 0}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-emerald-600">
                      {rewards.dailyProgress?.trackers || 0} entries today
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-lg p-4 border border-emerald-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <i className="fas fa-award text-emerald-600"></i>
                      </div>
                      <div>
                        <div className="text-sm text-emerald-600">
                          Perfect Weeks
                        </div>
                        <div className="text-2xl font-bold text-emerald-900">
                          {rewards.perfectWeeks || 0}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-emerald-600">
                      {rewards.monthlyGoals || 0} monthly goals achieved
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Daily Progress */}
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 border border-indigo-100">
                  <h3 className="text-base font-semibold text-indigo-900 mb-3">
                    Today's Progress
                  </h3>
                  <div className="space-y-2">
                    <div className="bg-white/50 rounded-lg p-2 border border-indigo-100">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-indigo-700">
                          Points Earned
                        </span>
                        <span className="font-bold text-indigo-900">
                          {rewards?.dailyProgress?.points || 0} / 100
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-indigo-700">
                          Tasks Completed
                        </span>
                        <span className="font-bold text-indigo-900">
                          {rewards?.dailyProgress?.tasks || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-indigo-700">
                          Tracker Entries
                        </span>
                        <span className="font-bold text-indigo-900">
                          {rewards?.dailyProgress?.trackers || 0}
                        </span>
                      </div>
                    </div>
                    <div className="bg-white/50 rounded-lg p-2 border border-indigo-100">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-indigo-700">
                          Daily Progress
                        </span>
                        <span className="font-bold text-indigo-900">
                          {Math.min(
                            Math.round(
                              ((rewards?.dailyProgress?.points || 0) / 100) *
                                100
                            ),
                            100
                          )}
                          %
                        </span>
                      </div>
                      <div className="h-2 bg-indigo-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 transition-all duration-500"
                          style={{
                            width: `${Math.min(
                              ((rewards?.dailyProgress?.points || 0) / 100) *
                                100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                      <div className="text-xs text-indigo-600 mt-1 text-right">
                        {rewards?.dailyProgress?.points || 0} / 100 points
                      </div>
                    </div>
                  </div>
                </div>

                {/* Weekly Progress */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-100">
                  <h3 className="text-base font-semibold text-purple-900 mb-3">
                    Weekly Progress
                  </h3>
                  <div className="space-y-2">
                    <div className="bg-white/50 rounded-lg p-2 border border-purple-100">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-purple-700">
                          Points Earned
                        </span>
                        <span className="font-bold text-purple-900">
                          {rewards?.weeklyProgress?.points || 0} / 700
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-purple-700">
                          Tasks Completed
                        </span>
                        <span className="font-bold text-purple-900">
                          {rewards?.weeklyProgress?.tasks || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-purple-700">
                          Tracker Entries
                        </span>
                        <span className="font-bold text-purple-900">
                          {rewards?.weeklyProgress?.trackers || 0}
                        </span>
                      </div>
                    </div>
                    <div className="bg-white/50 rounded-lg p-2 border border-purple-100">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-purple-700">
                          Weekly Progress
                        </span>
                        <span className="font-bold text-purple-900">
                          {Math.min(
                            Math.round(
                              ((rewards?.weeklyProgress?.points || 0) / 700) *
                                100
                            ),
                            100
                          )}
                          %
                        </span>
                      </div>
                      <div className="h-2 bg-purple-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-600 transition-all duration-500"
                          style={{
                            width: `${Math.min(
                              ((rewards?.weeklyProgress?.points || 0) / 700) *
                                100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                      <div className="text-xs text-purple-600 mt-1 text-right">
                        {rewards?.weeklyProgress?.points || 0} / 700 points
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-100">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Progress Charts
                  </h2>
                  <p className="text-sm text-gray-500">
                    Visualize your progress over time
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <select
                    className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                    onChange={(e) => setTimeFilter(e.target.value)}
                    value={timeFilter}
                  >
                    <option value="week">Last 7 Days</option>
                    <option value="month">Last 30 Days</option>
                  </select>

                  <select
                    className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                    onChange={(e) => setChartType(e.target.value)}
                    value={chartType}
                  >
                    <option value="line">Line</option>
                    <option value="bar">Bar</option>
                    <option value="pie">Pie</option>
                  </select>
                </div>
              </div>

              <div className="p-6 rounded-xl mb-4 relative">
                <div className="h-80">
                  {chartType === "pie" && (
                    <Pie data={pieData} options={pieOptions} />
                  )}
                  {chartType === "line" && (
                    <Line data={lineData} options={lineOptions} />
                  )}
                  {chartType === "bar" && (
                    <Bar data={barData} options={barOptions} />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Side Panels */}
          <div className="space-y-6">
            {/* Quick Stats Panel */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-4 border border-indigo-100">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <i className="fas fa-chart-bar text-indigo-500"></i>
                Quick Stats
              </h2>
              <div className="space-y-3">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <i className="fas fa-clock text-blue-600"></i>
                    </div>
                    <div>
                      <div className="text-xs text-blue-600">Time Period</div>
                      <div className="text-base font-bold text-blue-900">
                        {timeFilter === "week" ? "Last 7 Days" : "Last 30 Days"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 border border-purple-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <i className="fas fa-chart-bar text-purple-600"></i>
                    </div>
                    <div>
                      <div className="text-xs text-purple-600">Chart Type</div>
                      <div className="text-base font-bold text-purple-900 capitalize">
                        {chartType}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Insights Panel */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="fas fa-lightbulb text-indigo-500"></i>
                Insights
              </h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                      <i className="fas fa-chart-line text-amber-600"></i>
                    </div>
                    <div className="text-sm font-medium text-amber-600">
                      Trend Analysis
                    </div>
                  </div>
                  <p className="text-sm text-amber-700">
                    {rewards.dailyProgress?.points > 0
                      ? `Your average daily progress is ${Math.round(
                          rewards.dailyProgress.points / 7
                        )} points`
                      : "Start tracking to see your trends"}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4 border border-pink-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                      <i className="fas fa-bullseye text-pink-600"></i>
                    </div>
                    <div className="text-sm font-medium text-pink-600">
                      Goal Status
                    </div>
                  </div>
                  <p className="text-sm text-pink-700">
                    {rewards.dailyProgress?.points > 0
                      ? `You're ${Math.round(
                          (rewards.dailyProgress.points / 100) * 100
                        )}% towards your daily goal`
                      : "Set goals to track your progress"}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 border border-indigo-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <i className="fas fa-star text-indigo-600"></i>
                    </div>
                    <div className="text-sm font-medium text-indigo-600">
                      Best Performance
                    </div>
                  </div>
                  <p className="text-sm text-indigo-700">
                    {rewards.dailyProgress?.points > 0
                      ? `Your best day was ${rewards.dailyProgress.points} points`
                      : "Keep tracking to see your best performance"}
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="fas fa-history text-indigo-500"></i>
                Recent Activity
              </h2>
              <div className="space-y-4">
                {rewards.history &&
                  rewards.history
                    .slice(-5)
                    .reverse()
                    .map((activity, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                          <i
                            className={`fas ${
                              activity.type === "task"
                                ? "fa-check-circle text-indigo-600"
                                : "fa-star text-yellow-500"
                            }`}
                          ></i>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">
                            {activity.type === "task"
                              ? "Task Completed"
                              : "Tracker Entry"}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {new Date(activity.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">
                            +{activity.points}
                          </div>
                          <div className="text-sm text-gray-600">points</div>
                        </div>
                      </motion.div>
                    ))}
              </div>

              {/* Store Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/store")}
                className="w-full mt-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <i className="fas fa-store text-lg"></i>
                Visit Reward Store
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
