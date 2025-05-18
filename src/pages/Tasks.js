import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Footer from "../components/Footer";

export const Tasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    category: "",
    status: "pending",
    estimatedTime: "",
    tags: [],
    progress: 0,
    subtasks: [],
    aiSuggestions: [],
    color: "#6366F1", // Default indigo
    reminder: false,
    reminderTime: "",
    attachments: [],
    notes: "",
    dependencies: [],
    timeSpent: 0,
    focusMode: false,
  });
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("priority");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid, list, kanban
  const [showAI, setShowAI] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [showFocusMode, setShowFocusMode] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showSubtasks, setShowSubtasks] = useState({});
  const [newSubtaskText, setNewSubtaskText] = useState("");
  const [showSubtaskInput, setShowSubtaskInput] = useState(false);
  const [showAISuggestions, setShowAISuggestions] = useState({});

  // Effect to prevent body scrolling when modal is open
  useEffect(() => {
    if (showTaskModal || showFocusMode) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showTaskModal, showFocusMode]);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title) {
      toast.error("Please enter a task title");
      return;
    }

    const task = {
      ...newTask,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      completedAt: null,
      progress: 0,
      timeSpent: 0,
    };

    setTasks((prev) => [...prev, task]);
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
      category: "",
      status: "pending",
      estimatedTime: "",
      tags: [],
      progress: 0,
      subtasks: [],
      aiSuggestions: [],
      color: "#6366F1",
      reminder: false,
      reminderTime: "",
      attachments: [],
      notes: "",
      dependencies: [],
      timeSpent: 0,
      focusMode: false,
    });
    setShowTaskModal(false);
    toast.success("Task added successfully");
  };

  const handleCompleteTask = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    const isCompleting = task.status === "pending";

    // Get the set of completed tasks from localStorage
    const completedTasks = new Set(
      JSON.parse(localStorage.getItem("completedTasks") || "[]")
    );

    // If task is already in completed set, don't give points
    const hasBeenCompleted = completedTasks.has(taskId);

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "completed" ? "pending" : "completed",
              completedAt:
                task.status === "completed" ? null : new Date().toISOString(),
              progress: task.status === "completed" ? 0 : 100,
            }
          : task
      )
    );

    // Only add points when completing a task for the first time
    if (isCompleting && !hasBeenCompleted) {
      // Add task to completed set
      completedTasks.add(taskId);
      localStorage.setItem(
        "completedTasks",
        JSON.stringify([...completedTasks])
      );

      // Get current rewards
      const currentRewards = JSON.parse(
        localStorage.getItem("rewards") || "{}"
      );

      // Calculate points to add (respecting daily limit)
      const newPoints = Math.min(
        10,
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
        completedTasks: (currentRewards.completedTasks || 0) + 1,
        dailyProgress: {
          ...currentRewards.dailyProgress,
          tasks: (currentRewards.dailyProgress?.tasks || 0) + 1,
          points: (currentRewards.dailyProgress?.points || 0) + newPoints,
        },
        weeklyProgress: {
          ...currentRewards.weeklyProgress,
          tasks: (currentRewards.weeklyProgress?.tasks || 0) + 1,
          points: (currentRewards.weeklyProgress?.points || 0) + newPoints,
        },
        monthlyProgress: {
          ...currentRewards.monthlyProgress,
          tasks: (currentRewards.monthlyProgress?.tasks || 0) + 1,
          points: (currentRewards.monthlyProgress?.points || 0) + newPoints,
        },
        history: [
          ...(currentRewards.history || []),
          {
            type: "tasks",
            points: newPoints,
            date: new Date().toISOString(),
          },
        ],
      };

      // Save updated rewards
      localStorage.setItem("rewards", JSON.stringify(updatedRewards));
      toast.success(`Task completed! +${newPoints} points`);
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    toast.success("Task deleted successfully");
  };

  const handleAddTag = () => {
    if (newTag && !newTask.tags.includes(newTag)) {
      setNewTask((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setNewTask((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleAddSubtask = (taskId, subtaskText) => {
    if (!subtaskText.trim()) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: [
                ...task.subtasks,
                {
                  id: Date.now(),
                  text: subtaskText,
                  completed: false,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : task
      )
    );

    setNewSubtaskText("");
    setShowSubtaskInput(false);
    toast.success("Subtask added successfully");
  };

  const handleCompleteSubtask = (taskId, subtaskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((subtask) =>
                subtask.id === subtaskId
                  ? { ...subtask, completed: !subtask.completed }
                  : subtask
              ),
              progress: calculateProgress(task.subtasks),
            }
          : task
      )
    );
  };

  const calculateProgress = (subtasks) => {
    if (!subtasks.length) return 0;
    const completed = subtasks.filter((subtask) => subtask.completed).length;
    return Math.round((completed / subtasks.length) * 100);
  };

  const handleAISuggestions = async (taskId) => {
    setAiLoading(true);
    const task = tasks.find((t) => t.id === taskId);
    let suggestions = [];

    // If task already has suggestions, just toggle visibility
    if (task.aiSuggestions.length > 0) {
      setShowAISuggestions((prev) => ({
        ...prev,
        [taskId]: !prev[taskId],
      }));
      setAiLoading(false);
      return;
    }

    // Analyze title, description, and tags
    const title = task.title.toLowerCase();
    const description = task.description.toLowerCase();
    const tags = task.tags.map((tag) => tag.toLowerCase());
    const fullText = `${title} ${description}`;

    // Expanded suggestion database
    const suggestionDatabase = {
      // Health & Wellness
      sleep: [
        "Research shows adults need 7-9 hours of sleep. Consider setting a consistent bedtime.",
        "The optimal time to wake up is when you've completed 5-6 sleep cycles (7.5-9 hours).",
        "Blue light exposure before bed can disrupt sleep. Consider reducing screen time 1 hour before bed.",
        "A cool room temperature (65-68°F) promotes better sleep quality.",
        "Regular sleep schedule helps regulate your circadian rhythm for better energy levels.",
        "Avoid caffeine 6 hours before bedtime for better sleep quality.",
        "Consider using white noise or calming sounds to improve sleep quality.",
        "Keep your bedroom dark and quiet for optimal sleep conditions.",
        "Try to maintain the same sleep schedule even on weekends.",
        "Consider using a sleep tracking app to monitor your sleep patterns.",
      ],
      exercise: [
        "The American Heart Association recommends 150 minutes of moderate exercise per week.",
        "Morning workouts can boost metabolism and energy levels throughout the day.",
        "Strength training 2-3 times per week helps maintain muscle mass and bone density.",
        "Recovery days are crucial for muscle growth and injury prevention.",
        "Hydration is key - aim for 17-20 oz of water 2-3 hours before exercise.",
        "Consider incorporating both cardio and strength training for optimal results.",
        "Proper warm-up can reduce injury risk by up to 50%.",
        "Post-workout stretching can improve flexibility and reduce muscle soreness.",
        "Consider tracking your heart rate zones for optimal training intensity.",
        "Regular exercise can improve sleep quality by up to 65%.",
      ],
      nutrition: [
        "A balanced meal should include protein, complex carbs, and healthy fats.",
        "Eating protein-rich foods can help maintain muscle mass and increase satiety.",
        "Staying hydrated (8-10 glasses of water daily) is crucial for overall health.",
        "Regular meal timing can help regulate metabolism and energy levels.",
        "Fiber-rich foods can improve digestion and help maintain stable blood sugar.",
        "Consider meal prepping to maintain healthy eating habits.",
        "Eating slowly can help with portion control and digestion.",
        "Include a variety of colorful vegetables for optimal nutrient intake.",
        "Consider tracking your macronutrients for better nutrition balance.",
        "Regular meal timing can improve metabolic efficiency by up to 20%.",
      ],

      // Productivity & Work
      work: [
        "The average person is most productive between 9-11 AM. Consider scheduling important tasks then.",
        "Taking regular breaks (5 min every 25 min) can improve focus and reduce burnout.",
        "Multitasking can reduce productivity by up to 40%. Consider focusing on one task at a time.",
        "Clear goals and deadlines can increase task completion rates by up to 30%.",
        "Regular exercise can improve work performance by up to 15%.",
        "Consider using the Pomodoro technique for better focus and productivity.",
        "Decluttering your workspace can improve focus by up to 25%.",
        "Regular breaks can prevent decision fatigue and maintain productivity.",
        "Consider using noise-canceling headphones in noisy environments.",
        "Setting specific time blocks for tasks can increase efficiency by up to 35%.",
      ],
      study: [
        "The Pomodoro technique (25 min study, 5 min break) can improve focus and retention.",
        "Active recall and spaced repetition are proven methods for better memory retention.",
        "Teaching others can help reinforce your understanding of the material.",
        "Regular review sessions spaced over time are more effective than cramming.",
        "Creating mind maps can help visualize and connect complex information.",
        "Consider using the Feynman technique to improve understanding.",
        "Regular practice tests can improve retention by up to 50%.",
        "Study in different environments to improve memory recall.",
        "Consider using the Cornell note-taking method for better organization.",
        "Regular sleep is crucial for memory consolidation and learning.",
      ],
      project: [
        "Break down large projects into smaller, manageable tasks.",
        "Set specific milestones to track progress effectively.",
        "Regular progress reviews can help maintain momentum.",
        "Consider using project management tools for better organization.",
        "Clear communication can reduce project delays by up to 30%.",
        "Regular team check-ins can improve project efficiency.",
        "Consider using agile methodologies for better adaptability.",
        "Documentation is crucial for project success and knowledge transfer.",
        "Regular risk assessment can prevent project delays.",
        "Consider using the SMART framework for goal setting.",
      ],

      // Personal Development
      learning: [
        "Set specific learning goals to track progress effectively.",
        "Regular practice is crucial for skill development.",
        "Consider finding a mentor for accelerated learning.",
        "Teaching others can reinforce your understanding.",
        "Regular feedback can improve learning efficiency.",
        "Consider using spaced repetition for better retention.",
        "Regular review sessions can improve long-term memory.",
        "Consider using different learning methods for better understanding.",
        "Regular practice can improve skill mastery by up to 40%.",
        "Consider using the 80/20 rule to focus on high-impact learning.",
      ],
      meditation: [
        "Start with 5 minutes daily and gradually increase duration.",
        "Regular meditation can reduce stress by up to 30%.",
        "Consider using guided meditation apps for beginners.",
        "Morning meditation can improve focus throughout the day.",
        "Regular practice can improve emotional regulation.",
        "Consider using different meditation techniques for variety.",
        "Regular meditation can improve sleep quality.",
        "Consider creating a dedicated meditation space.",
        "Regular practice can reduce anxiety by up to 25%.",
        "Consider using meditation timers for better consistency.",
      ],
      reading: [
        "Set specific reading goals to maintain consistency.",
        "Regular reading can improve focus and concentration.",
        "Consider using different reading techniques for better comprehension.",
        "Taking notes can improve retention by up to 40%.",
        "Regular reading can improve vocabulary and communication skills.",
        "Consider joining a book club for accountability.",
        "Regular reading can reduce stress by up to 68%.",
        "Consider using speed reading techniques for efficiency.",
        "Regular reading can improve critical thinking skills.",
        "Consider using different formats (print, digital, audio) for variety.",
      ],

      // Time Management
      schedule: [
        "The 80/20 rule suggests 20% of your efforts often produce 80% of results.",
        "Time blocking can increase productivity by reducing context switching.",
        "Regular breaks can improve focus and prevent decision fatigue.",
        "Setting specific time limits for tasks can increase efficiency.",
        "Reviewing and adjusting your schedule weekly can help optimize productivity.",
        "Consider using the Eisenhower Matrix for task prioritization.",
        "Regular schedule reviews can improve time management.",
        "Consider using time tracking tools for better awareness.",
        "Regular planning can reduce stress and improve efficiency.",
        "Consider using the Pomodoro technique for better focus.",
      ],
      planning: [
        "Set specific, measurable goals for better tracking.",
        "Regular planning can improve productivity by up to 25%.",
        "Consider using different planning methods for variety.",
        "Regular review sessions can improve planning effectiveness.",
        "Consider using planning tools for better organization.",
        "Regular planning can reduce stress and anxiety.",
        "Consider using the SMART framework for goal setting.",
        "Regular planning can improve decision-making.",
        "Consider using different planning timeframes (daily, weekly, monthly).",
        "Regular planning can improve work-life balance.",
      ],

      // Stress Management
      stress: [
        "Deep breathing exercises can reduce stress and lower blood pressure.",
        "Regular meditation can reduce anxiety and improve focus.",
        "Physical exercise releases endorphins that help combat stress.",
        "Maintaining a gratitude journal can improve mental well-being.",
        "Quality sleep is crucial for stress management and emotional regulation.",
        "Consider using progressive muscle relaxation techniques.",
        "Regular exercise can reduce stress by up to 40%.",
        "Consider using stress management apps for guidance.",
        "Regular breaks can prevent burnout and reduce stress.",
        "Consider using different stress management techniques for variety.",
      ],
      relaxation: [
        "Regular relaxation can improve overall well-being.",
        "Consider using different relaxation techniques for variety.",
        "Regular practice can reduce stress and anxiety.",
        "Consider creating a dedicated relaxation space.",
        "Regular relaxation can improve sleep quality.",
        "Consider using guided relaxation apps for beginners.",
        "Regular practice can improve emotional regulation.",
        "Consider using different relaxation methods for variety.",
        "Regular relaxation can reduce physical tension.",
        "Consider using relaxation techniques before bedtime.",
      ],
    };

    // Function to get random suggestions from a category
    const getRandomSuggestions = (category, count = 1) => {
      const categorySuggestions = suggestionDatabase[category] || [];
      const suggestions = [];
      while (suggestions.length < count && categorySuggestions.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * categorySuggestions.length
        );
        const suggestion = categorySuggestions[randomIndex];
        if (!suggestions.includes(suggestion)) {
          suggestions.push(suggestion);
        }
      }
      return suggestions;
    };

    // Get suggestions based on content and tags
    const contentCategories = Object.keys(suggestionDatabase).filter(
      (category) => fullText.includes(category)
    );

    const tagCategories = Object.keys(suggestionDatabase).filter((category) =>
      tags.some((tag) => tag.includes(category))
    );

    // Combine and deduplicate categories
    const allCategories = [
      ...new Set([...contentCategories, ...tagCategories]),
    ];

    // Get suggestions from each relevant category
    allCategories.forEach((category) => {
      const categorySuggestions = getRandomSuggestions(category);
      suggestions.push(...categorySuggestions);
    });

    // Add general productivity tips if we have less than 3 suggestions
    if (suggestions.length < 3) {
      const generalTips = [
        "Consider breaking this task into smaller, manageable chunks for better progress tracking.",
        "Setting specific, measurable goals can increase task completion rates.",
        "Regular progress reviews can help maintain momentum and adjust strategies.",
        "Creating a detailed plan can reduce execution time by up to 25%.",
        "Using the right tools and resources can significantly improve efficiency.",
        "Consider using the Pomodoro technique for better focus and productivity.",
        "Regular breaks can improve focus and prevent burnout.",
        "Setting specific time blocks can increase task efficiency.",
        "Consider using productivity tools for better organization.",
        "Regular review sessions can help maintain progress.",
      ];

      while (suggestions.length < 3) {
        const randomTip =
          generalTips[Math.floor(Math.random() * generalTips.length)];
        if (!suggestions.includes(randomTip)) {
          suggestions.push(randomTip);
        }
      }
    }

    // Ensure we only have 3 suggestions
    suggestions = suggestions.slice(0, 3);

    // Update the task with suggestions
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              aiSuggestions: suggestions,
            }
          : t
      )
    );
    setAiLoading(false);
  };

  const handleStartTimer = (taskId) => {
    setTimerRunning(true);
    setShowFocusMode(true);
    setSelectedTask(taskId);
  };

  const handleStopTimer = () => {
    setTimerRunning(false);
    if (selectedTask) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === selectedTask
            ? {
                ...task,
                timeSpent: task.timeSpent + timer,
              }
            : task
        )
      );
    }
    setTimer(0);
    setShowFocusMode(false);
    setSelectedTask(null);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const formatEstimatedTime = (timeStr) => {
    if (!timeStr) return "";

    // Convert to lowercase and remove spaces
    const time = timeStr.toLowerCase().replace(/\s+/g, "");

    // Handle hours
    if (time.includes("hour")) {
      const hours = parseFloat(time);
      return hours === 1 ? "1h" : `${hours}h`;
    }

    // Handle minutes
    if (time.includes("min")) {
      const minutes = parseFloat(time);
      return minutes === 1 ? "1m" : `${minutes}m`;
    }

    // Handle days
    if (time.includes("day")) {
      const days = parseFloat(time);
      return days === 1 ? "1d" : `${days}d`;
    }

    // If no unit specified, assume minutes
    const minutes = parseFloat(time);
    return minutes === 1 ? "1m" : `${minutes}m`;
  };

  const calculateEstimatedTime = (task) => {
    // Base time of 30 minutes
    let estimatedMinutes = 30;

    // Add time based on number of subtasks
    estimatedMinutes += (task.subtasks?.length || 0) * 15;

    // Add time based on description length (as a proxy for complexity)
    if (task.description) {
      estimatedMinutes += Math.floor(task.description.length / 50) * 10;
    }

    // Adjust based on priority
    if (task.priority === "high") estimatedMinutes *= 1.5;
    if (task.priority === "low") estimatedMinutes *= 0.75;

    const hours = Math.floor(estimatedMinutes / 60);
    const minutes = Math.round(estimatedMinutes % 60);

    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "all") return true;
      if (filter === "completed") return task.status === "completed";
      if (filter === "pending") return task.status === "pending";
      if (filter === "overdue") {
        return (
          task.status === "pending" &&
          task.dueDate &&
          new Date(task.dueDate) < new Date()
        );
      }
      return task.category === filter;
    })
    .filter((task) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query) ||
          task.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "priority":
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case "dueDate":
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        case "createdAt":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "progress":
          return b.progress - a.progress;
        default:
          return 0;
      }
    });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-600";
      case "medium":
        return "bg-yellow-100 text-yellow-600";
      case "low":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-600";
      case "pending":
        return "bg-yellow-100 text-yellow-600";
      case "overdue":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 75) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    if (progress >= 25) return "bg-orange-500";
    return "bg-red-500";
  };

  const handleProgressUpdate = (taskId, increment) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              progress: Math.min(100, Math.max(0, task.progress + increment)),
            }
          : task
      )
    );

    const newProgress =
      tasks.find((t) => t.id === taskId)?.progress + increment;
    if (newProgress >= 100) {
      toast.success("Task completed!");
    } else {
      toast.success(`Progress updated to ${newProgress}%`);
    }
  };

  const toggleAISuggestions = (taskId) => {
    setShowAISuggestions((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg border border-indigo-100 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Task Management
              </h1>
              <p className="text-gray-600">
                Organize and track your tasks efficiently
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="px-4 py-2 flex items-center justify-center gap-2 rounded-lg border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-all duration-300 ease-in-out"
              >
                <i className="fas fa-chart-bar text-lg"></i>
                <span className="font-medium">Analytics</span>
              </button>
              <button
                onClick={() => setShowTaskModal(true)}
                className="px-4 py-2 flex items-center justify-center gap-3 rounded-lg border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-all duration-300 ease-in-out"
              >
                <i className="fas fa-plus text-lg"></i>
                <span className="font-medium">New Task</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          {/* Main Content Column */}
          <div className="lg:col-span-4">
            {/* Analytics Section */}
            {showAnalytics && (
              <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-xl p-4">
                    <h3 className="text-base font-semibold text-indigo-700 mb-1">
                      Total Tasks
                    </h3>
                    <p className="text-2xl font-bold text-indigo-600">
                      {tasks.length}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100 rounded-xl p-4">
                    <h3 className="text-base font-semibold text-emerald-700 mb-1">
                      Completed
                    </h3>
                    <p className="text-2xl font-bold text-emerald-600">
                      {tasks.filter((t) => t.status === "completed").length}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-100 via-orange-100 to-red-100 rounded-xl p-4">
                    <h3 className="text-base font-semibold text-amber-700 mb-1">
                      In Progress
                    </h3>
                    <p className="text-2xl font-bold text-amber-600">
                      {tasks.filter((t) => t.status === "pending").length}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 rounded-xl p-4">
                    <h3 className="text-base font-semibold text-rose-700 mb-1">
                      Overdue
                    </h3>
                    <p className="text-2xl font-bold text-rose-600">
                      {
                        tasks.filter(
                          (t) =>
                            t.status === "pending" &&
                            t.dueDate &&
                            new Date(t.dueDate) < new Date()
                        ).length
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Filters and Search Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Filter
                  </label>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                  >
                    <option value="all">All Tasks</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                  >
                    <option value="priority">Priority</option>
                    <option value="dueDate">Due Date</option>
                    <option value="createdAt">Created Date</option>
                    <option value="progress">Progress</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Search
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tasks..."
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                  />
                </div>
                <div className="flex items-end justify-end">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-lg border-2 ${
                        viewMode === "grid"
                          ? "border-indigo-500 bg-indigo-500 text-white"
                          : "border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white"
                      } transition-all duration-300`}
                    >
                      <i className="fas fa-th-large"></i>
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-lg border-2 ${
                        viewMode === "list"
                          ? "border-indigo-500 bg-indigo-500 text-white"
                          : "border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white"
                      } transition-all duration-300`}
                    >
                      <i className="fas fa-list"></i>
                    </button>
                    <button
                      onClick={() => setViewMode("kanban")}
                      className={`p-2 rounded-lg border-2 ${
                        viewMode === "kanban"
                          ? "border-indigo-500 bg-indigo-500 text-white"
                          : "border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white"
                      } transition-all duration-300`}
                    >
                      <i className="fas fa-columns"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tasks Display */}
            <div>
              {viewMode === "grid" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                      <div
                        key={task.id}
                        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 h-fit"
                        style={{ borderLeft: `4px solid ${task.color}` }}
                      >
                        <div className="mb-4">
                          <div className="mb-3">
                            <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1 truncate">
                              {task.title}
                            </h3>
                            <p
                              className={`text-gray-600 text-sm ${
                                task.description ? "mb-1" : "mb-1"
                              } line-clamp-2`}
                            >
                              {task.description}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleCompleteTask(task.id)}
                              className={`p-2 rounded-lg border-2 ${
                                task.status === "completed"
                                  ? "border-green-500 bg-green-500 text-white"
                                  : "border-gray-300 text-gray-600 hover:bg-gray-300 hover:text-white"
                              } transition-all duration-300`}
                            >
                              <i
                                className={`fas fa-${
                                  task.status === "completed"
                                    ? "check-circle"
                                    : "circle"
                                }`}
                              ></i>
                            </button>
                            <button
                              onClick={() => handleStartTimer(task.id)}
                              className="p-2 border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-all duration-300"
                            >
                              <i className="fas fa-clock"></i>
                            </button>
                            <button
                              onClick={() => handleDeleteTask(task.id)}
                              className="p-2 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-300"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{task.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getProgressColor(
                                task.progress
                              )}`}
                              style={{ width: `${task.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Subtasks */}
                        {task.subtasks.length > 0 && (
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-sm font-medium text-gray-700">
                                Subtasks
                              </h4>
                              <button
                                onClick={() =>
                                  setShowSubtasks((prev) => ({
                                    ...prev,
                                    [task.id]: !prev[task.id],
                                  }))
                                }
                                className="text-gray-500 hover:text-gray-700"
                              >
                                <i
                                  className={`fas fa-chevron-${
                                    showSubtasks[task.id] ? "up" : "down"
                                  }`}
                                ></i>
                              </button>
                            </div>
                            {showSubtasks[task.id] && (
                              <div className="space-y-2">
                                {task.subtasks.map((subtask) => (
                                  <div
                                    key={subtask.id}
                                    className="flex items-center gap-2 text-sm"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={subtask.completed}
                                      onChange={() =>
                                        handleCompleteSubtask(
                                          task.id,
                                          subtask.id
                                        )
                                      }
                                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span
                                      className={
                                        subtask.completed
                                          ? "text-gray-400 line-through"
                                          : "text-gray-700"
                                      }
                                    >
                                      {subtask.text}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Priority:</span>
                            <span
                              className={`ml-2 px-2 py-1 rounded-full ${getPriorityColor(
                                task.priority
                              )}`}
                            >
                              {task.priority}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Status:</span>
                            <span
                              className={`ml-2 px-2 py-1 rounded-full ${getStatusColor(
                                task.status
                              )}`}
                            >
                              {task.status}
                            </span>
                          </div>
                          {task.dueDate && (
                            <div>
                              <span className="text-gray-500">Due:</span>
                              <span className="ml-2">
                                {new Date(task.dueDate).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                          {task.estimatedTime && (
                            <div>
                              <span className="text-gray-500">Est. Time:</span>
                              <span className="ml-2">
                                {formatEstimatedTime(task.estimatedTime)}
                              </span>
                            </div>
                          )}
                          <div>
                            <span className="text-gray-500">Time Spent:</span>
                            <span className="ml-2">
                              {formatTime(task.timeSpent || 0)}
                            </span>
                          </div>
                        </div>

                        {/* Tags Section - Moved to bottom */}
                        {task.tags.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="flex flex-wrap gap-2">
                              {task.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-600 text-xs rounded-full truncate max-w-[150px]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-8 text-center min-h-[400px] flex items-center">
                      <div className="max-w-md mx-auto w-full">
                        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <i className="fas fa-tasks text-3xl text-indigo-600"></i>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Welcome to Your Task Journey
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Every task you complete is a step toward your goals.
                          Start your journey to better productivity and personal
                          growth by creating your first task.
                        </p>
                        <div className="flex justify-center">
                          <button
                            onClick={() => setShowTaskModal(true)}
                            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                          >
                            <i className="fas fa-plus"></i>
                            New Task
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {viewMode === "list" && (
                <div className="space-y-4">
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                      <div
                        key={task.id}
                        className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200"
                        style={{ borderLeft: `4px solid ${task.color}` }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <button
                              onClick={() => handleCompleteTask(task.id)}
                              className={`p-2 rounded-lg border-2 ${
                                task.status === "completed"
                                  ? "border-green-500 bg-green-500 text-white"
                                  : "border-gray-300 text-gray-600 hover:bg-gray-300 hover:text-white"
                              } transition-all duration-300`}
                            >
                              <i
                                className={`fas fa-${
                                  task.status === "completed"
                                    ? "check-circle"
                                    : "circle"
                                }`}
                              ></i>
                            </button>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
                                {task.title}
                              </h3>
                              <p className="text-gray-600 text-sm line-clamp-1">
                                {task.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                                task.priority
                              )}`}
                            >
                              {task.priority}
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                task.status
                              )}`}
                            >
                              {task.status}
                            </span>
                            <button
                              onClick={() => handleStartTimer(task.id)}
                              className="p-2 border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-all duration-300"
                            >
                              <i className="fas fa-clock"></i>
                            </button>
                            <button
                              onClick={() => handleDeleteTask(task.id)}
                              className="p-2 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-300"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-8 text-center">
                      <div className="max-w-md mx-auto">
                        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <i className="fas fa-list text-3xl text-indigo-600"></i>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Your Path to Success
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Each task you complete brings you closer to your
                          dreams. Let's start building your path to success.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <button
                            onClick={() => setShowTaskModal(true)}
                            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                          >
                            <i className="fas fa-plus"></i>
                            Start Your Path
                          </button>
                          <button
                            onClick={() => setFilter("all")}
                            className="px-6 py-3 border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <i className="fas fa-filter"></i>
                            Reset Filters
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {viewMode === "kanban" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredTasks.length > 0 ? (
                    <>
                      {/* To Do Column */}
                      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                          <i className="fas fa-circle text-yellow-500"></i>
                          To Do
                        </h3>
                        <div className="space-y-4">
                          {filteredTasks
                            .filter((task) => task.status === "pending")
                            .map((task) => (
                              <div
                                key={task.id}
                                className="bg-white rounded-lg shadow p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200"
                                style={{
                                  borderLeft: `4px solid ${task.color}`,
                                }}
                              >
                                <h4 className="font-medium text-gray-900 mb-2">
                                  {task.title}
                                </h4>
                                <div className="flex items-center justify-between">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                                      task.priority
                                    )}`}
                                  >
                                    {task.priority}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() =>
                                        handleCompleteTask(task.id)
                                      }
                                      className="p-1.5 border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded-lg transition-all duration-300"
                                    >
                                      <i className="fas fa-check"></i>
                                    </button>
                                    <button
                                      onClick={() => handleDeleteTask(task.id)}
                                      className="p-1.5 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-300"
                                    >
                                      <i className="fas fa-trash"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* In Progress Column */}
                      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                          <i className="fas fa-circle text-blue-500"></i>
                          In Progress
                        </h3>
                        <div className="space-y-4">
                          {filteredTasks
                            .filter(
                              (task) => task.progress > 0 && task.progress < 100
                            )
                            .map((task) => (
                              <div
                                key={task.id}
                                className="bg-white rounded-lg shadow p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200"
                                style={{
                                  borderLeft: `4px solid ${task.color}`,
                                }}
                              >
                                <h4 className="font-medium text-gray-900 mb-2">
                                  {task.title}
                                </h4>
                                <div className="mb-2">
                                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                                    <span>Progress</span>
                                    <span>{task.progress}%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div
                                      className={`h-1.5 rounded-full ${getProgressColor(
                                        task.progress
                                      )}`}
                                      style={{ width: `${task.progress}%` }}
                                    ></div>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                                      task.priority
                                    )}`}
                                  >
                                    {task.priority}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() =>
                                        handleCompleteTask(task.id)
                                      }
                                      className="p-1.5 border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded-lg transition-all duration-300"
                                    >
                                      <i className="fas fa-check"></i>
                                    </button>
                                    <button
                                      onClick={() => handleDeleteTask(task.id)}
                                      className="p-1.5 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-300"
                                    >
                                      <i className="fas fa-trash"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Completed Column */}
                      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                          <i className="fas fa-circle text-green-500"></i>
                          Completed
                        </h3>
                        <div className="space-y-4">
                          {filteredTasks
                            .filter((task) => task.status === "completed")
                            .map((task) => (
                              <div
                                key={task.id}
                                className="bg-white rounded-lg shadow p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200"
                                style={{
                                  borderLeft: `4px solid ${task.color}`,
                                }}
                              >
                                <h4 className="font-medium text-gray-900 mb-2">
                                  {task.title}
                                </h4>
                                <div className="flex items-center justify-between">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                                      task.priority
                                    )}`}
                                  >
                                    {task.priority}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() =>
                                        handleCompleteTask(task.id)
                                      }
                                      className="p-1.5 border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white rounded-lg transition-all duration-300"
                                    >
                                      <i className="fas fa-undo"></i>
                                    </button>
                                    <button
                                      onClick={() => handleDeleteTask(task.id)}
                                      className="p-1.5 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-300"
                                    >
                                      <i className="fas fa-trash"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="col-span-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-8 text-center">
                      <div className="max-w-md mx-auto">
                        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <i className="fas fa-columns text-3xl text-indigo-600"></i>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Your Success Story Begins
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Every great achievement starts with a single task.
                          Begin writing your success story today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <button
                            onClick={() => setShowTaskModal(true)}
                            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                          >
                            <i className="fas fa-plus"></i>
                            Write Your Story
                          </button>
                          <button
                            onClick={() => setViewMode("grid")}
                            className="px-6 py-3 border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <i className="fas fa-th-large"></i>
                            Switch to Grid View
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-2">
            {/* Task Templates Section */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-100 min-h-[400px]">
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    Task Templates
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Quick add common tasks
                  </p>
                </div>

                {/* Task Templates List */}
                <div className="space-y-4">
                  {[
                    {
                      title: "Morning Run",
                      description: "Go for a 30-minute run",
                      type: "exercise",
                      priority: "medium",
                      tags: ["health", "exercise", "morning"],
                      estimatedTime: "30 minutes",
                      category: "Personal",
                      icon: "running",
                    },
                    {
                      title: "Drink Water",
                      description: "Drink 8 glasses of water",
                      type: "health",
                      priority: "high",
                      tags: ["health", "hydration", "daily"],
                      estimatedTime: "5 minutes",
                      category: "Personal",
                      icon: "tint",
                    },
                    {
                      title: "Read Book",
                      description: "Read for 20 minutes",
                      type: "personal",
                      priority: "medium",
                      tags: ["reading", "learning", "relaxation"],
                      estimatedTime: "20 minutes",
                      category: "Personal",
                      icon: "book",
                    },
                    {
                      title: "Meditate",
                      description: "10-minute meditation session",
                      type: "wellness",
                      priority: "medium",
                      tags: ["meditation", "mindfulness", "wellness"],
                      estimatedTime: "10 minutes",
                      category: "Personal",
                      icon: "spa",
                    },
                    {
                      title: "Evening Walk",
                      description: "Take a relaxing evening walk",
                      type: "exercise",
                      priority: "medium",
                      tags: ["exercise", "evening", "relaxation"],
                      estimatedTime: "20 minutes",
                      category: "Personal",
                      icon: "walking",
                    },
                  ].map((template, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setNewTask({
                          ...newTask,
                          ...template,
                          id: Date.now(),
                          createdAt: new Date().toISOString(),
                          completedAt: null,
                          progress: 0,
                          timeSpent: 0,
                          status: "pending",
                          color: "#6366F1",
                        });
                        setShowTaskModal(true);
                      }}
                      className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 border border-indigo-100 cursor-pointer hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <i
                            className={`fas fa-${template.icon} text-indigo-600`}
                          ></i>
                        </div>
                        <div>
                          <h3 className="font-semibold text-indigo-900">
                            {template.title}
                          </h3>
                          <p className="text-sm text-indigo-600">
                            {template.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Add Options */}
              </div>
            </div>
          </div>
        </div>

        {/* Focus Mode Modal */}
        {showFocusMode && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[100]">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                    <i className="fas fa-clock text-lg"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Focus Mode
                  </h2>
                </div>
                <button
                  onClick={handleStopTimer}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              {/* Task Information */}
              {selectedTask && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {tasks.find((t) => t.id === selectedTask)?.title}
                  </h3>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <i className="fas fa-hourglass-half"></i>
                      <span>
                        Est. Time:{" "}
                        {calculateEstimatedTime(
                          tasks.find((t) => t.id === selectedTask)
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <i className="fas fa-flag"></i>
                      <span>
                        Priority:{" "}
                        {tasks.find((t) => t.id === selectedTask)?.priority}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Timer Display */}
              <div className="text-center mb-6">
                <div className="text-5xl font-mono mb-2">
                  {formatTime(timer)}
                </div>
                <div className="text-sm text-gray-500">
                  {timerRunning ? "Focusing..." : "Timer paused"}
                </div>
              </div>

              {/* Timer Controls */}
              <div className="flex justify-center gap-4 mb-6">
                <button
                  onClick={() => setTimerRunning(!timerRunning)}
                  className="px-6 py-2 border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white rounded-lg transition-all duration-300"
                >
                  <i
                    className={`fas fa-${timerRunning ? "pause" : "play"} mr-2`}
                  ></i>
                  {timerRunning ? "Pause" : "Start"}
                </button>
                <button
                  onClick={() => setTimer(0)}
                  className="px-6 py-2 border-2 border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white rounded-lg transition-all duration-300"
                >
                  <i className="fas fa-redo mr-2"></i>
                  Reset
                </button>
                <button
                  onClick={handleStopTimer}
                  className="px-6 py-2 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-300"
                >
                  <i className="fas fa-stop mr-2"></i>
                  Stop
                </button>
              </div>

              {/* Quick Actions */}
              <div className="mb-6 max-w-xs mx-auto flex justify-center">
                {showSubtaskInput ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSubtaskText}
                      onChange={(e) => setNewSubtaskText(e.target.value)}
                      placeholder="Enter subtask..."
                      className="flex-1 px-3 py-2 border-2 border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleAddSubtask(selectedTask, newSubtaskText);
                        }
                      }}
                    />
                    <button
                      onClick={() =>
                        handleAddSubtask(selectedTask, newSubtaskText)
                      }
                      className="px-4 py-2 border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-all duration-300"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setShowSubtaskInput(false);
                        setNewSubtaskText("");
                      }}
                      className="px-4 py-2 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowSubtaskInput(true)}
                    className="w-full p-2 border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-all duration-300"
                  >
                    <i className="fas fa-tasks mr-2"></i>
                    Add Subtask
                  </button>
                )}
              </div>

              {/* Session Stats */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Session Stats
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Time Spent Today</div>
                    <div className="font-medium">
                      {formatTime(
                        tasks.find((t) => t.id === selectedTask)?.timeSpent || 0
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Current Progress</div>
                    <div className="font-medium">
                      {tasks.find((t) => t.id === selectedTask)?.progress || 0}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* New Task Modal */}
        {showTaskModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white shadow-2xl max-w-2xl w-full my-4">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg">
                      <i className="fas fa-tasks text-lg"></i>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Create New Task
                      </h2>
                      <p className="text-gray-500 text-sm">
                        Add a new task to your list
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowTaskModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <i className="fas fa-times text-xl text-gray-500"></i>
                  </button>
                </div>

                <form onSubmit={handleAddTask} className="space-y-4">
                  {/* Title Section */}
                  <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                    <div className="flex items-center gap-3 mb-2">
                      <i className="fas fa-heading text-indigo-500"></i>
                      <label className="text-sm font-medium text-indigo-600">
                        Title <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      name="title"
                      value={newTask.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-white border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 shadow-sm"
                      placeholder="Enter task title"
                    />
                  </div>

                  {/* Description Section */}
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-3 mb-2">
                      <i className="fas fa-align-left text-blue-500"></i>
                      <label className="text-sm font-medium text-blue-600">
                        Description
                      </label>
                    </div>
                    <textarea
                      name="description"
                      value={newTask.description}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 shadow-sm"
                      placeholder="Enter task description"
                    />
                  </div>

                  {/* Priority and Due Date Section */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                      <div className="flex items-center gap-3 mb-2">
                        <i className="fas fa-flag text-green-500"></i>
                        <label className="text-sm font-medium text-green-600">
                          Priority
                        </label>
                      </div>
                      <select
                        name="priority"
                        value={newTask.priority}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white border border-green-200 rounded-lg focus:ring-2 focus:ring-green-100 focus:border-green-500 shadow-sm"
                      >
                        <option value="high">High Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="low">Low Priority</option>
                      </select>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                      <div className="flex items-center gap-3 mb-2">
                        <i className="fas fa-calendar-alt text-green-500"></i>
                        <label className="text-sm font-medium text-green-600">
                          Due Date
                        </label>
                      </div>
                      <input
                        type="date"
                        name="dueDate"
                        value={newTask.dueDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white border border-green-200 rounded-lg focus:ring-2 focus:ring-green-100 focus:border-green-500 shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Category and Estimated Time Section */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                      <div className="flex items-center gap-3 mb-2">
                        <i className="fas fa-folder text-purple-500"></i>
                        <label className="text-sm font-medium text-purple-600">
                          Category
                        </label>
                      </div>
                      <input
                        type="text"
                        name="category"
                        value={newTask.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-500 shadow-sm"
                        placeholder="e.g., Work, Personal"
                      />
                    </div>
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                      <div className="flex items-center gap-3 mb-2">
                        <i className="fas fa-clock text-purple-500"></i>
                        <label className="text-sm font-medium text-purple-600">
                          Estimated Time
                        </label>
                      </div>
                      <input
                        type="text"
                        name="estimatedTime"
                        value={newTask.estimatedTime}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-500 shadow-sm"
                        placeholder="e.g., 2 hours"
                      />
                    </div>
                  </div>

                  {/* Tags Section */}
                  <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                    <div className="flex items-center gap-3 mb-2">
                      <i className="fas fa-tags text-indigo-500"></i>
                      <label className="text-sm font-medium text-indigo-600">
                        Tags
                      </label>
                    </div>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        className="flex-1 px-3 py-2 bg-white border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 shadow-sm"
                        placeholder="Add a tag"
                      />
                      <button
                        type="button"
                        onClick={handleAddTag}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-md flex items-center gap-2"
                      >
                        <i className="fas fa-plus"></i>
                        Add Tag
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {newTask.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-600 text-sm rounded-full flex items-center gap-2 shadow-sm"
                        >
                          <i className="fas fa-tag text-indigo-400"></i>
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="text-indigo-400 hover:text-indigo-600 transition-colors"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowTaskModal(false)}
                      className="px-4 py-2 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-300 flex items-center gap-2 shadow-sm"
                    >
                      <i className="fas fa-times"></i>
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 flex items-center gap-2 shadow-md"
                    >
                      <i className="fas fa-check"></i>
                      Create Task
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
