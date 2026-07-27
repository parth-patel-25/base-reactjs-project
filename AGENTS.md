# Coding Rules for AI Agents

## Project Structure

```
src/
├── shared/          # Globally shared across all features
│   ├── components/  # Reusable UI components (ui/, layout/, common/)
│   ├── hooks/       # Shared custom hooks
│   ├── lib/         # Utility functions and helpers
│   ├── stores/      # Global Zustand stores
│   ├── types/       # Shared TypeScript types
│   └── constants/   # App-wide constants
├── core/            # Core app configuration
│   ├── providers/   # Context providers (Query, Theme, Auth)
│   ├── routing/     # Route definitions
│   ├── config/      # App configuration
│   └── middleware/   # API interceptors, guards
└── features/        # Feature-based modules
    └── [feature]/
        ├── components/  # Feature-specific components
        ├── hooks/       # Feature-specific hooks
        ├── services/    # API calls and business logic
        ├── types/       # Feature-specific types
        └── index.tsx    # Feature entry point
```

## File Size Rules

### MAX 200 Lines Per File
- **Every file must stay under 200 lines of code**
- If a file exceeds 200 lines, split it into smaller files
- Components: Extract sub-components or custom hooks
- Services: Split by domain or operation type
- Types: Move to separate type files

### Exceptions
- Generated files (types from API schemas)
- Configuration files (vite.config.ts, tsconfig.json)

## Component Rules

### File Naming
- Components: `PascalCase.tsx` (e.g., `UserProfile.tsx`)
- Hooks: `kebab-case.ts` (e.g., `use-auth.ts`)
- Utils: `kebab-case.ts` (e.g., `format-date.ts`)
- Types: `index.ts` in types folder
- Constants: `index.ts` in constants folder

### Component Structure
```tsx
// 1. Imports
import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/components/ui/button"

// 2. Types
interface ComponentProps {
  title: string
  onSubmit: () => void
}

// 3. Component
export function Component({ title, onSubmit }: ComponentProps) {
  // 4. Hooks
  const [state, setState] = useState(false)

  // 5. Handlers
  const handleClick = () => {
    setState(!state)
    onSubmit()
  }

  // 6. Render
  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={handleClick}>Toggle</Button>
    </div>
  )
}
```

## Data Display Rules

### USE TanStack Virtual for Large Lists
- **ANY list with 50+ items MUST use `@tanstack/react-virtual`**
- Do NOT use `.map()` for large datasets
- Implement virtual scrolling for performance
- Example patterns:

```tsx
// GOOD: Virtualized list
import { useVirtualizer } from "@tanstack/react-virtual"

function VirtualList({ items }: { items: Item[] }) {
  const parentRef = useRef<HTMLDivElement>(null)
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  })

  return (
    <div ref={parentRef} className="h-[500px] overflow-auto">
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        {virtualizer.getVirtualItems().map((virtualRow) => (
          <div key={virtualRow.key} style={virtualRow.style}>
            {items[virtualRow.index].name}
          </div>
        ))}
      </div>
    </div>
  )
}

// BAD: Raw map for large lists
function List({ items }: { items: Item[] }) {
  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
}
```

### When to Use TanStack Virtual
- Data tables with 100+ rows
- Dropdowns with many options (50+)
- Infinite scroll lists
- Any scrollable content with dynamic/unknown length
- Chat messages, logs, activity feeds

## State Management Rules

### Local State
- Use `useState` for simple component state
- Use `useReducer` for complex local state
- Keep state as close to where it's used as possible

### Global State (Zustand)
- Use Zustand for shared application state
- Create feature-specific stores in `features/[name]/stores/`
- Create global stores in `shared/stores/`
- Use devtools middleware for debugging
- Use persist middleware for localStorage

### Server State (React Query)
- Use React Query for ALL API calls
- Define query keys in `shared/constants/`
- Use custom hooks for data fetching
- Implement proper caching strategies
- Handle loading and error states

## Import Rules

### Path Aliases
- Use `@shared/` for imports from `src/shared/`
- Use `@features/` for imports from `src/features/`
- Use `@core/` for imports from `src/core/`
- Use `@/` as fallback for any `src/` import
- NEVER use relative paths for shared imports

### Import Examples
```typescript
// Shared imports
import { Button } from "@shared/components/ui/button"
import { useAuth } from "@shared/hooks/use-auth"
import { logger } from "@shared/lib/logger"

// Feature imports
import { UserCard } from "@features/user/components/user-card"
import { useUser } from "@features/user/hooks/use-user"

// Core imports
import { Providers } from "@core/providers"
import { router } from "@core/routing"
```

### Import Order
```tsx
// 1. External libraries
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

// 2. Shared modules
import { Button } from "@shared/components/ui/button"
import { useAuth } from "@shared/hooks/use-auth"

// 3. Feature modules (only cross-feature imports)
import { UserCard } from "@features/user/components/user-card"

// 4. Local imports
import { MyComponent } from "./my-component"
```

## Type Rules

- Use TypeScript strict mode
- Define types in feature-specific `types/` folders
- Export types from `index.ts` barrel files
- Use `interface` for object shapes
- Use `type` for unions, intersections, and utilities
- Never use `any` - use `unknown` and narrow types

## Logger Rules (MANDATORY)

### NEVER Use Console Directly
- **NEVER use `console.log()`, `console.info()`, `console.debug()`**
- **ALWAYS use the logger utility** from `@/shared/lib/logger`
- After implementation, **REMOVE all direct console statements**

### Logger Usage
```typescript
import { logger, createLogger } from "@/shared/lib/logger"

// Global logger (for small apps)
logger.info("User logged in")
logger.error("API call failed", error)

// Feature-specific logger (recommended)
const authLogger = createLogger("Auth")
authLogger.info("Login attempt")
authLogger.error("Login failed", { email })

// Child logger (for sub-modules)
const apiLogger = logger.child("API")
apiLogger.debug("Request sent")
```

### Log Levels & Behavior
| Level | Development | Production | Use Case |
|-------|-------------|------------|----------|
| `debug` | ✅ Enabled | ❌ Disabled | Debug info, variable values |
| `info` | ✅ Enabled | ❌ Disabled | Flow tracking, confirmations |
| `warn` | ✅ Enabled | ✅ Enabled | Potential issues, deprecations |
| `error` | ✅ Enabled | ✅ Enabled | Errors, failures, exceptions |

### When to Use Each Level
```typescript
// DEBUG - Detailed debugging info (dev only)
logger.debug("Fetching user data", { userId, endpoint })

// INFO - General flow messages (dev only)
logger.info("Component mounted")
logger.info("Form submitted successfully")

// WARN - Potential issues (always logged)
logger.warn("Using deprecated API endpoint")
logger.warn("Cache miss, fetching fresh data")

// ERROR - Errors and failures (always logged)
logger.error("Failed to fetch user data", error)
logger.error("Authentication failed", { reason: "Invalid token" })
```

### Creating Feature Loggers
```typescript
// features/auth/services/auth.service.ts
import { createLogger } from "@/shared/lib/logger"

const logger = createLogger("Auth")

export const authService = {
  login: async (credentials: LoginCredentials) => {
    logger.info("Login attempt", { email: credentials.email })
    try {
      const result = await apiClient.post("/auth/login", credentials)
      logger.info("Login successful")
      return result.data
    } catch (error) {
      logger.error("Login failed", error)
      throw error
    }
  },
}
```

### ESLint Rule
Add to `.eslintrc` to enforce logger usage:
```json
{
  "rules": {
    "no-console": ["error", { "allow": ["warn", "error"] }]
  }
}
```

## API Rules

### Centralized API Routes (MANDATORY)
- **ALL API routes MUST be defined in `@shared/constants/api/index.ts`**
- **NEVER hardcode route strings in services or components**
- **Add new endpoints here FIRST before using them**

```typescript
// src/shared/constants/api/index.ts
export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
  USERS: {
    BASE: "/users",
    BY_ID: (id: string) => `/users/${id}`,
  },
} as const
```

### API Client
- Use the shared `apiClient` from `@shared/lib/api-client`
- Create feature-specific API functions in `services/`
- Handle errors consistently with toast notifications

### API Function Structure
```typescript
// features/users/services/user.service.ts
import { apiClient } from "@shared/lib/api-client"
import { API_ROUTES } from "@shared/constants/api-routes"
import type { User, PaginatedResponse, PaginationParams } from "@shared/types"

export const userService = {
  getList: (params: PaginationParams) =>
    apiClient.get<PaginatedResponse<User>>(API_ROUTES.USERS.BASE, { params }),

  getById: (id: string) =>
    apiClient.get<User>(API_ROUTES.USERS.BY_ID(id)),

  create: (data: Omit<User, "id" | "createdAt" | "updatedAt">) =>
    apiClient.post<User>(API_ROUTES.USERS.BASE, data),

  update: (id: string, data: Partial<User>) =>
    apiClient.put<User>(API_ROUTES.USERS.BY_ID(id), data),

  delete: (id: string) =>
    apiClient.delete(API_ROUTES.USERS.BY_ID(id)),
}
```

## CSS Rules

- Use Tailwind CSS for all styling
- Use `cn()` utility for conditional classes
- Use shadcn/ui design tokens (colors, spacing, etc.)
- Keep responsive design mobile-first
- Use CSS variables for theme values
- **NEVER use hard-coded px values** - Always use responsive units

### Responsive Units (MANDATORY)

| Unit | Use Case | Example |
|------|----------|---------|
| `rem` | Font sizes, spacing, dimensions | `text-base` (1rem), `p-4` (1rem) |
| `em` | Component-relative sizing | `w-[10em]` |
| `%` | Width, percentage layouts | `w-full` (100%), `w-1/2` (50%) |
| `vw/vh` | Viewport-relative | `h-screen` (100vh), `w-screen` (100vw) |
| Tailwind spacing | All spacing | `p-4`, `m-2`, `gap-4` |

### BAD (Never Do This)
```tsx
// ❌ Hard-coded px values
<div style={{ width: "200px", height: "100px", fontSize: "16px" }}>
<div className="w-[200px] h-[100px] text-[16px]">

// ❌ Inline styles with px
<div style={{ padding: "16px", margin: "8px" }}>
```

### GOOD (Always Do This)
```tsx
// ✅ Tailwind responsive classes
<div className="w-48 h-24 text-base">    {/* 12rem, 6rem, 1rem */}
<div className="p-4 m-2 gap-4">          {/* 1rem, 0.5rem, 1rem */}

// ✅ Responsive with breakpoints
<div className="w-full md:w-1/2 lg:w-1/3">

// ✅ CSS variables for dynamic values
<div style={{ width: "var(--container-width)" }}>

// ✅ clamp() for fluid typography
<div style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)" }}>
```

### Tailwind Spacing Reference
- `p-1` = 0.25rem (4px)
- `p-2` = 0.5rem (8px)
- `p-3` = 0.75rem (12px)
- `p-4` = 1rem (16px)
- `p-5` = 1.25rem (20px)
- `p-6` = 1.5rem (24px)
- `p-8` = 2rem (32px)
- `p-10` = 2.5rem (40px)
- `p-12` = 3rem (48px)
- `p-16` = 4rem (64px)

### Exceptions (Only Allowed)
- SVG elements with fixed viewBox
- Border widths (1px, 2px are acceptable)
- Box shadows and outlines
- Absolute positioning in specific cases
- Third-party library styles

## Testing Rules

- Write unit tests for utilities and hooks
- Write integration tests for features
- Use React Testing Library for component tests
- Mock API calls in tests
- Aim for 80% code coverage

## Performance Rules

- Use React.memo for expensive components
- Use useMemo for expensive calculations
- Use useCallback for event handlers passed to children
- Lazy load features and heavy components
- Use code splitting with React.lazy

## Git Rules

- Commit messages: `type(scope): description`
- Types: feat, fix, docs, style, refactor, test, chore
- Keep commits small and focused
- Never commit secrets or API keys

## Documentation Rules (MANDATORY)

### Update Docs Before Implementation
- **ALWAYS update documentation BEFORE implementing new features or changes**
- Never implement without updating docs first

### Documentation Checklist
Before implementing any change, update:

1. **README.md** - If adding new features or changing tech stack
2. **docs/features.md** - For new features or feature changes
3. **docs/components.md** - For new components
4. **docs/hooks.md** - For new hooks
5. **docs/api.md** - For API changes
6. **AGENTS.md** - For new coding rules

### Implementation Flow
```
1. Update Documentation (FIRST)
2. Implement Feature
3. Update Tests
4. Final Review
5. Done
```

### Documentation Templates

#### New Feature Template
```markdown
## Feature Name

**Location:** `src/features/feature-name/`

### Description
Brief description of the feature.

### Components
- `ComponentName` - Description

### Hooks
- `useHookName` - Description

### Services
- `serviceName.service.ts` - Description

### Implementation Status
- [ ] Component 1
- [ ] Hook 1
```

#### New Component Template
```markdown
### ComponentName
**File:** `component-name.tsx`

Description of the component.

```tsx
// Usage example
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| prop1 | string | - | Description |
```