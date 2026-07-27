export const APP_NAME = "Base React Project"
export const APP_VERSION = "1.0.0"

export const ROUTES = {
  HOME: "/",
  AUTH: "/auth",
  DASHBOARD: "/dashboard",
} as const

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
  },
  USERS: {
    LIST: "/users",
    DETAIL: (id: string) => `/users/${id}`,
  },
} as const

export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth-token",
  REFRESH_TOKEN: "refresh-token",
  THEME: "theme",
} as const

export const QUERY_KEYS = {
  USERS: "users",
  POSTS: "posts",
  COMMENTS: "comments",
} as const

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const