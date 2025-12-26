import { createContext, useContext, useState} from "react";
import type {ReactNode } from "react";
import axios from "axios";


type User = {
  id: number;
  email: string;
  role: "ADMIN" | "EMPLOYEE";
};


type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};


const AuthContext = createContext<AuthContextType | null>(null);


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  
  const login = async (email: string, password: string) => {
    const response = await axios.post("http://localhost:3001/auth/login", {
      email,
      password,
    });

    const accessToken = response.data.access_token;
    const payload = JSON.parse(atob(accessToken.split(".")[1]));

    setToken(accessToken);
    setUser({
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    });

  
    localStorage.setItem("token", accessToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
