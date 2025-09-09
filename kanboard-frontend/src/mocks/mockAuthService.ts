import {
  delay,
  validateCredentials,
  getAuthToken,
  createMockUser,
} from "../mocks/utils";
import { AuthResponse, LoginRequest, RegisterRequest } from "../types/auth";

class MockAuthService {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    await delay(800);

    if (!validateCredentials(credentials.username, credentials.password)) {
      throw new Error("Geçersiz kullanıcı bilgileri");
    }

    const token = getAuthToken();
    const user = createMockUser(
      credentials.username,
      `${credentials.username}@kanboard.com`
    );

    return {
      token,
      type: "Bearer",
      username: user.username,
      email: user.email,
    };
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    await delay(1000);

    if (data.password !== data.confirmPassword) {
      throw new Error("Şifreler eşleşmiyor");
    }

    if (data.password.length < 6) {
      throw new Error("Şifre en az 6 karakter olmalı");
    }

    const token = getAuthToken();
    const user = createMockUser(data.username, data.email);

    return {
      token,
      type: "Bearer",
      username: user.username,
      email: user.email,
    };
  }

  logout() {
    // Mock logout - just clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  getUser() {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }

  setUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
  }
}

export const mockAuthService = new MockAuthService();
