export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
    REFRESH: "/auth/refresh",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    VERIFY_EMAIL: "/auth/verify-email",
  },
  USERS: {
    BASE: "/users",
    BY_ID: (id: string) => `/users/${id}`,
    PROFILE: (id: string) => `/users/${id}/profile`,
    AVATAR: (id: string) => `/users/${id}/avatar`,
    PASSWORD: (id: string) => `/users/${id}/password`,
  },
  POSTS: {
    BASE: "/posts",
    BY_ID: (id: string) => `/posts/${id}`,
    COMMENTS: (id: string) => `/posts/${id}/comments`,
    LIKE: (id: string) => `/posts/${id}/like`,
    UNLIKE: (id: string) => `/posts/${id}/unlike`,
    BOOKMARK: (id: string) => `/posts/${id}/bookmark`,
  },
  COMMENTS: {
    BASE: "/comments",
    BY_ID: (id: string) => `/comments/${id}`,
    REPLY: (id: string) => `/comments/${id}/reply`,
    LIKE: (id: string) => `/comments/${id}/like`,
  },
  CATEGORIES: {
    BASE: "/categories",
    BY_ID: (id: string) => `/categories/${id}`,
    POSTS: (id: string) => `/categories/${id}/posts`,
  },
  TAGS: {
    BASE: "/tags",
    BY_ID: (id: string) => `/tags/${id}`,
    POSTS: (id: string) => `/tags/${id}/posts`,
  },
  UPLOAD: {
    IMAGE: "/upload/image",
    FILE: "/upload/file",
    IMAGES: "/upload/images",
  },
  SEARCH: {
    BASE: "/search",
    USERS: "/search/users",
    POSTS: "/search/posts",
  },
  NOTIFICATIONS: {
    BASE: "/notifications",
    BY_ID: (id: string) => `/notifications/${id}`,
    READ: (id: string) => `/notifications/${id}/read`,
    READ_ALL: "/notifications/read-all",
    UNREAD_COUNT: "/notifications/unread-count",
  },
  SETTINGS: {
    BASE: "/settings",
    PROFILE: "/settings/profile",
    PASSWORD: "/settings/password",
    NOTIFICATIONS: "/settings/notifications",
    PRIVACY: "/settings/privacy",
  },
  ADMIN: {
    BASE: "/admin",
    USERS: "/admin/users",
    USER_BY_ID: (id: string) => `/admin/users/${id}`,
    POSTS: "/admin/posts",
    POST_BY_ID: (id: string) => `/admin/posts/${id}`,
    STATS: "/admin/stats",
  },
} as const

export type ApiRouteKey = keyof typeof API_ROUTES
export type ApiRoute = typeof API_ROUTES