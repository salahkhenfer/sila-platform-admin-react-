import { progress } from "framer-motion";
import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false });

  const login = (password) => {
    // Add your custom authentication logic here
    if (password === progress.env.REACT_APP_PASSWORD) {
      localStorage.setItem("isAuthenticated", true);
      setAuth({ isAuthenticated: true });
    } else {
      alert("Invalid credentials");
    }
  };

  const logout = () => {
    setAuth({ isAuthenticated: false });
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
