import { useState, useMemo, useEffect } from "react";
import { Pie, Line, Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
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

// Stat Card Component
const StatCard = ({ title, value, icon, trend }) => {
  const getBgColor = () => {
    if (title.toLowerCase().includes("total")) return "bg-green-50";
    if (title.toLowerCase().includes("avg")) return "bg-blue-50";
    if (title.toLowerCase().includes("peak")) return "bg-purple-50";
    return "bg-indigo-50";
  };

  const getTextColor = () => {
    if (title.toLowerCase().includes("total")) return "text-green-600";
    if (title.toLowerCase().includes("avg")) return "text-blue-600";
    if (title.toLowerCase().includes("peak")) return "text-purple-600";
    return "text-indigo-600";
  };

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-xs">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {title}
          </p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className={`p-2 rounded-lg ${getBgColor()} ${getTextColor()}`}>
          <span className="text-lg">{icon}</span>
        </div>
      </div>
    </div>
  );
};

const AnalyticsDashboard = ({
  title = "Performance Metrics",
  unitName = "units",
  unitPlural = "units",
  icon = "📊",
  entries = [],
  useCategories = false,
  showGoals = false,
  weeklyGoal = null,
  monthlyGoal = null,
  trackerId = null,
}) => {
  const [timeFilter, setTimeFilter] = useState("all");
  const [chartType, setChartType] = useState("line");
  const [customizationModalOpen, setCustomizationModalOpen] = useState(false);
  const [customTitle, setCustomTitle] = useState(title);
  const [customUnit, setCustomUnit] = useState(unitName);
  const [customUnitPlural, setCustomUnitPlural] = useState(unitPlural);
  const [savedEntries, setSavedEntries] = useState([]);

  // Load saved entries from localStorage on component mount
  useEffect(() => {
    const loadSavedEntries = () => {
      if (!trackerId) return;
      const saved = localStorage.getItem(`trackerEntries_${trackerId}`);
      if (saved) {
        setSavedEntries(JSON.parse(saved));
      }
    };
    loadSavedEntries();
  }, [trackerId]);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    if (entries.length > 0 && trackerId) {
      const allEntries = [...entries];
      const uniqueEntries = Array.from(
        new Map(allEntries.map((entry) => [entry.id, entry])).values()
      );
      localStorage.setItem(
        `trackerEntries_${trackerId}`,
        JSON.stringify(uniqueEntries)
      );
      setSavedEntries(uniqueEntries);
    }
  }, [entries, trackerId]);

  // Process entries based on time filter
  const filteredEntries = useMemo(() => {
    const now = new Date();
    const entriesToProcess = entries.length > 0 ? entries : savedEntries;

    return entriesToProcess
      .filter((entry) => {
        const entryDate = new Date(entry.date);
        const daysDiff = Math.floor((now - entryDate) / (1000 * 60 * 60 * 24));

        if (timeFilter === "week") return daysDiff <= 7;
        if (timeFilter === "month") return daysDiff <= 30;
        return true;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, newest first
  }, [entries, savedEntries, timeFilter]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (filteredEntries.length === 0)
      return { total: "Empty", average: "Empty", peak: "Empty" };

    const total = filteredEntries.reduce((sum, entry) => sum + entry.amount, 0);
    const average = total / filteredEntries.length;
    const peak = Math.max(...filteredEntries.map((entry) => entry.amount));

    return {
      total: total.toString(),
      average: average.toFixed(1),
      peak: peak.toString(),
    };
  }, [filteredEntries]);

  // Generate line chart data
  const lineData = useMemo(() => {
    const labels =
      timeFilter === "week"
        ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        : ["Week 1", "Week 2", "Week 3", "Week 4"];

    const data = timeFilter === "week" ? Array(7).fill(0) : Array(4).fill(0);

    filteredEntries.forEach((entry) => {
      const date = new Date(entry.date);
      const dayOfWeek = date.getDay();
      const weekOfMonth = Math.floor(date.getDate() / 7);

      if (timeFilter === "week") {
        data[dayOfWeek] += entry.amount;
      } else {
        data[weekOfMonth] += entry.amount;
      }
    });

    const datasets = [
      {
        label: `${unitPlural} per ${timeFilter === "week" ? "day" : "week"}`,
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
    ];

    if (showGoals) {
      const goalData = {
        label: `${timeFilter === "week" ? "Weekly" : "Monthly"} Goal`,
        data: Array(data.length).fill(
          timeFilter === "week" ? weeklyGoal / 7 : monthlyGoal / 4
        ),
        borderColor: "#10b981",
        borderDash: [5, 5],
        borderWidth: 1,
        pointRadius: 0,
      };
      datasets.push(goalData);
    }

    return {
      labels,
      datasets,
    };
  }, [
    filteredEntries,
    timeFilter,
    showGoals,
    weeklyGoal,
    monthlyGoal,
    unitPlural,
  ]);

  // Generate bar chart data
  const barData = useMemo(() => {
    const labels = filteredEntries.map((entry) => entry.date);
    const data = filteredEntries.map((entry) => entry.amount);

    return {
      labels,
      datasets: [
        {
          label: unitPlural,
          data,
          backgroundColor: "rgba(79, 70, 229, 0.8)",
          borderRadius: 6,
        },
      ],
    };
  }, [filteredEntries, unitPlural]);

  // Generate pie chart data
  const pieData = useMemo(() => {
    const total = filteredEntries.reduce((sum, entry) => sum + entry.amount, 0);

    return {
      labels: ["Completed", "Remaining"],
      datasets: [
        {
          data: [total, Math.max(0, monthlyGoal - total)],
          backgroundColor: [
            "rgba(79, 70, 229, 0.8)",
            "rgba(209, 213, 219, 0.8)",
          ],
          borderWidth: 0,
        },
      ],
    };
  }, [filteredEntries, monthlyGoal]);

  // Extract category from details
  const getCategory = (details) => {
    if (!useCategories) return "Activity";
    const match = details.match(/of '([^']+)'/);
    return match ? match[1] : "Other";
  };

  // Goal progress
  const weeklyProgress = weeklyGoal
    ? Math.min(100, (stats.total / weeklyGoal) * 100)
    : null;
  const monthlyProgress = monthlyGoal
    ? Math.min(100, (stats.total / monthlyGoal) * 100)
    : null;

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="w-full">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chart Section */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-100">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
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
                    <option value="all">All Time</option>
                    <option value="month">Last 30 Days</option>
                    <option value="week">Last 7 Days</option>
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

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100">
                <div className="h-[400px]">
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

            {/* Goals Section */}
            {showGoals && (weeklyGoal || monthlyGoal) && (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
                    <i className="fas fa-bullseye text-lg"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-amber-900">
                    Goals Progress
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {weeklyGoal && (
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-amber-600">
                          Weekly Goal
                        </span>
                        <span className="text-sm font-medium text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                          {weeklyProgress ? weeklyProgress.toFixed(1) : "0.0"}%
                        </span>
                      </div>
                      <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                          style={{ width: `${weeklyProgress || 0}%` }}
                        ></div>
                      </div>
                      <div className="mt-2 text-sm text-amber-700">
                        {stats.total || 0} / {Number(weeklyGoal).toFixed(2)}{" "}
                        {unitPlural}
                      </div>
                    </div>
                  )}
                  {monthlyGoal && (
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-amber-600">
                          Monthly Goal
                        </span>
                        <span className="text-sm font-medium text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                          {monthlyProgress ? monthlyProgress.toFixed(1) : "0.0"}
                          %
                        </span>
                      </div>
                      <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                          style={{ width: `${monthlyProgress || 0}%` }}
                        ></div>
                      </div>
                      <div className="mt-2 text-sm text-amber-700">
                        {stats.total || 0} / {Number(monthlyGoal).toFixed(2)}{" "}
                        {unitPlural}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Side Panels */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="fas fa-chart-pie text-indigo-500"></i>
                Quick Stats
              </h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <i className="fas fa-calendar-check text-emerald-600"></i>
                    </div>
                    <div>
                      <div className="text-sm text-emerald-600">
                        Total Entries
                      </div>
                      <div className="text-xl font-bold text-emerald-900">
                        {entries.length}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <i className="fas fa-clock text-blue-600"></i>
                    </div>
                    <div>
                      <div className="text-sm text-blue-600">Time Period</div>
                      <div className="text-xl font-bold text-blue-900">
                        {timeFilter === "week"
                          ? "Last 7 Days"
                          : timeFilter === "month"
                          ? "Last 30 Days"
                          : "All Time"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <i className="fas fa-chart-bar text-purple-600"></i>
                    </div>
                    <div>
                      <div className="text-sm text-purple-600">Chart Type</div>
                      <div className="text-xl font-bold text-purple-900 capitalize">
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
                      <i className="fas fa-trend-up text-amber-600"></i>
                    </div>
                    <div className="text-sm font-medium text-amber-600">
                      Trend Analysis
                    </div>
                  </div>
                  <p className="text-sm text-amber-700">
                    {stats.average > 0
                      ? `Your average daily progress is ${stats.average} ${unitPlural}`
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
                    {showGoals && weeklyGoal
                      ? `You're ${
                          weeklyProgress ? weeklyProgress.toFixed(1) : 0
                        }% towards your weekly goal`
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
                    {stats.peak > 0
                      ? `Your best day was ${stats.peak} ${unitPlural}`
                      : "Keep tracking to see your best performance"}
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

export default AnalyticsDashboard;
