import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DashboardPage } from "./pages/DashboardPage";
import { BoardDetailPage } from "./pages/BoardDetailPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { useSEO } from "./hooks/useSEO";
import "./styles/globals.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  // Global SEO settings
  useSEO({
    title: "Kanboard - Modern Proje Yönetimi ve Takım Çalışması",
    description:
      "Kanboard ile projelerinizi organize edin, görevlerinizi takip edin ve takım çalışmanızı geliştirin. Modern kanban board uygulaması.",
    keywords:
      "kanban, proje yönetimi, görev takibi, takım çalışması, üretkenlik, agile, scrum",
    ogTitle: "Kanboard - Modern Proje Yönetimi",
    ogDescription:
      "Projelerinizi organize edin, görevlerinizi takip edin ve takım çalışmanızı geliştirin.",
    ogUrl: window.location.origin,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/boards/:boardId"
                element={
                  <ProtectedRoute>
                    <BoardDetailPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute>
                    <AnalyticsPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>

            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#363636",
                  color: "#fff",
                },
                success: { style: { background: "#10B981" } },
                error: { style: { background: "#EF4444" } },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
