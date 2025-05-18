import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { useTrackers } from "../data/useTrackers";
import Footer from "../components/Footer";

const questions = [
  {
    id: 1,
    question: "What area of your life would you like to focus on?",
    options: [
      { id: "health", label: "Health & Fitness", icon: "fa-heartbeat" },
      {
        id: "productivity",
        label: "Productivity & Work",
        icon: "fa-briefcase",
      },
      { id: "learning", label: "Learning & Growth", icon: "fa-graduation-cap" },
      { id: "mindfulness", label: "Mindfulness & Well-being", icon: "fa-spa" },
      { id: "finance", label: "Financial Goals", icon: "fa-wallet" },
      { id: "social", label: "Social & Relationships", icon: "fa-users" },
    ],
  },
  {
    id: 2,
    question: "How much time can you dedicate daily?",
    options: [
      { id: "15min", label: "15 minutes", icon: "fa-clock" },
      { id: "30min", label: "30 minutes", icon: "fa-clock" },
      { id: "1hour", label: "1 hour", icon: "fa-clock" },
      { id: "2hours", label: "2+ hours", icon: "fa-clock" },
    ],
  },
  {
    id: 3,
    question: "What's your current experience level?",
    options: [
      { id: "beginner", label: "Beginner", icon: "fa-seedling" },
      { id: "intermediate", label: "Intermediate", icon: "fa-tree" },
      { id: "advanced", label: "Advanced", icon: "fa-mountain" },
    ],
  },
  {
    id: 4,
    question: "What's your preferred tracking method?",
    options: [
      { id: "daily", label: "Daily Goals", icon: "fa-calendar-day" },
      { id: "weekly", label: "Weekly Goals", icon: "fa-calendar-week" },
      { id: "monthly", label: "Monthly Goals", icon: "fa-calendar-alt" },
    ],
  },
  {
    id: 5,
    question: "What's your primary motivation?",
    options: [
      { id: "self_improvement", label: "Self Improvement", icon: "fa-star" },
      { id: "health", label: "Better Health", icon: "fa-heart" },
      { id: "career", label: "Career Growth", icon: "fa-briefcase" },
      { id: "balance", label: "Life Balance", icon: "fa-balance-scale" },
    ],
  },
];

const goalRecommendations = {
  health: {
    beginner: {
      "15min": [
        {
          title: "Daily Stretching",
          description: "Start with 15 minutes of basic stretching exercises",
          dailyGoal: 15,
          unit: "minutes",
          category: "Health & Fitness",
          imgName: "heartbeat",
          benefits: [
            "Improves flexibility",
            "Reduces muscle tension",
            "Enhances posture",
            "Prevents injuries",
          ],
          tips: [
            "Start with gentle stretches",
            "Hold each stretch for 30 seconds",
            "Breathe deeply during stretches",
            "Don't force any movements",
          ],
          resources: [
            "Yoga for Beginners YouTube playlist",
            "Basic Stretching Guide PDF",
            "Stretching App Recommendations",
          ],
        },
        {
          title: "Mindful Breathing",
          description: "Practice deep breathing exercises for stress relief",
          dailyGoal: 15,
          unit: "minutes",
          category: "Health & Fitness",
          imgName: "spa",
          benefits: [
            "Reduces stress and anxiety",
            "Improves focus",
            "Better sleep quality",
            "Enhanced emotional well-being",
          ],
          tips: [
            "Find a quiet space",
            "Sit in a comfortable position",
            "Focus on your breath",
            "Start with 5 minutes and gradually increase",
          ],
          resources: [
            "Meditation Apps Guide",
            "Breathing Techniques PDF",
            "Mindfulness Podcast Recommendations",
          ],
        },
        {
          title: "Quick Core Workout",
          description: "15-minute core strengthening routine",
          dailyGoal: 15,
          unit: "minutes",
          category: "Health & Fitness",
          imgName: "dumbbell",
          benefits: [
            "Strengthens core muscles",
            "Improves posture",
            "Reduces back pain",
            "Enhances stability",
          ],
          tips: [
            "Focus on form over speed",
            "Engage core throughout",
            "Breathe steadily",
            "Rest between sets",
          ],
          resources: [
            "Core Workout Videos",
            "Exercise Form Guide",
            "Progress Tracking App",
          ],
        },
        {
          title: "Balance Training",
          description: "Improve stability and coordination",
          dailyGoal: 15,
          unit: "minutes",
          category: "Health & Fitness",
          imgName: "balance-scale",
          benefits: [
            "Better balance",
            "Reduced fall risk",
            "Improved coordination",
            "Enhanced proprioception",
          ],
          tips: [
            "Start near a wall for support",
            "Progress gradually",
            "Focus on control",
            "Practice daily",
          ],
          resources: [
            "Balance Exercise Guide",
            "Stability Training Videos",
            "Progress Tracker",
          ],
        },
      ],
      "30min": [
        {
          title: "Beginner Workout",
          description: "30-minute beginner-friendly workout routine",
          dailyGoal: 30,
          unit: "minutes",
          category: "Health & Fitness",
          imgName: "dumbbell",
          benefits: [
            "Builds basic strength",
            "Improves cardiovascular health",
            "Boosts energy levels",
            "Enhances mood",
          ],
          tips: [
            "Warm up properly",
            "Start with bodyweight exercises",
            "Stay hydrated",
            "Listen to your body",
          ],
          resources: [
            "Beginner Workout Videos",
            "Fitness Tracker App",
            "Nutrition Guide for Beginners",
          ],
        },
        {
          title: "Yoga Flow",
          description: "30-minute yoga sequence for beginners",
          dailyGoal: 30,
          unit: "minutes",
          category: "Health & Fitness",
          imgName: "spa",
          benefits: [
            "Increases flexibility",
            "Reduces stress",
            "Improves balance",
            "Enhances mindfulness",
          ],
          tips: [
            "Use a yoga mat",
            "Follow proper alignment",
            "Breathe deeply",
            "Modify poses as needed",
          ],
          resources: [
            "Yoga Tutorial Videos",
            "Pose Guide",
            "Yoga App Recommendations",
          ],
        },
      ],
    },
    intermediate: {
      "30min": [
        {
          title: "HIIT Training",
          description: "High-intensity interval training workout",
          dailyGoal: 30,
          unit: "minutes",
          category: "Health & Fitness",
          imgName: "bolt",
          benefits: [
            "Burns more calories",
            "Improves cardiovascular fitness",
            "Builds muscle strength",
            "Time-efficient workouts",
          ],
          tips: [
            "Alternate between high and low intensity",
            "Keep proper form",
            "Stay hydrated",
            "Allow recovery time",
          ],
          resources: [
            "HIIT Workout Plans",
            "Heart Rate Monitor Guide",
            "Recovery Techniques",
          ],
        },
        {
          title: "Strength Circuit",
          description: "30-minute strength training circuit",
          dailyGoal: 30,
          unit: "minutes",
          category: "Health & Fitness",
          imgName: "dumbbell",
          benefits: [
            "Builds muscle mass",
            "Increases strength",
            "Improves endurance",
            "Boosts metabolism",
          ],
          tips: [
            "Use proper form",
            "Progressive overload",
            "Rest between sets",
            "Track progress",
          ],
          resources: [
            "Strength Training Guide",
            "Exercise Library",
            "Progress Tracker",
          ],
        },
      ],
    },
  },
  productivity: {
    beginner: {
      "15min": [
        {
          title: "Daily Planning",
          description: "Plan your day for better productivity",
          dailyGoal: 15,
          unit: "minutes",
          category: "Productivity",
          imgName: "tasks",
          benefits: [
            "Better time management",
            "Reduced stress",
            "Increased focus",
            "More accomplished tasks",
          ],
          tips: [
            "Plan the night before",
            "Prioritize tasks",
            "Use time blocking",
            "Review and adjust",
          ],
          resources: [
            "Productivity Apps Guide",
            "Time Management Techniques",
            "Planning Templates",
          ],
        },
      ],
      "30min": [
        {
          title: "Focus Time",
          description: "Dedicated focus time for important tasks",
          dailyGoal: 30,
          unit: "minutes",
          category: "Productivity",
          imgName: "brain",
          benefits: [
            "Deep work capability",
            "Better concentration",
            "Higher quality output",
            "Reduced distractions",
          ],
          tips: [
            "Use the Pomodoro Technique",
            "Eliminate distractions",
            "Take regular breaks",
            "Track your progress",
          ],
          resources: ["Focus Apps", "Deep Work Guide", "Productivity Tools"],
        },
      ],
    },
  },
  learning: {
    beginner: {
      "15min": [
        {
          title: "Language Learning",
          description: "Daily language practice session",
          dailyGoal: 15,
          unit: "minutes",
          category: "Learning",
          imgName: "language",
          benefits: [
            "Improved memory",
            "Better cognitive skills",
            "Cultural understanding",
            "Career opportunities",
          ],
          tips: [
            "Use spaced repetition",
            "Practice speaking daily",
            "Learn common phrases",
            "Immerse in the language",
          ],
          resources: [
            "Language Learning Apps",
            "Online Courses",
            "Practice Partners",
          ],
        },
      ],
      "30min": [
        {
          title: "Skill Development",
          description: "Learn a new skill or topic",
          dailyGoal: 30,
          unit: "minutes",
          category: "Learning",
          imgName: "book",
          benefits: [
            "Career advancement",
            "Personal growth",
            "New opportunities",
            "Increased confidence",
          ],
          tips: [
            "Choose relevant skills",
            "Set clear objectives",
            "Practice consistently",
            "Track progress",
          ],
          resources: [
            "Online Learning Platforms",
            "Skill Assessment Tools",
            "Learning Communities",
          ],
        },
      ],
    },
  },
  mindfulness: {
    beginner: {
      "15min": [
        {
          title: "Meditation",
          description: "Daily meditation practice",
          dailyGoal: 15,
          unit: "minutes",
          category: "Mindfulness",
          imgName: "om",
          benefits: [
            "Reduced stress",
            "Better focus",
            "Emotional balance",
            "Improved sleep",
          ],
          tips: [
            "Start with guided meditation",
            "Find a quiet space",
            "Be consistent",
            "Don't judge your practice",
          ],
          resources: [
            "Meditation Apps",
            "Guided Sessions",
            "Mindfulness Books",
          ],
        },
      ],
      "30min": [
        {
          title: "Mindful Journaling",
          description: "Reflect and journal your thoughts",
          dailyGoal: 30,
          unit: "minutes",
          category: "Mindfulness",
          imgName: "pen",
          benefits: [
            "Self-awareness",
            "Emotional processing",
            "Stress reduction",
            "Personal growth",
          ],
          tips: [
            "Write freely",
            "Be consistent",
            "Reflect on patterns",
            "Celebrate progress",
          ],
          resources: [
            "Journaling Prompts",
            "Digital Journal Apps",
            "Writing Guides",
          ],
        },
      ],
    },
  },
  finance: {
    beginner: {
      "15min": [
        {
          title: "Daily Budget Tracking",
          description: "Track your daily expenses and income",
          dailyGoal: 15,
          unit: "minutes",
          category: "Finance",
          imgName: "wallet",
          benefits: [
            "Better financial awareness",
            "Reduced overspending",
            "Savings growth",
            "Financial security",
          ],
          tips: [
            "Use a budgeting app",
            "Track all expenses",
            "Set spending limits",
            "Review regularly",
          ],
          resources: [
            "Budgeting Apps",
            "Financial Planning Tools",
            "Money Management Guides",
          ],
        },
      ],
    },
  },
  social: {
    beginner: {
      "15min": [
        {
          title: "Social Connection",
          description: "Daily social interaction and relationship building",
          dailyGoal: 15,
          unit: "minutes",
          category: "Social",
          imgName: "users",
          benefits: [
            "Stronger relationships",
            "Better communication",
            "Emotional support",
            "Social skills",
          ],
          tips: [
            "Reach out daily",
            "Be present in conversations",
            "Show genuine interest",
            "Maintain connections",
          ],
          resources: [
            "Communication Guides",
            "Social Skills Resources",
            "Relationship Building Tips",
          ],
        },
      ],
    },
  },
};

const calculateTrackingFrequency = (entries) => {
  if (!entries || entries.length === 0) return "No data available";

  const entryDates = entries.map((entry) => new Date(entry.date));
  const uniqueDays = new Set(entryDates.map((date) => date.toDateString()))
    .size;
  const totalDays = Math.ceil(
    (Math.max(...entryDates) - Math.min(...entryDates)) / (1000 * 60 * 60 * 24)
  );

  const frequency = (uniqueDays / totalDays) * 100;

  if (frequency >= 80) return "Very consistent";
  if (frequency >= 60) return "Consistent";
  if (frequency >= 40) return "Moderate";
  if (frequency >= 20) return "Inconsistent";
  return "Very inconsistent";
};

const getMotivationTip = (frequency) => {
  const tips = {
    "Very consistent":
      "Keep up the great work! Your consistency is impressive.",
    Consistent: "You're doing well! Try to maintain this level of consistency.",
    Moderate: "Consider tracking more frequently to see better results.",
    Inconsistent: "Try to track more regularly to build better habits.",
    "Very inconsistent":
      "Start with small, achievable goals to build consistency.",
    "No data available": "Start tracking to get personalized recommendations.",
  };

  return tips[frequency] || "Keep tracking to get personalized tips.";
};

export const GoalRecommendations = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const { addTracker } = useTrackers();
  const [trackers, setTrackers] = useState([]);
  const [selectedTracker, setSelectedTracker] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("goalSurveyData");
    if (savedData) {
      const {
        answers: savedAnswers,
        showRecommendations: savedShowRecommendations,
      } = JSON.parse(savedData);
      setAnswers(savedAnswers);
      setShowRecommendations(savedShowRecommendations);
    }
  }, []);

  // Save data whenever answers or showRecommendations changes
  useEffect(() => {
    if (Object.keys(answers).length > 0 || showRecommendations) {
      localStorage.setItem(
        "goalSurveyData",
        JSON.stringify({
          answers,
          showRecommendations,
        })
      );
    }
  }, [answers, showRecommendations]);

  useEffect(() => {
    const savedTrackers = JSON.parse(localStorage.getItem("trackers") || "[]");
    setTrackers(savedTrackers);
  }, []);

  useEffect(() => {
    if (selectedTracker) {
      const entries = JSON.parse(
        localStorage.getItem(`tracker_${selectedTracker.id}_entries`) || "[]"
      );
      const frequency = calculateTrackingFrequency(entries);
      const tip = getMotivationTip(frequency);

      setRecommendations([
        {
          id: 1,
          title: "Tracking Frequency",
          description: `Your tracking frequency is ${frequency.toLowerCase()}. ${tip}`,
          type: "frequency",
        },
        {
          id: 2,
          title: "Goal Setting",
          description:
            "Set specific, measurable goals to track your progress effectively.",
          type: "goal",
        },
        {
          id: 3,
          title: "Consistency",
          description:
            "Try to track at the same time each day to build a strong habit.",
          type: "consistency",
        },
      ]);
    }
  }, [selectedTracker]);

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));

    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowRecommendations(true);
    }
  };

  const handleRedoSurvey = () => {
    // Clear saved data
    localStorage.removeItem("goalSurveyData");
    // Reset state
    setAnswers({});
    setCurrentStep(0);
    setShowRecommendations(false);
    setSelectedGoal(null);
  };

  const getRecommendations = () => {
    const area = answers[1];
    const experience = answers[3];
    const time = answers[2];
    const motivation = answers[5];

    if (!area || !experience || !time) return null;

    // Get recommendations based on the selected area, experience level, and time commitment
    const recommendations =
      goalRecommendations[area]?.[experience]?.[time] || [];

    // If no recommendations found, return default recommendations for the area
    if (recommendations.length === 0) {
      const defaultRecommendations =
        goalRecommendations[area]?.beginner?.["15min"] || [];
      return {
        recommendations: defaultRecommendations,
        trackingFrequency: getTrackingFrequency(answers),
        motivationTips: getMotivationTips(motivation),
        progressMetrics: getProgressMetrics(area),
        area,
        experience,
        time,
        motivation,
      };
    }

    return {
      recommendations,
      trackingFrequency: getTrackingFrequency(answers),
      motivationTips: getMotivationTips(motivation),
      progressMetrics: getProgressMetrics(area),
      area,
      experience,
      time,
      motivation,
    };
  };

  const getAreaLabel = (areaId) => {
    const area = questions[0].options.find((opt) => opt.id === areaId);
    return area ? area.label : areaId;
  };

  const getExperienceLabel = (expId) => {
    const exp = questions[2].options.find((opt) => opt.id === expId);
    return exp ? exp.label : expId;
  };

  const getTimeLabel = (timeId) => {
    const time = questions[1].options.find((opt) => opt.id === timeId);
    return time ? time.label : timeId;
  };

  const getMotivationLabel = (motId) => {
    const mot = questions[4].options.find((opt) => opt.id === motId);
    return mot ? mot.label : motId;
  };

  const getTrackingFrequency = (answers) => {
    const time = answers[2];
    const method = answers[4];

    const frequencies = {
      "15min": {
        daily: "Track 2-3 times per day",
        weekly: "Track 3-4 times per week",
        monthly: "Track 2-3 times per month",
      },
      "30min": {
        daily: "Track 1-2 times per day",
        weekly: "Track 2-3 times per week",
        monthly: "Track 1-2 times per month",
      },
      "1hour": {
        daily: "Track once per day",
        weekly: "Track 1-2 times per week",
        monthly: "Track once per month",
      },
      "2hours": {
        daily: "Track once per day",
        weekly: "Track once per week",
        monthly: "Track once per month",
      },
    };

    return frequencies[time]?.[method] || "Track as needed";
  };

  const getMotivationTips = (motivation) => {
    const tips = {
      self_improvement: [
        "Set small, achievable milestones",
        "Celebrate progress, not just completion",
        "Keep a progress journal",
        "Share your journey with others",
      ],
      health: [
        "Focus on how you feel, not just numbers",
        "Track energy levels and mood",
        "Set realistic health milestones",
        "Find an accountability partner",
      ],
      career: [
        "Align goals with career objectives",
        "Track skill development progress",
        "Set quarterly career milestones",
        "Document achievements for your resume",
      ],
      balance: [
        "Schedule regular check-ins with yourself",
        "Balance different life areas",
        "Set boundaries for work and life",
        "Practice self-care regularly",
      ],
    };

    return tips[motivation] || tips.self_improvement;
  };

  const getProgressMetrics = (area) => {
    const metrics = {
      health: [
        {
          name: "Consistency Score",
          description: "Track your adherence to the routine",
        },
        { name: "Energy Levels", description: "Monitor your daily energy" },
        {
          name: "Mood Tracking",
          description: "Record your emotional well-being",
        },
        {
          name: "Physical Progress",
          description: "Measure physical improvements",
        },
      ],
      productivity: [
        {
          name: "Task Completion Rate",
          description: "Track completed vs. planned tasks",
        },
        { name: "Focus Time", description: "Monitor deep work sessions" },
        {
          name: "Efficiency Score",
          description: "Measure time spent vs. output",
        },
        { name: "Quality Metrics", description: "Assess work quality" },
      ],
      learning: [
        {
          name: "Knowledge Retention",
          description: "Track what you've learned",
        },
        { name: "Skill Proficiency", description: "Measure skill development" },
        { name: "Learning Hours", description: "Monitor study time" },
        {
          name: "Application Rate",
          description: "Track practical application",
        },
      ],
      mindfulness: [
        { name: "Meditation Streak", description: "Track consecutive days" },
        { name: "Stress Levels", description: "Monitor stress reduction" },
        { name: "Mindfulness Minutes", description: "Track practice time" },
        {
          name: "Emotional Balance",
          description: "Measure emotional stability",
        },
      ],
      finance: [
        { name: "Savings Rate", description: "Track money saved" },
        {
          name: "Budget Adherence",
          description: "Monitor spending vs. budget",
        },
        { name: "Investment Growth", description: "Track investment returns" },
        { name: "Debt Reduction", description: "Monitor debt decrease" },
      ],
      social: [
        {
          name: "Connection Quality",
          description: "Track meaningful interactions",
        },
        { name: "Social Activities", description: "Monitor social engagement" },
        {
          name: "Relationship Growth",
          description: "Measure relationship development",
        },
        {
          name: "Communication Skills",
          description: "Track communication improvement",
        },
      ],
    };

    return metrics[area] || metrics.health;
  };

  const handleAddGoal = (goal) => {
    const newTracker = {
      id: Date.now(), // Generate a unique ID
      title: goal.title,
      description: goal.description,
      startDate: new Date().toISOString().split("T")[0],
      endDate: null,
      dailyGoal: goal.dailyGoal,
      weeklyGoal: goal.dailyGoal * 7,
      monthlyGoal: goal.dailyGoal * 30,
      totalGoal: goal.dailyGoal * 30, // Set initial total goal to monthly goal
      currentProgress: 0,
      imgName: goal.imgName,
      category: goal.category,
      unit: goal.unit.substring(0, 3).toUpperCase(), // Limit to 3 characters and uppercase
      entries: [],
    };

    addTracker(newTracker);
    toast.success(`Added ${goal.title} to your trackers!`);
  };

  const handleViewDetails = (goal) => {
    setSelectedGoal(goal);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-6 border border-indigo-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Goal Recommendations
              </h1>
              <p className="text-gray-600 mt-1">
                Find your perfect goals based on your preferences
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <i className="fas fa-bullseye text-indigo-600 text-lg"></i>
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
              <div className="text-center p-3 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <i className="fas fa-clock text-orange-600 text-lg"></i>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">21</div>
                  <div className="text-xs font-medium text-orange-500">
                    Avg. Days
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Survey */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-100">
              {!showRecommendations ? (
                // Survey Questions
                <motion.div
                  key="survey"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="max-w-3xl mx-auto"
                >
                  <div className="flex justify-between items-center mb-8">
                    <div className="text-sm font-medium text-gray-600">
                      Question {currentStep + 1} of {questions.length}
                    </div>
                    <div className="w-1/2 bg-gray-200 rounded-full h-2.5">
                      <motion.div
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${
                            ((currentStep + 1) / questions.length) * 100
                          }%`,
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center mb-10"
                  >
                    <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                      {questions[currentStep].question}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {questions[currentStep].options.map((option) => (
                        <motion.button
                          key={option.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() =>
                            handleAnswer(questions[currentStep].id, option.id)
                          }
                          className="p-5 bg-gradient-to-br from-white to-gray-50 rounded-2xl border-2 border-gray-200 hover:border-indigo-400 transition-all duration-300 shadow-lg hover:shadow-lg"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                              <i
                                className={`fas ${option.icon} text-indigo-600 text-xl`}
                              ></i>
                            </div>
                            <span className="text-gray-900 font-medium text-lg">
                              {option.label}
                            </span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                // Recommendations
                <motion.div
                  key="recommendations"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent truncate">
                      Your Personalized Plan
                    </h2>
                    <p className="text-gray-600 text-base sm:text-lg line-clamp-2">
                      Based on your preferences, here's your customized plan
                    </p>
                  </div>

                  {/* Recommended Goals Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {getRecommendations()?.recommendations?.map(
                      (goal, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-md border border-indigo-100 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex items-center gap-4 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center flex-shrink-0">
                              <i
                                className={`fas fa-${goal.imgName} text-indigo-600 text-lg`}
                              ></i>
                            </div>
                            <div className="min-w-0 flex-grow">
                              <h4 className="font-semibold text-gray-900 truncate">
                                {goal.title}
                              </h4>
                              <p className="text-gray-600 text-sm line-clamp-2">
                                {goal.description}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleViewDetails(goal)}
                                className="px-3 py-1 text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-600 transition-colors duration-300 hover:text-white"
                                title="View Details"
                              >
                                Details
                              </button>
                              <button
                                onClick={() => handleAddGoal(goal)}
                                className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                                title="Add to Trackers"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>
                              <i className="fas fa-clock mr-1"></i>
                              {goal.dailyGoal} {goal.unit}
                            </span>
                            <span>
                              <i className="fas fa-tag mr-1"></i>
                              {goal.category}
                            </span>
                          </div>
                        </motion.div>
                      )
                    )}
                  </div>

                  {/* Additional Content Sections */}
                  <div className="space-y-8">
                    {/* Progress Tracking Section */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-md border border-indigo-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <i className="fas fa-chart-line text-indigo-500"></i>
                        Track Your Progress
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {getRecommendations()?.progressMetrics?.map(
                          (metric, index) => (
                            <div
                              key={index}
                              className="bg-indigo-50 rounded-lg p-4"
                            >
                              <h4 className="font-semibold text-indigo-900 mb-2">
                                {metric.name}
                              </h4>
                              <p className="text-indigo-700 text-sm">
                                {metric.description}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Motivation Tips Section */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-md border border-indigo-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <i className="fas fa-star text-yellow-500"></i>
                        Stay Motivated
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {getRecommendations()?.motivationTips?.map(
                          (tip, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4"
                            >
                              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink0">
                                <i className="fas fa-lightbulb text-yellow-600"></i>
                              </div>
                              <p className="text-gray-700">{tip}</p>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Tracking Frequency Section */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-md border border-indigo-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <i className="fas fa-calendar-check text-green-500"></i>
                        Recommended Tracking Schedule
                      </h3>
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <i className="fas fa-clock text-green-600 text-xl"></i>
                          <p className="text-green-800 font-medium">
                            {getRecommendations()?.trackingFrequency}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Success Tips Section */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-md border border-indigo-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <i className="fas fa-trophy text-purple-500"></i>
                        Tips for Success
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-purple-50 rounded-lg p-4">
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                            <i className="fas fa-bullseye text-purple-600"></i>
                          </div>
                          <h4 className="font-semibold text-purple-900 mb-2">
                            Set Clear Milestones
                          </h4>
                          <p className="text-purple-700 text-sm">
                            Break down your goals into smaller, achievable
                            milestones to track progress effectively.
                          </p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4">
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                            <i className="fas fa-users text-purple-600"></i>
                          </div>
                          <h4 className="font-semibold text-purple-900 mb-2">
                            Find Accountability
                          </h4>
                          <p className="text-purple-700 text-sm">
                            Share your goals with friends or join a community to
                            stay motivated and accountable.
                          </p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4">
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                            <i className="fas fa-chart-bar text-purple-600"></i>
                          </div>
                          <h4 className="font-semibold text-purple-900 mb-2">
                            Track Progress
                          </h4>
                          <p className="text-purple-700 text-sm">
                            Regularly review your progress and adjust your
                            approach as needed to stay on track.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Add All Button */}
                  <div className="flex justify-center gap-4 mb-8">
                    <button
                      onClick={handleRedoSurvey}
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 ease-in-out shadow-lg hover:shadow-lg flex items-center gap-2"
                    >
                      <i className="fas fa-redo"></i>
                      Redo Survey
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Column - Statistics */}
          <div className="space-y-6">
            {/* Category Distribution */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="fas fa-chart-pie text-indigo-500"></i>
                Popular Categories
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Health & Fitness</span>
                  <span className="font-bold text-indigo-600">45%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500"
                    style={{ width: "45%" }}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Productivity</span>
                  <span className="font-bold text-purple-600">30%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500"
                    style={{ width: "30%" }}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Learning</span>
                  <span className="font-bold text-pink-600">25%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-pink-500"
                    style={{ width: "25%" }}
                  />
                </div>
              </div>
            </div>

            {/* Time Distribution */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="fas fa-clock text-indigo-500"></i>
                Time Distribution
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">15 minutes</span>
                  <span className="font-bold text-indigo-600">40%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500"
                    style={{ width: "40%" }}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">30 minutes</span>
                  <span className="font-bold text-purple-600">35%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500"
                    style={{ width: "35%" }}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">1+ hour</span>
                  <span className="font-bold text-pink-600">25%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-pink-500"
                    style={{ width: "25%" }}
                  />
                </div>
              </div>
            </div>

            {/* Experience Levels */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="fas fa-chart-line text-indigo-500"></i>
                Experience Levels
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Beginner</span>
                  <span className="font-bold text-indigo-600">50%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500"
                    style={{ width: "50%" }}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Intermediate</span>
                  <span className="font-bold text-purple-600">35%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500"
                    style={{ width: "35%" }}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Advanced</span>
                  <span className="font-bold text-pink-600">15%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-pink-500"
                    style={{ width: "15%" }}
                  />
                </div>
              </div>
            </div>

            {/* Community Insights */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="fas fa-users text-indigo-500"></i>
                Community Insights
              </h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <i className="fas fa-star text-blue-600"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900">
                        Most Popular Goal
                      </h4>
                      <p className="text-blue-700 text-sm">Daily Meditation</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <i className="fas fa-fire text-purple-600"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-900">
                        Trending Now
                      </h4>
                      <p className="text-purple-700 text-sm">
                        Morning Routines
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Success Stories */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="fas fa-trophy text-indigo-500"></i>
                Success Stories
              </h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-user text-green-600"></i>
                    </div>
                    <div>
                      <p className="text-green-800 text-sm italic">
                        "Started with 15-minute daily meditation. Now I'm more
                        focused and productive than ever!"
                      </p>
                      <p className="text-green-600 text-xs mt-2">- Sarah M.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-user text-green-600"></i>
                    </div>
                    <div>
                      <p className="text-green-800 text-sm italic">
                        "The productivity tips helped me achieve my career goals
                        faster than expected."
                      </p>
                      <p className="text-green-600 text-xs mt-2">
                        - Michael R.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Helpful Resources */}
          </div>
        </div>

        {/* Goal Details Modal */}
        {selectedGoal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lgl"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <i
                      className={`fas fa-${selectedGoal.imgName} text-indigo-600 text-xl`}
                    ></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedGoal.title}
                    </h3>
                    <p className="text-gray-600">{selectedGoal.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedGoal(null)}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-indigo-50 rounded-xl p-4">
                    <h4 className="font-medium text-indigo-900 mb-3">
                      Benefits
                    </h4>
                    <ul className="space-y-2">
                      {selectedGoal.benefits.map((benefit, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-3 text-indigo-700"
                        >
                          <i className="fas fa-check text-indigo-500"></i>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-50 rounded-xl p-4">
                    <h4 className="font-medium text-green-900 mb-3">Tips</h4>
                    <ul className="space-y-2">
                      {selectedGoal.tips.map((tip, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-3 text-green-700"
                        >
                          <i className="fas fa-lightbulb text-green-500"></i>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-purple-50 rounded-xl p-4">
                    <h4 className="font-medium text-purple-900 mb-3">
                      Resources
                    </h4>
                    <ul className="space-y-2">
                      {selectedGoal.resources.map((resource, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-3 text-purple-700"
                        >
                          <i className="fas fa-link text-purple-500"></i>
                          {resource}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4">
                    <h4 className="font-medium text-blue-900 mb-3">
                      Goal Details
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-blue-700">Daily Goal:</span>
                        <span className="font-medium">
                          {selectedGoal.dailyGoal} {selectedGoal.unit}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Category:</span>
                        <span className="font-medium">
                          {selectedGoal.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedGoal(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
                >
                  Close
                </button>
                <button
                  onClick={() => handleAddGoal(selectedGoal)}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl hover:from-indigo-600 hover:to-blue-600 transition-colors duration-300 shadow-lg hover:shadow-lg"
                >
                  Add to Trackers
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
