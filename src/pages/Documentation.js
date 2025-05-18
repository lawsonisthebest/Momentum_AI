import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Add effect to handle body scroll
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedItem]);

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const results = [];
    const searchTerms = query.toLowerCase().split(" ");

    sections.forEach((section) => {
      section.items.forEach((item) => {
        // Search in title and description
        const titleMatch = item.title.toLowerCase();
        const descMatch = item.description.toLowerCase();

        // Search in content
        let contentMatch = false;
        if (item.content) {
          if (item.content.overview) {
            contentMatch = item.content.overview.toLowerCase();
          }
          if (item.content.sections) {
            item.content.sections.forEach((section) => {
              if (section.content) {
                contentMatch += section.content.toLowerCase();
              }
            });
          }
        }

        // Check if all search terms are found
        const matches = searchTerms.every(
          (term) =>
            titleMatch.includes(term) ||
            descMatch.includes(term) ||
            contentMatch.includes(term)
        );

        if (matches) {
          results.push({
            section: section.title,
            item: item,
          });
        }
      });
    });

    setSearchResults(results);
    setShowSearchResults(true);
  };

  const sections = [
    {
      title: "Getting Started",
      items: [
        {
          title: "Quick Start Guide",
          description:
            "Learn how to set up and start using Momentum in minutes.",
          icon: "rocket",
          color: "blue",
          content: {
            overview:
              "Welcome to Momentum! This guide will help you get started with our platform and make the most of its features.",
            sections: [
              {
                title: "Creating Your Account",
                content: `Getting started with Momentum is easy. Here's what you need to do:

1. Visit our website and click the "Sign Up" button
2. Choose your preferred sign-up method:
   - Email and password
   - Google account
   - Apple ID
   - Microsoft account

After signing up, you'll need to:
- Verify your email address
- Complete your profile information
- Set up your preferences
- Choose your notification settings

Security Tips:
- Use a strong, unique password
- Enable two-factor authentication
- Keep your recovery email up to date
- Review your account settings regularly`,
              },
              {
                title: "Setting Up Your Dashboard",
                content: `Your dashboard is your command center in Momentum. Here's how to set it up effectively:

1. Customize Your Layout:
   - Drag and drop widgets to arrange them
   - Choose your preferred color scheme
   - Set your default view (daily, weekly, monthly)
   - Configure your quick access menu

2. Add Essential Widgets:
   - Task overview
   - Calendar preview
   - Wellness tracker
   - Goal progress
   - Recent activities
   - Quick notes

3. Configure Notifications:
   - Set up email notifications
   - Enable push notifications
   - Configure reminder preferences
   - Set up calendar sync

Pro Tips:
- Start with the essential widgets and add more as needed
- Use the dashboard customization to match your workflow
- Set up keyboard shortcuts for quick access
- Regularly review and update your dashboard layout`,
              },
              {
                title: "Starting Your Journey",
                content: `Now that you're set up, it's time to start using Momentum effectively:

1. Create Your First Goal:
   - Choose a specific, measurable goal
   - Set a realistic timeline
   - Break it down into smaller tasks
   - Track your progress regularly

2. Set Up Your First Tracker:
   - Choose what you want to track (habits, tasks, wellness)
   - Set your tracking frequency
   - Configure reminders
   - Set up your success metrics

3. Plan Your First Week:
   - Schedule your important tasks
   - Set up recurring events
   - Plan your wellness activities
   - Review your progress daily

Best Practices:
- Start small and build up gradually
- Be consistent with your tracking
- Review and adjust your goals regularly
- Celebrate your progress, no matter how small`,
              },
            ],
          },
        },
        {
          title: "Account Setup",
          description: "Create and configure your Momentum account.",
          icon: "user-plus",
          color: "purple",
          content: {
            overview:
              "Your Momentum account is your personal space for growth and productivity. Learn how to set it up for optimal use.",
            sections: [
              {
                title: "Profile Settings",
                content: `Your profile is the foundation of your Momentum experience. Here's how to set it up:

1. Personal Information:
   - Update your profile picture
   - Add your full name
   - Set your timezone
   - Add your bio
   - Configure your language preferences

2. Privacy Settings:
   - Control who can see your profile
   - Manage your activity visibility
   - Configure data sharing preferences
   - Set up privacy boundaries
   - Manage connected accounts

3. Notification Preferences:
   - Email notification settings
   - Push notification preferences
   - Calendar reminders
   - Task alerts
   - Goal progress updates

4. Theme Customization:
   - Choose your color scheme
   - Select your preferred font
   - Configure dark/light mode
   - Customize your dashboard layout
   - Set up custom widgets`,
              },
              {
                title: "Security Settings",
                content: `Keeping your account secure is crucial. Here's how to protect your Momentum account:

1. Two-Factor Authentication:
   - Enable 2FA for extra security
   - Set up backup codes
   - Configure trusted devices
   - Manage authentication apps

2. Password Management:
   - Create a strong password
   - Set up password recovery
   - Enable password expiration
   - Configure password requirements
   - Use a password manager

3. Session Management:
   - View active sessions
   - Manage device access
   - Set up session timeouts
   - Configure login notifications
   - Handle suspicious activity

4. Data Privacy:
   - Review data collection
   - Configure data sharing
   - Manage third-party access
   - Set up data export
   - Configure data retention`,
              },
            ],
          },
        },
        {
          title: "Basic Navigation",
          description: "Learn the basics of navigating through Momentum.",
          icon: "compass",
          color: "pink",
          content: {
            overview:
              "Master the basics of Momentum's interface to navigate efficiently and make the most of your experience.",
            sections: [
              {
                title: "Dashboard Navigation",
                content: `Your dashboard is your command center. Here's how to navigate it effectively:

1. Main Navigation:
   - Use the sidebar for quick access
   - Navigate between sections
   - Access your profile
   - View notifications
   - Check your calendar

2. Quick Actions:
   - Create new tasks
   - Add calendar events
   - Start tracking
   - Set new goals
   - View reports

3. Widget Management:
   - Add new widgets
   - Rearrange existing widgets
   - Configure widget settings
   - Remove unused widgets
   - Customize widget views

Keyboard Shortcuts:
- Ctrl/Cmd + D: Open Dashboard
- Ctrl/Cmd + N: New Task
- Ctrl/Cmd + E: New Event
- Ctrl/Cmd + G: New Goal
- Ctrl/Cmd + /: Show Shortcuts`,
              },
              {
                title: "Calendar Navigation",
                content: `The calendar is your scheduling hub. Learn how to use it effectively:

1. View Options:
   - Switch between day/week/month views
   - Toggle between calendar types
   - Filter events by category
   - Show/hide specific calendars
   - Customize the view

2. Event Management:
   - Create new events
   - Edit existing events
   - Set up recurring events
   - Manage event reminders
   - Handle event conflicts

3. Calendar Features:
   - Drag and drop events
   - Resize event duration
   - Set up calendar sharing
   - Configure calendar sync
   - Manage calendar notifications

Keyboard Shortcuts:
- Ctrl/Cmd + C: Open Calendar
- Ctrl/Cmd + Shift + E: New Event
- Ctrl/Cmd + F: Find Events
- Ctrl/Cmd + T: Today's View
- Ctrl/Cmd + G: Go to Date`,
              },
              {
                title: "Task Management",
                content: `Tasks are the building blocks of your productivity. Here's how to manage them:

1. Task Creation:
   - Create new tasks
   - Set due dates
   - Add descriptions
   - Assign priorities
   - Set up reminders

2. Task Organization:
   - Create task lists
   - Use labels and tags
   - Set up filters
   - Create custom views
   - Manage task dependencies

3. Task Features:
   - Track progress
   - Add attachments
   - Set up recurring tasks
   - Create subtasks
   - Share tasks

Keyboard Shortcuts:
- Ctrl/Cmd + T: Open Tasks
- Ctrl/Cmd + Shift + T: New Task
- Ctrl/Cmd + F: Find Tasks
- Ctrl/Cmd + L: Task List
- Ctrl/Cmd + P: Set Priority`,
              },
            ],
          },
        },
        {
          title: "System Requirements",
          description:
            "Learn about the technical requirements for using Momentum.",
          icon: "laptop",
          color: "blue",
          content: {
            overview:
              "Ensure your system meets the requirements for optimal Momentum performance.",
            sections: [
              {
                title: "Browser Requirements",
                content: `Momentum is optimized for modern web browsers. Here are the supported browsers and their minimum versions:

1. Chrome (Latest 2 versions)
   - Version 90 or higher
   - Best performance and feature support
   - Recommended for optimal experience

2. Firefox (Latest 2 versions)
   - Version 88 or higher
   - Full feature support
   - Excellent performance

3. Safari (Latest 2 versions)
   - Version 14 or higher
   - Full feature support
   - Native integration with Apple services

4. Edge (Latest 2 versions)
   - Version 90 or higher
   - Full feature support
   - Microsoft services integration

System Requirements:
- 4GB RAM minimum (8GB recommended)
- 100MB free disk space
- Stable internet connection
- Modern CPU (2GHz or higher)
- WebGL support for visualizations`,
              },
              {
                title: "Mobile Support",
                content: `Momentum is fully responsive and works on mobile devices:

1. iOS Requirements:
   - iOS 14 or higher
   - Safari browser
   - 2GB RAM minimum
   - 100MB free storage

2. Android Requirements:
   - Android 8.0 or higher
   - Chrome browser
   - 2GB RAM minimum
   - 100MB free storage

3. Mobile Features:
   - Responsive design
   - Touch-optimized interface
   - Offline capabilities
   - Push notifications
   - Camera integration
   - Location services
   - Biometric authentication`,
              },
            ],
          },
        },
        {
          title: "Installation Guide",
          description:
            "Step-by-step guide to installing and setting up Momentum.",
          icon: "download",
          color: "green",
          content: {
            overview:
              "Follow these steps to install and set up Momentum on your system.",
            sections: [
              {
                title: "Web Installation",
                content: `Installing Momentum in your web browser:

1. Browser Setup:
   - Clear browser cache
   - Enable JavaScript
   - Allow cookies
   - Enable notifications
   - Configure pop-up settings

2. Account Creation:
   - Visit momentum.com
   - Click "Sign Up"
   - Choose sign-up method
   - Verify email
   - Complete profile

3. Initial Setup:
   - Choose preferences
   - Set up notifications
   - Configure privacy settings
   - Import data (optional)
   - Set up integrations`,
              },
              {
                title: "Mobile Installation",
                content: `Installing Momentum on mobile devices:

1. iOS Installation:
   - Open App Store
   - Search "Momentum"
   - Tap "Get" or "Download"
   - Authenticate if needed
   - Wait for installation
   - Open app
   - Sign in or create account

2. Android Installation:
   - Open Play Store
   - Search "Momentum"
   - Tap "Install"
   - Accept permissions
   - Wait for installation
   - Open app
   - Sign in or create account

3. Post-Installation:
   - Grant permissions
   - Set up notifications
   - Configure sync
   - Enable features
   - Customize settings`,
              },
            ],
          },
        },
      ],
    },
    {
      title: "Core Features",
      items: [
        {
          title: "Calendar Management",
          description: "Master the calendar and event management features.",
          icon: "calendar",
          color: "indigo",
          content: {
            overview:
              "The calendar is your scheduling command center. Learn how to use it effectively to manage your time and commitments.",
            sections: [
              {
                title: "Creating and Managing Events",
                content: `Master the art of event management in Momentum:

1. Creating Events:
   - Click the + button or use Ctrl/Cmd + Shift + E
   - Fill in event details:
     * Title and description
     * Date and time
     * Location (physical or virtual)
     * Participants
     * Reminders
     * Color coding
     * Recurrence settings

2. Event Types:
   - One-time events
   - Recurring events
   - All-day events
   - Multi-day events
   - Reminders
   - Tasks with deadlines

3. Event Management:
   - Edit event details
   - Change event status
   - Update participants
   - Modify reminders
   - Handle conflicts
   - Reschedule events

4. Advanced Features:
   - Calendar sharing
   - Multiple calendar views
   - Calendar sync
   - Time zone support
   - Availability settings
   - Meeting scheduling`,
              },
              {
                title: "Calendar Organization",
                content: `Keep your calendar organized and efficient:

1. Calendar Views:
   - Day view for detailed planning
   - Week view for overview
   - Month view for long-term planning
   - List view for quick review
   - Timeline view for project planning

2. Organization Tools:
   - Color coding
   - Categories and labels
   - Filters and search
   - Custom views
   - Calendar groups

3. Time Management:
   - Block time for focused work
   - Set up buffer times
   - Schedule breaks
   - Plan recurring activities
   - Balance commitments

4. Best Practices:
   - Regular calendar review
   - Time blocking
   - Buffer time allocation
   - Priority scheduling
   - Conflict resolution`,
              },
            ],
          },
        },
        {
          title: "Task Tracking",
          description:
            "Track and manage your time effectively with Momentum's time tracking features.",
          icon: "clock",
          color: "purple",
          content: {
            overview:
              "Master time management with Momentum's comprehensive time tracking tools.",
            sections: [
              {
                title: "Time Tracking Basics",
                content: `Get started with time tracking:

1. Setting Up Time Tracking:
   - Enable time tracking
   - Set work hours
   - Define categories
   - Configure reminders
   - Set up goals

2. Tracking Methods:
   - Manual entry
   - Timer tracking
   - Automatic tracking
   - Pomodoro technique
   - Calendar integration

3. Time Categories:
   - Work time
   - Break time
   - Meeting time
   - Focus time
   - Learning time
   - Exercise time
   - Personal time

4. Best Practices:
   - Start tracking immediately
   - Use categories consistently
   - Review time logs regularly
   - Set realistic goals
   - Adjust as needed`,
              },
              {
                title: "Advanced Time Management",
                content: `Take your time management to the next level:

1. Time Analysis:
   - Productivity patterns
   - Time distribution
   - Efficiency metrics
   - Focus periods
   - Distraction analysis

2. Optimization Tools:
   - Time blocking
   - Task batching
   - Priority matrix
   - Energy mapping
   - Schedule optimization

3. Reporting Features:
   - Daily reports
   - Weekly summaries
   - Monthly analytics
   - Custom reports
   - Export options

4. Integration Features:
   - Calendar sync
   - Task integration
   - Project tracking
   - Team collaboration
   - Client billing`,
              },
            ],
          },
        },
        {
          title: "Project Management",
          description:
            "Manage your projects effectively with Momentum's project management tools.",
          icon: "project-diagram",
          color: "orange",
          content: {
            overview:
              "Organize and track your projects with Momentum's comprehensive project management features.",
            sections: [
              {
                title: "Project Setup",
                content: `Create and manage projects:

1. Project Creation:
   - Define project scope
   - Set objectives
   - Create timeline
   - Assign resources
   - Set milestones

2. Project Structure:
   - Task organization
   - Team assignment
   - Resource allocation
   - Timeline planning
   - Budget tracking

3. Project Tracking:
   - Progress monitoring
   - Milestone tracking
   - Resource utilization
   - Budget management
   - Risk assessment

4. Project Documentation:
   - Requirements
   - Specifications
   - Meeting notes
   - Change logs
   - Status reports`,
              },
              {
                title: "Team Collaboration",
                content: `Enhance team collaboration:

1. Team Management:
   - Member roles
   - Permissions
   - Responsibilities
   - Communication
   - Accountability

2. Collaboration Tools:
   - Shared workspace
   - Real-time updates
   - File sharing
   - Comment system
   - Version control

3. Communication Features:
   - Team chat
   - Video calls
   - Screen sharing
   - Meeting scheduler
   - Announcements

4. Progress Tracking:
   - Team dashboard
   - Performance metrics
   - Progress reports
   - Status updates
   - Achievement tracking`,
              },
            ],
          },
        },
      ],
    },
    {
      title: "Advanced Features",
      items: [
        {
          title: "Goal Setting",
          description: "Set and track your personal and professional goals.",
          icon: "bullseye",
          color: "yellow",
          content: {
            overview:
              "Set meaningful goals and track your progress effectively with Momentum's advanced goal-setting features.",
            sections: [
              {
                title: "SMART Goal Setting",
                content: `Create effective goals using the SMART framework:

1. Specific Goals:
   - Clear objectives
   - Defined outcomes
   - Specific targets
   - Measurable results
   - Actionable steps
   - Detailed planning
   - Clear expectations
   - Defined scope

2. Measurable Goals:
   - Quantifiable metrics
   - Progress tracking
   - Success indicators
   - Performance measures
   - Achievement markers
   - Progress milestones
   - Success criteria
   - Evaluation methods

3. Achievable Goals:
   - Realistic targets
   - Resource assessment
   - Capability evaluation
   - Time management
   - Skill development
   - Support systems
   - Progress pacing
   - Adjustment methods

4. Relevant Goals:
   - Purpose alignment
   - Value assessment
   - Priority setting
   - Resource allocation
   - Impact evaluation
   - Benefit analysis
   - Goal relationships
   - Long-term vision

5. Time-bound Goals:
   - Deadline setting
   - Timeline planning
   - Milestone creation
   - Progress scheduling
   - Review periods
   - Adjustment windows
   - Completion targets
   - Success timing`,
              },
              {
                title: "Goal Tracking and Management",
                content: `Effectively track and manage your goals:

1. Progress Tracking:
   - Milestone monitoring
   - Progress updates
   - Achievement tracking
   - Performance metrics
   - Success indicators
   - Progress visualization
   - Goal status
   - Completion tracking

2. Goal Management:
   - Goal organization
   - Priority setting
   - Resource allocation
   - Timeline management
   - Adjustment handling
   - Progress review
   - Success celebration
   - Learning integration

3. Goal Analysis:
   - Performance review
   - Success analysis
   - Challenge identification
   - Improvement planning
   - Resource evaluation
   - Strategy assessment
   - Progress patterns
   - Success factors

4. Goal Optimization:
   - Strategy refinement
   - Resource optimization
   - Timeline adjustment
   - Priority realignment
   - Support enhancement
   - Progress acceleration
   - Success maximization
   - Impact optimization`,
              },
            ],
          },
        },
        {
          title: "Automation",
          description:
            "Automate your workflows and tasks with Momentum's automation features.",
          icon: "robot",
          color: "cyan",
          content: {
            overview:
              "Save time and increase efficiency with Momentum's powerful automation tools.",
            sections: [
              {
                title: "Automation Basics",
                content: `Get started with automation:

1. Setting Up Automations:
   - Choose triggers
   - Define actions
   - Set conditions
   - Configure schedules
   - Test automations

2. Common Automations:
   - Task creation
   - Status updates
   - Notifications
   - Data syncing
   - Report generation

3. Automation Types:
   - Time-based
   - Event-based
   - Condition-based
   - Action-based
   - Schedule-based

4. Best Practices:
   - Start simple
   - Test thoroughly
   - Monitor results
   - Optimize regularly
   - Document workflows`,
              },
              {
                title: "Advanced Automation",
                content: `Take automation to the next level:

1. Complex Workflows:
   - Multi-step automations
   - Conditional logic
   - Error handling
   - Retry mechanisms
   - Fallback actions

2. Integration Automation:
   - Cross-platform sync
   - API integration
   - Webhook support
   - Custom scripts
   - Third-party tools

3. Automation Analytics:
   - Usage tracking
   - Performance metrics
   - Success rates
   - Error analysis
   - Optimization insights

4. Custom Automation:
   - Custom triggers
   - Custom actions
   - Custom conditions
   - Custom schedules
   - Custom reports`,
              },
            ],
          },
        },
        {
          title: "Data Analytics",
          description:
            "Analyze your productivity and wellness data with Momentum's analytics tools.",
          icon: "chart-bar",
          color: "indigo",
          content: {
            overview:
              "Gain insights from your data with Momentum's comprehensive analytics features.",
            sections: [
              {
                title: "Analytics Dashboard",
                content: `Explore your analytics:

1. Key Metrics:
   - Productivity score
   - Task completion
   - Time utilization
   - Goal progress
   - Wellness indicators

2. Data Visualization:
   - Progress charts
   - Trend analysis
   - Comparison views
   - Distribution graphs
   - Correlation analysis

3. Custom Reports:
   - Report builder
   - Custom metrics
   - Data filters
   - Export options
   - Schedule reports

4. Insights Engine:
   - Pattern recognition
   - Trend analysis
   - Predictive insights
   - Recommendations
   - Performance tips`,
              },
              {
                title: "Advanced Analytics",
                content: `Dive deeper into your data:

1. Data Analysis:
   - Statistical analysis
   - Pattern detection
   - Anomaly detection
   - Correlation analysis
   - Predictive modeling

2. Custom Analytics:
   - Custom metrics
   - Custom calculations
   - Custom visualizations
   - Custom reports
   - Custom dashboards

3. Data Integration:
   - External data
   - API integration
   - Data import
   - Data export
   - Data sync

4. Advanced Features:
   - Machine learning
   - AI insights
   - Predictive analytics
   - Custom algorithms
   - Advanced reporting`,
              },
            ],
          },
        },
      ],
    },
  ];

  const renderModalContent = (item) => {
    if (!item.content) return null;

    return (
      <div className="space-y-8">
        <div className="prose prose-indigo max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {item.title}
          </h2>
          <p className="text-gray-600 mb-6">{item.content.overview}</p>

          {item.content.sections.map((section, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {section.title}
              </h3>
              <div className="whitespace-pre-line text-gray-600">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

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
            Documentation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about using Momentum effectively.
          </p>
        </motion.div>

        {/* Search Documentation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-indigo-100"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Search Documentation
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for documentation..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pl-12"
            />
            <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>

          {/* Search Results */}
          {showSearchResults && searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto"
            >
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                  onClick={() => {
                    setSelectedItem(result.item);
                    setShowSearchResults(false);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg bg-${result.item.color}-50 flex items-center justify-center`}
                    >
                      <i
                        className={`fas fa-${result.item.icon} text-${result.item.color}-500`}
                      ></i>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {result.item.title}
                      </h3>
                      <p className="text-sm text-gray-500">{result.section}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {showSearchResults && searchResults.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center text-gray-500"
            >
              No results found for "{searchQuery}"
            </motion.div>
          )}
        </motion.div>

        <div className="space-y-12">
          {sections.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: sectionIndex * 0.2 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-indigo-100"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <i
                  className={`fas fa-${section.items[0].icon} text-${section.items[0].color}-500`}
                ></i>
                {section.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center mb-4">
                      <i
                        className={`fas fa-${item.icon} text-${item.color}-500 text-xl`}
                      ></i>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2"
                    >
                      Learn More
                      <i className="fas fa-arrow-right"></i>
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-indigo-100"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Additional Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/community"
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <i className="fas fa-users text-blue-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Community Forums
              </h3>
              <p className="text-gray-600">
                Connect with other users and share your experiences.
              </p>
            </Link>
            <Link
              to="/blog"
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <i className="fas fa-blog text-purple-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Blog & Articles
              </h3>
              <p className="text-gray-600">
                Read the latest tips, tricks, and updates.
              </p>
            </Link>
            <Link
              to="/contact"
              className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                <i className="fas fa-headset text-green-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Support
              </h3>
              <p className="text-gray-600">Get help from our support team.</p>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Documentation Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <i
                      className={`fas fa-${selectedItem.icon} text-${selectedItem.color}-500 text-xl`}
                    ></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {selectedItem.title}
                    </h3>
                    <p className="text-gray-600">{selectedItem.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
              {renderModalContent(selectedItem)}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Documentation;
