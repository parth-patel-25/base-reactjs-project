# Hooks Documentation

This document provides detailed information about custom hooks.

## Table of Contents

- [Shared Hooks](#shared-hooks)
- [Feature Hooks](#feature-hooks)

---

## Shared Hooks

**Location:** `src/shared/hooks/`

### useApi
**File:** `use-api.ts`

A custom hook for data fetching with React Query.

```tsx
import { useApi } from "@shared/hooks/use-api"

function UserProfile({ userId }: { userId: string }) {
  const { data, isLoading, error } = useApi({
    key: "user",
    url: `/users/${userId}`,
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return <div>{data?.name}</div>
}
```

**Options:**
| Option | Type | Description |
|--------|------|-------------|
| key | string | Query key for caching |
| url | string | API endpoint |
| enabled | boolean | Enable/disable query |
| onSuccess | function | Callback on success |
| onError | function | Callback on error |

---

### useAppStore
**File:** `stores/app.store.ts`

Global application state management with Zustand.

```tsx
import { useAppStore } from "@shared/stores/app.store"

function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useAppStore()

  return (
    <aside className={cn("sidebar", sidebarOpen && "open")}>
      {/* Sidebar content */}
    </aside>
  )
}
```

**State:**
| Property | Type | Description |
|----------|------|-------------|
| sidebarOpen | boolean | Sidebar visibility state |
| toggleSidebar | function | Toggle sidebar |
| setSidebarOpen | function | Set sidebar state |

---

## Feature Hooks

### Auth Hooks

**Location:** `src/features/auth/hooks/`

Coming soon...

### Dashboard Hooks

**Location:** `src/features/dashboard/hooks/`

Coming soon...

---

## Creating New Hooks

### Step 1: Create Hook File
```tsx
// src/shared/hooks/use-[hook-name].ts
import { useState, useEffect } from "react"

export function useHookName(param: string) {
  const [state, setState] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Hook logic
  }, [param])

  return { state, loading, error }
}
```

### Step 2: Update Documentation
- Add hook to this file
- Document parameters and return values
- Add usage examples

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-07-27 | Initial release with useApi, useAppStore |