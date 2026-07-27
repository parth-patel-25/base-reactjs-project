# API Documentation

This document provides detailed information about API integration.

## Table of Contents

- [API Client](#api-client)
- [Creating Services](#creating-services)
- [Error Handling](#error-handling)
- [Authentication](#authentication)

---

## API Client

**Location:** `src/shared/lib/api-client.ts`

The API client is configured with Axios and includes interceptors for authentication and error handling.

### Configuration
```typescript
import { apiClient } from "@shared/lib/api-client"

// Base URL: http://localhost:3001/api
// Timeout: 10000ms
// Headers: Content-Type: application/json
```

### Interceptors

**Request Interceptor:**
- Adds Authorization header with JWT token from localStorage

**Response Interceptor:**
- Handles 401 Unauthorized by clearing token and redirecting to login

---

## Creating Services

### Service Structure
```typescript
// features/[name]/services/[name].service.ts
import { apiClient } from "@shared/lib/api-client"
import { createLogger } from "@shared/lib/logger"
import type { [Type] } from "@shared/types"

const logger = createLogger("[Name]")

export const [name]Service = {
  // Get all items
  getList: async (params?: PaginationParams) => {
    logger.info("Fetching [name] list")
    const response = await apiClient.get<PaginatedResponse<[Type]>>("/[name]", { params })
    return response.data
  },

  // Get item by ID
  getById: async (id: string) => {
    logger.info("Fetching [name] by id", { id })
    const response = await apiClient.get<[Type]>(`/[name]/${id}`)
    return response.data
  },

  // Create new item
  create: async (data: Omit<[Type], "id" | "createdAt" | "updatedAt">) => {
    logger.info("Creating [name]")
    const response = await apiClient.post<[Type]>/[name]", data)
    return response.data
  },

  // Update item
  update: async (id: string, data: Partial<[Type]>) => {
    logger.info("Updating [name]", { id })
    const response = await apiClient.put<[Type]>(`/[name]/${id}`, data)
    return response.data
  },

  // Delete item
  delete: async (id: string) => {
    logger.info("Deleting [name]", { id })
    await apiClient.delete(`/[name]/${id}`)
  },
}
```

---

## Error Handling

### Using React Query
```typescript
import { useQuery } from "@tanstack/react-query"
import { userService } from "@features/users/services/user.service"

function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => userService.getList(),
  })

  if (isLoading) return <Loading />
  if (error) return <Error error={error} />

  return <UserTable users={data.data} />
}
```

### Using Mutations
```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { userService } from "@features/users/services/user.service"

function CreateUser() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: userService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast.success("User created successfully")
    },
    onError: (error) => {
      toast.error("Failed to create user")
      logger.error("Create user failed", error)
    },
  })

  return (
    <Button onClick={() => mutation.mutate({ name: "John" })}>
      Create User
    </Button>
  )
}
```

---

## Authentication

### Token Storage
- Token is stored in localStorage as "auth-token"
- Token is automatically added to all requests via interceptor

### Login Flow
```typescript
import { authService } from "@features/auth/services/auth.service"

async function login(email: string, password: string) {
  const result = await authService.login({ email, password })
  localStorage.setItem("auth-token", result.token)
  window.location.href = "/dashboard"
}
```

### Logout Flow
```typescript
function logout() {
  localStorage.removeItem("auth-token")
  window.location.href = "/auth"
}
```

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/login | User login |
| POST | /auth/register | User registration |
| POST | /auth/logout | User logout |
| GET | /auth/me | Get current user |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /users | Get all users |
| GET | /users/:id | Get user by ID |
| POST | /users | Create user |
| PUT | /users/:id | Update user |
| DELETE | /users/:id | Delete user |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-07-27 | Initial release with API client and interceptors |