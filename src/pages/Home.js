import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const releaseLogs = [
    {
      version: "1.0.0",
      date: "2024-03-20",
      changes: [
        "Initial release of Momentum",
        "Calendar feature with event management",
        "Task tracking system",
        "Wellness tracking dashboard",
        "Goal setting and recommendations",
        "Rewards system integration",
      ],
    },
    {
      version: "0.9.0",
      date: "2024-03-15",
      changes: [
        "Beta testing phase",
        "User feedback implementation",
        "Performance optimizations",
        "UI/UX improvements",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent mb-6">
              Welcome to Momentum
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your all-in-one platform for personal growth, productivity, and
              wellness tracking.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0 }}
              className="mt-8"
            >
              <motion.button
                onClick={() => navigate("/dashboard")}
                className="px-12 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-lg font-bold rounded-full shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start your journey
                  <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-indigo-100"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <i className="fas fa-bullseye text-indigo-500"></i>
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At Momentum, we believe in empowering individuals to achieve their
            full potential through a holistic approach to personal development.
            Our platform combines productivity tools, wellness tracking, and
            goal management to help you build momentum in every aspect of your
            life.
          </p>
        </motion.div>
      </div>

      {/* What to Expect Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-indigo-100"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <i className="fas fa-star text-indigo-500"></i>
            What to Expect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
                <i className="fas fa-calendar text-indigo-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Smart Calendar
              </h3>
              <p className="text-gray-600">
                Manage your schedule with an intelligent calendar that helps you
                balance work and life.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <i className="fas fa-tasks text-purple-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Task Management
              </h3>
              <p className="text-gray-600">
                Stay organized with our intuitive task management system and
                productivity tools.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl">
              <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center mb-4">
                <i className="fas fa-heartbeat text-pink-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Wellness Tracking
              </h3>
              <p className="text-gray-600">
                Monitor your physical and mental well-being with comprehensive
                wellness tracking.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Release Logs Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-indigo-100"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <i className="fas fa-code-branch text-indigo-500"></i>
            Release Logs
          </h2>
          <div className="space-y-8">
            {releaseLogs.map((release, index) => (
              <div
                key={index}
                className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium">
                    v{release.version}
                  </span>
                  <span className="text-gray-500">{release.date}</span>
                </div>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {release.changes.map((change, changeIndex) => (
                    <li key={changeIndex}>{change}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-indigo-100"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <i className="fas fa-rocket text-indigo-500"></i>
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                <i className="fas fa-chart-line text-green-600"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Progress Tracking
                </h3>
                <p className="text-gray-600">
                  Visualize your progress with intuitive charts and analytics.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <i className="fas fa-bullseye text-blue-600"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Goal Setting
                </h3>
                <p className="text-gray-600">
                  Set and track your personal and professional goals.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                <i className="fas fa-trophy text-purple-600"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Rewards System
                </h3>
                <p className="text-gray-600">
                  Earn rewards and stay motivated with our gamification system.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center flex-shrink-0">
                <i className="fas fa-heart text-pink-600"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Wellness Focus
                </h3>
                <p className="text-gray-600">
                  Track your physical and mental well-being with comprehensive
                  tools.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Future Goals Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-indigo-100"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <i className="fas fa-lightbulb text-indigo-500"></i>
            Future Goals
          </h2>

          <div className="space-y-8">
            {/* Mobile Experience */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <i className="fas fa-mobile-alt text-blue-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Mobile Experience
                </h3>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700">
                  We're developing native mobile applications for iOS and
                  Android that will bring the full Momentum experience to your
                  pocket. The mobile apps will feature:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Offline functionality for uninterrupted productivity</li>
                  <li>
                    Push notifications for important reminders and updates
                  </li>
                  <li>Biometric authentication for enhanced security</li>
                  <li>Widget support for quick access to key features</li>
                  <li>Dark mode and dynamic theming</li>
                </ul>
              </div>
            </div>

            {/* Wearable Integration */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <i className="fas fa-clock text-purple-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Wearable Integration
                </h3>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Our upcoming smartwatch apps for Apple Watch and Wear OS will
                  revolutionize how you track your wellness and productivity on
                  the go:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Real-time wellness metrics and activity tracking</li>
                  <li>Quick task completion and progress updates</li>
                  <li>Haptic feedback for reminders and achievements</li>
                  <li>Voice commands for hands-free operation</li>
                  <li>Customizable watch faces with key metrics</li>
                </ul>
              </div>
            </div>

            {/* AI-Powered Features */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                  <i className="fas fa-brain text-green-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  AI-Powered Features
                </h3>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700">
                  We're integrating advanced AI capabilities to make Momentum
                  even more intelligent and personalized:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Smart scheduling that adapts to your work patterns</li>
                  <li>Predictive task prioritization based on your habits</li>
                  <li>Personalized wellness recommendations</li>
                  <li>Natural language processing for task creation</li>
                  <li>Automated progress insights and suggestions</li>
                </ul>
              </div>
            </div>

            {/* Community Features */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                  <i className="fas fa-users text-yellow-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Community Features
                </h3>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700">
                  We're building a vibrant community platform to connect users
                  and enhance the Momentum experience:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Group challenges and accountability partners</li>
                  <li>Shared goal tracking and progress sharing</li>
                  <li>Community forums and knowledge sharing</li>
                  <li>Expert-led workshops and webinars</li>
                  <li>Integration with popular social platforms</li>
                </ul>
              </div>
            </div>

            {/* Enterprise Solutions */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                  <i className="fas fa-building text-red-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Enterprise Solutions
                </h3>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700">
                  We're developing comprehensive solutions for businesses and
                  organizations:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Team collaboration and project management</li>
                  <li>Customizable workspace analytics</li>
                  <li>
                    Integration with enterprise tools (Slack, Microsoft Teams,
                    etc.)
                  </li>
                  <li>Advanced security and compliance features</li>
                  <li>Dedicated support and training programs</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Why Pick Momentum Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-indigo-100"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <i className="fas fa-crown text-indigo-500"></i>
            Why Pick Momentum?
          </h2>

          <div className="space-y-8">
            {/* All-in-One Solution */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <i className="fas fa-puzzle-piece text-emerald-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  All-in-One Solution
                </h3>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Unlike other platforms that focus on just one aspect of
                  personal development, Momentum brings everything together:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>
                    Seamless integration between productivity and wellness
                  </li>
                  <li>Unified dashboard for all your goals and progress</li>
                  <li>Cross-platform synchronization</li>
                  <li>Comprehensive analytics and insights</li>
                  <li>One subscription for all features</li>
                </ul>
              </div>
            </div>

            {/* Privacy & Security */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center">
                  <i className="fas fa-shield-alt text-cyan-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Privacy & Security
                </h3>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Your data security and privacy are our top priorities:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>End-to-end encryption for all data</li>
                  <li>GDPR and CCPA compliant</li>
                  <li>Regular security audits and updates</li>
                  <li>Transparent data usage policies</li>
                  <li>Advanced access controls and permissions</li>
                </ul>
              </div>
            </div>

            {/* User Experience */}
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-violet-100 flex items-center justify-center">
                  <i className="fas fa-magic text-violet-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Superior User Experience
                </h3>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700">
                  We've designed Momentum with user experience at its core:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Intuitive and clean interface</li>
                  <li>Customizable themes and layouts</li>
                  <li>Keyboard shortcuts for power users</li>
                  <li>Responsive design for all devices</li>
                  <li>Accessibility features for all users</li>
                </ul>
              </div>
            </div>

            {/* Customer Support */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                  <i className="fas fa-headset text-amber-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Exceptional Support
                </h3>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Our commitment to customer success goes beyond the platform:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>24/7 customer support</li>
                  <li>Personalized onboarding sessions</li>
                  <li>Regular feature webinars</li>
                  <li>Active community forums</li>
                  <li>Regular feedback implementation</li>
                </ul>
              </div>
            </div>

            {/* Value for Money */}
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-rose-100 flex items-center justify-center">
                  <i className="fas fa-gem text-rose-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Unbeatable Value
                </h3>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Get more for your investment with Momentum:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Competitive pricing with premium features</li>
                  <li>Free tier with essential features</li>
                  <li>Family and team plans available</li>
                  <li>Regular feature updates at no extra cost</li>
                  <li>Loyalty rewards and referral bonuses</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Analytics & Insights Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-indigo-100"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <i className="fas fa-chart-line text-indigo-500"></i>
            Community Impact
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Community Milestones */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Community Milestones
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Active Users</div>
                  <div className="text-2xl font-bold text-indigo-600">50K+</div>
                  <div className="text-xs text-green-500 mt-1">
                    ↑ 200% this year
                  </div>
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">
                    Goals Achieved
                  </div>
                  <div className="text-2xl font-bold text-indigo-600">
                    1.2M+
                  </div>
                  <div className="text-xs text-green-500 mt-1">
                    ↑ 150% this year
                  </div>
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">
                    Community Support
                  </div>
                  <div className="text-2xl font-bold text-indigo-600">98%</div>
                  <div className="text-xs text-green-500 mt-1">
                    Satisfaction Rate
                  </div>
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Global Reach</div>
                  <div className="text-2xl font-bold text-indigo-600">120+</div>
                  <div className="text-xs text-green-500 mt-1">Countries</div>
                </div>
              </div>
            </div>

            {/* Community Impact */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Community Impact
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Wellness Improvements</span>
                    <span className="text-gray-900 font-medium">89%</span>
                  </div>
                  <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: "89%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Productivity Boost</span>
                    <span className="text-gray-900 font-medium">92%</span>
                  </div>
                  <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-pink-500 rounded-full"
                      style={{ width: "92%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Life Balance</span>
                    <span className="text-gray-900 font-medium">85%</span>
                  </div>
                  <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Community Support</span>
                    <span className="text-gray-900 font-medium">95%</span>
                  </div>
                  <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: "95%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">User Retention</span>
                    <span className="text-gray-900 font-medium">91%</span>
                  </div>
                  <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: "91%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Community Growth */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Community Growth
            </h3>
            <div className="grid grid-cols-7 gap-4">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map(
                (month) => (
                  <div key={month} className="text-center">
                    <div className="text-sm text-gray-500 mb-2">{month}</div>
                    <div className="relative h-32 bg-white/50 rounded-lg overflow-hidden">
                      <div
                        className="absolute bottom-0 w-full bg-emerald-500 rounded-t-lg"
                        style={{
                          height: `${Math.random() * 40 + 40}%`,
                          opacity: 0.8,
                        }}
                      ></div>
                    </div>
                    <div className="mt-2 text-sm font-medium text-gray-700">
                      {Math.floor(Math.random() * 10 + 15)}K
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Community Success */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Community Success Rate
              </h3>
              <div className="relative h-48">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-amber-600">94%</div>
                    <div className="text-sm text-gray-600 mt-1">Goal Rate</div>
                  </div>
                </div>
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#f3f4f6"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="10"
                    strokeDasharray="283"
                    strokeDashoffset="17"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Community Engagement
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Daily Active Users</span>
                    <span className="text-gray-900 font-medium">35K+</span>
                  </div>
                  <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-500 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Community Challenges</span>
                    <span className="text-gray-900 font-medium">500+</span>
                  </div>
                  <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Success Stories</span>
                    <span className="text-gray-900 font-medium">10K+</span>
                  </div>
                  <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Community Events</span>
                    <span className="text-gray-900 font-medium">250+</span>
                  </div>
                  <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
