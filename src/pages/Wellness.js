import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Line, Bar, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import Footer from "../components/Footer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const Wellness = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize user data
  const [userData, setUserData] = useState(() => {
    const savedData = localStorage.getItem("userData");
    return savedData
      ? JSON.parse(savedData)
      : {
          mood: [],
          stressLevel: 50,
          meditationMinutes: 0,
          wellnessCheckIns: [],
          journal: [],
          sleepData: [],
          exerciseData: [],
          nutritionData: [],
          socialConnections: [],
          mindfulnessScores: [],
          energyLevels: [],
          productivityScores: [],
          gratitudeEntries: [],
          goals: [],
          habits: [],
          xp: 0,
        };
  });

  // Modal states
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [showMeditationModal, setShowMeditationModal] = useState(false);
  const [showJournalModal, setShowJournalModal] = useState(false);
  const [showWellnessModal, setShowWellnessModal] = useState(false);

  // Form states
  const [currentMood, setCurrentMood] = useState("");
  const [currentStressLevel, setCurrentStressLevel] = useState(50);
  const [meditationTimer, setMeditationTimer] = useState(0);
  const [meditationRunning, setMeditationRunning] = useState(false);
  const [meditationType, setMeditationType] = useState("mindfulness");
  const [journalEntry, setJournalEntry] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);

  // Wellness data state
  const [wellnessData, setWellnessData] = useState({
    sleep: {
      hours: 8,
      quality: 7,
      deepSleep: 2,
      interruptions: 0,
    },
    nutrition: {
      water: 8,
      meals: 3,
      healthyMeals: 2,
      snacks: 2,
    },
    exercise: {
      minutes: 30,
      type: "cardio",
      intensity: "moderate",
      steps: 8000,
    },
    energy: {
      morning: 7,
      afternoon: 6,
      evening: 5,
    },
    productivity: {
      focus: 7,
      tasksCompleted: 5,
      breaks: 3,
    },
    social: {
      interactions: 5,
      quality: 7,
      support: 8,
    },
  });

  // AI Insights state
  const [aiInsights, setAiInsights] = useState({
    moodTrend: "",
    sleepQuality: "",
    exerciseRecommendation: "",
    stressManagement: "",
    overallWellness: "",
    tips: [],
    motivation: "",
    areasForImprovement: [],
  });

  const [showAiInsights, setShowAiInsights] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showEntryDetails, setShowEntryDetails] = useState(false);
  const [selectedEntryType, setSelectedEntryType] = useState(null);

  // Timer effect for meditation
  useEffect(() => {
    let interval;
    if (meditationRunning) {
      interval = setInterval(() => {
        setMeditationTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [meditationRunning]);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
    generateAIInsights();
  }, [userData]);

  // Control body scrolling when modals are open
  useEffect(() => {
    const isModalOpen =
      showMoodModal ||
      showMeditationModal ||
      showJournalModal ||
      showWellnessModal;
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showMoodModal, showMeditationModal, showJournalModal, showWellnessModal]);

  // Handle navigation state to show appropriate modal
  useEffect(() => {
    if (location.state) {
      if (location.state.showJournalModal) {
        setShowJournalModal(true);
      }
      if (location.state.showMeditationModal) {
        setShowMeditationModal(true);
      }
    }
  }, [location.state]);

  // Utility functions
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Score calculation functions
  const calculateSleepScore = () => {
    if (userData.wellnessCheckIns.length === 0) return 0;
    const recentSleep = userData.wellnessCheckIns.slice(-7);
    const avgHours =
      recentSleep.reduce((acc, curr) => acc + curr.sleep.hours, 0) /
      recentSleep.length;
    const avgQuality =
      recentSleep.reduce((acc, curr) => acc + curr.sleep.quality, 0) /
      recentSleep.length;

    const hoursScore = Math.min(100, (avgHours / 8) * 100);
    const qualityScore = (avgQuality / 10) * 100;

    return Math.round((hoursScore + qualityScore) / 2);
  };

  const calculateExerciseScore = () => {
    if (userData.wellnessCheckIns.length === 0) return 0;
    const recentExercise = userData.wellnessCheckIns.slice(-7);
    const avgMinutes =
      recentExercise.reduce((acc, curr) => acc + curr.exercise.minutes, 0) /
      recentExercise.length;
    const avgSteps =
      recentExercise.reduce((acc, curr) => acc + curr.exercise.steps, 0) /
      recentExercise.length;

    const minutesScore = Math.min(100, (avgMinutes / 60) * 100);
    const stepsScore = Math.min(100, (avgSteps / 10000) * 100);

    return Math.round((minutesScore + stepsScore) / 2);
  };

  const calculateNutritionScore = () => {
    if (userData.wellnessCheckIns.length === 0) return 0;
    const recentNutrition = userData.wellnessCheckIns.slice(-7);
    const avgHealthyMeals =
      recentNutrition.reduce(
        (acc, curr) => acc + curr.nutrition.healthyMeals,
        0
      ) / recentNutrition.length;
    const avgWater =
      recentNutrition.reduce((acc, curr) => acc + curr.nutrition.water, 0) /
      recentNutrition.length;

    const mealsScore = Math.min(100, (avgHealthyMeals / 3) * 100);
    const waterScore = Math.min(100, (avgWater / 8) * 100);

    return Math.round((mealsScore + waterScore) / 2);
  };

  const calculateStressScore = () => {
    if (userData.mood.length === 0) return 0;
    const recentStress = userData.mood.slice(-7);
    const avgStress =
      recentStress.reduce((acc, curr) => acc + curr.stressLevel, 0) /
      recentStress.length;
    return Math.round(100 - avgStress);
  };

  const calculateSocialScore = () => {
    if (userData.wellnessCheckIns.length === 0) return 0;
    const recentSocial = userData.wellnessCheckIns.slice(-7);
    const avgQuality =
      recentSocial.reduce((acc, curr) => acc + curr.social.quality, 0) /
      recentSocial.length;
    const avgSupport =
      recentSocial.reduce((acc, curr) => acc + curr.social.support, 0) /
      recentSocial.length;

    const qualityScore = (avgQuality / 10) * 100;
    const supportScore = (avgSupport / 10) * 100;

    return Math.round((qualityScore + supportScore) / 2);
  };

  const calculateEnergyScore = () => {
    if (userData.wellnessCheckIns.length === 0) return 0;
    const recentEnergy = userData.wellnessCheckIns.slice(-7);
    const avgMorning =
      recentEnergy.reduce((acc, curr) => acc + curr.energy.morning, 0) /
      recentEnergy.length;
    const avgAfternoon =
      recentEnergy.reduce((acc, curr) => acc + curr.energy.afternoon, 0) /
      recentEnergy.length;
    const avgEvening =
      recentEnergy.reduce((acc, curr) => acc + curr.energy.evening, 0) /
      recentEnergy.length;

    const avgEnergy = (avgMorning + avgAfternoon + avgEvening) / 3;
    return Math.round((avgEnergy / 10) * 100);
  };

  const calculateWellnessScore = () => {
    if (userData.wellnessCheckIns.length === 0) return 0;

    const scores = {
      sleep: calculateSleepScore(),
      exercise: calculateExerciseScore(),
      nutrition: calculateNutritionScore(),
      stress: calculateStressScore(),
      social: calculateSocialScore(),
      energy: calculateEnergyScore(),
    };

    return Math.round(
      Object.values(scores).reduce((acc, curr) => acc + curr, 0) /
        Object.keys(scores).length
    );
  };

  // Event handlers
  const handleMoodSubmit = () => {
    if (!currentMood) {
      toast.error("Please select a mood");
      return;
    }

    const newMood = {
      date: new Date().toISOString(),
      mood: currentMood,
      stressLevel: currentStressLevel,
      sleepQuality: wellnessData.sleep.quality,
      energyLevel: wellnessData.energy.morning,
    };

    setUserData((prev) => ({
      ...prev,
      mood: [...prev.mood, newMood],
      xp: (prev.xp || 0) + 10,
    }));

    setShowMoodModal(false);
    setCurrentMood("");
    setCurrentStressLevel(50);
    toast.success("Mood recorded successfully!");
  };

  const handleMeditationComplete = () => {
    const minutes = Math.floor(meditationTimer / 60);
    if (minutes < 1) {
      toast.error("Please meditate for at least 1 minute");
      return;
    }

    const newMeditation = {
      date: new Date().toISOString(),
      duration: minutes,
      type: meditationType,
    };

    setUserData((prev) => ({
      ...prev,
      meditationMinutes: prev.meditationMinutes + minutes,
      mindfulnessScores: [...prev.mindfulnessScores, newMeditation],
      xp: (prev.xp || 0) + minutes * 2,
    }));

    setMeditationTimer(0);
    setMeditationRunning(false);
    setShowMeditationModal(false);
    toast.success(`Great meditation session! +${minutes * 2} XP`);
  };

  const handleJournalSubmit = () => {
    if (!journalEntry.trim()) {
      toast.error("Please write something in your journal");
      return;
    }

    const newEntry = {
      date: new Date().toISOString(),
      content: journalEntry,
      mood: currentMood,
      tags: selectedTags,
      energyLevel: wellnessData.energy.morning,
      productivity: wellnessData.productivity.focus,
    };

    setUserData((prev) => ({
      ...prev,
      journal: [...prev.journal, newEntry],
      xp: (prev.xp || 0) + 20,
    }));

    setJournalEntry("");
    setSelectedTags([]);
    setShowJournalModal(false);
    toast.success("Journal entry saved! +20 XP");
  };

  const handleWellnessSubmit = () => {
    const newCheckIn = {
      date: new Date().toISOString(),
      ...wellnessData,
    };

    setUserData((prev) => {
      // Ensure all arrays exist before spreading
      const updatedData = {
        ...prev,
        wellnessCheckIns: [...(prev.wellnessCheckIns || []), newCheckIn],
        sleepData: [...(prev.sleepData || []), wellnessData.sleep],
        exerciseData: [...(prev.exerciseData || []), wellnessData.exercise],
        nutritionData: [...(prev.nutritionData || []), wellnessData.nutrition],
        energyLevels: [...(prev.energyLevels || []), wellnessData.energy],
        productivityScores: [
          ...(prev.productivityScores || []),
          wellnessData.productivity,
        ],
        socialConnections: [
          ...(prev.socialConnections || []),
          wellnessData.social,
        ],
        xp: (prev.xp || 0) + 30,
      };

      // Ensure all required arrays exist
      if (!updatedData.mood) updatedData.mood = [];
      if (!updatedData.journal) updatedData.journal = [];
      if (!updatedData.mindfulnessScores) updatedData.mindfulnessScores = [];
      if (!updatedData.gratitudeEntries) updatedData.gratitudeEntries = [];
      if (!updatedData.goals) updatedData.goals = [];
      if (!updatedData.habits) updatedData.habits = [];

      return updatedData;
    });

    setShowWellnessModal(false);
    toast.success("Wellness check-in completed! +30 XP");
  };

  // AI Insights generation
  const generateAIInsights = () => {
    const insights = {
      moodTrend: analyzeMoodTrend(),
      sleepQuality: analyzeSleepQuality(),
      exerciseRecommendation: generateExerciseRecommendation(),
      stressManagement: generateStressManagementTips(),
      overallWellness: generateOverallWellnessInsight(),
      tips: generateWellnessTips(),
      motivation: generateMotivation(),
      areasForImprovement: identifyAreasForImprovement(),
    };
    setAiInsights(insights);
    setShowAiInsights(true);
  };

  const analyzeMoodTrend = () => {
    if (userData.mood.length < 2)
      return "Not enough data to analyze mood trends.";

    const recentMoods = userData.mood.slice(-7);
    const moodCounts = recentMoods.reduce((acc, curr) => {
      acc[curr.mood] = (acc[curr.mood] || 0) + 1;
      return acc;
    }, {});

    const dominantMood = Object.entries(moodCounts).sort(
      (a, b) => b[1] - a[1]
    )[0];
    const avgStress =
      recentMoods.reduce((acc, curr) => acc + curr.stressLevel, 0) /
      recentMoods.length;

    return `Your dominant mood has been ${dominantMood[0]} (${Math.round(
      (dominantMood[1] / recentMoods.length) * 100
    )}% of the time). Average stress level: ${Math.round(avgStress)}%.`;
  };

  const analyzeSleepQuality = () => {
    if (userData.wellnessCheckIns.length < 2)
      return "Not enough sleep data to analyze.";

    const recentSleep = userData.wellnessCheckIns.slice(-7);
    const avgHours =
      recentSleep.reduce((acc, curr) => acc + curr.sleep.hours, 0) /
      recentSleep.length;
    const avgQuality =
      recentSleep.reduce((acc, curr) => acc + curr.sleep.quality, 0) /
      recentSleep.length;

    let recommendation = "";
    if (avgHours < 7) {
      recommendation =
        "Consider increasing your sleep duration for better health.";
    } else if (avgHours > 9) {
      recommendation =
        "You're getting plenty of sleep. Focus on quality over quantity.";
    } else {
      recommendation = "Great sleep duration! Keep it up.";
    }

    return `Average sleep: ${avgHours.toFixed(
      1
    )} hours with quality rating of ${avgQuality.toFixed(
      1
    )}/10. ${recommendation}`;
  };

  const generateExerciseRecommendation = () => {
    if (userData.wellnessCheckIns.length < 2)
      return "Not enough exercise data to analyze.";

    const recentExercise = userData.wellnessCheckIns.slice(-7);
    const avgMinutes =
      recentExercise.reduce((acc, curr) => acc + curr.exercise.minutes, 0) /
      recentExercise.length;
    const exerciseTypes = recentExercise.reduce((acc, curr) => {
      acc[curr.exercise.type] = (acc[curr.exercise.type] || 0) + 1;
      return acc;
    }, {});

    const mostCommonType = Object.entries(exerciseTypes).sort(
      (a, b) => b[1] - a[1]
    )[0][0];

    let recommendation = "";
    if (avgMinutes < 30) {
      recommendation = "Try to increase your daily exercise to 30 minutes.";
    } else if (avgMinutes > 60) {
      recommendation =
        "Great job! Consider adding some variety to your routine.";
    } else {
      recommendation = "Excellent exercise routine! Keep it up.";
    }

    return `You're averaging ${Math.round(
      avgMinutes
    )} minutes of ${mostCommonType} daily. ${recommendation}`;
  };

  const generateStressManagementTips = () => {
    if (userData.mood.length < 2)
      return "Not enough data to analyze stress levels.";

    const recentStress =
      userData.mood.slice(-7).reduce((acc, curr) => acc + curr.stressLevel, 0) /
      7;
    const meditationMinutes = userData.meditationMinutes || 0;

    let recommendation = "";
    if (recentStress > 70) {
      recommendation =
        "Consider incorporating more meditation and relaxation techniques.";
    } else if (recentStress > 50) {
      recommendation =
        "Your stress management is okay, but could be improved with more mindfulness practice.";
    } else {
      recommendation =
        "Your stress management is effective! Keep up the good work.";
    }

    return `Average stress level: ${Math.round(
      recentStress
    )}%. Total meditation minutes: ${meditationMinutes}. ${recommendation}`;
  };

  const generateOverallWellnessInsight = () => {
    const wellnessScore = calculateWellnessScore();
    const recentCheckIns = userData.wellnessCheckIns.length;

    let insight = "";
    if (wellnessScore > 80) {
      insight = "Excellent! Keep up the great work!";
    } else if (wellnessScore > 60) {
      insight = "Good progress! Focus on areas that need improvement.";
    } else {
      insight = "There's room for improvement in your wellness routine.";
    }

    return `Overall wellness score: ${wellnessScore}/100. ${recentCheckIns} check-ins recorded. ${insight}`;
  };

  const generateWellnessTips = () => {
    const tips = [];
    const sleepScore = calculateSleepScore();
    const exerciseScore = calculateExerciseScore();
    const nutritionScore = calculateNutritionScore();
    const stressScore = calculateStressScore();

    if (sleepScore < 70) {
      tips.push({
        category: "Sleep",
        tip: "Try to maintain a consistent sleep schedule and aim for 7-9 hours of sleep.",
        icon: "fa-moon",
      });
    }
    if (exerciseScore < 70) {
      tips.push({
        category: "Exercise",
        tip: "Incorporate at least 30 minutes of moderate exercise into your daily routine.",
        icon: "fa-running",
      });
    }
    if (nutritionScore < 70) {
      tips.push({
        category: "Nutrition",
        tip: "Focus on balanced meals and stay hydrated throughout the day.",
        icon: "fa-apple-alt",
      });
    }
    if (stressScore < 70) {
      tips.push({
        category: "Stress",
        tip: "Practice mindfulness and take regular breaks to manage stress levels.",
        icon: "fa-spa",
      });
    }
    return tips;
  };

  const generateMotivation = () => {
    const wellnessScore = calculateWellnessScore();
    if (wellnessScore > 80) {
      return "You're doing amazing! Keep up the great work and inspire others with your dedication to wellness.";
    } else if (wellnessScore > 60) {
      return "You're making good progress! Every small step counts towards a healthier lifestyle.";
    } else {
      return "Remember, wellness is a journey, not a destination. Every day is a new opportunity to improve.";
    }
  };

  const identifyAreasForImprovement = () => {
    const areas = [];
    const scores = {
      Sleep: calculateSleepScore(),
      Exercise: calculateExerciseScore(),
      Nutrition: calculateNutritionScore(),
      Stress: calculateStressScore(),
      Social: calculateSocialScore(),
      Energy: calculateEnergyScore(),
    };

    Object.entries(scores).forEach(([area, score]) => {
      if (score < 70) {
        areas.push({
          area,
          score,
          suggestion: getImprovementSuggestion(area, score),
        });
      }
    });

    return areas;
  };

  const getImprovementSuggestion = (area, score) => {
    const suggestions = {
      Sleep:
        "Try to maintain a consistent sleep schedule and create a relaxing bedtime routine.",
      Exercise:
        "Start with small, achievable goals and gradually increase your activity level.",
      Nutrition:
        "Focus on incorporating more whole foods and staying hydrated throughout the day.",
      Stress:
        "Practice mindfulness and take regular breaks to manage stress levels.",
      Social: "Make time for meaningful connections and social activities.",
      Energy:
        "Pay attention to your energy patterns and adjust your daily routine accordingly.",
    };
    return suggestions[area];
  };

  // Chart data preparation functions
  const prepareMoodChartData = () => ({
    labels: userData.mood
      .slice(-7)
      .map((m) => new Date(m.date).toLocaleDateString()),
    datasets: [
      {
        label: "Mood Level",
        data: userData.mood
          .slice(-7)
          .map((m) =>
            m.mood === "happy" ? 1 : m.mood === "neutral" ? 0.5 : 0
          ),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });

  const prepareSleepChartData = () => ({
    labels: userData.wellnessCheckIns
      .slice(-7)
      .map((w) => new Date(w.date).toLocaleDateString()),
    datasets: [
      {
        label: "Sleep Hours",
        data: userData.wellnessCheckIns.slice(-7).map((w) => w.sleep.hours),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  });

  const prepareWellnessRadarData = () => ({
    labels: ["Sleep", "Exercise", "Nutrition", "Stress", "Social", "Energy"],
    datasets: [
      {
        label: "Wellness Score",
        data: [
          calculateSleepScore(),
          calculateExerciseScore(),
          calculateNutritionScore(),
          calculateStressScore(),
          calculateSocialScore(),
          calculateEnergyScore(),
        ],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  });

  // Meditation handlers
  const handleMeditationStart = () => {
    setMeditationRunning(true);
  };

  const handleMeditationPause = () => {
    setMeditationRunning(false);
  };

  const handleMeditationReset = () => {
    setMeditationRunning(false);
    setMeditationTimer(0);
  };

  // Add function to handle viewing entry details
  const handleViewEntryDetails = (entry, type) => {
    setSelectedEntry(entry);
    setSelectedEntryType(type);
    setShowEntryDetails(true);
  };

  // Add function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Add delete handlers for each type of entry
  const handleDeleteEntry = () => {
    if (!selectedEntry || !selectedEntryType) return;

    setUserData((prev) => {
      const newData = { ...prev };

      switch (selectedEntryType) {
        case "mood":
          newData.mood = prev.mood.filter(
            (entry) => entry.date !== selectedEntry.date
          );
          break;
        case "journal":
          newData.journal = prev.journal.filter(
            (entry) => entry.date !== selectedEntry.date
          );
          break;
        case "meditation":
          newData.mindfulnessScores = prev.mindfulnessScores.filter(
            (entry) => entry.date !== selectedEntry.date
          );
          // Update total meditation minutes
          newData.meditationMinutes = Math.max(
            0,
            prev.meditationMinutes - selectedEntry.duration
          );
          break;
        case "wellness":
          newData.wellnessCheckIns = prev.wellnessCheckIns.filter(
            (entry) => entry.date !== selectedEntry.date
          );
          // Update related data arrays
          newData.sleepData = prev.sleepData.filter(
            (_, index) =>
              index !==
              prev.wellnessCheckIns.findIndex(
                (entry) => entry.date === selectedEntry.date
              )
          );
          newData.exerciseData = prev.exerciseData.filter(
            (_, index) =>
              index !==
              prev.wellnessCheckIns.findIndex(
                (entry) => entry.date === selectedEntry.date
              )
          );
          newData.nutritionData = prev.nutritionData.filter(
            (_, index) =>
              index !==
              prev.wellnessCheckIns.findIndex(
                (entry) => entry.date === selectedEntry.date
              )
          );
          newData.energyLevels = prev.energyLevels.filter(
            (_, index) =>
              index !==
              prev.wellnessCheckIns.findIndex(
                (entry) => entry.date === selectedEntry.date
              )
          );
          newData.productivityScores = prev.productivityScores.filter(
            (_, index) =>
              index !==
              prev.wellnessCheckIns.findIndex(
                (entry) => entry.date === selectedEntry.date
              )
          );
          newData.socialConnections = prev.socialConnections.filter(
            (_, index) =>
              index !==
              prev.wellnessCheckIns.findIndex(
                (entry) => entry.date === selectedEntry.date
              )
          );
          break;
        default:
          break;
      }

      return newData;
    });

    setShowEntryDetails(false);
    toast.success("Entry deleted successfully");
  };

  // ... rest of the component (JSX) ...

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-6 border border-indigo-100">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="min-w-0">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent truncate">
                Wellness Center
              </h1>
              <p className="text-gray-600 mt-1 line-clamp-2">
                Track your wellness journey and maintain a healthy lifestyle
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="text-center p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-heartbeat text-indigo-600 text-lg"></i>
                </div>
                <div className="min-w-0">
                  <div className="text-2xl font-bold text-indigo-600 truncate">
                    {calculateWellnessScore()}
                  </div>
                  <div className="text-xs font-medium text-indigo-500 truncate">
                    Wellness Score
                  </div>
                </div>
              </div>
              <div className="text-center p-3 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-moon text-purple-600 text-lg"></i>
                </div>
                <div className="min-w-0">
                  <div className="text-2xl font-bold text-purple-600 truncate">
                    {userData.wellnessCheckIns.length}
                  </div>
                  <div className="text-xs font-medium text-purple-500 truncate">
                    Check-ins
                  </div>
                </div>
              </div>
              <div className="text-center p-3 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-fire text-orange-600 text-lg"></i>
                </div>
                <div className="min-w-0">
                  <div className="text-2xl font-bold text-orange-600 truncate">
                    {userData.meditationMinutes}
                  </div>
                  <div className="text-xs font-medium text-orange-500 truncate">
                    Meditation Time
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Section - Overview and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Wellness Overview */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-indigo-100 p-6 h-full">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="fas fa-chart-radar text-indigo-500"></i>
                Wellness Overview
              </h2>
              <div className="h-96">
                <Radar data={prepareWellnessRadarData()} />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="h-full">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-indigo-100 p-6 h-full">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="fas fa-bolt text-indigo-500"></i>
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 gap-3 h-[calc(100%-3rem)]">
                <button
                  onClick={() => setShowMoodModal(true)}
                  className="flex items-center gap-3 p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                    <i className="fas fa-smile text-indigo-600 text-xl"></i>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-indigo-900">
                      Track Mood
                    </h3>
                    <p className="text-sm text-indigo-600">
                      How are you feeling?
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => setShowMeditationModal(true)}
                  className="flex items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <i className="fas fa-spa text-purple-600 text-xl"></i>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-purple-900">Meditate</h3>
                    <p className="text-sm text-purple-600">
                      Take a mindful break
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => setShowJournalModal(true)}
                  className="flex items-center gap-3 p-4 bg-gradient-to-br from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200 rounded-xl border border-pink-100 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                    <i className="fas fa-book text-pink-600 text-xl"></i>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-pink-900">Journal</h3>
                    <p className="text-sm text-pink-600">Reflect on your day</p>
                  </div>
                </button>
                <button
                  onClick={() => setShowWellnessModal(true)}
                  className="flex items-center gap-3 p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 rounded-xl border border-emerald-100 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <i className="fas fa-heartbeat text-emerald-600 text-xl"></i>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-emerald-900">
                      Wellness Check
                    </h3>
                    <p className="text-sm text-emerald-600">
                      Track your health
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Second Section - Mood Tracker and Recent Journals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Mood Tracker */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-indigo-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="fas fa-chart-line text-indigo-500"></i>
              Mood Tracker
            </h2>
            <div className="space-y-4">
              {userData.mood.length === 0 && <h1>Empty</h1>}
              {userData.mood.slice(-5).map((entry, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <i
                        className={`fas ${
                          entry.mood === "happy"
                            ? "fa-smile text-yellow-500"
                            : entry.mood === "sad"
                            ? "fa-frown text-blue-500"
                            : entry.mood === "excited"
                            ? "fa-grin-stars text-orange-500"
                            : entry.mood === "anxious"
                            ? "fa-flushed text-red-500"
                            : entry.mood === "tired"
                            ? "fa-tired text-purple-500"
                            : "fa-meh text-gray-500"
                        } text-2xl`}
                      ></i>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-indigo-900">
                        {formatDate(entry.date)}
                      </div>
                      <div className="text-sm text-indigo-600">
                        Stress: {entry.stressLevel}%
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleViewEntryDetails(entry, "mood")}
                    className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors flex items-center gap-2"
                  >
                    <i className="fas fa-eye"></i>
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Journals */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-indigo-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="fas fa-book-open text-indigo-500"></i>
              Recent Journal Entries
            </h2>
            <div className="space-y-4">
              {userData.journal.length === 0 && <h1>Empty</h1>}
              {userData.journal.slice(-3).map((entry, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-purple-900">
                      {formatDate(entry.date)}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <i
                          className={`fas fa-smile ${
                            entry.mood === "happy"
                              ? "text-yellow-500"
                              : entry.mood === "sad"
                              ? "text-blue-500"
                              : "text-gray-500"
                          }`}
                        ></i>
                      </div>
                      <button
                        onClick={() => handleViewEntryDetails(entry, "journal")}
                        className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors flex items-center gap-2"
                      >
                        <i className="fas fa-eye"></i>
                        View Details
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-700 line-clamp-3">{entry.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insights Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-6 border border-indigo-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <i className="fas fa-brain text-indigo-500"></i>
              AI Wellness Insights
            </h2>
            <button
              onClick={generateAIInsights}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <i className="fas fa-sync-alt"></i>
              Generate Insights
            </button>
          </div>

          {!showAiInsights ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-100 flex items-center justify-center">
                <i className="fas fa-brain text-indigo-600 text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Insights Generated Yet
              </h3>
              <p className="text-gray-600">
                Click the "Generate Insights" button above to get personalized
                wellness insights.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                      <i className="fas fa-chart-line text-indigo-600 text-xl"></i>
                    </div>
                    <h3 className="font-semibold text-indigo-900 text-lg">
                      Mood Trend
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {aiInsights.moodTrend}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                      <i className="fas fa-moon text-purple-600 text-xl"></i>
                    </div>
                    <h3 className="font-semibold text-purple-900 text-lg">
                      Sleep Quality
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {aiInsights.sleepQuality}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border border-pink-100 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                      <i className="fas fa-running text-pink-600 text-xl"></i>
                    </div>
                    <h3 className="font-semibold text-pink-900 text-lg">
                      Exercise Recommendation
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {aiInsights.exerciseRecommendation}
                  </p>
                </div>
              </div>

              {/* Wellness Tips */}
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-100">
                <h3 className="text-xl font-semibold text-emerald-900 mb-4 flex items-center gap-2">
                  <i className="fas fa-lightbulb text-emerald-600"></i>
                  Personalized Tips
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {aiInsights.tips.map((tip, index) => (
                    <div
                      key={index}
                      className="bg-white/80 rounded-lg p-4 border border-emerald-100"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <i className={`fas ${tip.icon} text-emerald-600`}></i>
                        <span className="font-medium text-emerald-900">
                          {tip.category}
                        </span>
                      </div>
                      <p className="text-gray-700">{tip.tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Areas for Improvement */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-100">
                <h3 className="text-xl font-semibold text-amber-900 mb-4 flex items-center gap-2">
                  <i className="fas fa-chart-bar text-amber-600"></i>
                  Areas for Improvement
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {aiInsights.areasForImprovement.map((area, index) => (
                    <div
                      key={index}
                      className="bg-white/80 rounded-lg p-4 border border-amber-100"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-amber-900">
                          {area.area}
                        </span>
                        <span className="text-sm text-amber-600">
                          Score: {area.score}%
                        </span>
                      </div>
                      <p className="text-gray-700">{area.suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Motivation */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-100">
                <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center gap-2">
                  <i className="fas fa-star text-blue-600"></i>
                  Motivation
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {aiInsights.motivation}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Data Visualization Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-6 border border-indigo-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <i className="fas fa-chart-bar text-indigo-500"></i>
                Wellness Analytics
              </h2>
              <p className="text-sm text-gray-500">
                Track your wellness journey
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-100">
              <h3 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center gap-2">
                <i className="fas fa-smile text-indigo-600"></i>
                Mood Trends
              </h3>
              <div className="h-80">
                <Line data={prepareMoodChartData()} />
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-100">
              <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center gap-2">
                <i className="fas fa-moon text-purple-600"></i>
                Sleep Patterns
              </h3>
              <div className="h-80">
                <Bar data={prepareSleepChartData()} />
              </div>
            </div>
          </div>
        </div>

        {/* Entry Details Modal */}
        {showEntryDetails && selectedEntry && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden rounded-none">
              <div className="p-6 overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <i
                        className={`fas ${
                          selectedEntryType === "mood"
                            ? "fa-smile"
                            : selectedEntryType === "journal"
                            ? "fa-book"
                            : selectedEntryType === "meditation"
                            ? "fa-spa"
                            : "fa-heartbeat"
                        } text-indigo-600 text-xl`}
                      ></i>
                    </div>
                    {selectedEntryType === "mood"
                      ? "Mood Entry Details"
                      : selectedEntryType === "journal"
                      ? "Journal Entry Details"
                      : selectedEntryType === "meditation"
                      ? "Meditation Session Details"
                      : "Wellness Check-in Details"}
                  </h2>
                  <button
                    onClick={() => setShowEntryDetails(false)}
                    className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                  >
                    <i className="fas fa-times text-gray-500"></i>
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Date and Time */}
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-100">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-indigo-900">
                        {formatDate(selectedEntry.date)}
                      </div>
                      {selectedEntryType === "mood" && (
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                          <i
                            className={`fas fa-smile ${
                              selectedEntry.mood === "happy"
                                ? "text-yellow-500"
                                : selectedEntry.mood === "sad"
                                ? "text-blue-500"
                                : "text-gray-500"
                            }`}
                          ></i>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Entry Content */}
                  {selectedEntryType === "journal" && (
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-100">
                      <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center gap-2">
                        <i className="fas fa-pen-fancy text-purple-600"></i>
                        Journal Entry
                      </h3>
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {selectedEntry.content}
                      </p>
                    </div>
                  )}

                  {/* Mood Details */}
                  {selectedEntryType === "mood" && (
                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-100">
                      <h3 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center gap-2">
                        <i className="fas fa-heart text-indigo-600"></i>
                        Mood Details
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <span className="text-sm font-medium text-indigo-700">
                            Mood:
                          </span>
                          <span className="ml-2 text-gray-700 capitalize">
                            {selectedEntry.mood}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-indigo-700">
                            Stress Level:
                          </span>
                          <span className="ml-2 text-gray-700">
                            {selectedEntry.stressLevel}%
                          </span>
                        </div>
                        {selectedEntry.sleepQuality && (
                          <div>
                            <span className="text-sm font-medium text-indigo-700">
                              Sleep Quality:
                            </span>
                            <span className="ml-2 text-gray-700">
                              {selectedEntry.sleepQuality}/10
                            </span>
                          </div>
                        )}
                        {selectedEntry.energyLevel && (
                          <div>
                            <span className="text-sm font-medium text-indigo-700">
                              Energy Level:
                            </span>
                            <span className="ml-2 text-gray-700">
                              {selectedEntry.energyLevel}/10
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Meditation Details */}
                  {selectedEntryType === "meditation" && (
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-100">
                      <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                        <i className="fas fa-spa text-blue-600"></i>
                        Meditation Session
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <span className="text-sm font-medium text-blue-700">
                            Duration:
                          </span>
                          <span className="ml-2 text-gray-700">
                            {selectedEntry.duration} minutes
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-blue-700">
                            Type:
                          </span>
                          <span className="ml-2 text-gray-700 capitalize">
                            {selectedEntry.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Wellness Check-in Details */}
                  {selectedEntryType === "wellness" && (
                    <div className="space-y-4">
                      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-100">
                        <h3 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center gap-2">
                          <i className="fas fa-heartbeat text-emerald-600"></i>
                          Wellness Metrics
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(selectedEntry).map(([key, value]) => {
                            if (typeof value === "object") {
                              return Object.entries(value).map(
                                ([subKey, subValue]) => (
                                  <div key={subKey}>
                                    <span className="text-sm font-medium text-emerald-700 capitalize">
                                      {key} {subKey}:
                                    </span>
                                    <span className="ml-2 text-gray-700">
                                      {subValue}
                                    </span>
                                  </div>
                                )
                              );
                            }
                            return null;
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tags (if any) */}
                  {selectedEntry.tags && selectedEntry.tags.length > 0 && (
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-100">
                      <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center gap-2">
                        <i className="fas fa-tags text-purple-600"></i>
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedEntry.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={handleDeleteEntry}
                      className="px-6 py-2.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2"
                    >
                      <i className="fas fa-trash"></i>
                      Delete Entry
                    </button>
                    <button
                      onClick={() => setShowEntryDetails(false)}
                      className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                    >
                      <i className="fas fa-check"></i>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modals */}
        {/* Mood Tracking Modal */}
        {showMoodModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden rounded-none">
              <div className="p-6 overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <i className="fas fa-smile text-indigo-600 text-xl"></i>
                    </div>
                    How are you feeling?
                  </h2>
                  <button
                    onClick={() => setShowMoodModal(false)}
                    className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                  >
                    <i className="fas fa-times text-gray-500"></i>
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Mood Selection */}
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-100">
                    <h3 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center gap-2">
                      <i className="fas fa-heart text-indigo-600"></i>
                      Select Your Mood
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        {
                          mood: "happy",
                          icon: "fa-smile",
                          color: "yellow",
                          bg: "from-yellow-50 to-yellow-100",
                          border: "border-yellow-100",
                        },
                        {
                          mood: "neutral",
                          icon: "fa-meh",
                          color: "blue",
                          bg: "from-blue-50 to-blue-100",
                          border: "border-blue-100",
                        },
                        {
                          mood: "sad",
                          icon: "fa-frown",
                          color: "gray",
                          bg: "from-gray-50 to-gray-100",
                          border: "border-gray-100",
                        },
                        {
                          mood: "excited",
                          icon: "fa-grin-stars",
                          color: "orange",
                          bg: "from-orange-50 to-orange-100",
                          border: "border-orange-100",
                        },
                        {
                          mood: "anxious",
                          icon: "fa-flushed",
                          color: "red",
                          bg: "from-red-50 to-red-100",
                          border: "border-red-100",
                        },
                        {
                          mood: "tired",
                          icon: "fa-tired",
                          color: "purple",
                          bg: "from-purple-50 to-purple-100",
                          border: "border-purple-100",
                        },
                      ].map(({ mood, icon, color, bg, border }) => (
                        <button
                          key={mood}
                          onClick={() => setCurrentMood(mood)}
                          className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all duration-300 ${
                            currentMood === mood
                              ? `bg-gradient-to-br ${bg} border-2 border-${color}-500 shadow-md`
                              : `bg-white hover:bg-${color}-50 border ${border}`
                          }`}
                        >
                          <i
                            className={`fas ${icon} text-3xl text-${color}-500`}
                          ></i>
                          <span className="text-sm font-medium text-gray-700 capitalize">
                            {mood}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Stress Level */}
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-100">
                    <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center gap-2">
                      <i className="fas fa-brain text-purple-600"></i>
                      Stress Level
                    </h3>
                    <div className="space-y-4">
                      <div className="relative">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={currentStressLevel}
                          onChange={(e) =>
                            setCurrentStressLevel(parseInt(e.target.value))
                          }
                          className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-sm text-purple-600">
                          <span>Calm</span>
                          <span className="font-medium">
                            {currentStressLevel}%
                          </span>
                          <span>Stressed</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Factors */}
                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border border-pink-100">
                    <h3 className="text-lg font-semibold text-pink-900 mb-4 flex items-center gap-2">
                      <i className="fas fa-chart-line text-pink-600"></i>
                      Additional Factors
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-pink-700 mb-2">
                          Sleep Quality
                        </label>
                        <select
                          className="w-full p-3 rounded-lg border border-pink-200 bg-white focus:ring-2 focus:ring-pink-100 focus:border-pink-500 transition-colors"
                          value={wellnessData.sleep.quality}
                          onChange={(e) =>
                            setWellnessData((prev) => ({
                              ...prev,
                              sleep: {
                                ...prev.sleep,
                                quality: parseInt(e.target.value),
                              },
                            }))
                          }
                        >
                          <option value="1">Poor</option>
                          <option value="2">Fair</option>
                          <option value="3">Good</option>
                          <option value="4">Excellent</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-pink-700 mb-2">
                          Energy Level
                        </label>
                        <select
                          className="w-full p-3 rounded-lg border border-pink-200 bg-white focus:ring-2 focus:ring-pink-100 focus:border-pink-500 transition-colors"
                          value={wellnessData.energy.morning}
                          onChange={(e) =>
                            setWellnessData((prev) => ({
                              ...prev,
                              energy: {
                                ...prev.energy,
                                morning: parseInt(e.target.value),
                              },
                            }))
                          }
                        >
                          <option value="1">Low</option>
                          <option value="2">Moderate</option>
                          <option value="3">High</option>
                          <option value="4">Very High</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-100">
                    <h3 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center gap-2">
                      <i className="fas fa-sticky-note text-emerald-600"></i>
                      Notes
                    </h3>
                    <textarea
                      placeholder="Add any additional notes about your mood..."
                      className="w-full h-24 p-3 rounded-lg border border-emerald-200 bg-white focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 transition-colors resize-none"
                      value={journalEntry}
                      onChange={(e) => setJournalEntry(e.target.value)}
                    />
                  </div>

                  {/* Mood Modal Footer */}
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={handleMoodSubmit}
                      className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                    >
                      <i className="fas fa-check"></i>
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Meditation Modal */}
        {showMeditationModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden rounded-none">
              <div className="p-6 overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <i className="fas fa-spa text-blue-600 text-xl"></i>
                    </div>
                    Meditation Session
                  </h2>
                  <button
                    onClick={() => {
                      setShowMeditationModal(false);
                      setMeditationRunning(false);
                      setMeditationTimer(0);
                      setMeditationType("mindfulness");
                    }}
                    className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                  >
                    <i className="fas fa-times text-gray-500"></i>
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Timer Display */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border border-blue-100 text-center">
                    <div className="text-6xl font-bold text-blue-900 mb-4 font-mono">
                      {formatTime(meditationTimer)}
                    </div>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={handleMeditationStart}
                        className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <i className="fas fa-play"></i>
                        Start
                      </button>
                      <button
                        onClick={handleMeditationPause}
                        className="px-6 py-2.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-2"
                      >
                        <i className="fas fa-pause"></i>
                        Pause
                      </button>
                      <button
                        onClick={handleMeditationReset}
                        className="px-6 py-2.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-2"
                      >
                        <i className="fas fa-redo"></i>
                        Reset
                      </button>
                    </div>
                  </div>

                  {/* Meditation Type */}
                  <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6 border border-cyan-100">
                    <h3 className="text-lg font-semibold text-cyan-900 mb-4 flex items-center gap-2">
                      <i className="fas fa-compass text-cyan-600"></i>
                      Choose Your Practice
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        {
                          type: "mindfulness",
                          icon: "fa-brain",
                          color: "cyan",
                        },
                        { type: "breathing", icon: "fa-wind", color: "teal" },
                        { type: "body-scan", icon: "fa-spa", color: "blue" },
                        {
                          type: "loving-kindness",
                          icon: "fa-heart",
                          color: "indigo",
                        },
                      ].map(({ type, icon, color }) => (
                        <button
                          key={type}
                          onClick={() => setMeditationType(type)}
                          className={`p-4 rounded-xl flex items-center gap-3 transition-all duration-300 ${
                            meditationType === type
                              ? `bg-gradient-to-br from-${color}-50 to-${color}-100 border-2 border-${color}-500 shadow-md`
                              : `bg-white hover:bg-${color}-50 border border-${color}-100`
                          }`}
                        >
                          <i
                            className={`fas ${icon} text-2xl text-${color}-500`}
                          ></i>
                          <span className="text-sm font-medium text-gray-700 capitalize">
                            {type.replace("-", " ")}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Journal Entry */}
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-100">
                    <h3 className="text-lg font-semibold text-indigo-900 mb-4">
                      Your Entry
                    </h3>
                    <textarea
                      value={journalEntry}
                      onChange={(e) => setJournalEntry(e.target.value)}
                      placeholder="How was your day? What are you grateful for? What are your goals for tomorrow?"
                      className="w-full h-48 p-3 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                    />
                  </div>

                  {/* Tags */}
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-100">
                    <h3 className="text-lg font-semibold text-purple-900 mb-4">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Gratitude",
                        "Goals",
                        "Reflection",
                        "Achievement",
                        "Challenge",
                        "Learning",
                      ].map((tag) => (
                        <button
                          key={tag}
                          className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-100">
                    <h3 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center gap-2">
                      <i className="fas fa-sticky-note text-emerald-600"></i>
                      Additional Notes
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-emerald-700 mb-2">
                          Energy Level
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-emerald-700 mb-2">
                          Productivity
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Meditation Modal Footer */}
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={handleMeditationComplete}
                      className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <i className="fas fa-check"></i>
                      Complete Session
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Wellness Check-in Modal */}
        {showWellnessModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden rounded-none">
              <div className="p-6 overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <i className="fas fa-heartbeat text-emerald-600 text-xl"></i>
                    </div>
                    Wellness Check-in
                  </h2>
                  <button
                    onClick={() => setShowWellnessModal(false)}
                    className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                  >
                    <i className="fas fa-times text-gray-500"></i>
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Sleep Section */}
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-100">
                    <h3 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center gap-2">
                      <i className="fas fa-moon text-indigo-600"></i>
                      Sleep
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-indigo-700 mb-2">
                          Hours Slept
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="24"
                          step="0.5"
                          className="w-full p-3 rounded-lg border border-indigo-200 bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-colors"
                          value={wellnessData.sleep.hours}
                          onChange={(e) =>
                            setWellnessData((prev) => ({
                              ...prev,
                              sleep: {
                                ...prev.sleep,
                                hours: parseFloat(e.target.value),
                              },
                            }))
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-indigo-700 mb-2">
                          Quality
                        </label>
                        <select
                          className="w-full p-3 rounded-lg border border-indigo-200 bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-colors"
                          value={wellnessData.sleep.quality}
                          onChange={(e) =>
                            setWellnessData((prev) => ({
                              ...prev,
                              sleep: {
                                ...prev.sleep,
                                quality: parseInt(e.target.value),
                              },
                            }))
                          }
                        >
                          <option value="1">Poor</option>
                          <option value="2">Fair</option>
                          <option value="3">Good</option>
                          <option value="4">Excellent</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Exercise Section */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-100">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                      <i className="fas fa-running text-blue-600"></i>
                      Exercise
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-blue-700 mb-2">
                          Minutes
                        </label>
                        <input
                          type="number"
                          min="0"
                          className="w-full p-3 rounded-lg border border-blue-200 bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-colors"
                          value={wellnessData.exercise.minutes}
                          onChange={(e) =>
                            setWellnessData((prev) => ({
                              ...prev,
                              exercise: {
                                ...prev.exercise,
                                minutes: parseInt(e.target.value),
                              },
                            }))
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-blue-700 mb-2">
                          Steps
                        </label>
                        <input
                          type="number"
                          min="0"
                          className="w-full p-3 rounded-lg border border-blue-200 bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-colors"
                          value={wellnessData.exercise.steps}
                          onChange={(e) =>
                            setWellnessData((prev) => ({
                              ...prev,
                              exercise: {
                                ...prev.exercise,
                                steps: parseInt(e.target.value),
                              },
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Nutrition Section */}
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-100">
                    <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
                      <i className="fas fa-apple-alt text-green-600"></i>
                      Nutrition
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-green-700 mb-2">
                          Healthy Meals
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          className="w-full p-3 rounded-lg border border-green-200 bg-white focus:ring-2 focus:ring-green-100 focus:border-green-500 transition-colors"
                          value={wellnessData.nutrition.healthyMeals}
                          onChange={(e) =>
                            setWellnessData((prev) => ({
                              ...prev,
                              nutrition: {
                                ...prev.nutrition,
                                healthyMeals: parseInt(e.target.value),
                              },
                            }))
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-green-700 mb-2">
                          Water Intake (glasses)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="20"
                          className="w-full p-3 rounded-lg border border-green-200 bg-white focus:ring-2 focus:ring-green-100 focus:border-green-500 transition-colors"
                          value={wellnessData.nutrition.waterIntake}
                          onChange={(e) =>
                            setWellnessData((prev) => ({
                              ...prev,
                              nutrition: {
                                ...prev.nutrition,
                                waterIntake: parseInt(e.target.value),
                              },
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Social Section */}
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-100">
                    <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center gap-2">
                      <i className="fas fa-users text-purple-600"></i>
                      Social
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-purple-700 mb-2">
                          Quality Time
                        </label>
                        <select
                          className="w-full p-3 rounded-lg border border-purple-200 bg-white focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-colors"
                          value={wellnessData.social.quality}
                          onChange={(e) =>
                            setWellnessData((prev) => ({
                              ...prev,
                              social: {
                                ...prev.social,
                                quality: parseInt(e.target.value),
                              },
                            }))
                          }
                        >
                          <option value="1">Low</option>
                          <option value="2">Moderate</option>
                          <option value="3">High</option>
                          <option value="4">Very High</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-purple-700 mb-2">
                          Support
                        </label>
                        <select
                          className="w-full p-3 rounded-lg border border-purple-200 bg-white focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-colors"
                          value={wellnessData.social.support}
                          onChange={(e) =>
                            setWellnessData((prev) => ({
                              ...prev,
                              social: {
                                ...prev.social,
                                support: parseInt(e.target.value),
                              },
                            }))
                          }
                        >
                          <option value="1">Low</option>
                          <option value="2">Moderate</option>
                          <option value="3">High</option>
                          <option value="4">Very High</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Energy Section */}
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-100">
                    <h3 className="text-lg font-semibold text-amber-900 mb-4 flex items-center gap-2">
                      <i className="fas fa-bolt text-amber-600"></i>
                      Energy Levels
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-amber-700 mb-2">
                          Morning
                        </label>
                        <select
                          className="w-full p-3 rounded-lg border border-amber-200 bg-white focus:ring-2 focus:ring-amber-100 focus:border-amber-500 transition-colors"
                          value={wellnessData.energy.morning}
                          onChange={(e) =>
                            setWellnessData((prev) => ({
                              ...prev,
                              energy: {
                                ...prev.energy,
                                morning: parseInt(e.target.value),
                              },
                            }))
                          }
                        >
                          <option value="1">Low</option>
                          <option value="2">Moderate</option>
                          <option value="3">High</option>
                          <option value="4">Very High</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-amber-700 mb-2">
                          Afternoon
                        </label>
                        <select
                          className="w-full p-3 rounded-lg border border-amber-200 bg-white focus:ring-2 focus:ring-amber-100 focus:border-amber-500 transition-colors"
                          value={wellnessData.energy.afternoon}
                          onChange={(e) =>
                            setWellnessData((prev) => ({
                              ...prev,
                              energy: {
                                ...prev.energy,
                                afternoon: parseInt(e.target.value),
                              },
                            }))
                          }
                        >
                          <option value="1">Low</option>
                          <option value="2">Moderate</option>
                          <option value="3">High</option>
                          <option value="4">Very High</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-amber-700 mb-2">
                          Evening
                        </label>
                        <select
                          className="w-full p-3 rounded-lg border border-amber-200 bg-white focus:ring-2 focus:ring-amber-100 focus:border-amber-500 transition-colors"
                          value={wellnessData.energy.evening}
                          onChange={(e) =>
                            setWellnessData((prev) => ({
                              ...prev,
                              energy: {
                                ...prev.energy,
                                evening: parseInt(e.target.value),
                              },
                            }))
                          }
                        >
                          <option value="1">Low</option>
                          <option value="2">Moderate</option>
                          <option value="3">High</option>
                          <option value="4">Very High</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setShowWellnessModal(false)}
                      className="px-6 py-2.5 border-2 border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleWellnessSubmit}
                      className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
                    >
                      <i className="fas fa-check"></i>
                      Save Check-in
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Journal Modal */}
        {showJournalModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden rounded-none">
              <div className="p-6 overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <i className="fas fa-book text-amber-600 text-xl"></i>
                    </div>
                    Journal Entry
                  </h2>
                  <button
                    onClick={() => setShowJournalModal(false)}
                    className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                  >
                    <i className="fas fa-times text-gray-500"></i>
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Journal Content */}
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-100">
                    <h3 className="text-lg font-semibold text-amber-900 mb-4 flex items-center gap-2">
                      <i className="fas fa-pen-fancy text-amber-600"></i>
                      Your Thoughts
                    </h3>
                    <textarea
                      placeholder="Write your thoughts, feelings, or reflections..."
                      className="w-full h-48 p-4 rounded-lg border border-amber-200 bg-white focus:ring-2 focus:ring-amber-100 focus:border-amber-500 transition-colors resize-none"
                      value={journalEntry}
                      onChange={(e) => setJournalEntry(e.target.value)}
                    />
                  </div>

                  {/* Mood Tags */}
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-100">
                    <h3 className="text-lg font-semibold text-orange-900 mb-4 flex items-center gap-2">
                      <i className="fas fa-tags text-orange-600"></i>
                      Mood Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { tag: "grateful", icon: "fa-heart" },
                        { tag: "reflective", icon: "fa-lightbulb" },
                        { tag: "hopeful", icon: "fa-star" },
                        { tag: "challenged", icon: "fa-mountain" },
                        { tag: "peaceful", icon: "fa-dove" },
                        { tag: "energetic", icon: "fa-bolt" },
                      ].map(({ tag, icon }) => (
                        <button
                          key={tag}
                          onClick={() => {
                            setSelectedTags((prev) =>
                              prev.includes(tag)
                                ? prev.filter((t) => t !== tag)
                                : [...prev, tag]
                            );
                          }}
                          className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 ${
                            selectedTags.includes(tag)
                              ? `bg-blue-600 text-white`
                              : `bg-white hover:bg-blue-50 border border-blue-100 text-blue-700`
                          }`}
                        >
                          <i className={`fas ${icon}`}></i>
                          <span className="capitalize">{tag}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Privacy Setting */}
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-100">
                    <h3 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center gap-2">
                      <i className="fas fa-lock text-emerald-600"></i>
                      Privacy Setting
                    </h3>
                    <div className="flex items-center gap-3">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={isPrivate}
                          onChange={(e) => setIsPrivate(e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                        <span className="ml-3 text-sm font-medium text-emerald-700">
                          Private Entry
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Journal Modal Footer */}
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={handleJournalSubmit}
                      className="px-6 py-2.5 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-2"
                    >
                      <i className="fas fa-check"></i>
                      Save Entry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
