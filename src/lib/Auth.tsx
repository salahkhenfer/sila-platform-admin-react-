import { createContext, useContext, useState } from "react";

interface AuthContextType {
  auth: { isAuthenticated: boolean };
  login: (password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false });

  const login = (password: string) => {
    // Add your custom authentication logic here
    if (password === "sila0556") {
      localStorage.setItem("isAuthenticated", "true");
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
