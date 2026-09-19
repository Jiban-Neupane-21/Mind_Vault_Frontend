import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { authService } from "@/services/authService";
import type { User, LoginPayload } from "@/types/auth";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("accessToken"),
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("accessToken");
      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Session rehydration failed:", error);
        localStorage.removeItem("accessToken");
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginPayload) => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);

      const receivedToken =
        response.token || response.accessToken || response.data?.token;
      const receivedUser = response.user || response.data?.user;

      if (!receivedUser) {
        throw new Error("No user profile returned from login response");
      }
      if (receivedToken) {
        localStorage.setItem("accessToken", receivedToken);
        setToken(receivedToken);
      }

      setUser(receivedUser);
      return receivedUser; // 👈 Return the fresh user directly
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
