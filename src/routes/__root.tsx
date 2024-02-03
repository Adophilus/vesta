import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { Toaster } from "@/components/shad/ui/sonner"
import { AuthProvider } from '@/lib/hooks/auth'

export const Route = createRootRoute({
  component: () => (
    <AuthProvider>
      <Outlet />
      <Toaster />
      <TanStackRouterDevtools />
    </AuthProvider>
  ),
})
