export const initializeMockData = () => {
  const isDemoMode = process.env.REACT_APP_MOCK_API === "true";

  if (!isDemoMode) return;

  // Check if this is first time initialization
  const isInitialized = localStorage.getItem("mock-data-initialized");

  if (!isInitialized) {
    // Set demo user credentials for easy access
    const demoCredentials = {
      username: "demo",
      password: "demo123",
    };

    localStorage.setItem("demo-credentials", JSON.stringify(demoCredentials));
    localStorage.setItem("mock-data-initialized", "true");

    console.log(
      "%c🚀 Kanboard Demo Mode Active!",
      "background: #4F46E5; color: white; padding: 8px 16px; border-radius: 4px; font-weight: bold;"
    );
    console.log(
      "%c📝 Demo Credentials:",
      "background: #059669; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;"
    );
    console.log("Username: demo");
    console.log("Password: demo123");
    console.log("---");
    console.log("Username: admin");
    console.log("Password: admin123");
  }
};

export const getDemoCredentials = () => {
  const stored = localStorage.getItem("demo-credentials");
  return stored
    ? JSON.parse(stored)
    : { username: "demo", password: "demo123" };
};
