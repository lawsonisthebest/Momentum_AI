import { toast } from "react-hot-toast";

// Initialize reward system functions
export const initializeRewardSystem = () => {
  // Get current rewards from localStorage
  const getRewards = () => {
    try {
      const savedRewards = localStorage.getItem("rewards");
      return savedRewards
        ? JSON.parse(savedRewards)
        : {
            points: 0,
            level: 1,
            achievements: [],
            completedTasks: 0,
            completedTrackers: 0,
            badges: [],
            history: [],
            totalPointsEarned: 0,
            perfectWeeks: 0,
            monthlyGoals: 0,
            specialEvents: [],
            totalTasks: 0,
            dailyPoints: 0,
            dailyPointsLimit: 100,
            dailyProgress: {
              tasks: 0,
              trackers: 0,
              points: 0,
            },
            weeklyProgress: {
              tasks: 0,
              trackers: 0,
              points: 0,
            },
            monthlyProgress: {
              tasks: 0,
              trackers: 0,
              points: 0,
            },
          };
    } catch (error) {
      console.error("Error loading rewards:", error);
      return null;
    }
  };

  // Update rewards in localStorage
  const updateRewards = (newRewards) => {
    localStorage.setItem("rewards", JSON.stringify(newRewards));
  };

  // Handle task completion
  window.handleTaskComplete = () => {
    const rewards = getRewards();
    if (!rewards) return;

    // Check if we've hit the daily points limit
    if (rewards.dailyPoints >= rewards.dailyPointsLimit) {
      toast.info("You've reached your daily points limit!");
      return;
    }

    const points = 10; // Points for completing a task
    const newPoints = Math.min(
      points,
      rewards.dailyPointsLimit - rewards.dailyPoints
    );

    const updatedRewards = {
      ...rewards,
      points: rewards.points + newPoints,
      totalPointsEarned: rewards.totalPointsEarned + newPoints,
      dailyPoints: rewards.dailyPoints + newPoints,
      completedTasks: rewards.completedTasks + 1,
      dailyProgress: {
        ...rewards.dailyProgress,
        tasks: (rewards.dailyProgress.tasks || 0) + 1,
        points: (rewards.dailyProgress.points || 0) + newPoints,
      },
      weeklyProgress: {
        ...rewards.weeklyProgress,
        tasks: (rewards.weeklyProgress.tasks || 0) + 1,
        points: (rewards.weeklyProgress.points || 0) + newPoints,
      },
      monthlyProgress: {
        ...rewards.monthlyProgress,
        tasks: (rewards.monthlyProgress.tasks || 0) + 1,
        points: (rewards.monthlyProgress.points || 0) + newPoints,
      },
      history: [
        ...rewards.history,
        {
          type: "task",
          points: newPoints,
          date: new Date().toISOString(),
        },
      ],
    };

    updateRewards(updatedRewards);
    toast.success(`Task completed! +${newPoints} points`);
  };

  // Handle tracker completion
  window.handleTrackerComplete = () => {
    const rewards = getRewards();
    if (!rewards) return;

    // Check if we've hit the daily points limit
    if (rewards.dailyPoints >= rewards.dailyPointsLimit) {
      toast.info("You've reached your daily points limit!");
      return;
    }

    const points = 5; // Points for completing a tracker
    const newPoints = Math.min(
      points,
      rewards.dailyPointsLimit - rewards.dailyPoints
    );

    const updatedRewards = {
      ...rewards,
      points: rewards.points + newPoints,
      totalPointsEarned: rewards.totalPointsEarned + newPoints,
      dailyPoints: rewards.dailyPoints + newPoints,
      completedTrackers: rewards.completedTrackers + 1,
      dailyProgress: {
        ...rewards.dailyProgress,
        trackers: (rewards.dailyProgress.trackers || 0) + 1,
        points: (rewards.dailyProgress.points || 0) + newPoints,
      },
      weeklyProgress: {
        ...rewards.weeklyProgress,
        trackers: (rewards.weeklyProgress.trackers || 0) + 1,
        points: (rewards.weeklyProgress.points || 0) + newPoints,
      },
      monthlyProgress: {
        ...rewards.monthlyProgress,
        trackers: (rewards.monthlyProgress.trackers || 0) + 1,
        points: (rewards.monthlyProgress.points || 0) + newPoints,
      },
      history: [
        ...rewards.history,
        {
          type: "tracker",
          points: newPoints,
          date: new Date().toISOString(),
        },
      ],
    };

    updateRewards(updatedRewards);
    toast.success(`Tracker entry added! +${newPoints} points`);
  };
};
