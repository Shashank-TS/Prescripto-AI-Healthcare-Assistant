import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", "false");
    localStorage.setItem('paymentStatus', 'notDone');
    sessionStorage.clear(); // Clear session storage when logging out
  };

  useEffect(() => {
    const handleUnload = (event) => {
      // Check if the visibility state is hidden, meaning the tab is closing
      if (document.visibilityState === "hidden") {
        sessionStorage.clear(); // Clear session storage only on tab close
        localStorage.setItem("isAuthenticated", "false"); // Set auth state to false
      }
    };
  
    window.addEventListener("beforeunload", handleUnload);
  
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};