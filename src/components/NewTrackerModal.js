import React, { useState, useEffect } from "react";
import { useTrackers } from "../data/useTrackers";
import IconDropdown from "./IconDropdown";
import CategoryDropdown from "./CategoryDropdown";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export const NewTrackerModal = () => {
  const { trackers, updateTracker } = useTrackers();
  const { addTracker } = useTrackers();
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const isEditing = !!id;

  const closeModal = () => {
    navigate(-1);
  };

  const [title, setTitle] = React.useState(state?.title || "");
  const [description, setDescription] = React.useState(
    state?.description || ""
  );
  const [startDate, setStartDate] = React.useState(state?.startDate || "");
  const [endDate, setEndDate] = React.useState(state?.endDate || "");
  const [dailyGoal, setDailyGoal] = React.useState(state?.dailyGoal || "");
  const [totalGoal, setTotalGoal] = React.useState(state?.totalGoal || "");
  const [error, setError] = React.useState("");
  const [icon, setIcon] = React.useState(state?.imgName || "address-book");
  const [category, setCategory] = useState(state?.category || "");
  const [monthlyGoal, setMonthlyGoal] = useState(state?.monthlyGoal || "");
  const [weeklyGoal, setWeeklyGoal] = useState(state?.weeklyGoal || "");
  const [unit, setUnit] = useState(state?.unit || "");
  const [trackingMethod, setTrackingMethod] = useState(
    state?.trackingMethod || "manual"
  );
  const [isAutoCalculating, setIsAutoCalculating] = useState(true);

  // Calculate weekly and monthly goals based on daily goal
  useEffect(() => {
    if (isAutoCalculating && dailyGoal) {
      const daily = Number(dailyGoal);
      if (!isNaN(daily)) {
        setWeeklyGoal((daily * 7).toString());
        setMonthlyGoal((daily * 30).toString());
      }
    }
  }, [dailyGoal, isAutoCalculating]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      setError("Please enter a title for your tracker.");
      return;
    }
    if (!category) {
      setError("Please select a category.");
      return;
    }
    if (!unit) {
      setError("Please enter a unit of measurement.");
      return;
    }
    if (!totalGoal) {
      setError("Please enter a total goal.");
      return;
    }

    const trackerData = {
      title: title || "Empty",
      description: description || "Empty",
      startDate: startDate || "Empty",
      endDate: endDate || "Empty",
      dailyGoal: dailyGoal || "Empty",
      totalGoal: Number(totalGoal) || 0,
      weeklyGoal: weeklyGoal || "Empty",
      monthlyGoal: monthlyGoal || "Empty",
      imgName: icon || "chart-line",
      category: category,
      unit: unit.toUpperCase(),
      trackingMethod: trackingMethod,
    };

    if (isEditing) {
      const existingTracker = trackers.find((t) => t.id === parseInt(id));
      updateTracker(parseInt(id), {
        ...trackerData,
        entries: existingTracker.entries || [],
        currentProgress: existingTracker.currentProgress || 0,
      });
      toast.success("Tracker updated successfully");
    } else {
      const newTracker = {
        ...trackerData,
        id: Date.now(),
        currentProgress: 0,
        entries: [],
      };
      addTracker(newTracker);
      toast.success("Tracker created successfully");
    }
    navigate(-1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "startDate":
        setStartDate(value);
        break;
      case "endDate":
        setEndDate(value);
        break;
      case "dailyGoal":
        setDailyGoal(value);
        break;
      case "totalGoal":
        setTotalGoal(value);
        break;
      case "monthlyGoal":
        setMonthlyGoal(value);
        setIsAutoCalculating(false);
        break;
      case "weeklyGoal":
        setWeeklyGoal(value);
        setIsAutoCalculating(false);
        break;
      case "unit":
        setUnit(value);
        break;
      case "trackingMethod":
        setTrackingMethod(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-6 border border-indigo-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                className="p-3 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition duration-200"
                onClick={closeModal}
              >
                <i className="fa-solid fa-chevron-left text-2xl"></i>
              </button>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {isEditing ? "Edit Tracker" : "New Tracker"}
                </h1>
                <p className="text-gray-600 mt-1">
                  {isEditing
                    ? "Update your tracker settings"
                    : "Create a new tracker to monitor your progress"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <i className="fas fa-chart-line text-indigo-600 text-lg"></i>
                </div>
                <div>
                  <div className="text-2xl font-bold text-indigo-600">85%</div>
                  <div className="text-xs font-medium text-indigo-500">
                    Success Rate
                  </div>
                </div>
              </div>
              <div className="text-center p-3 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <i className="fas fa-users text-purple-600 text-lg"></i>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">10K+</div>
                  <div className="text-xs font-medium text-purple-500">
                    Active Users
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Basic Info */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                  <i className="fas fa-info-circle text-lg"></i>
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Basic Information
                </h2>
              </div>

              <div className="space-y-6">
                {/* Icon and Title Section */}
                <div className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-medium text-indigo-600">
                      Icon
                    </label>
                    <label className="block text-xs font-medium text-indigo-600">
                      Title <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconDropdown icon={icon} setIcon={setIcon} />
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        onChange={handleInputChange}
                        name="title"
                        value={title}
                        required
                        className="w-full h-12 px-4 pl-12 bg-white border-2 border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-200 placeholder:text-gray-400"
                        placeholder="Enter tracker title"
                      />
                      <i className="fas fa-heading absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400"></i>
                    </div>
                  </div>
                </div>

                {/* Description Section */}
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <label className="block text-xs font-medium text-blue-600 mb-2">
                    Description
                  </label>
                  <div className="relative">
                    <textarea
                      onChange={handleInputChange}
                      name="description"
                      value={description}
                      className="w-full px-4 py-3 pl-12 bg-white border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 placeholder:text-gray-400 min-h-[100px]"
                      placeholder="Enter tracker description"
                      rows={3}
                    />
                    <i className="fas fa-align-left absolute left-4 top-4 text-blue-400"></i>
                  </div>
                </div>

                {/* Dates Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                    <label className="block text-xs font-medium text-green-600 mb-2">
                      Start Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        onChange={handleInputChange}
                        name="startDate"
                        value={startDate}
                        className="w-full h-12 px-4 pl-12 bg-white border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-500 transition-all duration-200"
                      />
                      <i className="fas fa-calendar-plus absolute left-4 top-1/2 -translate-y-1/2 text-green-400"></i>
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                    <label className="block text-xs font-medium text-green-600 mb-2">
                      End Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        onChange={handleInputChange}
                        name="endDate"
                        value={endDate}
                        disabled={trackingMethod === "infinite"}
                        className={`w-full h-12 px-4 pl-12 bg-white border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-500 transition-all duration-200 ${
                          trackingMethod === "infinite"
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      />
                      <i className="fas fa-calendar-check absolute left-4 top-1/2 -translate-y-1/2 text-green-400"></i>
                    </div>
                  </div>
                </div>

                {/* Category and Unit Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                    <label className="block text-xs font-medium text-purple-600 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <CategoryDropdown setCategory={setCategory} required />
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                    <label className="block text-xs font-medium text-purple-600 mb-2">
                      Unit of Measurement{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        onChange={handleInputChange}
                        name="unit"
                        value={unit}
                        maxLength={3}
                        required
                        className="w-full h-12 px-4 pl-12 bg-white border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 placeholder:text-gray-400 uppercase"
                        placeholder="e.g. bks, mi, hrs"
                      />
                      <i className="fas fa-ruler absolute left-4 top-1/2 -translate-y-1/2 text-purple-400"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Templates Section */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-100 mt-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                  <i className="fas fa-magic text-lg"></i>
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Quick Templates
                </h2>
              </div>

              {/* Health & Fitness Templates */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="fas fa-heartbeat text-red-500"></i>
                  Health & Fitness
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => {
                      const today = new Date();
                      const endDate = new Date();
                      endDate.setMonth(today.getMonth() + 3);

                      setTitle("Daily Exercise");
                      setDescription("Track your daily workout minutes");
                      setIcon("dumbbell");
                      setCategory("Health");
                      setUnit("min");
                      setDailyGoal("30");
                      setWeeklyGoal("210");
                      setMonthlyGoal("900");
                      setTotalGoal("3000");
                      setTrackingMethod("finite");
                      setStartDate(today.toISOString().split("T")[0]);
                      setEndDate(endDate.toISOString().split("T")[0]);
                      toast.success("Exercise tracker template applied");
                    }}
                    className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg hover:bg-green-200 transition-colors duration-200 text-left border border-green-100 hover:border-green-200"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <i className="fas fa-dumbbell text-green-600"></i>
                      <h3 className="font-medium text-gray-900">
                        Exercise Tracker
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Track your daily workout minutes
                    </p>
                  </button>

                  <button
                    onClick={() => {
                      const today = new Date();
                      const endDate = new Date();
                      endDate.setMonth(today.getMonth() + 1);

                      setTitle("Water Intake");
                      setDescription("Track your daily water consumption");
                      setIcon("glass-water");
                      setCategory("Health");
                      setUnit("oz");
                      setDailyGoal("64");
                      setWeeklyGoal("448");
                      setMonthlyGoal("1920");
                      setTotalGoal("2000");
                      setTrackingMethod("infinite");
                      setStartDate(today.toISOString().split("T")[0]);
                      setEndDate("");
                      toast.success("Water tracker template applied");
                    }}
                    className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-left border border-blue-100 hover:border-blue-200"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <i className="fas fa-glass-water text-blue-600"></i>
                      <h3 className="font-medium text-gray-900">
                        Water Tracker
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Track your daily water intake
                    </p>
                  </button>

                  <button
                    onClick={() => {
                      const today = new Date();
                      const endDate = new Date();
                      endDate.setMonth(today.getMonth() + 6);

                      setTitle("Weight Loss");
                      setDescription("Track your weight loss journey");
                      setIcon("weight-scale");
                      setCategory("Health");
                      setUnit("lbs");
                      setDailyGoal("0.2");
                      setWeeklyGoal("1.4");
                      setMonthlyGoal("6");
                      setTotalGoal("20");
                      setTrackingMethod("finite");
                      setStartDate(today.toISOString().split("T")[0]);
                      setEndDate(endDate.toISOString().split("T")[0]);
                      toast.success("Weight loss tracker template applied");
                    }}
                    className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg hover:bg-purple-200 transition-colors duration-200 text-left border border-purple-100 hover:border-purple-200"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <i className="fas fa-weight-scale text-purple-600"></i>
                      <h3 className="font-medium text-gray-900">Weight Loss</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Track your weight loss progress
                    </p>
                  </button>
                </div>
              </div>

              {/* Learning & Development Templates */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="fas fa-graduation-cap text-yellow-500"></i>
                  Learning & Development
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => {
                      const today = new Date();
                      const endDate = new Date();
                      endDate.setMonth(today.getMonth() + 2);

                      setTitle("Daily Reading");
                      setDescription("Track your daily reading progress");
                      setIcon("book");
                      setCategory("Learning");
                      setUnit("pgs");
                      setDailyGoal("20");
                      setWeeklyGoal("140");
                      setMonthlyGoal("600");
                      setTotalGoal("1000");
                      setTrackingMethod("finite");
                      setStartDate(today.toISOString().split("T")[0]);
                      setEndDate(endDate.toISOString().split("T")[0]);
                      toast.success("Reading tracker template applied");
                    }}
                    className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg hover:bg-yellow-200 transition-colors duration-200 text-left border border-yellow-100 hover:border-yellow-200"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <i className="fas fa-book text-yellow-600"></i>
                      <h3 className="font-medium text-gray-900">
                        Reading Tracker
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Track your daily reading goals
                    </p>
                  </button>

                  <button
                    onClick={() => {
                      const today = new Date();
                      const endDate = new Date();
                      endDate.setMonth(today.getMonth() + 3);

                      setTitle("Language Learning");
                      setDescription("Track your language learning progress");
                      setIcon("language");
                      setCategory("Learning");
                      setUnit("min");
                      setDailyGoal("30");
                      setWeeklyGoal("210");
                      setMonthlyGoal("900");
                      setTotalGoal("2700");
                      setTrackingMethod("finite");
                      setStartDate(today.toISOString().split("T")[0]);
                      setEndDate(endDate.toISOString().split("T")[0]);
                      toast.success(
                        "Language learning tracker template applied"
                      );
                    }}
                    className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg hover:bg-indigo-200 transition-colors duration-200 text-left border border-indigo-100 hover:border-indigo-200"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <i className="fas fa-language text-indigo-600"></i>
                      <h3 className="font-medium text-gray-900">
                        Language Learning
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Track your language study time
                    </p>
                  </button>

                  <button
                    onClick={() => {
                      const today = new Date();
                      const endDate = new Date();
                      endDate.setMonth(today.getMonth() + 1);

                      setTitle("Coding Practice");
                      setDescription("Track your daily coding practice");
                      setIcon("code");
                      setCategory("Learning");
                      setUnit("min");
                      setDailyGoal("60");
                      setWeeklyGoal("420");
                      setMonthlyGoal("1800");
                      setTotalGoal("1800");
                      setTrackingMethod("finite");
                      setStartDate(today.toISOString().split("T")[0]);
                      setEndDate(endDate.toISOString().split("T")[0]);
                      toast.success("Coding practice tracker template applied");
                    }}
                    className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-left border border-gray-100 hover:border-gray-200"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <i className="fas fa-code text-gray-600"></i>
                      <h3 className="font-medium text-gray-900">
                        Coding Practice
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Track your coding practice time
                    </p>
                  </button>
                </div>
              </div>

              {/* Productivity Templates */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="fas fa-check-circle text-green-500"></i>
                  Productivity
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => {
                      const today = new Date();
                      const endDate = new Date();
                      endDate.setMonth(today.getMonth() + 1);

                      setTitle("Daily Tasks");
                      setDescription("Track your daily task completion");
                      setIcon("tasks");
                      setCategory("Productivity");
                      setUnit("tsk");
                      setDailyGoal("5");
                      setWeeklyGoal("35");
                      setMonthlyGoal("150");
                      setTotalGoal("150");
                      setTrackingMethod("infinite");
                      setStartDate(today.toISOString().split("T")[0]);
                      setEndDate("");
                      toast.success("Daily tasks tracker template applied");
                    }}
                    className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg hover:bg-emerald-200 transition-colors duration-200 text-left border border-emerald-100 hover:border-emerald-200"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <i className="fas fa-tasks text-emerald-600"></i>
                      <h3 className="font-medium text-gray-900">Daily Tasks</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Track your daily task completion
                    </p>
                  </button>

                  <button
                    onClick={() => {
                      const today = new Date();
                      const endDate = new Date();
                      endDate.setMonth(today.getMonth() + 2);

                      setTitle("Focus Time");
                      setDescription("Track your focused work sessions");
                      setIcon("hourglass-half");
                      setCategory("Productivity");
                      setUnit("min");
                      setDailyGoal("120");
                      setWeeklyGoal("840");
                      setMonthlyGoal("3600");
                      setTotalGoal("7200");
                      setTrackingMethod("finite");
                      setStartDate(today.toISOString().split("T")[0]);
                      setEndDate(endDate.toISOString().split("T")[0]);
                      toast.success("Focus time tracker template applied");
                    }}
                    className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg hover:bg-orange-200 transition-colors duration-200 text-left border border-orange-100 hover:border-orange-200"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <i className="fas fa-hourglass-half text-orange-600"></i>
                      <h3 className="font-medium text-gray-900">Focus Time</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Track your focused work sessions
                    </p>
                  </button>

                  <button
                    onClick={() => {
                      const today = new Date();
                      const endDate = new Date();
                      endDate.setMonth(today.getMonth() + 1);

                      setTitle("Habit Tracker");
                      setDescription("Track your daily habits");
                      setIcon("calendar-check");
                      setCategory("Productivity");
                      setUnit("hbt");
                      setDailyGoal("3");
                      setWeeklyGoal("21");
                      setMonthlyGoal("90");
                      setTotalGoal("90");
                      setTrackingMethod("infinite");
                      setStartDate(today.toISOString().split("T")[0]);
                      setEndDate("");
                      toast.success("Habit tracker template applied");
                    }}
                    className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg hover:bg-pink-200 transition-colors duration-200 text-left border border-pink-100 hover:border-pink-200"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <i className="fas fa-calendar-check text-pink-600"></i>
                      <h3 className="font-medium text-gray-900">
                        Habit Tracker
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Track your daily habits
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Goals */}
          <div className="space-y-6">
            {/* Goals Card */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-green-100 text-green-600">
                  <i className="fas fa-bullseye text-lg"></i>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Goals</h2>
              </div>

              <div className="space-y-6">
                {/* Goal Type Selection */}
                <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <label className="block text-xs font-medium text-green-600 mb-2">
                    Goal Type
                  </label>
                  <select
                    className="w-full px-4 py-2 bg-white border border-green-200 rounded-lg focus:ring-2 focus:ring-green-100 focus:border-green-500"
                    defaultValue="increasing"
                  >
                    <option value="increasing">
                      Increasing (e.g., books read, miles run)
                    </option>
                    <option value="decreasing">
                      Decreasing (e.g., weight loss, time spent)
                    </option>
                    <option value="maintaining">
                      Maintaining (e.g., daily habits, consistency)
                    </option>
                  </select>
                </div>

                {/* Goal Inputs */}
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg">
                    <label className="block text-xs font-medium text-indigo-600 mb-2">
                      Daily Goal {unit && `(${unit})`}
                    </label>
                    <div className="relative">
                      <input
                        onChange={handleInputChange}
                        name="dailyGoal"
                        value={dailyGoal}
                        className="w-full h-12 px-4 pl-12 bg-white border-2 border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-200 placeholder:text-gray-400"
                        placeholder="e.g. 5"
                      />
                      <i className="fas fa-calendar-day absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400"></i>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg">
                    <label className="block text-xs font-medium text-indigo-600 mb-2">
                      Weekly Goal {unit && `(${unit})`}
                    </label>
                    <div className="relative">
                      <input
                        onChange={handleInputChange}
                        name="weeklyGoal"
                        value={weeklyGoal}
                        className="w-full h-12 px-4 pl-12 bg-white border-2 border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-200 placeholder:text-gray-400"
                        placeholder="e.g. 25"
                      />
                      <i className="fas fa-calendar-week absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400"></i>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg">
                    <label className="block text-xs font-medium text-indigo-600 mb-2">
                      Monthly Goal {unit && `(${unit})`}
                    </label>
                    <div className="relative">
                      <input
                        onChange={handleInputChange}
                        name="monthlyGoal"
                        value={monthlyGoal}
                        className="w-full h-12 px-4 pl-12 bg-white border-2 border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-200 placeholder:text-gray-400"
                        placeholder="e.g. 100"
                      />
                      <i className="fas fa-calendar-alt absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400"></i>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg">
                    <label className="block text-xs font-medium text-indigo-600 mb-2">
                      Total Goal {unit && `(${unit})`}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        onChange={handleInputChange}
                        name="totalGoal"
                        value={totalGoal}
                        required
                        type="number"
                        min="0"
                        className="w-full h-12 px-4 pl-12 bg-white border-2 border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-200 placeholder:text-gray-400"
                        placeholder="e.g. 1000"
                      />
                      <i className="fas fa-bullseye absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400"></i>
                    </div>
                  </div>
                </div>

                {/* Progress Tracking Method */}
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <label className="block text-xs font-medium text-blue-600 mb-2">
                    Duration Type
                  </label>
                  <div className="relative">
                    <select
                      name="trackingMethod"
                      value={trackingMethod}
                      onChange={handleInputChange}
                      className="w-full h-12 px-4 pl-12 bg-white border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 appearance-none"
                    >
                      <option value="finite">Has End Date</option>
                      <option value="infinite">Repeats Forever</option>
                    </select>
                    <i className="fas fa-infinity absolute left-4 top-1/2 -translate-y-1/2 text-blue-400"></i>
                    <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none"></i>
                  </div>
                </div>

                {error && (
                  <div className="text-red-500 text-sm font-medium">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full h-12 flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 ease-in-out font-medium shadow-lg hover:shadow-xl"
                >
                  <i className="fas fa-save"></i>
                  {isEditing ? "Update Tracker" : "Create Tracker"}
                </button>
              </div>
            </div>

            {/* Quick Tips Card */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-yellow-100 text-yellow-600">
                  <i className="fas fa-lightbulb text-lg"></i>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Quick Tips</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-bullseye text-yellow-600"></i>
                  </div>
                  <p className="text-gray-700">
                    Set realistic goals that challenge you but are achievable.
                  </p>
                </div>

                <div className="flex items-start gap-3 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-chart-line text-yellow-600"></i>
                  </div>
                  <p className="text-gray-700">
                    Track your progress regularly to stay motivated.
                  </p>
                </div>

                <div className="flex items-start gap-3 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-calendar-check text-yellow-600"></i>
                  </div>
                  <p className="text-gray-700">
                    Choose a tracking frequency that fits your schedule.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
