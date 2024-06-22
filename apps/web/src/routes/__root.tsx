import { Toaster } from "@acme/ui/toast"
import type { QueryClient } from "@tanstack/react-query"
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router"

export const Route = createRootRouteWithContext<{
   queryClient: QueryClient
}>()({
   component: RootComponent,
})

function RootComponent() {
   return (
      <>
         <Outlet />
         <Toaster />
      </>
   )
}
