# Features Documentation

This document provides detailed information about each feature in the application.

## Table of Contents

- [Authentication](#authentication)
- [Dashboard](#dashboard)
- [Home](#home)

---

## Authentication

**Location:** `src/features/auth/`

### Description
Handles user authentication including login, registration, and session management.

### Components
- `Auth` - Main authentication page with login form

### Hooks
- `useAuth` - Custom hook for authentication state and methods

### Services
- `auth.service.ts` - API calls for authentication

### Types
- `auth.types.ts` - TypeScript types for auth data

### Implementation Status
- [x] Login form UI
- [ ] Registration form
- [ ] Password reset
- [ ] Email verification
- [ ] Social login

---

## Dashboard

**Location:** `src/features/dashboard/`

### Description
Main dashboard view with statistics, charts, and user data.

### Components
- `Dashboard` - Main dashboard layout with stats cards

### Hooks
- `useDashboard` - Custom hook for dashboard data

### Services
- `dashboard.service.ts` - API calls for dashboard data

### Types
- `dashboard.types.ts` - TypeScript types for dashboard data

### Implementation Status
- [x] Stats cards UI
- [ ] Charts and graphs
- [ ] Data tables
- [ ] Real-time updates
- [ ] Export functionality

---

## Home

**Location:** `src/features/home/`

### Description
Landing page and home view for the application.

### Components
- `Home` - Main home page with feature cards

### Hooks
- None

### Services
- None

### Types
- None

### Implementation Status
- [x] Hero section
- [x] Feature cards
- [ ] Pricing section
- [ ] Testimonials
- [ ] Contact form

---

## Adding New Features

### Step 1: Create Feature Directory
```bash
mkdir -p src/features/[feature-name]/{components,hooks,services,types}
```

### Step 2: Create Feature Entry Point
```tsx
// src/features/[feature-name]/index.tsx
export default function FeatureName() {
  return <div>Feature Name</div>
}
```

### Step 3: Add Route
```tsx
// src/core/routing/index.tsx
const FeatureName = lazy(() => import("@/features/[feature-name]"))

// Add route
{
  path: "/feature-name",
  element: (
    <LazyRoute>
      <FeatureName />
    </LazyRoute>
  ),
}
```

### Step 4: Update Documentation
- Update this file with new feature details
- Add implementation status
- Document components, hooks, and services

---

## Feature Template

```typescript
// features/[name]/services/[name].service.ts
import { apiClient } from "@shared/lib/api-client"
import { createLogger } from "@shared/lib/logger"

const logger = createLogger("[Name]")

export const [name]Service = {
  getList: async () => {
    logger.info("Fetching [name] list")
    const response = await apiClient.get("/[name]")
    return response.data
  },

  getById: async (id: string) => {
    logger.info("Fetching [name] by id", { id })
    const response = await apiClient.get(`/[name}/${id}`)
    return response.data
  },
}
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-07-27 | Initial release with auth, dashboard, home features |