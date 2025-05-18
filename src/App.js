import React, { useEffect } from "react";
import { NewTracker } from "./pages/NewTracker";
import { Dashboard } from "./pages/Dashboard";
import { TrackerDetails } from "./pages/TrackerDetails";
import { Account } from "./pages/Account";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  PreferencesProvider,
  usePreferences,
} from "./context/PreferencesContext";
import Calendar from "./pages/Calendar";
import { Navbar } from "./components/Navbar";
import { NewTrackerModal } from "./components/NewTrackerModal";
import { Tasks } from "./pages/Tasks";
import { Rewards } from "./pages/Rewards";
import { Store } from "./pages/Store";
import { GoalRecommendations } from "./pages/GoalRecommendations";
import { Wellness } from "./pages/Wellness";
import { initializeRewardSystem } from "./utils/rewardSystem";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Documentation from "./pages/Documentation";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute";
import ChatButton from "./components/ChatButton";

// ScrollToTop component to handle scrolling
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Main App Content component that uses the preferences
function AppContent() {
  useEffect(() => {
    // Initialize the reward system
    initializeRewardSystem();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Toaster position="top-right" />
      <Navbar />
      <main className="flex-grow bg-[#f8fafc]">
        <div className="w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <PrivateRoute>
                  <Calendar />
                </PrivateRoute>
              }
            />
            <Route
              path="/new-tracker"
              element={
                <PrivateRoute>
                  <NewTrackerModal />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-tracker/:id"
              element={
                <PrivateRoute>
                  <NewTrackerModal />
                </PrivateRoute>
              }
            />
            <Route
              path="/tracker-details/:id"
              element={
                <PrivateRoute>
                  <TrackerDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/account"
              element={
                <PrivateRoute>
                  <Account />
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks"
              element={
                <PrivateRoute>
                  <Tasks />
                </PrivateRoute>
              }
            />
            <Route
              path="/rewards"
              element={
                <PrivateRoute>
                  <Rewards />
                </PrivateRoute>
              }
            />
            <Route
              path="/store"
              element={
                <PrivateRoute>
                  <Store />
                </PrivateRoute>
              }
            />
            <Route
              path="/wellness"
              element={
                <PrivateRoute>
                  <Wellness />
                </PrivateRoute>
              }
            />
            <Route
              path="/goal-recommendations"
              element={
                <PrivateRoute>
                  <GoalRecommendations />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </main>
      <ChatButton />
    </div>
  );
}

// Root App component that provides the context
function App() {
  return (
    <Router>
      <PreferencesProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </PreferencesProvider>
    </Router>
  );
}

export default App;
