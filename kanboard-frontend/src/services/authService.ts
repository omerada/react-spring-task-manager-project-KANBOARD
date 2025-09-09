import api from "./api";
import { AuthResponse, LoginRequest, RegisterRequest } from "../types/auth";

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/register", data);
    return response.data;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getToken(): string | null {
    return localStorage.getItem("token");
  },

  setToken(token: string) {
    localStorage.setItem("token", token);
  },

  getUser() {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  setUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
  },
};
