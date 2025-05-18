import React, { createContext, useContext, useState, useEffect } from "react";

const PreferencesContext = createContext();

// Language translations
const translations = {
  en: {
    dashboard: "Dashboard",
    calendar: "Calendar",
    list: "List",
    settings: "Settings",
    profile: "Profile",
    notifications: "Notifications",
    preferences: "Preferences",
    save: "Save Changes",
    cancel: "Cancel",
    // Add more translations as needed
  },
  es: {
    dashboard: "Panel",
    calendar: "Calendario",
    list: "Lista",
    settings: "Configuración",
    profile: "Perfil",
    notifications: "Notificaciones",
    preferences: "Preferencias",
    save: "Guardar Cambios",
    cancel: "Cancelar",
  },
  fr: {
    dashboard: "Tableau de bord",
    calendar: "Calendrier",
    list: "Liste",
    settings: "Paramètres",
    profile: "Profil",
    notifications: "Notifications",
    preferences: "Préférences",
    save: "Enregistrer",
    cancel: "Annuler",
  },
  de: {
    dashboard: "Dashboard",
    calendar: "Kalender",
    list: "Liste",
    settings: "Einstellungen",
    profile: "Profil",
    notifications: "Benachrichtigungen",
    preferences: "Präferenzen",
    save: "Änderungen speichern",
    cancel: "Abbrechen",
  },
  ja: {
    dashboard: "ダッシュボード",
    calendar: "カレンダー",
    list: "リスト",
    settings: "設定",
    profile: "プロフィール",
    notifications: "通知",
    preferences: "設定",
    save: "変更を保存",
    cancel: "キャンセル",
  },
};

export function PreferencesProvider({ children }) {
  const [appearance, setAppearance] = useState(() => {
    const savedAppearance = localStorage.getItem("appearance");
    return savedAppearance
      ? JSON.parse(savedAppearance)
      : {
          theme: "light",
          fontSize: "medium",
        };
  });

  useEffect(() => {
    // Apply theme
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(appearance.theme);

    // Apply font size
    document.documentElement.style.fontSize =
      appearance.fontSize === "large" ? "18px" : "16px";

    // Save to localStorage
    localStorage.setItem("appearance", JSON.stringify(appearance));
  }, [appearance]);

  const updateAppearance = (newSettings) => {
    setAppearance((prev) => ({ ...prev, ...newSettings }));
  };

  const [preferences, setPreferences] = useState({
    language: localStorage.getItem("language") || "en",
    dateFormat: localStorage.getItem("dateFormat") || "MM/DD/YYYY",
    timeFormat: localStorage.getItem("timeFormat") || "12h",
    timezone: localStorage.getItem("timezone") || "UTC",
    defaultView: localStorage.getItem("defaultView") || "dashboard",
    weekStartsOn: localStorage.getItem("weekStartsOn") || "sunday",
    firstDayOfMonth: localStorage.getItem("firstDayOfMonth") || "1",
    showWeekends: localStorage.getItem("showWeekends") === "true",
    showHolidays: localStorage.getItem("showHolidays") === "true",
  });

  // Update localStorage when preferences change
  useEffect(() => {
    Object.entries(preferences).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
  }, [preferences]);

  // Get translation for a key
  const t = (key) => {
    return (
      translations[preferences.language]?.[key] || translations.en[key] || key
    );
  };

  // Format date based on user preferences
  const formatDate = (date) => {
    const d = new Date(date);
    const format = preferences.dateFormat;
    const locale = preferences.language;

    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    const monthName = d.toLocaleString(locale, { month: "long" });
    const dayName = d.toLocaleString(locale, { weekday: "long" });

    switch (format) {
      case "DD/MM/YYYY":
        return `${day}/${month}/${year}`;
      case "YYYY-MM-DD":
        return `${year}-${month}-${day}`;
      case "MMMM DD, YYYY":
        return `${monthName} ${day}, ${year}`;
      case "DD MMMM YYYY":
        return `${day} ${monthName} ${year}`;
      case "dddd, MMMM DD, YYYY":
        return `${dayName}, ${monthName} ${day}, ${year}`;
      default:
        return `${month}/${day}/${year}`;
    }
  };

  // Format time based on user preferences
  const formatTime = (date) => {
    const d = new Date(date);
    const format = preferences.timeFormat;
    const locale = preferences.language;

    if (format === "24h") {
      return d.toLocaleTimeString(locale, {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return d.toLocaleTimeString(locale, {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format date and time together
  const formatDateTime = (date) => {
    return `${formatDate(date)} ${formatTime(date)}`;
  };

  // Convert time to user's timezone
  const convertToUserTimezone = (date) => {
    const d = new Date(date);
    return d.toLocaleString(preferences.language, {
      timeZone: preferences.timezone,
      dateStyle: "full",
      timeStyle: "long",
    });
  };

  // Get calendar settings
  const getCalendarSettings = () => {
    return {
      weekStartsOn: preferences.weekStartsOn === "monday" ? 1 : 0,
      firstDayOfMonth: parseInt(preferences.firstDayOfMonth),
      showWeekends: preferences.showWeekends,
      showHolidays: preferences.showHolidays,
    };
  };

  // Get available languages
  const getAvailableLanguages = () => {
    return Object.keys(translations).map((code) => ({
      code,
      name: new Intl.DisplayNames([code], { type: "language" }).of(code),
    }));
  };

  // Get available timezones
  const getAvailableTimezones = () => {
    return Intl.supportedValuesOf("timeZone").map((zone) => ({
      value: zone,
      label: zone.replace(/_/g, " "),
    }));
  };

  // Update preferences
  const updatePreferences = (newPreferences) => {
    setPreferences((prev) => ({
      ...prev,
      ...newPreferences,
    }));
  };

  return (
    <PreferencesContext.Provider
      value={{
        appearance,
        updateAppearance,
        preferences,
        updatePreferences,
        formatDate,
        formatTime,
        formatDateTime,
        convertToUserTimezone,
        getCalendarSettings,
        getAvailableLanguages,
        getAvailableTimezones,
        t,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }
  return context;
}
