// Dashboard.jsx
import React, { useState, useMemo, useEffect } from "react";
import { Tracker } from "../components/Tracker";
import { NewTracker } from "../components/NewTracker";
import { useTrackers } from "../data/useTrackers";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import ChatButton from "../components/ChatButton";

export const Dashboard = () => {
  const { trackers, addTracker } = useTrackers();
  const [activeTab, setActiveTab] = useState("all");
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showReminders, setShowReminders] = useState(false);
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [showDetailedStats, setShowDetailedStats] = useState(false);
  const [showGoalAdjustment, setShowGoalAdjustment] = useState(false);
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [showMeditationModal, setShowMeditationModal] = useState(false);
  const [showJournalModal, setShowJournalModal] = useState(false);
  const [showWellnessModal, setShowWellnessModal] = useState(false);
  const [selectedTracker, setSelectedTracker] = useState(null);
  const navigate = useNavigate();

  // Calculate overall statistics
  const stats = useMemo(
    () => ({
      totalTrackers: trackers.length,
      activeTrackers: trackers.filter((t) => t.currentProgress > 0).length,
      totalProgress: trackers.reduce(
        (sum, t) => sum + Number(t.currentProgress),
        0
      ),
      completionRate:
        trackers.reduce((sum, t) => {
          const goal = Number(t.totalGoal);
          return (
            sum + (goal > 0 ? (Number(t.currentProgress) / goal) * 100 : 0)
          );
        }, 0) / (trackers.length || 1),
    }),
    [trackers]
  );

  // Calculate category distribution
  const categoryDistribution = useMemo(() => {
    const distribution = trackers.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(distribution).sort((a, b) => b[1] - a[1]);
  }, [trackers]);

  // Find most active category
  const mostActiveCategory = useMemo(() => {
    if (categoryDistribution.length === 0) return "None";
    return categoryDistribution[0][0];
  }, [categoryDistribution]);

  // Find best performing tracker
  const bestPerformingTracker = useMemo(() => {
    if (trackers.length === 0) return { title: "None" };

    return trackers.reduce(
      (best, current) => {
        const currentProgress =
          Number(current.currentProgress) / Number(current.totalGoal);
        const bestProgress =
          Number(best.currentProgress) / Number(best.totalGoal);
        return currentProgress > bestProgress ? current : best;
      },
      { currentProgress: 0, totalGoal: 1 }
    );
  }, [trackers]);

  // Filter trackers based on active tab
  const filteredTrackers = useMemo(() => {
    return trackers.filter((tracker) => {
      if (activeTab === "all") return true;
      if (activeTab === "active") return tracker.currentProgress > 0;
      if (activeTab === "completed")
        return Number(tracker.currentProgress) >= Number(tracker.totalGoal);
      return tracker.category === activeTab;
    });
  }, [trackers, activeTab]);

  // Quick Action Handlers
  const handleAddTracker = () => {
    navigate("/new-tracker");
  };

  const handleViewAnalytics = () => {
    setShowAnalytics(true);
  };

  const handleSetReminders = () => {
    setShowReminders(true);
  };

  const handleViewDetailedStats = () => {
    setShowDetailedStats(true);
  };

  const handleAdjustGoals = () => {
    setShowGoalAdjustment(true);
  };

  const handleTrackerSelect = (tracker) => {
    setSelectedTracker(tracker);
  };

  // Reminder handlers
  const handleReminderSubmit = (trackerId, frequency) => {
    // Here you would typically make an API call to set the reminder
    console.log(`Setting ${frequency} reminder for tracker ${trackerId}`);
    // Close the modal after setting reminder
    setShowReminders(false);
  };

  // Goal adjustment handlers
  const handleGoalUpdate = (trackerId, newGoal) => {
    // Here you would typically make an API call to update the goal
    console.log(`Updating goal for tracker ${trackerId} to ${newGoal}`);
    // Close the modal after updating goal
    setShowGoalAdjustment(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-6 border border-indigo-100">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="min-w-0">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent truncate">
                Dashboard
              </h1>
              <p className="text-gray-600 mt-1 line-clamp-2">
                Track your progress and manage your goals
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="text-center p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-chart-line text-indigo-600 text-lg"></i>
                </div>
                <div className="min-w-0">
                  <div className="text-2xl font-bold text-indigo-600 truncate">
                    {stats.totalTrackers}
                  </div>
                  <div className="text-xs font-medium text-indigo-500 truncate">
                    Total Trackers
                  </div>
                </div>
              </div>
              <div className="text-center p-3 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-check-circle text-purple-600 text-lg"></i>
                </div>
                <div className="min-w-0">
                  <div className="text-2xl font-bold text-purple-600 truncate">
                    {stats.activeTrackers}
                  </div>
                  <div className="text-xs font-medium text-purple-500 truncate">
                    Active Trackers
                  </div>
                </div>
              </div>
              <div className="text-center p-3 rounded-xl bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-percentage text-pink-600 text-lg"></i>
                </div>
                <div className="min-w-0">
                  <div className="text-2xl font-bold text-pink-600 truncate">
                    {Math.round(stats.completionRate)}%
                  </div>
                  <div className="text-xs font-medium text-pink-500 truncate">
                    Completion Rate
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Trackers */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tracker Controls */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-100">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeTab === "all"
                        ? "bg-indigo-600 text-white"
                        : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveTab("active")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeTab === "active"
                        ? "bg-indigo-600 text-white"
                        : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                    }`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setActiveTab("completed")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeTab === "completed"
                        ? "bg-indigo-600 text-white"
                        : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                    }`}
                  >
                    Completed
                  </button>
                </div>
                <button
                  onClick={handleAddTracker}
                  className="px-4 py-2 bg-white text-indigo-600 rounded-lg border-2 border-indigo-500 hover:bg-indigo-500 hover:text-white transition-all duration-300 flex items-center gap-2"
                >
                  <i className="fas fa-plus"></i>
                  Add Tracker
                </button>
              </div>

              {/* Trackers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTrackers.map((tracker) => (
                  <motion.div
                    key={tracker.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Tracker
                      id={tracker.id}
                      title={tracker.title}
                      currentProgress={tracker.currentProgress}
                      totalGoal={tracker.totalGoal}
                      unit={tracker.unit}
                      category={tracker.category}
                      imgName={tracker.imgName}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* AI Insights Section */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="fas fa-brain text-indigo-500"></i>
                AI Insights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 border border-indigo-100">
                  <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                    Best Performing
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <i className="fas fa-trophy text-indigo-600"></i>
                    </div>
                    <div>
                      <p className="font-medium text-indigo-900">
                        {bestPerformingTracker.title}
                      </p>
                      <p className="text-sm text-indigo-600">
                        {Math.round(
                          (Number(bestPerformingTracker.currentProgress) /
                            Number(bestPerformingTracker.totalGoal)) *
                            100
                        )}
                        % complete
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-100">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">
                    Most Active Category
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <i className="fas fa-fire text-purple-600"></i>
                    </div>
                    <div>
                      <p className="font-medium text-purple-900">
                        {mostActiveCategory}
                      </p>
                      <p className="text-sm text-purple-600">
                        {categoryDistribution.find(
                          (cat) => cat[0] === mostActiveCategory
                        )?.[1] || 0}{" "}
                        trackers
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Trends Section */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="fas fa-chart-line text-indigo-500"></i>
                Progress Trends
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-100">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">
                    Weekly Progress
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <i className="fas fa-calendar-week text-green-600"></i>
                    </div>
                    <div>
                      <p className="font-medium text-green-900">
                        {Math.round(stats.completionRate * 1.2)}%
                      </p>
                      <p className="text-sm text-green-600">vs last week</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-100">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    Monthly Goal
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <i className="fas fa-calendar-alt text-blue-600"></i>
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">
                        {Math.round(stats.completionRate * 0.8)}%
                      </p>
                      <p className="text-sm text-blue-600">of monthly target</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Statistics and Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="fas fa-bolt text-indigo-500"></i>
                Quick Actions
              </h2>
              <div className="space-y-4">
                <button
                  onClick={() => navigate("/tasks")}
                  className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500/15 to-purple-500/20 text-indigo-700 rounded-xl hover:from-indigo-500/20 hover:to-purple-500/25 transition-all duration-300 flex items-center justify-between group"
                >
                  <span className="flex items-center gap-2">
                    <i className="fas fa-tasks text-indigo-500 group-hover:scale-110 transition-transform"></i>
                    <span>Create New Task</span>
                  </span>
                  <i className="fas fa-chevron-right group-hover:translate-x-1 transition-transform"></i>
                </button>
                <button
                  onClick={() => navigate("/rewards")}
                  className="w-full px-4 py-3 bg-gradient-to-r from-purple-500/15 to-pink-500/20 text-indigo-700 rounded-xl hover:from-purple-500/20 hover:to-pink-500/25 transition-all duration-300 flex items-center justify-between group"
                >
                  <span className="flex items-center gap-2">
                    <i className="fas fa-gift text-purple-500 group-hover:scale-110 transition-transform"></i>
                    <span>View Rewards</span>
                  </span>
                  <i className="fas fa-chevron-right group-hover:translate-x-1 transition-transform"></i>
                </button>
                <button
                  onClick={() =>
                    navigate("/wellness", {
                      state: { showJournalModal: true },
                    })
                  }
                  className="w-full px-4 py-3 bg-gradient-to-r from-pink-500/15 to-orange-500/20 text-indigo-700 rounded-xl hover:from-pink-500/20 hover:to-orange-500/25 transition-all duration-300 flex items-center justify-between group"
                >
                  <span className="flex items-center gap-2">
                    <i className="fas fa-book text-pink-500 group-hover:scale-110 transition-transform"></i>
                    <span>Journal Today</span>
                  </span>
                  <i className="fas fa-chevron-right group-hover:translate-x-1 transition-transform"></i>
                </button>
                <button
                  onClick={() =>
                    navigate("/wellness", {
                      state: { showMeditationModal: true },
                    })
                  }
                  className="w-full px-4 py-3 bg-gradient-to-r from-orange-500/15 to-yellow-500/20 text-indigo-700 rounded-xl hover:from-orange-500/20 hover:to-yellow-500/25 transition-all duration-300 flex items-center justify-between group"
                >
                  <span className="flex items-center gap-2">
                    <i className="fas fa-spa text-orange-500 group-hover:scale-110 transition-transform"></i>
                    <span>Start Meditation</span>
                  </span>
                  <i className="fas fa-chevron-right group-hover:translate-x-1 transition-transform"></i>
                </button>
                <button
                  onClick={handleViewAnalytics}
                  className="w-full px-4 py-3 bg-gradient-to-r from-yellow-500/15 to-green-500/20 text-indigo-700 rounded-xl hover:from-yellow-500/20 hover:to-green-500/25 transition-all duration-300 flex items-center justify-between group"
                >
                  <span className="flex items-center gap-2">
                    <i className="fas fa-chart-line text-yellow-500 group-hover:scale-110 transition-transform"></i>
                    <span>View Progress</span>
                  </span>
                  <i className="fas fa-chevron-right group-hover:translate-x-1 transition-transform"></i>
                </button>
              </div>
            </div>

            {/* Category Distribution */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="fas fa-chart-pie text-indigo-500"></i>
                Category Distribution
              </h2>
              <div className="space-y-4">
                {categoryDistribution.map(([category, count], index) => (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">{category}</span>
                      <span className="font-bold text-indigo-600">
                        {Math.round((count / stats.totalTrackers) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(count / stats.totalTrackers) * 100}%`,
                        }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ChatButton />
      <Footer />
    </div>
  );
};

export default Dashboard;
