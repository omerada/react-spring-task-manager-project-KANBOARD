import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import { LoginForm } from "../../components/auth/LoginForm";
import { authService } from "../../services/authService";

// Mock the auth service
jest.mock("../../services/authService");
const mockedAuthService = authService as jest.Mocked<typeof authService>;

// Test wrapper component
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          {children}
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("renders login form correctly", () => {
    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    );

    expect(screen.getByText("Hesabınıza giriş yapın")).toBeInTheDocument();
    expect(screen.getByLabelText(/kullanıcı adı/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/şifre/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /giriş yap/i })).toBeInTheDocument();
  });

  it("shows validation errors for empty fields", async () => {
    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    );

    const submitButton = screen.getByRole("button", { name: /giriş yap/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Kullanıcı adı gereklidir")).toBeInTheDocument();
    });
    
    expect(screen.getByText("Şifre gereklidir")).toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    const mockResponse = {
      token: "mock-token",
      type: "Bearer",
      username: "testuser",
      email: "test@example.com",
    };

    mockedAuthService.login.mockResolvedValueOnce(mockResponse);

    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    );

    const usernameInput = screen.getByLabelText(/kullanıcı adı/i);
    const passwordInput = screen.getByLabelText(/şifre/i);
    const submitButton = screen.getByRole("button", { name: /giriş yap/i });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedAuthService.login).toHaveBeenCalledWith({
        username: "testuser",
        password: "password123",
      });
    });
  });

  it("handles login error", async () => {
    const mockError = {
      response: {
        data: {
          message: "Geçersiz kullanıcı adı veya şifre",
        },
      },
    };

    mockedAuthService.login.mockRejectedValueOnce(mockError);

    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    );

    const usernameInput = screen.getByLabelText(/kullanıcı adı/i);
    const passwordInput = screen.getByLabelText(/şifre/i);
    const submitButton = screen.getByRole("button", { name: /giriş yap/i });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedAuthService.login).toHaveBeenCalled();
    });
  });
});
