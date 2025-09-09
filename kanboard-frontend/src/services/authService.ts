import api from "./api";
import { AuthResponse, LoginRequest, RegisterRequest } from "../types/auth";
import { mockAuthService } from "../mocks/mockAuthService";

const isUsingMockApi = process.env.REACT_APP_MOCK_API === "true";

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    if (isUsingMockApi) {
      return mockAuthService.login(credentials);
    }
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    if (isUsingMockApi) {
      return mockAuthService.register(data);
    }
    const response = await api.post<AuthResponse>("/auth/register", data);
    return response.data;
  },

  logout() {
    if (isUsingMockApi) {
      mockAuthService.logout();
      return;
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getToken(): string | null {
    if (isUsingMockApi) {
      return mockAuthService.getToken();
    }
    return localStorage.getItem("token");
  },

  setToken(token: string) {
    if (isUsingMockApi) {
      mockAuthService.setToken(token);
      return;
    }
    localStorage.setItem("token", token);
  },

  getUser() {
    if (isUsingMockApi) {
      return mockAuthService.getUser();
    }
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  setUser(user: any) {
    if (isUsingMockApi) {
      mockAuthService.setUser(user);
      return;
    }
    localStorage.setItem("user", JSON.stringify(user));
  },
};
