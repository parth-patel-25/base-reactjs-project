import { createBrowserRouter, Navigate } from "react-router-dom"
import { lazy, Suspense } from "react"

const Home = lazy(() => import("@/features/home"))
const Dashboard = lazy(() => import("@/features/dashboard"))
const Auth = lazy(() => import("@/features/auth"))

function LoadingFallback() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )
}

function LazyRoute({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LazyRoute>
        <Home />
      </LazyRoute>
    ),
  },
  {
    path: "/auth",
    element: (
      <LazyRoute>
        <Auth />
      </LazyRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <LazyRoute>
        <Dashboard />
      </LazyRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
])