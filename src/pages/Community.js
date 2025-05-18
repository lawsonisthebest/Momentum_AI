import React from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

const Community = () => {
  const events = [
    {
      title: "Productivity Workshop",
      date: "March 25, 2024",
      time: "2:00 PM EST",
      type: "Workshop",
      icon: "chalkboard-teacher",
      color: "blue",
    },
    {
      title: "Wellness Challenge",
      date: "March 28, 2024",
      time: "10:00 AM EST",
      type: "Challenge",
      icon: "heartbeat",
      color: "pink",
    },
    {
      title: "Goal Setting Masterclass",
      date: "April 2, 2024",
      time: "3:00 PM EST",
      type: "Masterclass",
      icon: "bullseye",
      color: "purple",
    },
  ];

  const discussions = [
    {
      title: "Tips for maintaining work-life balance",
      author: "Sarah Johnson",
      replies: 24,
      views: 156,
      category: "Wellness",
    },
    {
      title: "How I increased my productivity by 200%",
      author: "Michael Chen",
      replies: 18,
      views: 203,
      category: "Productivity",
    },
    {
      title: "Best practices for goal tracking",
      author: "Emma Davis",
      replies: 32,
      views: 189,
      category: "Goals",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent mb-6">
            Community
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with like-minded individuals, share experiences, and grow
            together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-indigo-100"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Upcoming Events
            </h2>
            <div className="space-y-6">
              {events.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg bg-${event.color}-100 flex items-center justify-center flex-shrink-0`}
                    >
                      <i
                        className={`fas fa-${event.icon} text-${event.color}-500 text-xl`}
                      ></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {event.title}
                      </h3>
                      <div className="mt-2 space-y-1">
                        <p className="text-gray-600 flex items-center gap-2">
                          <i className="far fa-calendar text-gray-400"></i>
                          {event.date}
                        </p>
                        <p className="text-gray-600 flex items-center gap-2">
                          <i className="far fa-clock text-gray-400"></i>
                          {event.time}
                        </p>
                      </div>
                      <span
                        className={`mt-3 inline-block px-3 py-1 rounded-full text-sm font-medium bg-${event.color}-100 text-${event.color}-600`}
                      >
                        {event.type}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <button className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold rounded-lg hover:opacity-90 transition-opacity">
              View All Events
            </button>
          </motion.div>

          {/* Active Discussions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-indigo-100"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Active Discussions
            </h2>
            <div className="space-y-6">
              {discussions.map((discussion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {discussion.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <i className="far fa-user text-gray-400"></i>
                        {discussion.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="far fa-comment text-gray-400"></i>
                        {discussion.replies} replies
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="far fa-eye text-gray-400"></i>
                        {discussion.views} views
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-600">
                      {discussion.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
            <button className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold rounded-lg hover:opacity-90 transition-opacity">
              Join Discussion
            </button>
          </motion.div>
        </div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-indigo-100"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Community Stats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Active Members</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                500+
              </div>
              <div className="text-gray-600">Daily Posts</div>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-pink-600 mb-2">50+</div>
              <div className="text-gray-600">Monthly Events</div>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">95%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Community;
