import React, { createContext, useState, useEffect } from "react";
import { checkAuth, logout } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState();

  const handleAuth = async () => {
    try {
      const authStatus = await checkAuth();
      setIsAuth(authStatus);
    } catch (error) {
      setIsAuth(false);
        console.error("Error checking authentication:", error.message);
    }
  };

  useEffect(() => {
    handleAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsAuth(false);
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
