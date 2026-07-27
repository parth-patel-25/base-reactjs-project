type LogLevel = "debug" | "info" | "warn" | "error"

interface LoggerConfig {
  level: LogLevel
  prefix?: string
  enableInProduction: boolean
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}

const isDevelopment = import.meta.env.DEV
const isProduction = import.meta.env.PROD

function shouldLog(level: LogLevel, config: LoggerConfig): boolean {
  if (isProduction && !config.enableInProduction) {
    return level === "error" || level === "warn"
  }
  return LOG_LEVELS[level] >= LOG_LEVELS[config.level]
}

function formatMessage(level: LogLevel, message: string, prefix?: string): string {
  const timestamp = new Date().toISOString()
  const prefixStr = prefix ? `[${prefix}]` : ""
  return `${timestamp} ${level.toUpperCase()} ${prefixStr} ${message}`
}

function log(level: LogLevel, message: string, data?: unknown, config?: LoggerConfig): void {
  const loggerConfig = config || defaultConfig
  if (!shouldLog(level, loggerConfig)) return

  const formatted = formatMessage(level, message, loggerConfig.prefix)
  const consoleMethod = console[level]

  if (data !== undefined) {
    consoleMethod(formatted, data)
  } else {
    consoleMethod(formatted)
  }
}

const defaultConfig: LoggerConfig = {
  level: isDevelopment ? "debug" : "warn",
  prefix: "App",
  enableInProduction: false,
}

export const logger = {
  debug: (message: string, data?: unknown) => log("debug", message, data),
  info: (message: string, data?: unknown) => log("info", message, data),
  warn: (message: string, data?: unknown) => log("warn", message, data),
  error: (message: string, data?: unknown) => log("error", message, data),
  child: (prefix: string) => createLogger(prefix),
}

export function createLogger(prefix: string, config?: Partial<LoggerConfig>): typeof logger {
  const loggerConfig: LoggerConfig = {
    level: isDevelopment ? "debug" : "warn",
    prefix,
    enableInProduction: false,
    ...config,
  }

  return {
    debug: (message: string, data?: unknown) => log("debug", message, data, loggerConfig),
    info: (message: string, data?: unknown) => log("info", message, data, loggerConfig),
    warn: (message: string, data?: unknown) => log("warn", message, data, loggerConfig),
    error: (message: string, data?: unknown) => log("error", message, data, loggerConfig),
    child: (childPrefix: string) => createLogger(`${prefix}:${childPrefix}`, loggerConfig),
  }
}