import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { Toaster } from "@/components/shad/ui/sonner"

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster />
      <TanStackRouterDevtools />
    </>
  ),
})
