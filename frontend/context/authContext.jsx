import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // States
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const data = { user, setUser, isAuthenticated, setIsAuthenticated };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
