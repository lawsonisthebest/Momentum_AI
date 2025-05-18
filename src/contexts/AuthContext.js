import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (you can implement your own auth logic here)
    const checkAuth = async () => {
      try {
        // For now, we'll just set a mock user
        setCurrentUser({
          id: "1",
          email: "user@example.com",
          displayName: "Demo User",
        });
      } catch (error) {
        console.error("Auth error:", error);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const value = {
    currentUser,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
