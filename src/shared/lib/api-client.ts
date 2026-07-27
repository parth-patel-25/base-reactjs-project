import axios from "axios"
import { createLogger } from "./logger"
import { API_ROUTES } from "@shared/api"

const logger = createLogger("API")

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth-token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    logger.debug(`Request: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    logger.error("Request error", error)
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => {
    logger.debug(`Response: ${response.status} ${response.config.url}`)
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      logger.warn("Unauthorized access, redirecting to login")
      localStorage.removeItem("auth-token")
      window.location.href = API_ROUTES.AUTH.LOGIN
    } else {
      logger.error(`API error: ${error.response?.status || "Network error"}`, error)
    }
    return Promise.reject(error)
  }
)