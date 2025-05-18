import React, { useState, useEffect, useCallback } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  isSameDay,
  addDays,
  subDays,
} from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import Footer from "../components/Footer";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem("calendarEvents");
    return savedEvents ? JSON.parse(savedEvents) : {};
  });

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  const [editingEvent, setEditingEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);

  // Calculate days for the current month view
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Navigation functions
  const nextMonth = useCallback(() => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  }, [currentDate]);

  const prevMonth = useCallback(() => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  }, [currentDate]);

  // Event management functions
  const addEvent = useCallback((date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const newEvent = {
      id: Date.now(),
      title: "New Event",
      time: "12:00 PM",
      type: "event",
      description: "",
      location: "",
      attendees: [],
      priority: "medium",
      notes: "",
    };

    setEvents((prev) => ({
      ...prev,
      [dateStr]: [...(prev[dateStr] || []), newEvent],
    }));

    setEditingEvent(newEvent);
    setShowEventModal(true);
    toast.success("New event created");
  }, []);

  const handleTemplateClick = useCallback(
    (template) => {
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      const newEvent = {
        id: Date.now(),
        ...template,
      };

      setEvents((prev) => ({
        ...prev,
        [dateStr]: [...(prev[dateStr] || []), newEvent],
      }));

      setEditingEvent(newEvent);
      setShowEventModal(true);
      toast.success("New event created from template");
    },
    [selectedDate]
  );

  const editEvent = useCallback((event) => {
    setEditingEvent(event);
    setShowEventModal(true);
  }, []);

  const deleteEvent = useCallback((eventId, dateStr) => {
    setEvents((prev) => {
      const updatedEvents = {
        ...prev,
        [dateStr]: prev[dateStr].filter((event) => event.id !== eventId),
      };

      // Remove the date key if no events remain
      if (updatedEvents[dateStr].length === 0) {
        delete updatedEvents[dateStr];
      }

      return updatedEvents;
    });

    toast.success("Event deleted");
  }, []);

  const saveEvent = useCallback(
    (updatedEvent) => {
      const dateStr = format(selectedDate, "yyyy-MM-dd");

      setEvents((prev) => {
        const updatedEvents = {
          ...prev,
          [dateStr]: prev[dateStr].map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event
          ),
        };

        return updatedEvents;
      });

      setShowEventModal(false);
      setEditingEvent(null);
      toast.success("Event updated");
    },
    [selectedDate]
  );

  // Calculate event statistics
  const eventStats = useCallback(() => {
    const allEvents = Object.values(events).flat();
    const stats = {
      total: allEvents.length,
      byType: {
        meeting: 0,
        deadline: 0,
        call: 0,
        personal: 0,
        task: 0,
        reminder: 0,
        break: 0,
        event: 0,
      },
      byPriority: {
        urgent: 0,
        high: 0,
        medium: 0,
        low: 0,
      },
    };

    allEvents.forEach((event) => {
      // Count by type
      if (event.type && stats.byType.hasOwnProperty(event.type)) {
        stats.byType[event.type]++;
      } else {
        stats.byType.event++; // Default to 'event' type if unknown
      }

      // Count by priority
      if (event.priority && stats.byPriority.hasOwnProperty(event.priority)) {
        stats.byPriority[event.priority]++;
      }
    });

    return stats;
  }, [events]);

  // Get upcoming events
  const getUpcomingEvents = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return Object.entries(events)
      .filter(([date]) => {
        const eventDate = new Date(date);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= today;
      })
      .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
      .slice(0, 5);
  }, [events]);

  // Event Templates
  const eventTemplates = [
    {
      title: "Team Meeting",
      time: "10:00 AM",
      type: "meeting",
      description: "Regular team sync meeting",
      location: "Conference Room",
      attendees: [],
      priority: "medium",
      notes: "",
    },
    {
      title: "Project Deadline",
      time: "5:00 PM",
      type: "deadline",
      description: "Project submission deadline",
      priority: "high",
      notes: "",
    },
    {
      title: "Client Call",
      time: "2:00 PM",
      type: "call",
      description: "Client discussion over the phone",
      location: "Zoom",
      attendees: [],
      priority: "medium",
      notes: "",
    },
    {
      title: "Personal Time",
      time: "3:00 PM",
      type: "personal",
      description: "Personal appointment or task",
      priority: "medium",
      notes: "",
    },
  ];

  // Quick Add Options
  const quickAddOptions = [
    {
      title: "Quick Task",
      time: format(new Date(), "HH:mm"),
      type: "task",
      description: "Quick task or reminder",
      priority: "medium",
      notes: "",
    },
    {
      title: "Reminder",
      time: format(new Date(), "HH:mm"),
      type: "reminder",
      description: "Important reminder",
      priority: "high",
      notes: "",
    },
    {
      title: "Break",
      time: format(new Date(), "HH:mm"),
      type: "break",
      description: "Take a break",
      priority: "low",
      notes: "",
    },
    {
      title: "Custom Event",
      time: format(new Date(), "HH:mm"),
      type: "event",
      description: "",
      priority: "medium",
      notes: "",
    },
  ];

  // Event Modal Component
  const EventModal = ({ event, onSave, onClose }) => {
    const [editedEvent, setEditedEvent] = useState(event);

    const handleChange = (field, value) => {
      setEditedEvent((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(editedEvent);
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl p-8 w-full max-w-4xl"
        >
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                <i className="fas fa-calendar-plus text-lg"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Edit Event</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Title and Type Section */}
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-medium text-indigo-600">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <label className="block text-xs font-medium text-indigo-600">
                      Type
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editedEvent.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      className="flex-1 px-4 py-2 bg-white border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                      placeholder="Enter event title"
                    />
                    <select
                      value={editedEvent.type}
                      onChange={(e) => handleChange("type", e.target.value)}
                      className="w-32 px-4 py-2 bg-white border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                    >
                      <optgroup label="Work">
                        <option value="meeting">Meeting</option>
                        <option value="deadline">Deadline</option>
                        <option value="call">Call</option>
                        <option value="presentation">Presentation</option>
                        <option value="interview">Interview</option>
                        <option value="training">Training</option>
                        <option value="workshop">Workshop</option>
                        <option value="conference">Conference</option>
                      </optgroup>
                      <optgroup label="Personal">
                        <option value="appointment">Appointment</option>
                        <option value="birthday">Birthday</option>
                        <option value="anniversary">Anniversary</option>
                        <option value="holiday">Holiday</option>
                        <option value="travel">Travel</option>
                        <option value="social">Social Event</option>
                      </optgroup>
                      <optgroup label="Health">
                        <option value="doctor">Doctor Visit</option>
                        <option value="dentist">Dentist</option>
                        <option value="fitness">Fitness</option>
                        <option value="therapy">Therapy</option>
                        <option value="checkup">Check-up</option>
                      </optgroup>
                      <optgroup label="Education">
                        <option value="class">Class</option>
                        <option value="exam">Exam</option>
                        <option value="study">Study Session</option>
                        <option value="lecture">Lecture</option>
                        <option value="seminar">Seminar</option>
                      </optgroup>
                      <optgroup label="Other">
                        <option value="event">General Event</option>
                        <option value="reminder">Reminder</option>
                        <option value="task">Task</option>
                        <option value="other">Other</option>
                      </optgroup>
                    </select>
                  </div>
                </div>

                {/* Time and Priority Section */}
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-medium text-green-600">
                      Time
                    </label>
                    <label className="block text-xs font-medium text-green-600">
                      Priority
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      value={editedEvent.time}
                      onChange={(e) => handleChange("time", e.target.value)}
                      className="flex-1 px-4 py-2 bg-white border border-green-200 rounded-lg focus:ring-2 focus:ring-green-100 focus:border-green-500"
                    />
                    <select
                      value={editedEvent.priority}
                      onChange={(e) => handleChange("priority", e.target.value)}
                      className="w-32 px-4 py-2 bg-white border border-green-200 rounded-lg focus:ring-2 focus:ring-green-100 focus:border-green-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                {/* Description Section */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <label className="block text-xs font-medium text-blue-600 mb-2">
                    Description
                  </label>
                  <textarea
                    value={editedEvent.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    className="w-full px-4 py-2 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                    rows="3"
                    placeholder="Enter event description"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Location Section */}
                <div className="p-4 bg-purple-50 rounded-lg">
                  <label className="block text-xs font-medium text-purple-600 mb-2">
                    Location
                  </label>
                  <div className="flex items-center gap-2">
                    <i className="fas fa-map-marker-alt text-purple-600"></i>
                    <input
                      type="text"
                      value={editedEvent.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                      className="w-full px-4 py-2 bg-white border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-500"
                      placeholder="Enter location"
                    />
                  </div>
                </div>

                {/* Attendees Section */}
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <label className="block text-xs font-medium text-yellow-600 mb-2">
                    Attendees
                  </label>
                  <div className="flex items-center gap-2">
                    <i className="fas fa-users text-yellow-600"></i>
                    <input
                      type="text"
                      value={editedEvent.attendees?.join(", ") || ""}
                      onChange={(e) =>
                        handleChange("attendees", e.target.value.split(", "))
                      }
                      className="w-full px-4 py-2 bg-white border border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-100 focus:border-yellow-500"
                      placeholder="Enter attendees (comma separated)"
                    />
                  </div>
                </div>

                {/* Additional Notes Section */}
                <div className="p-4 bg-pink-50 rounded-lg">
                  <label className="block text-xs font-medium text-pink-600 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    value={editedEvent.notes || ""}
                    onChange={(e) => handleChange("notes", e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-500"
                    rows="3"
                    placeholder="Enter any additional notes"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-sm font-medium text-red-600 bg-white border-2 border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out shadow-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium text-indigo-600 bg-white border-2 border-indigo-500 rounded-lg hover:bg-indigo-500 hover:text-white transition-all duration-300 ease-in-out shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-6 border border-indigo-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Calendar
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your schedule and events
              </p>
            </div>
            <button
              onClick={() => addEvent(selectedDate)}
              className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white border-2 border-indigo-500 rounded-lg hover:bg-indigo-500 hover:text-white transition-all duration-300 ease-in-out shadow-sm flex items-center gap-2"
            >
              <i className="fas fa-plus"></i>
              Add Event
            </button>
          </div>
        </div>

        {/* Event Templates Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-6 border border-indigo-100">
          <div className="flex flex-col gap-6">
            {/* Templates Header */}
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <i className="fas fa-calendar-plus text-indigo-500"></i>
                  Event Templates
                </h2>
                <p className="text-gray-600 mt-1">
                  Quick add common events and tasks to your calendar
                </p>
              </div>
            </div>

            {/* Event Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {eventTemplates.map((template, index) => (
                <div
                  key={index}
                  onClick={() => handleTemplateClick(template)}
                  className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 border border-indigo-100 cursor-pointer hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <i
                        className={`fas fa-${
                          template.type === "meeting"
                            ? "users"
                            : template.type === "deadline"
                            ? "flag"
                            : template.type === "call"
                            ? "phone"
                            : template.type === "personal"
                            ? "user"
                            : "calendar"
                        } text-indigo-600`}
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
                  <div className="flex items-center gap-2 text-xs text-indigo-600">
                    <i className="fas fa-clock"></i>
                    <span>{template.time}</span>
                    {template.priority === "high" && (
                      <>
                        <i className="fas fa-exclamation-circle ml-2"></i>
                        <span>High Priority</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Add Options */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickAddOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleTemplateClick(option)}
                  className="bg-white/50 rounded-lg p-3 border border-indigo-100 hover:bg-indigo-50 transition-colors duration-200"
                >
                  <div className="flex items-center gap-2">
                    <i
                      className={`fas fa-${
                        option.type === "task"
                          ? "tasks"
                          : option.type === "reminder"
                          ? "bell"
                          : option.type === "break"
                          ? "coffee"
                          : "plus"
                      } text-indigo-500`}
                    ></i>
                    <span className="text-sm font-medium text-gray-700">
                      {option.title}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar Column */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-100">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={prevMonth}
                    className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
                    <i className="fas fa-chevron-left text-indigo-600"></i>
                  </button>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {format(currentDate, "MMMM yyyy")}
                  </h2>
                  <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
                    <i className="fas fa-chevron-right text-indigo-600"></i>
                  </button>
                </div>
                <button
                  onClick={() => addEvent(selectedDate)}
                  className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white border-2 border-indigo-500 rounded-lg hover:bg-indigo-500 hover:text-white transition-all duration-300 ease-in-out shadow-sm"
                >
                  Add Event
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center text-xs font-medium text-gray-500 py-2"
                    >
                      {day}
                    </div>
                  )
                )}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => {
                  const dateStr = format(day, "yyyy-MM-dd");
                  const dayEvents = events[dateStr] || [];
                  const isSelected = isSameDay(day, selectedDate);

                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedDate(day)}
                      className={`aspect-square p-1 ${
                        isSameMonth(day, currentDate)
                          ? isSelected
                            ? "bg-indigo-100"
                            : "bg-white"
                          : "bg-gray-50 text-gray-400"
                      } rounded-lg border ${
                        isSelected ? "border-indigo-300" : "border-gray-100"
                      } cursor-pointer hover:bg-indigo-50 transition-colors`}
                    >
                      <div className="flex flex-col h-full">
                        <span
                          className={`text-xs font-medium ${
                            isToday(day)
                              ? "text-indigo-600"
                              : isSelected
                              ? "text-indigo-900"
                              : "text-gray-700"
                          }`}
                        >
                          {day.getDate()}
                        </span>
                        {dayEvents.length > 0 && (
                          <div className="mt-1 space-y-1">
                            {dayEvents.slice(0, 2).map((event, eventIndex) => (
                              <div
                                key={eventIndex}
                                className="text-xs p-1 rounded bg-indigo-50 text-indigo-600 truncate"
                              >
                                {event.title}
                              </div>
                            ))}
                            {dayEvents.length > 2 && (
                              <div className="text-xs text-gray-500">
                                +{dayEvents.length - 2} more
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Event Details */}
            <div className="mt-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Events for {format(selectedDate, "MMMM d, yyyy")}
                </h2>
              </div>
              <div className="space-y-4">
                {(events[format(selectedDate, "yyyy-MM-dd")] || []).map(
                  (event) => (
                    <div
                      key={event.id}
                      className="flex items-start p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl border border-indigo-100 group"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                        <i
                          className={`fas fa-${
                            event.type === "meeting"
                              ? "users"
                              : event.type === "deadline"
                              ? "flag"
                              : event.type === "call"
                              ? "phone"
                              : "calendar"
                          }`}
                        ></i>
                      </div>
                      <div className="ml-4 flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-indigo-900">
                              {event.title}
                            </h3>
                            <p className="text-sm text-indigo-600">
                              {event.time}
                            </p>
                          </div>
                          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => editEvent(event)}
                              className="p-1 text-indigo-500 hover:text-indigo-700"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              onClick={() =>
                                deleteEvent(
                                  event.id,
                                  format(selectedDate, "yyyy-MM-dd")
                                )
                              }
                              className="p-1 text-red-500 hover:text-red-700"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                        {event.description && (
                          <p className="mt-2 text-sm text-indigo-700">
                            {event.description}
                          </p>
                        )}
                        {event.location && (
                          <p className="mt-1 text-sm text-indigo-600">
                            <i className="fas fa-map-marker-alt mr-1"></i>
                            {event.location}
                          </p>
                        )}
                        {event.attendees && event.attendees.length > 0 && (
                          <div className="mt-2 flex items-center">
                            <i className="fas fa-users text-indigo-400 mr-2"></i>
                            <span className="text-sm text-indigo-600">
                              {event.attendees.join(", ")}
                            </span>
                          </div>
                        )}
                        <div className="mt-2">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                            ${
                              event.priority === "urgent"
                                ? "bg-red-100 text-red-800"
                                : event.priority === "high"
                                ? "bg-orange-100 text-orange-800"
                                : event.priority === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }
                          `}
                          >
                            {event.priority.charAt(0).toUpperCase() +
                              event.priority.slice(1)}{" "}
                            Priority
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                )}
                {(!events[format(selectedDate, "yyyy-MM-dd")] ||
                  events[format(selectedDate, "yyyy-MM-dd")].length === 0) && (
                  <p className="text-gray-500 text-center py-4">
                    No events scheduled for this day
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="fas fa-bolt text-indigo-500"></i>
                Quick Actions
              </h2>
              <div className="space-y-4">
                <button
                  onClick={() => addEvent(selectedDate)}
                  className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500/15 to-purple-500/20 text-indigo-700 rounded-xl hover:from-indigo-500/20 hover:to-purple-500/25 transition-all duration-300 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <i className="fas fa-plus"></i>
                    Add Event
                  </span>
                  <i className="fas fa-chevron-right"></i>
                </button>
                <button
                  onClick={() => setSelectedDate(new Date())}
                  className="w-full px-4 py-3 bg-gradient-to-r from-purple-500/15 to-pink-500/20 text-purple-700 rounded-xl hover:from-purple-500/20 hover:to-pink-500/25 transition-all duration-300 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <i className="fas fa-calendar-day"></i>
                    Today
                  </span>
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>

            {/* Mini Calendar */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="fas fa-calendar-alt text-indigo-500"></i>
                Mini Calendar
              </h2>
              <div className="grid grid-cols-7 gap-1">
                {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-gray-500 py-1"
                  >
                    {day}
                  </div>
                ))}
                {eachDayOfInterval({
                  start: startOfMonth(currentDate),
                  end: endOfMonth(currentDate),
                }).map((day, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedDate(day)}
                    className={`text-center text-xs py-1 cursor-pointer rounded ${
                      isSameDay(day, selectedDate)
                        ? "bg-indigo-100 text-indigo-900"
                        : isToday(day)
                        ? "text-indigo-600"
                        : "text-gray-700"
                    }`}
                  >
                    {day.getDate()}
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="fas fa-calendar-alt text-indigo-500"></i>
                Upcoming Events
              </h2>
              <div className="space-y-4">
                {getUpcomingEvents().map(([date, dayEvents]) => (
                  <div
                    key={date}
                    className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 border border-indigo-100 hover:shadow-md transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedDate(new Date(date))}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <i className="fas fa-calendar text-indigo-600"></i>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-indigo-600">
                            {format(new Date(date), "EEEE, MMMM d")}
                          </div>
                          <div className="text-xs text-indigo-500">
                            {dayEvents.length}{" "}
                            {dayEvents.length === 1 ? "event" : "events"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className="flex items-center gap-2 p-2 bg-white/50 rounded-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            editEvent(event);
                          }}
                        >
                          <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                            <i
                              className={`fas fa-${
                                event.type === "meeting"
                                  ? "users"
                                  : event.type === "deadline"
                                  ? "flag"
                                  : event.type === "call"
                                  ? "phone"
                                  : event.type === "personal"
                                  ? "user"
                                  : "calendar"
                              } text-indigo-600 text-xs`}
                            ></i>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-indigo-900 truncate">
                              {event.title}
                            </div>
                            <div className="text-xs text-indigo-600">
                              {event.time}
                            </div>
                          </div>
                          <div
                            className={`text-xs font-medium px-2 py-0.5 rounded ${
                              event.priority === "urgent"
                                ? "bg-red-100 text-red-800"
                                : event.priority === "high"
                                ? "bg-orange-100 text-orange-800"
                                : event.priority === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {event.priority}
                          </div>
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-indigo-600 text-center">
                          +{dayEvents.length - 2} more events
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {getUpcomingEvents().length === 0 && (
                  <div className="text-center py-4">
                    <div className="text-gray-500 mb-2">No upcoming events</div>
                    <button
                      onClick={() => addEvent(new Date())}
                      className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                    >
                      Add your first event
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showEventModal && editingEvent && (
            <EventModal
              event={editingEvent}
              onSave={saveEvent}
              onClose={() => {
                setShowEventModal(false);
                setEditingEvent(null);
              }}
            />
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default Calendar;
