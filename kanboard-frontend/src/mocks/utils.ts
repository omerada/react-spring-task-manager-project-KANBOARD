export const delay = (ms: number = 500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const formatDate = (date: Date): string => {
  return date.toISOString();
};

export const simulateNetworkError = (errorRate: number = 0.1): boolean => {
  return Math.random() < errorRate;
};

export const createApiResponse = <T>(data: T, success: boolean = true) => {
  return {
    data,
    success,
    message: success ? "İşlem başarılı" : "Bir hata oluştu",
    timestamp: new Date().toISOString(),
  };
};

export const getAuthToken = (): string => {
  return `mock-jwt-token-${Date.now()}`;
};

export const validateCredentials = (
  username: string,
  password: string
): boolean => {
  // Demo amaçlı basit validasyon
  return (
    (username === "admin" && password === "admin123") ||
    (username === "demo" && password === "demo123") ||
    (username.length > 0 && password.length >= 6)
  );
};

export const createMockUser = (username: string, email: string) => {
  return {
    id: generateId(),
    username,
    email,
  };
};
