import React, { createContext, useContext, useEffect, useState } from "react";
import {
  AuthContextType,
  User,
  LoginRequest,
  RegisterRequest,
} from "../types/auth";
import { authService } from "../services/authService";
import toast from "react-hot-toast";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = authService.getToken();
    const savedUser = authService.getUser();

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginRequest) => {
    try {
      setIsLoading(true);
      const response = await authService.login(credentials);

      const userData: User = {
        id: response.username,
        username: response.username,
        email: response.email,
      };

      setToken(response.token);
      setUser(userData);

      authService.setToken(response.token);
      authService.setUser(userData);

      toast.success("Giriş başarılı!");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Giriş yapılırken hata oluştu"
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      setIsLoading(true);
      const response = await authService.register(data);

      const userData: User = {
        id: response.username,
        username: response.username,
        email: response.email,
      };

      setToken(response.token);
      setUser(userData);

      authService.setToken(response.token);
      authService.setUser(userData);

      toast.success("Kayıt başarılı!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Kayıt olurken hata oluştu");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    authService.logout();
    toast.success("Çıkış yapıldı");
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isLoading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
