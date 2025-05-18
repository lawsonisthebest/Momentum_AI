import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const chatResponses = {
  greeting: {
    message:
      "Hello! I'm your Momentum Guide. I'm here to help you understand and make the most of your journey. What would you like to learn about?",
    options: [
      { text: "How do I stay motivated?", nextState: "motivation" },
      { text: "What are the best practices?", nextState: "best_practices" },
      { text: "How can I track my progress?", nextState: "progress_tracking" },
      { text: "Tips for building habits", nextState: "habit_building" },
    ],
  },
  motivation: {
    message:
      "Here are powerful motivation strategies:\n\n1. Find Your Why:\n   • Identify your core values\n   • Connect goals to purpose\n   • Visualize success\n   • Set meaningful targets\n\n2. Build Momentum:\n   • Start small\n   • Celebrate wins\n   • Track progress\n   • Share goals\n\n3. Stay Inspired:\n   • Read success stories\n   • Join communities\n   • Find role models\n   • Learn continuously\n\nWould you like to explore any of these areas in detail?",
    options: [
      { text: "Finding your why", nextState: "finding_your_why" },
      { text: "Building momentum", nextState: "building_momentum" },
      { text: "Staying inspired", nextState: "staying_inspired" },
      { text: "Back to main menu", nextState: "greeting" },
    ],
  },
  best_practices: {
    message:
      "Here are proven best practices for success:\n\n1. Goal Setting:\n   • Make goals specific\n   • Set measurable targets\n   • Create action plans\n   • Review regularly\n\n2. Time Management:\n   • Prioritize tasks\n   • Use time blocks\n   • Take breaks\n   • Stay focused\n\n3. Progress Tracking:\n   • Measure regularly\n   • Document wins\n   • Learn from setbacks\n   • Adjust as needed\n\nWould you like specific strategies for any of these areas?",
    options: [
      { text: "Goal setting strategies", nextState: "goal_setting_strategies" },
      { text: "Time management tips", nextState: "time_management_tips" },
      { text: "Tracking methods", nextState: "tracking_methods" },
      { text: "Back to main menu", nextState: "greeting" },
    ],
  },
  progress_tracking: {
    message:
      "Here are effective ways to track your progress:\n\n1. Daily Tracking:\n   • Use a journal\n   • Track habits\n   • Record wins\n   • Note challenges\n\n2. Weekly Review:\n   • Analyze progress\n   • Adjust goals\n   • Plan next week\n   • Celebrate wins\n\n3. Monthly Assessment:\n   • Review big picture\n   • Set new targets\n   • Update strategies\n   • Share progress\n\nWould you like specific tracking methods?",
    options: [
      { text: "Daily tracking methods", nextState: "daily_tracking" },
      { text: "Weekly review process", nextState: "weekly_review" },
      { text: "Monthly assessment", nextState: "monthly_assessment" },
      { text: "Back to main menu", nextState: "greeting" },
    ],
  },
  habit_building: {
    message:
      "Here are effective habit-building strategies:\n\n1. Start Small:\n   • Choose one habit\n   • Make it easy\n   • Be consistent\n   • Build gradually\n\n2. Create Systems:\n   • Set triggers\n   • Remove barriers\n   • Track progress\n   • Reward wins\n\n3. Stay Consistent:\n   • Use reminders\n   • Find accountability\n   • Track streaks\n   • Celebrate progress\n\nWould you like specific habit-building techniques?",
    options: [
      { text: "Starting small", nextState: "starting_small" },
      { text: "Creating systems", nextState: "creating_systems" },
      { text: "Staying consistent", nextState: "staying_consistent" },
      { text: "Back to main menu", nextState: "greeting" },
    ],
  },
  goal_tracking: {
    message:
      "Goal tracking is a powerful way to achieve your objectives. Here's what you should know:\n\n• Set specific, measurable goals\n• Break them into smaller milestones\n• Track your progress regularly\n• Celebrate small wins\n• Adjust goals as needed\n\nWould you like to know more about any of these aspects?",
    options: [
      {
        text: "Tell me about setting specific goals",
        nextState: "specific_goals",
      },
      { text: "How to break down goals?", nextState: "goal_breakdown" },
      { text: "Tips for regular tracking", nextState: "tracking_tips" },
      { text: "How to celebrate wins?", nextState: "celebrating_wins" },
      { text: "When to adjust goals?", nextState: "goal_adjustment" },
      { text: "Back to main menu", nextState: "greeting" },
    ],
  },
  goal_breakdown: {
    message:
      "Breaking down goals is essential for success. Here's how to do it effectively:\n\n1. Start with your main goal\n2. Break it into quarterly objectives\n3. Further break into monthly targets\n4. Create weekly milestones\n5. Set daily actionable tasks\n\nFor example, if your goal is to read 50 books in a year:\n• Quarterly: 12-13 books\n• Monthly: 4 books\n• Weekly: 1 book\n• Daily: 30-40 pages\n\nWould you like more examples or specific strategies?",
    options: [
      { text: "Show me more examples", nextState: "goal_examples" },
      { text: "How to set daily tasks?", nextState: "daily_tasks" },
      { text: "Tips for staying on track", nextState: "staying_on_track" },
      { text: "Back to goal tracking", nextState: "goal_tracking" },
    ],
  },
  tracking_tips: {
    message:
      "Here are detailed tips for effective progress tracking:\n\n1. Choose the Right Method:\n   • Digital apps for convenience\n   • Physical journals for mindfulness\n   • Spreadsheets for detailed analysis\n\n2. Track Consistently:\n   • Set a specific time each day\n   • Use reminders if needed\n   • Make it a habit\n\n3. What to Track:\n   • Quantitative metrics (numbers, times)\n   • Qualitative observations (feelings, challenges)\n   • Milestones and achievements\n\n4. Review Regularly:\n   • Daily quick check-ins\n   • Weekly detailed reviews\n   • Monthly progress analysis\n\nWould you like to learn more about any of these aspects?",
    options: [
      { text: "Best tracking methods", nextState: "tracking_methods" },
      { text: "How to review progress", nextState: "progress_review" },
      { text: "Setting up reminders", nextState: "reminders_setup" },
      { text: "Back to goal tracking", nextState: "goal_tracking" },
    ],
  },
  celebrating_wins: {
    message:
      "Celebrating wins is crucial for maintaining motivation. Here's how to do it effectively:\n\n1. Types of Celebrations:\n   • Small wins: Daily achievements\n   • Medium wins: Weekly milestones\n   • Big wins: Major goals reached\n\n2. Celebration Ideas:\n   • Small: Treat yourself to a favorite snack\n   • Medium: Take a day off or special activity\n   • Big: Plan a significant reward\n\n3. Why It Matters:\n   • Reinforces positive behavior\n   • Maintains motivation\n   • Creates positive associations\n   • Builds momentum\n\nWould you like specific celebration ideas or more details?",
    options: [
      { text: "More celebration ideas", nextState: "celebration_ideas" },
      { text: "How to track achievements", nextState: "achievement_tracking" },
      { text: "Creating a reward system", nextState: "reward_system" },
      { text: "Back to goal tracking", nextState: "goal_tracking" },
    ],
  },
  productivity: {
    message:
      "Understanding productivity is about working smarter, not harder. Here's what you need to know:\n\n1. Core Principles:\n   • Focus on important tasks\n   • Work in focused blocks\n   • Take regular breaks\n   • Eliminate distractions\n   • Track your energy levels\n\n2. Time Management:\n   • Prioritize tasks (Eisenhower Matrix)\n   • Use time blocking\n   • Set clear boundaries\n   • Batch similar tasks\n   • Review and adjust regularly\n\n3. Energy Management:\n   • Identify your peak hours\n   • Take care of your health\n   • Get enough rest\n   • Stay hydrated\n   • Exercise regularly\n\nWould you like to dive deeper into any of these topics?",
    options: [
      { text: "Time management techniques", nextState: "time_management" },
      { text: "Energy optimization", nextState: "energy_optimization" },
      { text: "Focus strategies", nextState: "focus_strategies" },
      { text: "Back to main menu", nextState: "greeting" },
    ],
  },
  time_management: {
    message:
      "Effective time management is crucial for productivity. Here are detailed strategies:\n\n1. The Eisenhower Matrix:\n   • Urgent & Important: Do first\n   • Important but not urgent: Schedule\n   • Urgent but not important: Delegate\n   • Neither: Eliminate\n\n2. Time Blocking:\n   • Plan your day in advance\n   • Block time for focused work\n   • Include buffer time\n   • Schedule breaks\n   • Review and adjust\n\n3. Task Batching:\n   • Group similar tasks\n   • Set specific times for each batch\n   • Minimize context switching\n   • Track your efficiency\n\nWould you like more specific techniques or examples?",
    options: [
      { text: "More time blocking tips", nextState: "time_blocking" },
      { text: "Task prioritization", nextState: "task_prioritization" },
      {
        text: "Dealing with interruptions",
        nextState: "handling_interruptions",
      },
      { text: "Back to productivity", nextState: "productivity" },
    ],
  },
  focus_strategies: {
    message:
      "Maintaining focus is essential for productivity. Here are proven strategies:\n\n1. Environment Setup:\n   • Clear your workspace\n   • Remove distractions\n   • Set up proper lighting\n   • Use noise-canceling if needed\n   • Keep water nearby\n\n2. Focus Techniques:\n   • Pomodoro Method (25/5)\n   • Deep Work sessions\n   • Time blocking\n   • Single-tasking\n   • Regular breaks\n\n3. Mental Preparation:\n   • Clear your mind\n   • Set clear objectives\n   • Use visualization\n   • Practice mindfulness\n   • Stay hydrated\n\nWould you like to learn more about any of these methods?",
    options: [
      { text: "Pomodoro technique details", nextState: "pomodoro_technique" },
      { text: "Deep work strategies", nextState: "deep_work" },
      { text: "Mindfulness practices", nextState: "mindfulness_practices" },
      { text: "Back to productivity", nextState: "productivity" },
    ],
  },
  goal_examples: {
    message:
      "Here are detailed examples of well-structured goals:\n\n1. Health & Fitness:\n   • Run a 5K in 3 months\n   • Exercise 4 times per week\n   • Drink 2L water daily\n   • Get 8 hours of sleep\n\n2. Learning & Development:\n   • Complete a coding course\n   • Read 24 books this year\n   • Learn a new language\n   • Master a new skill\n\n3. Career & Professional:\n   • Get a certification\n   • Learn a new software\n   • Improve presentation skills\n   • Build a professional network\n\nWould you like more specific examples in any category?",
    options: [
      { text: "More health goals", nextState: "health_goals" },
      { text: "More learning goals", nextState: "learning_goals" },
      { text: "More career goals", nextState: "career_goals" },
      { text: "Back to goal breakdown", nextState: "goal_breakdown" },
    ],
  },
  daily_tasks: {
    message:
      "Setting effective daily tasks is crucial. Here's how to do it right:\n\n1. Task Planning:\n   • List tasks the night before\n   • Prioritize using the 1-3-5 rule\n   • Break complex tasks down\n   • Set realistic time estimates\n\n2. The 1-3-5 Rule:\n   • 1 big task (2-3 hours)\n   • 3 medium tasks (1 hour each)\n   • 5 small tasks (15-30 mins each)\n\n3. Task Management Tips:\n   • Use a task management app\n   • Set specific time blocks\n   • Include buffer time\n   • Review and adjust daily\n\nWould you like specific examples or more tips?",
    options: [
      { text: "Task management tools", nextState: "task_tools" },
      { text: "Time blocking examples", nextState: "time_blocking_examples" },
      { text: "Productivity techniques", nextState: "productivity_techniques" },
      { text: "Back to goal breakdown", nextState: "goal_breakdown" },
    ],
  },
  staying_on_track: {
    message:
      "Staying on track requires a combination of strategies:\n\n1. Daily Routines:\n   • Morning review of goals\n   • Evening planning session\n   • Regular progress checks\n   • Weekly goal review\n\n2. Accountability Systems:\n   • Find an accountability partner\n   • Join a support group\n   • Use progress tracking apps\n   • Share goals publicly\n\n3. Motivation Maintenance:\n   • Celebrate small wins\n   • Visualize success\n   • Track progress visually\n   • Regular rewards\n\nWould you like to explore any of these areas in detail?",
    options: [
      {
        text: "Accountability strategies",
        nextState: "accountability_strategies",
      },
      { text: "Motivation techniques", nextState: "motivation_techniques" },
      {
        text: "Progress tracking methods",
        nextState: "progress_tracking_methods",
      },
      { text: "Back to goal breakdown", nextState: "goal_breakdown" },
    ],
  },
  tracking_methods: {
    message:
      "Here are effective tracking methods for different goals:\n\n1. Digital Tracking:\n   • Goal tracking apps\n   • Habit tracking apps\n   • Progress spreadsheets\n   • Calendar integration\n\n2. Physical Tracking:\n   • Bullet journal\n   • Habit tracker printable\n   • Progress wall chart\n   • Goal vision board\n\n3. Hybrid Approach:\n   • Digital + physical tracking\n   • Weekly review meetings\n   • Progress photos\n   • Milestone celebrations\n\nWhich method would you like to learn more about?",
    options: [
      { text: "Digital tools", nextState: "digital_tools" },
      { text: "Physical tracking", nextState: "physical_tracking" },
      { text: "Hybrid methods", nextState: "hybrid_methods" },
      { text: "Back to tracking tips", nextState: "tracking_tips" },
    ],
  },
  progress_review: {
    message:
      "Effective progress review involves several key steps:\n\n1. Daily Review:\n   • Check completed tasks\n   • Update progress metrics\n   • Adjust next day's plan\n   • Note any challenges\n\n2. Weekly Review:\n   • Analyze weekly progress\n   • Review goal alignment\n   • Plan next week\n   • Celebrate achievements\n\n3. Monthly Review:\n   • Assess goal progress\n   • Adjust strategies\n   • Set new milestones\n   • Update long-term plan\n\nWould you like templates or specific examples?",
    options: [
      { text: "Review templates", nextState: "review_templates" },
      { text: "Progress metrics", nextState: "progress_metrics" },
      { text: "Adjustment strategies", nextState: "adjustment_strategies" },
      { text: "Back to tracking tips", nextState: "tracking_tips" },
    ],
  },
  reminders_setup: {
    message:
      "Setting up effective reminders is key to consistency:\n\n1. Digital Reminders:\n   • Calendar notifications\n   • Task app reminders\n   • Phone alarms\n   • Email notifications\n\n2. Physical Reminders:\n   • Post-it notes\n   • Whiteboard lists\n   • Visual cues\n   • Habit stacking triggers\n\n3. Best Practices:\n   • Set specific times\n   • Use different methods\n   • Make them visible\n   • Keep them simple\n\nWould you like specific setup instructions?",
    options: [
      { text: "Digital setup guide", nextState: "digital_setup" },
      { text: "Physical reminder ideas", nextState: "physical_reminders" },
      { text: "Habit stacking tips", nextState: "habit_stacking_tips" },
      { text: "Back to tracking tips", nextState: "tracking_tips" },
    ],
  },
  celebration_ideas: {
    message:
      "Here are creative ways to celebrate your achievements:\n\n1. Small Wins (Daily):\n   • Favorite snack\n   • Short break\n   • Quick walk\n   • Music break\n\n2. Medium Wins (Weekly):\n   • Movie night\n   • Special meal\n   • Shopping treat\n   • Day off\n\n3. Big Wins (Monthly/Yearly):\n   • Weekend getaway\n   • New experience\n   • Special purchase\n   • Party with friends\n\nWould you like more specific ideas?",
    options: [
      { text: "More small win ideas", nextState: "small_wins" },
      { text: "More medium win ideas", nextState: "medium_wins" },
      { text: "More big win ideas", nextState: "big_wins" },
      { text: "Back to celebrating wins", nextState: "celebrating_wins" },
    ],
  },
  achievement_tracking: {
    message:
      "Tracking achievements effectively involves:\n\n1. Achievement Categories:\n   • Daily milestones\n   • Weekly goals\n   • Monthly targets\n   • Yearly objectives\n\n2. Tracking Methods:\n   • Achievement journal\n   • Progress photos\n   • Milestone markers\n   • Success stories\n\n3. Review Process:\n   • Regular check-ins\n   • Progress photos\n   • Written reflections\n   • Success sharing\n\nWould you like specific tracking methods?",
    options: [
      { text: "Journaling methods", nextState: "journaling_methods" },
      { text: "Progress documentation", nextState: "progress_documentation" },
      { text: "Success sharing", nextState: "success_sharing" },
      { text: "Back to celebrating wins", nextState: "celebrating_wins" },
    ],
  },
  reward_system: {
    message:
      "Creating an effective reward system involves:\n\n1. Reward Types:\n   • Immediate rewards\n   • Short-term rewards\n   • Long-term rewards\n   • Milestone rewards\n\n2. Reward Ideas:\n   • Personal treats\n   • Experience rewards\n   • Social rewards\n   • Achievement rewards\n\n3. Implementation:\n   • Set clear criteria\n   • Make rewards meaningful\n   • Vary the rewards\n   • Track effectiveness\n\nWould you like specific reward ideas?",
    options: [
      { text: "Personal reward ideas", nextState: "personal_rewards" },
      { text: "Experience rewards", nextState: "experience_rewards" },
      { text: "Social rewards", nextState: "social_rewards" },
      { text: "Back to celebrating wins", nextState: "celebrating_wins" },
    ],
  },
  health_goals: {
    message:
      "Here are more detailed health and fitness goals:\n\n1. Exercise Goals:\n   • Run 5K in under 30 minutes\n   • Complete 50 push-ups in one set\n   • Hold a 2-minute plank\n   • Do 20 pull-ups\n\n2. Nutrition Goals:\n   • Meal prep weekly\n   • Eat 5 servings of vegetables daily\n   • Reduce sugar intake by 50%\n   • Track macros daily\n\n3. Wellness Goals:\n   • Meditate 10 minutes daily\n   • Get 8 hours of sleep\n   • Take 10,000 steps daily\n   • Practice yoga 3 times weekly\n\nWould you like specific training plans or nutrition guides?",
    options: [
      { text: "Training plans", nextState: "training_plans" },
      { text: "Nutrition guides", nextState: "nutrition_guides" },
      { text: "Wellness routines", nextState: "wellness_routines" },
      { text: "Back to goal examples", nextState: "goal_examples" },
    ],
  },
  learning_goals: {
    message:
      "Here are more detailed learning and development goals:\n\n1. Skill Development:\n   • Learn to code in Python\n   • Master Excel formulas\n   • Learn graphic design\n   • Develop public speaking\n\n2. Language Learning:\n   • Learn 1000 words in Spanish\n   • Practice conversation daily\n   • Complete language course\n   • Watch movies in target language\n\n3. Professional Development:\n   • Get industry certification\n   • Attend 2 workshops monthly\n   • Read 2 industry books monthly\n   • Join professional network\n\nWould you like specific learning resources or study plans?",
    options: [
      { text: "Learning resources", nextState: "learning_resources" },
      { text: "Study techniques", nextState: "study_techniques" },
      { text: "Practice methods", nextState: "practice_methods" },
      { text: "Back to goal examples", nextState: "goal_examples" },
    ],
  },
  career_goals: {
    message:
      "Here are more detailed career and professional goals:\n\n1. Skill Enhancement:\n   • Master new software tools\n   • Improve presentation skills\n   • Learn project management\n   • Develop leadership abilities\n\n2. Career Advancement:\n   • Get promoted within 6 months\n   • Increase salary by 20%\n   • Lead a major project\n   • Build professional network\n\n3. Professional Development:\n   • Attend industry conferences\n   • Join professional associations\n   • Get advanced certification\n   • Mentor junior colleagues\n\nWould you like specific career development strategies?",
    options: [
      { text: "Career strategies", nextState: "career_strategies" },
      { text: "Skill development", nextState: "skill_development" },
      { text: "Networking tips", nextState: "networking_tips" },
      { text: "Back to goal examples", nextState: "goal_examples" },
    ],
  },
  task_tools: {
    message:
      "Here are the best task management tools and how to use them:\n\n1. Digital Tools:\n   • Todoist: For simple task management\n   • Notion: For complex project planning\n   • Trello: For visual task organization\n   • Asana: For team collaboration\n\n2. Physical Tools:\n   • Bullet Journal: For creative planning\n   • Planner: For structured scheduling\n   • Whiteboard: For visual tracking\n   • Sticky Notes: For quick tasks\n\n3. Best Practices:\n   • Choose one main tool\n   • Keep it simple\n   • Regular review\n   • Consistent use\n\nWould you like specific setup guides for any of these tools?",
    options: [
      { text: "Digital tool setup", nextState: "digital_tool_setup" },
      { text: "Physical system setup", nextState: "physical_system_setup" },
      { text: "Tool comparison", nextState: "tool_comparison" },
      { text: "Back to daily tasks", nextState: "daily_tasks" },
    ],
  },
  time_blocking_examples: {
    message:
      "Here are practical time blocking examples:\n\n1. Morning Block (6-9 AM):\n   • Exercise (6-7 AM)\n   • Shower/Breakfast (7-8 AM)\n   • Planning/Review (8-9 AM)\n\n2. Work Block (9-12 PM):\n   • Deep work (9-11 AM)\n   • Break (11-11:15 AM)\n   • Meetings (11:15-12 PM)\n\n3. Afternoon Block (1-5 PM):\n   • Project work (1-3 PM)\n   • Break (3-3:15 PM)\n   • Tasks/Email (3:15-5 PM)\n\nWould you like more specific schedules or tips?",
    options: [
      { text: "More schedules", nextState: "more_schedules" },
      { text: "Break strategies", nextState: "break_strategies" },
      { text: "Productivity tips", nextState: "productivity_tips" },
      { text: "Back to daily tasks", nextState: "daily_tasks" },
    ],
  },
  productivity_techniques: {
    message:
      "Here are proven productivity techniques:\n\n1. Time Management:\n   • Pomodoro Technique\n   • Time Blocking\n   • Eat the Frog\n   • 2-Minute Rule\n\n2. Focus Methods:\n   • Deep Work\n   • Single Tasking\n   • Flow State\n   • Mind Mapping\n\n3. Energy Management:\n   • Peak Hours\n   • Energy Cycles\n   • Rest Periods\n   • Exercise Breaks\n\nWould you like detailed guides for any of these techniques?",
    options: [
      { text: "Time management guide", nextState: "time_management_guide" },
      { text: "Focus techniques", nextState: "focus_techniques" },
      { text: "Energy management", nextState: "energy_management" },
      { text: "Back to daily tasks", nextState: "daily_tasks" },
    ],
  },
  accountability_strategies: {
    message:
      "Here are effective accountability strategies:\n\n1. Personal Accountability:\n   • Daily check-ins\n   • Progress tracking\n   • Self-reflection\n   • Habit stacking\n\n2. Social Accountability:\n   • Accountability partner\n   • Mastermind group\n   • Online community\n   • Progress sharing\n\n3. System Accountability:\n   • Progress tracking apps\n   • Habit tracking tools\n   • Goal visualization\n   • Reward system\n\nWould you like specific implementation guides?",
    options: [
      { text: "Partner setup", nextState: "partner_setup" },
      { text: "Group accountability", nextState: "group_accountability" },
      { text: "Tracking systems", nextState: "tracking_systems" },
      { text: "Back to staying on track", nextState: "staying_on_track" },
    ],
  },
  motivation_techniques: {
    message:
      "Here are powerful motivation techniques:\n\n1. Intrinsic Motivation:\n   • Find your why\n   • Set meaningful goals\n   • Track progress\n   • Celebrate wins\n\n2. Extrinsic Motivation:\n   • Reward system\n   • Accountability\n   • Public commitment\n   • Progress sharing\n\n3. Daily Motivation:\n   • Morning routine\n   • Visualization\n   • Affirmations\n   • Progress review\n\nWould you like specific implementation strategies?",
    options: [
      { text: "Finding your why", nextState: "finding_your_why" },
      { text: "Reward systems", nextState: "reward_systems" },
      { text: "Daily routines", nextState: "daily_routines" },
      { text: "Back to staying on track", nextState: "staying_on_track" },
    ],
  },
  progress_tracking_methods: {
    message:
      "Here are effective progress tracking methods:\n\n1. Digital Tracking:\n   • Progress apps\n   • Spreadsheets\n   • Calendar tracking\n   • Habit apps\n\n2. Physical Tracking:\n   • Progress journal\n   • Habit tracker\n   • Wall calendar\n   • Vision board\n\n3. Measurement Methods:\n   • Quantitative metrics\n   • Qualitative notes\n   • Progress photos\n   • Milestone markers\n\nWould you like specific tracking templates?",
    options: [
      { text: "Digital templates", nextState: "digital_templates" },
      { text: "Physical templates", nextState: "physical_templates" },
      { text: "Measurement guides", nextState: "measurement_guides" },
      { text: "Back to staying on track", nextState: "staying_on_track" },
    ],
  },
  training_plans: {
    message:
      "Here are detailed training plans for different goals:\n\n1. Beginner Running Plan:\n   • Week 1-2: Walk/Run intervals\n   • Week 3-4: Increase running time\n   • Week 5-6: Build endurance\n   • Week 7-8: Speed work\n\n2. Strength Training Plan:\n   • Day 1: Upper body\n   • Day 2: Lower body\n   • Day 3: Core\n   • Day 4: Full body\n\n3. Flexibility Plan:\n   • Morning: Dynamic stretches\n   • Pre-workout: Warm-up routine\n   • Post-workout: Cool-down\n   • Evening: Static stretches\n\nWould you like specific workout routines?",
    options: [
      { text: "Running routines", nextState: "running_routines" },
      { text: "Strength routines", nextState: "strength_routines" },
      { text: "Flexibility routines", nextState: "flexibility_routines" },
      { text: "Back to health goals", nextState: "health_goals" },
    ],
  },
  nutrition_guides: {
    message:
      "Here are comprehensive nutrition guides:\n\n1. Meal Planning:\n   • Calculate daily calories\n   • Plan weekly meals\n   • Prep ingredients\n   • Store properly\n\n2. Macro Tracking:\n   • Protein: 1.6-2.2g per kg\n   • Carbs: 45-65% of calories\n   • Fats: 20-35% of calories\n   • Track daily intake\n\n3. Healthy Eating Tips:\n   • Eat whole foods\n   • Stay hydrated\n   • Control portions\n   • Plan snacks\n\nWould you like specific meal plans?",
    options: [
      { text: "Meal plans", nextState: "meal_plans" },
      { text: "Recipe ideas", nextState: "recipe_ideas" },
      { text: "Shopping guides", nextState: "shopping_guides" },
      { text: "Back to health goals", nextState: "health_goals" },
    ],
  },
  wellness_routines: {
    message:
      "Here are effective wellness routines:\n\n1. Morning Routine:\n   • Wake up early\n   • Hydrate\n   • Light exercise\n   • Meditation\n\n2. Evening Routine:\n   • Digital detox\n   • Relaxation\n   • Journaling\n   • Early sleep\n\n3. Weekly Wellness:\n   • Yoga sessions\n   • Nature walks\n   • Social time\n   • Self-care\n\nWould you like specific routine templates?",
    options: [
      { text: "Morning routine", nextState: "morning_routine" },
      { text: "Evening routine", nextState: "evening_routine" },
      { text: "Weekly wellness", nextState: "weekly_wellness" },
      { text: "Back to health goals", nextState: "health_goals" },
    ],
  },
  learning_resources: {
    message:
      "Here are valuable learning resources:\n\n1. Online Platforms:\n   • Coursera\n   • Udemy\n   • edX\n   • Khan Academy\n\n2. Books & Materials:\n   • Industry books\n   • Online articles\n   • Research papers\n   • Case studies\n\n3. Practice Resources:\n   • Coding challenges\n   • Practice exercises\n   • Mock projects\n   • Study groups\n\nWould you like specific resource recommendations?",
    options: [
      { text: "Platform guides", nextState: "platform_guides" },
      { text: "Book recommendations", nextState: "book_recommendations" },
      { text: "Practice resources", nextState: "practice_resources" },
      { text: "Back to learning goals", nextState: "learning_goals" },
    ],
  },
  study_techniques: {
    message:
      "Here are effective study techniques:\n\n1. Active Learning:\n   • Note-taking\n   • Teaching others\n   • Practice tests\n   • Mind mapping\n\n2. Time Management:\n   • Pomodoro method\n   • Spaced repetition\n   • Regular breaks\n   • Study schedule\n\n3. Memory Techniques:\n   • Mnemonics\n   • Visualization\n   • Association\n   • Review cycles\n\nWould you like specific study plans?",
    options: [
      { text: "Study schedules", nextState: "study_schedules" },
      { text: "Memory techniques", nextState: "memory_techniques" },
      { text: "Review methods", nextState: "review_methods" },
      { text: "Back to learning goals", nextState: "learning_goals" },
    ],
  },
  practice_methods: {
    message:
      "Here are effective practice methods:\n\n1. Deliberate Practice:\n   • Set specific goals\n   • Focus on weaknesses\n   • Get feedback\n   • Push boundaries\n\n2. Spaced Practice:\n   • Regular intervals\n   • Increasing gaps\n   • Mixed practice\n   • Review sessions\n\n3. Active Practice:\n   • Real-world projects\n   • Problem-solving\n   • Teaching others\n   • Group practice\n\nWould you like specific practice routines?",
    options: [
      { text: "Practice routines", nextState: "practice_routines" },
      { text: "Feedback methods", nextState: "feedback_methods" },
      { text: "Progress tracking", nextState: "progress_tracking" },
      { text: "Back to learning goals", nextState: "learning_goals" },
    ],
  },
  career_strategies: {
    message:
      "Here are effective career development strategies:\n\n1. Skill Development:\n   • Identify key skills\n   • Take courses\n   • Practice regularly\n   • Get certifications\n\n2. Career Planning:\n   • Set career goals\n   • Create roadmap\n   • Track progress\n   • Adjust as needed\n\n3. Professional Growth:\n   • Seek mentorship\n   • Join industry groups\n   • Attend conferences\n   • Build network\n\nWould you like specific action plans?",
    options: [
      { text: "Skill development plan", nextState: "skill_development_plan" },
      { text: "Career roadmap", nextState: "career_roadmap" },
      { text: "Growth strategies", nextState: "growth_strategies" },
      { text: "Back to career goals", nextState: "career_goals" },
    ],
  },
  skill_development: {
    message:
      "Here are effective skill development strategies:\n\n1. Technical Skills:\n   • Online courses\n   • Practice projects\n   • Code challenges\n   • Peer review\n\n2. Soft Skills:\n   • Communication\n   • Leadership\n   • Problem-solving\n   • Teamwork\n\n3. Industry Skills:\n   • Tools & software\n   • Best practices\n   • Industry trends\n   • Standards\n\nWould you like specific development plans?",
    options: [
      { text: "Technical skills", nextState: "technical_skills" },
      { text: "Soft skills", nextState: "soft_skills" },
      { text: "Industry skills", nextState: "industry_skills" },
      { text: "Back to career goals", nextState: "career_goals" },
    ],
  },
  networking_tips: {
    message:
      "Here are effective networking strategies:\n\n1. Online Networking:\n   • LinkedIn profile\n   • Industry groups\n   • Online forums\n   • Social media\n\n2. In-Person Networking:\n   • Industry events\n   • Meetups\n   • Conferences\n   • Workshops\n\n3. Relationship Building:\n   • Follow up\n   • Provide value\n   • Stay connected\n   • Share knowledge\n\nWould you like specific networking plans?",
    options: [
      { text: "Online networking", nextState: "online_networking" },
      { text: "Event networking", nextState: "event_networking" },
      { text: "Relationship building", nextState: "relationship_building" },
      { text: "Back to career goals", nextState: "career_goals" },
    ],
  },
  running_routines: {
    message:
      "Here are detailed running routines:\n\n1. Beginner Routine:\n   • 5 min warm-up walk\n   • 1 min run, 2 min walk (repeat 5x)\n   • 5 min cool-down walk\n   • 3x per week\n\n2. Intermediate Routine:\n   • 10 min warm-up\n   • 3 min run, 1 min walk (repeat 5x)\n   • 5 min cool-down\n   • 4x per week\n\n3. Advanced Routine:\n   • 15 min warm-up\n   • 5 min run, 1 min walk (repeat 6x)\n   • 10 min cool-down\n   • 5x per week\n\nWould you like specific training tips?",
    options: [
      { text: "Training tips", nextState: "training_tips" },
      { text: "Injury prevention", nextState: "injury_prevention" },
      { text: "Progress tracking", nextState: "running_progress" },
      { text: "Back to training plans", nextState: "training_plans" },
    ],
  },
  strength_routines: {
    message:
      "Here are effective strength training routines:\n\n1. Upper Body:\n   • Push-ups: 3 sets of 10-15\n   • Pull-ups: 3 sets of 5-10\n   • Dips: 3 sets of 10-15\n   • Shoulder press: 3 sets of 8-12\n\n2. Lower Body:\n   • Squats: 3 sets of 12-15\n   • Lunges: 3 sets of 10 each leg\n   • Deadlifts: 3 sets of 8-12\n   • Calf raises: 3 sets of 15-20\n\n3. Core:\n   • Plank: 3 sets of 30-60 sec\n   • Crunches: 3 sets of 15-20\n   • Russian twists: 3 sets of 20\n   • Leg raises: 3 sets of 12-15\n\nWould you like specific form guides?",
    options: [
      { text: "Form guides", nextState: "form_guides" },
      { text: "Progression tips", nextState: "progression_tips" },
      { text: "Equipment guides", nextState: "equipment_guides" },
      { text: "Back to training plans", nextState: "training_plans" },
    ],
  },
  flexibility_routines: {
    message:
      "Here are comprehensive flexibility routines:\n\n1. Dynamic Stretches:\n   • Arm circles: 10 each way\n   • Leg swings: 10 each leg\n   • Hip circles: 10 each way\n   • Ankle rotations: 10 each\n\n2. Static Stretches:\n   • Hamstring stretch: 30 sec each\n   • Quad stretch: 30 sec each\n   • Shoulder stretch: 30 sec each\n   • Calf stretch: 30 sec each\n\n3. Mobility Work:\n   • Cat-cow: 10 reps\n   • Child's pose: 30 sec\n   • Cobra stretch: 30 sec\n   • Hip openers: 30 sec each\n\nWould you like specific stretching guides?",
    options: [
      { text: "Stretch routines", nextState: "stretch_routines" },
      { text: "Mobility work", nextState: "mobility_work" },
      { text: "Recovery tips", nextState: "recovery_tips" },
      { text: "Back to training plans", nextState: "training_plans" },
    ],
  },
  meal_plans: {
    message:
      "Here are sample meal plans:\n\n1. Breakfast Options:\n   • Oatmeal with fruits\n   • Greek yogurt parfait\n   • Protein smoothie\n   • Avocado toast\n\n2. Lunch Options:\n   • Grilled chicken salad\n   • Quinoa bowl\n   • Turkey wrap\n   • Buddha bowl\n\n3. Dinner Options:\n   • Baked salmon\n   • Stir-fry\n   • Lean steak\n   • Vegetarian pasta\n\nWould you like specific recipes?",
    options: [
      { text: "Breakfast recipes", nextState: "breakfast_recipes" },
      { text: "Lunch recipes", nextState: "lunch_recipes" },
      { text: "Dinner recipes", nextState: "dinner_recipes" },
      { text: "Back to nutrition guides", nextState: "nutrition_guides" },
    ],
  },
  recipe_ideas: {
    message:
      "Here are healthy recipe ideas:\n\n1. Quick Meals:\n   • 15-min stir-fry\n   • 20-min pasta\n   • 10-min wrap\n   • 5-min smoothie\n\n2. Meal Prep:\n   • Batch cooking\n   • Freezer meals\n   • Mason jar salads\n   • Overnight oats\n\n3. Snack Ideas:\n   • Energy balls\n   • Protein bars\n   • Veggie chips\n   • Fruit parfaits\n\nWould you like specific recipes?",
    options: [
      { text: "Quick recipes", nextState: "quick_recipes" },
      { text: "Meal prep guides", nextState: "meal_prep_guides" },
      { text: "Snack recipes", nextState: "snack_recipes" },
      { text: "Back to nutrition guides", nextState: "nutrition_guides" },
    ],
  },
  shopping_guides: {
    message:
      "Here are comprehensive shopping guides:\n\n1. Produce Section:\n   • Seasonal fruits\n   • Fresh vegetables\n   • Leafy greens\n   • Root vegetables\n\n2. Protein Section:\n   • Lean meats\n   • Fish & seafood\n   • Plant proteins\n   • Dairy products\n\n3. Pantry Items:\n   • Whole grains\n   • Healthy oils\n   • Nuts & seeds\n   • Spices & herbs\n\nWould you like specific shopping lists?",
    options: [
      { text: "Weekly lists", nextState: "weekly_lists" },
      { text: "Budget tips", nextState: "budget_tips" },
      { text: "Storage guides", nextState: "storage_guides" },
      { text: "Back to nutrition guides", nextState: "nutrition_guides" },
    ],
  },
  morning_routine: {
    message:
      "Here's an effective morning routine:\n\n1. Wake Up (5:30 AM):\n   • Drink water\n   • Stretch\n   • Meditate\n   • Journal\n\n2. Exercise (6:00 AM):\n   • Light cardio\n   • Strength training\n   • Yoga/stretching\n   • Shower\n\n3. Preparation (7:00 AM):\n   • Healthy breakfast\n   • Plan day\n   • Review goals\n   • Start work\n\nWould you like specific timing guides?",
    options: [
      { text: "Timing guides", nextState: "timing_guides" },
      { text: "Exercise routines", nextState: "morning_exercise" },
      { text: "Breakfast ideas", nextState: "breakfast_ideas" },
      { text: "Back to wellness routines", nextState: "wellness_routines" },
    ],
  },
  evening_routine: {
    message:
      "Here's an effective evening routine:\n\n1. Wind Down (8:00 PM):\n   • Digital detox\n   • Light reading\n   • Relaxation\n   • Journaling\n\n2. Preparation (9:00 PM):\n   • Skincare\n   • Next day prep\n   • Light stretching\n   • Meditation\n\n3. Sleep (10:00 PM):\n   • Cool room\n   • Dark environment\n   • Comfortable bed\n   • Regular time\n\nWould you like specific relaxation techniques?",
    options: [
      { text: "Relaxation techniques", nextState: "relaxation_techniques" },
      { text: "Sleep hygiene", nextState: "sleep_hygiene" },
      { text: "Preparation tips", nextState: "preparation_tips" },
      { text: "Back to wellness routines", nextState: "wellness_routines" },
    ],
  },
  weekly_wellness: {
    message:
      "Here's a weekly wellness schedule:\n\n1. Physical Activity:\n   • Monday: Cardio\n   • Wednesday: Strength\n   • Friday: Flexibility\n   • Weekend: Active rest\n\n2. Mental Wellness:\n   • Daily meditation\n   • Weekly journaling\n   • Nature walks\n   • Social activities\n\n3. Self-Care:\n   • Skincare routine\n   • Relaxation time\n   • Hobby time\n   • Social connection\n\nWould you like specific activity guides?",
    options: [
      { text: "Activity guides", nextState: "activity_guides" },
      { text: "Mental wellness", nextState: "mental_wellness" },
      { text: "Self-care tips", nextState: "self_care_tips" },
      { text: "Back to wellness routines", nextState: "wellness_routines" },
    ],
  },
  training_tips: {
    message:
      "Here are essential training tips:\n\n1. Running Form:\n   • Keep shoulders relaxed\n   • Land mid-foot\n   • Maintain posture\n   • Breathe rhythmically\n\n2. Progression:\n   • Increase by 10% weekly\n   • Alternate hard/easy days\n   • Listen to your body\n   • Track progress\n\n3. Recovery:\n   • Stay hydrated\n   • Get enough sleep\n   • Eat properly\n   • Stretch regularly\n\nWould you like specific form guides?",
    options: [
      { text: "Form guides", nextState: "running_form" },
      { text: "Progression plans", nextState: "progression_plans" },
      { text: "Recovery strategies", nextState: "recovery_strategies" },
      { text: "Back to running routines", nextState: "running_routines" },
    ],
  },
  injury_prevention: {
    message:
      "Here are key injury prevention strategies:\n\n1. Warm-up:\n   • Dynamic stretches\n   • Light cardio\n   • Joint mobility\n   • Gradual intensity\n\n2. Proper Form:\n   • Maintain alignment\n   • Control movement\n   • Use full range\n   • Stay balanced\n\n3. Recovery:\n   • Cool down properly\n   • Stretch after\n   • Rest adequately\n   • Cross-train\n\nWould you like specific prevention exercises?",
    options: [
      { text: "Prevention exercises", nextState: "prevention_exercises" },
      { text: "Recovery techniques", nextState: "recovery_techniques" },
      { text: "Form check", nextState: "form_check" },
      { text: "Back to running routines", nextState: "running_routines" },
    ],
  },
  running_progress: {
    message:
      "Here's how to track running progress:\n\n1. Distance Tracking:\n   • Use GPS watch\n   • Track weekly miles\n   • Set distance goals\n   • Record routes\n\n2. Speed Progress:\n   • Time trials\n   • Pace tracking\n   • Interval times\n   • Race results\n\n3. Endurance:\n   • Long run distance\n   • Recovery rate\n   • Heart rate zones\n   • Perceived effort\n\nWould you like specific tracking methods?",
    options: [
      { text: "Tracking methods", nextState: "tracking_methods" },
      { text: "Goal setting", nextState: "running_goals" },
      { text: "Progress analysis", nextState: "progress_analysis" },
      { text: "Back to running routines", nextState: "running_routines" },
    ],
  },
  form_guides: {
    message:
      "Here are detailed form guides:\n\n1. Push-up Form:\n   • Hands shoulder-width\n   • Elbows at 45°\n   • Core tight\n   • Full range of motion\n\n2. Squat Form:\n   • Feet shoulder-width\n   • Knees track toes\n   • Hips back\n   • Chest up\n\n3. Deadlift Form:\n   • Hinge at hips\n   • Back straight\n   • Bar close to body\n   • Drive through heels\n\nWould you like specific exercise guides?",
    options: [
      { text: "Exercise guides", nextState: "exercise_guides" },
      { text: "Common mistakes", nextState: "common_mistakes" },
      { text: "Form check", nextState: "form_check" },
      { text: "Back to strength routines", nextState: "strength_routines" },
    ],
  },
  progression_tips: {
    message:
      "Here are effective progression strategies:\n\n1. Weight Progression:\n   • Start light\n   • Add 5-10% weekly\n   • Perfect form first\n   • Track progress\n\n2. Volume Progression:\n   • Increase sets\n   • Add reps\n   • Reduce rest time\n   • Add exercises\n\n3. Intensity Progression:\n   • Increase weight\n   • Add difficulty\n   • Reduce assistance\n   • Add complexity\n\nWould you like specific progression plans?",
    options: [
      { text: "Progression plans", nextState: "progression_plans" },
      { text: "Volume strategies", nextState: "volume_strategies" },
      { text: "Intensity methods", nextState: "intensity_methods" },
      { text: "Back to strength routines", nextState: "strength_routines" },
    ],
  },
  equipment_guides: {
    message:
      "Here are essential equipment guides:\n\n1. Home Equipment:\n   • Resistance bands\n   • Dumbbells\n   • Kettlebells\n   • Pull-up bar\n\n2. Gym Equipment:\n   • Barbells\n   • Machines\n   • Cable systems\n   • Cardio machines\n\n3. Optional Equipment:\n   • Foam roller\n   • Yoga mat\n   • Jump rope\n   • Medicine balls\n\nWould you like specific equipment recommendations?",
    options: [
      { text: "Home equipment", nextState: "home_equipment" },
      { text: "Gym equipment", nextState: "gym_equipment" },
      { text: "Accessories", nextState: "accessories" },
      { text: "Back to strength routines", nextState: "strength_routines" },
    ],
  },
  stretching_guides: {
    message:
      "Here are comprehensive stretching guides:\n\n1. Dynamic Stretches:\n   • Arm circles\n   • Leg swings\n   • Hip circles\n   • Ankle rotations\n\n2. Static Stretches:\n   • Hamstring stretch\n   • Quad stretch\n   • Shoulder stretch\n   • Calf stretch\n\n3. Mobility Work:\n   • Cat-cow\n   • Child's pose\n   • Cobra stretch\n   • Hip openers\n\nWould you like specific stretch routines?",
    options: [
      { text: "Stretch routines", nextState: "stretch_routines" },
      { text: "Mobility work", nextState: "mobility_work" },
      { text: "Recovery stretches", nextState: "recovery_stretches" },
      {
        text: "Back to flexibility routines",
        nextState: "flexibility_routines",
      },
    ],
  },
  mobility_exercises: {
    message:
      "Here are effective mobility exercises:\n\n1. Upper Body:\n   • Shoulder rolls\n   • Arm circles\n   • Wrist mobility\n   • Neck stretches\n\n2. Lower Body:\n   • Hip circles\n   • Ankle mobility\n   • Knee mobility\n   • Hip flexor stretches\n\n3. Full Body:\n   • Cat-cow\n   • World's greatest stretch\n   • Bear crawl\n   • Inchworm walk\n\nWould you like specific mobility routines?",
    options: [
      { text: "Mobility routines", nextState: "mobility_routines" },
      { text: "Joint mobility", nextState: "joint_mobility" },
      { text: "Movement patterns", nextState: "movement_patterns" },
      {
        text: "Back to flexibility routines",
        nextState: "flexibility_routines",
      },
    ],
  },
  recovery_tips: {
    message:
      "Here are essential recovery tips:\n\n1. Active Recovery:\n   • Light walking\n   • Swimming\n   • Yoga\n   • Stretching\n\n2. Rest & Recovery:\n   • Sleep 7-9 hours\n   • Take rest days\n   • Stay hydrated\n   • Eat properly\n\n3. Recovery Tools:\n   • Foam rolling\n   • Massage\n   • Ice/heat\n   • Compression\n\nWould you like specific recovery routines?",
    options: [
      { text: "Recovery routines", nextState: "recovery_routines" },
      { text: "Rest strategies", nextState: "rest_strategies" },
      { text: "Recovery tools", nextState: "recovery_tools" },
      {
        text: "Back to flexibility routines",
        nextState: "flexibility_routines",
      },
    ],
  },
  finding_your_why: {
    message:
      "Here's how to find your why:\n\n1. Self-Reflection:\n   • What matters most to you?\n   • What brings you joy?\n   • What impact do you want to make?\n   • What legacy do you want to leave?\n\n2. Value Identification:\n   • List your core values\n   • Rank them by importance\n   • Connect to daily actions\n   • Align with goals\n\n3. Purpose Connection:\n   • Link goals to values\n   • Create meaning\n   • Find deeper motivation\n   • Stay connected to why\n\nWould you like specific reflection exercises?",
    options: [
      { text: "Reflection exercises", nextState: "reflection_exercises" },
      { text: "Value identification", nextState: "value_identification" },
      { text: "Purpose connection", nextState: "purpose_connection" },
      { text: "Back to motivation", nextState: "motivation" },
    ],
  },
  building_momentum: {
    message:
      "Here's how to build momentum:\n\n1. Start Small:\n   • Choose tiny actions\n   • Make it easy\n   • Be consistent\n   • Build gradually\n\n2. Track Progress:\n   • Record daily wins\n   • Measure growth\n   • Celebrate milestones\n   • Share achievements\n\n3. Maintain Momentum:\n   • Stay consistent\n   • Adjust as needed\n   • Find support\n   • Keep going\n\nWould you like specific momentum-building techniques?",
    options: [
      { text: "Starting techniques", nextState: "starting_techniques" },
      { text: "Progress tracking", nextState: "progress_tracking" },
      { text: "Consistency tips", nextState: "consistency_tips" },
      { text: "Back to motivation", nextState: "motivation" },
    ],
  },
  staying_inspired: {
    message:
      "Here's how to stay inspired:\n\n1. Daily Inspiration:\n   • Read success stories\n   • Watch motivational videos\n   • Listen to podcasts\n   • Follow role models\n\n2. Community Support:\n   • Join groups\n   • Find accountability partners\n   • Share progress\n   • Learn from others\n\n3. Continuous Learning:\n   • Read books\n   • Take courses\n   • Attend workshops\n   • Stay curious\n\nWould you like specific inspiration sources?",
    options: [
      { text: "Daily inspiration", nextState: "daily_inspiration" },
      { text: "Community support", nextState: "community_support" },
      { text: "Learning resources", nextState: "learning_resources" },
      { text: "Back to motivation", nextState: "motivation" },
    ],
  },
  goal_setting_strategies: {
    message:
      "Here are effective goal-setting strategies:\n\n1. SMART Goals:\n   • Specific\n   • Measurable\n   • Achievable\n   • Relevant\n   • Time-bound\n\n2. Action Planning:\n   • Break down goals\n   • Set milestones\n   • Create deadlines\n   • Track progress\n\n3. Goal Review:\n   • Regular check-ins\n   • Adjust as needed\n   • Celebrate wins\n   • Learn from setbacks\n\nWould you like specific goal-setting templates?",
    options: [
      { text: "SMART goal guide", nextState: "smart_goal_guide" },
      { text: "Action planning", nextState: "action_planning" },
      { text: "Review process", nextState: "review_process" },
      { text: "Back to best practices", nextState: "best_practices" },
    ],
  },
  time_management_tips: {
    message:
      "Here are effective time management tips:\n\n1. Prioritization:\n   • Use Eisenhower Matrix\n   • Focus on important tasks\n   • Delegate when possible\n   • Say no to non-essentials\n\n2. Time Blocking:\n   • Schedule deep work\n   • Batch similar tasks\n   • Include breaks\n   • Plan buffer time\n\n3. Focus Techniques:\n   • Remove distractions\n   • Use Pomodoro\n   • Single-task\n   • Take breaks\n\nWould you like specific time management tools?",
    options: [
      { text: "Prioritization methods", nextState: "prioritization_methods" },
      { text: "Time blocking guide", nextState: "time_blocking_guide" },
      { text: "Focus techniques", nextState: "focus_techniques" },
      { text: "Back to best practices", nextState: "best_practices" },
    ],
  },
  daily_tracking: {
    message:
      "Here are effective daily tracking methods:\n\n1. Journal Methods:\n   • Bullet journal\n   • Digital journal\n   • Habit tracker\n   • Progress log\n\n2. Tracking Tools:\n   • Apps\n   • Spreadsheets\n   • Physical trackers\n   • Calendar\n\n3. What to Track:\n   • Habits\n   • Progress\n   • Wins\n   • Challenges\n\nWould you like specific tracking templates?",
    options: [
      { text: "Journal methods", nextState: "journal_methods" },
      { text: "Tracking tools", nextState: "tracking_tools" },
      { text: "Tracking categories", nextState: "tracking_categories" },
      { text: "Back to progress tracking", nextState: "progress_tracking" },
    ],
  },
  weekly_review: {
    message:
      "Here's an effective weekly review process:\n\n1. Progress Review:\n   • Check goals\n   • Review habits\n   • Analyze wins\n   • Note challenges\n\n2. Planning Ahead:\n   • Set weekly goals\n   • Plan tasks\n   • Schedule time\n   • Prepare resources\n\n3. Adjustments:\n   • Update strategies\n   • Modify goals\n   • Change habits\n   • Seek support\n\nWould you like a specific review template?",
    options: [
      { text: "Review template", nextState: "review_template" },
      { text: "Planning guide", nextState: "planning_guide" },
      { text: "Adjustment strategies", nextState: "adjustment_strategies" },
      { text: "Back to progress tracking", nextState: "progress_tracking" },
    ],
  },
  monthly_assessment: {
    message:
      "Here's how to conduct monthly assessments:\n\n1. Big Picture Review:\n   • Check yearly goals\n   • Review progress\n   • Analyze patterns\n   • Identify trends\n\n2. Strategy Update:\n   • Adjust goals\n   • Update methods\n   • Change habits\n   • Seek feedback\n\n3. Next Month Planning:\n   • Set monthly goals\n   • Create action plan\n   • Schedule key tasks\n   • Prepare resources\n\nWould you like specific assessment tools?",
    options: [
      { text: "Assessment tools", nextState: "assessment_tools" },
      { text: "Strategy update", nextState: "strategy_update" },
      { text: "Monthly planning", nextState: "monthly_planning" },
      { text: "Back to progress tracking", nextState: "progress_tracking" },
    ],
  },
  starting_small: {
    message:
      "Here's how to start small with habits:\n\n1. Choose One Habit:\n   • Pick most important\n   • Make it specific\n   • Keep it simple\n   • Start tiny\n\n2. Make it Easy:\n   • Remove barriers\n   • Set up triggers\n   • Prepare environment\n   • Create reminders\n\n3. Build Gradually:\n   • Increase slowly\n   • Stay consistent\n   • Track progress\n   • Celebrate wins\n\nWould you like specific habit examples?",
    options: [
      { text: "Habit examples", nextState: "habit_examples" },
      { text: "Barrier removal", nextState: "barrier_removal" },
      { text: "Progress building", nextState: "progress_building" },
      { text: "Back to habit building", nextState: "habit_building" },
    ],
  },
  creating_systems: {
    message:
      "Here's how to create effective habit systems:\n\n1. Habit Triggers:\n   • Time-based\n   • Location-based\n   • Event-based\n   • Person-based\n\n2. Environment Setup:\n   • Remove obstacles\n   • Add cues\n   • Make it visible\n   • Keep it simple\n\n3. Support Systems:\n   • Accountability\n   • Reminders\n   • Tracking\n   • Rewards\n\nWould you like specific system examples?",
    options: [
      { text: "Trigger examples", nextState: "trigger_examples" },
      { text: "Environment setup", nextState: "environment_setup" },
      { text: "Support systems", nextState: "support_systems" },
      { text: "Back to habit building", nextState: "habit_building" },
    ],
  },
  staying_consistent: {
    message:
      "Here's how to stay consistent with habits:\n\n1. Reminder Systems:\n   • Calendar alerts\n   • Phone notifications\n   • Visual cues\n   • Habit stacking\n\n2. Accountability:\n   • Find a partner\n   • Join a group\n   • Share progress\n   • Get feedback\n\n3. Progress Tracking:\n   • Use habit tracker\n   • Record streaks\n   • Note challenges\n   • Celebrate wins\n\nWould you like specific consistency techniques?",
    options: [
      { text: "Reminder systems", nextState: "reminder_systems" },
      { text: "Accountability methods", nextState: "accountability_methods" },
      { text: "Tracking techniques", nextState: "tracking_techniques" },
      { text: "Back to habit building", nextState: "habit_building" },
    ],
  },
  reflection_exercises: {
    message:
      "Here are powerful reflection exercises:\n\n1. Daily Reflection:\n   • What went well?\n   • What could improve?\n   • What did I learn?\n   • What am I grateful for?\n\n2. Weekly Deep Dive:\n   • Review goals\n   • Check progress\n   • Identify patterns\n   • Plan adjustments\n\n3. Monthly Review:\n   • Big picture check\n   • Value alignment\n   • Purpose connection\n   • Future planning\n\nWould you like specific reflection prompts?",
    options: [
      { text: "Daily prompts", nextState: "daily_prompts" },
      { text: "Weekly prompts", nextState: "weekly_prompts" },
      { text: "Monthly prompts", nextState: "monthly_prompts" },
      { text: "Back to finding your why", nextState: "finding_your_why" },
    ],
  },
  value_identification: {
    message:
      "Here's how to identify your values:\n\n1. Core Values Exercise:\n   • List important values\n   • Rank by priority\n   • Define each value\n   • Connect to actions\n\n2. Value Alignment:\n   • Check goal alignment\n   • Review daily choices\n   • Assess relationships\n   • Evaluate career path\n\n3. Living Your Values:\n   • Set value-based goals\n   • Make value-based decisions\n   • Create value-based habits\n   • Share your values\n\nWould you like specific value exercises?",
    options: [
      { text: "Value exercises", nextState: "value_exercises" },
      { text: "Alignment check", nextState: "alignment_check" },
      { text: "Value-based living", nextState: "value_based_living" },
      { text: "Back to finding your why", nextState: "finding_your_why" },
    ],
  },
  purpose_connection: {
    message:
      "Here's how to connect with your purpose:\n\n1. Purpose Discovery:\n   • What brings joy?\n   • What feels meaningful?\n   • What impact do you want?\n   • What legacy matters?\n\n2. Purpose Integration:\n   • Connect to daily life\n   • Align with goals\n   • Share with others\n   • Live with purpose\n\n3. Purpose Maintenance:\n   • Regular check-ins\n   • Adjust as needed\n   • Stay connected\n   • Keep growing\n\nWould you like specific purpose exercises?",
    options: [
      { text: "Discovery exercises", nextState: "discovery_exercises" },
      { text: "Integration methods", nextState: "integration_methods" },
      { text: "Maintenance tips", nextState: "maintenance_tips" },
      { text: "Back to finding your why", nextState: "finding_your_why" },
    ],
  },
  starting_techniques: {
    message:
      "Here are effective starting techniques:\n\n1. Tiny Habits:\n   • Start with 2 minutes\n   • Make it super easy\n   • Build gradually\n   • Stay consistent\n\n2. Habit Stacking:\n   • Add to existing habits\n   • Create triggers\n   • Build routines\n   • Link habits together\n\n3. Environment Design:\n   • Remove obstacles\n   • Add cues\n   • Make it visible\n   • Keep it simple\n\nWould you like specific starting examples?",
    options: [
      { text: "Tiny habit examples", nextState: "tiny_habit_examples" },
      { text: "Habit stacking guide", nextState: "habit_stacking_guide" },
      { text: "Environment setup", nextState: "environment_setup" },
      { text: "Back to building momentum", nextState: "building_momentum" },
    ],
  },
  consistency_tips: {
    message:
      "Here are effective consistency tips:\n\n1. Daily Systems:\n   • Set reminders\n   • Create routines\n   • Track progress\n   • Celebrate wins\n\n2. Accountability:\n   • Find a partner\n   • Join a group\n   • Share progress\n   • Get feedback\n\n3. Motivation Maintenance:\n   • Review why\n   • Track progress\n   • Celebrate wins\n   • Stay inspired\n\nWould you like specific consistency techniques?",
    options: [
      { text: "Daily systems", nextState: "daily_systems" },
      { text: "Accountability methods", nextState: "accountability_methods" },
      { text: "Motivation maintenance", nextState: "motivation_maintenance" },
      { text: "Back to building momentum", nextState: "building_momentum" },
    ],
  },
  daily_inspiration: {
    message:
      "Here are daily inspiration sources:\n\n1. Morning Routine:\n   • Read quotes\n   • Watch videos\n   • Listen to podcasts\n   • Read success stories\n\n2. Throughout Day:\n   • Follow role models\n   • Join communities\n   • Share progress\n   • Learn from others\n\n3. Evening Reflection:\n   • Review wins\n   • Plan tomorrow\n   • Stay grateful\n   • Keep growing\n\nWould you like specific inspiration sources?",
    options: [
      { text: "Morning routine", nextState: "morning_routine" },
      { text: "Daily activities", nextState: "daily_activities" },
      { text: "Evening reflection", nextState: "evening_reflection" },
      { text: "Back to staying inspired", nextState: "staying_inspired" },
    ],
  },
  community_support: {
    message:
      "Here's how to build community support:\n\n1. Find Your Tribe:\n   • Join groups\n   • Attend events\n   • Connect online\n   • Share interests\n\n2. Build Relationships:\n   • Be authentic\n   • Give value\n   • Stay connected\n   • Grow together\n\n3. Create Accountability:\n   • Set goals together\n   • Share progress\n   • Give feedback\n   • Celebrate wins\n\nWould you like specific community building tips?",
    options: [
      { text: "Finding groups", nextState: "finding_groups" },
      { text: "Relationship building", nextState: "relationship_building" },
      { text: "Accountability setup", nextState: "accountability_setup" },
      { text: "Back to staying inspired", nextState: "staying_inspired" },
    ],
  },
  smart_goal_guide: {
    message:
      "Here's a comprehensive SMART goal guide:\n\n1. Specific:\n   • Clear objective\n   • Defined outcome\n   • Specific actions\n   • Clear purpose\n\n2. Measurable:\n   • Track progress\n   • Set metrics\n   • Define success\n   • Measure results\n\n3. Achievable:\n   • Realistic goals\n   • Available resources\n   • Right timing\n   • Proper support\n\n4. Relevant:\n   • Aligns with values\n   • Fits priorities\n   • Makes sense\n   • Worth doing\n\n5. Time-bound:\n   • Set deadlines\n   • Create timeline\n   • Plan milestones\n   • Track progress\n\nWould you like specific SMART goal examples?",
    options: [
      { text: "Goal examples", nextState: "goal_examples" },
      { text: "Tracking methods", nextState: "tracking_methods" },
      { text: "Review process", nextState: "review_process" },
      { text: "Back to goal setting", nextState: "goal_setting_strategies" },
    ],
  },
  action_planning: {
    message:
      "Here's how to create effective action plans:\n\n1. Break Down Goals:\n   • List steps\n   • Set order\n   • Assign time\n   • Allocate resources\n\n2. Create Timeline:\n   • Set deadlines\n   • Plan milestones\n   • Schedule tasks\n   • Buffer time\n\n3. Track Progress:\n   • Monitor steps\n   • Check deadlines\n   • Adjust as needed\n   • Celebrate wins\n\nWould you like specific planning templates?",
    options: [
      { text: "Planning templates", nextState: "planning_templates" },
      { text: "Timeline creation", nextState: "timeline_creation" },
      { text: "Progress tracking", nextState: "progress_tracking" },
      { text: "Back to goal setting", nextState: "goal_setting_strategies" },
    ],
  },
  prioritization_methods: {
    message:
      "Here are effective prioritization methods:\n\n1. Eisenhower Matrix:\n   • Urgent & Important\n   • Important, Not Urgent\n   • Urgent, Not Important\n   • Neither\n\n2. Value-Based:\n   • Align with values\n   • Check impact\n   • Consider legacy\n   • Review purpose\n\n3. Time-Based:\n   • Energy levels\n   • Peak hours\n   • Deadlines\n   • Dependencies\n\nWould you like specific prioritization tools?",
    options: [
      { text: "Matrix guide", nextState: "matrix_guide" },
      { text: "Value alignment", nextState: "value_alignment" },
      { text: "Time management", nextState: "time_management" },
      { text: "Back to time management", nextState: "time_management_tips" },
    ],
  },
  time_blocking_guide: {
    message:
      "Here's a comprehensive time blocking guide:\n\n1. Daily Blocks:\n   • Deep work\n   • Meetings\n   • Breaks\n   • Buffer time\n\n2. Weekly Planning:\n   • Theme days\n   • Focus areas\n   • Review time\n   • Planning time\n\n3. Implementation:\n   • Calendar setup\n   • Block scheduling\n   • Buffer time\n   • Flexibility\n\nWould you like specific time blocking templates?",
    options: [
      { text: "Daily templates", nextState: "daily_templates" },
      { text: "Weekly planning", nextState: "weekly_planning" },
      { text: "Implementation guide", nextState: "implementation_guide" },
      { text: "Back to time management", nextState: "time_management_tips" },
    ],
  },
  focus_techniques: {
    message:
      "Here are effective focus techniques:\n\n1. Environment Setup:\n   • Remove distractions\n   • Set up workspace\n   • Control noise\n   • Manage lighting\n\n2. Time Management:\n   • Pomodoro method\n   • Deep work blocks\n   • Break schedule\n   • Energy management\n\n3. Mental Focus:\n   • Clear mind\n   • Single task\n   • Stay present\n   • Take breaks\n\nWould you like specific focus strategies?",
    options: [
      { text: "Environment setup", nextState: "environment_setup" },
      { text: "Time management", nextState: "time_management" },
      { text: "Mental focus", nextState: "mental_focus" },
      { text: "Back to time management", nextState: "time_management_tips" },
    ],
  },
  default: {
    message: "Sorry, I am not able to answer that question.",
    options: [{ text: "Back to main menu", nextState: "greeting" }],
  },
  journal_methods: {
    message:
      "Here are effective journal methods:\n\n1. Bullet Journal:\n   • Rapid logging\n   • Collections\n   • Monthly logs\n   • Daily logs\n\n2. Digital Journal:\n   • App-based\n   • Cloud sync\n   • Templates\n   • Reminders\n\n3. Progress Journal:\n   • Goal tracking\n   • Habit logging\n   • Milestone recording\n   • Reflection space\n\nWould you like specific journal templates?",
    options: [
      { text: "Bullet journal guide", nextState: "bullet_journal_guide" },
      { text: "Digital journal setup", nextState: "digital_journal_setup" },
      { text: "Progress tracking", nextState: "progress_tracking" },
      { text: "Back to daily tracking", nextState: "daily_tracking" },
    ],
  },
  tracking_tools: {
    message:
      "Here are effective tracking tools:\n\n1. Digital Tools:\n   • Habit apps\n   • Goal trackers\n   • Progress apps\n   • Calendar apps\n\n2. Physical Tools:\n   • Planners\n   • Trackers\n   • Journals\n   • Calendars\n\n3. Hybrid Approach:\n   • Digital + physical\n   • App + journal\n   • Online + offline\n   • Sync systems\n\nWould you like specific tool recommendations?",
    options: [
      { text: "Digital tools", nextState: "digital_tools" },
      { text: "Physical tools", nextState: "physical_tools" },
      { text: "Hybrid setup", nextState: "hybrid_setup" },
      { text: "Back to daily tracking", nextState: "daily_tracking" },
    ],
  },
  tracking_categories: {
    message:
      "Here are key tracking categories:\n\n1. Habits:\n   • Daily habits\n   • Weekly habits\n   • Monthly habits\n   • Progress tracking\n\n2. Goals:\n   • Short-term\n   • Long-term\n   • Milestones\n   • Deadlines\n\n3. Progress:\n   • Measurements\n   • Achievements\n   • Challenges\n   • Learnings\n\nWould you like specific tracking templates?",
    options: [
      { text: "Habit tracking", nextState: "habit_tracking" },
      { text: "Goal tracking", nextState: "goal_tracking" },
      { text: "Progress tracking", nextState: "progress_tracking" },
      { text: "Back to daily tracking", nextState: "daily_tracking" },
    ],
  },
  review_template: {
    message:
      "Here's an effective review template:\n\n1. Weekly Review:\n   • Goals progress\n   • Habit completion\n   • Key achievements\n   • Challenges faced\n\n2. Analysis:\n   • What worked\n   • What didn't\n   • What to change\n   • What to keep\n\n3. Planning:\n   • Next week goals\n   • Action items\n   • Schedule setup\n   • Resource needs\n\nWould you like specific review questions?",
    options: [
      { text: "Review questions", nextState: "review_questions" },
      { text: "Analysis guide", nextState: "analysis_guide" },
      { text: "Planning template", nextState: "planning_template" },
      { text: "Back to weekly review", nextState: "weekly_review" },
    ],
  },
  planning_guide: {
    message:
      "Here's a comprehensive planning guide:\n\n1. Goal Setting:\n   • Weekly objectives\n   • Priority tasks\n   • Key milestones\n   • Success metrics\n\n2. Time Planning:\n   • Block schedule\n   • Buffer time\n   • Focus blocks\n   • Break times\n\n3. Resource Planning:\n   • Tools needed\n   • Support required\n   • Learning resources\n   • Backup plans\n\nWould you like specific planning templates?",
    options: [
      { text: "Goal templates", nextState: "goal_templates" },
      { text: "Time planning", nextState: "time_planning" },
      { text: "Resource planning", nextState: "resource_planning" },
      { text: "Back to weekly review", nextState: "weekly_review" },
    ],
  },
  adjustment_strategies: {
    message:
      "Here are effective adjustment strategies:\n\n1. Goal Adjustments:\n   • Review progress\n   • Check feasibility\n   • Update targets\n   • Reset timelines\n\n2. Habit Adjustments:\n   • Check consistency\n   • Modify triggers\n   • Update routines\n   • Change environment\n\n3. Strategy Updates:\n   • Review methods\n   • Test new approaches\n   • Gather feedback\n   • Implement changes\n\nWould you like specific adjustment techniques?",
    options: [
      { text: "Goal adjustments", nextState: "goal_adjustments" },
      { text: "Habit adjustments", nextState: "habit_adjustments" },
      { text: "Strategy updates", nextState: "strategy_updates" },
      { text: "Back to weekly review", nextState: "weekly_review" },
    ],
  },
  assessment_tools: {
    message:
      "Here are effective assessment tools:\n\n1. Progress Metrics:\n   • Goal completion\n   • Habit streaks\n   • Milestone tracking\n   • Achievement logging\n\n2. Analysis Tools:\n   • Trend analysis\n   • Pattern recognition\n   • Success factors\n   • Challenge areas\n\n3. Planning Tools:\n   • Goal setting\n   • Action planning\n   • Resource allocation\n   • Timeline creation\n\nWould you like specific assessment templates?",
    options: [
      { text: "Progress metrics", nextState: "progress_metrics" },
      { text: "Analysis tools", nextState: "analysis_tools" },
      { text: "Planning tools", nextState: "planning_tools" },
      { text: "Back to monthly assessment", nextState: "monthly_assessment" },
    ],
  },
  strategy_update: {
    message:
      "Here's how to update your strategy:\n\n1. Review Current Strategy:\n   • Check effectiveness\n   • Identify gaps\n   • Note challenges\n   • Find opportunities\n\n2. Strategy Adjustments:\n   • Update methods\n   • Modify approaches\n   • Change tactics\n   • Improve systems\n\n3. Implementation Plan:\n   • Set new goals\n   • Create action items\n   • Allocate resources\n   • Set timelines\n\nWould you like specific strategy templates?",
    options: [
      { text: "Review guide", nextState: "review_guide" },
      { text: "Adjustment methods", nextState: "adjustment_methods" },
      { text: "Implementation plan", nextState: "implementation_plan" },
      { text: "Back to monthly assessment", nextState: "monthly_assessment" },
    ],
  },
  monthly_planning: {
    message:
      "Here's how to plan your month:\n\n1. Goal Setting:\n   • Monthly objectives\n   • Key milestones\n   • Success metrics\n   • Priority areas\n\n2. Action Planning:\n   • Weekly breakdown\n   • Daily tasks\n   • Resource needs\n   • Support required\n\n3. Review Schedule:\n   • Weekly reviews\n   • Progress checks\n   • Adjustment points\n   • Celebration moments\n\nWould you like specific planning templates?",
    options: [
      { text: "Goal templates", nextState: "goal_templates" },
      { text: "Action planning", nextState: "action_planning" },
      { text: "Review schedule", nextState: "review_schedule" },
      { text: "Back to monthly assessment", nextState: "monthly_assessment" },
    ],
  },
  habit_examples: {
    message:
      "Here are effective habit examples:\n\n1. Morning Habits:\n   • Wake up early\n   • Exercise\n   • Meditation\n   • Reading\n\n2. Work Habits:\n   • Deep work\n   • Regular breaks\n   • Task batching\n   • Progress review\n\n3. Evening Habits:\n   • Planning\n   • Reflection\n   • Relaxation\n   • Early sleep\n\nWould you like specific habit routines?",
    options: [
      { text: "Morning routine", nextState: "morning_routine" },
      { text: "Work routine", nextState: "work_routine" },
      { text: "Evening routine", nextState: "evening_routine" },
      { text: "Back to starting small", nextState: "starting_small" },
    ],
  },
  barrier_removal: {
    message:
      "Here's how to remove barriers:\n\n1. Identify Barriers:\n   • Time constraints\n   • Energy levels\n   • Environment issues\n   • Mental blocks\n\n2. Solution Strategies:\n   • Time management\n   • Energy optimization\n   • Environment setup\n   • Mindset shifts\n\n3. Implementation:\n   • Action steps\n   • Support systems\n   • Progress tracking\n   • Adjustment process\n\nWould you like specific barrier solutions?",
    options: [
      { text: "Barrier identification", nextState: "barrier_identification" },
      { text: "Solution strategies", nextState: "solution_strategies" },
      { text: "Implementation guide", nextState: "implementation_guide" },
      { text: "Back to starting small", nextState: "starting_small" },
    ],
  },
  progress_building: {
    message:
      "Here's how to build progress:\n\n1. Start Small:\n   • Tiny actions\n   • Easy wins\n   • Quick results\n   • Build confidence\n\n2. Increase Gradually:\n   • Small steps\n   • Regular progress\n   • Consistent growth\n   • Sustainable pace\n\n3. Track Progress:\n   • Measure results\n   • Celebrate wins\n   • Learn from setbacks\n   • Adjust as needed\n\nWould you like specific progress strategies?",
    options: [
      { text: "Starting strategies", nextState: "starting_strategies" },
      { text: "Growth methods", nextState: "growth_methods" },
      { text: "Progress tracking", nextState: "progress_tracking" },
      { text: "Back to starting small", nextState: "starting_small" },
    ],
  },
  trigger_examples: {
    message:
      "Here are effective habit triggers:\n\n1. Time-Based:\n   • Morning routine\n   • After work\n   • Before bed\n   • Specific times\n\n2. Location-Based:\n   • Home office\n   • Gym\n   • Kitchen\n   • Workspace\n\n3. Event-Based:\n   • After coffee\n   • After exercise\n   • After meetings\n   • After meals\n\nWould you like specific trigger setups?",
    options: [
      { text: "Time triggers", nextState: "time_triggers" },
      { text: "Location triggers", nextState: "location_triggers" },
      { text: "Event triggers", nextState: "event_triggers" },
      { text: "Back to creating systems", nextState: "creating_systems" },
    ],
  },
  environment_setup: {
    message:
      "Here's how to set up your environment:\n\n1. Physical Space:\n   • Remove distractions\n   • Add cues\n   • Organize tools\n   • Create zones\n\n2. Digital Space:\n   • Clean desktop\n   • Organize files\n   • Set up apps\n   • Block distractions\n\n3. Mental Space:\n   • Clear mind\n   • Set intentions\n   • Create focus\n   • Build momentum\n\nWould you like specific setup guides?",
    options: [
      { text: "Physical setup", nextState: "physical_setup" },
      { text: "Digital setup", nextState: "digital_setup" },
      { text: "Mental setup", nextState: "mental_setup" },
      { text: "Back to creating systems", nextState: "creating_systems" },
    ],
  },
  support_systems: {
    message:
      "Here are effective support systems:\n\n1. Accountability:\n   • Partner system\n   • Group support\n   • Progress sharing\n   • Regular check-ins\n\n2. Reminders:\n   • Calendar alerts\n   • Phone notifications\n   • Visual cues\n   • Habit stacking\n\n3. Tracking:\n   • Progress logs\n   • Streak tracking\n   • Milestone recording\n   • Achievement celebration\n\nWould you like specific support setups?",
    options: [
      { text: "Accountability setup", nextState: "accountability_setup" },
      { text: "Reminder systems", nextState: "reminder_systems" },
      { text: "Tracking setup", nextState: "tracking_setup" },
      { text: "Back to creating systems", nextState: "creating_systems" },
    ],
  },
  reminder_systems: {
    message:
      "Here are effective reminder systems:\n\n1. Digital Reminders:\n   • Calendar alerts\n   • Phone notifications\n   • App reminders\n   • Email alerts\n\n2. Physical Reminders:\n   • Post-it notes\n   • Whiteboard\n   • Planner\n   • Visual cues\n\n3. Habit Stacking:\n   • After existing habits\n   • With routines\n   • During transitions\n   • At specific times\n\nWould you like specific reminder setups?",
    options: [
      { text: "Digital setup", nextState: "digital_setup" },
      { text: "Physical setup", nextState: "physical_setup" },
      { text: "Habit stacking", nextState: "habit_stacking" },
      { text: "Back to staying consistent", nextState: "staying_consistent" },
    ],
  },
  accountability_methods: {
    message:
      "Here are effective accountability methods:\n\n1. Partner System:\n   • Find accountability partner\n   • Set regular check-ins\n   • Share progress\n   • Give feedback\n\n2. Group Support:\n   • Join accountability group\n   • Regular meetings\n   • Progress sharing\n   • Group challenges\n\n3. Public Commitment:\n   • Share goals\n   • Post progress\n   • Get support\n   • Stay motivated\n\nWould you like specific accountability setups?",
    options: [
      { text: "Partner setup", nextState: "partner_setup" },
      { text: "Group setup", nextState: "group_setup" },
      { text: "Public commitment", nextState: "public_commitment" },
      { text: "Back to staying consistent", nextState: "staying_consistent" },
    ],
  },
  tracking_techniques: {
    message:
      "Here are effective tracking techniques:\n\n1. Daily Tracking:\n   • Habit completion\n   • Progress notes\n   • Wins recorded\n   • Challenges noted\n\n2. Weekly Review:\n   • Progress summary\n   • Pattern analysis\n   • Adjustment points\n   • Next week planning\n\n3. Monthly Assessment:\n   • Big picture review\n   • Goal progress\n   • Strategy updates\n   • Future planning\n\nWould you like specific tracking templates?",
    options: [
      { text: "Daily tracking", nextState: "daily_tracking" },
      { text: "Weekly review", nextState: "weekly_review" },
      { text: "Monthly assessment", nextState: "monthly_assessment" },
      { text: "Back to staying consistent", nextState: "staying_consistent" },
    ],
  },
};

const ChatSystem = ({ isOpen, onClose }) => {
  const [currentState, setCurrentState] = useState("greeting");
  const [chatHistory, setChatHistory] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  useEffect(() => {
    if (isOpen) {
      setCurrentState("greeting");
      setChatHistory([
        {
          type: "bot",
          message: chatResponses.greeting.message,
          options: chatResponses.greeting.options,
        },
      ]);
    }
  }, [isOpen]);

  const handleOptionClick = (option) => {
    setChatHistory((prev) => [
      ...prev,
      {
        type: "user",
        message: option.text,
      },
    ]);

    const nextState = option.nextState;
    const botResponse = chatResponses[nextState] || chatResponses.default;

    setChatHistory((prev) => [
      ...prev,
      {
        type: "bot",
        message: botResponse.message,
        options: botResponse.options,
      },
    ]);
    setCurrentState(nextState);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-28 right-4 w-96 h-[600px] bg-white rounded-2xl shadow-xl border border-indigo-100 flex flex-col">
      {/* Chat Header */}
      <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-2xl text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <i className="fas fa-robot"></i>
            </div>
            <h3 className="font-semibold">Momentum Guide</h3>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {chatHistory.map((chat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${
                chat.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-3 ${
                  chat.type === "user"
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <p className="whitespace-pre-line">{chat.message}</p>
                {chat.options && (
                  <div className="mt-3 space-y-2">
                    {chat.options.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        onClick={() => handleOptionClick(option)}
                        className={`w-full text-left p-2 rounded-lg transition-colors duration-200 ${
                          chat.type === "bot"
                            ? "bg-gradient-to-r from-purple-500/20 to-indigo-500/20 hover:from-purple-500/30 hover:to-indigo-500/30 text-indigo-700"
                            : "bg-white/20 hover:bg-white/30 text-white"
                        }`}
                      >
                        {option.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatSystem;
