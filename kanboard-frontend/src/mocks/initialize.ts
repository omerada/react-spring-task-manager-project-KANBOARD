export const initializeMockData = () => {
  const isDemoMode =
    process.env.REACT_APP_MOCK_API === "true" ||
    process.env.NODE_ENV === "production" ||
    window.location.hostname.includes("vercel.app");

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
    console.log("Username: demo | Password: demo123");
    console.log("Username: admin | Password: admin123");
    console.log("---");
    console.log("Demo bilgileri otomatik olarak form alanlarına doldurulacak.");
  }

  return isDemoMode;
};

export const getDemoCredentials = () => {
  const stored = localStorage.getItem("demo-credentials");
  return stored
    ? JSON.parse(stored)
    : { username: "demo", password: "demo123" };
};

export const isDemoEnvironment = () => {
  return (
    process.env.REACT_APP_MOCK_API === "true" ||
    process.env.NODE_ENV === "production" ||
    window.location.hostname.includes("vercel.app")
  );
};
