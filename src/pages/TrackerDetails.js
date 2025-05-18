import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { EntryHistory } from "../components/EntryHistory";
import AnalyticsDashboard from "../components/AnalyticsDashboard";
import { useTrackers } from "../data/useTrackers";
import toast from "react-hot-toast";
import Footer from "../components/Footer";

export const TrackerDetails = () => {
  const { state } = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const { trackers, updateTracker, deleteTracker } = useTrackers();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showInsights, setShowInsights] = useState(false);

  // Find the current tracker from the trackers array
  const currentTracker = trackers.find(
    (tracker) => tracker.id === parseInt(params.id)
  ) || {
    id: 0,
    title: "Empty",
    description: "Empty",
    startDate: "Empty",
    endDate: "Empty",
    dailyGoal: "Empty",
    weeklyGoal: "Empty",
    monthlyGoal: "Empty",
    totalGoal: "Empty",
    currentProgress: 0,
    imgName: "chart-line",
    category: "Empty",
    unit: "Empty",
    entries: [],
  };

  const [newEntry, setNewEntry] = useState({
    amount: "",
    date: "",
    details: "",
  });

  const [entryHistory, setEntryHistory] = useState([]);

  const {
    id,
    title,
    description,
    startDate,
    endDate,
    dailyGoal,
    weeklyGoal,
    monthlyGoal,
    totalGoal,
    currentProgress,
    imgName,
    category,
    unit,
  } = currentTracker;

  // Initialize entryHistory with current tracker's entries
  useEffect(() => {
    if (currentTracker.entries) {
      setEntryHistory(currentTracker.entries);
    }
  }, [currentTracker.entries]);

  const numericDailyGoal = Number(dailyGoal);
  const numericWeeklyGoal = Number(weeklyGoal);
  const numericMonthlyGoal = Number(monthlyGoal);
  const numericCurrentProgress = Number(currentProgress);
  const numericTotalGoal = Number(totalGoal);

  const completionPercentage =
    numericTotalGoal > 0
      ? Math.min(100, (numericCurrentProgress / numericTotalGoal) * 100)
      : 0;

  // AI Insights state
  const [aiInsights, setAiInsights] = useState({
    recommendations: [],
    patterns: {
      bestDays: [],
      worstDays: [],
      optimalTime: "",
      consistencyScore: 0,
    },
    predictions: {
      completionDate: "",
      successProbability: "0%",
      potentialChallenges: [],
    },
  });

  // Add this useEffect to update insights when entries or goals change
  useEffect(() => {
    const insights = calculateInsights(currentTracker.entries, {
      weeklyGoal: numericWeeklyGoal,
      monthlyGoal: numericMonthlyGoal,
    });
    setAiInsights(insights);
  }, [currentTracker.entries, numericWeeklyGoal, numericMonthlyGoal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const entry = {
      id: Date.now(),
      date: newEntry.date || new Date().toISOString().split("T")[0],
      details: newEntry.details,
      amount: Number(newEntry.amount),
      daysAgo: 0,
    };

    // Update the tracker's current progress and entries
    const newProgress = numericCurrentProgress + Number(newEntry.amount);
    const updatedEntries = [...currentTracker.entries, entry];

    updateTracker(id, {
      currentProgress: newProgress,
      entries: updatedEntries,
    });

    setEntryHistory(updatedEntries);
    setNewEntry({ amount: "", date: "", details: "" });
    toast.success("Entry added successfully");

    // Add points to rewards system
    if (Number(newEntry.amount) > 0) {
      // Get current rewards
      const currentRewards = JSON.parse(
        localStorage.getItem("rewards") || "{}"
      );

      // Calculate points to add (respecting daily limit)
      const newPoints = Math.min(
        15,
        (currentRewards.dailyPointsLimit || 100) -
          (currentRewards.dailyPoints || 0)
      );

      if (newPoints <= 0) {
        toast.info("Daily points limit reached!");
        return;
      }

      // Update rewards
      const updatedRewards = {
        ...currentRewards,
        points: (currentRewards.points || 0) + newPoints,
        dailyPoints: (currentRewards.dailyPoints || 0) + newPoints,
        completedTrackers: (currentRewards.completedTrackers || 0) + 1,
        dailyProgress: {
          ...currentRewards.dailyProgress,
          trackers: (currentRewards.dailyProgress?.trackers || 0) + 1,
          points: (currentRewards.dailyProgress?.points || 0) + newPoints,
        },
        weeklyProgress: {
          ...currentRewards.weeklyProgress,
          trackers: (currentRewards.weeklyProgress?.trackers || 0) + 1,
          points: (currentRewards.weeklyProgress?.points || 0) + newPoints,
        },
        monthlyProgress: {
          ...currentRewards.monthlyProgress,
          trackers: (currentRewards.monthlyProgress?.trackers || 0) + 1,
          points: (currentRewards.monthlyProgress?.points || 0) + newPoints,
        },
        history: [
          ...(currentRewards.history || []),
          {
            type: "tracker",
            points: newPoints,
            date: new Date().toISOString(),
          },
        ],
      };

      // Save updated rewards
      localStorage.setItem("rewards", JSON.stringify(updatedRewards));
      toast.success(`Entry added! +${newPoints} points`);
    }
  };

  // Calculate statistics from entry history
  const stats = React.useMemo(() => {
    if (!entryHistory.length) {
      return {
        total: "Empty",
        average: "Empty",
        peak: "Empty",
      };
    }

    const total = entryHistory.reduce((sum, entry) => sum + entry.amount, 0);
    const average = total / entryHistory.length;
    const peak = Math.max(...entryHistory.map((entry) => entry.amount));

    return {
      total: total.toLocaleString(),
      average,
      peak: peak.toLocaleString(),
    };
  }, [entryHistory]);

  const handleDelete = async () => {
    try {
      await deleteTracker(id);
      toast.success("Tracker deleted successfully");
      // Force a hard navigation to ensure the page updates
      window.location.href = "/dashboard";
    } catch (error) {
      toast.error("Failed to delete tracker");
    }
  };

  const calculateInsights = (entries, goals) => {
    if (!entries || entries.length === 0) {
      return {
        averageValue: 0,
        highestValue: 0,
        lowestValue: 0,
        totalEntries: 0,
        completionRate: 0,
        trend: "neutral",
        recommendations: [],
        insights: "No entries available for analysis",
      };
    }

    try {
      // Calculate basic statistics
      const values = entries.map((e) => Number(e.amount));
      const averageValue =
        values.reduce((sum, val) => sum + val, 0) / values.length;
      const highestValue = Math.max(...values);
      const lowestValue = Math.min(...values);
      const totalEntries = entries.length;

      // Calculate completion rate
      const completionRate =
        (entries.filter((e) => e.amount > 0).length / totalEntries) * 100;

      // Calculate trend
      const trend = calculateTrend(values);

      // Generate recommendations based on data
      const recommendations = [];
      if (completionRate < 50) {
        recommendations.push(
          "Consider setting reminders to help maintain consistency"
        );
      }
      if (trend === "decreasing") {
        recommendations.push(
          "Your progress is decreasing. Try to identify and address any obstacles"
        );
      }
      if (averageValue < goals.dailyGoal * 0.5) {
        recommendations.push(
          "You're consistently below 50% of your daily goal. Consider adjusting your target"
        );
      }

      // Generate insights based on the data
      const insights = [];

      // Add insights about consistency
      if (completionRate >= 80) {
        insights.push(
          "You're maintaining excellent consistency in your tracking!"
        );
      } else if (completionRate >= 60) {
        insights.push(
          "You're doing well with consistency, but there's room for improvement."
        );
      } else {
        insights.push(
          "Consider focusing on maintaining more consistent tracking habits."
        );
      }

      // Add insights about progress
      if (trend > 0) {
        insights.push(
          "Your progress is trending upward - keep up the great work!"
        );
      } else if (trend < 0) {
        insights.push(
          "Your progress has been decreasing recently. Consider reviewing your approach."
        );
      } else {
        insights.push(
          "Your progress has been stable. Consider setting new challenges to maintain motivation."
        );
      }

      // Add insights about goal achievement
      if (averageValue >= goals.dailyGoal) {
        insights.push(
          "You're consistently meeting or exceeding your daily goals!"
        );
      } else if (averageValue >= goals.dailyGoal * 0.7) {
        insights.push(
          "You're close to meeting your daily goals. A little more effort could get you there!"
        );
      } else {
        insights.push(
          "You're currently below your daily goal targets. Consider adjusting your goals or strategy."
        );
      }

      return {
        averageValue,
        highestValue,
        lowestValue,
        totalEntries,
        completionRate,
        trend,
        recommendations,
        insights: insights.join(" "),
      };
    } catch (error) {
      console.error("Error calculating insights:", error);
      return {
        averageValue: 0,
        highestValue: 0,
        lowestValue: 0,
        totalEntries: 0,
        completionRate: 0,
        trend: "neutral",
        recommendations: [],
        insights: "Error calculating insights",
      };
    }
  };

  // Helper function to calculate trend
  const calculateTrend = (values) => {
    if (values.length < 2) return 0;
    const n = values.length;
    const sumX = (n * (n - 1)) / 2;
    const sumY = values.reduce((a, b) => a + b, 0);
    const sumXY = values.reduce((sum, val, i) => sum + val * i, 0);
    const sumX2 = values.reduce((sum, _, i) => sum + i * i, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    return slope;
  };

  // Helper function to get week number
  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-6 border border-indigo-100">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600">
                <i className={`fas fa-${imgName} text-2xl`}></i>
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent truncate">
                  {title || "Empty"}
                </h1>
                <p className="text-gray-600 mt-1 line-clamp-2">
                  {description || "Empty"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-chart-line text-indigo-600 text-lg"></i>
                </div>
                <div className="min-w-0">
                  <div className="text-2xl font-bold text-indigo-600 truncate">
                    {completionPercentage.toFixed(1)}%
                  </div>
                  <div className="text-xs font-medium text-indigo-500 truncate">
                    Completion
                  </div>
                </div>
              </div>
              <div className="text-center p-3 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-fire text-purple-600 text-lg"></i>
                </div>
                <div className="min-w-0">
                  <div className="text-2xl font-bold text-purple-600 truncate">
                    {stats.total}
                  </div>
                  <div className="text-xs font-medium text-purple-500 truncate">
                    Total {unit}
                  </div>
                </div>
              </div>
              <div className="text-center p-3 rounded-xl bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-bolt text-pink-600 text-lg"></i>
                </div>
                <div className="min-w-0">
                  <div className="text-2xl font-bold text-pink-600 truncate">
                    {stats.average}
                  </div>
                  <div className="text-xs font-medium text-pink-500 truncate">
                    Avg/Day
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Tracker Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tracker Overview Card */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-100">
              <div className="space-y-6">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Progress
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {numericCurrentProgress.toLocaleString()} /{" "}
                      {numericTotalGoal.toLocaleString()} {unit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full"
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Goals Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 border border-indigo-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <i className="fas fa-calendar-day text-indigo-600"></i>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-indigo-600">
                          Daily Goal
                        </div>
                        <div className="text-lg font-bold text-indigo-900">
                          {numericDailyGoal.toLocaleString()} {unit}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <i className="fas fa-calendar-week text-purple-600"></i>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-purple-600">
                          Weekly Goal
                        </div>
                        <div className="text-lg font-bold text-purple-900">
                          {numericWeeklyGoal.toLocaleString()} {unit}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4 border border-pink-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                        <i className="fas fa-calendar-alt text-pink-600"></i>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-pink-600">
                          Monthly Goal
                        </div>
                        <div className="text-lg font-bold text-pink-900">
                          {numericMonthlyGoal.toLocaleString()} {unit}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <i className="fas fa-bullseye text-blue-600"></i>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-blue-600">
                          Total Goal
                        </div>
                        <div className="text-lg font-bold text-blue-900">
                          {numericTotalGoal.toLocaleString()} {unit}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Statistics Section */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <i className="fas fa-chart-bar text-green-600"></i>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-green-600">
                          Total {unit}
                        </div>
                        <div className="text-lg font-bold text-green-900">
                          {stats.total} {unit}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <i className="fas fa-calculator text-blue-600"></i>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-blue-600">
                          Average/Day
                        </div>
                        <div className="text-lg font-bold text-blue-900">
                          {stats.average} {unit}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <i className="fas fa-arrow-up text-purple-600"></i>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-purple-600">
                          Peak Day
                        </div>
                        <div className="text-lg font-bold text-purple-900">
                          {stats.peak} {unit}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* New Entry Form */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-4 border border-indigo-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-green-100 to-green-200 text-green-600">
                  <i className="fas fa-plus text-base"></i>
                </div>
                <h2 className="text-lg font-bold text-gray-900">
                  Add New Progress
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Amount and Date Inputs in 2-column layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Amount Input */}
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4 border border-indigo-100">
                    <label className="block text-sm font-medium text-indigo-600 mb-2">
                      How much did you achieve today?
                    </label>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative flex-1">
                        <input
                          type="number"
                          name="amount"
                          value={newEntry.amount}
                          onChange={handleInputChange}
                          placeholder="Enter amount..."
                          required
                          min="0"
                          step="0.01"
                          className="w-full px-3 py-2 bg-white border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 text-base font-medium"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400">
                          {unit}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <button
                          type="button"
                          onClick={() =>
                            setNewEntry((prev) => ({
                              ...prev,
                              amount: numericDailyGoal,
                            }))
                          }
                          className="w-full px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors duration-200 text-sm font-medium"
                        >
                          Daily Goal ({numericDailyGoal})
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setNewEntry((prev) => ({
                              ...prev,
                              amount: numericDailyGoal / 2,
                            }))
                          }
                          className="w-full px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors duration-200 text-sm font-medium"
                        >
                          Half Goal ({numericDailyGoal / 2})
                        </button>
                      </div>
                      <div className="space-y-2">
                        <button
                          type="button"
                          onClick={() =>
                            setNewEntry((prev) => ({
                              ...prev,
                              amount: numericDailyGoal * 2,
                            }))
                          }
                          className="w-full px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors duration-200 text-sm font-medium"
                        >
                          Double Goal ({numericDailyGoal * 2})
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setNewEntry((prev) => ({
                              ...prev,
                              amount: numericWeeklyGoal / 7,
                            }))
                          }
                          className="w-full px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors duration-200 text-sm font-medium"
                        >
                          Weekly Avg ({Math.round(numericWeeklyGoal / 7)})
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Date Input */}
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-100">
                    <label className="block text-sm font-medium text-purple-600 mb-2">
                      When did you achieve this?
                    </label>
                    <div className="flex items-center gap-3 mb-3">
                      <input
                        type="date"
                        name="date"
                        value={newEntry.date}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-500 text-base font-medium"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <button
                          type="button"
                          onClick={() =>
                            setNewEntry((prev) => ({
                              ...prev,
                              date: new Date().toISOString().split("T")[0],
                            }))
                          }
                          className="w-full px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors duration-200 text-sm font-medium"
                        >
                          Today
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const yesterday = new Date();
                            yesterday.setDate(yesterday.getDate() - 1);
                            setNewEntry((prev) => ({
                              ...prev,
                              date: yesterday.toISOString().split("T")[0],
                            }));
                          }}
                          className="w-full px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors duration-200 text-sm font-medium"
                        >
                          Yesterday
                        </button>
                      </div>
                      <div className="space-y-2">
                        <button
                          type="button"
                          onClick={() => {
                            const lastWeek = new Date();
                            lastWeek.setDate(lastWeek.getDate() - 7);
                            setNewEntry((prev) => ({
                              ...prev,
                              date: lastWeek.toISOString().split("T")[0],
                            }));
                          }}
                          className="w-full px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors duration-200 text-sm font-medium"
                        >
                          Last Week
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const lastMonth = new Date();
                            lastMonth.setMonth(lastMonth.getMonth() - 1);
                            setNewEntry((prev) => ({
                              ...prev,
                              date: lastMonth.toISOString().split("T")[0],
                            }));
                          }}
                          className="w-full px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors duration-200 text-sm font-medium"
                        >
                          Last Month
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details Input with Emoji Picker */}
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-4 border border-pink-100">
                  <label className="block text-sm font-medium text-pink-600 mb-2">
                    How was your progress? (Optional)
                  </label>
                  <textarea
                    name="details"
                    value={newEntry.details}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="Share your thoughts, challenges, or achievements..."
                    className="w-full px-3 py-2 bg-white border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-500 text-base font-medium resize-none"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() =>
                        setNewEntry((prev) => ({
                          ...prev,
                          details: prev.details + " 🎉",
                        }))
                      }
                      className="px-3 py-1.5 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors duration-200 text-sm font-medium"
                    >
                      Add Celebration 🎉
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setNewEntry((prev) => ({
                          ...prev,
                          details: prev.details + " 💪",
                        }))
                      }
                      className="px-3 py-1.5 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors duration-200 text-sm font-medium"
                    >
                      Add Strength 💪
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setNewEntry((prev) => ({
                          ...prev,
                          details: prev.details + " ⭐",
                        }))
                      }
                      className="px-3 py-1.5 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors duration-200 text-sm font-medium"
                    >
                      Add Star ⭐
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full h-10 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl font-medium text-base"
                >
                  <i className="fas fa-plus"></i>
                  Add Progress Entry
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Analytics and Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="fas fa-bolt text-indigo-500"></i>
                Quick Actions
              </h2>
              <div className="space-y-4">
                <button
                  onClick={() =>
                    navigate(`/edit-tracker/${id}`, { state: currentTracker })
                  }
                  className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500/15 to-purple-500/20 text-indigo-700 rounded-xl hover:from-indigo-500/20 hover:to-purple-500/25 transition-all duration-300 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <i className="fas fa-edit"></i>
                    Edit Tracker
                  </span>
                  <i className="fas fa-chevron-right"></i>
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full px-4 py-3 bg-gradient-to-r from-red-500/15 to-pink-500/20 text-red-700 rounded-xl hover:from-red-500/20 hover:to-pink-500/25 transition-all duration-300 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <i className="fas fa-trash"></i>
                    Delete Tracker
                  </span>
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>

            {/* Tracker Info */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="fas fa-info-circle text-indigo-500"></i>
                Tracker Info
              </h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 border border-indigo-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <i className="fas fa-calendar text-indigo-600"></i>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-indigo-600">
                        Start Date
                      </div>
                      <div className="text-sm font-semibold text-indigo-900">
                        {startDate}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <i className="fas fa-calendar-check text-purple-600"></i>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-purple-600">
                        End Date
                      </div>
                      <div className="text-sm font-semibold text-purple-900">
                        {endDate}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4 border border-pink-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                      <i className="fas fa-tag text-pink-600"></i>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-pink-600">
                        Category
                      </div>
                      <div className="text-sm font-semibold text-pink-900">
                        {category}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <i className="fas fa-ruler text-blue-600"></i>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-blue-600">
                        Unit
                      </div>
                      <div className="text-sm font-semibold text-blue-900">
                        {unit}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Dashboard */}
        <div className="mt-6">
          <AnalyticsDashboard
            title={title || "Empty"}
            unitName={unit || "Empty"}
            unitPlural={unit || "Empty"}
            icon={imgName}
            showGoals={true}
            weeklyGoal={
              numericWeeklyGoal === "Empty" ? null : numericWeeklyGoal
            }
            monthlyGoal={
              numericMonthlyGoal === "Empty" ? null : numericMonthlyGoal
            }
            entries={currentTracker.entries}
            trackerId={id}
          />
        </div>

        {/* Entry History */}
        <div className="mt-6">
          <EntryHistory
            entries={currentTracker.entries || []}
            onAddEntry={handleSubmit}
            onDeleteEntry={handleDelete}
            onEditEntry={handleInputChange}
          />
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-red-100 text-red-600">
                <i className="fas fa-exclamation-triangle text-lg"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Delete Tracker
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this tracker? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};
