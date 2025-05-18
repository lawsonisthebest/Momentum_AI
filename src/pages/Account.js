import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { usePreferences } from "../context/PreferencesContext";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";

// Modal Component
const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  isDestructive,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to ensure scrolling is re-enabled if component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-black opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div
                className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10 ${
                  isDestructive ? "bg-red-100" : "bg-yellow-100"
                }`}
              >
                <i
                  className={`fas ${
                    isDestructive
                      ? "fa-exclamation-triangle text-red-600"
                      : "fa-exclamation-circle text-yellow-600"
                  }`}
                ></i>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {title}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onConfirm}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm ${
                isDestructive
                  ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                  : "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500"
              }`}
            >
              {confirmText}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Account = () => {
  const { t } = usePreferences();

  // Default values for reset functionality
  const defaultProfile = {
    name: "",
    email: "",
    bio: "",
    avatar: "",
  };

  const defaultStats = {
    lastLogin: new Date().toISOString(),
    accountAge: "0 days",
    projects: 0,
    tasks: 0,
  };

  const defaultNotifications = {
    email: true,
    push: true,
    updates: true,
    marketing: false,
  };

  const defaultSecurity = {
    twoFactor: false,
    sessionTimeout: 30,
    loginNotifications: true,
  };

  const defaultAppearance = {
    theme: "light",
    fontSize: "medium",
    compactMode: false,
  };

  // Profile state
  const [profile, setProfile] = useState(() => {
    const savedProfile = {
      name: localStorage.getItem("userName") || defaultProfile.name,
      email: localStorage.getItem("userEmail") || defaultProfile.email,
      bio: localStorage.getItem("userBio") || defaultProfile.bio,
      avatar: localStorage.getItem("userAvatar") || defaultProfile.avatar,
    };
    return savedProfile;
  });

  // Stats state with proper initialization from localStorage
  const [stats, setStats] = useState(() => {
    const savedStats = localStorage.getItem("userStats");
    if (savedStats) {
      try {
        return JSON.parse(savedStats);
      } catch (error) {
        console.error("Error parsing saved stats:", error);
        return defaultStats;
      }
    }
    return defaultStats;
  });

  // Settings states
  const [activePanel, setActivePanel] = useState("profile");
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("userNotifications");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error("Error parsing saved notifications:", error);
        return defaultNotifications;
      }
    }
    return defaultNotifications;
  });

  const [security, setSecurity] = useState(() => {
    const saved = localStorage.getItem("userSecurity");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error("Error parsing saved security:", error);
        return defaultSecurity;
      }
    }
    return defaultSecurity;
  });

  const [appearance, setAppearance] = useState(() => {
    const saved = localStorage.getItem("userAppearance");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error("Error parsing saved appearance:", error);
        return defaultAppearance;
      }
    }
    return defaultAppearance;
  });

  // Account status state
  const [accountStatus, setAccountStatus] = useState(() => {
    const savedStatus = localStorage.getItem("accountStatus");
    return savedStatus || "active";
  });

  // Modal states
  const [showResetSettingsModal, setShowResetSettingsModal] = useState(false);
  const [showResetAllModal, setShowResetAllModal] = useState(false);

  // Initialize account creation date if not exists
  useEffect(() => {
    const creationDate = localStorage.getItem("accountCreationDate");
    if (!creationDate) {
      const now = new Date();
      localStorage.setItem("accountCreationDate", now.toISOString());
    }
  }, []);

  // Initialize trackers and tasks in localStorage if they don't exist
  useEffect(() => {
    if (!localStorage.getItem("trackers")) {
      localStorage.setItem("trackers", JSON.stringify([]));
    }
    if (!localStorage.getItem("tasks")) {
      localStorage.setItem("tasks", JSON.stringify([]));
    }
  }, []);

  // Update account age
  const updateAccountAge = () => {
    const creationDate = localStorage.getItem("accountCreationDate");
    if (!creationDate) return;

    const created = new Date(creationDate);
    const now = new Date();
    const diffTime = Math.abs(now - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let ageText;
    if (diffDays < 30) {
      ageText = `${diffDays} days`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      ageText = `${months} months`;
    } else {
      const years = Math.floor(diffDays / 365);
      ageText = `${years} years`;
    }

    setStats((prev) => ({
      ...prev,
      accountAge: ageText,
    }));
  };

  // Update last login time
  const updateLastLogin = () => {
    const now = new Date();
    setStats((prev) => {
      const newStats = {
        ...prev,
        lastLogin: now.toISOString(),
      };
      localStorage.setItem("userStats", JSON.stringify(newStats));
      return newStats;
    });
  };

  // Update active trackers count
  const updateActiveTrackers = () => {
    try {
      // Get all trackers from localStorage
      const allTrackers = JSON.parse(localStorage.getItem("trackers") || "[]");
      // Filter for active trackers (not archived and not deleted)
      const activeTrackers = allTrackers.filter(
        (tracker) =>
          tracker && tracker.id && !tracker.archived && !tracker.deleted
      );

      setStats((prev) => ({
        ...prev,
        projects: activeTrackers.length,
      }));
    } catch (error) {
      console.error("Error updating active trackers:", error);
      setStats((prev) => ({
        ...prev,
        projects: 0,
      }));
    }
  };

  // Update pending tasks count
  const updatePendingTasks = () => {
    try {
      // Get all tasks from localStorage
      const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      // Filter for pending tasks (not completed and not deleted)
      const pendingTasks = allTasks.filter(
        (task) => task && task.id && !task.completed && !task.deleted
      );

      setStats((prev) => ({
        ...prev,
        tasks: pendingTasks.length,
      }));
    } catch (error) {
      console.error("Error updating pending tasks:", error);
      setStats((prev) => ({
        ...prev,
        tasks: 0,
      }));
    }
  };

  // Update all stats
  const updateAllStats = () => {
    updateAccountAge();
    updateLastLogin();
    updateActiveTrackers();
    updatePendingTasks();
  };

  // Update stats on component mount and periodically
  useEffect(() => {
    // Initial update
    updateAllStats();

    // Update every minute
    const interval = setInterval(updateAllStats, 60000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Update stats when localStorage changes
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "trackers" || e.key === "tasks") {
        updateActiveTrackers();
        updatePendingTasks();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Format last login time
  const formatLastLogin = (timestamp) => {
    const loginTime = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now - loginTime) / (1000 * 60));

    if (diffMinutes < 1) {
      return "Just now";
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`;
    } else if (diffMinutes < 1440) {
      const hours = Math.floor(diffMinutes / 60);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(diffMinutes / 1440);
      return `${days} days ago`;
    }
  };

  // Apply appearance settings
  useEffect(() => {
    // Apply theme
    document.documentElement.classList.remove("light", "dark");
    if (appearance.theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      document.documentElement.classList.add(systemTheme);
    } else {
      document.documentElement.classList.add(appearance.theme);
    }

    // Apply font size
    document.documentElement.style.fontSize = {
      small: "14px",
      medium: "16px",
      large: "18px",
    }[appearance.fontSize];

    // Apply compact mode
    const root = document.documentElement;
    if (appearance.compactMode) {
      root.classList.add("compact-mode");
      // Apply compact mode styles
      root.style.setProperty("--spacing-unit", "0.5rem");
      root.style.setProperty("--border-radius", "0.375rem");
      root.style.setProperty("--padding-unit", "0.75rem");
    } else {
      root.classList.remove("compact-mode");
      // Reset to default styles
      root.style.setProperty("--spacing-unit", "1rem");
      root.style.setProperty("--border-radius", "0.5rem");
      root.style.setProperty("--padding-unit", "1rem");
    }
  }, [appearance]);

  // Handle system theme changes
  useEffect(() => {
    if (appearance.theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e) => {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(e.matches ? "dark" : "light");
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [appearance.theme]);

  // Reset all settings
  const handleReset = () => {
    setShowResetSettingsModal(true);
  };

  const confirmResetSettings = () => {
    // Reset profile
    setProfile(defaultProfile);
    Object.keys(defaultProfile).forEach((key) => {
      localStorage.removeItem(
        `user${key.charAt(0).toUpperCase() + key.slice(1)}`
      );
    });

    // Reset stats
    setStats(defaultStats);
    localStorage.removeItem("userStats");

    // Reset notifications
    setNotifications(defaultNotifications);
    localStorage.removeItem("userNotifications");

    // Reset security
    setSecurity(defaultSecurity);
    localStorage.removeItem("userSecurity");

    // Reset appearance
    setAppearance(defaultAppearance);
    localStorage.removeItem("userAppearance");

    // Reset account status
    setAccountStatus("active");
    localStorage.removeItem("accountStatus");

    // Reset account creation date
    localStorage.removeItem("accountCreationDate");

    setShowResetSettingsModal(false);
    toast.success("All settings have been reset to default values");
  };

  // Reset all website progress
  const handleResetAllProgress = () => {
    setShowResetAllModal(true);
  };

  const confirmResetAllProgress = () => {
    try {
      // Clear all localStorage items
      localStorage.clear();

      // Reset all states to default
      setProfile(defaultProfile);
      setStats(defaultStats);
      setNotifications(defaultNotifications);
      setSecurity(defaultSecurity);
      setAppearance(defaultAppearance);
      setAccountStatus("active");

      setShowResetAllModal(false);
      toast.success("All website progress has been reset successfully!");

      // Optional: Reload the page to ensure clean state
      window.location.reload();
    } catch (error) {
      console.error("Error resetting progress:", error);
      toast.error("Error resetting progress. Please try again.");
    }
  };

  // Handle profile changes with validation
  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    // Validate email
    if (name === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        toast.error("Please enter a valid email address");
        return;
      }
    }

    setProfile((prev) => {
      const newProfile = {
        ...prev,
        [name]: value,
      };
      localStorage.setItem(
        `user${name.charAt(0).toUpperCase() + name.slice(1)}`,
        value
      );
      return newProfile;
    });
  };

  // Handle profile picture upload with validation
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => {
          const newProfile = {
            ...prev,
            avatar: reader.result,
          };
          localStorage.setItem("userAvatar", reader.result);
          return newProfile;
        });
      };
      reader.onerror = () => {
        toast.error("Error reading file");
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle notification settings with validation
  const handleNotificationChange = (setting) => {
    setNotifications((prev) => {
      const newSettings = {
        ...prev,
        [setting]: !prev[setting],
      };
      localStorage.setItem("userNotifications", JSON.stringify(newSettings));
      return newSettings;
    });
  };

  // Handle security settings with validation
  const handleSecurityChange = (setting, value) => {
    // Validate session timeout
    if (setting === "sessionTimeout" && typeof value === "number") {
      if (![15, 30, 60, 120].includes(value)) {
        toast.error("Invalid session timeout value");
        return;
      }
    }

    setSecurity((prev) => {
      const newSettings = {
        ...prev,
        [setting]: value,
      };
      localStorage.setItem("userSecurity", JSON.stringify(newSettings));
      return newSettings;
    });
  };

  // Handle appearance settings with validation
  const handleAppearanceChange = (setting, value) => {
    // Validate theme
    if (setting === "theme" && !["light", "dark", "system"].includes(value)) {
      toast.error("Invalid theme value");
      return;
    }

    // Validate font size
    if (
      setting === "fontSize" &&
      !["small", "medium", "large"].includes(value)
    ) {
      toast.error("Invalid font size value");
      return;
    }

    setAppearance((prev) => {
      const newSettings = {
        ...prev,
        [setting]: value,
      };
      localStorage.setItem("userAppearance", JSON.stringify(newSettings));
      return newSettings;
    });
  };

  // Handle quick action clicks
  const handleQuickAction = (action) => {
    setActivePanel(action);
    switch (action) {
      case "notifications":
        toast.success("Opening notification settings...");
        break;
      case "security":
        toast.success("Opening security settings...");
        break;
      case "appearance":
        toast.success("Opening appearance settings...");
        break;
      case "help":
        toast.success("Opening help center...");
        break;
      default:
        break;
    }
  };

  // Save all changes with validation
  const handleSave = () => {
    try {
      // Validate profile
      if (profile.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
        toast.error("Please enter a valid email address");
        return;
      }

      // Save profile data
      Object.entries(profile).forEach(([key, value]) => {
        localStorage.setItem(
          `user${key.charAt(0).toUpperCase() + key.slice(1)}`,
          value
        );
      });

      // Save stats
      localStorage.setItem("userStats", JSON.stringify(stats));

      // Save settings
      localStorage.setItem("userNotifications", JSON.stringify(notifications));
      localStorage.setItem("userSecurity", JSON.stringify(security));
      localStorage.setItem("userAppearance", JSON.stringify(appearance));

      // Save account status
      localStorage.setItem("accountStatus", accountStatus);

      toast.success("All changes saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Error saving settings. Please try again.");
    }
  };

  // Render settings panel content
  const renderSettingsPanel = () => {
    switch (activePanel) {
      case "notifications":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Notification Settings
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                <div>
                  <h3 className="font-medium text-gray-900">
                    Email Notifications
                  </h3>
                  <p className="text-sm text-gray-500">
                    Receive updates via email
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={() => handleNotificationChange("email")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                <div>
                  <h3 className="font-medium text-gray-900">
                    Push Notifications
                  </h3>
                  <p className="text-sm text-gray-500">
                    Receive browser notifications
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.push}
                    onChange={() => handleNotificationChange("push")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                <div>
                  <h3 className="font-medium text-gray-900">Product Updates</h3>
                  <p className="text-sm text-gray-500">
                    Stay informed about new features
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.updates}
                    onChange={() => handleNotificationChange("updates")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Security Settings
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">
                  Two-Factor Authentication
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Add an extra layer of security to your account
                </p>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={security.twoFactor}
                    onChange={() =>
                      handleSecurityChange("twoFactor", !security.twoFactor)
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">
                  Session Timeout
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Set how long you can be inactive before being logged out
                </p>
                <select
                  value={security.sessionTimeout}
                  onChange={(e) =>
                    handleSecurityChange(
                      "sessionTimeout",
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={60}>1 hour</option>
                  <option value={120}>2 hours</option>
                </select>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">
                  Login Notifications
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Get notified when someone logs into your account
                </p>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={security.loginNotifications}
                    onChange={() =>
                      handleSecurityChange(
                        "loginNotifications",
                        !security.loginNotifications
                      )
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              {/* Reset All Progress Section */}
              <div className="p-4 bg-white rounded-lg border border-red-200">
                <h3 className="font-medium text-red-900 mb-2">Danger Zone</h3>
                <p className="text-sm text-red-600 mb-4">
                  This action will permanently delete all your data and reset
                  the website to its initial state. This cannot be undone.
                </p>
                <button
                  onClick={handleResetAllProgress}
                  className="w-full px-4 py-2 text-sm text-white bg-red-600 rounded-lg border border-red-600 hover:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <i className="fas fa-trash-alt"></i>
                  Reset All Progress
                </button>
              </div>
            </div>
          </div>
        );

      case "appearance":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Appearance Settings
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">Theme</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Choose your preferred color scheme
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => handleAppearanceChange("theme", "light")}
                    className={`p-4 rounded-lg border ${
                      appearance.theme === "light"
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="h-8 bg-white rounded shadow-sm mb-2"></div>
                    <span className="text-sm font-medium">Light</span>
                  </button>
                  <button
                    onClick={() => handleAppearanceChange("theme", "dark")}
                    className={`p-4 rounded-lg border ${
                      appearance.theme === "dark"
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="h-8 bg-gray-800 rounded shadow-sm mb-2"></div>
                    <span className="text-sm font-medium">Dark</span>
                  </button>
                  <button
                    onClick={() => handleAppearanceChange("theme", "system")}
                    className={`p-4 rounded-lg border ${
                      appearance.theme === "system"
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="h-8 bg-gradient-to-r from-white to-gray-800 rounded shadow-sm mb-2"></div>
                    <span className="text-sm font-medium">System</span>
                  </button>
                </div>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">Font Size</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Adjust the text size across the application
                </p>
                <select
                  value={appearance.fontSize}
                  onChange={(e) =>
                    handleAppearanceChange("fontSize", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">Compact Mode</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Reduce spacing for a more compact layout
                </p>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={appearance.compactMode}
                    onChange={() =>
                      handleAppearanceChange(
                        "compactMode",
                        !appearance.compactMode
                      )
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>
        );

      case "help":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Help & Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">
                  Documentation
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Browse our comprehensive guides and tutorials
                </p>
                <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                  View Documentation →
                </button>
              </div>
              <div className="p-6 bg-white rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">
                  Contact Support
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Get help from our support team
                </p>
                <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                  Contact Us →
                </button>
              </div>
              <div className="p-6 bg-white rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">FAQ</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Find answers to common questions
                </p>
                <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                  Browse FAQ →
                </button>
              </div>
              <div className="p-6 bg-white rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">Community</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Join our community forum
                </p>
                <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                  Join Community →
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            {/* Profile Form */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Account Settings
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your profile information
              </p>
            </div>

            {/* Profile Picture */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-100 shadow-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <i className="fas fa-user text-3xl"></i>
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-2 rounded-full cursor-pointer shadow-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">
                  <i className="fas fa-camera"></i>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                  />
                </label>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 bg-white/50"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 bg-white/50"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleProfileChange}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 bg-white/50"
                  placeholder="Tell us about yourself"
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 ${
        appearance.compactMode ? "compact" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Side Panel */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-indigo-100 space-y-6 ${
                appearance.compactMode ? "p-4" : "p-6"
              }`}
            >
              {/* Account Overview */}
              <div>
                <h3
                  className={`font-semibold text-gray-900 mb-4 ${
                    appearance.compactMode ? "text-base" : "text-lg"
                  }`}
                >
                  Account Overview
                </h3>
                <div
                  className={`space-y-4 ${
                    appearance.compactMode ? "space-y-2" : ""
                  }`}
                >
                  <div
                    className={`flex items-center justify-between bg-indigo-50 rounded-lg ${
                      appearance.compactMode ? "p-2" : "p-3"
                    }`}
                  >
                    <span
                      className={`text-gray-600 ${
                        appearance.compactMode ? "text-xs" : "text-sm"
                      }`}
                    >
                      Last Login
                    </span>
                    <span
                      className={`font-medium text-indigo-600 ${
                        appearance.compactMode ? "text-xs" : "text-sm"
                      }`}
                    >
                      {formatLastLogin(stats.lastLogin)}
                    </span>
                  </div>
                  <div
                    className={`flex items-center justify-between bg-purple-50 rounded-lg ${
                      appearance.compactMode ? "p-2" : "p-3"
                    }`}
                  >
                    <span
                      className={`text-gray-600 ${
                        appearance.compactMode ? "text-xs" : "text-sm"
                      }`}
                    >
                      Account Age
                    </span>
                    <span
                      className={`font-medium text-purple-600 ${
                        appearance.compactMode ? "text-xs" : "text-sm"
                      }`}
                    >
                      {stats.accountAge}
                    </span>
                  </div>
                  <div
                    className={`flex items-center justify-between bg-pink-50 rounded-lg ${
                      appearance.compactMode ? "p-2" : "p-3"
                    }`}
                  >
                    <span
                      className={`text-gray-600 ${
                        appearance.compactMode ? "text-xs" : "text-sm"
                      }`}
                    >
                      Active Trackers
                    </span>
                    <span
                      className={`font-medium text-pink-600 ${
                        appearance.compactMode ? "text-xs" : "text-sm"
                      }`}
                    >
                      {stats.projects}
                    </span>
                  </div>
                  <div
                    className={`flex items-center justify-between bg-blue-50 rounded-lg ${
                      appearance.compactMode ? "p-2" : "p-3"
                    }`}
                  >
                    <span
                      className={`text-gray-600 ${
                        appearance.compactMode ? "text-xs" : "text-sm"
                      }`}
                    >
                      Pending Tasks
                    </span>
                    <span
                      className={`font-medium text-blue-600 ${
                        appearance.compactMode ? "text-xs" : "text-sm"
                      }`}
                    >
                      {stats.tasks}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3
                  className={`font-semibold text-gray-900 mb-4 ${
                    appearance.compactMode ? "text-base" : "text-lg"
                  }`}
                >
                  Quick Actions
                </h3>
                <div
                  className={`space-y-2 ${
                    appearance.compactMode ? "space-y-1" : ""
                  }`}
                >
                  <button
                    onClick={() => handleQuickAction("notifications")}
                    className={`w-full text-left text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2 ${
                      activePanel === "notifications"
                        ? "border-indigo-500 bg-indigo-50"
                        : ""
                    } ${
                      appearance.compactMode
                        ? "px-3 py-1.5 text-xs"
                        : "px-4 py-2 text-sm"
                    }`}
                  >
                    <i className="fas fa-bell text-indigo-500"></i>
                    Notification Settings
                  </button>
                  <button
                    onClick={() => handleQuickAction("security")}
                    className={`w-full text-left text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2 ${
                      activePanel === "security"
                        ? "border-indigo-500 bg-indigo-50"
                        : ""
                    } ${
                      appearance.compactMode
                        ? "px-3 py-1.5 text-xs"
                        : "px-4 py-2 text-sm"
                    }`}
                  >
                    <i className="fas fa-lock text-purple-500"></i>
                    Security Settings
                  </button>
                  <button
                    onClick={() => handleQuickAction("appearance")}
                    className={`w-full text-left text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2 ${
                      activePanel === "appearance"
                        ? "border-indigo-500 bg-indigo-50"
                        : ""
                    } ${
                      appearance.compactMode
                        ? "px-3 py-1.5 text-xs"
                        : "px-4 py-2 text-sm"
                    }`}
                  >
                    <i className="fas fa-palette text-pink-500"></i>
                    Appearance
                  </button>
                  <button
                    onClick={() => handleQuickAction("help")}
                    className={`w-full text-left text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2 ${
                      activePanel === "help"
                        ? "border-indigo-500 bg-indigo-50"
                        : ""
                    } ${
                      appearance.compactMode
                        ? "px-3 py-1.5 text-xs"
                        : "px-4 py-2 text-sm"
                    }`}
                  >
                    <i className="fas fa-question-circle text-blue-500"></i>
                    Help & Support
                  </button>
                </div>
              </div>

              {/* Account Status */}
              <div>
                <h3
                  className={`font-semibold text-gray-900 mb-4 ${
                    appearance.compactMode ? "text-base" : "text-lg"
                  }`}
                >
                  Account Status
                </h3>
                <div
                  className={`bg-green-50 rounded-lg border border-green-100 ${
                    appearance.compactMode ? "p-3" : "p-4"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span
                      className={`font-medium text-green-700 capitalize ${
                        appearance.compactMode ? "text-xs" : "text-sm"
                      }`}
                    >
                      {accountStatus}
                    </span>
                  </div>
                  <p
                    className={`text-green-600 mt-2 ${
                      appearance.compactMode ? "text-xs" : "text-sm"
                    }`}
                  >
                    Your account is in good standing
                  </p>
                </div>
              </div>

              {/* Reset Settings Button */}
              <div
                className={`pt-4 border-t border-gray-200 ${
                  appearance.compactMode ? "pt-3" : ""
                }`}
              >
                <button
                  onClick={handleReset}
                  className={`w-full text-red-600 bg-white rounded-lg border border-red-200 hover:bg-red-50 transition-colors duration-200 flex items-center justify-center gap-2 ${
                    appearance.compactMode
                      ? "px-3 py-1.5 text-xs"
                      : "px-4 py-2 text-sm"
                  }`}
                >
                  <i className="fas fa-undo text-red-500"></i>
                  Reset Settings
                </button>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-indigo-100 ${
                appearance.compactMode ? "p-6" : "p-8"
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePanel}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderSettingsPanel()}
                </motion.div>
              </AnimatePresence>

              {/* Save Button */}
              <div className="flex justify-end mt-8">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg font-medium"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Reset Settings Modal */}
      <ConfirmationModal
        isOpen={showResetSettingsModal}
        onClose={() => setShowResetSettingsModal(false)}
        onConfirm={confirmResetSettings}
        title="Reset Settings"
        description="Are you sure you want to reset all settings? This will restore all settings to their default values. This action cannot be undone."
        confirmText="Reset Settings"
        isDestructive={false}
      />

      {/* Reset All Progress Modal */}
      <ConfirmationModal
        isOpen={showResetAllModal}
        onClose={() => setShowResetAllModal(false)}
        onConfirm={confirmResetAllProgress}
        title="Reset All Progress"
        description="WARNING: This will reset ALL website progress and clear ALL saved data. This includes all settings, preferences, and any other stored information. This action cannot be undone. Are you absolutely sure you want to continue?"
        confirmText="Reset Everything"
        isDestructive={true}
      />
    </div>
  );
};
