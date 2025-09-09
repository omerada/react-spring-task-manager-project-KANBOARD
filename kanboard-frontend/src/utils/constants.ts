export const APP_CONFIG = {
  API_TIMEOUT: 10000,
  DEBOUNCE_DELAY: 300,
  STALE_TIME: 5 * 60 * 1000, // 5 minutes
  CACHE_TIME: 10 * 60 * 1000, // 10 minutes
} as const;

export const DRAG_TYPES = {
  TASK: "task",
  COLUMN: "column",
} as const;

export const QUERY_KEYS = {
  BOARDS: "boards",
  BOARD: "board",
  TASKS: "tasks",
  USER: "user",
} as const;

export const COLUMN_COLORS = {
  "TO DO": "bg-gray-100 border-gray-300",
  "IN PROGRESS": "bg-yellow-50 border-yellow-300",
  "DONE": "bg-green-50 border-green-300",
  DEFAULT: "bg-blue-50 border-blue-300",
} as const;

export const COLUMN_TITLES = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress", 
  DONE: "Done",
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    REFRESH: "/auth/refresh",
  },
  BOARDS: "/boards",
  TASKS: "/tasks",
  COLUMNS: "/columns",
} as const;

export const LOCAL_STORAGE_KEYS = {
  TOKEN: "token",
  USER: "user",
  THEME: "theme",
} as const;
